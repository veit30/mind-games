import { Game } from "./../data/games";
import { getGames } from "@/data/games";
import { createStore } from "vuex";

const initialHighscores = () => {
  return getGames().reduce((acc: { [key: string]: string }, cur: Game) => {
    acc[cur.name] = "";
    return acc;
  }, {});
};

const initialState = () => ({
  games: getGames(),
  game: "",
  highscores: initialHighscores(),
  theme: "dark",
});

const state = initialState();

export default createStore({
  state,
  mutations: {
    setHighscore(state, { name, highscore }) {
      state.highscores[name] = highscore;
    },
    setGame(state, game: string) {
      state.game = game;
    },
    setTheme(state, theme: string) {
      state.theme = theme;
    },
  },
  actions: {
    saveHighscore(context, score) {
      localStorage.setItem(`${context.state.game}_hs`, `${score}`);
      context.dispatch("getHighscore", { name: context.state.game });
    },
    getHighscores(context) {
      context.state.games.forEach((game) => {
        const hs = localStorage.getItem(`${game.component}_hs`);
        context.commit("setHighscore", {
          name: game.component,
          highscore: hs || "",
        });
      });
    },
    getHighscore(context, { name }) {
      const hs = localStorage.getItem(`${name}_hs`);
      context.commit("setHighscore", { name, highscore: hs || "" });
    },
    clearStorage() {
      localStorage.clear();
    },
    removeHighscore(context) {
      context.commit("setHighscore", "");
      localStorage.removeItem(`${context.state.game}_hs`);
    },
  },
  getters: {
    hasHighscore: (state) => (name: string) => {
      return !!state.highscores[name];
    },
    getHighscoreByGameName: (state) => (name: string) => {
      return state.highscores[name] ?? "";
    },
    getHighscore(state) {
      return state.highscores[state.game] ?? "";
    },
    getScoreTypeByGameName: (state) => (name: string) => {
      return state.games.find((game) => game.component === name)?.scoreType;
    },
  },
  modules: {},
});
