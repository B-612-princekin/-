<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <nav class="appNav">
      <router-link to="/bookrack">
        <i class="iconfont icon-a-168-shu"></i>
        书架
      </router-link>
      <router-link to="/book-city">
        <i class="iconfont icon-shu"></i>
        书城
      </router-link>
      <router-link to="/Classify">
        <i class="iconfont icon-dilanxianxingiconyihuifu_huabanfuben"></i>
        分类
      </router-link>
      <router-link to="/mine">
        <i class="iconfont icon-wode"></i>
        我的
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isDarkMode"]),
  },
};
</script>
<style lang="less">
#app {
  min-height: 100vh;
  &.dark {
    background-color: #2f2f2f;
    .appNav {
      background-color: #2f2f2f;
      box-shadow: 0rem -1rem 1rem #313131;
      a {
        color: #474747;
        &.router-link-active {
          color: #787878;
        }
      }
    }
  }
}
.appNav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  z-index: 200;
  box-shadow: 0rem -1rem 1rem #cccccc6b;
  a {
    flex: 1;
    font-weight: normal;
    color: #cccccc;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12rem;
    i {
      font-size: 24rem;
    }
    &.router-link-active {
      color: #222222;
    }
  }
}
</style>
