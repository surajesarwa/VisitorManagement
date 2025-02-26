import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  visitorForm!: FormGroup;
  showVehicleNumber: boolean = false;
  photoCaptured: boolean = false;
  videoStream: MediaStream | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  departments: string[] = [
    'Human Resources',
    'Finance',
    'IT Support',
    'Security',
    'Admin',
    'Operations'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.visitorForm = this.fb.group({
      idNumber: ['', Validators.required],
      mobileNumber: [''],
      fullName: ['', Validators.required],
      email: [''],
      location: [''],
      department: [''],
      vehicle: ['No'],
      vehicleNumber: [''],
      personToMeet: [''],
      purpose: [''],
      duration: [''],
      description: [''],
      photo: [''],
      materials: this.fb.array([])
    });

    this.startCamera();
  }

  get materials(): FormArray {
    return this.visitorForm.get('materials') as FormArray;
  }

  addMaterial(): void {
    this.materials.push(this.fb.group({ materialName: ['', Validators.required] }));
  }

  removeMaterial(index: number): void {
    this.materials.removeAt(index);
  }

  onVehicleChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.showVehicleNumber = selectedValue === 'Yes';
    if (!this.showVehicleNumber) {
      this.visitorForm.get('vehicleNumber')?.setValue('');
    }
  }

  startCamera(): void {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      console.warn('Camera access is only available in the browser.');
      return;
    }
  
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Camera access is not supported in this browser.');
      return;
    }
  
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoStream = stream;
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        alert('Error accessing the camera. Please check browser permissions.');
      });
  }
  

  capturePhoto(): void {
    if (!this.videoElement || !this.canvasElement) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    this.visitorForm.get('photo')?.setValue(imageData);

    this.photoCaptured = true;
    this.stopCamera();
  }

  retryCapture(): void {
    this.visitorForm.get('photo')?.setValue('');
    this.photoCaptured = false;
    this.startCamera();
  }

  stopCamera(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }

  onSubmit(): void {
    if (this.visitorForm.valid) {
      const now = new Date();
      const currentDate = now.toLocaleDateString();
      const currentTime = now.toLocaleTimeString();

      const formData = {
        ...this.visitorForm.value,
        currentDate,
        currentTime
      };

      console.log('Saving Form Data:', formData);

      let visitorData: any[] = JSON.parse(localStorage.getItem('visitorData') || '[]');
      visitorData.push(formData);
      localStorage.setItem('visitorData', JSON.stringify(visitorData));

      this.onReset();
    } else {
      console.error('Form is invalid');
    }
  }

  onReset(): void {
    this.visitorForm.reset({ vehicle: 'No' });
    this.showVehicleNumber = false;
    this.photoCaptured = false;
    this.stopCamera();
    this.startCamera();
  }
}
