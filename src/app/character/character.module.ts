import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CharacterListComponent } from "./character-list/character-list.component";

@NgModule({
    declarations: [
    CharacterListComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class CharacterModule {

}
