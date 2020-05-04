const requireField = fieldName => {
  return value => {
    if (String(value).length === 0 ) {
      return fieldName + ' is required'
    }
    return true
  }
}

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'App/Components/{{pascalCase name}}/index.js',
        templateFile:
          'plop-templates/Component/Component.js.hbs',
      },
      {
        type: 'add',
        path: 'App/Components/{{pascalCase name}}/styles.js',
        templateFile:
          'plop-templates/styles.js.hbs',
      },
      {
        type: 'add',
        path: 'App/Components/index.js',
        templateFile: 'plop-templates/injectable-index.js.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'App/Components/index.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'App/Components/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  })

  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'App/Containers/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/Page/Page.js.hbs',
      },
      {
        type: 'add',
        path: 'App/Containers/{{pascalCase name}}/styles.js',
        templateFile: 'plop-templates/styles.js.hbs',
      },
      {
        type: 'add',
        path: 'App/Containers/index.js',
        templateFile: 'plop-templates/injectable-index.js.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'App/Containers/index.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'App/Containers/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
      {
        type: 'append',
        path: 'App/routes.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  })
}