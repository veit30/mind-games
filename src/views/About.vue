<template>
  <div class="about">
    <div>
      <h1>MiNd</h1>
      <h1>GAmES</h1>
      <p>by Veit Schumacher</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  div {
    h1 {
      font-family: $font-title;
      font-size: 4rem;
      font-weight: 400;
    }

    p {
      padding-left: 0.25rem;
    }
  }
}
</style>
