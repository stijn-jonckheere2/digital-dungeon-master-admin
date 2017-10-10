import { Component, OnInit } from "@angular/core";
import { AdminNotesService } from "../../admin-notes.service";
import { Router } from "@angular/router";
import { ErrorService } from "../../error-service.service";

@Component({
  selector: "app-admin-notes-viewer",
  templateUrl: "./admin-notes-viewer.component.html",
  styleUrls: ["./admin-notes-viewer.component.scss"]
})
export class AdminNotesViewerComponent implements OnInit {

  adminNotes = "";
  adminNotesFetched = false;
  noteEdit = false;

  constructor(private adminNotesService: AdminNotesService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.updateNotes();
  }

  editNotes() {
    this.noteEdit = true;
  }

  updateNotes() {
    this.adminNotesService.getAdminNotes().then(
      (notes: string) => {
        if (notes !== null && notes !== undefined) {
          this.adminNotes = notes;
          this.noteEdit = notes.length === 0 ? true : false;
        } else {
          this.noteEdit = true;
        }
        this.adminNotesFetched = true;
      }
    );
  }

  saveNotes() {
    this.adminNotesService.saveNotes(this.adminNotes);
    this.noteEdit = false;
    this.updateNotes();
  }

}
