import dayjs from "dayjs";
export function calc(rules: any[], currentTime: number = now()) {
	return (rules || []).filter(rule => { 
		return validCombinationTimeRange(rule.timeRange, currentTime) && validWeek(rule.week, currentTime) && validDateRange(rule.dateRange, currentTime);
	}).sort((a, b) => {
    return a.dateRange[1] - b.dateRange[1];
  });
};

export function validDateRange(dateRange: number[], currentTime: number = now()) {
	return validTimeRange(dateRange, currentTime);

};

export function validCombinationTimeRange(timeRanges: string[], currentTime: number = now()) {
	return timeRanges.some(timeRange => validTimeRange(makeTimeRange(timeRange, currentTime), currentTime));
};

function validTimeRange(timeRange: any[], time: number) {
	return timeRange[1] >= time && timeRange[0] < time;
}

function makeTimeRange(timeRange: string, time: number) {
	const range = timeRange.split('-');
	const date = dayjs(time * 1000).format("YYYY.MM.DD");
	const end = dayjs(`${date} ${range[1]}`).unix();
	let start;
	start = dayjs(`${date} ${range[0]}`).unix();
	start = start > end ? start - 3600 * 24 : start;
	return [start, end];
}

export function validWeek(days: number[], currentTime: number = now()) { 
	return days.some(day => day === dayjs(currentTime * 1000).day());
}

function now(): number {
	return dayjs().unix();
}

