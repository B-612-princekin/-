<template>
  <div class="ranking-across" @click="bookContent">
    <img
      :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
      alt=""
      @error="changeImg($event)"
    />
    <i
        class="iconfont icon-24gf-playCircle"
        v-if="item.id.indexOf('audio') != -1"
      ></i>
    <div class="right">
      <div class="title">
        <h3>{{ item.title }}</h3>
        <span
          :class="{ top1: index == 0, top2: index == 1, top3: index == 2 }"
          >{{ index + 1 }}</span
        >
      </div>
      <div class="gist">{{ item.content.slice(0, 50) }}</div>
      <div class="nameBox">
        <div class="name">
          <span>{{ item.author }}</span>
          <span v-if="item.category">{{ item.category }}</span>
        </div>
        <div class="popularity" v-if="item.clickCount != -1">
          {{ item.clickCount | popularity }}
        </div>
      </div>
    </div>
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
  filters: {
    popularity: function (val) {
      if (val >= 10000) {
        return Math.ceil(val / 1000) / 10 + "万人气";
      } else {
        return val + "人气";
      }
    },
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .ranking-across {
    i{
      color: #bebebe;
    }
    .right {
      .title {
        color: #787878;
        span {
          color: #656565;
          &.top1 {
            background: #b30907;
            color: #b2b2b2;
          }
          &.top2 {
            background: #bf4000;
            color: #b2b2b2;
          }
          &.top3 {
            background: #bc7100;
            color: #b2b2b2;
          }
        }
      }
      .gist {
        color: #5f5f5f;
      }
      .nameBox {
        .name {
          color: #5e5e5e;
          span {
            &:nth-child(2) {
              &::before {
                color: #444444;
              }
            }
          }
        }
        .popularity {
          color: #9f3e47;
        }
      }
    }
  }
}
.ranking-across {
  display: flex;
  padding: 13rem;
  width: 100%;
  position: relative;
  img {
    width: 51rem;
    height: 69rem;
  }
  i {
      position: absolute;
      bottom: 19rem;
      left: 20rem;
      color: #fff;
      font-size: 17rem;
    }
  .right {
    margin-left: 14rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    // width: 200rem;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16rem;
      color: #4d4d4d;
      h3 {
        width: 70%;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      span {
        font-size: 14rem;
        color: #bfbfbf;
        &.top1 {
          background: #ff241d;
          color: #fff;
          padding: 4rem 9rem;
          transform: scale(0.7);
          border-radius: 5rem;
          margin-right: -5rem;
          &::before {
            content: "TOP";
            display: inline-block;
            margin-right: 2rem;
          }
        }
        &.top2 {
          background: #ff7300;
          color: #fff;
          padding: 4rem 9rem;
          transform: scale(0.7);
          border-radius: 5rem;
          margin-right: -5rem;
          &::before {
            content: "TOP";
            display: inline-block;
            margin-right: 2rem;
          }
        }
        &.top3 {
          background: #ffba00;
          color: #fff;
          padding: 4rem 9rem;
          transform: scale(0.7);
          border-radius: 5rem;
          margin-right: -5rem;
          &::before {
            content: "TOP";
            display: inline-block;
            margin-right: 2rem;
          }
        }
      }
    }
    .gist {
      font-size: 12rem;
      color: #a5a5a5;
      width: 100%;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .nameBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12rem;
      .name {
        // flex: 1;
        color: #a5a5a5;
        width: 60%;
        display: flex;
        span {
          &:nth-child(1) {
            max-width: 60%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          &:nth-child(2) {
            &::before {
              content: "|";
              display: inline-block;
              margin: 0 9rem;
              color: #e6e6e6;
            }
          }
        }
      }
      .popularity {
        color: #ff7d7f;
      }
    }
  }
}
</style>