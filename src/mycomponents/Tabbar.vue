<template>
  <footer>
    <ul>
      <!-- vue-router(3之前，包括3) -1- 声明式导航 -->

      <!-- <router-link to="/films" active-class="kerwinactive" tag="li">电影</router-link>

                <router-link to="/cinemas" active-class="kerwinactive" tag="li">影院</router-link> -->

      <!-- vue-router（4） -2- 声明式导航 -->

      <router-link to="/films" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kerwinactive' : ''">
          <i class="iconfont icon-all"></i>
          <span>电影</span>
        </li>
      </router-link>
      <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kerwinactive' : ''">
          <i class="iconfont icon-comments"></i>
          <span>影院</span>
        </li>
      </router-link>
      <router-link to="/center" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kerwinactive' : ''">
          <i class="iconfont icon-account"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import '../assets/iconfont/iconfont.css'
export default {}
</script>
<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.875rem;
  background: white;
  z-index: 100;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 0.9rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      i {
        font-size: 20px;
      }
      span {
        font-size: 16px;
      }
    }
  }
}

.kerwinactive {
  color: red;
}
</style>
