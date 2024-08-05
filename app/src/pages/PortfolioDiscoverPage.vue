<template>
  <div class="portfolio-discover-page">
    <SwitcherComponent
      :tabs="['Portfolio', 'Discover']"
      :activeTab="activeTab"
      @tabChanged="handleTabChange"
    />
    <div v-if="activeTab === 'Portfolio'" class="center-content">
      <p class="message">
        You don't have any opened positions.
        <a @click="switchToDiscover">Buy some channels first.</a>
      </p>
    </div>
    <div v-if="activeTab === 'Discover'" class="discover-content">
      <RecentlyPublished />
    </div>
  </div>
</template>

<script>
import SwitcherComponent from "../components/SwitcherComponent.vue";
import RecentlyPublished from "../components/legacy/RecentlyPublished.vue";

export default {
  name: "PortfolioDiscoverPage",
  components: {
    SwitcherComponent,
    RecentlyPublished,
  },
  data() {
    return {
      activeTab: 'Portfolio',
    };
  },
  methods: {
    handleTabChange(tab) {
      this.activeTab = tab;
    },
    switchToDiscover() {
      this.activeTab = 'Discover';
    },
  },
};
</script>

<style scoped>
.portfolio-discover-page {
  background: #F9F8FA;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.message {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  text-align: center;
}

.message a {
  font-weight: 500;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.message a:hover {
  text-decoration: underline;
}

.discover-content {
  width: 100%;
  box-sizing: border-box;
}
</style>
