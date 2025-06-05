/** @type {import('xo').FlatXoConfig} */
const xoConfig = [
	{
		semicolon: true,
		space: false,
		rules: {
			"no-new": "off",
			"no-undef": "off",
			radix: "off",
			"sort-imports": "error",
			indent: "off",
		},
		ignores: ["deps/purify.js", "*.min.js", "sw.js", "workbox-*.js"],
	},
];
export default xoConfig;
