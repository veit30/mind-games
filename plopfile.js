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
    games: {
      path: "src/views/games/{{pascalCase name}}.vue",
      templateFile: "plop/templates/TemplateGame.vue",
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

  plop.setGenerator("game", {
    description: "game generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Game name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: template.games.path,
        templateFile: template.games.templateFile,
      },
      {
        type: "modify",
        path: template.games.path,
        pattern: /TemplateGame/g,
        template: "{{pascalCase name}}",
      },
      {
        type: "modify",
        path: template.games.path,
        pattern: /template-game/g,
        template: "{{kebabCase name}}",
      },
      {
        type: "modify",
        path: template.games.path,
        pattern: /GAME_TITLE/g,
        template: "{{titleCase name}}",
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
