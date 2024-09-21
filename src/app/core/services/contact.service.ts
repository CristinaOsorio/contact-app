import { PaginatedResponse } from './../interfaces/paginate.interface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    Contact,
    CreateContact,
    UpdateContact,
} from '../interfaces/contact.interface';
@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private contacts: Contact[] = [
        {
            id: 1,
            name: 'John Doe',
            phoneNumbers: [{ id: 1, number: '123-456-7890' }],
            emails: [{ id: 1, address: 'john.doe@example.com' }],
            addresses: [{ id: 1, location: '123 Main St' }],
            notes: 'Important client',
        },
        {
            id: 2,
            name: 'Jane Smith',
            birthday: '1985-10-12',
            website: 'https://janesmith.com',
            company: 'Tech Innovators Inc.',
            phoneNumbers: [
                {
                    id: 1,
                    number: '987-654-3210',
                },
                {
                    id: 2,
                    number: '555-123-4567',
                },
            ],
            emails: [
                {
                    id: 1,
                    address: 'jane.smith@techinnovators.com',
                },
                {
                    id: 2,
                    address: 'j.smith@gmail.com',
                },
            ],
            addresses: [
                {
                    id: 1,
                    location: '456 Oak Avenue, Suite 200, San Francisco, CA',
                },
            ],
        },
        {
            id: 3,
            name: 'Jane Smith',
            phoneNumbers: [{ id: 2, number: '098-765-4321' }],
            emails: [{ id: 2, address: 'jane.smith@example.com' }],
            addresses: [{ id: 2, location: '456 Broadway' }],
            notes: 'Project lead',
        },
        {
            id: 4,
            name: 'Michael Johnson',
            birthday: '1990-05-22',
            website: 'https://michaeljohnson.dev',
            company: 'Freelance Developer',
            phoneNumbers: [
                {
                    id: 1,
                    number: '123-987-6543',
                },
            ],
            emails: [
                {
                    id: 1,
                    address: 'michael.johnson@freelance.com',
                },
            ],
            addresses: [
                {
                    id: 1,
                    location: '789 Pine Street, Apartment 305, New York, NY',
                },
            ],
        },
    ];

    constructor() {}

    getAll(): Observable<PaginatedResponse<Contact>> {
        return of({ data: this.contacts });
    }

    getById(id: number): Observable<Contact | undefined> {
        const contact = this.contacts.find((c) => c.id === id);
        return of(contact);
    }

    create(contact: CreateContact): Observable<Contact> {
        console.log('create', contact);
        return of({
            id: 1,
            name: 'New',
            phoneNumbers: [
                {
                    id: 1,
                    number: '123-456-7890',
                },
            ],
            emails: [
                {
                    id: 1,
                    address: 'john.doe@example.com',
                },
            ],
            addresses: [
                {
                    id: 1,
                    location: '123 Main St',
                },
            ],
        });
    }

    update(id: number, updatedContact: UpdateContact): Observable<Contact> {
        console.log('update', { id, updatedContact });

        return of({
            id: 2,
            name: 'Jane Smith',
            birthday: '1985-10-12',
            website: 'https://janesmith.com',
            company: 'Tech Innovators Inc.',
            phoneNumbers: [
                {
                    id: 1,
                    number: '987-654-3210',
                },
                {
                    id: 2,
                    number: '555-765-4321',
                },
            ],
            emails: [
                {
                    id: 1,
                    address: 'jane.smith@techinnovators.com',
                },
                {
                    id: 2,
                    address: 'j.smith@gmail.com',
                },
                {
                    id: 3,
                    address: 'jane.smith@newemail.com',
                },
            ],
            addresses: [
                {
                    id: 1,
                    location: '456 Oak Avenue, Suite 200, San Francisco, CA',
                },
                {
                    id: 2,
                    location: '321 Maple Drive, San Francisco, CA',
                },
            ],
        });
    }

    delete(id: number): Observable<boolean> {
        console.log('delete', id);

        return of();
    }
}
