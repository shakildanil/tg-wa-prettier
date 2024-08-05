//LinkInput.vue

<template>
  <div :class="['link-input-container', { checking: isChecking }]">
    <input
      type="text"
      :readonly="isChecking"
      v-model="inputValue"
      :class="['link-input-field', { checking: isChecking }]"
      placeholder="Вставьте ссылку"
      @input="checkInputValue"
    />
    <button 
      :class="['link-input-button', { checking: isChecking }]" 
      @click="handleButtonClick" 
      :disabled="isButtonDisabled"
    >
      <span v-if="!isChecking">Проверить</span>
      <span v-if="isChecking" class="checking-container">
        Проверка 
        <!-- ИКОНКУ УБРАЛ ТАК КАК ОНА НЕ ДЕПЛОИЛАСЬ ПО КАКОЙ ТО ПРИЧИНЕ -->
        <!-- <IconParkLoadingOne class="link-button-spinner" /> -->
      </span>
    </button>
    <CheckLinkModal v-if="showModal" @close="showModal = false" @confirm="cancelCheck" />
  </div>
</template>

<script>
// import { LoadingOne } from '@icon-park/vue-next';
import CheckLinkModal from './CheckLinkModal.vue';

export default {
  name: "LinkInput",
  components: {
    // IconParkLoadingOne: LoadingOne,
    CheckLinkModal
  },
  data() {
    return {
      inputValue: "",
      isChecking: false,
      isButtonDisabled: true,
      showModal: false 
    };
  },
  methods: {
    handleButtonClick() {
      if (!this.isButtonDisabled && !this.isChecking) {
        this.isChecking = true;
      } else if (this.isChecking) {
        this.showModal = true; 
      }
    },
    checkInputValue() {
      this.isButtonDisabled = this.inputValue.trim() === "";
    },
    cancelCheck() {
      this.isChecking = false;
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.link-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #eeeeF2;
  border-radius: 12px;
  position: relative;
}

.link-input-container.checking {
  background: #4C7BF4;
}

.link-input-field {
  flex: 1;
  height: 40px;
  background: #eeeeF2;
  border: none;
  border-radius: 12px;
  padding: 4px 12px;
  margin-left: 6px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  outline: none;
  box-sizing: border-box;
}

.link-input-field.checking {
  background: #4C7BF4;
  color: white;
}

.link-input-field:read-only {
  cursor: not-allowed;
}


.link-input-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin: 6px;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  height: 40px; /* Фиксированная высота кнопки */
}

.link-input-button.checking {
  background: #638EFE;
  color: white;
}

.link-input-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.checking-container {
  display: inline-flex;
  align-items: center;
}

.link-button-spinner {
  margin-left: 8px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
