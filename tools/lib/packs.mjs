/**
 * LevelDB pack I/O for the Fiends & Fables Prime build tools.
 *
 * Foundry v14 stores a compendium as a LevelDB folder whose keys are
 *   !actors!<id>, !actors.items!<actor>.<item>, !actors.items.effects!<actor>.<item>.<effect>,
 *   !items!<id>, !items.effects!<item>.<effect>, ...
 * These helpers read a pack into documents with their embedded collections
 * resolved, and write documents back as a freshly compacted database (one
 * .ldb table, MANIFEST and CURRENT; no LOCK, LOG or stale tables).
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function classicLevel() {
  const roots = [process.env.CLASSIC_LEVEL_ROOT, process.cwd(), path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..")].filter(Boolean);
  for (const root of roots) {
    try { return require(require.resolve("classic-level", { paths: [root] })).ClassicLevel; } catch { /* next */ }
  }
  throw new Error("classic-level is not installed. Set CLASSIC_LEVEL_ROOT to a folder whose node_modules has it.");
}

/** Every key/value in a pack folder. A folder without a MANIFEST is repaired on a temporary copy. */
export async function readRaw(dir) {
  const ClassicLevel = classicLevel();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ffpack-"));
  fs.cpSync(dir, tmp, { recursive: true });
  if (!fs.readdirSync(tmp).some((f) => f.startsWith("MANIFEST"))) {
    for (const f of ["CURRENT", "LOG", "LOG.old", "LOCK"]) fs.rmSync(path.join(tmp, f), { force: true });
    await ClassicLevel.repair(tmp);
  }
  const db = new ClassicLevel(tmp, { valueEncoding: "json" });
  const rows = new Map();
  for await (const [k, v] of db.iterator()) rows.set(k, v);
  await db.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  return rows;
}

/** Write key/values as a new, compacted database at `dir` (replacing it). */
export async function writeRaw(dir, rows) {
  const ClassicLevel = classicLevel();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const db = new ClassicLevel(dir, { valueEncoding: "json" });
  await db.open();
  const keys = [...rows.keys()].sort();
  let batch = db.batch();
  let n = 0;
  for (const k of keys) {
    batch.put(k, rows.get(k));
    if (++n % 500 === 0) { await batch.write(); batch = db.batch(); }
  }
  await batch.write();
  await db.compactRange("!", "~");
  await db.close();
  for (const f of ["LOCK", "LOG", "LOG.old"]) fs.rmSync(path.join(dir, f), { force: true });
  // A compaction can leave an empty .log of the current generation; it is part of the
  // live database (CURRENT/MANIFEST reference it), so it stays.
}

/**
 * Documents with their embedded collections resolved. Records whose parent
 * does not list them are returned separately as orphans (stale rows).
 */
export function assemble(rows) {
  const top = [];
  const orphans = [];
  const used = new Set();
  const get = (k) => { used.add(k); return rows.get(k); };
  for (const [k, v] of rows) {
    if (k.startsWith("!actors!")) {
      used.add(k);
      const a = structuredClone(v);
      a.items = (v.items ?? []).map((iid) => {
        const it = structuredClone(get(`!actors.items!${v._id}.${iid}`) ?? null);
        if (!it) return null;
        it.effects = (it.effects ?? []).map((eid) => structuredClone(get(`!actors.items.effects!${v._id}.${iid}.${eid}`) ?? null)).filter(Boolean);
        return it;
      }).filter(Boolean);
      a.effects = (v.effects ?? []).map((eid) => structuredClone(get(`!actors.effects!${v._id}.${eid}`) ?? null)).filter(Boolean);
      top.push({ kind: "actors", doc: a });
    } else if (k.startsWith("!items!")) {
      used.add(k);
      const it = structuredClone(v);
      it.effects = (v.effects ?? []).map((eid) => structuredClone(get(`!items.effects!${v._id}.${eid}`) ?? null)).filter(Boolean);
      top.push({ kind: "items", doc: it });
    } else if (k.startsWith("!folders!")) {
      used.add(k);
      top.push({ kind: "folders", doc: structuredClone(v) });
    }
  }
  for (const k of rows.keys()) if (!used.has(k)) orphans.push(k);
  return { top, orphans };
}

/** Flatten documents back into LevelDB rows. */
export function flatten(top) {
  const rows = new Map();
  for (const { kind, doc } of top) {
    if (kind === "folders") { rows.set(`!folders!${doc._id}`, doc); continue; }
    if (kind === "items") {
      const it = structuredClone(doc);
      const effects = it.effects ?? [];
      it.effects = effects.map((e) => e._id);
      rows.set(`!items!${it._id}`, it);
      for (const e of effects) rows.set(`!items.effects!${it._id}.${e._id}`, e);
      continue;
    }
    const a = structuredClone(doc);
    const items = a.items ?? [];
    const effects = a.effects ?? [];
    a.items = items.map((i) => i._id);
    a.effects = effects.map((e) => e._id);
    rows.set(`!actors!${a._id}`, a);
    for (const e of effects) rows.set(`!actors.effects!${a._id}.${e._id}`, e);
    for (const i of items) {
      const ic = structuredClone(i);
      const ieff = ic.effects ?? [];
      ic.effects = ieff.map((e) => e._id);
      rows.set(`!actors.items!${a._id}.${ic._id}`, ic);
      for (const e of ieff) rows.set(`!actors.items.effects!${a._id}.${ic._id}.${e._id}`, e);
    }
  }
  return rows;
}

/** An effect's change rows, whichever shape it was stored in (v13 `changes`, v14 `system.changes`). */
export function changesOf(effect) {
  if (Array.isArray(effect?.system?.changes) && effect.system.changes.length) return effect.system.changes;
  return Array.isArray(effect?.changes) ? effect.changes : [];
}

/** Replace an effect's change rows in both shapes it may carry. */
export function setChanges(effect, changes) {
  const MODE = { 0: "custom", 1: "multiply", 2: "add", 3: "downgrade", 4: "upgrade", 5: "override" };
  const TYPE = Object.fromEntries(Object.entries(MODE).map(([k, v]) => [v, Number(k)]));
  const v14 = changes.map((c) => ({ key: c.key, value: c.value, priority: c.priority ?? 20, type: c.type ?? MODE[c.mode] ?? "add", ...(c.phase ? { phase: c.phase } : {}) }));
  const v13 = changes.map((c) => ({ key: c.key, mode: c.mode ?? TYPE[c.type] ?? 2, value: String(c.value), priority: c.priority ?? 20 }));
  if (effect.system && typeof effect.system === "object") effect.system.changes = v14;
  else effect.system = { changes: v14 };
  effect.changes = v13;
}

export function randomId(seed = "") {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let h = 2166136261 >>> 0;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  let out = "";
  for (let i = 0; i < 16; i++) { h ^= h << 13; h >>>= 0; h ^= h >>> 17; h ^= h << 5; h >>>= 0; out += chars[h % chars.length]; }
  return out;
}
