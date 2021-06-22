const { buildQueryParams } = require('./index');

const prefix = 'localhost';

test('buildQueryParams with different types', () => {
	expect(buildQueryParams(prefix)).toBe(prefix);
	expect(buildQueryParams(prefix, {})).toBe(prefix);
	expect(buildQueryParams(prefix, '1')).toBe(prefix);
	expect(buildQueryParams(prefix, 1)).toBe(prefix);
	expect(buildQueryParams(prefix, null)).toBe(prefix);
	expect(buildQueryParams(prefix, true)).toBe(prefix);
	expect(buildQueryParams(prefix, false)).toBe(prefix);
	expect(buildQueryParams(prefix, undefined)).toBe(prefix);
	expect(buildQueryParams(prefix, () => ({}))).toBe(prefix);
	expect(buildQueryParams(prefix, [])).toBe(prefix);

	expect(buildQueryParams(prefix, { param: null })).toBe(prefix);
	expect(buildQueryParams(prefix, { param: undefined })).toBe(prefix);
	expect(buildQueryParams(prefix, { param: [] })).toBe(prefix);
	expect(buildQueryParams(prefix, { param: [{ subparam: 0 }] })).toBe(prefix);
	expect(buildQueryParams(prefix, { param: true })).toBe(`${prefix}?param=true`);
	expect(buildQueryParams(prefix, { param: false })).toBe(`${prefix}?param=false`);
	expect(buildQueryParams(prefix, { param: 0 })).toBe(`${prefix}?param=0`);
	expect(buildQueryParams(prefix, { param: '0' })).toBe(`${prefix}?param=0`);
	expect(buildQueryParams(prefix, { param: [0] })).toBe(`${prefix}?param=0`);
	expect(buildQueryParams(prefix, { param: [0, 1] })).toBe(`${prefix}?param=0,1`);

	expect(buildQueryParams(prefix, { param0: 0, param1: '1' })).toBe(`${prefix}?param0=0&param1=1`);
});
