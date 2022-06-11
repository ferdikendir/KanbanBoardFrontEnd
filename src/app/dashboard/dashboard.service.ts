import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EndPoint } from 'src/utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService: HttpClient
  ) { }

}
