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
		const isMatched = cur.skus.every(sku => products[sku.name] && products[sku.name] >= sku.qty
		);

		if (isMatched)
			acc.push(cur);
		return acc;
	}, []);
}

function parseProduct(products: any) {
	return products.reduce((acc, cur) => {
		acc[cur.name] = cur.qty;
		return acc;
	}, {});
}

