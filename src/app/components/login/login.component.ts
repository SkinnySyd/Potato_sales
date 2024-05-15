import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string ='' ;
  password: string ='';
  errorMessage: string ='';
  isLoggedIn = false;


  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.authService.login(this.username, this.password)) {
      // Authentication successful
      console.log('Login successful');
      this.router.navigate(['/welcome']);

    } else {
      // Authentication failed
      console.log('Login unsuccessful');

      this.errorMessage = 'Invalid username or password';
    }
  }
}