<template>
  <div v-if="filmInfo">
    <detail-header v-scroll="50">
  <div class="filmheader">{{ filmInfo.name }}</div>
    </detail-header>
    <!-- <img :src="filmInfo.poster"/> -->
    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div>
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">
          {{ filmInfo.premiereAt | dateFilter }}上映
        </div>
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div
          class="detail-text"
          style="height:180px;line-height: 20px "
          :class="isHidden ? 'hidden' : ''"
        >
          {{ filmInfo.synopsis }}
        </div>

        <div style="text-align: center">
          <i
            class="iconfont"
            @click="isHidden = !isHidden"
            :class="isHidden ? 'icon-moreunfold' : 'icon-less'"
          ></i>
        </div>
      </div>
      <!-- 演职人员 -->
      <div>
        <div >演职人员</div>
        <detail-swiper :perview="3.5" name="actors">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.actors"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data.avatarAddress + ')',
              }"
              class="avatar"
            ></div>
            <div style="text-align: center; font-size: 12px">
              {{ data.name }}
            </div>
            <div style="text-align: center; font-size: 13px">
              {{ data.role }}
            </div>
          </detail-swiper-item>
        </detail-swiper>
      </div>

      <!-- 剧照 -->
      <div>
        <div>剧照</div>
        <detail-swiper :perview="2" name="photos">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.photos"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data + ')',
              }"
              class="avatar"
              @click="handleImagePreview(index) "
            ></div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/util/http'
import moment from 'moment'
import Vue from 'vue'
import detailHeader from '@/mycomponents/detail/DetailHeader'
import detailSwiper from '@/mycomponents/detail/DetailSwiper'
import detailSwiperItem from '@/mycomponents/detail/DetailSwiperItem'
import { ImagePreview, Toast } from 'vant'
import obj from '../util/mixinobj'
moment.locale('zh-cn') // 设置成中文
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.directive('scroll', {
  inserted (el, binding) {
    // console.log()
    el.style.display = 'none'

    window.onscroll = () => {
      // console.log('scroll')
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁执行的
  unbind () {
    window.onscroll = null
  }
})

export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handleImagePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        showIndicators: true
      })
    }
  },
  created () {
    // 当前匹配的路由
    console.log('created', this.$route.params.id)
    // axios 利用 id 发请求到详情接口 ，获取详细数据 ，布局页面

    // eslint-disable-next-line no-unused-expressions
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=5501344`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }
}
</script>
<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 8rem;
  background-position: center;
  background-size: cover;
}
.content {
  padding: .625rem;
  font-size: .5rem;
  .detail-text {
    color: #797d82;
    font-size: .4rem;
    margin-top: 0.222222rem;
    line-height: normal;
  }
}
.hidden {
  height: 38px!important;
    overflow: hidden;
}
.avatar {
  width: 100%;
  height: 4.375rem;
  background-position: center;
  background-size: cover;
}
 .filmheader {
    color: #797d82;
    font-size: .6rem;
    margin-top:.2125rem;
    line-height: normal;
    }
</style>
