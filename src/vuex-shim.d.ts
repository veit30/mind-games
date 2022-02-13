import { Store } from "vuex";
import { Game } from "./data/games";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    games: Game[];
    game: string;
    highscore: number;
    theme: string;
    sessionStarted: boolean;
    transitionName: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
