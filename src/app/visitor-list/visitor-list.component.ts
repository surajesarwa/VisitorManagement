import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

declare var bootstrap: any; // Import Bootstrap JS

interface Visitor {
  id: number;
  name: string;
  mobile: string;
  purpose: string;
  status: string;
  visitorNumber?: string;
  timeIn?: string;
  timeOut?: string;
}

interface Material {
  name: string;
  details: string;
  type: string;
  returnable: string;
}

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  visitors: Visitor[] = [];
  filteredVisitors: Visitor[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage: number | string = 5;
  pageSizeOptions: (number | string)[] = [5, 10, 20, 50, 'All'];

  selectedVisitor: Visitor | null = null;
  materials: Material[] = [{ name: '', details: '', type: 'Visitor', returnable: 'Yes' }];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateVisitors();
    this.applyFilter();
  }

  generateVisitors() {
    const names = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis', 'David Wilson'];
    const purposes = ['Meeting', 'Interview', 'Delivery', 'Consultation', 'Visit'];

    for (let i = 1; i <= 100; i++) {
      const hasExited = Math.random() > 0.5;
      const timeIn = this.randomTime();
      const timeOut = hasExited ? this.randomTime() : '';

      this.visitors.push({
        id: i,
        name: names[i % names.length],
        mobile: `98${Math.floor(100000000 + Math.random() * 900000000)}`,
        purpose: purposes[i % purposes.length],
        status: hasExited ? 'Exited' : 'Pending',
        visitorNumber: `V${i.toString().padStart(3, '0')}`,
        timeIn: timeIn,
        timeOut: timeOut || 'Not Marked',
      });
    }
  }

  randomTime(): string {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const period = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  applyFilter() {
    let filtered = [...this.visitors];

    filtered = filtered.filter(v => v.status === 'Pending');

    if (this.searchText.trim() !== '') {
      filtered = filtered.filter(v =>
        v.visitorNumber?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        v.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        v.mobile.includes(this.searchText)
      );
    }

    this.filteredVisitors = filtered;
    this.currentPage = 1;
  }

  openExitConfirmation(visitor: Visitor) {
    this.selectedVisitor = visitor;
    const modal = new bootstrap.Modal(document.getElementById('exitConfirmationModal'));
    modal.show();
  }

  handleExitConfirmation(isTakingMaterial: boolean) {
    if (!isTakingMaterial) {
      this.confirmExit();
    } else {
      bootstrap.Modal.getInstance(document.getElementById('exitConfirmationModal')).hide();
      this.materials = [{ name: '', details: '', type: 'Visitor', returnable: 'Yes' }];
      const materialModal = new bootstrap.Modal(document.getElementById('materialDetailsModal'));
      materialModal.show();
    }
  }

  confirmExit() {
    if (this.selectedVisitor) {
      this.selectedVisitor.status = 'Exited';
      this.selectedVisitor.timeOut = this.getCurrentTime();
      this.applyFilter();
      this.showModalMessage();
    }
    bootstrap.Modal.getInstance(document.getElementById('exitConfirmationModal')).hide();
  }

  confirmExitWithMaterial() {
    if (!this.isMaterialFormValid()) {
      alert('Please fill in all material details.');
      return;
    }

    if (this.selectedVisitor) {
      this.selectedVisitor.status = 'Exited';
      this.selectedVisitor.timeOut = this.getCurrentTime();
      this.applyFilter();
      console.log('Material Details:', this.materials);
      this.showModalMessage();
    }
    bootstrap.Modal.getInstance(document.getElementById('materialDetailsModal')).hide();
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${period}`;
  }

  addMaterial() {
    this.materials.push({ name: '', details: '', type: 'Visitor', returnable: 'Yes' });
  }

  removeMaterial(index: number) {
    this.materials.splice(index, 1);
  }

  isMaterialFormValid(): boolean {
    return this.materials.every(material => material.name.trim() !== '' && material.details.trim() !== '');
  }

  navigateToEntry() {
    this.router.navigate(['/home/create']);
  }

  get paginatedVisitors(): Visitor[] {
    return this.filteredVisitors.slice((this.currentPage - 1) * +this.itemsPerPage, this.currentPage * +this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.filteredVisitors.length / +this.itemsPerPage);
  }

  showModalMessage() {
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
    setTimeout(() => {
      modal.hide();
    }, 3000);
  }
}