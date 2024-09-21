import { PaginatedResponse } from './../interfaces/paginate.interface';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
    Contact,
    CreateContact,
    UpdateContact,
} from '../interfaces/contact.interface';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { handleError } from '../handles/errors.handle';
@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private apiUrl = `${environment.apiUrl}/api/contacts`;
    private http = inject(HttpClient);
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor() {}

    getAll(): Observable<PaginatedResponse<Contact>> {
        let params = new HttpParams().set('per_page', 20);

        return this.http
            .get<PaginatedResponse<Contact>>(this.apiUrl, { params })
            .pipe(
                catchError(
                    handleError<PaginatedResponse<Contact>>('getAll', {
                        data: [],
                        current_page: 0,
                        from: 0,
                        last_page: 0,
                        per_page: 0,
                        to: 0,
                        total: 0,
                    })
                )
            );
    }

    getById(id: number): Observable<Contact | null> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .get<Contact>(url)
            .pipe(catchError(handleError<Contact>(`getOne id=${id}`)));
    }

    create(contact: CreateContact): Observable<Contact> {
        return this.http
            .post<Contact>(this.apiUrl, contact, this.httpOptions)
            .pipe(catchError(handleError<Contact>('create')));
    }

    update(id: number, updatedContact: UpdateContact): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .put(url, updatedContact, this.httpOptions)
            .pipe(catchError(handleError<any>('update')));
    }

    delete(id: number): Observable<boolean> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete<boolean>(url)
            .pipe(catchError(handleError<boolean>('delete')));
    }
}
