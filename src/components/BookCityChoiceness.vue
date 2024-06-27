<template>
  <div class="book-city-choiceness" v-if="choiceness.length">
    <div>
      <!-- 精选 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        v-if="slideshow"
      >
        <van-swipe-item
          v-for="(item,index) in slideshow"
          :key="index"
          @click="bookContent(item)"
          :style="`background:url(${item.cover}?imageView=1&type=webp&thumbnail=247x0);background-size: cover;
    background-position: center;`"
          >&nbsp;</van-swipe-item
        >
      </van-swipe>
      <div class="choiceness-wicket" v-if="wicket">
        <WidgetWicket
          v-for="(item,index) in wicket"
          :key="index"
          :item="item"
        ></WidgetWicket>
      </div>

      <div class="week-push" v-if="newWeek">
        <WidgetTitle>本周强推</WidgetTitle>
        <WidgetBigAcross :bigAcross="week"></WidgetBigAcross>
        <div class="week-push-endlong">
          <WidgetEndlong
            v-for="(item,index) in newWeek"
            :key="index"
            :item="item"
          ></WidgetEndlong>
        </div>
      </div>

      <div class="week-module" v-if="faddish">
        <WidgetTitle>人气NO.1-本周爆款来了</WidgetTitle>
        <div class="week-faddish-across">
          <WidgetAcross
            v-for="(item,index) in faddish"
            :key="index"
            :item="item"
          ></WidgetAcross>
        </div>
      </div>

      <div class="choiceness-list" v-if="hotSell">
        <WidgetTitle>24小时热销榜</WidgetTitle>
        <div class="big-endlong-lift">
          <WidgetBigEndlong
            v-for="(item, index) in hotSell"
            :key="index"
            :item="item"
            :index="index"
          ></WidgetBigEndlong>
        </div>
        <p>
          <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
        </p>
      </div>

      <div class="week-module" v-if="hotSell">
        <WidgetTitle>精品必读</WidgetTitle>
        <div class="week-faddish-across">
          <WidgetAcross
            v-for="(item,index) in boutique"
            :key="index"
            :item="item"
          ></WidgetAcross>
        </div>
      </div>

      <div class="week-module" v-if="energy">
        <WidgetTitle>高能剧情</WidgetTitle>
        <div class="week-faddish-across">
          <WidgetAcross
            v-for="(item,index) in energy"
            :key="index"
            :item="item"
          ></WidgetAcross>
        </div>
      </div>

      <div class="choiceness-list" v-if="finish">
        <WidgetTitle>完结榜·超人气爆款小说</WidgetTitle>
        <div class="big-endlong-lift">
          <WidgetBigEndlong
            v-for="(item, index) in finish"
            :key="index"
            :item="item"
            :index="index"
          ></WidgetBigEndlong>
        </div>
        <p>
          <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
        </p>
      </div>

      <div class="week-module" v-if="quality">
        <WidgetTitle>优质好文</WidgetTitle>
        <div class="week-faddish-across">
          <WidgetAcross
            v-for="(item,index) in quality"
            :key="index"
            :item="item"
          ></WidgetAcross>
        </div>
      </div>

      <div class="week-module" v-if="doucon">
        <WidgetTitle>大家都在看</WidgetTitle>
        <div class="week-faddish-across">
          <WidgetAcross
            v-for="(item,index) in doucon"
            :key="index"
            :item="item"
          ></WidgetAcross>
        </div>
      </div>

      <div class="choiceness-list" v-if="newBook">
        <WidgetTitle>最热新书榜</WidgetTitle>
        <div class="big-endlong-lift">
          <WidgetBigEndlong
            v-for="(item, index) in newBook"
            :key="index"
            :item="item"
            :index="index"
          ></WidgetBigEndlong>
        </div>
        <p>
          <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
        </p>
      </div>
    </div>
  </div>
  <van-skeleton title :row="3" v-else />
</template>

<script>
import WidgetAcross from "../widget/WidgetAcross.vue";
import WidgetBigAcross from "../widget/WidgetBigAcross.vue";
import WidgetBigEndlong from "../widget/WidgetBigEndlong.vue";
import WidgetEndlong from "../widget/WidgetEndlong.vue";
import WidgetTitle from "../widget/WidgetTitle.vue";
import WidgetWicket from "../widget/WidgetWicket.vue";
export default {
  components: {
    WidgetWicket,
    WidgetTitle,
    WidgetBigAcross,
    WidgetEndlong,
    WidgetAcross,
    WidgetBigEndlong,
  },
  data() {
    return {
      choiceness: [],
      newWeek: [],
    };
  },
  computed: {
    // 轮播图
    slideshow: function () {
      if (this.choiceness.filter((n) => n.module === 10)[0] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 10)[0].banners;
      }
    },
    // 排行、人气... 小图标
    wicket: function () {
      if (this.choiceness.filter((n) => n.module === 49)[0] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 49)[0].shortCut;
      }
    },
    // 本周强推
    week: function () {
      if (this.choiceness.filter((n) => n.module === 52)[0] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 52)[0].list;
      }
    },
    // 本周爆款
    faddish: function () {
      if (this.choiceness.filter((n) => n.module === 36)[0] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 36)[0].list;
      }
    },
    // 24小时热销榜
    hotSell: function () {
      if (this.choiceness.filter((n) => n.module === 34)[0] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 34)[0].list;
      }
    },
    // 精品必读
    boutique: function () {
      if (this.choiceness.filter((n) => n.module === 36)[1] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 36)[1].list;
      }
    },
    // 高能剧情
    energy: function () {
      if (this.choiceness.filter((n) => n.module === 36)[2] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 36)[2].list;
      }
    },
    // 完结榜
    finish: function () {
      if (this.choiceness.filter((n) => n.module === 34)[1] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 34)[1].list;
      }
    },
    // 优质好文
    quality: function () {
      if (this.choiceness.filter((n) => n.module === 36)[3] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 36)[3].list;
      }
    },
    // 大家都在看
    doucon: function () {
      if (this.choiceness.filter((n) => n.module === 36)[4] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 36)[4].list;
      }
    },
    // 新书榜
    newBook: function () {
      if (this.choiceness.filter((n) => n.module === 34)[2] == undefined) {
        return false;
      } else {
        return this.choiceness.filter((n) => n.module === 34)[2].list;
      }
    },
    // 用来侦听vuex中的变量
    cutShow: function () {
      return this.$store.state.cutShow;
    },
  },
  methods: {
    // 男生数据
    boyChoiceness: function () {
      this.axios
        .get(`https://apis.netstart.cn/yunyuedu/store/show.json`, {
          params: {
            type: "recommend",
            uuid: "f2cb32ff209f4010911a77a617add8c4",
          },
        })
        .then((res) => {
          this.choiceness = res.data.data.list;
          // console.log(this.choiceness);

          // 本周最强的数据
          if (this.week) {
            this.newWeek = this.week;
            this.newWeek = this.newWeek.splice(1, this.newWeek.length);
          }
        });
    },
    girlChoiceness: function () {
      this.axios
        .get(`https://apis.netstart.cn/yunyuedu/store/show.json`, {
          params: {
            type: "female_recommend",
            uuid: "b229b022871941fea35edc7aceeed1ab",
          },
        })
        .then((res) => {
          // console.log("女生");
          this.choiceness = res.data.data.list;
          // console.log(this.choiceness.filter((n) => n.module === 36)[4]);

          // 本周最强的数据
          if (this.week) {
            this.newWeek = this.week;
            this.newWeek = this.newWeek.splice(1, this.newWeek.length);
          }
        });
    },
    bookContent: function (val) {
      this.$router.push({
        path: `/book/${val.id}/title/${val.title}`,
      });
    },
  },
  watch: {
    cutShow: function () {
      if (this.cutShow) {
        this.boyChoiceness();
      } else {
        this.girlChoiceness();
      }
    },
  },
  created: function () {
    if (this.cutShow) {
      this.boyChoiceness();
    } else {
      this.girlChoiceness();
    }
  },
};
</script>

<style lang="less">
#app.dark {
  .choiceness-wicket {
    border-bottom: 1rem solid #333232;
  }
  .week-push {
    border-bottom: 1rem solid #333232;
  }
  .week-module {
    border-bottom: 1rem solid #333232;
  }
  .choiceness-list {
    border-bottom: 1rem solid #333232;
    p {
      color: #5d5d5d;
    }
  }
}
.book-city-choiceness {
  margin-top: 5rem;
  padding: 0 19.5rem;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20rem;
    line-height: 130rem;
    text-align: center;
    background-color: #39a9ed;
    border-radius: 5rem;
  }
  .choiceness-wicket {
    display: flex;
    justify-content: space-around;
    margin-top: 10rem;
    padding-bottom: 12rem;
    border-bottom: 1rem solid #cccccc6b;
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