<template>
  <div class="classify-boy">
    <!-- 男生 -->
    <ul class="classify-boy-tabs">
      <li
        v-for="(item, index) in classifyBoyData"
        :key="index"
        @click="changes(index)"
        :class="{ icon: index == num }"
      >
        {{ item.name }}
      </li>
    </ul>
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
      classifyBoyData: [],
      newUrl: "",
      num: 0,
      newBoyData: [],
      // 数据请求
      catId: 7,
      wordCount: 0,
      pay: 0,
      bookStatus: 0,
      sort: 1,
      page: 1,
      // 下拉菜单
      xiala: true,
      xialaDate: [],
      wordCountNum: 0,
      payNum: 0,
      bookStatusNum: 0,
      sortNum: 0,
    };
  },
  methods: {
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
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json", {
          params: {
            catId: this.catId,
            wordCount: this.wordCount,
            pay: this.pay,
            bookStatus: this.bookStatus,
            sort: this.sort,
          },
        })
        .then((res) => {
          this.newBoyData = res.data.list;
        });
    },
    // 触底事件
    grounding: function () {
      // 获取文档滚动出去的高度
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 获取可视区的高度
      let clientHeight = document.documentElement.clientHeight;
      // 获取整个内容的高度
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page += 1;
        this.axios
          .get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json", {
            params: {
              catId: this.catId,
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
      if (this.xialaDate.length == 0) {
        return false;
      } else {
        return this.xialaDate.filter((n) => n.type === "pay")[0].catArray;
      }
    },
    boyBookStatus: function () {
      if (this.xialaDate.length == 0) {
        return false;
      } else {
        return this.xialaDate.filter((n) => n.type === "bookStatus")[0]
          .catArray;
      }
    },
    boyWordCount: function () {
      if (this.xialaDate.length == 0) {
        return false;
      } else {
        var newBoyWordCount = this.xialaDate.filter(
          (n) => n.type === "wordCount"
        )[0].catArray;
        return newBoyWordCount.splice(0, newBoyWordCount.length - 1);
      }
    },
    boySort: function () {
      if (this.xialaDate.length == 0) {
        return false;
      } else {
        return this.xialaDate.filter((n) => n.type === "sort")[0].catArray;
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
  mounted: function () {
    window.addEventListener("scroll", this.grounding);
  },
  beforeDestroy: function () {
    window.removeEventListener("scroll", this.grounding);
  },
  created: function () {
    this.axios
      // .get(
      //   "https://apis.netstart.cn/yunyuedu/store/info.json?type=male&bar=cat&uuid=244f55f3af7841c9a71dd912c1f6bc26"
      // )
      .get("https://apis.netstart.cn/yunyuedu/mergedCategroy.json")
      .then((res) => {
        this.classifyBoyData = res.data[0].cates;

        // 获取选项卡的数据
        this.newUrl = this.classifyBoyData[this.num].url;
        this.axios
          .get(`https://apis.netstart.cn/yunyuedu/${this.newUrl}`)
          .then((res) => {
            this.xialaDate = res.data.categories;
          });
      });
    // 分类页面书本内容
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json", {
        params: {
          catId: this.catId,
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
};
</script>

<style lang="less">
#app.dark{
  .classify-boy-tabs{
    background: #363435;
    li{
      color: #787878;
      &.icon {
        color: #a82612;
         &::after{
           color: #a62612;
         }
      }
    }
  }
  .pulldown{
    .left{
      color: #787878;
      span{
         &.pul-icon {
          color: #a02b16;
        }
        &:not(:last-child) {
          &::after {
            color: #5e5e5e;
          }
        }
      }
    }
    .right{
      border: 1rem solid #5e5e5e;
      .screen{
        color: #575757;
      }
      i{
        color: #5e5e5e;
      }
    }
  }
  .pulldown-content{
    li{
      color: #5e5e5e;
      span {
        &.pul-icon {
          color: #a02b16;
        }
        &:not(:last-child) {
          &::after {
            color: #707070;
          }
        }
      }
    }
  }
  .class-module{
    .widget-class-module{
      .title{
        color: #787878;
      }
      .name{
        color: #5e5e5e;
      }
    }
  }
}
.classify-boy {
  .classify-boy-tabs {
    list-style: none;
    display: flex;
    background: #f5f5f5;
    display: flex;
    flex-wrap: wrap;
    padding: 7rem 19.5rem;
    li {
      padding: 5rem 0rem;
      margin: 7rem 11rem;
      position: relative;
      font-size: 14rem;
      color: #222222;
      &.icon {
        color: #f93b17;
        &::after {
          content: "";
          display: block;
          width: 50%;
          height: 3rem;
          background: #f93b17;
          border-radius: 3rem;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
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
    justify-content: space-between;
  }
}
</style>