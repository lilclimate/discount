import {test, expect } from "vitest";
import { calc } from "./calc";
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
}];

// happy path
// single match with the same
// single match with over sku type
// single match with over sku qty
// multiple matches and pick the best

// sad path
// not match when miss sku type
// not match when sku qty not enough
// not match when discount price more than actual price
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
	expect(calc(products, sets)).toEqual(sets[0]);
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
	expect(calc(products, sets)).toEqual(sets[0]);
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
	expect(calc(products, sets)).toEqual(sets[0]);
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
	expect(calc(products, sets)).toEqual(sets[3]);
});

test('not match when miss sku type', () => { 
	const products = [{
		name: "sprite",
		qty: 1,
		unitPrice: 1,
	}];
	expect(calc(products, sets)).toEqual(null);
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
	expect(calc(products, sets)).toEqual(null);
});

test.todo('not match when discount price more than actual price');
