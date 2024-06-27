<template>
  <div class="book-city-voice-book" v-if="voiceBook.length">
    <!-- 听书 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="voiceBookSlideshow"
    >
      <van-swipe-item
        v-for="item in voiceBookSlideshow"
        :key="item.id"
        @click="bookContent(item)"
        :style="`background:url(${item.cover}?imageView=1&type=webp&thumbnail=247x0);background-size: cover;
    background-position: center;`"
        >&nbsp;</van-swipe-item
      >
    </van-swipe>

    <div class="week-push" v-if="newVoiceRecommend">
      <WidgetTitle>重磅推荐</WidgetTitle>
      <WidgetBigAcross
        :bigAcross="voiceRecommend"
        v-if="voiceRecommend"
      ></WidgetBigAcross>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in newVoiceRecommend"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-module" v-if="hotVoice">
      <WidgetTitle>本周热听</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in hotVoice"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="voiceImg">
      <div class="img">
        <img :src="voiceImg.cover" alt="" @click="bookContent(voiceImg)" />
      </div>
    </div>

    <div class="week-push" v-if="girlChosen">
      <WidgetTitle>女生精选</WidgetTitle>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in girlChosen"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>
  </div>
  <van-skeleton title :row="3" v-else />
</template>

<script>
import WidgetAcross from "../widget/WidgetAcross.vue";
import WidgetBigAcross from "../widget/WidgetBigAcross.vue";
import WidgetEndlong from "../widget/WidgetEndlong.vue";
import WidgetTitle from "../widget/WidgetTitle.vue";
export default {
  components: { WidgetTitle, WidgetBigAcross, WidgetEndlong, WidgetAcross },
  data() {
    return {
      voiceBook: [],
      newVoiceRecommend: [],
    };
  },
  computed: {
    // 轮播图
    voiceBookSlideshow: function () {
      if (this.voiceBook.filter((n) => n.module === 10)[0] == undefined) {
        return false;
      } else {
        return this.voiceBook.filter((n) => n.module === 10)[0].banners;
      }
    },
    // 重磅推推荐
    voiceRecommend: function () {
      if (this.voiceBook.filter((n) => n.module === 52)[0] == undefined) {
        return false;
      } else {
        return this.voiceBook.filter((n) => n.module === 52)[0].list;
      }
    },
    // 本周热听
    hotVoice: function () {
      if (this.voiceBook.filter((n) => n.module === 36)[0] == undefined) {
        return false;
      } else {
        return this.voiceBook.filter((n) => n.module === 36)[0].list;
      }
    },
    // 图片
    voiceImg: function () {
      if (this.voiceBook.filter((n) => n.module === 46)[0] == undefined) {
        return false;
      } else {
        return this.voiceBook.filter((n) => n.module === 46)[0];
      }
    },
    // 女生精选
    girlChosen: function () {
      if (this.voiceBook.filter((n) => n.module === 58)[0] == undefined) {
        return false;
      } else {
        return this.voiceBook.filter((n) => n.module === 58)[0].list;
      }
    },
  },
  created: function () {
    this.axios
      .get(
        "https://apis.netstart.cn/yunyuedu/store/show.json?type=audio&uuid=b67282bb443845fabe5b543795a27618"
      )
      .then((res) => {
        this.voiceBook = res.data.data.list;
        // 重磅推荐
        if (this.voiceRecommend) {
          this.newVoiceRecommend = this.voiceRecommend;
          this.newVoiceRecommend = this.newVoiceRecommend.splice(
            1,
            this.newVoiceRecommend.length
          );
        }
      });
  },
  methods: {
    bookContent: function (val) {
      if (val.id.indexOf("audio") != -1) {
        this.$router.push({
          path: `/VoiceBook/${val.id}/bookName/${val.title}`,
        });
      } else {
        this.$router.push({
          path: `/book/${val.id}/title/${val.title}`,
        });
      }
    },
  },
};
</script>

<style lang="less">
.book-city-voice-book {
  padding: 0 19.5rem;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20rem;
    line-height: 130rem;
    text-align: center;
    background-color: #39a9ed;
    border-radius: 5rem;
  }
  .week-push {
    .week-push-endlong {
      display: flex;
      justify-content: space-between;
      margin-top: 22rem;
    }
    padding-bottom: 17rem;
    border-bottom: 1rem solid #cccccc6b;
  }

  .week-module {
    border-bottom: 1rem solid #cccccc6b;
    .big-wicket {
      display: flex;
      justify-content: space-around;
      margin: 9rem 0 11rem;
    }
    .img {
      margin: 13rem 0rem 17rem;
      img {
        width: 100%;
        border-radius: 5rem;
      }
    }
  }
}
</style>