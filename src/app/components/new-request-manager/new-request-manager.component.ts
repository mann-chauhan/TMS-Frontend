import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from '../manager/manager.component';

@Component({
  selector: 'app-new-request-manager',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ManagerComponent],
  templateUrl: './new-request-manager.component.html',
  styleUrls: ['./new-request-manager.component.scss']
})
export class NewRequestManagerComponent {

  requestForm = new FormGroup({
    managerName: new FormControl('ManagerDefault', Validators.required),
    department: new FormControl('DefaultDepartment', Validators.required),

    destination: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    transport: new FormControl('', Validators.required),
    flightClass: new FormControl(''),

    itinerary: new FormArray([
      this.createItinerary()
    ]),

    hotelRequired: new FormControl(false),
    hotelPreference: new FormControl(''),

    estimatedBudget: new FormControl('', [Validators.required, Validators.min(100)]),
    advanceRequired: new FormControl(false),

    agreePolicy: new FormControl(false, Validators.requiredTrue)
  });

  createItinerary() {
    return new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      transport: new FormControl('', Validators.required),
      flightClass: new FormControl('')
    });
  }

  addItinerary() {
    this.itinerary.push(this.createItinerary());
  }

  removeItinerary(index: number) {
    this.itinerary.removeAt(index);
  }

  get itinerary() {
    return this.requestForm.get('itinerary') as FormArray;
  }

  // ✅ getter used in template
  get isAir(): boolean {
    return this.requestForm.get('transport')?.value === 'AIR';
  }

  onSubmit() {
    if (this.requestForm.valid) {
      console.log('Full Request:', this.requestForm.value);
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}