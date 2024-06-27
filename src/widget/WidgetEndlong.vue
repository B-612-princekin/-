<template>
  <div class="widget-endlong" @click="bookContent">
    <div class="img">
      <i
        class="iconfont icon-24gf-playCircle"
        v-if="item.id.indexOf('audio') != -1"
      ></i>
      <img
        :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
        alt=""
        @error="changeImg($event)"
      />
    </div>
    <h4>{{ item.title }}</h4>
    <div class="author">{{ item.author }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    bookContent: function () {
      if (this.item.id.indexOf("audio") != -1) {
        this.$router.push({
          path: `/VoiceBook/${this.item.id}/bookName/${this.item.title}`,
        });
      } else {
        this.$router.push({
          path: `/book/${this.item.id}/title/${this.item.title}`,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .widget-endlong {
    i{
      color: #bebebe;
    }
    h4 {
      color: #6b6b6b;
    }
    .author {
      color: #494742;
    }
  }
}
.widget-endlong {
  display: flex;
  flex-direction: column;
  width: 74rem;
  .img {
    width: 74rem;
    height: 105rem;
    box-shadow: 0rem 0rem 5rem #0000002e;
    position: relative;
    i {
      position: absolute;
      bottom: 7rem;
      left: 8rem;
      color: #fff;
      font-size: 17rem;
    }
  }
  h4 {
    font-size: 14rem;
    color: #222222;
    margin-top: 11rem;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .author {
    font-size: 10rem;
    color: #979797;
    margin-top: 9rem;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>