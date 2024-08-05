<template>
  <div class="switcher">
    <button
      :class="{ active: activeTab === 'Not Published' }"
      @click="setActiveTab('Not Published')"
    >
      Not Published
    </button>
    <button
      :class="{ active: activeTab === 'Published' }"
      @click="setActiveTab('Published')"
    >
      Published
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SwitcherComponent',
  setup(props, { emit }) {
    const activeTab = ref('Not Published');

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      emit('tabChanged', tab);
    };

    return {
      activeTab,
      setActiveTab,
    };
  },
};
</script>

<style scoped>
.switcher {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.switcher button {
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  background: #94979E;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  border-radius: 30px;
  transition: background-color 0.3s, color 0.3s;
}

.switcher button.active {
  background-color: white;
  color: #000;
}
</style>
