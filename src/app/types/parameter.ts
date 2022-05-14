export enum ParameterType {
	NUMBER = 'number'
}

export interface Parameter {
	id: string;
	name: string;
	type: ParameterType;
	
	analysisId: string;

	min: number;
	max: number;
	wight: number;

	color?: string;
}