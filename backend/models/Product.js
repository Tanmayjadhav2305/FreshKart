const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    items: [
        {
            unit: { type: String, required: true }, // e.g., 'kg', 'g', 'piece'
            price: { type: Number, required: true },
            stock: { type: Number, required: true, default: 0 }
        }
    ],
    isOutOfStock: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
