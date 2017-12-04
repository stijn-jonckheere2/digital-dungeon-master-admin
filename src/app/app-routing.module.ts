import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard.service";

import { CharacterEditComponent } from "./character/character-edit/character-edit.component";
import { CharacterListComponent } from "./character/character-list/character-list.component";
import { AdminNotesViewerComponent } from "./infrastructure/admin-notes-viewer/admin-notes-viewer.component";
import { StoryRecapComponent } from "./infrastructure/story-recap/story-recap.component";

const appRoutes: Routes = [
  { path: "admin-notes", component: AdminNotesViewerComponent, canActivate: [AuthGuard] },
  { path: "story-recap", component: StoryRecapComponent, canActivate: [AuthGuard] },  
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
