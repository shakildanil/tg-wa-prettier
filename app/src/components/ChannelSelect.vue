<template>
  <div class="channel-select" >
    <div class="channel-header">
      <img src="../assets/img/spongebob_poster.webp" alt="Avatar" class="avatar">
      <h3>Павел Дуров | @durov_russia</h3>
      <span class="icon-container" @click.stop="toggleOpen">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ open: isOpen }">
          <path d="M6 9L12 15L18 9" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <transition name="slide-fade">
      <div v-if="isOpen" class="channel-content">
        <div class="content-row">
          <p>EV 10</p>
          <p class="subscribers">11,19 млн. подп.</p>
        </div>
        <button class="publish-button">Опубликовать</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "ChannelSelect",
  setup() {
    const isOpen = ref(false);

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      toggleOpen,
    };
  },
  // data() {
  //   return {
  //     isOpen: false,
  //   };
  // },
  // methods: {
  //   toggleOpen() {
  //     this.isOpen = !this.isOpen;
  //   },
  // },
};
</script>

<style scoped>
.channel-select {
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden; /* Скрывает содержимое, когда карточка закрыта */
}

.channel-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.channel-header h3 {
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left; /* Выравнивание текста по левому краю */
  flex: 1;
  margin-left: 20px; /* Отступ между аватаром и заголовком */
}

.channel-content {
  padding: 16px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left; /* Выравнивание текста по левому краю */
}

.content-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.subscribers {
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  text-align: right;
  color: #94979E; /* Цвет текста для количества подписчиков */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover; /* Обеспечивает правильное отображение изображения внутри круга */
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* Устанавливаем фиксированную ширину для области иконки */
  height: 24px; /* Устанавливаем фиксированную высоту для области иконки */
  cursor: pointer;
}

.icon-container svg {
  transition: transform 0.3s ease;
}

.icon-container svg.open {
  transform: rotate(180deg);
}

.publish-button {
  width: 100%;
  background: #EEEEF2;
  border: none;
  border-radius: 12px;
  padding: 10px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
}

.publish-button:hover {
  background: #DADADA;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0 16px;
}
</style>
