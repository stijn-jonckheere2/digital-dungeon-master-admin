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

import { HeaderComponent } from "./header/header.component";
import { CharacterModule } from "./character/character.module";
import { InventoryComponent } from "./inventory/inventory.component";
import { NpcComponent } from "./npc/npc.component";
import { QuestlogComponent } from "./questlog/questlog.component";
import { StatsComponent } from "./stats/stats.component";
import { EquipmentStatsComponent } from "./equipment-stats/equipment-stats.component";
import { ProfessionStatsComponent } from "./profession-stats/profession-stats.component";
import { ErrorDisplayComponent } from "./error-display/error-display.component";
import { AbilitiesComponent } from "./abilities/abilities.component";
import { AdminNotesViewerComponent } from "./admin-notes-viewer/admin-notes-viewer.component";
import { AdminNotesService } from "./admin-notes.service";
import { CharacterService } from "./character/character.service";

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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    FormsModule,
    CharacterModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ErrorService, AdminNotesService, AuthGuard, CharacterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
