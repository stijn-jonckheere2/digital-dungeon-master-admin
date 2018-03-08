import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { CombatWound } from "../../character/character.models";
import { ErrorService } from "../../error-service.service";

@Component({
  selector: "app-wound-form",
  templateUrl: "./wound-form.component.html",
  styleUrls: ["./wound-form.component.scss"]
})
export class WoundFormComponent implements OnInit {
  @Input() wounds: CombatWound[];
  @Input() formType: string;

  @Output() woundAdded: EventEmitter<CombatWound> = new EventEmitter();
  @Output() woundLowered: EventEmitter<CombatWound> = new EventEmitter();
  @Output() woundRemoved: EventEmitter<CombatWound> = new EventEmitter();

  @Output() debuffAdded: EventEmitter<any> = new EventEmitter();

  @Output() formCanceled: EventEmitter<null> = new EventEmitter();

  newWound = new CombatWound("head", "SCR");
  newDebuff = {
    name: "",
    numberOfTurns: 1
  };

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    console.log("Loaded wound form", this.formType, this.wounds);
  }

  addWound() {
    if (confirm("Are you sure you want to add this wound?")) {
      this.woundAdded.emit(this.newWound);
    }
  }

  lowerWound(wound: CombatWound) {
    if (confirm("Are you sure you want to lower this wound?")) {
      this.woundLowered.emit(wound);
    }
  }

  removeWound(wound: CombatWound) {
    if (confirm("Are you sure you want to remove this wound?")) {
      this.woundRemoved.emit(wound);
    }
  }

  addDebuff() {
    if(this.newDebuff.name.length === 0) {
      this.errorService.displayError("Debuff name must be filled in!");
    } else if (confirm("Are you sure you want to apply this debuff?")) {
      this.debuffAdded.emit(this.newDebuff);
    }
  }

  cancelForm() {
    this.formCanceled.emit();
  }

}
