/*
 * Fiends & Fables Prime — Creature Type compendium filter
 * Foundry VTT v14 / TRG Prime 3.320.0
 */

const MODULE_ID = "fiends-and-fables-prime";
const PACK_NAME = "creatures";
const PACK_ID = `${MODULE_ID}.${PACK_NAME}`;
const INDEX_PATH = `modules/${MODULE_ID}/data/creature-type-index.json`;
const FILTER_SELECTOR = ".ffp-creature-type-filter";

const metadataCache = new Map();
const pendingMetadata = new Map();
const liveOverrides = new Map();
const hydrationJobs = new Map();
const openCompendiums = new Map();
let staticIndexPromise;

function warn(...args) {
  console.warn("Fiends & Fables Prime |", ...args);
}

export function normaliseDocumentId(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";

  const actorKey = text.match(/!actors!([A-Za-z0-9]{16})\b/);
  if (actorKey) return actorKey[1];

  const actorUuid = text.match(/(?:Actor|actors)\.([A-Za-z0-9]{16})\b/);
  if (actorUuid) return actorUuid[1];

  const exactId = text.match(/^[A-Za-z0-9]{16}$/);
  if (exactId) return text;

  const trailingId = text.match(/([A-Za-z0-9]{16})$/);
  return trailingId ? trailingId[1] : text;
}

export function extractCreatureType(source) {
  const documentSource = source?._source ?? source;
  const items = documentSource?.items?.contents ?? documentSource?.items ?? [];

  for (const item of items) {
    const itemSource = item?._source ?? item;
    if (itemSource?.type !== "creature-type") continue;
    const name = String(itemSource?.name ?? item?.name ?? "").trim();
    if (name) return name;
  }

  return "";
}

function asElement(html) {
  const HTMLElementClass = globalThis.HTMLElement;
  if (!HTMLElementClass || !html) return null;
  if (html instanceof HTMLElementClass) return html;
  if (html[0] instanceof HTMLElementClass) return html[0];
  if (html.element instanceof HTMLElementClass) return html.element;
  if (html.element?.[0] instanceof HTMLElementClass) return html.element[0];
  return null;
}

function getPackFromApp(app) {
  const direct = app?.collection;
  if (direct?.collection === PACK_ID) return direct;
  if (direct?.metadata?.package === MODULE_ID && direct?.metadata?.name === PACK_NAME) return direct;

  const optionCollection = app?.options?.collection;
  if (optionCollection === PACK_ID) return game.packs.get(PACK_ID);

  const appId = String(app?.id ?? "");
  if (appId.includes(PACK_ID)) return game.packs.get(PACK_ID);

  return null;
}

function isTargetCompendium(app) {
  const pack = getPackFromApp(app);
  return pack?.collection === PACK_ID
    || (pack?.metadata?.package === MODULE_ID && pack?.metadata?.name === PACK_NAME);
}

async function loadStaticIndex() {
  if (staticIndexPromise) return staticIndexPromise;

  staticIndexPromise = (async () => {
    try {
      const version = game.modules.get(MODULE_ID)?.version ?? "";
      const response = await fetch(`${INDEX_PATH}?v=${encodeURIComponent(version)}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const records = await response.json();
      const metadata = new Map();
      for (const record of records ?? []) {
        const id = normaliseDocumentId(record?.id ?? record?._id);
        if (!id) continue;
        metadata.set(id, {
          id,
          name: String(record?.name ?? ""),
          type: String(record?.type ?? "").trim(),
          resolved: true
        });
      }
      return metadata;
    } catch (error) {
      warn("Unable to load packaged Creature Type metadata.", error);
      return new Map();
    }
  })();

  return staticIndexPromise;
}

function documentMetadata(document) {
  if (!document) return null;
  const source = typeof document.toObject === "function"
    ? document.toObject(false)
    : (document?._source ?? document);
  const id = normaliseDocumentId(source?._id ?? document?.id ?? document?._id);
  if (!id) return null;

  return {
    id,
    name: String(source?.name ?? document?.name ?? ""),
    type: extractCreatureType(source),
    resolved: true
  };
}

async function loadPackMetadata(pack, { force = false } = {}) {
  if (!pack) return new Map();
  const collection = pack.collection ?? PACK_ID;

  if (force) {
    metadataCache.delete(collection);
    pendingMetadata.delete(collection);
  }
  if (metadataCache.has(collection)) return metadataCache.get(collection);
  if (pendingMetadata.has(collection)) return pendingMetadata.get(collection);

  const job = (async () => {
    const metadata = new Map();

    try {
      // The base index is safe in Foundry v14. Nested Actor-system projections are
      // intentionally avoided because mixed data shapes can make getIndex throw.
      const index = await pack.getIndex();
      for (const entry of index ?? []) {
        const source = entry?._source ?? entry;
        const id = normaliseDocumentId(entry?._id ?? source?._id);
        if (!id) continue;
        metadata.set(id, {
          id,
          name: String(entry?.name ?? source?.name ?? ""),
          type: extractCreatureType(source),
          resolved: Boolean(extractCreatureType(source))
        });
      }
    } catch (error) {
      warn("Unable to read the Creatures compendium index.", error);
    }

    const packaged = await loadStaticIndex();
    for (const [id, data] of packaged) {
      const current = metadata.get(id);
      metadata.set(id, {
        id,
        name: current?.name || data.name,
        type: current?.type || data.type,
        resolved: Boolean(current?.type || data.type)
      });
    }

    for (const [id, data] of liveOverrides) metadata.set(id, data);

    metadataCache.set(collection, metadata);
    return metadata;
  })();

  pendingMetadata.set(collection, job);
  return job.finally(() => pendingMetadata.delete(collection));
}

function documentRows(root) {
  const selectors = [
    ".directory-list .directory-item.document",
    ".directory-list .directory-item[data-document-id]",
    ".directory-list .directory-item[data-entry-id]",
    ".directory-list li[data-document-id]",
    ".directory-list li[data-entry-id]"
  ];
  const rows = new Set();
  for (const selector of selectors) root.querySelectorAll(selector).forEach(row => rows.add(row));
  return [...rows].filter(row => !row.classList.contains("folder"));
}

function rowId(row) {
  const dataset = row?.dataset ?? {};
  const direct = dataset.documentId || dataset.entryId || dataset.id;
  if (direct) return normaliseDocumentId(direct);

  const uuid = dataset.uuid || row.querySelector("[data-uuid]")?.dataset?.uuid;
  return normaliseDocumentId(uuid);
}

function createFilter() {
  const section = document.createElement("section");
  section.className = "ffp-creature-type-filter";

  const label = document.createElement("label");
  label.className = "ffp-creature-type-field";

  const labelText = document.createElement("span");
  labelText.textContent = "Type";

  const select = document.createElement("select");
  select.dataset.ffpCreatureType = "";
  select.setAttribute("aria-label", "Filter creatures by Creature Type");

  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "ffp-creature-type-clear";
  clear.dataset.ffpClearType = "";
  clear.textContent = "Clear";
  clear.title = "Clear the Creature Type filter";

  const summary = document.createElement("span");
  summary.className = "ffp-creature-type-summary";
  summary.dataset.ffpTypeSummary = "";
  summary.textContent = "Loading Creature Types…";

  label.append(labelText, select);
  section.append(label, clear, summary);
  return section;
}

function insertFilter(root) {
  const existing = root.querySelector(FILTER_SELECTOR);
  if (existing) return existing;

  const filter = createFilter();
  const header = root.querySelector(".directory-header, .compendium-header, header");
  const list = root.querySelector(".directory-list");

  if (header?.parentElement) header.insertAdjacentElement("afterend", filter);
  else if (list?.parentElement) list.insertAdjacentElement("beforebegin", filter);
  else (root.querySelector(".window-content") ?? root).prepend(filter);
  return filter;
}

function populateTypes(filter, metadata) {
  const select = filter.querySelector("[data-ffp-creature-type]");
  if (!select) return;

  const selected = select.value;
  const types = [...new Set([...metadata.values()].map(data => data?.type).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right));

  select.replaceChildren();
  const all = document.createElement("option");
  all.value = "";
  all.textContent = "All Types";
  select.append(all);

  for (const type of types) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    select.append(option);
  }

  select.value = types.includes(selected) ? selected : "";
}

export function filterRecords(records, selectedType) {
  const wanted = String(selectedType ?? "");
  return records.filter(record => !wanted || record?.type === wanted);
}

function updateFolders(root) {
  const folders = [...root.querySelectorAll(".directory-item.folder")].reverse();
  for (const folder of folders) {
    const children = [...folder.querySelectorAll(
      ".directory-item.document, .directory-item[data-document-id], .directory-item[data-entry-id]"
    )].filter(row => !row.classList.contains("folder"));
    if (!children.length) continue;
    folder.classList.toggle("ffp-type-hidden", children.every(row => row.classList.contains("ffp-type-hidden")));
  }
}

function applyFilter(root, metadata) {
  const filter = root.querySelector(FILTER_SELECTOR);
  if (!filter) return;

  const selectedType = filter.querySelector("[data-ffp-creature-type]")?.value ?? "";
  const rows = documentRows(root);
  let visible = 0;

  for (const row of rows) {
    const type = metadata.get(rowId(row))?.type ?? "";
    const matches = !selectedType || type === selectedType;
    row.classList.toggle("ffp-type-hidden", !matches);
    if (matches) visible += 1;
  }

  updateFolders(root);
  const summary = filter.querySelector("[data-ffp-type-summary]");
  if (summary) {
    summary.textContent = selectedType
      ? `${visible} of ${rows.length} creatures shown`
      : `${rows.length} creatures available`;
  }
}

async function hydrateUnknownRows(root, pack, metadata) {
  let changed = false;
  for (const row of documentRows(root)) {
    const id = rowId(row);
    if (!id || metadata.get(id)?.resolved || hydrationJobs.has(`${PACK_ID}:${id}`)) continue;

    const key = `${PACK_ID}:${id}`;
    const job = (async () => {
      try {
        const document = await pack.getDocument(id);
        const data = documentMetadata(document);
        if (data) {
          metadata.set(id, data);
          liveOverrides.set(id, data);
          changed = true;
        }
      } catch (error) {
        const current = metadata.get(id) ?? { id, name: "", type: "" };
        metadata.set(id, { ...current, resolved: true });
        warn(`Unable to resolve Creature Type for Actor ${id}.`, error);
      } finally {
        hydrationJobs.delete(key);
      }
    })();

    hydrationJobs.set(key, job);
    await job;
  }
  return changed;
}

function bindFilter(root, filter, metadata, pack) {
  filter._ffpMetadata = metadata;
  filter._ffpPack = pack;
  if (filter.dataset.ffpBound === "true") return;
  filter.dataset.ffpBound = "true";

  const apply = () => {
    const currentMetadata = filter._ffpMetadata ?? metadata;
    const currentPack = filter._ffpPack ?? pack;
    applyFilter(root, currentMetadata);
    hydrateUnknownRows(root, currentPack, currentMetadata).then(changed => {
      if (!changed) return;
      populateTypes(filter, currentMetadata);
      applyFilter(root, currentMetadata);
    }).catch(error => warn("Unable to refresh Creature Type metadata.", error));
  };

  filter.querySelector("[data-ffp-creature-type]")?.addEventListener("change", apply);
  filter.querySelector("[data-ffp-clear-type]")?.addEventListener("click", event => {
    event.preventDefault();
    const select = filter.querySelector("[data-ffp-creature-type]");
    if (select) select.value = "";
    apply();
  });

  const list = root.querySelector(".directory-list");
  if (list && list.dataset.ffpTypeObserver !== "true") {
    list.dataset.ffpTypeObserver = "true";
    const observer = new MutationObserver(apply);
    observer.observe(list, { childList: true, subtree: true });
  }
}

async function enhanceCompendium(app, html, { force = false } = {}) {
  if (!game.modules.get(MODULE_ID)?.active || !isTargetCompendium(app)) return;

  const root = asElement(html) ?? asElement(app?.element);
  if (!root) return;

  const pack = getPackFromApp(app) ?? game.packs.get(PACK_ID);
  if (!pack) return;

  const filter = insertFilter(root);
  const metadata = await loadPackMetadata(pack, { force });
  openCompendiums.set(root, app);
  populateTypes(filter, metadata);
  bindFilter(root, filter, metadata, pack);
  applyFilter(root, metadata);
  await hydrateUnknownRows(root, pack, metadata);
  populateTypes(filter, metadata);
  applyFilter(root, metadata);
}

function isTargetPackDocument(document) {
  return String(document?.pack ?? document?.compendium?.collection ?? "") === PACK_ID;
}

function refreshOpenCompendiums() {
  for (const [root, app] of openCompendiums) {
    if (!root?.isConnected) {
      openCompendiums.delete(root);
      continue;
    }
    enhanceCompendium(app, root, { force: true }).catch(error => warn("Unable to refresh the Type filter.", error));
  }
}

function updateLiveMetadata(document) {
  if (!isTargetPackDocument(document)) return;
  const data = documentMetadata(document);
  if (data) liveOverrides.set(data.id, data);
  metadataCache.delete(PACK_ID);
  refreshOpenCompendiums();
}

function deleteLiveMetadata(document) {
  if (!isTargetPackDocument(document)) return;
  const id = normaliseDocumentId(document?.id ?? document?._id);
  if (id) liveOverrides.delete(id);
  metadataCache.delete(PACK_ID);
  refreshOpenCompendiums();
}

if (globalThis.Hooks) {
  Hooks.on("createActor", updateLiveMetadata);
  Hooks.on("updateActor", updateLiveMetadata);
  Hooks.on("deleteActor", deleteLiveMetadata);
  Hooks.on("renderCompendium", (app, html) => {
    enhanceCompendium(app, html).catch(error => warn("Unable to render the Type filter.", error));
  });
  // renderCompendiumCollection was removed here: no such application class exists in Foundry 13+.
}
