<template>
    <div class="container">
        <h2 class="title">Collections</h2>
        <swiper
            :slidesPerView="2"
            :spaceBetween="30"
            :grabCursor="true"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide class="slide">
                <img src="../assets/img/lightning.webp" alt="">
                <p class="slide__title">Name category</p>
                <p class="num__channels">88 channels</p>
            </swiper-slide>
            <swiper-slide class="slide">
                <img src="../assets/img/envelope.webp" alt="">
                <p class="slide__title">Name category</p>
                <p class="num__channels">256 channels</p>
            </swiper-slide>
            <swiper-slide class="slide">
                <img src="../assets/img/bulb.webp" alt="">
                <p class="slide__title">Name category</p>
                <p class="num__channels">256 channels</p>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default {
    name: 'CollectionsComponent',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style scoped>
    .title {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        padding-bottom: 10px;
    } 

    .slide {
        width: 150px !important;
        height: 150px !important;
        padding: 12px;
    }

    .slide img {
        height: 100%;
        max-height: 89px;
    }

    .slide__title {
        font-weight: 500;
        font-size: 14px;
    }

    .num__channels {
        color: #94979E;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
    }
</style>