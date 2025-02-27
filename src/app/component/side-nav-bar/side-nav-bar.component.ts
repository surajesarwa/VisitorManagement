import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarComponent],
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {
  @Input() isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (window.innerWidth <= 768) {
      this.isSidebarCollapsed = false;
    }
  }


  logout() {
    // Perform logout actions (clear session, navigate to login, etc.)
    alert('Logging out...');
   
  }
}
