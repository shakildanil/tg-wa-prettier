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
  <root />
</template>

<script setup lang="ts">
import './styles.scss';

import { Root } from '@tok/generation';
</script> -->
