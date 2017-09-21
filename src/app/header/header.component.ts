import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  authenticated: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated();
    console.log("Header auth result", this.authenticated);
  }

  onLogout() {
    this.authService.logout();
  }

}
