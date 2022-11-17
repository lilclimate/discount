import dayjs from "dayjs";
export function calc(rules: any[], currentTime: number = now()) {
};

export function validDateRange(dateRange: number[], currentTime: number = now()) {
	return dateRange[1] >= currentTime && dateRange[0] < currentTime;			
};

export function validTimeRange(timeRange: string, currentTime: number = now()) {
	const range = timeRange.split('-');
	const date = dayjs(currentTime * 1000).format("YYYY.MM.DD");
	const start = dayjs(`${date} ${range[0]}`).unix();
	const end = dayjs(`${date} ${range[1]}`).unix();
	return end >= currentTime && start < currentTime;			
};


function now(): number {
	return dayjs().unix();
}

