import dayjs from "dayjs";
import {test, expect, vi } from "vitest";

import { calc } from './plan';
// Tasking:
// 整合时间策略+商品策略
// 从多个方案中获取最佳商品套餐
test('happy', () => { 
	const productRules = [{
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

	const timeRules = [{
		dateRange: [1667232000, 1667663940], // 2022.11.01 00:00 - 2022.11.05 23:59
		timeRange: ['21:00 - 03:00', '04:00 - 10:00', '11:00 - 15:00'],
		week: [1, 2, 3, 4, 5, 6, 7],
	}, {
		dateRange: [1667491200, 1667923140], // 2022.11.04 00:00 - 2022.11.08 23:59
		timeRange: ['21:00 - 03:00', '04:00 - 10:00', '11:00 - 15:00'],
		week: [1, 2, 3, 4, 5, 6, 7],
	}, {
		dateRange: [1667232000, 1667491140], // 2022.11.01 00:00 - 2022.11.03 23:59
		timeRange: ['21:00 - 03:00', '04:00 - 10:00', '11:00 - 15:00'],
		week: [1, 2, 4, 5, 6, 7],
	}];

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
	},
	{
		name: "crisps",
		qty: 2,
		unitPrice: 1,
	}
	];

	const repo = {
		getPlans: vi.fn(() => [
			{
			id: 'A',
			productRules: [productRules[2], productRules[3]],
			timeRule: timeRules[2]
		}, {
			id: 'B',
			productRules: [productRules[2], productRules[3]],
			timeRule: timeRules[0]
			},
			{
			id: 'C',
			productRules: [productRules[4]],
			timeRule: timeRules[0]
		}]),
	};
	const currentTime = dayjs('2022.11.03 14:00').unix();
	const data = calc(repo)(products, currentTime);
	expect(data).toEqual({
		totalPrice: 7,
		discountSet :productRules[4],
	});
});



