export enum ParameterType {
	NUMBER = 'number'
}

export interface Parameter {
	id: string;
	name: string;
	type: ParameterType;
	
	min: number;
	max: number;
	weight: number;

	color?: string;
}