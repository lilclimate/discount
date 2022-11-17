import { expect, test } from "vitest";
import { calc, validDateRange, validCombinationTimeRange, validWeek}  from "./dateTimeRange";
import dayjs from 'dayjs';

// Tasking
// happy path
// 命中->当前时间在日期区间、时间区间、指定周几内
// 命中->当前时间在日期区间内
// 命中->当前时间在非跨天区间内
// 命中->当前时间在跨天区间内
// 命中->当前时间在指定周x内
// sad path
// 未命中->当前时间不在组合区间内
// 未命中->当前时间不在日期区间内
// 未命中->当前时间不在跨天区间内
// 未命中->当前时间不在指定周x内
// 抛错:时间区间规则错误

const rules = [{
	dateRange: [1667232000, 1667663940], // 2022.11.01 00:00 - 2022.11.05 23:59
	timeRange: ['21:00 - 03:00', '04:00 - 10:00', '11:00 - 15:00'],
	week: [1, 2, 3, 4, 5, 6, 7],
},{
	dateRange: [1667491200, 1667923140], // 2022.11.04 00:00 - 2022.11.08 23:59
	timeRange: ['21:00 - 03:00', '04:00 - 10:00', '11:00 - 15:00'],
	week: [1, 2, 3, 4, 5, 6, 7],
	},{
	dateRange: [1667232000, 1667491140], // 2022.11.01 00:00 - 2022.11.03 23:59
	timeRange: ['21:00 - 03:00', '04:00 - 10:00', '11:00 - 15:00'],
	week: [1, 2, 4, 5, 6, 7],
}];

test('match combination rules', () => {
	let currentTime = dayjs('2022.11.03 14:00').unix();
	const ranges = calc(rules, currentTime);
	expect(ranges).toEqual([rules[2], rules[0]]);
});

test('match date range', () => {
	let currentTime = dayjs('2022.11.03 14:00').unix();
	expect(validDateRange(rules[0].dateRange, currentTime)).toBeTruthy();
});

test('match non cross day time range', () => {
	let currentTime = dayjs('2022.11.03 09:00').unix();
	expect(validCombinationTimeRange([rules[2].timeRange[1]], currentTime)).toBeTruthy();	
});

test('match cross day time range', () => {
	let currentTime = dayjs('2022.11.04 02:00').unix();
	expect(validCombinationTimeRange([rules[2].timeRange[0]], currentTime)).toBeTruthy();	
});

test('match week', () => {
	let currentTime = dayjs('2022.11.04 02:00').unix();
	expect(validWeek([5], currentTime)).toBeTruthy();	
});

test('not match combination rules', () => {
	let currentTime = dayjs('2022.11.11 14:00').unix();
	const ranges = calc(rules, currentTime);
	expect(ranges).toEqual([]);
});


test('not match non cross day time range', () => {
	let currentTime = dayjs('2022.11.03 19:00').unix();
	expect(validCombinationTimeRange([rules[2].timeRange[1]], currentTime)).toBeFalsy();	
});

test('not match cross day time range', () => {
	let currentTime = dayjs('2022.11.04 04:00').unix();
	expect(validCombinationTimeRange([rules[2].timeRange[0]], currentTime)).toBeFalsy();	
});

test('not match week', () => {
	let currentTime = dayjs('2022.11.04 02:00').unix();
	expect(validWeek([6], currentTime)).toBeFalsy();	
});

test('should throw date range error', () => {
	let currentTime = dayjs('2022.11.03 14:00').unix();
	expect(() => {
		validDateRange([1667663940, 1667232000], currentTime)
	}).toThrowError('date range error');
});
