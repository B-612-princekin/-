<template>
  <div class="ranking-boutique">
    <div class="ranking-boutique-hear">
      <i class="iconfont icon-xiangzuojiantou" @click="searchReturn"></i>
      <div class="title">{{ boutique.title }}</div>
      <i class="iconfont icon-fenxiang"></i>
    </div>
    <div class="boutique-nav">
      <div class="ranking-boutique-top">
        <h3>{{ boutique.top.content }}<i class="iconfont icon-xiai"></i></h3>
        <div>{{ boutique.top.text1 }}</div>
        <div>{{ boutique.top.text2 }}</div>
      </div>
      <BoutiqueWidget
        v-for="(item, index) in boutique.list"
        :key="index"
        :item="item"
      ></BoutiqueWidget>
      <div class="ranking-boutique-bottom">
        <div v-html="boutique.bottom.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import boutique from "../assets/json/boutique.json";
import BoutiqueWidget from "../widget/BoutiqueWidget.vue";
export default {
  components: { BoutiqueWidget },
  data() {
    return {
      boutique: "",
    };
  },
  created: function () {
    this.boutique = boutique;
    console.log(this.boutique);
  },
  methods: {
    searchReturn: function () {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  .ranking-boutique {
  background: #2f2f2f;
  .ranking-boutique-hear {
    border-bottom: 1rem solid #3c3c3c;
    background: #2f2f2f;
    color: #5e5e5e;
  }
  .boutique-nav {
    .ranking-boutique-top {   
      h3 {
        color: #707070;
        i{
          color: #983434;
        }
        &::before {
          background: #ae3b40;
        }
      }
      div{
        color: #5b5b5b;
      }
    }
    .ranking-boutique-bottom{
      div{
        color: #5b5b5b;
      }
    }
  }
}
}
.ranking-boutique {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: #fff;
  z-index: 300;
  padding: 50rem 0;
  overflow: scroll;
  .ranking-boutique-hear {
    position: fixed;
    top: 0;
    left: 0;
    height: 50rem;
    width: 100vw;
    border-bottom: 1rem solid #f6f6f6;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 19.5rem;
    font-size: 18rem;
    color: #444;
  }
  .boutique-nav {
    padding: 0 19.5rem;
    .ranking-boutique-top {   
      margin-bottom: 37rem;
      h3 {
        font-size: 20rem;
        color: #222222;
        display: flex;
        align-items: center;
        margin-top: 30rem;
        margin-bottom: 25rem;
        i{
          font-size: 22rem;
          color: #ff2525;
        }
        &::before {
          content: "";
          display: inline-block;
          height: 19rem;
          width: 3rem;
          background: #f93b17;
          margin-right: 5rem;
        }
      }
      div{
        font-size: 16rem;
        color: #757575;
        line-height: 2em;
      }
    }
    .ranking-boutique-bottom{
      div{
        font-size: 16rem;
        color: #757575;
        line-height: 2em;
      }
    }
  }
}
</style>