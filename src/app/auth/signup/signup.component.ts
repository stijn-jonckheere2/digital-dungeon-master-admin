import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {

  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const repeatPassword = form.value.repeatPassword;

    if (!password.match(repeatPassword)) {
      this.errorMessage = "You're passwords don't match!";
    } else {
      this.authService.signupUser(email, password);
    }

  }

}
