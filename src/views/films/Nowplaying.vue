<template>
  <div>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="我是有底线的"
  @load="onLoad"
  :immediate-check="false"
>
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" />
        <div>
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div :class="data.grade?'':'hidden'">
              观众评分:<span style="color: red">{{ data.grade }}</span>
            </div>

            <div class="actors" >主演： {{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'

Vue.filter('actorsFilter', (data) => {
  console.log(data)
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },

  mounted () {
    http({
      url:
        `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5196770`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },

  methods: {
    onLoad () {
      this.current++

      http({
        url:
        `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5196770`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false

        if (this.datalist.length === this.total) {
          this.finished = true
        }
      })
    },
    handleChangePage (id) {
      //   console.log(id)
      // 编程式导航
      //   location.href = '#/detail'

      // /detail/1111
      // 1-通过路径跳转
      // this.$router.push(`/detail/${id}`)

      // 2-通过命名路由跳转
      this.$router.push({
        name: 'kerwinDetail',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-list {
  .van-cell {
    overflow: hidden;
    padding: .9375rem;
    img {
      width: 3rem;
      height: 4.5rem;
      float: left;
      margin-right: .4375rem;
    }

    .title {
      font-size: 20px;
      vertical-align:middle
    }
    .content {
      font-size: 13px;
      color: gray;
      .actors {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.hidden{
  visibility: hidden;
}
</style>
