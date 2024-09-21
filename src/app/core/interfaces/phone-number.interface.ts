export interface PhoneNumberBase {
    number: string;
}

export interface PhoneNumber extends PhoneNumberBase {
    id: number;
}

export interface PhoneNumberDetail extends PhoneNumber {
    contactId: number;
}

export interface CreatePhoneNumber extends PhoneNumberBase {}

export interface AddPhoneNumber extends Omit<PhoneNumberDetail, 'id'> {}
