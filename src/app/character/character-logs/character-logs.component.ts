import { Component, OnInit } from "@angular/core";
import { Character } from "../character.models";
import { CharacterService } from "../character.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-character-logs",
  templateUrl: "./character-logs.component.html",
  styleUrls: ["./character-logs.component.scss"]
})
export class CharacterLogsComponent implements OnInit {
  character: Character;
  characterId: number;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.characterId = +this.route.parent.snapshot.params["id"];
    this.loadCharacter();

  }

  loadCharacter() {
    this.characterService.getCharacterById(this.characterId).then(
      (char: Character) => {
        this.character = char;
      }
    );
  }

  clearLogs() {
    this.character.clearLogs();
    this.characterService.updateCharacterById(this.characterId, this.character);
  }

}
