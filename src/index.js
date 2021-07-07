const buildQueryParams = (prefix, query = {}) => {
	let url = prefix;
	if (!query || typeof query !== 'object' || Array.isArray(query))
		return url;
	const queryParams = Object.keys(query)
		.map(key => {
			if (Array.isArray(query[key]))
				query[key] = query[key].filter(v => typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string');
			return key;
		})
		.filter(key => {
			if (Array.isArray(query[key]) && query[key].length === 0)
				return false;
			if (!query[key] && query[key] !== 0 && query[key] !== false)
				return false;
			return true;
		});
	if (queryParams.length) {
		url += '?';
		queryParams.forEach((param, i) => {
			const value = query[param];
			if (i > 0)
				url += '&';
			url += `${param}=`;
			if (Array.isArray(value) && value.length > 0)
				url += value.join(',');
			else
				url += value;
		});
	}
	return url;
};

const clearAxiosResponseData = response => {
	const { status, data } = (response || {});
	if (status === 204)
		return true;
	if (typeof data === 'object')
		return clearAxiosResponseData(data);
	return response;
};

const normalizeString = string => (string || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const mapFields = options => {
	const object = {};
	for (let x = 0; x < options.fields.length; x++) {
		const field = [options.fields[x]];
		object[field] = {
			get() {
				return this.$store.state[options.base][field];
			},
			set(value) {
				this.$store.commit(options.mutation, { [field]: value });
			}
		};
	}
	return object;
};

const getEslintRules = () => ({
	'no-param-reassign': 'off',

	'import/first': 'off',
	'import/named': 'error',
	'import/namespace': 'error',
	'import/default': 'error',
	'import/export': 'error',
	'import/extensions': 'off',
	'import/no-unresolved': 'off',
	'import/no-extraneous-dependencies': 'off',
	'import/prefer-default-export': 'off',
	'prefer-promise-reject-errors': 'off',
	'prefer-destructuring': 'off',
	'no-async-promise-executor': 'off',
	'comma-dangle': ['error', 'never'],
	'no-unreachable': 'warn',
	'max-len': 0,
	'no-continue': 0,
	'no-tabs': 0,
	'no-nested-ternary': 0,
	'no-void': 0,
	'no-restricted-globals': 0,
	'no-bitwise': 0,
	indent: [
		'error',
		'tab',
		{ SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }
	],
	'arrow-parens': ['error', 'as-needed'],
	'func-names': 0,
	'no-plusplus': 0,
	'consistent-return': 'off',
	'no-constant-condition': 0,
	'template-curly-spacing': 'off',
	'nonblock-statement-body-position': ['error', 'below'],
	curly: ['error', 'multi-or-nest'],
	'no-unused-vars': 'warn',
	'vue/max-attributes-per-line': [
		'error',
		{
			singleline: 5,
			multiline: {
				max: 5,
				allowFirstLine: true
			}
		}
	],
	'no-underscore-dangle': 0,
	'vue/html-closing-bracket-newline': [
		'error',
		{
			singleline: 'never',
			multiline: 'never'
		}
	],
	'vue/html-indent': [
		'error',
		'tab',
		{
			alignAttributesVertically: false
		}
	],
	'vue/no-unused-components': 'warn',
	'vue/no-v-html': 0
});


module.exports = {
	mapFields,
	getEslintRules,
	normalizeString,
	buildQueryParams,
	clearAxiosResponseData
};
