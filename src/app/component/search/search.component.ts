import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  visitors: any[] = [];
  filteredVisitors: any[] = [];
  paginatedVisitors: any[] = [];
  displayMode: 'list' | 'grid' = 'list';
  searchQuery: string = '';
  loading: boolean = true; // Skeleton loader state
  selectedFilter: string = 'all';

  // Pagination variables
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  selectedVisitor: any = null;

  constructor() {}

  ngOnInit(): void {
    this.loadHardcodedVisitors();
    this.filterVisitors();
  }

  loadHardcodedVisitors(): void {
    const names = ["John Doe", "Alice Johnson", "Michael Smith", "Emily Davis", "David Brown", "Sophia Wilson"];
    this.visitors = [];
  
    for (let i = 1; i <= 50; i++) {
      // Pad the day with a leading zero if needed.  This helps ensure consistent parsing.
      const day = (i % 28) + 1;
      const paddedDay = day.toString().padStart(2, '0');  // e.g., 1 becomes "01", 9 becomes "09"

      this.visitors.push({
        idNumber: `V00${i}`,
        name: names[i % names.length],
        location: `City${i}`,
        entryDate: `2024-02-${paddedDay}`,  // Use paddedDay for consistent date format.  YYYY-MM-DD
        entryTime: `${8 + (i % 4)}:${(i * 5) % 60} AM`,
        entryMaterials: ["Laptop", "Bag"],
        exitDate: i % 2 === 0 ? `2024-02-${paddedDay}` : "",
        exitTime: i % 2 === 0 ? `${3 + (i % 4)}:${(i * 5) % 60} PM` : "",
        exitMaterials: i % 2 === 0 ? ["Laptop"] : [],
        vehicleNumber: i % 3 === 0 ? `VEH${i * 10}` : "-",
        mobileNumber: `9${i}5678${i}90`,
        department: i % 5 === 0 ? "HR" : i % 3 === 0 ? "Finance" : "IT",
        personToMeet: `Manager ${names[i % names.length]}`,
        meetingPurpose: i % 2 === 0 ? "Business Meeting" : "Interview",
        imageUrl: `https://randomuser.me/api/portraits/men/${i % 50}.jpg` // Random image API
      });
    }
  
    this.filterVisitors();
  }
  

  toggleView(mode: 'list' | 'grid'): void {
    this.displayMode = mode;
  }

  filterVisitors(): void {
    let filtered = this.visitors.filter(visitor =>
      visitor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      visitor.idNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      visitor.department.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Date Filtering
    if (this.selectedFilter !== 'all') {
      const today = new Date();
      let startDate: Date;

      switch (this.selectedFilter) {
        case 'today':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          break;
        case 'last7days':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
          break;
        case 'last1month':
          startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          break;
        default:
          startDate = new Date(0); // Epoch - effectively no filter
      }

      //DEBUGGING: Log the startDate to the console
      console.log("startDate:", startDate);

      filtered = filtered.filter(visitor => {
        const entryDate = new Date(visitor.entryDate);

         //DEBUGGING:  Log the original entryDate string and the parsed Date object
         console.log("Original entryDate:", visitor.entryDate);
         console.log("Parsed entryDate:", entryDate);


        // Check if entryDate is a valid date
        if (isNaN(entryDate.getTime())) {
          console.error("Invalid Date:", visitor.entryDate);
          return false; // Skip invalid dates
        }

        return entryDate >= startDate;
      });
    }

    this.filteredVisitors = filtered;
    this.currentPage = 1;
    this.applyPagination();
  }

  viewDetails(visitor: any): void {
    this.selectedVisitor = visitor;
    const modalElement = document.getElementById('visitorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Pagination logic
  applyPagination(): void {
    this.totalPages = Math.ceil(this.filteredVisitors.length / this.pageSize) || 1;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedVisitors = this.filteredVisitors.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.pageSize = Number(target.value) === 0 ? this.filteredVisitors.length : Number(target.value);
    this.currentPage = 1;
    this.applyPagination();
  }
}