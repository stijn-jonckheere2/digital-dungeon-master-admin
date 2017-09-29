import { Injectable } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Http } from "@angular/http";
import { ErrorService } from "./error-service.service";

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
        const userId = this.authService.getUserId();
        const token = this.authService.getToken();
        const url = "https://digital-dungeon-master.firebaseio.com/adminnotes.json?auth=" + token;

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
    const token = this.authService.getToken();
    const url = "https://digital-dungeon-master.firebaseio.com/adminnotes.json?auth=" + token;
    this.adminNotes = notes;

    this.http.put(url, [notes]).subscribe(
      (response) => { console.log("Admin notes saved succesfully!"); },
      (error) => {
        this.errorService.displayError("Save admin notes failed! => " + error);
      }
    );
  }


}
