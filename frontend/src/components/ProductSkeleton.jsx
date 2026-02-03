const ProductSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full border border-gray-100 dark:border-gray-700 animate-pulse">
            {/* Image Placeholder */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>

            {/* Content Placeholder */}
            <div className="p-5">
                {/* Title */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>

                {/* Rating - Hidden on very small screens in real card but skeleton can be generic */}
                <div className="flex gap-1 mb-3">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>

                {/* Price and Button Row */}
                <div className="flex justify-between items-center mt-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
