import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
        this.toastr.success('User login successfully', 'Login Success', {
          timeOut: 3000,
        });

      },
      (error) => {
        const errMsg = error?.error?.message;
        console.log("error",errMsg );
        this.toastr.error(errMsg, 'Login Failed', {
          timeOut: 3000,
        });
      }
    );
  }
}
