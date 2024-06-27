<template>
  <div class="widget-big-across" v-if="bigAcross" @click="bookContent">
    <i class="iconfont icon-24gf-playCircle" v-if="bigAcross[0].id.indexOf('audio') != -1"></i>
    <img
      :src="bigAcross[0].cover + '?imageView=1&type=webp&thumbnail=247x0'"
      alt=""
      @error="changeImg($event)"
    />
    <div class="right">
      <h4>{{ bigAcross[0].title }}</h4>
      <div class="author">{{ bigAcross[0].author }}</div>
      <div class="gist">
        {{ bigAcross[0].recomContent || bigAcross[0].content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bigAcross"],
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    bookContent: function () {
      if (this.bigAcross[0].id.indexOf("audio") != -1) {
        this.$router.push({
          path: `/VoiceBook/${this.bigAcross[0].id}/bookName/${this.bigAcross[0].title}`,
        });
      } else {
        this.$router.push({
          path: `/book/${this.bigAcross[0].id}/title/${this.bigAcross[0].title}`,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .widget-big-across {
    i{
      color: #bebebe;
    }
    .right {
      h4 {
        color: #787878;
      }
      .author {
        color: #4b4b4b;
      }
      .gist {
        color: #4b4b4b;
      }
    }
  }
}
.widget-big-across {
  display: flex;
  height: 115rem;
  position: relative;
  i{
    position: absolute;
    bottom: 7rem;
    left: 8rem;
    color: #fff;
    font-size: 17rem;
  }
  img {
    width: 86rem;
    height: 100%;
    box-shadow: 0rem 0rem 5rem #0000002e;
  }
  .right {
    margin-left: 11rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4 {
      color: #222222;
      font-size: 17rem;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .author {
      font-size: 12rem;
      color: #6d6d6d;
      // margin: 12rem 0rem 18rem;
    }
    .gist {
      font-size: 12rem;
      color: #6d6d6d;
      // line-height: 20rem;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>