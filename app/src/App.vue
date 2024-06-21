<template>
  <div id="app">
    <h1>Telegram Login</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import axios from 'axios';
import * as CryptoJS from 'crypto';

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
    const botToken = '<your_bot_token>'; // Замените на ваш bot token

    onMounted(() => {
      const tg = window.Telegram.WebApp;

      tg.ready();

      tg.MainButton.setText('Войти через Telegram');
      tg.MainButton.show();

      tg.MainButton.onClick(async () => {
        tg.MainButton.setText('Авторизация...');
        tg.MainButton.offClick();
        tg.MainButton.hide();

        // Проверка данных пользователя после возвращения с авторизации через initDataUnsafe
        const user = tg.initDataUnsafe.user;
        const authDate = tg.initDataUnsafe.auth_date;
        const hash = tg.initDataUnsafe.hash;

        if (user && authDate && hash) {
          const authData: TelegramAuthData = {
            ...user,
            auth_date: authDate,
            hash: hash,
          };
          console.log('Logged in as', authData.first_name, authData.last_name, `(${authData.id}${authData.username ? ', @' + authData.username : ''})`, authData.hash);

          // Проверка авторизации
          const dataCheckString = `auth_date=${authData.auth_date}\nfirst_name=${authData.first_name}\nid=${authData.id}\n${authData.username ? `username=${authData.username}\n` : ''}`;
          const secretKey = CryptoJS.SHA256(botToken).toString(CryptoJS.enc.Hex);
          const computedHash = CryptoJS.HmacSHA256(dataCheckString, secretKey).toString(CryptoJS.enc.Hex);

          if (computedHash === authData.hash) {
            console.log('Data is from Telegram');
            try {
              // Отправка данных авторизации на сервер
              await axios.post('https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com/auth', authData);

              // Проверка данных авторизации
              const validateResponse = await axios.get('https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com/validate');
              if (validateResponse.data !== 'User authorized') {
                throw new Error('User not authorized');
              }

              // Получение списка групп
              const response = await axios.get('https://nameless-ravine-59157-5e1fd469c57a.herokuapp.com/groups');
              console.log('Groups:', response.data);
            } catch (error) {
              console.error('Error during authorization process:', error);
            }
          } else {
            console.error('Data is not from Telegram');
          }
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
