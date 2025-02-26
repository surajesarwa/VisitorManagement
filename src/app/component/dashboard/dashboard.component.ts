import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

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

  todaysVisitors = 1200;
  checkedIn = 1200;
  checkedOut = 950;
  yetToCheckOut = 350;

  dailyVisits = [150, 200, 180, 220, 300, 280, 350];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  departments = ['HR', 'IT', 'Finance', 'Admin', 'Security', 'Marketing'];
  departmentVisits = [200, 180, 160, 140, 120, 100];

  // **New Array Combining Departments and Visit Counts**
  mostVisitedDepartments = this.departments.map((dept, index) => ({
    name: dept,
    count: this.departmentVisits[index]
  }));

  // Hardcoded Recent Visits
  recentVisits = [
    { id: 'VST001', name: 'John Doe', time: '10:30 AM' },
    { id: 'VST002', name: 'Jane Smith', time: '11:15 AM' },
    { id: 'VST003', name: 'David Johnson', time: '12:45 PM' },
    { id: 'VST004', name: 'Emily Brown', time: '02:20 PM' },
    { id: 'VST005', name: 'Michael Lee', time: '03:50 PM' }
  ];

  ngAfterViewInit() {
    this.createDailyVisitsChart();
    this.createDepartmentVisitsChart();
  }

  createDailyVisitsChart() {
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
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: true }
        },
        scales: { x: { beginAtZero: true } }
      }
    });
  }

  createDepartmentVisitsChart() {
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
        indexAxis: 'y',
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
