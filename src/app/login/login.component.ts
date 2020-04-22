import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.email, this.password).then((token: string) => {
      this.loginService.setToken(token);
      this.router.navigate(['spendings']);
    }).catch(() => this.error = 'Username or Password incorrect');
  }

  register(): void {
    // TODO: implement method
  }

}
