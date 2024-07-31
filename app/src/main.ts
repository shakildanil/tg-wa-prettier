import { createApp } from 'vue'
// import './style.css'
import App from './App.vue';

import { initializeAppStorage } from './scripts/storage';

initializeAppStorage();

createApp(App).mount('#app')
// 