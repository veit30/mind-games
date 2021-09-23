module.exports = function (plop) {
  const template = {
    components: {
      path: "src/components/{{pascalCase name}}.vue",
      templateFile: "plop/templates/TemplateComponent.vue",
    },
    views: {
      path: "src/views/{{pascalCase name}}.vue",
      templateFile: "plop/templates/TemplateView.vue",
    },
  };

  plop.setGenerator("view", {
    description: "view generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "View name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: template.views.path,
        templateFile: template.views.templateFile,
      },
      {
        type: "modify",
        path: template.views.path,
        pattern: /TemplateView/g,
        template: "{{pascalCase name}}",
      },
      {
        type: "modify",
        path: template.views.path,
        pattern: /template-view/g,
        template: "{{kebabCase name}}",
      },
    ],
  });

  plop.setGenerator("component", {
    description: "component generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: template.components.path,
        templateFile: template.components.templateFile,
      },
      {
        type: "modify",
        path: template.components.path,
        pattern: /TemplateComponent/g,
        template: "{{pascalCase name}}",
      },
      {
        type: "modify",
        path: template.components.path,
        pattern: /template-component/g,
        template: "{{kebabCase name}}",
      },
    ],
  });
};
