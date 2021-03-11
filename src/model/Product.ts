const getZeroNumber = (num: number): string => {
	if (num < 10) return `00${num}`;
	return `0${num}`;
};
export interface Product {
	productCode: string;
	name: string;
	price: number;
	brand: string;
	quantity: number;
	discount: number;
}

export let data: Product[] = [
	{
		name: "iPhone 12 128GB",
		brand: "Apple",
		price: 22990000,
		quantity: 143,
		discount: 5,
	},
	{
		name: "OPPO Reno5 5G",
		brand: "Oppo",
		price: 11990000,
		quantity: 22,
		discount: 5,
	},
	{
		name: "iPhone 12 64GB",
		brand: "Apple",
		price: 20990000,
		quantity: 64,
		discount: 5,
	},
	{
		name: "Xiaomi Redmi 9T (6GB/128GB)",
		brand: "Xiaomi",
		price: 4690000,
		quantity: 77,
		discount: 5,
	},
	{
		name: "Oppo Find X2",
		brand: "Oppo",
		price: 19990000,
		quantity: 21,
		discount: 5,
	},
	{
		name: "Samsung Galaxy Note 20",
		brand: "Samsung",
		price: 18990000,
		quantity: 15,
		discount: 5,
	},
	{
		name: "Samsung Galaxy Z Flip",
		brand: "Samsung",
		price: 21000000,
		quantity: 61,
		discount: 5,
	},
	{
		name: "Samsung Galaxy S21 Ultra 5G",
		brand: "Samsung",
		price: 30990000,
		quantity: 68,
		discount: 5,
	},
	{
		name: "Xiaomi Mi 11 5G",
		brand: "Xiaomi",
		price: 21990000,
		quantity: 99,
		discount: 5,
	},
	{
		name: "Xiaomi POCO X3 NFC",
		brand: "Xiaomi",
		price: 6590000,
		quantity: 75,
		discount: 5,
	},
	{
		name: "Xiaomi Redmi 9C (3GB/64GB)",
		brand: "Xiaomi",
		price: 2790000,
		quantity: 32,
		discount: 5,
	},
	{
		name: "OPPO A93",
		brand: "Oppo",
		price: 6490000,
		quantity: 46,
		discount: 5,
	},
	{
		name: "OPPO Reno3 Pro",
		brand: "Oppo",
		price: 7990000,
		quantity: 278,
		discount: 5,
	},
	{
		name: "iPhone XR 128GB",
		brand: "Apple",
		price: 15990000,
		quantity: 305,
		discount: 5,
	},
	{
		name: "iPhone SE 128GB (2020)",
		brand: "Apple",
		price: 11790000,
		quantity: 12,
		discount: 5,
	},
].map((item, index) => {
	let newProduct: Product = { ...item, productCode: getZeroNumber(index + 1) };
	return newProduct;
});

export const deleteProduct = (productId: string) => {
	let newData = [];
	for (let index = 0; index < data.length; index++) {
		if (data[index]["productCode"] !== productId) newData.push(data[index]);
	}
	data = newData;
};
