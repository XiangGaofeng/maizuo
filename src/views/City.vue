<template>
  <div>
    <van-index-bar :index-list="computedList" :sticky="false" highlight-color="blue" @select="handleChange">
      <div v-for="data in finalList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell :title="item.name" v-for="item in data.datalist" :key="item.cityId" @click="handleClick(item)"/>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '../util/mixinobj'
export default {
  mixins: [obj],
  data () {
    return {
      finalList: []
    }
  },
  computed: {
    computedList () {
      return this.finalList.map(item => item.type)
    }
  },
  mounted () {
    http({
      url: '/gateway?k=5066709',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      console.log(res.data.data.cities)
      this.renderCity(res.data.data.cities)
      // 1， 316条 ==> A ,B进行分组
      // 2.  利用转换后的数组，结合组件库进行渲染页面。
    })
  },
  methods: {
    handleChange (data) {
      Toast(data)
    },
    handleClick (item) {
      console.log(item)
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityID', item.cityId)
      this.$router.back()
    },
    renderCity (cityList) {
      var expectedlist = []
      var list = []
      for (let index = 65; index < 91; index++) {
        list.push(String.fromCharCode(index))
      }
      list.forEach(element => {
        var newList = cityList.filter(item => item.pinyin.substring(0, 1).toUpperCase() === element)

        newList.length > 0 && expectedlist.push({
          type: element,
          datalist: newList
        })
      })
      console.log(expectedlist)
      this.finalList = expectedlist
    }
  }
}
</script>
<style lang="scss">
.van-toast--html, .van-toast--text {
    min-width: 26px;
}
</style>
