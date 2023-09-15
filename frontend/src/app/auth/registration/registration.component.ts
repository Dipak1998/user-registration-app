import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const user = this.registrationForm.value;

    this.authService.register(user).subscribe(
      (response) => {
        console.log("reponse", response)
        const msg = response?.message;
        this.toastr.success(msg, 'Registration Success ', {
          timeOut: 3000,
        });
        // Handle successful registration
      },
      (error) => {
        const errMsg = error?.error?.message;
        console.log("error",errMsg );
        this.toastr.error(errMsg, 'Failed to register account', {
          timeOut: 3000,
        });
      }
    );
  }
}
