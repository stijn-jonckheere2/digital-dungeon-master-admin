import { Component, OnInit } from "@angular/core";
import { Character, Npc } from "../character/character.models";
import { CharacterService } from "../character/character.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-npc",
  templateUrl: "./npc.component.html",
  styleUrls: ["./npc.component.scss"]
})
export class NpcComponent implements OnInit {
  character: Character;
  characterId: number;

  npcFormEnabled = false;
  newNpc = new Npc("", "");
  newNpcId = -1;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute) {
    this.characterId = this.route.parent.snapshot.params["id"];
    this.character = this.characterService.getCharacterById(this.characterId);
  }

  ngOnInit() {
    if (!this.character.npcList || this.character.npcList.length === 0) {
      this.npcFormEnabled = true;
    }
  }

  updateNpcs() {
    this.character.npcList = this.characterService.getNpcs(this.characterId);
  }

  enableAddNpc() {
    this.npcFormEnabled = true;
  }

  saveNpc() {
    if (this.newNpcId >= 0) {
      this.characterService.updateNpc(this.characterId, this.newNpcId, this.newNpc);
    } else {
      this.characterService.addNpc(this.characterId, this.newNpc);
    }
    this.newNpc = new Npc("", "");
    this.npcFormEnabled = false;
    this.resetNpc();
    this.updateNpcs();
  }

  cancelAddNpc() {
    this.npcFormEnabled = false;
    this.resetNpc();
  }

  editNpc(npcId: number, npc: Npc) {
    this.newNpc = npc;
    this.npcFormEnabled = true;
    this.newNpcId = npcId;
  }

  removeNpc(npcId: number) {
    this.characterService.deleteNpc(this.characterId, npcId);
    this.updateNpcs();
  }

  resetNpc() {
    this.newNpc = new Npc("", "");
    this.newNpcId = -1;
  }

}
