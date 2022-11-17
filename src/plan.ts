
import lodash from 'lodash';
import {calc as dateValid} from './dateTimeRange'
import {calc as setValid  } from "./setMeal";
export function calc(repo: any) { 
	return (products, time: number) => {
		let plans;
		plans = repo.getPlans();
		plans = (plans || []).filter(plan => dateValid([plan.timeRule], time));
		const sets = (plans || []).map(plan => {
			return setValid(products, plan.productRules)
		 });
		const data = pickBestSets(sets);
		return data;
	};
}

function pickBestSets(matchedSets: any) {
	let set = null;
	if (lodash.isEmpty(matchedSets)) return set;
	if (matchedSets.length === 1) return matchedSets[0]; 

	let maxAmount = 0;
	return (matchedSets || []).reduce((acc, cur) => {
		if (cur.totalPrice > maxAmount) {
			maxAmount = cur.totalPrice;
			acc = cur;
		}
		return acc;
	}, set);
}