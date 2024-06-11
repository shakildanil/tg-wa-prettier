<template>
    <div>
      <h1>Вы авторизованы</h1>
      <p>ID: {{ user.id }}</p>
      <p>Имя: {{ user.first_name }}</p>
      <p>Фамилия: {{ user.last_name }}</p>
      <p>Username: {{ user.username }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'UserPage',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    setup() {
      const tg = window.Telegram.WebApp;
  
      // Изменение текста кнопки и добавление обработчика клика для страницы пользователя
      tg.MainButton.setText('ClickMe');
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        alert('Clicked');
      });
  
      return {};
    }
  });
  </script>
  
  <style scoped>
  /* Дополнительные стили, если нужны */
  </style>
  