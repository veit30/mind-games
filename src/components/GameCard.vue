<template>
  <div class="card-wrapper">
    <div class="card controls-container">
      <div class="controls">
        <play-button @click="routeToGame" />
        <highscore-display :game-name="component" />
      </div>
    </div>
    <div
      class="card info-container flex-center"
      :class="{ collapsed: isCollapsed }"
      @click="collapse"
    >
      <div class="info-container__spacing"></div>
      <div class="info-container__main">
        <div class="title">
          {{ name }}
        </div>
        <div class="description">
          {{ description }}
        </div>
      </div>
      <div class="category-container">
        <div
          v-for="category in categories"
          :key="category"
          class="category"
          :class="getClassByCategory(category)"
        >
          <strong>{{ category }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GameCategory } from "@/data/games";
import { defineComponent, PropType } from "vue";
import PlayButton from "@/components/PlayButton.vue";
import HighscoreDisplay from "@/components/HighscoreDisplay.vue";

export default defineComponent({
  name: "GameCard",

  components: {
    PlayButton,
    HighscoreDisplay,
  },

  data() {
    return {
      isCollapsed: false,
    };
  },

  props: {
    component: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    route: {
      type: String,
      default: "/",
    },
    symbol: {
      type: String,
    },
    categories: {
      type: Array as PropType<GameCategory[]>,
    },
  },

  methods: {
    collapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    getClassByCategory(category: string) {
      switch (category) {
        case "brain":
          return "background--blue color--white";
        case "math":
          return "background--red color--white";
        case "speed":
          return "background--yellow color--black";
        case "memory":
          return "background--orange color--black";
        case "endurance":
          return "background--brown color--white";
      }
    },
    routeToGame() {
      this.$router.push(this.route);
    },
  },
});
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  height: 13.75rem;
  margin-bottom: 1rem;
}

.card {
  @include themed() {
    background: t("bg");
    border: 1px solid t("border-theme");
  }
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.info-container {
  z-index: 9;
  cursor: pointer;
  transition: height 0.3s ease-in-out;
  &.collapsed {
    height: 50%;
  }

  &:hover {
    @include themed() {
      background: t("bg-secondary");
    }
    cursor: pointer;
  }

  &__spacing {
    height: 1rem;
    transition: height 0.3s ease-in-out;
  }
}

.controls-container {
  @include themed() {
    background: t("bg-secondary");
  }
  display: flex;
  align-items: flex-end;

  .controls {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}

.title {
  padding: 0 1.25rem 0 1.25rem;
  font-size: 1.5rem;
}

.description {
  @include themed() {
    color: t("text-secondary");
  }
  padding: 0.625rem 1.25rem;
  font-size: 0.825rem;
}

.flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.category-container {
  width: 100%;
  display: flex;
  height: 2.5rem;
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

.category {
  margin: 0.5rem;
  padding: 0.25rem 0.5rem;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s ease-in-out;
}

.collapsed {
  .info-container__spacing {
    height: 0.5rem;
  }
  .category-container {
    height: 0.5rem;
    .category {
      transform: translate3d(0, 2rem, 0);
    }
  }
}

//TODO: mobile support

.game-card {
  width: 100%;
  height: 13.75rem;
  border: 1px solid $color-border-dark;
  background: $color-background-dark;
  text-decoration: none;
  color: $color-font;
  text-align: start;
  margin-bottom: 1rem;
  overflow: hidden;

  &:hover {
    background: $color-background-darker;
    cursor: pointer;
  }

  &__name {
    padding: 1.25rem 1.25rem 0 1.25rem;
    font-size: 1.5rem;
  }

  &__description {
    padding: 0.625rem 1.25rem;
    color: $color-font-secondary;
    font-size: 0.825rem;
  }
}

@media only screen and (min-width: 700px) {
  .card-wrapper {
    width: 31%;
  }
}
</style>
