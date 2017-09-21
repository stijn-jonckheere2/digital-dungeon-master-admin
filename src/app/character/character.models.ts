export class Character {
    inventory: InventoryItem[] = [];
    questLog: Quest[] = [];
    npcList: Npc[] = [];

    constructor(
        public name: string,
        public race: string,
        public className: string,
        public age: number,
        public description: string,
        public level: number
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
