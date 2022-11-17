import dayjs from "dayjs";
export function calc(rules: any[], currentTime: number = now()) {
};

export function validDate(dateRange: number[], currentTime: number = now()) {
	return dateRange[1] >= currentTime && dateRange[0] < currentTime;			
};

function now(): number {
	return dayjs().unix();
}

