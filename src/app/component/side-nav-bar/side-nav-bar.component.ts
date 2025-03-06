import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [RouterLink,FormsModule, RouterLinkActive, CommonModule, NavbarComponent],
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  @Input() isSidebarCollapsed = false;
  helpEmail: string = '';
  helpReason: string = '';
  modalInstance: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    const bootstrap = await import('bootstrap'); // ✅ Dynamically import Bootstrap
    const modalElement = document.getElementById('helpModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (window.innerWidth <= 768) {
      this.isSidebarCollapsed = false;
    }
  }

  logout() {

    this.router.navigate(['/login']);
  }

  open() {
    this.router.navigate(['/home/dashboard']);
  }

  openHelpModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  submitHelpForm(event: Event) {
    event.preventDefault();
    alert(`Help request submitted!\nEmail: ${this.helpEmail}\nReason: ${this.helpReason}`);

    // Clear fields after submission
    this.helpEmail = '';
    this.helpReason = '';

    // Close the modal
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}
