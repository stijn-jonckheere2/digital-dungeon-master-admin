import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services';

import { AdminNotesViewerComponent } from './main/components/infrastructure/admin-notes-viewer/admin-notes-viewer.component';
import { StoryRecapComponent } from './main/components/infrastructure/story-recap/story-recap.component';


const appRoutes: Routes = [
  { path: 'admin-notes', component: AdminNotesViewerComponent, canActivate: [AuthGuard] },
  { path: 'story-recap', component: StoryRecapComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
