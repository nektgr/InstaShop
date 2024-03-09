import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuCollapsed = true;


toggleMenu() {
  this.isMenuCollapsed = !this.isMenuCollapsed;
}
}