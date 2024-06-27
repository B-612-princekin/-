<template>
  <div class="ranking-girl" v-if="rankingGirl" @scroll="grounding" ref="girl">
    <div class="ranking-publish-top">
      <i class="iconfont icon-xiangzuojiantou" @click="searchReturn"></i>
      <h3>{{ rankingGirl.title }}</h3>
      <div></div>
    </div>
    <!-- 下拉菜单 -->
    <div class="pulldown">
      <div class="left">
        <span
          v-for="(item, index) in boySort"
          :key="index"
          @click="mdSort(item.value, index)"
          :class="{ 'pul-icon': sortNum == index }"
          >{{ item.name }}</span
        >
      </div>
      <div class="right">
        <div class="screen" @click="xiala = !xiala">
          <i class="iconfont icon-xiala" v-if="xiala"></i>
          <i class="iconfont icon-shangla" v-else></i>
          筛选
        </div>
      </div>
    </div>
    <ul class="pulldown-content" v-if="!xiala">
      <li>
        <span
          v-for="(item, index) in boyPay"
          :key="index"
          @click="mdPay(item.value, index)"
          :class="{ 'pul-icon': payNum == index }"
          >{{ item.name }}</span
        >
      </li>

      <li>
        <span
          v-for="(item, index) in boyBookStatus"
          :key="index"
          @click="mdBookStatus(item.value, index)"
          :class="{ 'pul-icon': bookStatusNum == index }"
          >{{ item.name }}
        </span>
      </li>

      <li>
        <span
          v-for="(item, index) in boyWordCount"
          :key="index"
          @click="mdWordCount(item.value, index)"
          :class="{ 'pul-icon': wordCountNum == index }"
          >{{ item.name }}</span
        >
      </li>
      <li>
        <span @click="million" :class="{ 'pul-icon': wordCountNum == 4 }"
          >100万字以上</span
        >
      </li>
    </ul>
    <div class="class-module">
      <WidgetClassModule
        v-for="(item, index) in newBoyData"
        :key="index"
        :item="item"
      ></WidgetClassModule>
    </div>
  </div>
</template>

<script>
import WidgetClassModule from "../widget/WidgetClassModule.vue";
export default {
  components: { WidgetClassModule },
  data() {
    return {
      rankingGirl: false,
      newBoyData: false,
      // 数据请求
      catId: 7,
      wordCount: 0,
      pay: 0,
      bookStatus: 0,
      sort: 1,
      page: 1,
      // 下拉菜单
      xiala: true,
      wordCountNum: 0,
      payNum: 0,
      bookStatusNum: 0,
      sortNum: 0,
    };
  },
  methods: {
    searchReturn: function () {
      this.$router.push("/book-city/BookCityChoiceness");
    },
    // 修改选项卡
    changes: function (index) {
      this.num = index;
      this.newUrl = this.classifyBoyData[this.num].url;
    },
    // mdCatId:function(val){
    //   console.log(val);
    //   this.catId = val
    // },
    mdWordCount: function (val, index) {
      this.wordCountNum = index;
      this.wordCount = val;
    },
    mdPay: function (val, index) {
      this.payNum = index;
      this.pay = val;
    },
    mdBookStatus: function (val, index) {
      this.bookStatusNum = index;
      this.bookStatus = val;
    },
    mdSort: function (val, index) {
      this.sortNum = index;
      this.sort = val;
    },
    // 100万
    million: function () {
      this.wordCount = 4;
      this.wordCountNum = 4;
    },

    dataDemand: function () {
      // 分类页面书本内容
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json", {
          params: {
            catId: this.$route.params.catId,
            wordCount: this.wordCount,
            pay: this.pay,
            bookStatus: this.bookStatus,
            sort: this.sort,
            page: this.page,
          },
        })
        .then((res) => {
          this.newBoyData = res.data.list;
        });
    },
    // 触底事件
    grounding: function () {
      // 获取文档滚动出去的高度
      let scrollTop = this.$refs.girl.scrollTop;
      // 获取可视区的高度
      let clientHeight = this.$refs.girl.clientHeight;
      // 获取整个内容的高度
      let scrollHeight = this.$refs.girl.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page += 1;
        this.axios
          .get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json", {
            params: {
              catId: this.$route.params.catId,
              wordCount: this.wordCount,
              pay: this.pay,
              bookStatus: this.bookStatus,
              sort: this.sort,
              page: this.page,
            },
          })
          .then((res) => {
            let newArr = res.data.list;
            this.newBoyData.push(...newArr);
          });
      }
    },
  },
  computed: {
    boyPay: function () {
      if (this.rankingGirl.categories.length == 0) {
        return false;
      } else {
        return this.rankingGirl.categories.filter((n) => n.type === "pay")[0]
          .catArray;
      }
    },
    boyBookStatus: function () {
      if (this.rankingGirl.categories.length == 0) {
        return false;
      } else {
        return this.rankingGirl.categories.filter(
          (n) => n.type === "bookStatus"
        )[0].catArray;
      }
    },
    boyWordCount: function () {
      if (this.rankingGirl.categories.length == 0) {
        return false;
      } else {
        var newBoyWordCount = this.rankingGirl.categories.filter(
          (n) => n.type === "wordCount"
        )[0].catArray;
        return newBoyWordCount.splice(0, newBoyWordCount.length - 1);
      }
    },
    boySort: function () {
      if (this.rankingGirl.categories.length == 0) {
        return false;
      } else {
        return this.rankingGirl.categories.filter((n) => n.type === "sort")[0]
          .catArray;
      }
    },
  },
  watch: {
    // 选项卡的内容
    newUrl: function () {
      this.catId = this.newUrl.substring(
        this.newUrl.indexOf("catId=") + 6,
        this.newUrl.length
      );
      this.dataDemand();
    },
    wordCount: function () {
      this.dataDemand();
    },
    pay: function () {
      this.dataDemand();
    },
    bookStatus: function () {
      this.dataDemand();
    },
    sort: function () {
      this.dataDemand();
    },
  },
  created: function () {
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/source/v2/cat.json", {
        params: {
          catId: this.$route.params.catId,
        },
      })
      .then((res) => {
        this.rankingGirl = res.data;
        // console.log(this.rankingGirl.categories);
      });
    this.dataDemand();
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .ranking-girl {
    background: #2f2f2f;
    .ranking-publish-top {
      background: #2f2f2f;
      border-bottom: 1rem solid #353535;
      color: #787878;
      i{
        color: #646058;
      }
    }
    // 下拉菜单
    .pulldown {
      .left {
        color: #777777;
        span {
          &.pul-icon {
            color: #a32814;
          }
          &:not(:last-child) {
            &::after {
              color: #5e5e5e;
            }
          }
        }
      }
      .right {
        border: 1rem solid #5e5e5e;
        .screen {
          color: #585858;
        }
        i {
          color: #5e5e5e;
        }
      }
    }
    .pulldown-content {
      li {
        color: #5e5e5e;
        span {
          &.pul-icon {
            color: #a62612;
          }
          &:not(:last-child) {
            &::after {
              color: #5e5e5e;
            }
          }
        }
      }
    }
  }
}
.ranking-girl {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 300;
  padding-top: 50rem;
  overflow: scroll;
  .ranking-publish-top {
    height: 50rem;
    width: 100%;
    background: #fff;
    padding: 0 19.5rem;
    border-bottom: 1rem solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18rem;
    color: #62605a;
    position: fixed;
    top: 0;
    left: 0;
  }
  // 下拉菜单
  .pulldown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 47rem;
    padding: 0 19.5rem;
    .left {
      font-size: 15rem;
      color: #999999;
      span {
        &.pul-icon {
          color: #f94122;
        }
        &:not(:last-child) {
          &::after {
            content: "|";
            display: inline-block;
            margin: 0 10rem;
            color: #999999;
          }
        }
      }
    }
    .right {
      border: 1rem solid #cbcbcb;
      height: 22rem;
      border-radius: 22rem;
      padding: 0 7rem;
      .screen {
        height: 100%;
        font-size: 13rem;
        color: #cbcbcb;
        display: flex;
        align-items: center;
      }
      i {
        font-size: 6rem;
        color: #989898;
        margin-right: 5rem;
      }
    }
  }
  .pulldown-content {
    padding: 0 19.5rem;
    display: flex;
    flex-direction: column;
    li {
      margin: 13rem 0;
      font-size: 14rem;
      color: #797979;
      span {
        &.pul-icon {
          color: #f94122;
        }
        &:not(:last-child) {
          &::after {
            content: "·";
            display: inline-block;
            margin: 0 10rem;
            font-weight: 600;
            color: #9f9f9f;
          }
        }
      }
    }
  }
  .class-module {
    display: flex;
    flex-wrap: wrap;
    padding: 0 19.5rem;
  }
}
</style>