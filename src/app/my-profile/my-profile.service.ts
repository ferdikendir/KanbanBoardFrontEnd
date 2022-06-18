import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/user';
import { EndPoint } from 'src/utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(
    private http: HttpClient
  ) { }

  updateProfile(profile: User) {
    return this.http.post(environment.apiUrl+ EndPoint.UPDATE_PROFİLE, profile);
  }
}
