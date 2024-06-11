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
          const script = document.createElement('script');
          script.async = true;
          script.src = "https://telegram.org/js/telegram-widget.js?22";
          script.setAttribute('data-telegram-login', 'channelstech_dev_bot');
          script.setAttribute('data-size', 'medium');
          script.setAttribute('data-onauth', 'onTelegramAuth(user)');
          document.body.appendChild(script);
        });
        
        (window as any).onTelegramAuth = (user: any) => {
          alert(`Logged in as ${user.first_name} ${user.last_name} (${user.id}${user.username ? ', @' + user.username : ''})`);
        };
      });
  
      return {};
    },
  });
  </script>
  
  <style scoped>
  /* Дополнительные стили, если нужны */
  </style>
  