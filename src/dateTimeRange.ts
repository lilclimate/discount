import dayjs from "dayjs";
export function calc(rules: any[], currentTime: number = now()) {
	return (rules || []).filter(rule => { 
		const isMatchedTimeRange = rule.timeRange.some(timeRange => validTimeRange(timeRange, currentTime));
		return isMatchedTimeRange && validWeek(rule.week, currentTime) && validDateRange(rule.dateRange, currentTime);
	}).sort((a, b) => {
    return a.dateRange[1] - b.dateRange[1];
  });
};

export function validDateRange(dateRange: number[], currentTime: number = now()) {
	return validTmpTimeRange(dateRange, currentTime);

};

export function validTimeRange(timeRange: string, currentTime: number = now()) {
	const tmpTimeRange = makeTimeRange(timeRange, currentTime);
	return validTmpTimeRange(tmpTimeRange, currentTime);
};

function validTmpTimeRange(tmpTimeRange: any[], time: number) {
	return tmpTimeRange[1] >= time && tmpTimeRange[0] < time;
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

