export  function calc(products, sets) {
	const productsMap = products.reduce((acc, cur) => {
		acc[cur.name] = cur.qty;
		return acc;
	 }, {});

	const matchedSets = sets.reduce((acc, cur) => { 
		const isMatched = cur.skus.every(sku =>  
			productsMap[sku.name] && productsMap[sku.name] >= sku.qty
		);	

		if (isMatched) acc.push(cur); 
		return acc;
	}, []);
	return matchedSets;	
};
