import {
    Component,
    inject,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {
    faTrash,
    faPen,
    faGift,
    faPhone,
    faEnvelope,
    faLocationDot,
    faLink,
    faBuilding,
    faStickyNote,
    faCakeCandles,
    faCircle,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../../../../core/interfaces/contact.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../../core/services/contact.service';

@Component({
    selector: 'app-contact-detail',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './contact-detail.component.html',
    styleUrl: './contact-detail.component.css',
})
export default class ContactDetailComponent implements OnChanges {
    @Input() id!: Contact;
    contact!: Contact;

    contactService = inject(ContactService);

    faTrash = faTrash;
    faPen = faPen;
    faGift = faGift;
    faPhone = faPhone;
    faEnvelope = faEnvelope;
    faLocationDot = faLocationDot;
    faLink = faLink;
    faBuilding = faBuilding;
    faStickyNote = faStickyNote;
    faCakeCandles = faCakeCandles;
    faCircle = faCircle;

    contactInfo: {
        label: string;
        value: any;
        icon: IconDefinition;
    }[] = [];

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['id'] && changes['id'].currentValue) {
            this.contactService
                .getById(Number(this.id))
                .subscribe((contact) => {
                    this.contact = contact as Contact;
                    if (this.contact) {
                        this.updateContactInfo();
                    }
                });
        }
    }

    private updateContactInfo() {
        this.contactInfo = [
            {
                label: 'Teléfono',
                value: this.contact.phoneNumbers?.map((phone) => ({
                    ...phone,
                    value: phone.number,
                })),

                icon: faPhone,
            },
            {
                label: 'Correo',
                value: this.contact.emails?.map((email) => ({
                    ...email,
                    value: email.address,
                })),

                icon: faEnvelope,
            },
            {
                label: 'Dirección',
                value: this.contact.addresses?.map((address) => ({
                    ...address,
                    value: address.location,
                })),

                icon: faLocationDot,
            },
            {
                label: 'Cumpleaños',
                value: this.contact.birthday,

                icon: faCakeCandles,
            },
            {
                label: 'Página web',
                value: this.contact.website,

                icon: faLink,
            },
            {
                label: 'Empresa',
                value: this.contact.company,

                icon: faBuilding,
            },
            {
                label: 'Nota',
                value: this.contact.notes,

                icon: faStickyNote,
            },
        ].filter((item) => item.value);
    }

    isString(value: any) {
        return typeof value === 'string';
    }
}
