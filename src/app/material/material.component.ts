import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
interface MaterialEntry {
  id: string;
  materialName: string;
  materialDetails: string;
  visitorId: string;
  entryDate: string;
  entryTime: string;
  exitDate: string;
  exitTime: string;
  status: 'in' | 'out';
  materialType: 'visitor' | 'company';
  returnable: boolean;
  returned: boolean;
}

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materialEntries: MaterialEntry[] = [];
  filteredEntries: MaterialEntry[] = [];
  searchText = '';
  statusFilter: 'all' | 'in' | 'out' | 'visitor' | 'company' = 'all';
  isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // this.generateSampleData();
    // this.applyFilter();
    if (this.isBrowser) {
      // Only run browser-specific code here
      this.generateSampleData();
      this.applyFilter();
    }
  
  }

  generateSampleData(): void {
    const now = new Date();
    const today = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    this.materialEntries = [
      {
        id: 'material-1',
        materialName: 'Laptop',
        materialDetails: 'Dell XPS 13',
        visitorId: 'V001',
        entryDate: today,
        entryTime: time,
        exitDate: '',
        exitTime: '',
        status: 'in',
        materialType: 'visitor',
        returnable: true,
        returned: false,
      },
      {
        id: 'material-2',
        materialName: 'Company Projector',
        materialDetails: 'Epson Model X',
        visitorId: 'V002',
        entryDate: today,
        entryTime: time,
        exitDate: today,
        exitTime: time,
        status: 'out',
        materialType: 'company',
        returnable: true,
        returned: true,
      },
      {
        id: 'material-3',
        materialName: 'Samples',
        materialDetails: 'Product samples',
        visitorId: 'V003',
        entryDate: today,
        entryTime: time,
        exitDate: '',
        exitTime: '',
        status: 'in',
        materialType: 'visitor',
        returnable: false,
        returned: false,
      },
      {
        id: 'material-4',
        materialName: 'Tools',
        materialDetails: 'Set of wrenches',
        visitorId: 'V001',
        entryDate: today,
        entryTime: time,
        exitDate: '',
        exitTime: '',
        status: 'in',
        materialType: 'company',
        returnable: true,
        returned: false,
      },
    ];
  }

  applyFilter(): void {
    let filtered = [...this.materialEntries]; // Clone the original array to avoid modifying it
  
    console.log('Applying Filter:', this.statusFilter, this.searchText); // Debugging line
  
    // Apply status filter
    if (this.statusFilter !== 'all') {
      if (this.statusFilter === 'in' || this.statusFilter === 'out') {
        filtered = filtered.filter(entry => entry.status === this.statusFilter);
      } else if (this.statusFilter === 'visitor') {
        filtered = filtered.filter(entry => entry.materialType === 'visitor');
      } else if (this.statusFilter === 'company') {
        filtered = filtered.filter(entry => entry.materialType === 'company');
      }
    }
  
    // Apply search filter
    if (this.searchText.trim() !== '') {
      filtered = filtered.filter(entry =>
        entry.materialName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        entry.materialDetails.toLowerCase().includes(this.searchText.toLowerCase()) ||
        entry.visitorId.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    console.log('Filtered Entries:', filtered); // Debugging line
  
    this.filteredEntries = filtered;
  }
  
  filterByStatus(status: 'all' | 'in' | 'out' | 'visitor' | 'company'): void {
    this.statusFilter = status;
    console.log('Status Filter Updated:', status); // Debugging line
    this.applyFilter();
  }
  
  generateUniqueId(): string {
    return 'material-' + Math.random().toString(36).substr(2, 9);
  }

  

  addMaterialEntry(materialName: string, materialDetails: string, visitorId: string, status: 'in' | 'out'): void {
    const now = new Date();
    const entry: MaterialEntry = {
      id: this.generateUniqueId(),
      materialName,
      materialDetails,
      visitorId,
      entryDate: now.toLocaleDateString(),
      entryTime: now.toLocaleTimeString(),
      exitDate: '',
      exitTime: '',
      status,
      materialType: 'visitor',
      returnable: true,
      returned: false,
    };
    this.materialEntries.push(entry);
    this.saveMaterialEntries();
    this.applyFilter();
  }

  markMaterialExit(materialEntry: MaterialEntry): void {
    const now = new Date();
    materialEntry.exitDate = now.toLocaleDateString();
    materialEntry.exitTime = now.toLocaleTimeString();
    materialEntry.status = 'out';

    if (materialEntry.materialType === 'company' && materialEntry.returnable) {
      materialEntry.returned = true;
    }

    this.saveMaterialEntries();
    this.applyFilter();
  }

  loadMaterialEntries(): void {
    this.materialEntries = JSON.parse(localStorage.getItem('materialEntries') || '[]');
  }

  saveMaterialEntries(): void {
    localStorage.setItem('materialEntries', JSON.stringify(this.materialEntries));
  }

  editExit(materialEntry: MaterialEntry): void {
    console.log('Edit exit for:', materialEntry);
    materialEntry.exitDate = '';
    materialEntry.exitTime = '';
    this.saveMaterialEntries();
    this.applyFilter();
  }
}