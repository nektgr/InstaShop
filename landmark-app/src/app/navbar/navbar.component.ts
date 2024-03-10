// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Variable to track the state of the menu collapse
  isMenuCollapsed = true;

  // Variable to store authentication status
  isAuthenticated: boolean | undefined;

  // Constructor with injected services
  constructor(private modalService: NgbModal, private authService: AuthService) {}

  // Lifecycle hook - ngOnInit
  ngOnInit() {
    // Subscribe to the authentication status changes
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  // Function to toggle the menu collapse state
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  // Function to open the login modal
  openLoginModal() {
    // Open the login modal using the NgbModal service
    const modalRef = this.modalService.open(LoginModalComponent);
  }

  // Function to perform logout
  logout() {
    // Call the logout method from the AuthService
    this.authService.logout();
  }
}
