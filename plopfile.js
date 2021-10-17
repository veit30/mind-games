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
      gameListFile: "src/data/games.ts",
    },
    gameHelper: {
      path: "src/components/gameHelp/{{pascalCase name}}Help.vue",
      templateFile: "plop/templates/TemplateGameHelp.vue",
    }
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
      {
        type: "input",
        name: "description",
        message: "Game description:",
      },
      {
        type: "list",
        name: "category",
        message: "Game category:",
        choices: [
          "Math",
          "Brain",
          "Speed",
          "Memory",
        ]
      }
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
      {
        type: "add",
        path: template.gameHelper.path,
        templateFile: template.gameHelper.templateFile,
      },
      {
        type: "modify",
        path: template.gameHelper.path,
        pattern: /TemplateHelp/g,
        template: "{{pascalCase name}}Help",
      },
      {
        type: "modify",
        path: template.games.gameListFile,
        pattern: /\/\/nextGame/g,
        template: `{
    name: "{{titleCase name}}",
    component: "{{pascalCase name}}",
    description: "{{description}}",
    route: "{{kebabCase name}}",
    category: "{{category}}",
  },
  //nextGame`,
      }
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
