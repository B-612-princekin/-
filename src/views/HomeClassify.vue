<template>
  <div class="home-classify">
    <div class="home-classify-top">
      <nav class="classify-nav">
        <router-link to="/Classify/ClassifyBoy">男生</router-link>
        <router-link to="/Classify/ClassifyGril">女生</router-link>
        <router-link to="/Classify/ClassifyPublish">出版</router-link>
        <router-link to="/Classify/ClassifyVoiceBook">听书</router-link>
      </nav>
      <i class="iconfont icon-tubiaozhizuomoban_sousuo" @click="skip"></i>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classifyData: [],
    };
  },
  methods: {
    skip: function () {
      this.$router.push({ path: "/SearchView" });
      // console.log(this.$route);
    },
  },
  created: function () {
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/mergedCategroy.json")
      .then((res) => {
        this.classifyData = res.data;
      });
  },
};
</script>

<style lang="less">
#app.dark{
  .home-classify{
    .home-classify-top{
      background: #2f2f2f;
      i{
        color: #666666;
      }
      .classify-nav{
        a{
          color: #5e5e5e;
          &.router-link-exact-active{
            color: #787878;
          }
        }
      }
    }
  }
}
.home-classify {
  padding: 0rem 0rem 50rem;
  .home-classify-top {
    display: flex;
    align-items: center;
    padding: 0rem 19.5rem;
    height: 50rem;
    background: #fff;
    i {
      flex: 1;
      text-align: right;
      font-size: 18rem;
      color: #676767;
    }
    .classify-nav {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        font-weight: normal;
        color: #666;
        text-decoration: none;
        font-size: 14rem;
        flex: 1;
        text-align: center;
        &.router-link-exact-active {
          font-weight: 600;
          color: #2e2e2e;
          font-size: 17rem;
        }
      }
    }
  }
}
</style>
