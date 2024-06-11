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
          const telegramLoginUrl = "https://oauth.telegram.org/auth?bot_id=your_bot_id&origin=https://yourdomain.com";
          window.location.href = telegramLoginUrl;
        });
      });
  
      return {};
    },
  });
  </script>
  
  <style scoped>
  /* Дополнительные стили, если нужны */
  </style>
  