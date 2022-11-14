import {test, expect } from "vitest";
import { calc } from "./setMeal";
const sets = [{
	skus: [{
		name: "sprite",
		qty: 1
	}, {
		name: "cola",
		qty: 1
	}],
	price: 1,
},{
	skus: [{
		name: "water",
		qty: 2
	}, {
		name: "cola",
		qty: 1
	}],
	price: 2,
},{
	skus: [{
		name: "sprite",
		qty: 1
	}, {
		name: "cola",
		qty: 1
		}, {
		name: "water",
		qty: 1
		}],
	price: 1
},{
	skus: [{
		name: "sprite",
		qty: 2
	}, {
		name: "cola",
		qty: 1
	}],
	price: 0,
},{
	skus: [{
		name: "crisps",
		qty: 2
	}],
	price: 3,
}];

// happy path
// single match with the same
// single match with over sku type
// single match with over sku qty
// single match when discount price more than actual price
// multiple matches and pick the best

// sad path
// not match when miss sku type
// not match when sku qty not enough
test('single match with the same', () => { 
	const products = [{
		name: "sprite",
		qty: 1,
		unitPrice: 1,
	},
	{
		name: "cola",
		qty: 1,
		unitPrice: 1,
	}];
	expect(calc(products, sets)).toEqual({totalPrice: 1, discountSet: sets[0]});
});

test('single match with over sku type', () => { 
	const products = [{
		name: "sprite",
		qty: 1,
		unitPrice: 1,
	},
	{
		name: "cola",
		qty: 1,
		unitPrice: 1,
		},
	{
		name: "crisps",
		qty: 1,
		unitPrice: 1,
	}];
	expect(calc(products, sets)).toEqual({totalPrice: 2, discountSet: sets[0]});
});
test('single match when discount price more than actual price', () => { 
	const products = [
		{
		name: "crisps",
		qty: 2,
		unitPrice: 1,
	}];
	expect(calc(products, sets)).toEqual({
		totalPrice: 3,
		discountSet :sets[4],
	});
});

test('single match with over sku qty', () => { 
	const products = [{
		name: "sprite",
		qty: 1,
		unitPrice: 1,
	},
	{
		name: "cola",
		qty: 2,
		unitPrice: 1,
	},
	];
	expect(calc(products, sets)).toEqual({totalPrice: 2, discountSet: sets[0]});
});


test('multiple matches and pick the best', () => { 
	const products = [{
		name: "sprite",
		qty: 2,
		unitPrice: 1,
	},
	{
		name: "cola",
		qty: 1,
		unitPrice: 1,
	},
	{
		name: "water",
		qty: 1,
		unitPrice: 1,
	}
	];
	expect(calc(products, sets)).toEqual({totalPrice:1, discountSet: sets[3]});
});

test('not match when miss sku type', () => { 
	const products = [{
		name: "sprite",
		qty: 1,
		unitPrice: 1,
	}];
	expect(calc(products, sets)).toEqual({totalPrice: 1, discountSet:null});
});

test('not match when miss sku type', () => { 
	const products = [
		{
		name: "water",
		qty: 1,
		unitPrice: 1,
	},{
		name: "cola",
		qty: 1,
		unitPrice: 1,
	}];
	expect(calc(products, sets)).toEqual({
		totalPrice: 2,
		discountSet: null,
	});
});


