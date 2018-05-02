import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "../../auth/services";
import { ErrorService } from "../../shared/services";
import { environment } from "../../../environments/environment";

@Injectable()
export class AdminNotesService {
  adminNotes: string;
  notesFetched = false;

  constructor(private authService: AuthService,
    private errorService: ErrorService,
    private http: Http) { }

  fetchAdminNotes() {
    const fetchPromise = new Promise(
      (resolve, reject) => {
        const url = environment.database.databaseURL + "/adminnotes.json";

        this.http.get(url).subscribe(
          (response) => {
            const notes = response.json();
            if (notes !== null) {
              this.adminNotes = notes;
            }
            this.notesFetched = true;
            resolve();
          },
          (error) => {
            this.errorService.displayError(error.json().error);
            reject(error);
          }
        );
      }
    );
    return fetchPromise;
  }

  getAdminNotes() {
    const promise = new Promise(
      (resolve, reject) => {
        if (this.notesFetched) {
          resolve(this.adminNotes);
        } else {
          this.fetchAdminNotes().then(
            () => {
              resolve(this.adminNotes);
            }
          );
        }
      }
    );

    return promise;
  }

  saveNotes(notes: string) {
    const url = environment.database.databaseURL + "/adminnotes.json";
    this.adminNotes = notes;

    this.http.put(url, [notes]).subscribe(
      (response) => { console.log("Admin notes saved succesfully!"); },
      (error) => {
        this.errorService.displayError("Save admin notes failed! => " + error);
      }
    );
  }


}
