import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getError(field: string) {
    return this.loginForm.controls[field].touched && this.loginForm.controls[field].errors;
  }

  authenticate(register: boolean = false): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      this.loginService.authenticate(email, password, register)
        .then((token: string) => {
          this.loginService.setToken(token);
          this.router.navigate(['spendings']).then();
        }).catch(() => this.error = register ?
        `User with this email already exists` :
        'Username or Password incorrect');
    } else {
      this.error = 'Please validate the input';
    }
  }
}
