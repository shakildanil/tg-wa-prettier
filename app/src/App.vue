<template>
  <div id="app">
    <h1>Telegram Login</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

interface TelegramWebAppUser {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
}

interface TelegramAuthData extends TelegramWebAppUser {
  auth_date: string;
  hash: string;
}

interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
  auth_date?: string;
  hash?: string;
}

interface TelegramWebApp {
  initDataUnsafe: TelegramWebAppInitData;
  MainButton: TelegramWebAppMainButton;
  ready(): void;
}

interface TelegramWebAppMainButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(callback: () => void): void;
  offClick(): void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      const tg = window.Telegram.WebApp;

      tg.ready();

      tg.MainButton.setText('Войти через Telegram');
      tg.MainButton.show();

      tg.MainButton.onClick(() => {
        tg.MainButton.setText('Авторизация...');
        tg.MainButton.offClick();
        tg.MainButton.hide();

        // Проверка данных пользователя после возвращения с авторизации через initDataUnsafe
        const user = tg.initDataUnsafe.user;
        const authDate = tg.initDataUnsafe.auth_date;
        const hash = tg.initDataUnsafe.hash;

        if (user && authDate && hash) {
          const authData = {
            ...user,
            auth_date: authDate,
            hash: hash,
          };
          console.log('Logged in as', authData.first_name, authData.last_name, `(${authData.id}${authData.username ? ', @' + authData.username : ''})`, authData.hash);
        } else {
          console.error('User data not found in initDataUnsafe');
        }
      });
    });

    return {};
  },
});
</script>

<style scoped>
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
