<template>
    <div class="container">
        <h1>Recently published</h1>
        <div class="published__list">
            <div class="published__list_item" v-for="item in latestItems" :key="item.id">
                <img :src="item.image" :alt="item.name">
                <p>{{ item.name }}</p>
              </div>
        </div>
    </div>
</template>

<script>
    import { ref, computed  } from 'vue';
    
    export default {
        name: 'RecentlyPublished',
        
        setup() {
            const items = ref([
            { id: 1, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 2, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 3, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 4, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 5, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 6, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 7, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 8, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 9, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 10, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            ]);

            const latestItems = computed(() => items.value.slice(-4));

            return {
                latestItems,
            }
        }
    }

</script>

<style>
    h1 {
        width: 100%;
        font-family: 'Montserrat';
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
    }

    .published__list {
        width: 100%;
        font-family: 'Montserrat';
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }

    .published__list_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .published__list_item img {
        width: 100%;
        max-width: 40px;
    }
</style>