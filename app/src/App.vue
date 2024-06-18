<template>
  <div id="app">
    <component :is="currentComponent" :user="user" @loginSuccess="handleLoginSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TelegramLogin from './components/TelegramLogin.vue';
import UserPage from './components/UserPage.vue';

interface TelegramAuthData {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  auth_date: string;
  hash: string;
}

export default defineComponent({
  name: 'App',
  components: {
    TelegramLogin,
    UserPage,
  },
  setup() {
    const currentComponent = ref('TelegramLogin');
    const user = ref<TelegramAuthData | null>(null);

    const handleLoginSuccess = (userData: TelegramAuthData) => {
      user.value = userData;
      currentComponent.value = 'UserPage';
    };

    return {
      currentComponent,
      user,
      handleLoginSuccess,
    };
  },
});
</script>

<style>
/* Ваши стили */
</style>
