module.exports = {
	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
	verbose: true,
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"\\.(css|less|scss)$": "identity-obj-proxy",
	},
	modulePathIgnorePatterns: ["<rootDir>/lib/"],
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
	},
	globals: {
		window: true,
		navigator: {
			userAgent: "node",
		},
	},
	coveragePathIgnorePatterns: ["node_modules", ".min.js", "tests", "utils"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
