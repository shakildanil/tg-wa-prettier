<template>
  <component :is="currentPageComponent" />
  <BottomMenu :defaultActive="currentPage" @update:page="handleNavigation" />
</template>

<script>
import BottomMenu from './components/BottomMenu.vue';
import HomePage from './pages/HomePage.vue';
// import SecondWindow from './components/SecondWindow.vue';
// import OrderPanel from './components/OrderPanel.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    // SecondWindow,
    // OrderPanel,
    BottomMenu
  },
  data() {
    return {
      currentPage: 'home'
    };
  },
  computed: {
    currentPageComponent() {
      return this.pages[this.currentPage];
    },
    pages() {
      return {
        home: HomePage,
        // channels: SecondWindow,
        // portfolio: OrderPanel
      };
    }
  },
  methods: {
    handleNavigation(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
</style>
