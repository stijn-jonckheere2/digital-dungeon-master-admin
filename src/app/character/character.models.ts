export class Character {
    public abilities: Ability[];
    public inventory: InventoryItem[];
    public questLog: Quest[];
    public npcList: Npc[];

    public primaryStats: CharacterStat[];
    public armorStats: CharacterStat[];
    public weaponStats: CharacterStat[];
    public rangedStats: CharacterStat[];
    public professionStats: CharacterStat[];
    public secondaryStats: CharacterStat[];

    constructor(
        public name: string,
        public race: string,
        public className: string,
        public age: number,
        public description: string,
        public level: number
    ) {
        this.abilities = [];
        this.inventory = [];
        this.questLog = [];
        this.npcList = [];

        this.generatePrimaryStats();
        this.generateSecondaryStats();
        this.generateWeaponStats();
        this.generateRangedStats();
        this.generateArmorStats();
        this.generateProfessionStats();
    }

    generatePrimaryStats() {
        this.primaryStats = [];
        for (const stat of primaryStatNames) {
            this.primaryStats.push(new CharacterStat(stat, 0));
        }
    }

    generateArmorStats() {
        this.armorStats = [];
        for (const stat of armorStatNames) {
            this.armorStats.push(new CharacterStat(stat, 3));
        }
    }

    generateWeaponStats() {
        this.weaponStats = [];
        for (const stat of weaponStatNames) {
            this.weaponStats.push(new CharacterStat(stat, 3));
        }
    }

    generateRangedStats() {
        this.rangedStats = [];
        for (const stat of rangedStatNames) {
            this.rangedStats.push(new CharacterStat(stat, 3));
        }
    }

    generateProfessionStats() {
        this.professionStats = [];
        for (const stat of professionStatNames) {
            this.professionStats.push(new CharacterStat(stat, 3));
        }
    }

    generateSecondaryStats() {
        this.secondaryStats = [];
        for (const stat of secondaryStatNames) {
            this.secondaryStats.push(new CharacterStat(stat, 3));
        }
    }
}

export class Ability {
    constructor(
        public name: string,
        public description: string,
        public usesPerTurn: number,
        public isFlavourAbility: boolean
    ) { }
}

export class InventoryItem {
    constructor(
        public name: string,
        public description: string,
        public amount: number,
        public consumable: boolean
    ) { }
}

export class Quest {
    constructor(
        public name: string,
        public description: string,
        public complete: boolean,
    ) { }
}

export class Npc {
    constructor(
        public name: string,
        public description: string
    ) { }
}

export class CharacterStat {
    constructor(
        public name: string,
        public level: number
    ) { }
}

export const primaryStatNames = [
    "strength",
    "agility",
    "intellect",
    "perception",
    "charisma",
    "ego",
    "constitution",
    "education"
];

export const armorStatNames = [
    "cloth",
    "hide",
    "leather",
    "chainmail",
    "heavy plate"
];

export const weaponStatNames = [
    "Sword",
    "Axe",
    "Mace",
    "2H sword",
    "2H axe",
    "2H mace",
    "Polearm",
    "Dagger",
    "Offhand shield",
];

export const rangedStatNames = [
    "Shortbow (110 m)",
    "Longbow (200 m)",
    "Crossbow (100 m)",
    "Slingshot (80 m)",
    "Throwing knife (15 m)",
    "Staff",
    "Wand",
    "Offhand orb",
    "Offhand tome",
];

export const professionStatNames = [
    "Alchemy",
    "BS armor",
    "BS weapons",
    "Fletching",
    "Tailoring",
    "Leatherworking",
    "Runescribe",
    "Farming",
    "Hunting",
    "Trap Making",
].sort();

export const secondaryStatNames = [
    "Sneaking",
    "Search",
    "Speech",
    "Climb",
    "Dodge",
    "Hide",
    "Throwing",
    "Unarmed combat",
    "Fortune Telling",
    "Bargaining",
    "Language",
    "Disguise",
    "Meditation",
    "Sleight of hand",
    "Savenging",
    "Riding",
    "Survival",
    "Burglary",
    "Lockpicking",
    "Flirting",
    "Occultism",
    "Cosmology",
    "Net of Contacts",
    "Information retrieval",
    "Shadowing",
    "City/area knowledge",
    "Medicine"
].sort();
