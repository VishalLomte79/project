import { Category, MenuItem, Chef } from './types';

const BASE_URL = 'https://api.example.com'; // Replace with your actual backend URL
const USE_MOCK = true;

// Mock Data
const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: 'Starters' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Desserts' },
    { id: 4, name: 'Drinks' },
];

const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        id: 101,
        name: 'Chicken Tikka',
        description: 'Tender grilled chicken marinated in spices.',
        price: 250,
        imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video
        categoryId: 1,
    },
    {
        id: 102,
        name: 'Paneer Tikka',
        description: 'Cottage cheese cubes grilled with veggies.',
        price: 220,
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 1,
    },
    {
        id: 201,
        name: 'Butter Chicken',
        description: 'Chicken cooked in a rich tomato and butter gravy.',
        price: 350,
        imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 2,
    },
    {
        id: 202,
        name: 'Dal Makhani',
        description: 'Black lentils cooked overnight with butter and cream.',
        price: 280,
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 2,
    },
    {
        id: 301,
        name: 'Gulab Jamun',
        description: 'Soft milk solids dumplings dipped in sugar syrup.',
        price: 150,
        imageUrl: 'https://images.unsplash.com/photo-1593701478530-829b905f11d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        categoryId: 3,
    },
];

const MOCK_CHEFS: Chef[] = [
    {
        id: 1,
        name: 'Walter White',
        role: 'Master Chef',
        bio: 'Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem iure minima enim corporis et voluptate.',
        imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        id: 2,
        name: 'Sarah Jhonson',
        role: 'Patissier',
        bio: 'Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima suscipit corporis. Voluptate sed quas reiciendis animi neque sapiente.',
        imageUrl: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCategories = async (): Promise<Category[]> => {
    if (USE_MOCK) {
        await delay(500);
        return MOCK_CATEGORIES;
    }
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const fetchMenu = async (categoryId?: number): Promise<MenuItem[]> => {
    if (USE_MOCK) {
        await delay(800);
        if (categoryId) {
            return MOCK_MENU_ITEMS.filter((item) => item.categoryId === categoryId);
        }
        return MOCK_MENU_ITEMS;
    }
    const url = categoryId ? `${BASE_URL}/menu?category=${categoryId}` : `${BASE_URL}/menu`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch menu');
    return response.json();
};

export const fetchChefs = async (): Promise<Chef[]> => {
    if (USE_MOCK) {
        await delay(500);
        return MOCK_CHEFS;
    }
    // Assuming there's an endpoint for chefs, or we just mock it for now as it wasn't explicitly in the backend requirements but is in the UI requirements
    return MOCK_CHEFS;
}
