import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmployeeComponent } from '../employee/employee.component';
import { TravelRequestService } from '../../services/travel-request.service';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EmployeeComponent],
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent {

  constructor(
  private travelRequestService: TravelRequestService
) {}

  private readonly destroyRef = inject(DestroyRef);

  requestForm = new FormGroup({

    // 👤 Employee Info
    employeeName: new FormControl('DefaultEmployee', Validators.required),
    department: new FormControl('DefaultDepartment', Validators.required),

    // ✈️ Travel Details
    destination: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    fromLocation: new FormControl('', Validators.required),
    transportMode: new FormControl('', Validators.required),

    additionalNotes: new FormControl(''),
    advancePayment: new FormControl(false),
    

    // 🏨 Accommodation
    hotelRequired: new FormControl(false),
    hotelPreference: new FormControl(''),

    // 💰 Expense
    estimatedBudget: new FormControl('', [Validators.required, Validators.min(100)]),
    
    // ✅ Declaration
    agreePolicy: new FormControl(false, Validators.requiredTrue)

  });

  // 🔹 Create itinerary row
  createItinerary() {
    const group = new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      transport: new FormControl('', Validators.required),
      flightClass: new FormControl('')
    });

    // ✅ Show/hide flightClass based on transport
    group.get('transport')!.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(mode => {
        const flightClass = group.get('flightClass')!;
        if (mode === 'Air') {
          flightClass.setValidators(Validators.required);
        } else {
          flightClass.clearValidators();
          flightClass.setValue('');
        }
        flightClass.updateValueAndValidity();
      });

    return group;
  }
 



onSubmit() {

  console.log("SUBMIT CLICKED");

  if (this.requestForm.invalid) {

    this.requestForm.markAllAsTouched();

    return;
  }

  const payload = {

    employeeId: 2,

    fromLocation: this.requestForm.value.fromLocation,

    destination: this.requestForm.value.destination,

    purpose: this.requestForm.value.purpose,

    startDate: this.requestForm.value.startDate,

    endDate: this.requestForm.value.endDate,

    transportMode: this.requestForm.value.transportMode,

    hotelRequired: this.requestForm.value.hotelRequired,

    hotelPreference: this.requestForm.value.hotelPreference,

    estimatedBudget: this.requestForm.value.estimatedBudget,

    advancePayment: this.requestForm.value.advancePayment,

    additionalNotes: this.requestForm.value.additionalNotes
  };

  console.log(payload);

  this.travelRequestService
    .createRequest(payload)
    .subscribe({

      next: (response) => {

        console.log(response);

        alert('Travel Request Submitted Successfully');

this.requestForm.reset({

  fromLocation: '',

  destination: '',

  purpose: '',

  startDate: '',

  endDate: '',

  transportMode: '',

  hotelRequired: false,

  hotelPreference: '',

  estimatedBudget: '',

  advancePayment: false,

  additionalNotes: '',

  agreePolicy: false
});

Object.keys(this.requestForm.controls).forEach(key => {

  this.requestForm.get(key)?.setErrors(null);
});

this.requestForm.markAsPristine();

this.requestForm.markAsUntouched();
      },

      error: (error) => {

        console.log(error);

        alert('Failed To Submit Request');
      }
    });
}
}
