<template>
    <div>
        <film-swiper :key="datalist.length">
            <film-swiper-item v-for="data in datalist" :key="data.id" class="filmswiperitem">
                <img :src="data.imgUrl"/>
            </film-swiper-item>
        </film-swiper>
        <film-header class="sticky"></film-header>
        <router-view></router-view>
    </div>
</template>
<script>
// webpack
import filmSwiper from '@/mycomponents/films/FilmSwiper'
import filmHeader from '@/mycomponents/films/FilmHeader'
import filmSwiperItem from '@/mycomponents/films/FilmSwiperItem'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('/banner.json').then(res => {
      console.log(res.data)
      this.datalist = res.data.banner
    })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>

<style lang="scss" scoped>
.filmswiperitem{
    img{
        width: 100%;
    }
}
.sticky{
    position: sticky;
    top:0px;
    background:white;
    z-index: 100;
}
</style>
