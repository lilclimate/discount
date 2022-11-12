export function calc(products, sets) {
	const productsMap = parseProduct(products);
	const matchedSets = getMatchedSets(sets, productsMap);
	const matchedSet = pickBestSets(matchedSets);
	return matchedSet;	
};

function pickBestSets(matchedSets: any) {
	let maxAmount = 0;
	return (matchedSets || []).reduce((acc, cur) => {
		if (cur.amount > maxAmount) {
			maxAmount = cur.amount;
			acc = cur;
		}
		return acc;
	}, null);
}

function getMatchedSets(sets: any, products: any) {
	return sets.reduce((acc, cur) => {
		const isSkuMatched = cur.skus.every(sku => products[sku.name] && products[sku.name].qty >= sku.qty
		);
		const matchedSkuTotalPrice = cur.skus.reduce((acc, sku) => {
			const unitPrice = products[sku.name] ? products[sku.name].unitPrice: 0;
			acc += sku.qty * unitPrice
			return acc;
		 }, 0);
		const amount = matchedSkuTotalPrice - cur.price;
		cur.amount = amount;

		if (isSkuMatched)
			acc.push(cur);
		return acc;
	}, []);
}

function parseProduct(products: any) {
	return products.reduce((acc, cur) => {
		acc[cur.name] = {
			qty: cur.qty,
			unitPrice: cur.unitPrice,
		};
		return acc;
	}, {});
}

