export const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined) {
        return 'N/A';
    }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
