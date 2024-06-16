<template>
  <div>
    <!-- Telegram login будет осуществляться через MainButton -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'TelegramLogin',
  setup() {
    onMounted(() => {
      const tg = window.Telegram.WebApp;

      tg.ready();

      tg.MainButton.setText('Войти через Telegram');
      tg.MainButton.show();

      tg.MainButton.onClick(() => {
        const botId = '7293138530'; // Замените на ваш bot_id
        const origin = window.location.origin;
        const telegramLoginUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}`;

        tg.MainButton.setText('Авторизация...');
        tg.MainButton.offClick();
        tg.MainButton.hide();

        // Перенаправление пользователя
        window.location.href = telegramLoginUrl;
      });

      // Проверка данных пользователя после возвращения с авторизации
      const user = tg.initDataUnsafe.user;
      if (user) {
        localStorage.setItem('telegramUser', JSON.stringify(user));
        alert(user);
        window.location.reload(); // Перезагрузка страницы для отображения UserPage
      }
    });

    return {};
  },
});
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>
