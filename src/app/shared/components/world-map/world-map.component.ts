import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CanvasComponent } from '../canvas';
import { WorldMapService } from '../../../main/services';

@Component({
    selector: 'world-map',
    templateUrl: 'world-map.component.html',
    styleUrls: ['world-map.component.scss']
})
export class WorldMapComponent implements OnInit {
    mapSource: string;
    fullscreen = false;
    mapSourceLoading = false;
    mapEditMode = false;

    @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;

    constructor(private worldMapService: WorldMapService) {
    }

    async ngOnInit(): Promise<void> {
        this.mapSourceLoading = true;
        this.fetchMapSource();
        this.mapSourceLoading = false;
    }

    async fetchMapSource(): Promise<void> {
        this.mapSource = await this.worldMapService.getSource();
    }

    async saveMapSource(source: string): Promise<void> {
        await this.worldMapService.saveSource(source);
    }

    toggleFullscreen(state: boolean): void {
        this.fullscreen = state;
    }

    toggleEditMode(state: boolean): void {
        this.mapEditMode = state;
    }

    async refreshWorldMap(): Promise<void> {
        this.mapSourceLoading = true;
        await this.fetchMapSource();
        this.mapSourceLoading = false;
    }

    async onSaveCanvas(): Promise<void> {
        const canvasUrl = this.canvasComponent.canvas.nativeElement.toDataURL('image/jpg', 1.0);

        if (canvasUrl) {
            this.mapSourceLoading = true;
            await this.saveMapSource(canvasUrl);
            await this.fetchMapSource();
            this.mapSourceLoading = false;
            this.toggleFullscreen(false);
        }
    }

    async onClearCanvas(): Promise<void> {
        this.mapSourceLoading = true;
        await this.saveMapSource('assets/images/world-map-small.jpg');
        await this.fetchMapSource();
        this.mapSourceLoading = false;
    }
}
