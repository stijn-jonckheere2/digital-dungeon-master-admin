import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard.service";

import { CharacterEditComponent } from "./character/character-edit/character-edit.component";
import { CharacterListComponent } from "./character/character-list/character-list.component";
import { AdminNotesViewerComponent } from "./admin-notes-viewer/admin-notes-viewer.component";

const appRoutes: Routes = [
  { path: "admin-notes", component: AdminNotesViewerComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "characters", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
