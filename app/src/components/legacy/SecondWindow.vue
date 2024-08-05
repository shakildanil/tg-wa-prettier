<template>
  <div class="container">
    <SwitcherComponent :tabs="['Portfolio', 'Discover']" @tabChanged="handleTabChange" />
    <div v-if="activeTab === 'Portfolio'">
      <ChannelSelect
        v-for="channel in publishedChannels"
        :key="channel.channel_id"
        :title="channel.title"
        :link="channel.link"
        :profilePhotoUrl="channel.profilePhoto ? channel.profilePhoto[0].url : ''"
        :ev="channel.EV || 'N/A'"
        :members="channel.members || 'N/A'"
        :channelId="channel.channel_id"
        :sector="channel.sector"
        :isPublished="channel.isPublished"
      />
    </div>
    <DiscoverComponent v-if="activeTab === 'Discover'" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import SwitcherComponent from './SwitcherComponent.vue';
import ChannelSelect from './ChannelSelect.vue';
import DiscoverComponent from './DiscoverComponent.vue';
import { getPublishedChannels } from '../scripts/channels';

export default {
  name: 'SecondWindow',
  components: {
    SwitcherComponent,
    ChannelSelect,
    DiscoverComponent
  },

  setup() {
    const activeTab = ref('Portfolio');
    const publishedChannels = ref([]);

    const handleTabChange = (tab) => {
      activeTab.value = tab;
    };

    onMounted(async () => {
      const localStorageKey = 'publishedChannels';

      const cachedChannels = localStorage.getItem(localStorageKey);
      if (cachedChannels) {
        publishedChannels.value = JSON.parse(cachedChannels);
        console.log("Loaded published channels from local storage:", publishedChannels.value);
      } else {
        try {
          const channels = await getPublishedChannels();
          publishedChannels.value = channels;
          localStorage.setItem(localStorageKey, JSON.stringify(channels));
        } catch (error) {
          console.error("Failed to fetch published channels:", error);
        }
      }
    });

    return {
      activeTab,
      publishedChannels,
      handleTabChange
    };
  },
}
</script>
