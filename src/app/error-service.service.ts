import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ErrorService {
  errorDismissed = new EventEmitter<any>();
  errorEvent = new EventEmitter<string>();

  constructor() { }

  displayError(message: string) {
    this.errorEvent.emit(message);
    console.log("Sent out error", message);
  }

  dismissError() {
    this.errorDismissed.emit();
    console.log("Dismissed error");
  }

}
