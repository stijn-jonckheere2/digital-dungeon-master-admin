import { Injectable, EventEmitter } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Http } from "@angular/http";
import { Character, InventoryItem, Npc, Quest } from "./character.models";

@Injectable()
export class CharacterService {

    characters: Character[] = [];
    charactersFetched = false;
    characterSelection = new EventEmitter<number>();

    constructor(private authService: AuthService, private http: Http) {

    }

    // Service Methods
    setCharacterSelected(charId: number) {
        this.characterSelection.emit(charId);
    }

    unsetCharacterSelected() {
        this.characterSelection.emit(-1);
    }

    // Character Methods
    saveCharacters(characters: Character[]) {
        const userId = this.authService.getUserId();
        const token = this.authService.getToken();
        const url = "https://digital-dungeon-master.firebaseio.com/" + userId +
            "-characters.json?auth=" + token;
        return this.http.put(url, this.characters);
    }

    fetchCharacters() {
        const fetchPromise = new Promise(
            (resolve, reject) => {
                const userId = this.authService.getUserId();
                const token = this.authService.getToken();
                const url = "https://digital-dungeon-master.firebaseio.com/" + userId +
                    "-characters.json?auth=" + token;

                this.http.get(url).subscribe(
                    (response) => {
                        const characters = response.json();
                        if (characters !== null) {
                            this.characters = characters;
                        }
                        this.charactersFetched = true;
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
        return fetchPromise;
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
        return this.characters[id];
    }

    updateCharacterById(id: number, character: Character) {
        this.characters[id] = character;
        this.saveCharacters(this.characters).subscribe(
            () => { },
            (error) => { console.log(error); }
        );
    }

    addCharacter(character: Character) {
        this.characters.push(character);
        this.saveCharacters(this.characters).subscribe(
            () => { },
            (error) => { console.log(error); }
        );
    }

    deleteCharacter(id: number) {
        this.characters.splice(id, 1);
        this.saveCharacters(this.characters).subscribe(
            () => { },
            (error) => { console.log(error); }
        );
    }

    // Inventory Methods
    addInventoryItem(charId: number, item: InventoryItem) {
        if (this.characters[charId].inventory) {
            this.characters[charId].inventory.push(item);
        } else {
            this.characters[charId].inventory = [item];
        }
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getInventory(charId: number) {
        return this.characters[charId].inventory;
    }

    useInventoryItem(charId: number, itemId: number) {
        const character = this.characters[charId];
        const item = character.inventory[itemId];

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
        this.updateCharacterById(charId, this.characters[charId]);
    }

    // Npc Methods
    addNpc(charId: number, npc: Npc) {
        if (this.characters[charId].npcList) {
            this.characters[charId].npcList.push(npc);
        } else {
            this.characters[charId].npcList = [npc];
        }
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getNpcs(charId: number) {
        return this.characters[charId].npcList;
    }

    updateNpc(charId: number, npcId: number, npc: Npc) {
        const character = this.characters[charId];
        character.npcList[npcId] = npc;
        this.updateCharacterById(charId, character);
    }

    deleteNpc(charId: number, npcId: number) {
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
        this.updateCharacterById(charId, this.characters[charId]);
    }

    getQuests(charId: number) {
        return this.characters[charId].questLog;
    }

    updateQuest(charId: number, questId: number, quest: Quest) {
        const character = this.characters[charId];
        character.questLog[questId] = quest;
        this.updateCharacterById(charId, character);
    }

    deleteQuest(charId: number, questId: number) {
        this.characters[charId].questLog.splice(questId, 1);
        this.updateCharacterById(charId, this.characters[charId]);
    }
}
