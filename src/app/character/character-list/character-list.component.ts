import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CharacterService } from "../character.service";
import { Character } from "../character.models";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.scss"]
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  charactersFetched = false;

  constructor(private characterService: CharacterService,
  private router: Router) { }

  ngOnInit() {
    console.log("CharacterListComponent - OnInit", this.characters, this.charactersFetched);
    this.characterService.getCharacters().then(
      (characters: Character[]) => {
        if (characters !== null) {
          this.characters = characters;
        }
        this.charactersFetched = true;
      }
    );
  }

  onSave() {
    this.characterService.saveCharacters(this.characters).subscribe(
      () => { },
      (error) => { console.log("Save Error:", error); },
    );
  }

  onSelectCharacter(charId: number) {
    this.characterService.setCharacterSelected(charId);
    this.router.navigate(["/characters", charId, "stats"]);
  }

  onDeleteCharacter(id: number) {
    this.characterService.deleteCharacter(id);
  }

}
