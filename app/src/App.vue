<template>
  <div id="app">
    <h1>Telegram Login</h1>
    <div id="telegram-login"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Добавляем виджет Telegram
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute('data-telegram-login', 'channelstech_dev_bot');
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login').appendChild(script);
    
    // Определение функции обратного вызова
    window.onTelegramAuth = function(user) {
      console.log('Logged in as', user.first_name, user.last_name, `(${user.id}${user.username ? ', @' + user.username : ''})`);
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


<!-- <template>
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
</style> -->
