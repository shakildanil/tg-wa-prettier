<template>
    <div class="switcher">
        <div class="switcher__wrapper">
            <p
              v-for="tab in tabs"
              :key="tab"
              :class="{ active: activeTab === tab }"
              @click="setActiveTab(tab)"
            >
              {{ tab }}
            </p>
        </div>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  
  export default {
    name: 'SwitcherComponent',
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    setup(props, { emit }) {
      const activeTab = ref(props.tabs[0]);
  
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
    margin-bottom: 20px;
    width: 100%;
  }

  .switcher__wrapper {
    display: flex;
    justify-content: center;
    background-color: #EEEEF2;
    border-radius: 30px;
  }
  
  .switcher p {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    color: #94979E;
    font-size: 14px;
    line-height: 22px;
  }
  
  .switcher p.active {
    color: #000;
    font-weight: 500;
    line-height: 22px;
    font-size: 14px;
  }
</style>