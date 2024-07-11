<template>
  <UserProfile />
  <!-- <SecondWindow /> -->
  <BottomMenu />
</template>

<script>
import BottomMenu from './components/BottomMenu.vue';
// import SecondWindow from './components/SecondWindow.vue';
import UserProfile from './components/UserProfile.vue';

export default {
  name: 'App',
  components: {
    UserProfile,
    // SecondWindow,
    BottomMenu,
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  /**overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;**/
}
</style>
