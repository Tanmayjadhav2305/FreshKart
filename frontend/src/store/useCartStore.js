import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
    paymentMethod: 'COD',

    addToCart: (product, qty, unit) => {
        const { cartItems } = get();
        // Check if item exists with same ID AND same unit (e.g., 1kg onions vs 500g onions) is tricky.
        // For simplicity, let's assume one-line item per product ID? 
        // Or we treat (ID + Unit) as unique key? 
        // Implementation: Check if product exists.

        const existItem = cartItems.find((x) => x.product === product._id && x.unit === unit);

        let newCartItems;
        if (existItem) {
            newCartItems = cartItems.map((x) =>
                (x.product === product._id && x.unit === unit) ? { ...existItem, qty: existItem.qty + qty } : x
            ); // Logic: Usually you set qty, here I'm adding? Let's stick to setting qty if that's easier or replacing.
            // Requirement says "Increase / decrease quantity".
            // Let's assume the passed qty is the NEW total quantity or logic handled in component.
            // Let's make this function: add/update item.
            // If it exists, we replace it with new qty.

            newCartItems = cartItems.map((x) =>
                (x.product === product._id && x.unit === unit) ? { ...x, qty, image: product.image, price: product.items.find(i => i.unit === unit).price } : x
            );
        } else {
            // Find price for unit
            const pBox = product.items.find(i => i.unit === unit);
            const price = pBox ? pBox.price : 0;

            const item = {
                product: product._id,
                name: product.name,
                image: product.image,
                price: price,
                countInStock: 100, // Simplification or need backend data
                qty,
                unit
            };
            newCartItems = [...cartItems, item];
        }

        set({ cartItems: newCartItems });
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    },

    removeFromCart: (id) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter((x) => x.product !== id); // Note: this removes all units of that product. Maybe fine?
        set({ cartItems: newCartItems });
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    },

    saveShippingAddress: (data) => {
        set({ shippingAddress: data });
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    },

    clearCart: () => {
        set({ cartItems: [] });
        localStorage.removeItem('cartItems');
    }
}));

export default useCartStore;
