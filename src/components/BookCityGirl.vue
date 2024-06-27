<template>
  <div class="book-city-girl" v-if="girl.length">
    <!-- 女生 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="girlSlideshow"
    >
      <van-swipe-item
        v-for="item in girlSlideshow"
        :key="item.id"
        @click="bookContent(item)"
        :style="`background:url(${item.cover}?imageView=1&type=webp&thumbnail=247x0);background-size: cover;
    background-position: center;`"
        >&nbsp;</van-swipe-item
      >
    </van-swipe>

    <div class="week-module" v-if="tips">
      <WidgetTitle>小编力荐</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in tips"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="serialize">
      <WidgetTitle>连载追更</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in serialize"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="choiceness-list" v-if="days">
      <WidgetTitle>24小时人气榜</WidgetTitle>
      <div class="big-endlong-lift">
        <WidgetBigEndlong
          v-for="(item, index) in days"
          :key="item.id"
          :item="item"
          :index="index"
        ></WidgetBigEndlong>
      </div>
      <p>
        <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
      </p>
    </div>

    <div class="week-push" v-if="newBook">
      <WidgetTitle>新书独家</WidgetTitle>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in newBook"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="week-push" v-if="myIp">
      <WidgetTitle>潜力IP</WidgetTitle>
      <div class="week-push-endlong">
        <WidgetEndlong
          v-for="item in myIp"
          :key="item.id"
          :item="item"
        ></WidgetEndlong>
      </div>
    </div>

    <div class="choiceness-list" v-if="girlEnd">
      <WidgetTitle>女生完结榜</WidgetTitle>
      <div class="big-endlong-lift">
        <WidgetBigEndlong
          v-for="(item, index) in girlEnd"
          :key="item.id"
          :item="item"
          :index="index"
        ></WidgetBigEndlong>
      </div>
      <p>
        <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
      </p>
    </div>

    <div class="week-module-two" v-if="modern">
      <WidgetTitle>古代言情</WidgetTitle>
      <div class="week-faddish-two-across">
        <WidgetTwoAcross
          v-for="item in modern"
          :key="item.id"
          :item="item"
        ></WidgetTwoAcross>
      </div>
    </div>
  </div>
  <van-skeleton title :row="3" v-else />
</template>

<script>
import WidgetAcross from "../widget/WidgetAcross.vue";
import WidgetBigEndlong from "../widget/WidgetBigEndlong.vue";
import WidgetEndlong from "../widget/WidgetEndlong.vue";
import WidgetTitle from "../widget/WidgetTitle.vue";
import WidgetTwoAcross from "../widget/WidgetTwoAcross.vue";
export default {
  components: {
    WidgetTitle,
    WidgetAcross,
    WidgetBigEndlong,
    WidgetEndlong,
    WidgetTwoAcross,
  },
  data() {
    return {
      girl: [],
    };
  },
  computed: {
    // 轮播图
    girlSlideshow: function () {
      if (this.girl.filter((n) => n.module === 10)[0] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 10)[0].banners;
      }
    },
    // 小编推荐
    tips: function () {
      if (this.girl.filter((n) => n.module === 36)[0] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 36)[0].list;
      }
    },
    // 连载追更
    serialize: function () {
      if (this.girl.filter((n) => n.module === 36)[1] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 36)[1].list;
      }
    },
    // 24小时人气榜
    days: function () {
      if (this.girl.filter((n) => n.module === 34)[0] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 34)[0].list;
      }
    },
    // 新书独家
    newBook: function () {
      if (this.girl.filter((n) => n.module === 58)[0] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 58)[0].list;
      }
    },
    // 潜力IP
    myIp: function () {
      if (this.girl.filter((n) => n.module === 58)[1] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 58)[1].list;
      }
    },
    // 女生完结榜
    girlEnd: function () {
      if (this.girl.filter((n) => n.module === 34)[0] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 34)[0].list;
      }
    },
    // 古代言情
    modern: function () {
      if (this.girl.filter((n) => n.module === 51)[0] == undefined) {
        return false;
      } else {
        return this.girl.filter((n) => n.module === 51)[0].list;
      }
    },
  },
  created: function () {
    this.axios
      .get(
        "https://apis.netstart.cn/yunyuedu/store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9"
      )
      .then((res) => {
        this.girl = res.data.data.list;
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
#app.dark {
  .week-module {
    border-bottom: 1rem solid #333232;
  }
  .choiceness-list {
    border-bottom: 1rem solid #333232;
    p {
      color: #5d5d5d;
    }
  }
  .week-push {
    border-bottom: 1rem solid #333232;
  }
  .week-module-two {
    border-bottom: 1rem solid #333232;
  }
}
.book-city-girl {
  padding: 0 19.5rem;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20rem;
    line-height: 130rem;
    text-align: center;
    background-color: #39a9ed;
    border-radius: 5rem;
  }
  .week-module {
    border-bottom: 1rem solid #cccccc6b;
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
  .week-push {
    .week-push-endlong {
      display: flex;
      justify-content: space-between;
      margin-top: 22rem;
    }
    padding-bottom: 17rem;
    border-bottom: 1rem solid #cccccc6b;
  }

  .week-module-two {
    border-bottom: 1rem solid #cccccc6b;
    .week-faddish-two-across {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>