import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ManagerComponent }
from '../manager/manager.component';

import { TravelRequestService }
from '../../services/travel-request.service';

@Component({
  selector: 'app-new-request-manager',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ManagerComponent
  ],
  templateUrl:
    './new-request-manager.component.html',
  styleUrls: [
    './new-request-manager.component.scss'
  ]
})

export class NewRequestManagerComponent {

  // =========================================
  // CONSTRUCTOR
  // =========================================

constructor(
  private travelRequestService: TravelRequestService
) {}

  // =========================================
  // FORM
  // =========================================

  requestForm = new FormGroup({

    managerName: new FormControl(
      'ManagerDefault',
      Validators.required
    ),

    department: new FormControl(
      'DefaultDepartment',
      Validators.required
    ),

    destination: new FormControl(
      '',
      Validators.required
    ),

    purpose: new FormControl(
      '',
      Validators.required
    ),

    startDate: new FormControl(
      '',
      Validators.required
    ),

    endDate: new FormControl(
      '',
      Validators.required
    ),

    transport: new FormControl(
      '',
      Validators.required
    ),

    flightClass: new FormControl(''),

    hotelRequired: new FormControl(false),

    hotelPreference: new FormControl(''),

    estimatedBudget: new FormControl(
      '',
      [
        Validators.required,
        Validators.min(100)
      ]
    ),

    advanceRequired: new FormControl(false),

    agreePolicy: new FormControl(
      false,
      Validators.requiredTrue
    )
  });

  // =========================================
  // AIR CHECK
  // =========================================

  get isAir(): boolean {

    return this.requestForm
      .get('transport')
      ?.value === 'AIR';
  }

  // =========================================
  // RESET FORM
  // =========================================

  resetForm() {

    this.requestForm.reset({

      managerName: 'ManagerDefault',

      department: 'DefaultDepartment',

      destination: '',

      purpose: '',

      startDate: '',

      endDate: '',

      transport: '',

      flightClass: '',

      hotelRequired: false,

      hotelPreference: '',

      estimatedBudget: '',

      advanceRequired: false,

      agreePolicy: false
    });
  }

  // =========================================
  // SUBMIT
  // =========================================

  onSubmit() {

    // VALIDATION

    if (this.requestForm.invalid) {

      this.requestForm.markAllAsTouched();

      return;
    }

    // PAYLOAD

    const payload = {

      managerId: 2,

      destination:
        this.requestForm.value.destination,

      purpose:
        this.requestForm.value.purpose,

      startDate:
        this.requestForm.value.startDate,

      endDate:
        this.requestForm.value.endDate,

      transportMode:
        this.requestForm.value.transport,

      hotelRequired:
        this.requestForm.value.hotelRequired,

      hotelPreference:
        this.requestForm.value.hotelPreference,

      estimatedBudget:
        this.requestForm.value.estimatedBudget,

      advancePayment:
        this.requestForm.value.advanceRequired,

      additionalNotes: ''
    };

    // API CALL

    this.travelRequestService
      .createManagerRequest(payload)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Manager Request Submitted',
            response
          );

          alert(
            'Request Submitted Successfully'
          );

          this.resetForm();
        },

        error: (error: any) => {

          console.error(
            'Manager Request Failed',
            error
          );

          alert(
            'Failed To Submit Request'
          );
        }
      });
  }
}