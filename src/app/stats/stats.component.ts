import { Component, OnInit, OnDestroy } from "@angular/core";
import { Character } from "../character/character.models";
import { CharacterService } from "../character/character.service";
import { ActivatedRoute, Params } from "@angular/router";
import { ErrorService } from "../error-service.service";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"]
})
export class StatsComponent implements OnInit, OnDestroy {
  character: Character;
  characterId: number;
  allowEdit = false;
  characterSub: any;

  constructor(private characterService: CharacterService, private errorService: ErrorService,
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
    this.characterSub = this.characterService.characterUpdatesReceived.subscribe(
      () => {
        this.loadCharacter();
      }
    );
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
  }

  incrementStat(type: string, statIndex: number) {
    switch (type) {
      case "primary":
        this.character.primaryStats[statIndex].level++;
        break;
      case "armor":
        this.character.armorStats[statIndex].level++;
        break;
      case "secondary":
        this.character.secondaryStats[statIndex].level++;
        break;
    }
  }

  decrementStat(type: string, statIndex: number) {
    switch (type) {
      case "primary":
        this.character.primaryStats[statIndex].level--;
        break;
      case "armor":
        this.character.armorStats[statIndex].level--;
        break;
      case "secondary":
        this.character.secondaryStats[statIndex].level--;
        break;
    }
  }

  enableEdit() {
    this.allowEdit = true;
  }

  onSave() {
    this.characterService.updateCharacterById(this.characterId, this.character);
    this.allowEdit = false;
  }

}
