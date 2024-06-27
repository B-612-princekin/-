<template>
  <div class="my-tymz-endlong">
    <img
      :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
      alt=""
      @error="changeImg($event)"
    />
    <div class="title">{{ item.title }}</div>
    <del class="price">{{ item.wprice }} 阅点/千字</del>
    <div class="gratis">{{ item.discountDesc }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark{
   .title{
     color: #787878;
   }
   .price{
     color: #514f49;
   }
   .gratis{
     color: #83291d;
   }
}
.my-tymz-endlong {
  display: flex;
  flex-direction: column;
  width: 105rem;
  img {
    width: 100%;
    height: 150rem;
  }
  .title {
    font-size: 14rem;
    color: #3f3f3f;
    margin: 17rem 0 14rem;
  }
  .price {
    font-size: 10rem;
    color: #c1c1c1;
    margin-bottom: 7rem;
  }
  .gratis {
    font-size: 10rem;
    color: #f34728;
  }
}
</style>