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

      // Очистка localStorage при загрузке компонента, чтобы сбросить авторизацию
      localStorage.removeItem('telegramUser');

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
      const authDate = tg.initDataUnsafe.auth_date;
      const hash = tg.initDataUnsafe.hash;
      
      if (user && authDate && hash) {
        const authData = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          auth_date: authDate,
          hash: hash
        };
        localStorage.setItem('telegramUser', JSON.stringify(authData));
        console.log('TelegramLogin HASH:' + authData.hash)
        console.log('TelegramLogin auth_date:' + authData.auth_date)
        console.log('TelegramLogin id:' + authData.id)
        // window.location.reload(); // Перезагрузка страницы для отображения UserPage
      }
    });

    return {};
  },
});
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>
