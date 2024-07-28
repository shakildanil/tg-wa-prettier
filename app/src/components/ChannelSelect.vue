<template>
  <div class="channel-select">
    <div class="channel-header">
      <img :src="profilePhotoUrl || '../assets/img/spongebob_poster.webp'" alt="Avatar" class="avatar">
      <h3 class="channel-title">{{ title }}</h3>
      <span class="ev-value">EV: {{ typeof currentEV === 'number' ? currentEV.toFixed(2) : 'N/A' }}</span>
      <span class="icon-container" @click.stop="toggleOpen">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ open: isOpen }">
          <path d="M6 9L12 15L18 9" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <transition name="slide-fade">
      <div v-if="isOpen" class="channel-content">
        <div class="content-row">
          <p>{{ link }}</p>
          <p class="subscribers">{{ formatMembers(members) }}</p>
        </div>
        <div class="select-container">
          <div class="select-header" @click="toggleSelect" :class="{ placeholder: !selectedSector }">
            <p :class="{ active: selectedSector || sector }">
              {{ selectedSector ? sectors[selectedSector].ru_transcr : (sector ? sectors[sector].ru_transcr : 'Выбрать категорию') }}
            </p>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ open: isSelectOpen }">
              <path d="M6 9L12 15L18 9" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <transition name="slide-fade">
            <div v-if="isSelectOpen" class="options-container">
              <div v-for="(sector, key) in sectors" :key="key" @click="selectSector(key)" class="option-item" :class="{ selected: selectedSector === key }">
                {{ sector.ru_transcr }}
              </div>
            </div>
          </transition>
        </div>
        <button :disabled="!selectedSector" class="publish-button">Опубликовать</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { sectors } from '../scripts/sectors';
import { updateChannelDataEV } from '../scripts/channels';

export default {
  name: "ChannelSelect",
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    profilePhotoUrl: {
      type: String,
      required: false,
      default: '../assets/img/spongebob_poster.webp'
    },
    ev: {
      type: [String, Number],
      required: false,
      default: 'N/A'
    },
    members: {
      type: [String, Number],
      required: false,
      default: 'N/A'
    },
    channelId: {
      type: String,
      required: true
    },
    sector: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props) {
    const isOpen = ref(false);
    const isSelectOpen = ref(false);
    const selectedSector = ref(props.sector || ""); // Используем сектор из пропсов или пустое значение
    const sectorsData = reactive(sectors);
    const currentEV = ref(parseFloat(props.ev) || 'N/A');

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const toggleSelect = () => {
      isSelectOpen.value = !isSelectOpen.value;
    };

    const selectSector = async (key) => {
      selectedSector.value = key;
      isSelectOpen.value = false;

      try {
        const newEv = await updateChannelDataEV(props.channelId, props.link, key);
        console.log(`Updated channel ${props.channelId} with sector ${key} and new EV: ${newEv}`);
        currentEV.value = newEv;
      } catch (error) {
        console.error("Error updating channel data:", error);
      }
    };

    const formatMembers = (members) => {
      if (members < 10000) {
        return `${members} подп.`;
      } else if (members >= 10000 && members < 1000000) {
        return `${(members / 1000).toFixed(1)} тыс. подп.`;
      } else {
        return `${(members / 1000000).toFixed(1)} млн. подп.`;
      }
    };

    return {
      isOpen,
      toggleOpen,
      selectedSector,
      sectors: sectorsData,
      isSelectOpen,
      toggleSelect,
      selectSector,
      formatMembers,
      currentEV
    };
  }
};
</script>

<style scoped>
.channel-select {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
}

.channel-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.channel-title {
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  flex: 1;
  margin-left: 20px;
}

.ev-value {
  color: #94979e;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  font-weight: 500;
  margin-left: 10px;
}

.channel-content {
  padding: 16px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
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
  color: #94979e;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-container svg,
.select-header svg {
  transition: transform 0.3s ease;
}

.icon-container svg.open,
.select-header svg.open {
  transform: rotate(180deg);
}

.select-container {
  width: 100%;
  background: #f7f7f7;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  background: #eeeeef;
  border-radius: 12px;
}

.select-header.placeholder p {
  color: #c4c4c4;
}

.options-container {
  background: #f7f7f7;
  padding: 12px;
  border-radius: 12px;
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
}

.option-item:hover,
.option-item.selected {
  background: #e0e0e0;
}

.publish-button {
  width: 100%;
  background: #eeeef2;
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

.publish-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.publish-button:hover:enabled {
  background: #dadada;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0 16px;
}
</style>
