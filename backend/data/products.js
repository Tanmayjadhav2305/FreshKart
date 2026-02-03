const products = [
    {
        name: 'Fresh Red Tomatoes',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop',
        description: 'Locally grown organic tomatoes, perfect for salads, sauces, and cooking. Hand-picked for freshness.',
        category: 'Vegetables',
        items: [
            { unit: 'kg', price: 40, stock: 100 },
            { unit: '500g', price: 22, stock: 100 }
        ],
    },
    {
        name: 'New Harvest Potatoes',
        image: 'https://thumbs.dreamstime.com/b/selected-potatoes-basket-market-close-up-large-fresh-new-harvest-counter-404690170.jpg', // User provided image
        description: 'Fresh new harvest potatoes, earthy and starchy. Great for frying or mashing.',
        category: 'Vegetables',
        items: [
            { unit: 'kg', price: 30, stock: 200 },
            { unit: '2kg', price: 55, stock: 100 }
        ],
    },
    {
        name: 'Crisp Red Onions',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1000&auto=format&fit=crop',
        description: 'Essential kitchen staple. Adds flavor and depth to every dish.',
        category: 'Vegetables',
        items: [
            { unit: 'kg', price: 35, stock: 150 },
            { unit: '1kg', price: 35, stock: 150 }
        ],
    },
    {
        name: 'Organic Bananas',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1000&auto=format&fit=crop',
        description: 'Sweet, creamy, and nutritious organic bananas. Rich in potassium.',
        category: 'Fruits',
        items: [
            { unit: 'dozen', price: 60, stock: 50 },
            { unit: '6 pcs', price: 35, stock: 50 }
        ],
    },
    {
        name: 'Premium Apples (Fuji)',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop',
        description: 'Crisp, sweet, and juicy Fuji apples. Perfect for snacking.',
        category: 'Fruits',
        items: [
            { unit: 'kg', price: 180, stock: 40 },
            { unit: '4 pcs', price: 80, stock: 60 }
        ],
    },
    {
        name: 'Fresh Cow Milk',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop',
        description: 'Farm fresh pasteurized cow milk. Rich in calcium and protein.',
        category: 'Dairy',
        items: [
            { unit: '1L', price: 70, stock: 50 },
            { unit: '500ml', price: 38, stock: 50 }
        ],
    },
    {
        name: 'Farm Fresh Eggs',
        image: 'https://img.freepik.com/free-photo/fresh-village-eggs-table_140725-7018.jpg?semt=ais_hybrid&w=740&q=80', // User provided image
        description: 'Free-range brown eggs. High quality protein source.',
        category: 'Eggs & Meat',
        items: [
            { unit: '6 pcs', price: 55, stock: 100 },
            { unit: '12 pcs', price: 100, stock: 50 }
        ],
    },

    {
        name: 'Whole Grain Bread',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
        description: 'Freshly baked whole grain bread. Healthy and fiber-rich.',
        category: 'Bakery',
        items: [
            { unit: 'Loaf', price: 45, stock: 30 }
        ],
    },
];

module.exports = products;
