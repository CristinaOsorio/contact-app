export interface AddressBase {
    location: string;
}

export interface Address extends AddressBase {
    id: number;
}

export interface AddressDetail extends Address {
    contactId: number;
}

export interface CreateAddress extends AddressBase {}

export interface AddAddress extends Omit<AddressDetail, 'id'> {}
