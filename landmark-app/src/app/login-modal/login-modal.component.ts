// login-modal.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  // Properties for username, password, and login error status
  username: string | undefined;
  password: string | undefined;
  loginError: boolean = false;

  // Constructor with NgbActiveModal and AuthService injection
  constructor(public activeModal: NgbActiveModal, private authService: AuthService) {}

  // Attempt to login when the form is submitted
  async attemptLogin() {
    // Check if both username and password are provided
    if (this.username && this.password) {
      try {
        // Call the login method from the AuthService
        const response = await this.authService.login(this.username, this.password);

        // Log success, close the modal, and reset login error status
        this.activeModal.close();
        this.loginError = false;
      } catch (error) {
        // Log error and set login error status
        console.error('Login failed', error);
        this.loginError = true;
      }
    } else {
      // Log error if username or password is missing
      console.error('Username and password are required.');
    }
  }
}
