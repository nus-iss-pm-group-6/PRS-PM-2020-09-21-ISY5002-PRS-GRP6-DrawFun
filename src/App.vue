<template>
  <ui-drawer type="modal" nav-id="menu">
    <ui-drawer-header>
      <ui-drawer-title>{{ title }}</ui-drawer-title>
    </ui-drawer-header>
    <ui-drawer-content>
      <ui-nav>
        <router-link to="/" custom v-slot="{ href, route, navigate, isActive }">
          <ui-nav-item @click="navigate" :href="href" :active="isActive">{{ route.name }}</ui-nav-item>
        </router-link>
        <router-link to="/about" custom v-slot="{ href, route, navigate, isActive }">
          <ui-nav-item @click="navigate" :href="href" :active="isActive">{{ route.name }}</ui-nav-item>
        </router-link>
      </ui-nav>
    </ui-drawer-content>
  </ui-drawer>
  <ui-drawer-backdrop/>
  <ui-top-app-bar fixed content-selector="#content" nav-id="menu">{{ title }}</ui-top-app-bar>
  <div id="content">
    <router-view/>
  </div>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
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
@use './assets/style/_vendor.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

#content {
  text-align: center;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
