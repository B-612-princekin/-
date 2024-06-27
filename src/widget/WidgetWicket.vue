<template>
  <div class="widget-wicket" @click="rankingList">
    <img :src="item.cover" alt="" @error="changeImg($event)" />
    <h4>{{ item.name }}</h4>
  </div>
</template>

<script>
export default {
  props: ["item"],
  created: function () {
    // console.log(this.item.url);
  },
  // computed:{
  //   // 用来侦听vuex中的变量
  //   cutShow:function(){
  //     return this.$store.state.cutShow
  //   }
  // },
  // watch: {
  //   cutShow: function () {
  //     if (this.cutShow) {

  //     } else {

  //     }
  //   },
  // },
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    rankingList: function () {
      if (this.item["p_action"] == 460) {
        let myurl = this.item.url;
        var bookId = myurl.substring(
          myurl.indexOf("uuid=") + 5,
          myurl.indexOf("&rankType=")
        );
        var rankType = myurl.substring(
          myurl.indexOf("&rankType=") + 10,
          myurl.length
        );
        if (this.$store.state.cutShow) {
          this.$router.push({ path: `/book/${bookId}/list/${rankType}/boy` });
        } else {
          this.$router.push({ path: `/book/${bookId}/list/${rankType}/girl` });
        }
      } else if (this.item["p_action"] == 1) {
        // 在新页面打开超链接
        // window.open(this.item.url);
        // 在当前页面打开超链接
        // window.location.href= this.item.url;
        this.$router.push({ path: `/RankingBoutique` });
      } else if (this.item["p_action"] == 461) {
        let myurl = this.item.url;
        myurl = myurl.substring(myurl.indexOf("?uuid=") + 6);
        this.$router.push({ path: `/ranking-publish/${myurl}` });
      } else if (this.item["p_action"] == 113) {
        let myurl = this.item.url;
        myurl = myurl.substring(myurl.indexOf("?catId=") + 7);
        this.$router.push({ path: `/ranking-girl/${myurl}` });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .widget-wicket {
    h4 {
      color: #777777;
    }
  }
}
.widget-wicket {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 36rem;
    height: 36rem;
    border-radius: 50%;
  }
  h4 {
    color: #414141;
    font-size: 13rem;
  }
}
</style>