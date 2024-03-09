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
  isMenuCollapsed = true;
  isAuthenticated: boolean | undefined;

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  toggleMenu() {
    console.log('Toggle Menu method called'); // Add this line for debugging
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  openLoginModal() {
    console.log('Open Login Modal clicked'); // Add this line for debugging
    const modalRef = this.modalService.open(LoginModalComponent);
  }

  logout() {
    console.log('Logout clicked'); // Add this line for debugging
    this.authService.logout();
  }
}
