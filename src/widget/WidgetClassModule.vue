<template>
  <div class="widget-class-module" @click="bookContent">
    <img
      :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
      alt=""
      @error="changeImg($event)"
    />
    <div class="title">{{ item.title }}</div>
    <div class="name">{{ item.author }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
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
  .title{
    color: #717171;
  }
  .name{
    color: #5e5e5e;
  }
}
.widget-class-module {
  width: 102rem;
  margin-bottom: 19rem;
  // margin-right: 20rem;
  // &:nth-child(3n) {
  //   margin-right: 0rem;
  // }
  img {
    width: 100%;
    height: 147rem;
    box-shadow: 0rem 0rem 15rem #0000002e;
  }
  .title {
    margin-top: 14rem;
    font-size: 14rem;
    color: #454545;
  }
  .name {
    margin-top: 7rem;
    font-size: 12rem;
    color: #8d8d8d;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>