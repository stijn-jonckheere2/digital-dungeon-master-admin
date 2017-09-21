import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA8J2ryEam-6m4WAoM3k1CT75ylhQPUWLQ",
      authDomain: "digital-dungeon-master.firebaseapp.com"
    });
  }
}
