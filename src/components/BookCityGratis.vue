<template>
  <div class="book-city-gratis" v-if="gratis.length">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="carousel"
    >
      <van-swipe-item
        v-for="item in carousel"
        :key="item.id"
        @click="bookContent(item)"
        :style="`background:url(${item.cover}?imageView=1&type=webp&thumbnail=247x0);background-size: cover;
    background-position: center;`"
        >&nbsp;</van-swipe-item
      >
    </van-swipe>
    <!-- 限时免费 -->
    <div class="week-module">
      <MyTymz
        v-for="item in myTymz"
        :key="item.time_limit"
        :item="item"
      ></MyTymz>
    </div>
    <!-- 免费 -->
    <div class="week-module" v-if="goodBook">
      <WidgetTitle>好书专区</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetGratisAcross
          v-for="item in goodBook"
          :key="item.id"
          :item="item"
        ></WidgetGratisAcross>
      </div>
    </div>
    <div class="week-module" v-if="related">
      <WidgetTitle>猜你喜欢</WidgetTitle>
      <div class="week-faddish-across">
        <WidgetGratisAcross
          v-for="item in related"
          :key="item.id"
          :item="item"
        ></WidgetGratisAcross>
      </div>
    </div>
  </div>
  <van-skeleton title :row="3" v-else />
</template>

<script>
import MyTymz from "../widget/MyTymz.vue";
import WidgetGratisAcross from "../widget/WidgetGratisAcross.vue";
import WidgetTitle from "../widget/WidgetTitle.vue";
export default {
  components: { WidgetTitle, WidgetGratisAcross, MyTymz },
  data() {
    return {
      gratis: [],
    };
  },
  computed: {
    carousel: function () {
      if (this.gratis.filter((n) => n.module === 10)[0] == undefined) {
        return false;
      } else {
        return this.gratis.filter((n) => n.module === 10)[0].banners;
      }
    },
    // 限时免费
    myTymz: function () {
      if (this.gratis.filter((n) => n.module === 45)[0] == undefined) {
        return false;
      } else {
        return this.gratis.filter((n) => n.module === 45);
      }
    },
    // 好书专区
    goodBook: function () {
      if (this.gratis.filter((n) => n.module === 53)[0] == undefined) {
        return false;
      } else {
        return this.gratis.filter((n) => n.module === 53)[0].list;
      }
    },
    // 猜你喜欢
    related: function () {
      if (this.gratis.filter((n) => n.module === 36)[0] == undefined) {
        return false;
      } else {
        return this.gratis.filter((n) => n.module === 36)[0].list;
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
        .get(
          "https://apis.netstart.cn/yunyuedu/store/show.json?type=free&uuid=ea81f0be96a74d4fa7c674b9252a9ef4"
        )
        .then((res) => {
          this.gratis = res.data.data.list;
          // console.log(this.gratis.filter((n) => n.module === 45));
        });
    },
    girlChoiceness: function () {
      this.axios
        .get(
          "https://apis.netstart.cn/yunyuedu/store/show.json?type=female_free&uuid=19ef3f613db44231983a48a570fc0a9a"
        )
        .then((res) => {
          this.gratis = res.data.data.list;
          console.log(this.gratis.filter((n) => n.module === 45));
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
  .week-module {
    border-bottom: 1rem solid #333232;
  }
}
.book-city-gratis {
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
}
</style>