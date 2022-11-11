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
	amount: 1
},{
	skus: [{
		name: "water",
		qty: 1
	}, {
		name: "cola",
		qty: 1
	}],
	amount: 1
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
	amount: 2
},{
	skus: [{
		name: "sprite",
		qty: 2
	}, {
		name: "cola",
		qty: 1
	}],
	amount: 3
}];

// TODO: 
// happy path
// single match with the same
// single match with over sku type
// single match with over sku qty
// multiple matches and pick the best

// sad path
// not match when miss sku type
// not match when sku qty not enough
test('single match with the same', () => { 
	const products = [{
		name: "sprite",
		qty: 1
	},
	{
		name: "cola",
		qty: 1
	}];
	expect(calc(products, sets)).toEqual([sets[0]]);
});

test('single match with over sku type', () => { 
	const products = [{
		name: "sprite",
		qty: 1
	},
	{
		name: "cola",
		qty: 1
		},
	{
		name: "crisps",
		qty: 1
	}];
	expect(calc(products, sets)).toEqual([sets[0]]);
});

test('single match with over sku qty', () => { 
	const products = [{
		name: "sprite",
		qty: 1
	},
	{
		name: "cola",
		qty: 2
	},
	];
	expect(calc(products, sets)).toEqual([sets[0]]);
});