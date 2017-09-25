import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Character, InventoryItem } from "../character/character.models";
import { CharacterService } from "../character/character.service";


@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"]
})
export class InventoryComponent implements OnInit {
  character: Character;
  characterId: number;

  itemFormEnabled = false;
  newInventoryItem = new InventoryItem("", "", 1, false);

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute) {
    this.characterId = this.route.parent.snapshot.params["id"];
    this.character = this.characterService.getCharacterById(this.characterId);
  }

  ngOnInit() {
    if (!this.character.inventory || this.character.inventory.length === 0) {
      this.itemFormEnabled = true;
    }
  }

  updateInventory() {
    this.character.inventory = this.characterService.getInventory(this.characterId).reverse();
  }

  enableAddItem() {
    this.itemFormEnabled = true;
  }

  addItem() {
    this.characterService.addInventoryItem(this.characterId, this.newInventoryItem);
    this.newInventoryItem = new InventoryItem("", "", 1, false);
    this.itemFormEnabled = false;
    this.updateInventory();
  }

  cancelAddItem() {
    this.newInventoryItem = new InventoryItem("", "", 1, false);
    this.itemFormEnabled = false;
  }

  useItem(itemId: number) {
    this.characterService.useInventoryItem(this.characterId, itemId);
    this.updateInventory();
  }

  removeItem(itemId: number) {
    this.characterService.deleteInventoryItem(this.characterId, itemId);
    this.updateInventory();
  }

}
