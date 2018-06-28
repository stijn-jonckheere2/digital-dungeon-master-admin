import { Injectable, EventEmitter } from "@angular/core";
import * as firebase from "firebase";
import { environment } from "../../../environments/environment";

import { Http } from "@angular/http";
import { Character, InventoryItem, Npc, Quest, Ability, CombatSheet, DraconicBloodKnightCombatSheet, DraconicBloodKnightAbility, NecromancerCombatSheet } from "../../shared/models";
import { AuthService } from "../../auth/services/auth.service";
import { ErrorService } from "./error-service.service";

@Injectable()
export class CharacterService {

    characters: Character[] = [];
    charactersFetched = false;
    characterSelection = new EventEmitter<number>();
    characterUpdatesReceived = new EventEmitter<null>();
    characterDb: any;

    constructor(private authService: AuthService,
        private http: Http,
        private errorService: ErrorService) {
    }

    // Service Methods
    setCharacterSelected(charId: number) {
        this.characterSelection.emit(charId);
    }

    unsetCharacterSelected() {
        this.characterSelection.emit(-1);
    }

    // Character Methods
    saveCharacters() {
        const charactersPerUser = this.deconvertCharacters();
        const url = environment.database.databaseURL + "/characters.json";
        this.http.put(url, charactersPerUser).subscribe(
            (response) => { console.log("Characters saved succesfully!" + new Date()); },
            (error) => {
                this.errorService.displayError("Save characters failed! => " + error);
            }
        );
    }

    fetchCharacters() {
        const fetchPromise = new Promise(
            (resolve, reject) => {
                const userId = this.authService.getUserId();
                this.characterDb = firebase.database().ref().child("characters");
                console.log("Fetching Characters!" + new Date());

                this.characterDb.on("value", snapshot => {
                    if (snapshot.val() !== null) {
                        this.convertCharacters(snapshot.val());
                        this.characterUpdatesReceived.emit();
                    }
                    resolve();
                });
            }
        );
        return fetchPromise;
    }

    convertCharacters(characters) {
        this.characters = [];
        for (const prop in characters) {
            if (characters[prop]) {
                characters[prop].map((char, index) => {
                    this.characters.push(Character.fromJSON(char, prop));
                });
            }
        }
        this.charactersFetched = true;
    }

    deconvertCharacters() {
        const deconvertedCharacters = {};

        for (const char of this.characters) {
            if (typeof deconvertedCharacters[char["userId"]] === typeof []) {
                deconvertedCharacters[char.userId].push(char);
            } else {
                deconvertedCharacters[char.userId] = [];
                deconvertedCharacters[char.userId].push(char);
            }
        }

        return deconvertedCharacters;
    }

    getCharacters() {
        const promise = new Promise(
            (resolve, reject) => {
                console.log("Get Characters Called" + new Date(), this.charactersFetched);
                if (this.charactersFetched) {
                    resolve(this.characters);
                } else {
                    this.fetchCharacters().then(
                        () => {
                            resolve(this.characters);
                        }
                    );
                }
            }
        );

        return promise;
    }

    getCharacterById(id: number) {
        const promise = new Promise(
            (resolve, reject) => {
                if (this.charactersFetched) {
                    this.characterSelection.emit(id);
                    resolve(this.characters[id]);
                } else {
                    this.fetchCharacters().then(
                        () => {
                            this.characterSelection.emit(id);
                            resolve(this.characters[id]);
                        }
                    );
                }
            }
        );
        return promise;
    }

    getCharacterByIdForEdit(id: number) {
        const promise = new Promise(
            (resolve, reject) => {
                if (this.charactersFetched) {
                    resolve(this.characters[id]);
                } else {
                    this.fetchCharacters().then(
                        () => {
                            resolve(this.characters[id]);
                        }
                    );
                }
            }
        );
        return promise;
    }

    updateCharacterById(id: number, character: Character) {
        this.characters[id] = character;
        this.saveCharacters();
    }

    updateCharacterByIdAfterEdit(id: number, character: Character) {
        const char = this.convertClass(character);
        this.characters[id] = char;
        this.saveCharacters();
    }

    // Inventory Methods
    addInventoryItem(charId: number, item: InventoryItem) {
        if (this.characters[charId].inventory) {
            this.characters[charId].inventory.push(item);
        } else {
            this.characters[charId].inventory = [item];
        }
        this.characters[charId].addLog("[ADMIN] Added <" + item.name + " x" + item.amount + "> to inventory", "inventoryLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getInventory(charId: number) {
        return this.characters[charId].inventory;
    }

    updateInventoryItem(charId: number, itemId: number, item: InventoryItem) {
        const character = this.characters[charId];
        character.inventory[itemId] = item;
        this.characters[charId].addLog("[ADMIN] Updated Item  <" + item.name + ">", "inventoryLog");
        this.updateCharacterById(charId, character);
    }

    useInventoryItem(charId: number, itemId: number) {
        const character = this.characters[charId];
        const item = character.inventory[itemId];
        this.characters[charId].addLog("[ADMIN] Removed 1 stack of <" + item.name + "> from inventory", "inventoryLog");

        if (item.amount === 1) {
            character.inventory.splice(itemId, 1);
            this.updateCharacterById(charId, character);
        } else {
            character.inventory[itemId].amount--;
            this.updateCharacterById(charId, character);
        }
    }

    deleteInventoryItem(charId: number, itemId: number) {
        this.characters[charId].addLog("[ADMIN] Removed <" + this.characters[charId].inventory[itemId].name + "> from inventory",
            "inventoryLog");
        this.characters[charId].inventory.splice(itemId, 1);
        this.updateCharacterById(charId, this.characters[charId]);
    }

    addGold(charId: number, gold: number) {
        this.characters[charId].gold += gold;
        this.characters[charId].addLog("[ADMIN] Added  <" + gold + "> gold to inventory", "inventoryLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    reduceGold(charId: number, gold: number) {
        this.characters[charId].gold -= gold;
        this.characters[charId].addLog("[ADMIN] Removed  <" + gold + "> gold from inventory", "inventoryLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Npc Methods
    addNpc(charId: number, npc: Npc) {
        if (this.characters[charId].npcList) {
            this.characters[charId].npcList.push(npc);
        } else {
            this.characters[charId].npcList = [npc];
        }
        this.characters[charId].addLog("[ADMIN] Added NPC  <" + npc.name + ">", "npcLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getNpcs(charId: number) {
        return this.characters[charId].npcList;
    }

    updateNpc(charId: number, npcId: number, npc: Npc) {
        const character = this.characters[charId];
        character.npcList[npcId] = npc;
        this.characters[charId].addLog("[ADMIN] Updated NPC  <" + npc.name + ">", "npcLog");
        this.updateCharacterById(charId, character);
    }

    deleteNpc(charId: number, npcId: number) {
        this.characters[charId].addLog("[ADMIN] Removed NPC  <" + this.characters[charId].npcList[npcId].name + ">", "npcLog");
        this.characters[charId].npcList.splice(npcId, 1);
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Questlog Methods
    addQuest(charId: number, quest: Quest) {
        if (this.characters[charId].questLog) {
            this.characters[charId].questLog.push(quest);
        } else {
            this.characters[charId].questLog = [quest];
        }
        this.characters[charId].addLog("[ADMIN] Added quest  <" + quest.name + ">", "questLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getQuests(charId: number) {
        return this.characters[charId].questLog;
    }

    updateQuest(charId: number, questId: number, quest: Quest) {
        const character = this.characters[charId];
        character.questLog[questId] = quest;
        this.characters[charId].addLog("[ADMIN] Updated quest  <" + quest.name + ">", "questLog");
        this.updateCharacterById(charId, character);
    }

    deleteQuest(charId: number, questId: number) {
        this.characters[charId].addLog("[ADMIN] Deleted quest  <" + this.characters[charId].questLog[questId].name + ">", "questLog");
        this.characters[charId].questLog.splice(questId, 1);
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Ability Methods
    addAbility(charId: number, ability: Ability) {
        if (this.characters[charId].abilities) {
            this.characters[charId].abilities.push(ability);
        } else {
            this.characters[charId].abilities = [ability];
        }
        this.characters[charId].addLog("[ADMIN] Added ability  <" + ability.name + ">", "abilityLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    updateAbility(charId: number, abilityId: number, ability: Ability) {
        const character = this.characters[charId];
        character.abilities[abilityId] = ability;
        this.characters[charId].addLog("[ADMIN] Updated ability  <" + ability.name + ">", "abilityLog");
        this.updateCharacterById(charId, character);
    }

    getAbilities(charId: number) {
        return this.characters[charId].abilities;
    }

    // Combat Sheet Methods
    addCombatSheet(charId: number, sheet: CombatSheet) {
        if (this.characters[charId].combatSheets) {
            this.characters[charId].combatSheets.push(sheet);
        } else {
            this.characters[charId].combatSheets = [sheet];
        }
        this.characters[charId].addLog("Added combat sheet  <" + sheet.name + ">", "combatSheetLog");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    updateCombatSheet(charId: number, sheetIndex: number, sheet: CombatSheet) {
        const character = this.characters[charId];
        character.combatSheets[sheetIndex] = sheet;
        this.characters[charId].addLog("Updated combat sheet  <" + sheet.name + ">", "combatSheetLog");
        this.updateCharacterById(charId, character);
    }

    getCombatSheets(charId: number) {
        return this.characters[charId].combatSheets;
    }

    deleteCombatSheet(charId: number, sheetIndex: number) {
        this.characters[charId]
            .addLog("Removed combat sheet  <" + this.characters[charId].combatSheets[sheetIndex].name + ">", "combatSheetLog");
        this.characters[charId].combatSheets.splice(sheetIndex, 1);
        this.updateCharacterById(charId, this.characters[charId]);
    }

    deleteAbility(charId: number, abilityId: number) {
        this.characters[charId].addLog("[ADMIN] Removed ability  <" + this.characters[charId].abilities[abilityId].name + ">",
            "abilityLog");
        this.characters[charId].abilities.splice(abilityId, 1);
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Reset the service (clear)

    clear() {
        this.characters = [];
        this.charactersFetched = false;
    }

    // Class conversion

    convertClass(char: Character): Character {
        const className = char.className;

        switch (className) {
            case "Draconic Blood Knight":
                for (let i = 0; i < char.combatSheets.length; i++) {
                    const currentSheet: any = char.combatSheets[i];

                    if (!currentSheet.bloodMarks || !(currentSheet instanceof DraconicBloodKnightCombatSheet)) {
                        const newSheet = Character.convertCombatSheet(currentSheet, "Draconic Blood Knight");
                        char.combatSheets[i] = newSheet;
                    }
                }
                for (let i = 0; i < char.abilities.length; i++) {
                    const currentAbility = char.abilities[i];

                    if (!(currentAbility instanceof DraconicBloodKnightAbility)) {
                        const newAbilitiy = Character.convertAbility(currentAbility, "Draconic Blood Knight");
                        char.abilities[i] = newAbilitiy;
                    }
                }
                break;
            case "Necromancer":
                for (let i = 0; i < char.combatSheets.length; i++) {
                    const currentSheet: any = char.combatSheets[i];

                    if (!currentSheet.minionWoundSheets || !(currentSheet instanceof NecromancerCombatSheet)) {
                        const newSheet = Character.convertCombatSheet(currentSheet, "Necromancer");
                        char.combatSheets[i] = newSheet;
                    }
                }
                break;
        }

        return char;
    }
}
