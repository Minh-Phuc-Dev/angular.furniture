export type Category = {
    id: number,
    name: string,
    image: string
}

export const CATEGORIES : Category[] = [
    {
        id: 1,
        name: "Sofa",
        image: "/images/category/sofa.jpg",
    },
    {
        id: 2,
        name: "Bedroom",
        image: "/images/category/bedroom.jpg",
    },
    {
        id: 3,
        name: "Dining",
        image: "/images/category/dining.jpg",
    },
    {
        id: 4,
        name: "Mattress",
        image: "/images/category/mattress.jpg",
    },
    {
        id: 5,
        name: "Office",
        image: "/images/category/office.jpg",
    },
    {
        id: 6,
        name: "Outdoor",
        image: "/images/category/outdoor.jpg"
    }
]

export type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    quantity: number;
    status: string;
    sku: string;
    categoryId: number;
    description: string;
    attributes: {
        image: string[];
    };
    meta: Record<string, unknown>;
    updatedAt: string;
    createdAt: string;
    rating: number;
}

export type ProductCart = Product & {
    quantity: number
}

export const PRODUCTS : Product[] = [
    {
        id: 1,
        name: "Sofa",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/0f35c4be-e682-46b2-a816-2d019295db2d.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 2,
        name: "Sofa bend",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/0f35c4be-e682-46b2-a816-2d019295db2d.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 3,
        name: "Sofa style",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/0f35c4be-e682-46b2-a816-2d019295db2d.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 4,
        name: "Sofa luxury",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/0f35c4be-e682-46b2-a816-2d019295db2d.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 5,
        name: "Sofa luxury",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/0f35c4be-e682-46b2-a816-2d019295db2d.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    }
]
