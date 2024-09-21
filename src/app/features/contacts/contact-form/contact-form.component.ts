import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import {
    Component,
    inject,
    Input,
    OnChanges,
    SimpleChange,
    SimpleChanges,
} from '@angular/core';
import {
    Contact,
    UpdateContact,
} from '../../../core/interfaces/contact.interface';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.css',
})
export default class ContactFormComponent implements OnChanges {
    fb = inject(FormBuilder);
    contactService = inject(ContactService);

    @Input() id?: string;

    contactForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        notes: [''],
        birthday: [''],
        website: [''],
        company: [''],
        phoneNumbers: this.fb.array([]),
        emails: this.fb.array([]),
        addresses: this.fb.array([]),
    });
    contact: Contact | null = null;

    faTrash = faTrash;
    faPlus = faPlus;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['id'] && changes['id'].currentValue) {
            this.contactService
                .getById(Number(this.id))
                .subscribe((contact) => {
                    this.contact = contact as Contact;

                    this.phoneNumbers.clear();
                    this.emails.clear();
                    this.addresses.clear();
                    this.loadContactData(this.contact);
                });
        }
    }

    get phoneNumbers(): FormArray {
        return this.contactForm.get('phoneNumbers') as FormArray;
    }

    get emails(): FormArray {
        return this.contactForm.get('emails') as FormArray;
    }

    get addresses(): FormArray {
        return this.contactForm.get('addresses') as FormArray;
    }

    addPhoneNumber(): void {
        const phoneFormGroup = this.fb.group({
            number: ['', Validators.required],
        });
        this.phoneNumbers.push(phoneFormGroup);
    }

    addEmail(): void {
        const emailFormGroup = this.fb.group({
            address: ['', Validators.required],
        });
        this.emails.push(emailFormGroup);
    }

    addAddress(): void {
        const addressFormGroup = this.fb.group({
            location: ['', Validators.required],
        });
        this.addresses.push(addressFormGroup);
    }

    removePhoneNumber(index: number): void {
        this.phoneNumbers.removeAt(index);
    }

    removeEmail(index: number): void {
        this.emails.removeAt(index);
    }

    removeAddress(index: number): void {
        this.addresses.removeAt(index);
    }

    loadContactData(contact: Contact): void {
        this.phoneNumbers.clear();
        this.emails.clear();
        this.addresses.clear();

        this.contactForm.patchValue({
            name: contact.name,
            notes: contact.notes,
            birthday: contact.birthday,
            website: contact.website,
            company: contact.company,
        });

        contact.phoneNumbers?.forEach((phone) => {
            this.phoneNumbers.push(
                this.fb.group({
                    id: [phone.id],
                    number: [phone.number, Validators.required],
                })
            );
        });

        contact.emails?.forEach((email) => {
            this.emails.push(
                this.fb.group({
                    id: [email.id],
                    address: [email.address, Validators.required],
                })
            );
        });

        contact.addresses?.forEach((address) => {
            this.addresses.push(
                this.fb.group({
                    id: [address.id],
                    location: [address.location, Validators.required],
                })
            );
        });
    }

    onSubmit(): void {
        if (this.contactForm.invalid) {
            return this.contactForm.markAllAsTouched();
        }

        const contact: UpdateContact = this.contactForm.value;

        if (this.contact) {
            this.contactService
                .update(Number(this.id), contact)
                .subscribe((data) => {
                    console.log('Contacto actualizado con éxito', data);
                });
            return;
        }

        this.contactService.create(contact).subscribe(() => {
            console.log('Contacto creado con éxito', contact);
        });
    }
}
