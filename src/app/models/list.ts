export interface List {
    id: string;
    name: string;
    username: string;
    email: string;
}

export interface SortingInterface { 
    column: string;
    order: 'asc' | 'desc';
}