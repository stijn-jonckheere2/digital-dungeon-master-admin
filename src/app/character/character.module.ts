import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { CharacterListComponent } from "./character-list/character-list.component";
import { CharacterService } from "./character.service";
import { HttpModule } from "@angular/http";
import { AuthGuard } from "../auth/auth-guard.service";
import { CharacterEditComponent } from "./character-edit/character-edit.component";
import { CharacterNewComponent } from "./character-new/character-new.component";

const charRoutes: Routes = [
    { path: "characters/new", component: CharacterNewComponent, canActivate: [AuthGuard] },
    { path: "characters/:id/edit", component: CharacterEditComponent, canActivate: [AuthGuard] },
    { path: "characters", component: CharacterListComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [
        CharacterListComponent,
        CharacterEditComponent,
        CharacterNewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(charRoutes)
    ],
    providers: [
        CharacterService,
    ],
    exports: [
        RouterModule
    ]
})
export class CharacterModule {

}
