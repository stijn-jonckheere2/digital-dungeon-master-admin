import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CharacterService } from "../character.service";
import { Character } from "../character.models";

@Component({
  selector: "app-character-menu",
  templateUrl: "./character-menu.component.html",
  styleUrls: ["./character-menu.component.scss"]
})
export class CharacterMenuComponent implements OnInit {
  character: Character;
  characterId: number;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute) {
  }

  loadCharacter() {
    this.characterService.getCharacterById(this.characterId).then(
      (char: Character) => this.character = char
    );
  }

  ngOnInit() {
    this.characterId = +this.route.parent.snapshot.params["id"];
    this.loadCharacter();
  }

}
