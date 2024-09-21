export interface EmailBase {
    address: string;
}

export interface Email extends EmailBase {
    id: number;
}

export interface EmailDetail extends Email {
    contactId: number;
}

export interface CreateEmail extends EmailBase {}

export interface AddEmail extends Omit<EmailDetail, 'id'> {}
