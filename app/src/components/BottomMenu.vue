<template>
  <div class="bottomMenu">
    <div 
      class="menu-item" 
      @click="setActive('home')" 
      :class="{ active: activeButton === 'home' }"
    >
      <img src="../assets/icons/userIcon.svg" alt="User Icon" />
    </div>
    <div 
      class="menu-item" 
      @click="setActive('channels')" 
      :class="{ active: activeButton === 'channels' }"
    >
      <img src="../assets/icons/linkIcon.svg" alt="Link Icon" />
    </div>
    <div 
      class="menu-item" 
      @click="setActive('portfolio')" 
      :class="{ active: activeButton === 'portfolio' }"
    >
      <img src="../assets/icons/coinIcon.svg" alt="Coin Icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomMenu',
  props: {
    defaultActive: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      activeButton: this.defaultActive
    };
  },
  watch: {
    defaultActive(newVal) {
      this.activeButton = newVal;
    }
  },
  methods: {
    setActive(button) {
      this.activeButton = button;
      this.$emit('update:page', button);
    }
  }
};
</script>

<style scoped>
.bottomMenu {
  position: fixed;
  z-index: 10000;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  background-color: #eeeef2;
  /* padding: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  box-shadow: 0px 0px 15px 0px #00000026;
}

.menu-item {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 30px;
  background-color: transparent;
}

.menu-item.active {
  background-color: white;
}

.menu-item img {
  width: 50%;
  max-width: 44px;
}
</style>
