<template>
  <div class="widget-big-endlong" @click="bookContent">
    <div class="img-box">
      <img class="img" :src="`../assets/icon_0${index + 1}.png`" alt="" />
      <img
        class="img2"
        :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
        alt=""
        @error="changeImg($event)"
      />
    </div>
    <div class="title">{{ item.title }}</div>
    <div class="click" v-if="item.clickCount != -1">{{ click }}万点击</div>
  </div>
</template>

<script>
export default {
  props: ["item", "index"],
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    bookContent: function () {
      this.$router.push({
        path: `/book/${this.item.id}/title/${this.item.title}`,
      });
    },
  },
  computed: {
    click: function () {
      return Math.round(this.item.clickCount / 1000) / 10;
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .widget-big-endlong {
    .title {
      color: #767676;
    }
    .click {
      color: #53514b;
    }
  }
}
.widget-big-endlong {
  width: 106rem;
  .img-box {
    position: relative;
    width: 100%;
    height: 144rem;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .img {
      transform: translateY(-55%);
      z-index: 2;
    }
    .img2 {
      box-shadow: 0rem 0rem 5rem #0000002e;
      height: 100%;
    }
  }
  .title {
    font-size: 13rem;
    color: #222222;
    margin-top: 11rem;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .click {
    font-size: 10rem;
    color: #989898;
    margin-top: 8rem;
  }
}
</style>