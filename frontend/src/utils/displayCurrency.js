export const displayARGCurrency = num => {
	const formatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		minimumFractionDigits: 0,
	});

	return formatter.format(num);
};
