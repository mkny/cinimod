const fs = require("fs");

const requireField = fieldName => value => {
	if (String(value).length === 0) {
		return `${fieldName} is required`;
	}
	return true;
};

const getVariations = ({ hierarchy }) => {
	const path = `${__dirname}/src/components/${hierarchy}/`;

	const dirContext = fs
		.readdirSync(path)
		.filter(file => fs.statSync(path + file).isDirectory());

	if (dirContext.length === 0) {
		throw new Error("No components founded.");
	}

	return dirContext;
};

const prompts = {
	hierarchy: {
		type: "list",
		name: "hierarchy",
		message: "What level of the component?",
		choices: ["atoms", "molecules", "organisms", "pages", "templates"]
	},
	name: {
		type: "input",
		name: "name",
		message: "What is your component name?",
		validate: requireField("name")
	},
	variation: {
		type: "list",
		name: "variation",
		message: "What is your root component name?",
		choices: getVariations
	}
};

const files = {
	component: (rootName = "name") => ({
		type: "add",
		path: `src/components/{{hierarchy}}/{{pascalCase ${rootName}}}/{{pascalCase name}}.tsx`,
		templateFile: "plop-templates/Component/Component.tsx.hbs"
	}),
	test: (rootName = "name") => ({
		type: "add",
		path: `src/components/{{hierarchy}}/{{pascalCase ${rootName}}}/__tests__/{{pascalCase name}}.test.tsx`,
		templateFile:
			"plop-templates/Component/__tests__/Component.test.tsx.hbs"
	}),
	story: (rootName = "name") => ({
		type: "add",
		path: `src/components/{{hierarchy}}/{{pascalCase ${rootName}}}/{{pascalCase name}}.stories.tsx`,
		templateFile: "plop-templates/Component/Component.stories.tsx.hbs"
	}),
	entryPoint: {
		type: "add",
		path: "src/components/{{hierarchy}}/{{pascalCase name}}/index.tsx",
		templateFile: "plop-templates/Component/index.tsx.hbs"
	}
};

module.exports = plop => {
	plop.load("plop-prettier", {
		endOfLine: "lf",
		useTabs: true,
		tabWidth: 4
	});
	plop.setGenerator("component", {
		description: "Create a full component",
		prompts: [prompts.hierarchy, prompts.name],
		actions: [
			files.component("name"),
			files.test("name"),
			files.story("name"),
			files.entryPoint,
			{
				type: "add",
				path: "src/components/{{hierarchy}}/index.ts",
				templateFile: "plop-templates/injectable-index.tsx.hbs",
				skipIfExists: true
			},
			{
				type: "append",
				path: "src/components/{{hierarchy}}/index.ts",
				pattern: "/* PLOP_INJECT_IMPORT_EXPORT */",
				template:
					// eslint-disable-next-line quotes
					'export * from "./{{pascalCase name}}";'
			}
		]
	});

	plop.setGenerator("variant", {
		description: "Create a component variant",
		prompts: [prompts.hierarchy, prompts.variation, prompts.name],
		actions: [
			files.component("variation"),
			files.test("variation"),
			{
				type: "append",
				path: "src/components/{{hierarchy}}/{{pascalCase variation}}/index.tsx",
				pattern: "/* PLOP_INJECT_IMPORT_VARIANT */",
				template:
					// eslint-disable-next-line quotes
					'import {{pascalCase name}} from "./{{pascalCase name}}";'
			},
			{
				type: "append",
				path: "src/components/{{hierarchy}}/{{pascalCase variation}}/index.tsx",
				pattern: "/* PLOP_INJECT_EXPORT_VARIANT */",
				template:
					// eslint-disable-next-line quotes
					"export { {{pascalCase name}} };"
			}
		]
	});
	plop.setGenerator("story", {
		description: "Create a component story only",
		prompts: [prompts.hierarchy, prompts.variation, prompts.name],
		actions: [files.story("variation")]
	});
};
