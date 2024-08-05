<template>
  <div class="background">
    <div class="top-section">
        <StatisticsWidget />
        <div class="user-info">Иван Иванов | @ivanov</div>
    </div>
    
    <div class="info-block">
      <SwitcherComponent
        :tabs="['Not published', 'Published']"
        :activeTab="activeTab"
        @tabChanged="handleTabChange"
      />
      <div v-if="activeTab === 'Not published'">
        <div v-for="channelData in notPublishedChannels" :key="channelData.channel_id">
          <ChannelLong
            v-if="channelData && channelData.title"
            :title="channelData.title"
            :link="channelData.link"
            :profilePhotoUrl="channelData.profilePhoto ? channelData.profilePhoto[0].url : ''"
            :listing_value="channelData.listing_value || 'N/A'"
            :members="channelData.members || 'N/A'"
            :channelId="channelData.channel_id"
            :sector="channelData.sector"
            :isPublished="channelData.isPublished"
            :current_value="channelData.current_value"
            @update:isPublished="updatePublishedStatus(channelData.channel_id, true)"
          />
        </div>
      </div>
      <div v-if="activeTab === 'Published'">
        <div v-for="channelData in publishedChannels" :key="channelData.channel_id">
          <ChannelLong
            v-if="channelData && channelData.title"
            :title="channelData.title"
            :link="channelData.link"
            :profilePhotoUrl="channelData.profilePhoto ? channelData.profilePhoto[0].url : ''"
            :listing_value="channelData.listing_value || 'N/A'"
            :members="channelData.members || 'N/A'"
            :channelId="channelData.channel_id"
            :sector="channelData.sector"
            :isPublished="channelData.isPublished"
            :current_value="channelData.current_value"
            @update:isPublished="updatePublishedStatus(channelData.channel_id, true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelLong from "../components/ChannelLong.vue";
import SwitcherComponent from "../components/SwitcherComponent.vue";
import StatisticsWidget from "../components/StatisticsWidget.vue";
import { getUserChannels } from "../scripts/channels";

export default {
  name: "HomePage",
  components: {
    ChannelLong,
    SwitcherComponent,
    StatisticsWidget
  },
  data() {
    return {
      userChannels: [],
      activeTab: 'Not published',
    };
  },
  computed: {
    notPublishedChannels() {
      return this.userChannels.filter(channel => !channel.isPublished);
    },
    publishedChannels() {
      return this.userChannels.filter(channel => channel.isPublished);
    }
  },
  async created() {
    try {
      const tgID = "172136731";
      const localStorageKey = `userChannels_${tgID}`;

      // Попробовать получить данные из localStorage
      const cachedChannels = localStorage.getItem(localStorageKey);
      if (cachedChannels) {
        this.userChannels = JSON.parse(cachedChannels);
        console.log("Loaded channels from local storage:", this.userChannels);
      } else {
        // Если в localStorage нет данных, загрузить с сервера
        const userChannels = await getUserChannels(tgID);
        console.log("User channels:", userChannels);
        this.userChannels = userChannels;

        // Сохранить данные в localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(userChannels));
      }
    } catch (error) {
      console.error("Failed to fetch user channels:", error);
    }
  },
  methods: {
    handleTabChange(tab) {
      this.activeTab = tab;
    },
    updatePublishedStatus(channelId, status) {
      const index = this.userChannels.findIndex(channel => channel.channel_id === channelId);
      if (index !== -1) {
        this.userChannels[index].isPublished = status;
        const tgID = "172136731";
        const localStorageKey = `userChannels_${tgID}`;
        localStorage.setItem(localStorageKey, JSON.stringify(this.userChannels));
      }
    }
  }
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
}

.profilePic {
  background: url("../assets/img/durov.webp");
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.top-section {
  width: 100%;
  height: 50%;
  background-color: #6FA0FF;
}

.info-block {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background: #f9f8fa;
  border-radius: 20px 20px 0 0;
  padding: 0px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info {
  position: absolute;
  bottom: calc(70% + 20px);
  width: 60%;
  background: rgba(255, 255, 255, 0.5);
  padding: 4px 12px 4px 12px;
  gap: 10px;
  border-radius: 20px 20px 20px 20px;
  text-align: center;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>
