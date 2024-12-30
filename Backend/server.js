require("module-alias/register")
const path = require("path")
require("dotenv").config(
    {
        path: path.join(__dirname, ".env")
    }
)
const {app} = require("@src/app");
const {Postgres} = require("@databases/SequelizePostgres");
const {User} = require("@models/User/UserModel");
const { Category } = require("@models/Category/CategoryModel");


async function initialDatabase () {
    const CATEGORIES = [
        {
            name: "Sofa",
            image: "sofa.jpg",
            products: [
                {
    
                    name: "Ghế Sofa MoHo 101",
                    price: 110,
                    oldPrice: 130,
                    quantity: 10,
                    status: "New",
                    sku: "MHCBCDD01.BL4",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "sofa1.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Ghế Sofa MoHo 102",
                    price: 100,
                    oldPrice: 120,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "sofa2.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Ghế Sofa MoHo 103",
                    price: 100,
                    oldPrice: 120,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "sofa3.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Ghế Sofa MoHo 104",
                    price: 120,
                    oldPrice: 199,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "sofa4.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Giường MoHo 105",
                    price: 139,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "bedroom1.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Giường MoHo 106",
                    price: 149,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "bedroom2.webp"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Giường MoHo 107",
                    price: 139,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "bedroom3.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Giường MoHo 108",
                    price: 149,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "bedroom4.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Bộ bàn ăn VLINE 601",
                    price: 149,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "dining1.webp"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Bộ bàn ăn VLINE 602",
                    price: 149,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "dining2.webp"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Nệm cao su Royal 188",
                    price: 120,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "mattres1.png"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Nệm tổng hợp 142",
                    price: 120,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "matres2.webp"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Bà VLINE 601",
                    price: 120,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "office1.webp"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Bàn làm việc VLINE 601",
                    price: 120,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "office2.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Bàn ghế ngoài trời BG-11N 603",
                    price: 120,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "out.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                },
                {
    
                    name: "Bàn trà BC-CNR 683",
                    price: 120,
                    oldPrice: 150,
                    quantity: 10,
                    status: "New",
                    sku: "SOF-001",
    
                    description: "Sofa description",
                    attributes: {
                        image: [
                            "out2.jpg"
                        ]
                    },
                    meta: {},
                    updatedAt: "",
                    createdAt: "",
                    rating: 0
                }
            ]
        },
        {
            name: "Phòng ngủ",
            image: "bedroom.jpg",
            products: []
        },
        {
            name: "Phòng ăn",
            image: "dining.jpg",
            products: []
        },
        {
            name: "Nệm",
            image: "mattress.jpg",
            products: []
        },
        {
            name: "Văn phòng",
            image: "office.jpg",
            products: []
        },
        {
            name: "Ngoài trời",
            image: "outdoor.jpg",
            
        }
    ]
    for(const item of CATEGORIES) {
        const category = await require("@models/Category/CategoryModel").Category.create(
            {
                name: item.name,
                attributes: {
                    image: item.image
                }
            }
        )
        if(!Array.isArray(item.products)){
            return
        }

        for(const product of item.products) {
            product.categoryId = category.getDataValue("id")
            await require("@models/Product/ProductModel").Product.create(product)
        }
        
        
    }
}


app.listen(
    process.env.PORT,
    () => {
        console.log(`Server running on port ${process.env.PORT}`)
        // initialDatabase();
    }
)