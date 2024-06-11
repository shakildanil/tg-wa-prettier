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

            // tg.MainButton.onClick(() => {
            //     const telegramLoginUrl = "https://oauth.telegram.org/auth?bot_id=7293138530&origin=https://yourdomain.com";
            //     window.location.href = telegramLoginUrl;
            // });

            tg.MainButton.onClick(() => {
                const botId = '7293138530'; // Замените на ваш bot_id
                const origin = window.location.origin;
                const telegramLoginUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}`;
                window.location.href = telegramLoginUrl;

                // Изменяем текст кнопки
                tg.MainButton.setText('Авторизация...');
                tg.MainButton.offClick();

                // Либо скрыть кнопку
                // tg.MainButton.hide();

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