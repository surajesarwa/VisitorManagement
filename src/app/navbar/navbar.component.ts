import { Component, ElementRef, EventEmitter, Output, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
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
  hasUnreadNotifications: boolean = true;

  @ViewChild('notificationBox') notificationBox!: ElementRef;
  isNotificationOpen: boolean = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  visitors = [
    { id: 101, name: 'Ravi Kumar', entryTime: '10:30 AM', exitTime: '' },
    { id: 102, name: 'Amit Sharma', entryTime: '11:00 AM', exitTime: '12:15 PM' },
    { id: 103, name: 'Sita Verma', entryTime: '11:45 AM', exitTime: '' },
    { id: 104, name: 'Rahul Gupta', entryTime: '12:20 PM', exitTime: '1:30 PM' },
    { id: 105, name: 'Pooja Mehta', entryTime: '1:00 PM', exitTime: '' }
  ];

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  openSettings() {
    alert("Open settings modal or navigate to settings page.");
  }

  logout() {
    if (confirm("Are you sure you want to log out?")) {
      alert("Logging out...");
    }
  }

  openNotifications(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isNotificationOpen = !this.isNotificationOpen;
      const collapseElement = document.getElementById('notificationCollapse');
      if (collapseElement) {
        if (this.isNotificationOpen) {
          collapseElement.classList.add('show');
        } else {
          collapseElement.classList.remove('show');
        }
      }
    }
    event.stopPropagation(); // Prevents click from propagating to document click listener
  }

  @HostListener('document:click', ['$event'])
  closeNotification(event: Event) {
    if (this.isNotificationOpen && this.notificationBox && !this.notificationBox.nativeElement.contains(event.target)) {
      this.isNotificationOpen = false;
      const collapseElement = document.getElementById('notificationCollapse');
      if (collapseElement) {
        collapseElement.classList.remove('show');
      }
    }
  }
}
