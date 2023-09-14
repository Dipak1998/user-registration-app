import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  isEditMode: boolean = false;
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    // Fetch user profile data here and populate the form
    this.userService.getProfile().subscribe(
      (response) => {
        this.profileData = response;
        this.profileForm = this.fb.group({
          firstName: [this.profileData.firstName, Validators.required],
          lastName: [this.profileData.lastName, Validators.required],
          interests: [this.profileData.interests.join(', '), Validators.required],
        });
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }

  editProfile() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  onSave() {
    if (this.profileForm.invalid) {
      return;
    }

    // Update user profile data here
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (response) => {
        // Handle success
            // For this example, mock success
        console.log('Updated profile:', this.profileForm.value);
        this.isEditMode = false;
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }
}
