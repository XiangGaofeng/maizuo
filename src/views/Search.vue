<template>
    <div>

        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
         />
      <ul v-if="value">
        <li v-for="data in computedList" :key="data.cinemaId">
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
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) ||
      item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    if (this.$store.state.cinemaList.length === 0) { // 避免每次进入路由都要请求数据
      this.$store.dispatch('CinemaData', this.$store.state.cityId)
    } else {

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
    width: calc(100% - 2rem);
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
