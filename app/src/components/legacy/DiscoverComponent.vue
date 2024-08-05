<template>
    <RecentlyPublished />
    <TodayMovers />
    <CollectionsComponent />
    <BottomMenu />
</template>

<script>
    import RecentlyPublished from './RecentlyPublished.vue';
    import TodayMovers from './TodayMovers.vue'
    import CollectionsComponent from './CollectionsComponent.vue'
    import BottomMenu from './BottomMenu.vue'

    export default {
        name: 'DiscoverComponent',
        components: {
            RecentlyPublished,
            TodayMovers,
            CollectionsComponent,
            BottomMenu,
        }
    };
</script>