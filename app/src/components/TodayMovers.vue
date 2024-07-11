<template>
    <div class="container">
        <div class="heading">
            <h1 class="heading__title">Today’s top movers</h1>
            <p class="heading__link" @click="toggleContent">{{ isExpanded ? 'See less' : 'See all' }}</p>
        </div>
        <SwitcherComponent :tabs="['Top gainers', 'Top losers']"  @tabChanged="handleTabChange" />
        <div class="movers" v-if="activeTab === 'Top gainers'">
            <div class="movers__list" >
                <div class="movers__list_item" v-for="item in firstEightGreen" :key="item.id">
                    <img :src="item.image" :alt="item.name">
                    <p>{{ item.name }}</p>
                    <p v-html="item.percent" class="green"></p>
                </div>
            </div>
            <div class="movers__list movers__listContent" :class="{ expanded: isExpanded }">
                <div class="movers__list_item" v-for="item in restItemsGreen" :key="item.id">
                    <img :src="item.image" :alt="item.name">
                    <p>{{ item.name }}</p>
                    <p v-html="item.percent" class="green"></p>
                </div>
            </div>
        </div>
        <div class="movers" v-if="activeTab === 'Top losers'">
            <div class="movers__list">
                <div class="movers__list_item" v-for="item in firstEightRed" :key="item.id">
                    <img :src="item.image" :alt="item.name">
                    <p>{{ item.name }}</p>
                    <p v-html="item.percent" class="red"></p>
                </div>
            </div>
            <div class="movers__list movers__listContent" :class="{ expanded: isExpanded }">
                <div class="movers__list_item" v-for="item in restItemsRed" :key="item.id">
                    <img :src="item.image" :alt="item.name">
                    <p>{{ item.name }}</p>
                    <p v-html="item.percent" class="red"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, computed } from 'vue';
    import SwitcherComponent from './SwitcherComponent.vue'

    export default {
        name: 'TodayMovers',
        components: {
            SwitcherComponent,
        },

        setup() {
            const activeTab = ref('Top gainers');

            const handleTabChange = (tab) => {
                activeTab.value = tab;  
            };
            const isExpanded = ref(false);

            const toggleContent = () => {
                isExpanded.value = !isExpanded.value;

            };

            const items = ref([
                { id: 1, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%`},
                { id: 2, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 3, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 4, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 5, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 6, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 7, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 8, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 9, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 10, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 11, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 12, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 13, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 14, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 15, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 16, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 17, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 18, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 19, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 20, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 21, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 22, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
                { id: 23, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'red', percent: `<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7715 0.494332C11.5784 0.494332 12.053 1.40064 11.5935 2.06385L7.09615 8.55495C6.70196 9.12387 5.86293 9.12996 5.46053 8.56682L0.822283 2.07572C0.349355 1.41387 0.822459 0.494335 1.63591 0.494336H6.28677L10.7715 0.494332Z" fill="#D93F5B"/>
                        </svg> 20.13%` },
                { id: 24, name: 'name', image: './src/assets/img/Ellipse 1.svg', flag: 'green', percent: `<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.70172 9.22882C0.894894 9.22882 0.42024 8.32251 0.879741 7.65931L5.37712 1.1682C5.7713 0.599279 6.61034 0.593189 7.01273 1.15633L11.651 7.64743C12.1239 8.30928 11.6508 9.22882 10.8374 9.22882H6.18649L1.70172 9.22882Z" fill="#00BA89"/>
                        </svg> 20.13%` },
            ]);

            const greenItems = computed(() => items.value.filter(item => item.flag === 'green'));
            const firstEightGreen = computed(() => greenItems.value.slice(0, 8));
            const restItemsGreen = computed(() => greenItems.value.slice(8));

            const redItems = computed(() => items.value.filter(item => item.flag === 'red'));
            const firstEightRed = computed(() => redItems.value.slice(0, 8));
            const restItemsRed = computed(() => redItems.value.slice(8));

            return {
                activeTab,
                handleTabChange,
                isExpanded,
                toggleContent,
                firstEightGreen,
                restItemsGreen,
                firstEightRed,
                restItemsRed
            };
        },
    }
</script>

<style scoped>

    .heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
    }

    .heading__title {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
    }

    .heading__link {
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #94979E;
        text-wrap: nowrap;
    }

    .movers__list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        row-gap: 20px;
        margin-bottom: 20px;
    }

    .movers__list_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .movers__list_item p.green {
        color: #00BA89;
        font-weight: 500;
    }

    .movers__list_item p.red {
        color: #D93F5B;
    }

    .movers__listContent {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out;
    }
      
    .movers__listContent.expanded {
        max-height: 100vh;
        overflow: auto;
    }
</style>