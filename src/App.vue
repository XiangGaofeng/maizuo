<template>
  <div>
    <tabbar v-show="this.$store.state.showTabbar"></tabbar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import tabbar from '../src/mycomponents/Tabbar.vue'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
export default {
  data () {
    return {

    }
  },
  components: {
    tabbar
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
