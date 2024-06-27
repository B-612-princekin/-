<template>
  <div class="widget-two-across" @click="bookContent">
    <img
      :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
      alt=""
      @error="changeImg($event)"
    />
    <div class="right">
      <div class="title">{{ item.title }}</div>
      <div class="category">{{ item.category }}</div>
      <div class="look">
        <i class="iconfont icon-chakan"></i>
        {{ click }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    click: function () {
      if (this.item.clickCount > 10000) {
        return Math.round(this.item.clickCount / 1000) / 10 + "万";
      } else {
        return this.item.clickCount;
      }
    },
  },
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    bookContent:function(){
      // this.$store.
      this.$router.push({ path: `/book/${this.item.id}/title/${this.item.title}` });
    }
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  .right{
     .title{
       color: #767676;
     }
     .category{
       color: #595959;
     }
     .look{
       color: #484848;
       i{
         color: #736e66;
       }
     }
  }
}
.widget-two-across {
  width: 50%;
  padding-right: 15rem;
  display: flex;
  margin-bottom: 20rem;
  img {
    width: 60rem;
    height: 81rem;
    box-shadow: 0rem 0rem 5rem #0000002e;
  }
  .right {
    margin-left: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14rem;
      color: #4a4a4a;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .category {
      //   margin-top: 12rem;
      font-size: 10rem;
      color: #9e9e9e;
    }
    .look {
      display: flex;
      align-items: center;
      font-size: 9rem;
      color: #969696;
      i {
        font-size: 14rem;
        color: #b1b1b1;
        margin-right: 2rem;
      }
    }
  }
}
</style>