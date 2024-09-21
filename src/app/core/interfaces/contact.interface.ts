import { Address, AddressDetail, CreateAddress } from './address.interface';
import { AddEmail, CreateEmail, Email, EmailDetail } from './email.interface';
import {
    AddPhoneNumber,
    CreatePhoneNumber,
    PhoneNumber,
    PhoneNumberDetail,
} from './phone-number.interface';

// Definir los tipos base para Contact
export interface ContactBase {
    id: number;
    name: string;
    notes?: string;
    birthday?: string;
    website?: string;
    company?: string;
}

// Definir una estructura genérica para contactos
export interface ContactDetails<TPhone, TEmail, TAddress> extends ContactBase {
    phoneNumbers?: TPhone[];
    emails?: TEmail[];
    addresses?: TAddress[];
}

// Contact con detalles completos (lectura de datos)
export type Contact = ContactDetails<PhoneNumber, Email, Address>;

// Creación de contacto (sin 'id' y con campos de creación)
export type CreateContact = Omit<
    ContactDetails<CreatePhoneNumber, CreateEmail, CreateAddress>,
    'id'
>;

// Actualización de contacto (puede incluir campos para actualizar o agregar)
export type UpdateContact = ContactDetails<
    AddPhoneNumber | PhoneNumberDetail,
    AddEmail | EmailDetail,
    CreateAddress | AddressDetail
>;
