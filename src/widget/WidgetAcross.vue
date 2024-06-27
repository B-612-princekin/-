<template>
  <div class="widget-across" v-if="item" @click="bookContent">
    <img :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'" alt="" @error="changeImg($event)" />
    <i class="iconfont icon-24gf-playCircle" v-if="audioShow"></i>
    <div class="right">
      <h4>{{ item.title }}</h4>
      <div class="author">
        {{ item.author }}
        <span v-if="item.category"> / {{ item.category }}</span>
      </div>
      <div class="gist">
        {{ item.recomContent || item.content || item.summary }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      audioShow: false
    }
  },
  created: function () {
    // this.item.bookId.indexOf('audio') != -1
    if (this.item.bookId) {
      if (this.item.bookId.indexOf("audio") != -1) {
        this.audioShow = true;
      }
    } else if (this.item.id) {
      if (this.item.id.indexOf("audio") != -1) {
        this.audioShow = true;
      }
    }
  },
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
          path: `/book/${this.item.bookId}/title/${this.item.title}`,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .widget-across {
    i {
      color: #bebebe;
    }

    .right {
      h4 {
        color: #757575;
      }

      .author {
        color: #494949;
      }

      .gist {
        color: #4f4f4f;
      }
    }
  }
}

.widget-across {
  display: flex;
  margin-bottom: 22rem;
  position: relative;

  img {
    width: 71rem;
    height: 96rem;
    box-shadow: 0rem 0rem 5rem #0000002e;
  }

  i {
    position: absolute;
    bottom: 7rem;
    left: 8rem;
    color: #fff;
    font-size: 17rem;
  }

  .right {
    margin-left: 11rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h4 {
      color: #222222;
      font-size: 17rem;
    }

    .author {
      font-size: 10rem;
      color: #7b7b7b;
      // margin-top: 11rem;
    }

    .gist {
      font-size: 12rem;
      color: #a0a0a0;
      // margin-top: 16rem;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>