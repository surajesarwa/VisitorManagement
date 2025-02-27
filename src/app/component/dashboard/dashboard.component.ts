import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('dailyVisitsChart') dailyVisitsChart!: ElementRef;
  @ViewChild('departmentVisitsChart') departmentVisitsChart!: ElementRef;

  // Sample data
  todaysVisitors = 1200;
  checkedIn = 1200;
  checkedOut = 950;
  yetToCheckOut = 350;
  public isBrowser!: boolean;

  dailyVisits = [150, 200, 180, 220, 300, 280, 350];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  departments = ['HR', 'IT', 'Finance', 'Admin', 'Security', 'Marketing'];
  departmentVisits = [200, 180, 160, 140, 120, 100];

  // Recent visits data
  recentVisits = [
    { id: 'VST001', name: 'John Doe', time: '10:30 AM' },
    { id: 'VST002', name: 'Jane Smith', time: '11:15 AM' },
    { id: 'VST003', name: 'David Johnson', time: '12:45 PM' },
    { id: 'VST004', name: 'Emily Brown', time: '02:20 PM' },
    { id: 'VST005', name: 'Michael Lee', time: '03:50 PM' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Check if the code is running in the browser
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    // Only create charts if running in the browser
    if (this.isBrowser) {
      this.createDailyVisitsChart();
      this.createDepartmentVisitsChart();
    }
  }

  // Method to create the daily visits chart
  createDailyVisitsChart() {
    // Check if the canvas element exists
    if (!this.dailyVisitsChart?.nativeElement) {
      console.error('Daily Visits Chart canvas element not found!');
      return;
    }

    // Create the chart
    new Chart(this.dailyVisitsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [{
          label: 'Visitors',
          data: this.dailyVisits,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: true }
        },
        scales: { x: { beginAtZero: true } }
      }
    });
  }

  // Method to create the department visits chart
  createDepartmentVisitsChart() {
    // Check if the canvas element exists
    if (!this.departmentVisitsChart?.nativeElement) {
      console.error('Department Visits Chart canvas element not found!');
      return;
    }

    // Create the chart
    new Chart(this.departmentVisitsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.departments,
        datasets: [{
          label: 'Visitors',
          data: this.departmentVisits,
          backgroundColor: 'rgba(138, 43, 226, 0.7)',
          borderColor: 'rgba(138, 43, 226, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: true }
        },
        scales: { x: { beginAtZero: true } }
      }
    });
  }
}