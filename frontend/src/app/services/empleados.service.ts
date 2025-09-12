import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { Familiar } from '../models/familiar.model';

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private apiUrl = 'http://localhost/backend/public/api/empleados';
  private apiKey = 'sk-2f8e1b7c-4e2a-4d8b-9c1e-8e7f1a2b3c4d';

  private getHeaders() {
    return new HttpHeaders({ 'Authorization': this.apiKey });
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(this.apiUrl, empleado, { headers: this.getHeaders() });
  }

  updateEmpleado(id: number, empleado: Empleado): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, empleado, { headers: this.getHeaders() });
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getFamiliares(id_empleado: number): Observable<Familiar[]> {
    return this.http.get<Familiar[]>(`${this.apiUrl}/${id_empleado}/familiares`, { headers: this.getHeaders() });
  }

  createFamiliar(id_empleado: number, familiar: Familiar): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id_empleado}/familiares`, familiar, { headers: this.getHeaders() });
  }

  deleteFamiliar(id: number): Observable<any> {
    return this.http.delete(`http://localhost/backend/public/api/familiares/${id}`, { headers: this.getHeaders() });
  }

  constructor(private http: HttpClient) {}
}
