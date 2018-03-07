import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { CharacterListComponent } from "./character-list/character-list.component";
import { CharacterService } from "./character.service";
import { HttpModule } from "@angular/http";
import { AuthGuard } from "../auth/auth-guard.service";
import { CharacterEditComponent } from "./character-edit/character-edit.component";
import { CharacterMenuComponent } from "./character-menu/character-menu.component";
import { InventoryComponent } from "../character-sub/inventory/inventory.component";
import { NpcComponent } from "../character-sub/npc/npc.component";
import { QuestlogComponent } from "../character-sub/questlog/questlog.component";
import { StatsComponent } from "../character-stats/stats/stats.component";
import { EquipmentStatsComponent } from "../character-stats/equipment-stats/equipment-stats.component";
import { ProfessionStatsComponent } from "../character-stats/profession-stats/profession-stats.component";
import { ErrorService } from "../error-service.service";
import { AbilitiesComponent } from "../character-sub/abilities/abilities.component";
import { CharacterLogsComponent } from "./character-logs/character-logs.component";
import { FilterPipe } from "./character-logs/filter.pipe";
import { CombatSheetComponent } from "../character-sub/combat-sheet/combat-sheet.component";
import { CombatSheetListComponent } from "../character-sub/combat-sheet-list/combat-sheet-list.component";
import { WoundSelectorComponent } from "../character-sub/wound-selector/wound-selector.component";
import { WoundPipePipe } from "./wound-pipe.pipe";
import { WoundFormComponent } from "../character-sub/wound-form/wound-form.component";
import { AbilityChooserComponent } from "../character-sub/ability-chooser/ability-chooser.component";
import { ItemChooserComponent } from "../character-sub/item-chooser/item-chooser.component";

const charRoutes: Routes = [
    { path: "characters", component: CharacterListComponent, canActivate: [AuthGuard] },
    {
        path: "characters/:id", component: CharacterMenuComponent, canActivate: [AuthGuard], children: [
            { path: "stats", component: StatsComponent, canActivate: [AuthGuard] },
            { path: "abilities", component: AbilitiesComponent, canActivate: [AuthGuard] },
            { path: "equipment", component: EquipmentStatsComponent, canActivate: [AuthGuard] },
            { path: "professions", component: ProfessionStatsComponent, canActivate: [AuthGuard] },
            { path: "inventory", component: InventoryComponent, canActivate: [AuthGuard] },
            { path: "npcs", component: NpcComponent, canActivate: [AuthGuard] },
            { path: "quests", component: QuestlogComponent, canActivate: [AuthGuard] },
            { path: "combat-sheets", component: CombatSheetListComponent, canActivate: [AuthGuard] },
            { path: "combat-sheets/:sheetId", component: CombatSheetComponent, canActivate: [AuthGuard] },
            { path: "logs", component: CharacterLogsComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: "characters/:id/edit", component: CharacterEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [
        CharacterListComponent,
        CharacterEditComponent,
        CharacterMenuComponent,
        CharacterLogsComponent,
        CombatSheetComponent,
        CombatSheetListComponent,
        AbilityChooserComponent,
        ItemChooserComponent,
        WoundSelectorComponent,
        WoundFormComponent,
        FilterPipe,
        WoundPipePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(charRoutes)
    ],
    providers: [
        ErrorService
    ],
    exports: [
        RouterModule
    ]
})
export class CharacterModule {

}
