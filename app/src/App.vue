<template>
  <div id="app">
    <UserPage v-if="user" :user="user" />
    <TelegramLogin v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TelegramLogin from './components/TelegramLogin.vue';
import UserPage from './components/UserPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    TelegramLogin,
    UserPage
  },
  setup() {
    const user = ref<TelegramWebAppUser | null>(null);

    onMounted(() => {
      const tg = window.Telegram.WebApp;

      // Проверка авторизации
      if (tg.initDataUnsafe.user) {
        user.value = tg.initDataUnsafe.user;
      }
    });

    return {
      user
    };
  },
});
</script>

<style>
/* Ваши стили */
</style>




<!-- <template>
  <root />
</template>

<script setup lang="ts">
import './styles.scss';

import { Root } from '@tok/generation';
</script> -->
