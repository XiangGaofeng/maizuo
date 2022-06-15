<template>
    <div class="header">
        <i class="iconfont icon-back" @click="handleBack"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    handleBack () {
      this.$router.back() // 返回上一个页面
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: .625rem;
    background-color: white;
    text-align: center;

    i{
        font-size: 30px;
        position: fixed;
        left:.555556rem;
        top:-0.6rem;
        height: 1.25rem;
        line-height: 2.444444rem;
    }
}
</style>
