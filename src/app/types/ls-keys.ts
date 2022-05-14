const prekey = 'stock_analysis_app_'
const makeKey = (key: string) => prekey + key;

export const LS_KEYS = {
	STRATEGIES: makeKey('strategies'),
	ANALYSIS: makeKey('analysis'),
	SECURITIES: makeKey('securities'),
	PARAMETERS: makeKey('parameters'),
	INCLUDED_IN_ANALYSIS: makeKey('securities_included_in_analysis'),
	DEFAULT_STRATEGY: makeKey('default_strategy')
}
