<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-0" role="navigation">
    <div class="container-fluid">
      <a class="navbar-brand p-0" href="#">
        <img src="./assets/img/logo.png" width="40" height="40" class="d-inline-block align-top" loading="lazy">
        <span class="ml-3">{{ title }}</span>
      </a>
    </div>
  </nav>
  <div id="content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: ''
  }),
  mounted() {
    this.title = document.title;
  }
};
</script>

<style lang="scss">
@use './assets/style/vendor';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#content {
  text-align: center;
}

.navbar-brand span {
  font-family: (--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto), sans-serif);
  font-size: 36px;
  font-weight: bolder;
  font-family: sans-serif;
}
</style>
