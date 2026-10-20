/*
 * Fiends & Fables Prime — reusable creature template framework
 * Foundry VTT 14.365 / TRG Prime 3.320.0
 *
 * Templates are deliberately implemented by this module rather than by
 * modifying TRG Prime. A template is an owned Item plus tagged, reversible
 * actor changes and generated Items. The base PC/NPC remains intact.
 */

const MODULE_ID = "fiends-and-fables-prime";
const TEMPLATE_PACK = `${MODULE_ID}.templates`;
const CORE_PACK = (name) => `trg-prime.${name}`;
const ADD = 2;
const OVERRIDE = 5;

const HUMANOID_RACES = new Set([
  "human", "dwarf", "elf", "gnome", "halfling", "kornargon", "orc",
  "ascendan", "goblin", "kobold"
]);

function notify(level, message) {
  ui?.notifications?.[level]?.(`Fiends & Fables Prime | ${message}`);
}

function actorCreatureType(actor) {
  return actor.items?.find?.((i) => i.type === "creature-type")?.name ?? actor.system?.details?.creatureType ?? "";
}

function isHumanoid(actor) {
  if (String(actorCreatureType(actor)).trim().toLowerCase() === "humanoid") return true;
  return HUMANOID_RACES.has(String(actor.system?.identity?.race ?? "").trim().toLowerCase());
}

function actorLevel(actor) {
  return Math.max(0, Number(actor.system?.identity?.level) || 0);
}

function isSpellcaster(actor) {
  if ((Number(actor.system?.magic?.casterLevel) || 0) > 0) return true;
  if ((Number(actor.system?.magic?.spellcraft?.total) || 0) > 0) return true;
  return actor.items?.some?.((i) => i.type === "spell") ?? false;
}

function templateFlags(key) {
  return { [MODULE_ID]: { templateKey: key, templateGenerated: true } };
}

function mergeFlags(source, key) {
  source.flags ??= {};
  source.flags[MODULE_ID] = {
    ...(source.flags[MODULE_ID] ?? {}),
    templateKey: key,
    templateGenerated: true
  };
  return source;
}

const COMMON = {
  "Animal Empathy": "The lycanthrope can communicate with any creature of its associated animal type.",
  "Luna Frenzy": "During the full moon the lycanthrope is forced toward its hybrid form and frenzy. It may attempt the Very Easy level-based Mental Focus checks described in Fiends & Fables to delay the change; once the frenzy begins it lasts until the full moon ends.",
  "Lycanthropic Curse": "Any humanoid that suffers bleed damage from one of the lycanthrope's natural attacks must succeed at a Fortitude save or contract lycanthropy. The curse manifests at the next full moon as Luna Frenzy.",
  "Shift Form": "The lycanthrope shifts one step at a time between humanoid, hybrid and animal forms. Make an Easy level-based Meditation check: Critical 1 AP; Success 2 AP; Partial 3 AP; Failure spends 3 AP without changing; Fumble changes as Partial and triggers Luna Frenzy.",
  "Cat's Landing": "Werecat special ability from Fiends & Fables. Resolve its printed falling/landing benefit when applicable.",
  "Incorporeal": "The ghost is incorporeal as described in Fiends & Fables and uses the incorporeal creature rules.",
  "Wail of the Departed": "2 AP; auditory, divine, enchantment, fear, save. Creatures within 60 feet make a Will save: failure Frightened 2; fumble Frightened 4; success grants immunity to this ability for 1 minute.",
  "Paralytic Touch": "0 AP; arcane, soul. A creature suffering a critical injury from the lich's Bony Hand makes a Fortitude save. Failure: paralyzed 1 round. Fumble: paralyzed 1 minute and prone. Blunder: paralyzed permanently and prone. The save becomes Hard for a Serious critical and Very Hard for a Deadly critical.",
  "Phylactery of Eternal Resurgence": "The lich's soul is anchored to its phylactery. While it survives the lich cannot be permanently killed. The phylactery grants Regeneration 1/hour while rebuilding the lich's body and has 200 HP, Hardness 20, immunity to non-magical weapons, magic resistance and Incredibly Hard detection.",
  "Zombie Plague": "Disease, evil, soul. The disease has the level of the infecting creature, a 1d4-day incubation and progresses through increasing Fatigue before death; a victim that dies from the plague rises as a zombie and gains the Zombie Template.",
  "Mindless": "The creature is mindless and behaves according to the mindless rules.",
  "Fast Healing": "The creature gains Fast Healing as specified by the Vampire Template. The template does not provide a numerical rate; resolve the value from the creature entry or GM ruling.",
  "Essence Attacks": "All damage from the ghost's natural attacks becomes Essence damage and those attacks gain 1d6 secondary cold damage."
};

const DEFS = {
  ghost: {
    name: "Ghost Template", requirement: "Any creature", undead: true,
    senses: [["Darkvision", "abilities"], ["Life Sense", "creature-abilities"]],
    mods: { dexterity: 1, wisdom: 2, charisma: 2 }, setAbilities: { strength: -4 },
    override: [["system.combat.criticalResistance", 1]],
    lists: { immunities: ["bleed", "disease", "fatigue", "mundane", "paralysis", "poison", "precision", "sleep", "soul drain", "stunning", "subdual"], resistances: ["all damage"], weaknesses: ["essence", "force"] },
    coreGrants: [["Iron Will", "feats"], ["Undead Fortitude", "creature-abilities"], ["Hurling", "spells"]],
    customGrants: ["Incorporeal", "Wail of the Departed", "Essence Attacks"],
    dynamic: ["flyEqualsLand", "ghostNaturalAttacks"]
  },
  lich: {
    name: "Lich Template", requirement: "Spellcasting creature of 15th level or higher", undead: true,
    validate: (a) => actorLevel(a) >= 15 && isSpellcaster(a) ? null : "Lich requires a spellcasting creature of 15th level or higher.",
    senses: [["Darkvision", "abilities"]],
    // Constitution +1 is supplied by TRG Prime's Undead Creature Type.
    mods: { intelligence: 2, wisdom: 2, charisma: 2 },
    override: [["system.combat.criticalResistance", 4]],
    lists: { immunities: ["bleed", "cold", "disease", "electricity", "paralysis", "poison", "sleep", "soul drain", "stunning", "subdual"], resistances: ["piercing", "slashing"] },
    coreGrants: [["Faultless Casting", "creature-abilities"], ["Frightful Aura", "creature-abilities"], ["Inflict", "spells"]],
    customGrants: ["Paralytic Touch", "Phylactery of Eternal Resurgence"],
    attacks: [{ name: "Bony Hand", damage: "1d8+5", damageType: "bludgeoning", traits: "Agile, Finesse, Magical", attackBonus: 7, secondaryDamage: { formula: "2d8", type: "essence" } }]
  },
  werebat: {
    name: "Werebat Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Echolocation", "creature-abilities"]],
    mods: { strength: 1, constitution: 1, dexterity: 2, wisdom: 1, charisma: -1 },
    override: [["system.combat.movement.fly.base", 25]], naturalDR: 1,
    lists: { resistances: ["physical"], weaknesses: ["silver"] },
    customGrants: ["Animal Empathy", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Bite", damage: "1d8", damageType: "piercing", traits: "Finesse" }, { name: "Wing", damage: "1d6", damageType: "bludgeoning", traits: "Finesse, Reach" }]
  },
  werebear: {
    name: "Werebear Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Scent", "abilities"]],
    mods: { strength: 2, constitution: 2, wisdom: 1, charisma: -2 },
    override: [["system.identity.size", "large"]], add: [["system.combat.movement.land", 5]], naturalDR: 1,
    lists: { resistances: ["physical"], weaknesses: ["silver"] },
    coreGrants: [["Monstrous Grab", "abilities"]],
    customGrants: ["Animal Empathy", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Bite", damage: "1d10", damageType: "piercing", traits: "Finesse", size: "large" }, { name: "Claw", damage: "1d8", damageType: "slashing", traits: "Agile, Finesse, Versatile - P", size: "large" }]
  },
  wereboar: {
    name: "Wereboar Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Scent", "abilities"]],
    mods: { strength: 1, constitution: 2, intelligence: -1, wisdom: 1, charisma: -2 }, add: [["system.combat.movement.land", 5]], naturalDR: 1,
    lists: { resistances: ["physical"], weaknesses: ["silver"] }, coreGrants: [["Powerful Charge", "creature-abilities"]],
    customGrants: ["Animal Empathy", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Gore", damage: "1d8", damageType: "piercing", traits: "Finesse" }]
  },
  werecat: {
    name: "Werecat Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Scent", "abilities"]],
    mods: { strength: 2, constitution: 2, dexterity: 1, intelligence: -1, wisdom: 1, charisma: -2 }, add: [["system.combat.movement.land", 10]], naturalDR: 1,
    lists: { resistances: ["physical"], weaknesses: ["silver"] }, coreGrants: [["Pouncing Assault", "creature-abilities"]],
    customGrants: ["Animal Empathy", "Cat's Landing", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Bite", damage: "1d8", damageType: "piercing", traits: "Finesse" }, { name: "Claw", damage: "1d6", damageType: "slashing", traits: "Agile, Finesse, Versatile - P" }]
  },
  wererat: {
    name: "Wererat Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Scent", "abilities"]],
    mods: { strength: 1, constitution: 1, dexterity: 2, intelligence: -1, wisdom: 1, charisma: -1 },
    lists: { immunities: ["disease"], resistances: ["physical"], weaknesses: ["silver"] },
    customGrants: ["Animal Empathy", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Bite", damage: "1d8", damageType: "piercing", traits: "Finesse" }, { name: "Claw", damage: "1d6", damageType: "slashing", traits: "Agile, Finesse, Versatile - P" }]
  },
  wereraven: {
    name: "Wereraven Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Scent", "abilities"]], mods: { constitution: 1, dexterity: 3, wisdom: 1, charisma: -1 },
    override: [["system.combat.movement.fly.base", 40]], lists: { resistances: ["physical"], weaknesses: ["silver"] },
    coreGrants: [["Diving Strike", "creature-abilities"], ["Keen Sense", "creature-abilities"]],
    customGrants: ["Animal Empathy", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Bite", damage: "1d8", damageType: "piercing", traits: "Finesse" }, { name: "Claw", damage: "1d6", damageType: "slashing", traits: "Agile, Finesse, Versatile - P" }]
  },
  werewolf: {
    name: "Werewolf Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Scent", "abilities"]],
    mods: { strength: 1, constitution: 1, dexterity: 1, intelligence: -2, wisdom: 1, charisma: -1 }, add: [["system.combat.movement.land", 10]], naturalDR: 1,
    lists: { resistances: ["physical"], weaknesses: ["silver"] }, coreGrants: [["Pack Attack", "abilities"]],
    customGrants: ["Animal Empathy", "Luna Frenzy", "Lycanthropic Curse", "Shift Form"],
    attacks: [{ name: "Bite", damage: "1d8", damageType: "piercing", traits: "Finesse" }, { name: "Claw", damage: "1d6", damageType: "slashing", traits: "Agile, Finesse, Versatile - P" }]
  },
  mournkin: {
    name: "Mournkin Template", requirement: "Humanoid", humanoid: true,
    senses: [["Nightvision", "abilities"], ["Life Sense", "creature-abilities"]], mods: { dexterity: 1, intelligence: 1 },
    override: [["system.skills.meditation.classSkill", true]], lists: { resistances: ["cold"], weaknesses: ["essence"] },
    coreGrants: [["Grave-Touched Presence", "creature-abilities"], ["Whispers of the Grave", "creature-abilities"]],
    attacks: [{ name: "Grave Touch", damage: "1d6", damageType: "cold", traits: "Agile, Finesse, Magical" }],
    el: 1
  },
  skeleton: {
    name: "Skeleton Template", requirement: "Any creature", undead: true,
    senses: [["Darkvision", "abilities"], ["Life Sense", "creature-abilities"]], mods: { strength: 1, constitution: 1, dexterity: 1 }, setAbilities: { intelligence: -5, charisma: -5 },
    add: [["system.combat.movement.land", 5]], naturalDR: 1,
    lists: { immunities: ["bleed", "cold", "disease", "fatigue", "paralysis", "poison", "sleep", "soul drain", "stunning", "subdual"], resistances: ["physical (bludgeoning)", "electricity", "fire"] },
    coreGrants: [["Toughness", "feats"]], attacks: [{ name: "Claw", damage: "1d6", damageType: "slashing", traits: "Agile, Finesse, Versatile - P" }],
    dynamic: ["skeletonSkills"]
  },
  vampire: {
    name: "Vampire Template", requirement: "Humanoid", humanoid: true, undead: true,
    senses: [["Darkvision", "abilities"]], mods: { strength: 4, constitution: 2, dexterity: 4, intelligence: 2, wisdom: 2, charisma: 4 },
    lists: { immunities: ["bleed", "charm", "disease", "fatigue", "paralysis", "poison", "sleep", "stunning"], resistances: ["cold", "electricity", "mundane (silver)"] },
    coreGrants: [["Alertness", "feats"], ["Drink Blood", "creature-abilities"], ["Fear of Water", "creature-abilities"], ["Garlic Repulsion", "creature-abilities"], ["Sunlight Weakness", "creature-abilities"], ["Undead Spawn", "creature-abilities"], ["Dominate", "spells"], ["Cloudkill", "spells"], ["Gaseous Form", "spells"], ["Shape of the Animal", "spells"], ["Spider Climb", "spells"], ["Charm Kind", "spells"], ["Obscuring Mist", "spells"]],
    customGrants: ["Fast Healing"], attacks: [{ name: "Claw", damage: "1d6", damageType: "slashing", traits: "Agile, Finesse, Magical" }], el: 2
  },
  zombie: {
    name: "Zombie Template", requirement: "Any living creature", undead: true,
    validate: (a) => String(actorCreatureType(a)).toLowerCase() === "undead" ? "Zombie requires a living creature; the selected Actor is already Undead." : null,
    senses: [["Darkvision", "abilities"], ["Life Sense", "creature-abilities"]], mods: { strength: 2, dexterity: -1 }, setAbilities: { intelligence: -5, charisma: -5 }, add: [["system.combat.movement.land", -5]],
    lists: { immunities: ["bleed", "disease", "fatigue", "paralysis", "poison", "sleep", "soul drain", "stunning", "subdual"], weaknesses: ["essence", "slashing"] },
    coreGrants: [["Endless Hunger", "creature-abilities"], ["Slow", "creature-abilities"], ["Undead Fortitude", "creature-abilities"]], customGrants: ["Mindless", "Zombie Plague"],
    attacks: [{ name: "Bite", damage: "1d6", damageType: "piercing", traits: "Finesse", note: "A damaging Bite can transmit Zombie Plague as described by the template." }, { name: "Slam", damage: "1d8", damageType: "bludgeoning", traits: "Agile, Finesse" }]
  }
};

async function packDocument(packName, name) {
  const pack = game.packs.get(CORE_PACK(packName));
  if (!pack) throw new Error(`Core compendium ${CORE_PACK(packName)} is unavailable.`);
  const index = await pack.getIndex({ fields: ["name"] });
  const hit = index.find((e) => String(e.name).trim().toLowerCase() === String(name).trim().toLowerCase());
  if (!hit) throw new Error(`Could not find ${name} in ${CORE_PACK(packName)}.`);
  return pack.getDocument(hit._id);
}

async function moduleTemplateDocument(key) {
  const pack = game.packs.get(TEMPLATE_PACK);
  if (!pack) throw new Error("Fiends & Fables Templates compendium is unavailable.");
  const index = await pack.getIndex({ fields: ["name", `flags.${MODULE_ID}.template.key`] });
  const hit = index.find((e) => e.flags?.[MODULE_ID]?.template?.key === key)
    ?? index.find((e) => String(e.name).toLowerCase() === DEFS[key].name.toLowerCase());
  if (!hit) throw new Error(`Template compendium entry not found for ${DEFS[key].name}.`);
  return pack.getDocument(hit._id);
}

function makeAbility(name, key, description = COMMON[name] ?? "Fiends & Fables template ability.") {
  return {
    name, type: "ability", img: "icons/svg/aura.svg",
    system: { source: "TRG Prime Fiends & Fables 2.7", category: "Creature Template", tier: "", level: 0, prerequisites: "", active: true, description, usesPerDay: "", bonusUses: 0, usesValue: 0, sourceRace: "", sourceClass: "", traits: "" },
    flags: templateFlags(key)
  };
}

function makeWeapon(spec, key) {
  return {
    name: spec.name, type: "weapon", img: "icons/svg/sword.svg",
    system: {
      quantity: 1, weight: 0, price: 0, equipped: true, invested: false, hp: { value: 0, max: 0 }, stowed: false,
      traits: spec.traits ?? "", description: spec.note ?? `Natural attack granted by the ${DEFS[key].name}.`, attackBonus: Number(spec.attackBonus) || 0,
      damage: spec.damage ?? "1d6", damageType: spec.damageType ?? "", baseDamage: 0, hands: 1, twoHandedGrip: false, range: "", armourRending: 0,
      proficiency: "", fumbleDC: 5, attackMode: "melee", rangeIncrement: 0, group: "Brawling", category: "", size: spec.size ?? "medium", itemLevel: 0,
      quality: "standard", material: "", superiorTraits: "", runes: "", loaded: true, magazine: 0, reloadProgress: 0, usedQuickLoadThisRound: false, spinBonus: 0, attackedThisTurn: false, natural: true
    },
    flags: { ...templateFlags(key), ...(spec.secondaryDamage ? { [MODULE_ID]: { templateKey: key, templateGenerated: true, secondaryDamage: spec.secondaryDamage } } : {}) }
  };
}

function changesFor(def, actor) {
  const changes = [];
  for (const [ability, value] of Object.entries(def.mods ?? {})) {
    changes.push({ key: `system.attributes.${ability}.racial`, mode: ADD, value: String(value), priority: 40 });
  }
  for (const [path, value] of def.add ?? []) changes.push({ key: path, mode: ADD, value: String(value), priority: 40 });
  for (const [path, value] of def.override ?? []) changes.push({ key: path, mode: OVERRIDE, value: String(value), priority: 50 });
  if (def.naturalDR) changes.push({ key: "system.combat.naturalArmourFlat.natural", mode: ADD, value: String(def.naturalDR), priority: 40 });
  for (const [field, values] of Object.entries(def.lists ?? {})) {
    for (const value of values) changes.push({ key: `system.combat.${field}`, mode: ADD, value: `, ${value}`, priority: 40 });
  }
  // To SET a final ability score rather than merely replacing its base, account
  // for all live modifiers already on the Actor and override only the base slot.
  for (const [ability, target] of Object.entries(def.setAbilities ?? {})) {
    const data = actor.system?.attributes?.[ability] ?? {};
    const base = Number(data.base) || 0;
    const total = Number(data.total);
    const outsideBase = Number.isFinite(total) ? total - base : 0;
    changes.push({ key: `system.attributes.${ability}.base`, mode: OVERRIDE, value: String(target - outsideBase), priority: 60 });
  }
  if (def.dynamic?.includes("flyEqualsLand")) {
    // Speeds are bonus pools since core 3.412.0 — read the resolved total, never Number() the object.
    const land = actor.system?.combat?.movement?.land;
    const landSpeed = (land && typeof land === "object") ? Number(land.total ?? land.base ?? 0) : Number(land);
    changes.push({ key: "system.combat.movement.fly.base", mode: OVERRIDE, value: String(Number.isFinite(landSpeed) ? landSpeed : 0), priority: 60 });
  }
  return changes;
}

async function createActorEffect(actor, def, key) {
  const changes = changesFor(def, actor);
  if (!changes.length) return [];
  const [effect] = await actor.createEmbeddedDocuments("ActiveEffect", [{
    name: `${def.name}: template modifications`, img: "icons/svg/upgrade.svg", transfer: false, disabled: false,
    changes, flags: templateFlags(key), duration: {}, statuses: [], description: `Reversible modifications applied by ${def.name}.`
  }]);
  return effect ? [effect.id] : [];
}

async function replaceCreatureType(actor, key, state) {
  state.replacedCreatureTypes = actor.items.filter((i) => i.type === "creature-type").map((i) => i.toObject());
  const ids = actor.items.filter((i) => i.type === "creature-type").map((i) => i.id);
  if (ids.length) await actor.deleteEmbeddedDocuments("Item", ids);
  const doc = await packDocument("creature-types", "Undead");
  const source = mergeFlags(doc.toObject(), key); delete source._id;
  const [created] = await actor.createEmbeddedDocuments("Item", [source]);
  if (created) state.generatedItemIds.push(created.id);
}

async function createTemplateItem(actor, key, state) {
  const doc = await moduleTemplateDocument(key);
  const source = mergeFlags(doc.toObject(), key); delete source._id;
  const [created] = await actor.createEmbeddedDocuments("Item", [source]);
  if (created) {
    state.templateItemId = created.id;
    state.generatedItemIds.push(created.id);
  }
}

const baseName = (n) => String(n ?? "").toLowerCase().replace(/\s*\(.*?\)\s*$/, "").trim();

async function grantCore(actor, key, name, packName, state) {
  const wantType = packName === "spells" ? "spell" : packName === "feats" ? "feat" : "ability";
  const existing = actor.items.find((i) => i.type === wantType && baseName(i.name) === baseName(name));
  if (existing) return existing;
  const doc = await packDocument(packName, name);
  const source = mergeFlags(doc.toObject(), key); delete source._id;
  if (source.type === "spell") {
    source.flags[MODULE_ID].innate = true;
    source.system ??= {};
    source.system.innate = true;
  }
  const [created] = await actor.createEmbeddedDocuments("Item", [source]);
  if (created) state.generatedItemIds.push(created.id);
  return created;
}

async function grantCustom(actor, key, name, state) {
  if (actor.items.some((i) => i.name === name)) return null;
  const [created] = await actor.createEmbeddedDocuments("Item", [makeAbility(name, key)]);
  if (created) state.generatedItemIds.push(created.id);
  return created;
}

async function grantAttack(actor, key, spec, state) {
  if (actor.items.some((i) => i.type === "weapon" && i.name === spec.name && i.flags?.[MODULE_ID]?.templateKey === key)) return null;
  const [created] = await actor.createEmbeddedDocuments("Item", [makeWeapon(spec, key)]);
  if (created) state.generatedItemIds.push(created.id);
  return created;
}

async function applySkeletonSkills(actor, state) {
  const level = actorLevel(actor);
  const names = ["acrobatics", "athletics", "climbing", "perception", "stealth"];
  state.skillRanks = {};
  const update = {};
  for (const name of names) {
    const old = Number(actor.system?.skills?.[name]?.ranks) || 0;
    state.skillRanks[name] = old;
    update[`system.skills.${name}.ranks`] = level;
  }
  await actor.update(update);
}

async function applyGhostAttacks(actor, key, state) {
  state.changedNaturalAttacks = [];
  const updates = [];
  for (const item of actor.items.filter((i) => i.type === "weapon" && i.system?.natural)) {
    const source = item.toObject();
    state.changedNaturalAttacks.push({ id: item.id, damageType: source.system?.damageType ?? "", description: source.system?.description ?? "", flags: source.flags?.[MODULE_ID] ?? null });
    // ghostConvertedKey (not templateKey) — templateKey marks GENERATED items, and removal deletes those.
    const f = { ...(item.flags?.[MODULE_ID] ?? {}), ghostConvertedKey: key, ghostOriginalDamageType: source.system?.damageType ?? "", secondaryDamage: { formula: "1d6", type: "cold" } };
    updates.push({ _id: item.id, "system.damageType": "essence", [`flags.${MODULE_ID}`]: f });
  }
  if (updates.length) await actor.updateEmbeddedDocuments("Item", updates);
}

/**
 * Core's grant-autorun hands the Undead creature type its own Darkvision; the
 * template grants one as well. Keep a single copy of each sense, preferring the
 * one that was already on the actor.
 */
async function collapseDuplicateSenses(actor, def, state) {
  const names = new Set((def.senses ?? []).map(([n]) => baseName(n)));
  if (!names.size) return;
  const remove = [];
  for (const b of names) {
    const copies = actor.items.filter((i) => i.type === "ability" && baseName(i.name) === b);
    if (copies.length < 2) continue;
    const keep = copies.find((i) => !i.flags?.[MODULE_ID]?.templateKey && !i.flags?.["trg-prime"]?.grantedBy) ?? copies[0];
    for (const c of copies) if (c.id !== keep.id) remove.push(c.id);
  }
  if (remove.length) {
    await actor.deleteEmbeddedDocuments("Item", remove);
    state.generatedItemIds = state.generatedItemIds.filter((id) => !remove.includes(id));
  }
}

function validationError(actor, def) {
  if (!actor || !["character", "npc"].includes(actor.type)) return "Templates can only be applied to TRG Prime PC or NPC Actors.";
  if (def.humanoid && !isHumanoid(actor)) return `${def.name} may only be applied to a Humanoid creature.`;
  return def.validate?.(actor) ?? null;
}

export async function applyTemplate(actor, key, { force = false } = {}) {
  const def = DEFS[key];
  if (!def) throw new Error(`Unknown Fiends & Fables template: ${key}`);
  const current = foundry.utils.deepClone(actor.getFlag(MODULE_ID, "templates") ?? {});
  if (current[key]) return notify("warn", `${actor.name} already has ${def.name}.`);
  if (Object.keys(current).length && !force) {
    return notify("warn", `${actor.name} already has a Fiends & Fables template. Remove it before applying another template; this keeps restoration deterministic.`);
  }
  const invalid = validationError(actor, def);
  if (invalid && !force) return notify("error", invalid);

  const state = {
    key, name: def.name, appliedAt: Date.now(), actorType: actor.type,
    generatedItemIds: [], generatedEffectIds: [], replacedCreatureTypes: [], skillRanks: null, changedNaturalAttacks: null,
    baseCreatureType: actorCreatureType(actor), baseRace: actor.system?.identity?.race ?? "", baseClass: actor.system?.identity?.class ?? ""
  };

  try {
    if (def.undead) await replaceCreatureType(actor, key, state);
    await createTemplateItem(actor, key, state);
    state.generatedEffectIds.push(...await createActorEffect(actor, def, key));
    for (const [name, pack] of def.senses ?? []) await grantCore(actor, key, name, pack, state);
    for (const [name, pack] of def.coreGrants ?? []) await grantCore(actor, key, name, pack, state);
    for (const name of def.customGrants ?? []) await grantCustom(actor, key, name, state);
    for (const spec of def.attacks ?? []) await grantAttack(actor, key, spec, state);
    if (def.dynamic?.includes("skeletonSkills")) await applySkeletonSkills(actor, state);
    if (def.dynamic?.includes("ghostNaturalAttacks")) await applyGhostAttacks(actor, key, state);
    await collapseDuplicateSenses(actor, def, state);

    current[key] = state;
    await actor.setFlag(MODULE_ID, "templates", current);
    notify("info", `${def.name} applied to ${actor.name}.`);
    actor.sheet?.render?.(false);
    return state;
  } catch (error) {
    console.error("Fiends & Fables Prime | Template application failed", error);
    // Roll back whatever was generated so the actor is not left half-templated with no removal path.
    try {
      const itemIds = actor.items.filter((i) => i.flags?.[MODULE_ID]?.templateKey === key).map((i) => i.id);
      if (itemIds.length) await actor.deleteEmbeddedDocuments("Item", itemIds);
      const effectIds = actor.effects.filter((e) => e.flags?.[MODULE_ID]?.templateKey === key).map((e) => e.id);
      if (effectIds.length) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
      if (state.replacedCreatureTypes?.length && !actor.items.some((i) => i.type === "creature-type")) {
        await actor.createEmbeddedDocuments("Item", state.replacedCreatureTypes.map((s) => { const x = foundry.utils.deepClone(s); delete x._id; return x; }));
      }
    } catch (rollbackError) {
      console.error("Fiends & Fables Prime | Rollback after failed template application also failed", rollbackError);
    }
    notify("error", `${def.name} could not be applied and has been rolled back. Check the console; no core-system files were modified.`);
    throw error;
  }
}

export async function removeTemplate(actor, key) {
  const all = foundry.utils.deepClone(actor.getFlag(MODULE_ID, "templates") ?? {});
  const state = all[key];
  if (!state) return notify("warn", `${actor.name} does not have ${DEFS[key]?.name ?? key}.`);
  if (state.builtInExample) return notify("warn", `${actor.name} is the packaged Human + Lich example; its template is part of the compendium build and is not removed in-place.`);

  const effectIds = actor.effects.filter((e) => e.flags?.[MODULE_ID]?.templateKey === key).map((e) => e.id);
  if (effectIds.length) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);

  // Restore Ghost-converted natural attacks before deleting generated Items.
  for (const snap of state.changedNaturalAttacks ?? []) {
    const item = actor.items.get(snap.id);
    if (!item) continue;
    // Restore the snapshot and explicitly strip the conversion keys — a merge would keep them.
    await item.update({
      "system.damageType": snap.damageType,
      [`flags.${MODULE_ID}`]: snap.flags ?? {},
      [`flags.${MODULE_ID}.-=ghostConvertedKey`]: null,
      [`flags.${MODULE_ID}.-=templateKey`]: null,
      [`flags.${MODULE_ID}.-=ghostOriginalDamageType`]: null,
      [`flags.${MODULE_ID}.-=secondaryDamage`]: null
    });
  }
  if (state.skillRanks) {
    const updates = {};
    for (const [name, value] of Object.entries(state.skillRanks)) updates[`system.skills.${name}.ranks`] = value;
    await actor.update(updates);
  }

  const generated = actor.items.filter((i) => i.flags?.[MODULE_ID]?.templateKey === key).map((i) => i.id);
  if (generated.length) await actor.deleteEmbeddedDocuments("Item", generated);

  if (state.replacedCreatureTypes?.length) {
    const sources = state.replacedCreatureTypes.map((s) => { const x = foundry.utils.deepClone(s); delete x._id; return x; });
    await actor.createEmbeddedDocuments("Item", sources);
  }

  delete all[key];
  await actor.setFlag(MODULE_ID, "templates", all);
  notify("info", `${DEFS[key]?.name ?? key} removed from ${actor.name}.`);
  actor.sheet?.render?.(false);
}

export function appliedTemplates(actor) {
  return foundry.utils.deepClone(actor?.getFlag?.(MODULE_ID, "templates") ?? {});
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

export async function openTemplateManager(actor) {
  if (!actor) return;
  const applied = appliedTemplates(actor);
  const rows = Object.entries(DEFS).map(([key, def]) => {
    const on = Boolean(applied[key]);
    const valid = !validationError(actor, def);
    const disabled = on || (!valid && !game.user.isGM);
    return `<label class="ffp-template-row" style="display:grid;grid-template-columns:24px 1fr;gap:8px;align-items:start;padding:5px 0;border-bottom:1px solid var(--color-border-light-primary)">
      <input type="radio" name="ffpTemplate" value="${esc(key)}" ${disabled ? "disabled" : ""}>
      <span><strong>${esc(def.name)}</strong>${on ? " <em>(applied)</em>" : ""}<br><small>${esc(def.requirement)}${valid ? "" : " — requirements not currently met"}</small></span>
    </label>`;
  }).join("");
  const appliedText = Object.values(applied).map((x) => x.name).join(", ") || "None";
  const { DialogV2 } = foundry.applications.api;
  const result = await DialogV2.wait({
    window: { title: `Fiends & Fables Templates — ${actor.name}`, icon: "fa-solid fa-wand-magic-sparkles" },
    classes: ["trg-prime", "ffp-template-dialog"], position: { width: 520, height: 690 },
    content: `<div class="trg-prime"><p><strong>Applied:</strong> ${esc(appliedText)}</p><p class="hint">Select a sourcebook template. Application is reversible and records generated Items/effects. One Fiends & Fables template at a time is enforced for deterministic restoration.</p><div style="max-height:470px;overflow:auto">${rows}</div></div>`,
    buttons: [
      { action: "apply", label: "Apply", icon: "fa-solid fa-plus", default: true, callback: (event, button, dialog) => dialog?.element?.querySelector?.('input[name="ffpTemplate"]:checked')?.value ?? null },
      { action: "remove", label: "Remove Applied", icon: "fa-solid fa-minus", callback: () => Object.keys(applied)[0] ?? null },
      { action: "cancel", label: "Cancel", icon: "fa-solid fa-xmark" }
    ], rejectClose: false
  });
  if (!result || result === "cancel") return;
  const action = result.action ?? result;
  const value = result.value ?? result;
  // DialogV2.wait returns the callback value for a button. Apply callbacks
  // return a key; Remove returns the current key. Distinguish by whether the
  // selected key is already applied.
  const key = typeof value === "string" ? value : null;
  if (!key) return;
  if (applied[key]) return removeTemplate(actor, key);
  // A GM may pick a template whose requirements are not met; that choice is honoured with force.
  const force = Boolean(game.user.isGM && validationError(actor, DEFS[key]));
  return applyTemplate(actor, key, { force });
}

function asElement(html) {
  const H = globalThis.HTMLElement;
  if (!H || !html) return null;
  if (html instanceof H) return html;
  if (html[0] instanceof H) return html[0];
  if (html.element instanceof H) return html.element;
  if (html.element?.[0] instanceof H) return html.element[0];
  return null;
}

function injectSheetButton(app, html) {
  if (app?.constructor?.name !== "TRGActorSheet") return;
  const actor = app.actor ?? app.document;
  if (!actor || !["character", "npc"].includes(actor.type)) return;
  const primary = asElement(html);
  const roots = [primary, app.element].filter(Boolean);
  if (roots.some((r) => r?.querySelector?.("[data-ffp-templates]"))) return;
  const root = roots.find((r) => r?.querySelector?.(".window-header"));
  if (!root?.querySelector) return;
  const header = root.querySelector(".window-header");
  if (!header) return;
  const button = document.createElement("button");
  button.type = "button"; button.dataset.ffpTemplates = ""; button.className = "header-control icon";
  button.title = "Fiends & Fables Templates"; button.setAttribute("aria-label", button.title);
  button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
  button.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); openTemplateManager(actor); });
  const anchor = header.querySelector('[data-action="close"]');
  if (anchor) anchor.before(button); else header.append(button);
}


function addActorDirectoryTemplateContext(_html, options) {
  if (!Array.isArray(options) || options.some((o) => o.ffpTemplates)) return;
  options.push({
    name: "Fiends & Fables Templates",
    icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>',
    ffpTemplates: true,
    condition: (entry) => {
      const el = entry?.[0] ?? entry;
      const id = el?.dataset?.documentId ?? el?.dataset?.entryId ?? el?.dataset?.actorId;
      const actor = game.actors?.get?.(id);
      return Boolean(actor && ["character", "npc"].includes(actor.type));
    },
    callback: (entry) => {
      const el = entry?.[0] ?? entry;
      const id = el?.dataset?.documentId ?? el?.dataset?.entryId ?? el?.dataset?.actorId;
      const actor = game.actors?.get?.(id);
      if (actor) openTemplateManager(actor);
    }
  });
}

Hooks.once("init", () => {
  game.fiendsAndFablesPrime ??= {};
  game.fiendsAndFablesPrime.templates = { definitions: DEFS, apply: applyTemplate, remove: removeTemplate, listApplied: appliedTemplates, open: openTemplateManager };
});

Hooks.on("renderTRGActorSheet", injectSheetButton);
// Foundry 13+ emits get<DocumentName>ContextOptions for the ApplicationV2 directories.
Hooks.on("getActorContextOptions", addActorDirectoryTemplateContext);

Hooks.once("ready", () => {
  console.log(`Fiends & Fables Prime | Template framework ready (${Object.keys(DEFS).length} templates). API: game.fiendsAndFablesPrime.templates`);
});
