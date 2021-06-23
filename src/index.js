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
	const { data } = (response || {});
	if (typeof data === 'object')
		return clearAxiosResponseData(response.data);
	return response;
};

const normalizeString = string => (string || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

module.exports = {
	normalizeString,
	buildQueryParams,
	clearAxiosResponseData
};
