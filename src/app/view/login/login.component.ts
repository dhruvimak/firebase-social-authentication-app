import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  };
  
  constructor(
    private authservice: AuthService,
    private router: Router,
    private profile: ProfileService
  ) { }

  ngOnInit() { }

  logInWithEmail() {
    this.authservice
      .signInRegular(this.user.email, this.user.password)
      .then(res => {
        this.router.navigate(["dashboard"]);
      })
      .catch(err => console.log(err));
  }




}
