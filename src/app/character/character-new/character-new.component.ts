import { Component, OnInit } from "@angular/core";
import { Character } from "../character.models";
import { CharacterService } from "../character.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-character-new",
  templateUrl: "./character-new.component.html",
  styleUrls: ["./character-new.component.css"]
})
export class CharacterNewComponent implements OnInit {

  character = new Character("", "", "", 1, "", 1);

  constructor(private characterService: CharacterService,
    private router: Router) { }

  ngOnInit() {
  }

  onSaveCharacter() {
    this.characterService.addCharacter(this.character);
    this.router.navigate(["/characters"]);
  }

}
