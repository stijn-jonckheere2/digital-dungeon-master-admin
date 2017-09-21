import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticated = false;
  authListener: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated();

    this.authListener = this.authService.authChangedEvent.subscribe(
      (state: boolean) => {
        this.authenticated = state;
        console.log("Header auth result", this.authenticated);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }

}
