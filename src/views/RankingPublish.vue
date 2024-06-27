<template>
  <div class="ranking-publish">
    <div class="ranking-publish-top">
      <i class="iconfont icon-xiangzuojiantou" @click="searchReturn"></i>
      <h3>{{ RankingPublish.title }}</h3>
      <div></div>
    </div>
    <ul>
      <RankingPublishAcross
        v-for="item in RankingPublish.books"
        :key="item.id"
        :item="item"
      ></RankingPublishAcross>
    </ul>
  </div>
</template>

<script>
import RankingPublishAcross from "../widget/RankingPublishAcross.vue";
export default {
  components: { RankingPublishAcross },
  data() {
    return {
      RankingPublish: [],
    };
  },
  created: function () {
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/store/bookList.json", {
        params: {
          uuid: this.$route.params.myUrl,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.RankingPublish = res.data.data;
      });
  },
  methods: {
    searchReturn: function () {
      this.$router.push("/book-city/BookCityPublish");
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .ranking-publish {
    background: #2f2f2f;
    .ranking-publish-top {
      background: #2f2f2f;
      border-bottom: 1rem solid #363435;
      color: #756f68;
      i{
        color: #67635b;
      }
    }
  }
}
.ranking-publish {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 300;
  overflow: scroll;
  padding-top: 50rem;
  .ranking-publish-top {
    height: 50rem;
    width: 100%;
    background: #fff;
    padding: 0 19.5rem;
    border-bottom: 1rem solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18rem;
    color: #62605a;
    position: fixed;
    top: 0;
    left: 0;
  }
  ul {
    padding: 0 11.7rem;
    margin-top: 5rem;
  }
}
</style>