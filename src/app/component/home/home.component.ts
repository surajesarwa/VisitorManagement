import { Component, createComponent } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,SideNavBarComponent,RouterLink,RouterLinkActive,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isSidebarCollapsed = false; // Store sidebar state here

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
