<template>
  <div id="app">
    <TelegramLogin />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TelegramLogin from './components/TelegramLogin.vue';

export default defineComponent({
  name: 'App',
  components: {
    TelegramLogin,
  },
});
</script>

<style>
/* Ваши стили */
</style>


<!-- <template>
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
        // Изменение текста кнопки и добавление обработчика клика для авторизованного пользователя
        // tg.MainButton.setText('ClickMe');
        tg.MainButton.hide();
        // tg.MainButton.onClick(() => {
        //   alert('Clicked');
        // });
      } else {
        tg.MainButton.setText('Войти через Telegram');
        tg.MainButton.show();
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
</style> -->
