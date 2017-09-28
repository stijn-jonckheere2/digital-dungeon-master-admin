import { Injectable, EventEmitter } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Http } from "@angular/http";
import { Character, InventoryItem, Npc, Quest, Ability } from "./character.models";
import { ErrorService } from "../error-service.service";

@Injectable()
export class CharacterService {

    characters: Character[] = [];
    charactersFetched = false;
    characterSelection = new EventEmitter<number>();

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
        const token = this.authService.getToken();
        const url = "https://digital-dungeon-master.firebaseio.com/characters.json?auth=" + token;
        this.http.put(url, charactersPerUser).subscribe(
            (response) => { console.log("Characters saved succesfully!"); },
            (error) => { console.log("saveCharacters(error)", error); }
        );
    }

    fetchCharacters() {
        const fetchPromise = new Promise(
            (resolve, reject) => {
                const userId = this.authService.getUserId();
                const token = this.authService.getToken();
                const url = "https://digital-dungeon-master.firebaseio.com/characters.json?auth=" + token;

                this.http.get(url).subscribe(
                    (response) => {
                        const characters = response.json();
                        console.log("Fetch:", characters);
                        if (characters !== null) {
                            this.convertCharacters(characters);
                        }
                        this.charactersFetched = true;
                        // console.log("characters fetched", this.characters);
                        resolve();
                    },
                    (error) => {
                        this.errorService.displayError(error.json().error);
                        reject(error);
                    }
                );
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
                console.log("Prop", prop);
            }
        }
        console.log("Convert:", this.characters);
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

        console.log("Deconvert:", deconvertedCharacters);
        return deconvertedCharacters;
    }

    getCharacters() {
        const promise = new Promise(
            (resolve, reject) => {
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

    // Inventory Methods
    addInventoryItem(charId: number, item: InventoryItem) {
        if (this.characters[charId].inventory) {
            this.characters[charId].inventory.push(item);
        } else {
            this.characters[charId].inventory = [item];
        }
        this.characters[charId].addLog("[ADMIN] Added <" + item.name + " x" + item.amount + "> to inventory");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getInventory(charId: number) {
        return this.characters[charId].inventory;
    }

    useInventoryItem(charId: number, itemId: number) {
        const character = this.characters[charId];
        const item = character.inventory[itemId];
        this.characters[charId].addLog("[ADMIN] Removed 1 stack of <" + item.name + "> from inventory");

        if (item.amount === 1) {
            character.inventory.splice(itemId, 1);
            this.updateCharacterById(charId, character);
        } else {
            character.inventory[itemId].amount--;
            this.updateCharacterById(charId, character);
        }
    }

    deleteInventoryItem(charId: number, itemId: number) {
        this.characters[charId].inventory.splice(itemId, 1);
        this.characters[charId].addLog("[ADMIN] Removed <" + this.characters[charId].inventory[itemId].name + "> from inventory");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    addGold(charId: number, gold: number) {
        this.characters[charId].gold += gold;
        this.characters[charId].addLog("[ADMIN] Added  <" + gold + "> gold to inventory");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    reduceGold(charId: number, gold: number) {
        this.characters[charId].gold -= gold;
        this.characters[charId].addLog("[ADMIN] Removed  <" + gold + "> gold from inventory");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Npc Methods
    addNpc(charId: number, npc: Npc) {
        if (this.characters[charId].npcList) {
            this.characters[charId].npcList.unshift(npc);
        } else {
            this.characters[charId].npcList = [npc];
        }
        this.characters[charId].addLog("[ADMIN] Added NPC  <" + npc.name + ">");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getNpcs(charId: number) {
        return this.characters[charId].npcList;
    }

    updateNpc(charId: number, npcId: number, npc: Npc) {
        const character = this.characters[charId];
        character.npcList[npcId] = npc;
        this.characters[charId].addLog("[ADMIN] Updated NPC  <" + npc.name + ">");
        this.updateCharacterById(charId, character);
    }

    deleteNpc(charId: number, npcId: number) {
        this.characters[charId].npcList.splice(npcId, 1);
        this.characters[charId].addLog("[ADMIN] Removed NPC  <" + this.characters[charId].npcList[npcId].name + ">");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Questlog Methods
    addQuest(charId: number, quest: Quest) {
        if (this.characters[charId].questLog) {
            this.characters[charId].questLog.unshift(quest);
        } else {
            this.characters[charId].questLog = [quest];
        }
        this.characters[charId].addLog("[ADMIN] Added quest  <" + quest.name + ">");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getQuests(charId: number) {
        return this.characters[charId].questLog;
    }

    updateQuest(charId: number, questId: number, quest: Quest) {
        const character = this.characters[charId];
        character.questLog[questId] = quest;
        this.characters[charId].addLog("[ADMIN] Updated quest  <" + quest.name + ">");
        this.updateCharacterById(charId, character);
    }

    deleteQuest(charId: number, questId: number) {
        this.characters[charId].questLog.splice(questId, 1);
        this.characters[charId].addLog("[ADMIN] Deleted quest  <" + this.characters[charId].questLog[questId].name + ">");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Ability Methods
    addAbility(charId: number, ability: Ability) {
        if (this.characters[charId].abilities) {
            this.characters[charId].abilities.push(ability);
        } else {
            this.characters[charId].abilities = [ability];
        }
        this.characters[charId].addLog("[ADMIN] Added ability  <" + ability.name + ">");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    updateAbility(charId: number, abilityId: number, ability: Ability) {
        const character = this.characters[charId];
        character.abilities[abilityId] = ability;
        this.characters[charId].addLog("[ADMIN] Updated ability  <" + ability.name + ">");
        this.updateCharacterById(charId, character);
    }

    getAbilities(charId: number) {
        return this.characters[charId].abilities;
    }

    deleteAbility(charId: number, abilityId: number) {
        this.characters[charId].abilities.splice(abilityId, 1);
        this.characters[charId].addLog("[ADMIN] Added ability  <" + this.characters[charId].abilities[abilityId].name + ">");
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Reset the service (clear)

    clear() {
        this.characters = [];
        this.charactersFetched = false;
    }
}
