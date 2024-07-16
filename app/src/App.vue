<template>
    <component :is="currentPageComponent" />
    <BottomMenu :defaultActive="currentPage" @update:page="handleNavigation" />
</template>

<script>
import BottomMenu from './components/BottomMenu.vue';
import UserProfile from './components/UserProfile.vue';
import SecondWindow from './components/SecondWindow.vue';

export default {
  name: 'App',
  components: {
    UserProfile,
    SecondWindow,
    BottomMenu
  },
  data() {
    return {
      currentPage: 'profile'
    };
  },
  computed: {
    currentPageComponent() {
      return this.pages[this.currentPage];
    },
    pages() {
      return {
        profile: UserProfile,
        channels: SecondWindow,
        portfolio: UserProfile 
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
  /* overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start; */
}
</style>
