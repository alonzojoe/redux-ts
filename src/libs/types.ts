export type Products = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: Category;
}

type Category = {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}