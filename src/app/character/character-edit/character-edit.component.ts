import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CharacterService } from "../character.service";
import { Character } from "../character.models";

@Component({
  selector: "app-character-edit",
  templateUrl: "./character-edit.component.html",
  styleUrls: ["./character-edit.component.scss"]
})
export class CharacterEditComponent implements OnInit {

  character: Character;
  charId: number;

  constructor(private characterService: CharacterService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.charId = +this.activatedRoute.snapshot.params["id"];
    this.character = this.characterService.getCharacterById(this.charId);
  }

  onSaveCharacter() {
    this.characterService.updateCharacterById(this.charId, this.character);
    this.router.navigate(["/characters"]);
  }

}
