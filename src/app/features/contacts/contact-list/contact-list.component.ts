import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/interfaces/contact.interface';
import { ContactDetailComponent } from '../components/contact-detail/contact-detail.component';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [FontAwesomeModule, ContactDetailComponent],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css',
})
export default class ContactListComponent implements OnInit {
    faSearch = faSearch;
    faUsers = faUsers;

    contacts = signal<Contact[]>([]);
    contactDetails = signal<Contact | null>(null);

    private contactService = inject(ContactService);

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
}
