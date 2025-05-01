import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API = `${environment.API}/category`;

  constructor(private http: HttpClient) { }

  list(): Observable<Category[]>{
    return this.http.get<Category[]>(this.API);
  }

  delete(id: number):Observable<Category>{
    return this.http.delete<Category>(this.API + `/${id}`);
  }
}
