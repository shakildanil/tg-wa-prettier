<template>
    <div class="container">
        <SwitcherComponent :tabs="['Portfolio', 'Discover']"  @tabChanged="handleTabChange" />
    </div>  
    <ChannelSelect v-if="activeTab === 'Portfolio'" />
    <DiscoverComponent v-if="activeTab === 'Discover'" />
</template>

<script>
    import { ref } from 'vue';
    import SwitcherComponent from './SwitcherComponent.vue'
    import ChannelSelect from './ChannelSelect.vue'
    import DiscoverComponent from './DiscoverComponent.vue'

    export default {
        name: 'SecondWindow',
        components: {
            SwitcherComponent,
            ChannelSelect,
            DiscoverComponent
        },

        setup(){
            const activeTab = ref('Portfolio');

            const handleTabChange = (tab) => {
                activeTab.value = tab;  
            };

            return {
                activeTab,
                handleTabChange
            };
        },
    }
</script>