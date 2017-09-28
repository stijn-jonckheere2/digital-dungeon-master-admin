import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard.service";

import { CharacterEditComponent } from "./character/character-edit/character-edit.component";
import { CharacterListComponent } from "./character/character-list/character-list.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "characters", pathMatch: "full" },
  // { path: "**", redirectTo: "characters" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
