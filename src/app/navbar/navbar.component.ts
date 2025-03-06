import { Component, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  hasUnreadNotifications: boolean = true; // Change dynamically when notifications arrive

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit(); // Emit event to toggle sidebar
  }

  visitors = [
    { id: 101, name: 'Ravi Kumar', entryTime: '10:30 AM', exitTime: '' },
    { id: 102, name: 'Amit Sharma', entryTime: '11:00 AM', exitTime: '12:15 PM' },
    { id: 103, name: 'Sita Verma', entryTime: '11:45 AM', exitTime: '' },
    { id: 104, name: 'Rahul Gupta', entryTime: '12:20 PM', exitTime: '1:30 PM' },
    { id: 105, name: 'Pooja Mehta', entryTime: '1:00 PM', exitTime: '' }
  ];
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
    if (isPlatformBrowser(this.platformId)) {
      // Access the DOM only in the browser
      const collapseElement = document.getElementById('notificationCollapse');
      if (collapseElement) {
        collapseElement.classList.toggle('show');
      }
    }
  }
}