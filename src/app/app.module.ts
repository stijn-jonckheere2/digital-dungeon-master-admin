import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./error-service.service";

import { AuthGuard } from "./auth/auth-guard.service";
import { AuthModule } from "./auth/auth.module";
import { AdminNotesService } from "./admin-notes.service";
import { CharacterService } from "./character/character.service";
import { StoryRecapService } from "./story-recap.service";

import { HeaderComponent } from "./infrastructure/header/header.component";
import { CharacterModule } from "./character/character.module";
import { InventoryComponent } from "./character-sub/inventory/inventory.component";
import { NpcComponent } from "./character-sub/npc/npc.component";
import { QuestlogComponent } from "./character-sub/questlog/questlog.component";
import { StatsComponent } from "./character-stats/stats/stats.component";
import { EquipmentStatsComponent } from "./character-stats/equipment-stats/equipment-stats.component";
import { ProfessionStatsComponent } from "./character-stats/profession-stats/profession-stats.component";
import { ErrorDisplayComponent } from "./infrastructure/error-display/error-display.component";
import { AbilitiesComponent } from "./character-sub/abilities/abilities.component";
import { AdminNotesViewerComponent } from "./infrastructure/admin-notes-viewer/admin-notes-viewer.component";
import { StoryRecapComponent } from "./infrastructure/story-recap/story-recap.component";

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
    StoryRecapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    FormsModule,
    CharacterModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ErrorService, AdminNotesService, StoryRecapService, AuthGuard, CharacterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
