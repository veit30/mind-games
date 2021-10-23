import games from "@/data/games";
import { createStore } from "vuex";

const initialState = () => ({
  games: games,
  game: "",
  //move to separate module
  highscore: "",
});

const state = initialState();

export default createStore({
  state,
  mutations: {
    setHighscore(state, highscore) {
      state.highscore = highscore;
    },
    setGame(state, game: string) {
      state.game = game;
    },
  },
  actions: {
    saveHighscore(context, score) {
      localStorage.setItem(`${context.state.game}_hs`, `${score}`);
      context.dispatch("getHighscore");
    },
    getHighscore(context) {
      const hs = localStorage.getItem(`${context.state.game}_hs`);
      context.commit("setHighscore", hs || "");
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
    hasHighscore(state) {
      return !!state.highscore;
    },
  },
  modules: {},
});
