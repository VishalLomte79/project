export interface Category {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    videoUrl?: string;
    categoryId: number;
}

export interface Chef {
    id: number;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}
