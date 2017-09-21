import { Component, OnInit } from "@angular/core";

import { CharacterService } from "../character.service";
import { Character } from "../character.models";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"]
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters().then(
      (characters: Character[]) => this.characters = characters
    );
  }

  onSave() {
    this.characterService.saveCharacters(this.characters).subscribe(
      () => { },
      (error) => { console.log("Save Error:", error); },
    );
  }

  onDeleteCharacter(id: number) {
    this.characterService.deleteCharacter(id);
  }

}
