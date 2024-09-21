import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Contact } from '../../../core/interfaces/contact.interface';
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
export default class ContactFormComponent {
    contactForm: FormGroup;

    faTrash = faTrash;
    faPlus = faPlus;

    constructor(
        private fb: FormBuilder,
        private contactService: ContactService
    ) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            notes: [''],
            birthday: [''],
            website: [''],
            company: [''],
            phoneNumbers: this.fb.array([]),
            emails: this.fb.array([]),
            addresses: this.fb.array([]),
        });
    }

    ngOnInit(): void {}

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
            id: [0],
            number: ['', Validators.required],
        });
        this.phoneNumbers.push(phoneFormGroup);
    }

    addEmail(): void {
        const emailFormGroup = this.fb.group({
            id: [0],
            address: ['', Validators.required],
        });
        this.emails.push(emailFormGroup);
    }

    addAddress(): void {
        const addressFormGroup = this.fb.group({
            id: [0],
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

    onSubmit(): void {
        if (this.contactForm.invalid) {
            return this.contactForm.markAllAsTouched();
        }

        const contact: Contact = this.contactForm.value;
        this.contactService.create(contact).subscribe(() => {
            console.log('Contacto creado con éxito', contact);
        });
    }
}
