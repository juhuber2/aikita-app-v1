export interface List {
    id: string;
    name: string;
    age: number;    
}

export interface SortingInterface { 
    column: string;
    order: 'asc' | 'desc';
}