<template>
  <div class="order-panel">
    <div class="header">
      <img :src="profilePhotoUrl" alt="Avatar" class="avatar">
      <div class="channel-info">
        <h3>{{ title }}</h3>
        <span :class="evChangeClass">{{ ev }}%</span>
      </div>
    </div>
    <div class="available">
      <span>Available</span>
      <span>{{ members }} USDT</span>
    </div>
    <div class="order-type">
      <select v-model="selectedOrderType">
        <option value="market">Market</option>
        <option value="limit">Limit</option>
        <option value="stop">Stop</option>
      </select>
    </div>
    <div class="order-value">
      <input type="text" v-model="orderValue" placeholder="Order value" />
    </div>
    <div class="order-slider">
      <div class="slider-marks">
        <span v-for="(mark, index) in marks" :key="index" class="slider-mark" :style="{ left: `${mark}%` }"></span>
      </div>
      <input type="range" v-model="orderPercentage" min="0" max="100" step="1" @input="handleSliderInput" />
    </div>
    <button class="order-button" @click="placeOrder">Buy</button>
  </div>
</template>

<script>
export default {
  name: 'OrderPanel',
  props: {
    title: String,
    link: String,
    profilePhotoUrl: String,
    ev: {
      type: String,
      default: 'N/A'
    },
    members: {
      type: String,
      default: 'N/A'
    },
    channelId: String
  },
  data() {
    return {
      selectedOrderType: 'market',
      orderValue: '',
      orderPercentage: 0,
      marks: [0, 25, 50, 75, 100],
      magneticRange: 2 // Зона притягивания в процентах
    };
  },
  computed: {
    evChangeClass() {
      if (typeof this.ev === 'string' && this.ev.startsWith('-')) {
        return 'ev-decrease';
      }
      return 'ev-increase';
    }
  },
  methods: {
    handleSliderInput(event) {
      let value = event.target.value;
      this.orderPercentage = this.getMagneticValue(value);
    },
    getMagneticValue(value) {
      const { marks, magneticRange } = this;
      for (let mark of marks) {
        if (Math.abs(value - mark) <= magneticRange) {
          return mark;
        }
      }
      return value;
    },
    placeOrder() {
      // Логика размещения ордера
      console.log(`Placing order for ${this.orderValue} ${this.selectedOrderType}`);
    }
  }
};
</script>

<style scoped>
.order-panel {
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.channel-info {
  flex: 1;
}

.channel-info h3 {
  margin: 0;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.ev-increase {
  color: #00C853;
}

.ev-decrease {
  color: #D32F2F;
}

.available {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  color: #888;
}

.order-type, .order-value {
  width: 100%;
  margin-bottom: 16px;
}

.order-type select, .order-value input {
  width: 100%;
  padding: 0px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #EEEEF2;
  color: #171618;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left; /* Выравнивание текста по левому краю */
  box-sizing: border-box;
  height: 40px;
}

.order-slider {
  width: 100%;
  margin-bottom: 16px;
  position: relative;
}

.slider-marks {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.slider-mark {
  width: 10px;
  height: 10px;
  background: #C4C4C4;
  border-radius: 50%;
  transform: translateX(-50%);
}

.order-slider input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  z-index: 1;
}

.order-slider input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background: #eeeeef;
  border-radius: 4px;
}

.order-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #4C7BF4;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -8px; /* Центрирование thumb */
}

.order-slider input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #4C7BF4;
  border-radius: 50%;
  cursor: pointer;
}

.order-slider input[type="range"]::-ms-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border: 2px solid #4C7BF4;
  border-radius: 50%;
  cursor: pointer;
}

.order-button {
  width: 100%;
  height: 40px;
  background: #4C7BF4;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0px 12px;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  opacity: 1; /* Убедитесь, что opacity не установлен на 0 */
}

.order-button:hover {
  background: #3A5BBF;
}
</style>
