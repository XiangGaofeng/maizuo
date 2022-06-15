<template>
  <div>
<van-nav-bar title="影院" ref="navbar" @click-left="handleLeft" @click-right="handleRight">
     <template #left>
        {{$store.state.cityName}}<van-icon name="arrow-down" />
      </template>
      <template #right>
        <van-icon name="search" size="28" color="black"/>
      </template>
    </van-nav-bar>

    <div
      class="box"
      :style="{
        height: height,
      }"
    >
      <ul>
        <li v-for="data in $store.state.cinemaList" :key="data.cinemaId">
          <div class="left">
            <div class="cinema_name">{{ data.name }}</div>
            <div class="cinema_text">{{ data.address }}</div>
          </div>

          <div class="right cinema_name">
            <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      cinemaList: [],
      height: '0px'
    }
  },
  mounted () {
    // console.log(this.$refs.navbar.$el.offsetHeight)
    // 动态结算高度
    this.height =
      document.documentElement.clientHeight -
      this.$refs.navbar.$el.offsetHeight -
      document.querySelector('footer').offsetHeight +
      'px'

    if (this.$store.state.cinemaList.length === 0) { // 避免每次进入路由都要请求数据
      this.$store.dispatch('CinemaData', this.$store.state.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  },
  methods: {
    handleLeft () {
      // console.log('left')
      this.$router.push('/city')
      console.log('1')
      this.$store.commit('cleanCinemaList')
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  padding: 0.8rem;

  display: flex;
  justify-content: space-between;
  .left {
    width: calc(100% - 2.5rem);
    padding-right: 15px;
  }
  .cinema_name {
    font-size: 15px;
  }
  .cinema_text {
    color: #797d82;
    font-size: 12px;
    margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
  }
  .right_cinema_name{
    width: 1.5rem;
    text-align: center;
    float: right;
    margin-right: -5px;
    font-size: .3rem
  }
}
</style>
