import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // username: string = '';
  // password: string = '';
  constructor(private router: Router) {}
  onSubmit() {
  
   
      // Redirect to the dashboard on successful login
      this.router.navigate(['/dashboard']);
   
  }
}
