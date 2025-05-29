export interface Clients {
    items: Item[];
    totalItems: number;
}

export interface Item {
    id: number;
    type: string;
    name: string;
    document: string;
    observation: null;
    active: boolean;
    id_profile: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
