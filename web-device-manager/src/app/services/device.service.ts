import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Device } from '../interfaces/device.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private readonly API = `${environment.API}/device`;

  constructor(private http: HttpClient) { }

  list(): Observable<Device[]>{
    return this.http.get<Device[]>(this.API);
  }

  delete(id: number):Observable<Device>{
    return this.http.delete<Device>(this.API + `/${id}`);
  }

  criar(device: Device): Observable<Device> {
    return this.http.post<Device>(this.API, device);
  }
}
