module.exports = {
	root: true,
	extends: ["plugin:prettier/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"import",
		"prettier",
		"react",
		"react-hooks"
	],
	settings: {
		"import/internal-regex":
			"^(assets|common|components|containers|hooks|screens|navigation|constants|types)"
	},
	overrides: [
		{
			files: ["packages/**/*.{js,jsx,ts,tsx}"]
		}
	],
	rules: {
		"arrow-body-style": ["error", "always"],
		"@typescript-eslint/no-unused-vars":
			process.env.NODE_ENV === "production" ? "error" : "warn",
		"prettier/prettier": "error",
		indent: "off",
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"arrow-body-style": ["error", "as-needed"],
		"prefer-template": "error",
		complexity: ["error", 5],
		"no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
		"import/no-duplicates": "error",
		"import/order": [
			"error",
			{
				"newlines-between": "always",
				groups: [
					"external",
					"internal",
					"builtin",
					"parent",
					"sibling",
					"index"
				]
			}
		],
		"no-restricted-imports": [
			"error",
			{
				patterns: ["../../../", "../../", "./../../../"]
			}
		],
		"import/first": "error",
		"import/newline-after-import": "error"
	}
};
