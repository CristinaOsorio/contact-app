import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faPencil,
    faSearch,
    faUsers,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/interfaces/contact.interface';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [FontAwesomeModule, RouterOutlet, RouterModule],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css',
})
export default class ContactListComponent implements OnInit {
    faSearch = faSearch;
    faPencil = faPencil;
    faTrash = faTrash;
    faUsers = faUsers;

    contacts = signal<Contact[]>([]);
    contactDetails = signal<Contact | null>(null);
    isDelete = false;

    private contactService = inject(ContactService);
    private router = inject(Router);

    ngOnInit(): void {
        this.contactService.getAll().subscribe((res) => {
            this.contacts.set(res.data);
            this.contactDetails.set(res.data[0] || null);
        });
    }

    openContactDetails(contact: Contact): void {
        this.contactDetails.set(contact);
    }

    createContact() {
        console.log('create');
    }

    getFirstPhoneNumber(contact: Contact): string {
        return contact.phoneNumbers?.[0]?.number || 'Sin teléfono';
    }

    getFirstEmail(contact: Contact): string {
        return contact.emails?.[0]?.address || 'Sin email';
    }

    stopPropagation(event: Event): void {
        event.stopPropagation();
    }

    deleteContact(event: Event, contact: Contact): void {
        event.stopPropagation();
        this.isDelete = true;
        this.contactDetails.set(contact);
    }

    acceptDelete() {
        const id = this.contactDetails()!.id;
        this.isDelete = false;
        this.contactService.delete(id).subscribe((data) => {
            this.contacts.update((prev) => prev.filter((c) => c.id !== id));
            this.contactDetails.set(null);
            this.router.navigate(['contacts']);
        });
    }

    cancel() {
        this.isDelete = false;
        this.contactDetails.set(null);
    }
}
