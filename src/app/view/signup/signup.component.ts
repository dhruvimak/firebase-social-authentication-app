import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  user = {
    email: "",
    password: "",
    displayName: ""
  };
  error:string="";

  constructor(
    private authservice: AuthService,
    private profile: ProfileService
  ) { }

  ngOnInit() { }

  signUpWithEmail() {
    this.authservice
      .signUpRegular(this.user.email, this.user.password)
      .then(res => {
        res.user.updateProfile({
          displayName: this.user.displayName,
          photoURL: ''
        }).then(response => this.profile.createUser(res.user));
      })
      .catch(err => this.error=err.message);
  }
}
