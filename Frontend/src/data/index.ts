export type Account = {
    email: string
    password: string
    displayName: string
}

const getAccounts = (): Account[] => {
    const json = localStorage.getItem("accounts")

    const accounts = json?.startsWith("[") && json.endsWith("]") ? JSON.parse(json) : [
        {
            email: "admin@gmail.com",
            password: "123456789",
        }
    ]
    return accounts as Account[]
}

export const getAccount = (payload: Omit<Account, "displayName">) => {
    const accounts = getAccounts()

    return accounts.find((account: Account) => account.email === payload.email && account.password === payload.password)
}

export const addAccount = (account: Account) => {

    if(getAccounts().find((a: Account) => a.email === account.email)){
        throw new Error("Account already exists")
    }
    localStorage.setItem(
        "accounts",
        JSON.stringify([...getAccounts(), account])
    )
}


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
        name: "Phòng ngủ",
        image: "/images/category/bedroom.jpg",
    },
    {
        id: 3,
        name: "Phòng ăn",
        image: "/images/category/dining.jpg",
    },
    {
        id: 4,
        name: "Nệm",
        image: "/images/category/mattress.jpg",
    },
    {
        id: 5,
        name: "Văn phòng",
        image: "/images/category/office.jpg",
    },
    {
        id: 6,
        name: "Ngoài trời",
        image: "/images/category/outdoor.jpg",
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
        name: "Ghế Sofa MoHo 101",
        price: 110,
        oldPrice: 130,
        quantity: 10,
        status: "New",
        sku: "MHCBCDD01.BL4",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/sofa1.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 2,
        name: "Ghế Sofa MoHo 102",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/sofa2.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 3,
        name: "Ghế Sofa MoHo 103",
        price: 100,
        oldPrice: 120,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/sofa3.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 4,
        name: "Ghế Sofa MoHo 104",
        price: 120,
        oldPrice: 199,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/sofa4.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 5,
        name: "Giường MoHo 105",
        price: 139,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/bedroom1.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 6,
        name: "Giường MoHo 106",
        price: 149,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/bedroom2.webp"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 7,
        name: "Giường MoHo 107",
        price: 139,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/bedroom3.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 8,
        name: "Giường MoHo 108",
        price: 149,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/bedroom4.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 9,
        name: "Bộ bàn ăn VLINE 601",
        price: 149,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/dining1.webp"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 9,
        name: "Bộ bàn ăn VLINE 602",
        price: 149,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/dining2.webp"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 10,
        name: "Nệm cao su Royal 188",
        price: 120,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/mattres1.png"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 11,
        name: "Nệm tổng hợp 142",
        price: 120,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/matres2.webp"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 11,
        name: "Bà VLINE 601",
        price: 120,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/office1.webp"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 11,
        name: "Bàn làm việc VLINE 601",
        price: 120,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/office2.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 13,
        name: "Bàn ghế ngoài trời BG-11N 603",
        price: 120,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/out.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    },
    {
        id: 13,
        name: "Bàn trà BC-CNR 683",
        price: 120,
        oldPrice: 150,
        quantity: 10,
        status: "New",
        sku: "SOF-001",
        categoryId: 1,
        description: "Sofa description",
        attributes: {
            image: [
                "/images/products/out2.jpg"
            ]
        },
        meta: {},
        updatedAt: "",
        createdAt: "",
        rating: 0
    }
]

export type Order = {
    id: string
    address: string
    phone: string
    method: "COD" | "VNPAY"
    total: number
    items: ProductCart[]
}
