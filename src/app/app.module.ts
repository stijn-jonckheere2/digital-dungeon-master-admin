import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CombatModule } from './combat/combat.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './main/components/character/character-list/character-list.component';
import { AuthGuard, AuthService } from './auth/services';
import { CharacterMenuComponent } from './main/components/character/character-menu/character-menu.component';
import { StatsComponent } from './main/components/character-stats/stats/stats.component';
import { AbilitiesComponent } from './main/components/character-sub/abilities/abilities.component';
import { EquipmentStatsComponent } from './main/components/character-stats/equipment-stats/equipment-stats.component';
import { ProfessionStatsComponent } from './main/components/character-stats/profession-stats/profession-stats.component';
import { InventoryComponent } from './main/components/character-sub/inventory/inventory.component';
import { NpcComponent } from './main/components/character-sub/npc/npc.component';
import { QuestlogComponent } from './main/components/character-sub/questlog/questlog.component';
import { CharacterLogsComponent } from './main/components/character/character-logs/character-logs.component';
import { CharacterEditComponent } from './main/components/character/character-edit/character-edit.component';
import { HeaderComponent } from './main/components/infrastructure/header/header.component';
import { ErrorDisplayComponent } from './main/components/infrastructure/error-display/error-display.component';
import { StoryRecapComponent } from './main/components/infrastructure/story-recap/story-recap.component';
import { FilterPipe } from './main/components/character/character-logs/filter.pipe';
import { AdminNotesService, StoryRecapService } from './main/services';
import { ErrorService, CharacterService } from './shared/services';
import { AdminNotesViewerComponent } from './main/components/infrastructure/admin-notes-viewer/admin-notes-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { WorldMapComponent } from './main/components/infrastructure/world-map';
import { PinchZoomModule } from 'ngx-pinch-zoom';

const charRoutes: Routes = [
  { path: 'characters', component: CharacterListComponent, canActivate: [AuthGuard] },
  {
    path: 'characters/:id', component: CharacterMenuComponent, canActivate: [AuthGuard], children: [
      { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
      { path: 'abilities', component: AbilitiesComponent, canActivate: [AuthGuard] },
      { path: 'equipment', component: EquipmentStatsComponent, canActivate: [AuthGuard] },
      { path: 'professions', component: ProfessionStatsComponent, canActivate: [AuthGuard] },
      { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
      { path: 'npcs', component: NpcComponent, canActivate: [AuthGuard] },
      { path: 'quests', component: QuestlogComponent, canActivate: [AuthGuard] },
      { path: 'logs', component: CharacterLogsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'characters/:id/edit', component: CharacterEditComponent, canActivate: [AuthGuard] },
  { path: 'world-map', component: WorldMapComponent, canActivate: [AuthGuard] },
];

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatCheckboxModule,
  MatSelectModule,
  MatIconModule,
  MatSidenavModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    NpcComponent,
    QuestlogComponent,
    StatsComponent,
    EquipmentStatsComponent,
    ProfessionStatsComponent,
    ErrorDisplayComponent,
    AbilitiesComponent,
    AdminNotesViewerComponent,
    WorldMapComponent,
    StoryRecapComponent,
    CharacterListComponent,
    CharacterEditComponent,
    CharacterMenuComponent,
    CharacterLogsComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    CombatModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PinchZoomModule,
    ...materialModules,
    RouterModule.forRoot(charRoutes)
  ],
  providers: [
    AuthService,
    ErrorService,
    AdminNotesService,
    StoryRecapService,
    AuthGuard,
    CharacterService,
    ErrorService
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
  ]
})
export class AppModule { }
