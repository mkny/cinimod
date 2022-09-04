import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"subject-case": [2, "always", ["lower-case", "sentence-case"]],
		"scope-enum": [2, "always", ["monorepo", "use-async"]]
	}
};

module.exports = Configuration;

// https://www.npmjs.com/package/@commitlint/config-conventional
