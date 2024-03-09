import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  username: string | undefined;
  password: string | undefined;
  loginError: boolean = false;

  constructor(public activeModal: NgbActiveModal,private authService: AuthService) {}

 
  async attemptLogin() {
    if (this.username && this.password) {
      try {
        const response = await this.authService.login(this.username, this.password);
        console.log('Login successful!', response);
        this.activeModal.close();
        this.loginError = false;
      } catch (error) {
        console.error('Login failed', error);
        this.loginError = true;
      }
    } else {
      console.error('Username and password are required.'); 
    }
  }
}
