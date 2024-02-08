import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BTHAService } from '../service/btha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginValue: string = '';
  passwordValue: string = '';

  constructor(private service: BTHAService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.isLoggedIn() == true) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.service.login(this.loginValue, this.passwordValue)
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('username', this.loginValue);

          this.router.navigate(['/']);
        } else {
          alert('Invalid login or password');
        }
      });
  }
}