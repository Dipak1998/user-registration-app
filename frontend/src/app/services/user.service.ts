import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

  // Fetch user profile data
  getProfile(): Observable<any> {
    // In a real application, you may need to pass the user ID or a token for authentication
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Update user profile data
  updateProfile(updatedProfileData: any): Observable<any> {
    // In a real application, you may need to pass the user ID or a token for authentication
    return this.http.put(`${this.apiUrl}/profile`, updatedProfileData);
  }
  
}
