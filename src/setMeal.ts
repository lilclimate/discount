import lodash from "lodash";
export function calc(products, sets) {
	const productsMap = parseProduct(products);
	const matchedSets = getMatchedSets(sets, productsMap);
	const matchedSet = pickBestSets(matchedSets);
	const totalPrice = getTotalPrice(matchedSet, products);

	return { totalPrice, discountSet: matchedSet };
}
;
function getTotalPrice(matchedSet: any, products: any) {
	const setMap = parseSet(matchedSet);
	const remainingTotalPrice = getRemainingTotalPrice(products, setMap);
	const setPrice = matchedSet ? matchedSet.price : 0;
	const totalPrice = remainingTotalPrice + setPrice;
	return totalPrice;
}
function getRemainingTotalPrice(products: any, setMap: any) {
	return products.reduce((acc, cur) => {
		const remainingQty = setMap[cur.name] ? cur.qty - setMap[cur.name] : cur.qty;
		acc += remainingQty * cur.unitPrice;
		return acc;
	}, 0);
}
function parseSet(matchedSet: any) {
	return (matchedSet?.skus || []).reduce((acc, cur) => {
		acc[cur.name] = cur.qty;
		return acc;
	}, {});
}
function pickBestSets(matchedSets: any) {
	let set = null;
	if (lodash.isEmpty(matchedSets)) return set;
	if (matchedSets.length === 1) return matchedSets[0]; 

	let maxAmount = 0;
	return (matchedSets || []).reduce((acc, cur) => {
		if (cur.amount > maxAmount) {
			maxAmount = cur.amount;
			acc = cur;
		}
		return acc;
	}, set);
}
function getMatchedSets(sets: any, products: any) {
	return sets.reduce((acc, cur) => {
		cur.amount = getSkuDiscountAmount(cur, products);
		if (isSkuMatched(cur, products))
			acc.push(cur);
		return acc;
	}, []);
}
function isSkuMatched(cur: any, products: any) {
	return cur.skus.every(sku => products[sku.name] && products[sku.name].qty >= sku.qty
	);
}
function getSkuDiscountAmount(cur: any, products: any) {
	const matchedSkuTotalPrice = cur.skus.reduce((acc, sku) => {
		const unitPrice = products[sku.name] ? products[sku.name].unitPrice : 0;
		acc += sku.qty * unitPrice;
		return acc;
	}, 0);
	const amount = matchedSkuTotalPrice - cur.price;
	return amount;
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
