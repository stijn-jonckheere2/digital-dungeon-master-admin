import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services';
import { ErrorService } from '../../shared/services';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminNotesService {
  adminNotes: string;
  notesFetched = false;

  constructor(private authService: AuthService,
              private errorService: ErrorService,
              private http: HttpClient) { }

  fetchAdminNotes() {
    const fetchPromise = new Promise(
      (resolve, reject) => {
        const url = environment.database.databaseURL + '/adminnotes.json';

        this.http.get(url).subscribe(
          (response: any) => {
            const notes = response !== null ? response[0] : null;
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
    const url = environment.database.databaseURL + '/adminnotes.json';
    this.adminNotes = notes;

    this.http.put(url, [notes]).subscribe(
      (response) => { console.log('Admin notes saved succesfully!'); },
      (error) => {
        this.errorService.displayError('Save admin notes failed! => ' + error);
      }
    );
  }
}
