import { Component, OnInit } from "@angular/core";
import { Character } from "../character/character.models";
import { CharacterService } from "../character/character.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-equipment-stats",
  templateUrl: "./equipment-stats.component.html",
  styleUrls: ["./equipment-stats.component.scss"]
})
export class EquipmentStatsComponent implements OnInit {
  character: Character;
  characterId: number;
  allowEdit = false;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute) {
    this.characterId = this.route.parent.snapshot.params["id"];
    this.character = this.characterService.getCharacterById(this.characterId);
  }

  ngOnInit() {
  }

  incrementStat(type: string, statIndex: number) {
    switch (type) {
      case "weapon":
        this.character.weaponStats[statIndex].level++;
        break;
      case "ranged":
        this.character.rangedStats[statIndex].level++;
        break;
      case "armor":
        this.character.armorStats[statIndex].level++;
        break;
    }
  }

  decrementStat(type: string, statIndex: number) {
    switch (type) {
      case "weapon":
        this.character.weaponStats[statIndex].level--;
        break;
      case "ranged":
        this.character.rangedStats[statIndex].level--;
        break;
      case "armor":
        this.character.armorStats[statIndex].level--;
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
