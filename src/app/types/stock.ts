export interface Stock {
	id: string;
  name: string;
  longName: string;
	color?: string;

  lastCalculatedResult: number;
  analysisInputs: AnalysisInputs;
}

export interface AnalysisInputs {
	[strategyId: string]: {
		[analysisId: string]: { [parameterId: string]: any };
	};
}
