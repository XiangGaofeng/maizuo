<template>
 <van-index-bar :index-list="indexList">
  <van-index-anchor index="1">标题1</van-index-anchor>
  <van-cell :title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

  <van-index-anchor index="2">标题2</van-index-anchor>
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

</van-index-bar>
</template>
<script>
import Vue from 'vue'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
export default {
  ata () {
    return {
      indexList: [1]
    }
  }
}
</script>
<style lang="scss">
*{
  margin:0;
  padding: 0;
}
html,body{
  height: 100%;
}
ul{
  list-style: none;
}
section{
  padding-bottom: 2.722222rem;
}
</style>
