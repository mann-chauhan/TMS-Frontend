import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EmployeeComponent],
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent {
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
    travelType: new FormControl('Domestic'),

    // 🛣️ Itinerary (multiple entries)
    itinerary: new FormArray([
      this.createItinerary()
    ]),

    // 🏨 Accommodation
    hotelRequired: new FormControl(false),
    hotelPreference: new FormControl(''),

    // 💰 Expense
    estimatedBudget: new FormControl('', [Validators.required, Validators.min(100)]),
    advanceRequired: new FormControl(false),

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

  // 🔹 Add itinerary
  addItinerary() {
    this.itinerary.push(this.createItinerary());
  }

  // 🔹 Remove itinerary
  removeItinerary(index: number) {
    this.itinerary.removeAt(index);
  }

  // ✅ Check if transport at given index is Air
  isAir(index: number): boolean {
    return (this.itinerary.at(index) as FormGroup).get('transport')?.value === 'Air';
  }

  get itinerary() {
    return this.requestForm.get('itinerary') as FormArray;
  }

  onSubmit() {
    if (this.requestForm.valid) {
      console.log("Full Request:", this.requestForm.value);
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}
