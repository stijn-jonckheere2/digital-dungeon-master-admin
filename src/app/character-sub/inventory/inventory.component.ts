import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Character, InventoryItem } from "../../character/character.models";
import { CharacterService } from "../../character/character.service";
import { ErrorService } from "../../error-service.service";


@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"]
})
export class InventoryComponent implements OnInit, OnDestroy {
  character: Character;
  characterId: number;
  characterSub: any;

  itemFormEnabled = false;
  newInventoryItem = new InventoryItem("", "", 1, false, "unknown");
  newItemId = -1;
  activeItemIndex = -1;

  constructor(private characterService: CharacterService,
    private route: ActivatedRoute,
    private errorService: ErrorService) {
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

  loadCharacter() {
    this.characterService.getCharacterById(this.characterId).then(
      (char: Character) => {
        this.character = char;
      }
    );
  }

  updateInventory() {
    this.character.inventory = this.characterService.getInventory(this.characterId);
  }

  enableAddItem() {
    this.itemFormEnabled = true;
  }

  addItem() {
    if (this.newItemId >= 0) {
      this.characterService.updateInventoryItem(this.characterId, this.newItemId, this.newInventoryItem);
    } else {
      this.characterService.addInventoryItem(this.characterId, this.newInventoryItem);
    }

    this.newInventoryItem = new InventoryItem("", "", 1, false, "unknown");
    this.newItemId = -1;
    this.itemFormEnabled = false;
    this.updateInventory();
  }

  editItem(itemId: number) {
    this.newInventoryItem = {
      ... this.character.inventory[itemId]
    };
    this.newItemId = itemId;
    this.itemFormEnabled = true;
  }

  cancelAddItem() {
    this.newInventoryItem = new InventoryItem("", "", 1, false, "unknown");
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

  addGold() {
    // tslint:disable-next-line:radix
    const gold = parseInt(prompt("How much gold would you like to add?"));
    if (!isNaN(gold)) {
      this.characterService.addGold(this.characterId, gold);
      this.characterService.updateCharacterById(this.characterId, this.character);
    } else {
      this.errorService.displayError("Not a valid amount of gold!");
    }
  }

  reduceGold() {
    // tslint:disable-next-line:radix
    const gold = parseInt(prompt("How much gold would you like to spend?"));
    if(!isNaN(gold) && this.character.gold >= gold) {
      this.characterService.reduceGold(this.characterId, gold);
      this.characterService.updateCharacterById(this.characterId, this.character);
    } else {
      this.errorService.displayError("You don't have enough gold!");
    }
  }

  toggleActiveItem(itemIndex: number) {
    if (this.activeItemIndex === itemIndex) {
      this.activeItemIndex = -1;
    } else {
      this.activeItemIndex = itemIndex;
    }
  }
}
