<template>
    <div class="container">
        <h1>Recently published</h1>
        <!-- <div class="published__list"> -->
        <swiper
            :grabCursor="true"
            :slidesPerView="'auto'"
            :mousewheel="true"
            :modules="modules"
            class="mySwiper published__list"
        >
            <swiper-slide class="published__list_item slide" v-for="item in items" :key="item.id">
                <img :src="item.image" :alt="item.name">
                <p>{{ item.name }}</p>
            </swiper-slide>
        </swiper>

        <!-- </div> -->
    </div>
</template>

<script>
    import { ref, computed  } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';

    import 'swiper/css';

    import { Mousewheel } from 'swiper/modules';

    export default {
        name: 'RecentlyPublished',
        components: {
            Swiper,
            SwiperSlide,
        },
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
            { id: 11, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 12, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 13, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 14, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 15, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 16, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 17, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 18, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 19, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            { id: 20, name: 'name', image: './src/assets/img/Ellipse 1.svg' },
            ]);

            // const latestItems = computed(() => items.value.slice(-4));

            return {
                items,
                // latestItems,
                modules: [Mousewheel,],
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
        margin-bottom: 10px;
    }

    .published__list {
        width: 100%;
        font-family: 'Montserrat';
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        background: #ffffff;
        border-radius: 12px;
    }

    .published__list_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .item-container img {
        width: 100%;
        max-width: 40px;
    }

    .mySwiper {
        max-width: 100%;
        min-width: 0;
    }

    .swiper-wrapper {
        max-width: fit-content;
    }

    .slide {
        width: fit-content !important;
        height: fit-content !important;
        padding: 12px;
    }

    .slide img {
        height: 100%;
        max-height: 50px;
    }

    .slide__title {
        font-weight: 500;
        font-size: 14px;
    }
</style>
