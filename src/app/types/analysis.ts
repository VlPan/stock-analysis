import { Parameter } from './parameter';

export interface Analysis {
	id: string;
	strategyId: string;
	name: string;
	weight: number;
	dateAdded: Date;

	color?: string;
	copiedFrom?: string;

	parameters: Parameter[];
}