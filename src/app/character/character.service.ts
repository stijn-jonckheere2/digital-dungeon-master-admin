import { Injectable } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Http } from "@angular/http";
import { Character } from "./character.models";

@Injectable()
export class CharacterService {

    characters = [
        new Character("Aegron", "Half-orc", "Knight", 28, "Lorem ipsum dolor sit amet", 1),
        new Character("Theon bennet", "Human", "Spellblade", 21, "Char description information", 5)
    ];

    charactersFetched = false;

    constructor(private authService: AuthService, private http: Http) {

    }

    saveCharacters(characters: Character[]) {
        const url = "https://digital-dungeon-master.firebaseio.com/" + this.authService.userId +
            "-characters.json?auth=" + this.authService.token;
        return this.http.put(url, this.characters);
    }

    fetchCharacters() {
        const fetchPromise = new Promise(
            (resolve, reject) => {
                const url = "https://digital-dungeon-master.firebaseio.com/" + this.authService.userId +
                    "-characters.json?auth=" + this.authService.token;

                this.http.get(url).subscribe(
                    (response) => {
                        const characters = response.json();
                        this.characters = characters;
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
            () => {},
            (error) => { console.log(error); }
        );
    }

    addCharacter(character: Character) {
        this.characters.push(character);
        this.saveCharacters(this.characters).subscribe(
            () => {},
            (error) => { console.log(error); }
        );
    }

    deleteCharacter(id: number) {
        this.characters.splice( id, 1 );
        this.saveCharacters(this.characters).subscribe(
            () => {},
            (error) => { console.log(error); }
        );
    }
}
