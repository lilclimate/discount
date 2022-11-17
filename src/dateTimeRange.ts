import dayjs from "dayjs";
export function calc(rules: any[], currentTime: number = now()) {
};

export function validDateRange(dateRange: number[], currentTime: number = now()) {
	return dateRange[1] >= currentTime && dateRange[0] < currentTime;			
};

export function validTimeRange(timeRange: string, currentTime: number = now()) {
	const range = timeRange.split('-');
	const date = dayjs(currentTime * 1000).format("YYYY.MM.DD");
	const end = dayjs(`${date} ${range[1]}`).unix();
	let start;
	start = dayjs(`${date} ${range[0]}`).unix();
	start = start > end ? start - 3600 * 24 : start;
	return end >= currentTime && start < currentTime;
};

export function validWeek(days: number[], currentTime: number = now()) { 
	return days.every(day => day === dayjs(currentTime * 1000).day());
}

function now(): number {
	return dayjs().unix();
}

