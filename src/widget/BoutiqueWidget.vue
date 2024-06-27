<template>
  <div class="boutique-widget" @click="bookContent">
    <img :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'" alt="" />
    <div class="right">
      <div class="name">{{ item.name }}</div>
      <div class="gist" v-html="item.desc"></div>
      <div class="read">立即阅读 &gt;</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    bookContent: function () {
      this.$router.push({
        path: `/book/${this.item.sourceuuid}/title/${this.item.name}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  .boutique-widget {
  box-shadow: 0rem 0rem 5rem #272727;
  .right {
    .name {
      color: #757575;
    }
    .gist {
      color: #5f5f5f;
    }
    .read {
      color: #5e5e5e;
    }
  }
}
}
.boutique-widget {
  display: flex;
  padding: 14rem 22rem 17rem 15rem;
  box-shadow: 0rem 0rem 5rem #0000002e;
  border-radius: 10rem;
  margin-bottom: 20rem;
  img {
    width: 99rem;
    height: 136rem;
  }
  .right {
    margin-left: 15rem;
    .name {
      font-size: 16rem;
      color: #525252;
      margin: 16rem 0 14rem;
    }
    .gist {
      font-size: 14rem;
      color: #929292;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .read {
      font-size: 13rem;
      color: #272727;
      text-align: right;
      margin-top: 18rem;
    }
  }
}
</style>