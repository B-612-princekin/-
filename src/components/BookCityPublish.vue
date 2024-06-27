<template>
  <div class="book-city-publish" v-if="publish.length">
    <!-- 出版 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="publishGirlSlideshow"
    >
      <van-swipe-item
        v-for="item in publishGirlSlideshow"
        :key="item.id"
        @click="bookContent(item)"
        :style="`background:url(${item.cover}?imageView=1&type=webp&thumbnail=247x0);background-size: cover;
    background-position: center;`"
        >&nbsp;</van-swipe-item
      >
    </van-swipe>

    <div class="week-module" v-if="bigWicket">
      <div class="big-wicket">
        <WidgetBigWicket
          v-for="item in bigWicket"
          :key="item.msgId"
          :item="item"
        ></WidgetBigWicket>
      </div>
    </div>

    <div class="week-push" v-if="newHeavy">
      <WidgetTitle>重磅推荐</WidgetTitle>
      <WidgetBigAcross :bigAcross="heavy" v-if="heavy"></WidgetBigAcross>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in newHeavy"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="choiceness-list" v-if="moods">
      <WidgetTitle>本周人气榜单</WidgetTitle>
      <div class="big-endlong-lift">
        <WidgetBigEndlong
          v-for="(item, index) in moods"
          :key="item.id"
          :item="item"
          :index="index"
        ></WidgetBigEndlong>
      </div>
      <p>
        <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
      </p>
    </div>

    <div class="week-push" v-if="newExpress">
      <WidgetTitle>新书速递</WidgetTitle>
      <WidgetBigAcross :bigAcross="express" v-if="express"></WidgetBigAcross>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in newExpress"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-push" v-if="cliffhang">
      <WidgetTitle>悬疑推理</WidgetTitle>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in cliffhang"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-module" v-if="boutique">
      <WidgetTitle>精品小说</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in boutique"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="oneImage">
      <div class="img">
        <img :src="oneImage.cover" alt="" />
      </div>
    </div>

    <div class="week-push" v-if="culture">
      <WidgetTitle>历史文化</WidgetTitle>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in culture"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-push" v-if="newMotivational">
      <WidgetTitle>经管励志</WidgetTitle>
      <WidgetBigAcross
        :bigAcross="motivational"
        v-if="motivational"
      ></WidgetBigAcross>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in newMotivational"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-push" v-if="youth">
      <WidgetTitle>青春言情</WidgetTitle>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in youth"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-module" v-if="overflow">
      <WidgetTitle>超值套餐</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in overflow"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="quality">
      <WidgetTitle>品质生活</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in quality"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="recharge">
      <WidgetTitle>学习充电</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in recharge"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="twoImage">
      <div class="img">
        <img :src="twoImage.cover" alt="" />
      </div>
    </div>
  </div>
  <van-skeleton title :row="3" v-else />
</template>

<script>
import WidgetAcross from "../widget/WidgetAcross.vue";
import WidgetBigAcross from "../widget/WidgetBigAcross.vue";
import WidgetBigEndlong from "../widget/WidgetBigEndlong.vue";
import WidgetBigWicket from "../widget/WidgetBigWicket.vue";
import WidgetEndlong from "../widget/WidgetEndlong.vue";
import WidgetTitle from "../widget/WidgetTitle.vue";
export default {
  components: {
    WidgetBigWicket,
    WidgetTitle,
    WidgetBigAcross,
    WidgetEndlong,
    WidgetBigEndlong,
    WidgetAcross,
  },
  data() {
    return {
      publish: [],
      newHeavy: [],
      newExpress: [],
      newMotivational: [],
    };
  },
  computed: {
    // 轮播图
    publishGirlSlideshow: function () {
      if (this.publish.filter((n) => n.module === 10)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 10)[0].banners;
      }
    },
    // 特价、排行...
    bigWicket: function () {
      if (this.publish.filter((n) => n.module === 49)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 49)[0].shortCut;
      }
    },
    // 重磅推荐
    heavy: function () {
      if (this.publish.filter((n) => n.module === 52)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 52)[0].list;
      }
    },
    // 本周人气榜单
    moods: function () {
      if (this.publish.filter((n) => n.module === 34)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 34)[0].list;
      }
    },
    // 新书速递
    express: function () {
      if (this.publish.filter((n) => n.module === 52)[1] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 52)[1].list;
      }
    },
    // 悬疑推理
    cliffhang: function () {
      if (this.publish.filter((n) => n.module === 58)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 58)[0].list;
      }
    },
    // 精品小说
    boutique: function () {
      if (this.publish.filter((n) => n.module === 36)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 36)[0].list;
      }
    },
    // 图片1
    oneImage: function () {
      if (this.publish.filter((n) => n.module === 46)[0] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 46)[0];
      }
    },
    // 历史文化
    culture: function () {
      if (this.publish.filter((n) => n.module === 58)[1] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 58)[1].list;
      }
    },
    // 经管励志
    motivational: function () {
      if (this.publish.filter((n) => n.module === 52)[2] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 52)[2].list;
      }
    },
    // 青春言情
    youth: function () {
      if (this.publish.filter((n) => n.module === 58)[2] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 58)[2].list;
      }
    },
    // 超值套餐
    overflow: function () {
      if (this.publish.filter((n) => n.module === 36)[1] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 36)[1].list;
      }
    },
    // 品质生活
    quality: function () {
      if (this.publish.filter((n) => n.module === 36)[2] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 36)[2].list;
      }
    },
    // 学习充电
    recharge: function () {
      if (this.publish.filter((n) => n.module === 36)[3] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 36)[3].list;
      }
    },
    // 图片2
    twoImage: function () {
      if (this.publish.filter((n) => n.module === 46)[1] == undefined) {
        return false;
      } else {
        return this.publish.filter((n) => n.module === 46)[1];
      }
    },
  },
  created: function () {
    this.axios
      .get(
        "https://apis.netstart.cn/yunyuedu/store/show.json?type=publish&uuid=b5648dd3c4f24d9796f590cd81ca076e"
      )
      .then((res) => {
        this.publish = res.data.data.list;
        console.log(res);

        // 重磅推荐
        if (this.heavy) {
          this.newHeavy = this.heavy;
          this.newHeavy = this.newHeavy.splice(1, this.newHeavy.length);
        }
        // 新书速递
        if (this.express) {
          this.newExpress = this.express;
          this.newExpress = this.newExpress.splice(1, this.newExpress.length);
        }
        // 经管励志
        if (this.motivational) {
          this.newMotivational = this.motivational;
          this.newMotivational = this.newMotivational.splice(
            1,
            this.newMotivational.length
          );
        }
      });
  },
  methods: {
    bookContent: function (val) {
      this.$router.push({
        path: `/book/${val.id}/title/${val.title}`,
      });
    },
  },
};
</script>

<style lang="less">
.book-city-publish {
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

  .choiceness-list {
    border-bottom: 1rem solid #cccccc6b;
    .big-endlong-lift {
      display: flex;
      justify-content: space-between;
    }
    p {
      color: #737373;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20rem 0rem;
      span {
        font-size: 11rem;
        i {
          font-size: 15rem;
        }
      }
    }
  }
}
</style>