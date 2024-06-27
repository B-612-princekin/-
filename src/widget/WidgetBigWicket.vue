<template>
  <div class="widget-big-wicket" @click="rankingList">
    <img :src="item.cover" alt="" @error="changeImg($event)" />
    <h4>{{ item.name }}</h4>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    rankingList: function () {
      if (this.item["p_action"] == 460) {
        var myurl = this.item.url;
        var bookId = myurl.substring(
          myurl.indexOf("uuid=") + 5,
          myurl.indexOf("&rankType=")
        );
        var rankType = myurl.substring(
          myurl.indexOf("&rankType=") + 10,
          myurl.length
        );
        this.$router.push({ path: `/book/${bookId}/list/${rankType}/publish` });
        // this.$router.push({path:`/book/:bookId/list/:rankType`})
      }else if(this.item["p_action"] == 461){
        console.log(this.item.url);
        let myurl = this.item.url;
        myurl = myurl.substring(myurl.indexOf("?uuid=")+6)
        this.$router.push({ path: `/ranking-publish/${myurl}` });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  h4{
    color: #777777;
  }
}
.widget-big-wicket {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 45rem;
    height: 45rem;
    border-radius: 50%;
  }
  h4 {
    margin-top: 6rem;
    color: #6a6a6a;
    font-size: 13rem;
  }
}
</style>