export const convertMoney = (price: number): string => {
	const stringPrice = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price);
	return stringPrice;
};

export const getHightLightText = (value: string, searchText: string): string => {
	if (searchText) {
		const regEx = new RegExp(searchText, "i");
		const newValue = value
			.toString()
			.replace(regEx, '<span style="background-color:yellow;">$&</span>');
		// return (
			// <Typography
			// 	display="inline"
			// 	dangerouslySetInnerHTML={{ __html: newValue }}
			// ></Typography>
		// );
		return newValue;
	}
	return value;
};
