module.exports = {
	'env': {
		'jest/globals': true,
		'browser': true,
		'es2021': true,
		'node': true
	},
	'plugins': ['jest'],
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'prefer-template': 'error',
		'space-infix-ops': 'error',
		'object-curly-spacing': ['error', 'always'],
		'no-trailing-spaces': 'error'
	}
};
