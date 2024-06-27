<template>
  <div class="book-city-boy" v-if="boy.length">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="boySlideshow"
    >
      <van-swipe-item
        v-for="item in boySlideshow"
        :key="item.id"
        @click="bookContent(item)"
        :style="`background:url(${item.cover}?imageView=1&type=webp&thumbnail=247x0);background-size: cover;
    background-position: center;`"
        >&nbsp;</van-swipe-item
      >
    </van-swipe>
    <div class="week-module" v-if="heavy">
      <WidgetTitle>重磅推荐</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in heavy"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="oneWeek">
      <WidgetTitle>一周热文</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in oneWeek"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="week-module" v-if="reader">
      <WidgetTitle>读者喜爱</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in reader"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="choiceness-list" v-if="popularity">
      <WidgetTitle>人气风云榜</WidgetTitle>
      <div class="big-endlong-lift">
        <WidgetBigEndlong
          v-for="(item, index) in popularity"
          :key="item.id"
          :item="item"
          :index="index"
        ></WidgetBigEndlong>
      </div>
      <p>
        <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
      </p>
    </div>

    <div class="week-module" v-if="wom">
      <WidgetTitle>口碑力荐</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetAcross
          v-for="item in wom"
          :key="item.id"
          :item="item"
        ></WidgetAcross>
      </div>
    </div>

    <div class="choiceness-list" v-if="finish">
      <WidgetTitle>完结榜·超人气爆款小说</WidgetTitle>
      <div class="big-endlong-lift">
        <WidgetBigEndlong
          v-for="(item, index) in finish"
          :key="item.id"
          :item="item"
          :index="index"
        ></WidgetBigEndlong>
      </div>
      <p>
        <span>查看榜单</span><i class="iconfont icon-youjiantou_huaban"></i>
      </p>
    </div>
  </div>
  <van-skeleton title :row="3" v-else />
</template>

<script>
import WidgetAcross from "../widget/WidgetAcross.vue";
import WidgetBigEndlong from "../widget/WidgetBigEndlong.vue";
import WidgetTitle from "../widget/WidgetTitle.vue";
export default {
  components: { WidgetTitle, WidgetAcross, WidgetBigEndlong },
  data() {
    return {
      boy: [],
    };
  },
  computed: {
    // 轮播图
    boySlideshow: function () {
      if (this.boy.filter((n) => n.module === 10)[0] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 10)[0].banners;
      }
    },
    // 重磅推荐
    heavy: function () {
      if (this.boy.filter((n) => n.module === 36)[0] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 36)[0].list;
      }
    },
    // 一周热文
    oneWeek: function () {
      if (this.boy.filter((n) => n.module === 36)[1] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 36)[1].list;
      }
    },
    // 读者喜爱
    reader: function () {
      if (this.boy.filter((n) => n.module === 36)[2] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 36)[2].list;
      }
    },
    // 人气风云榜
    popularity: function () {
      if (this.boy.filter((n) => n.module === 34)[0] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 34)[0].list;
      }
    },
    // 口碑力荐
    wom: function () {
      if (this.boy.filter((n) => n.module === 36)[3] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 36)[3].list;
      }
    },
    // 完结榜

    finish: function () {
      if (this.boy.filter((n) => n.module === 34)[0] == undefined ) {
        return false;
      } else {
        return this.boy.filter((n) => n.module === 34)[0].list;
      }
    },
  },
  created: function () {
    this.axios
      .get(
        "https://apis.netstart.cn/yunyuedu/store/show.json?type=male&uuid=ca03da7b64ca443ab25ec3b662fa91e2"
      )
      .then((res) => {
        this.boy = res.data.data.list;
        console.log();
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
#app.dark{
  .week-module {
    border-bottom: 1rem solid #333232;
  }
}
.book-city-boy {
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
}
</style>