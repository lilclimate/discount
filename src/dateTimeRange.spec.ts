import { expect, test } from "vitest";
import { calc, validDate}  from "./dateTimeRange";
import dayjs from 'dayjs';

// Tasking
// happy path
// TODO: 命中->当前时间在日期区间、时间区间、指定周几内
// TODO: 命中->当前时间在日期区间内
// TODO: 命中->当前时间在非跨天区间内
// TODO: 命中->当前时间在跨天区间内
// TODO: 命中->当前时间在指定周x内
// sad path
// TODO: 未命中->当前时间不在组合区间内
// TODO: 未命中->当前时间不在日期区间内
// TODO: 未命中->当前时间不在跨天区间内
// TODO: 未命中->当前时间不在指定周x内

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

test.todo('match combination rules', () => {
	let currentTime = dayjs('2022.11.03 14:00').unix();
	const ranges = calc(rules, currentTime);
	expect(ranges).toEqual([rules[2], rules[0]]);
});

test('match date', () => {
	let currentTime = dayjs('2022.11.03 14:00').unix();
	expect(validDate(rules[0].dateRange, currentTime)).toBeTruthy();
});