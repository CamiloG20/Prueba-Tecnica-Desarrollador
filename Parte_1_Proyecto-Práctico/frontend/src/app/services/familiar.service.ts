import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FamiliarService {
  private api = 'http://localhost/backend/public/api';

  constructor(private http: HttpClient) {}

  getFamiliaresPorEmpleado(empleadoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/empleados/${empleadoId}/familiares`);
  }

  agregarFamiliar(empleadoId: number, familiar: any): Observable<any> {
    return this.http.post(`${this.api}/empleados/${empleadoId}/familiares`, familiar);
  }

  eliminarFamiliar(familiarId: number): Observable<any> {
    return this.http.delete(`${this.api}/familiares/${familiarId}`);
  }
}
