import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  hasUnreadNotifications: boolean = true; // Change dynamically when notifications arrive
  toggleSidebar() {
    this.toggleSidebarEvent.emit(); // Emit event to toggle sidebar
  }
  constructor(private router: Router) {}

  openSettings() {
    alert("Open settings modal or navigate to settings page.");
    // You can navigate to a settings page like this:
    // this.router.navigate(['/settings']);
  }

  logout() {
    if (confirm("Are you sure you want to log out?")) {
      alert("Logging out...");
      // Implement actual logout logic here
      // this.router.navigate(['/login']); // Redirect to login page
    }
  }

  openNotifications(): void {
    console.log('Notifications clicked');
    this.hasUnreadNotifications = false;
  }
}