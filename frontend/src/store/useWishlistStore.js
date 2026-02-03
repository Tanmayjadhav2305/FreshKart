import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],
            addToWishlist: (product) => {
                const { wishlist } = get();
                const existItem = wishlist.find((x) => x._id === product._id);

                if (existItem) {
                    set({
                        wishlist: wishlist.filter((x) => x._id !== product._id),
                    });
                    toast.error('Removed from Wishlist');
                } else {
                    set({
                        wishlist: [...wishlist, product],
                    });
                    toast.success('Added to Wishlist');
                }
            },
            isInWishlist: (productId) => {
                const { wishlist } = get();
                return wishlist.some((x) => x._id === productId);
            }
        }),
        {
            name: 'wishlist-storage', // name of the item in the storage (must be unique)
        }
    )
);

export default useWishlistStore;
