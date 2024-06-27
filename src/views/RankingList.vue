<template>
  <div class="ranking-list">
    <nav>
      <i class="iconfont icon-xiangzuojiantou" @click="searchReturn"></i>
      <a
      :class="{icon:classVar== 'boy'}"
        @click="
          $router.push({
            path: `/book/${$route.params.bookId}/list/${$route.params.rankType}/boy`},onComplete =>{},onAbort =>{});classVar = 'boy'
        "
      >
        <span>男生</span></a
      >
      <a
      :class="{icon:classVar=='girl'}"
        @click="
          $router.push({
            path: `/book/${$route.params.bookId}/list/${$route.params.rankType}/girl`,
          },onComplete =>{},onAbort =>{});classVar = 'girl'
        "
      >
        <span>女生</span></a
      >
      <a
      :class="{icon:classVar=='publish'}"
        @click="
          $router.push({
            path: `/book/${$route.params.bookId}/list/${$route.params.rankType}/publish`,
          },onComplete =>{},onAbort =>{});classVar = 'publish'
        "
      >
        <span>出版</span></a
      >
      <a
      :class="{icon:classVar=='hear'}"
        @click="
          $router.push({
            path: `/book/${$route.params.bookId}/list/${$route.params.rankType}/hear`,
          },onComplete =>{},onAbort =>{});classVar = 'hear'
        "
      >
        <span>听书</span></a
      >
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  data() {
    return {
      ranking: [],
      classVar:"boy",
    };
  },
  methods: {
    searchReturn: function () {
      this.$router.push("/book-city");
    },
  },
  created:function(){
    let str = this.$route.path;
    str = str.substring(str.lastIndexOf("/")+1,str.length)
    this.classVar = str;
    console.log(str);
  }
};
</script>

<style lang="less">
#app.dark{
  .ranking-list {
  background: #2f2f2f;
  nav {
    border-bottom: 1rem solid #3b3b3b;
    background: #2f2f2f;
    i{
      color: #67635b;
    }
    a {
      color: #5e5e5e;
      &.icon {
        color: #787878;
        span {
          &::after {
            background: c1262f;
          }
        }
      }
    }
  }
}
}
.ranking-list {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 300;
  padding-top: 50rem;
  nav {
    display: flex;
    align-items: center;
    height: 50rem;
    width: 100vw;
    border-bottom: 1rem solid #f6f6f6;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    i {
      width: 78rem;
      text-align: center;
    }
    a {
      font-weight: normal;
      color: #b0b0b0;
      text-decoration: none;
      font-size: 13rem;
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      // &.router-link-exact-active {
      &.icon {
        font-weight: 500;
        color: #3c3c3c;
        font-size: 17rem;
        span {
          position: relative;
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            bottom: -6rem;
            left: 50%;
            transform: translateX(-50%);
            height: 2rem;
            border-radius: 2rem;
            width: 50%;
            background: red;
          }
        }
      }
    }
  }
}
</style>