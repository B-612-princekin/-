<template>
  <div class="ranking-list-cmp" @scroll="grounding" ref="ranking">
    <ul>
      <li
        v-for="(item, index) in rankingList.subNavis"
        :key="index"
        :class="{
          icon:
            item.naviInfos[0].url.substring(
              item.naviInfos[0].url.indexOf('rankType=') + 9,
              item.naviInfos[0].url.indexOf('&uuid')
            ) == classNum,
        }"
        @click="switchover(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="ranking-module">
      <RankingAcross
        v-for="(item, index) in listData"
        :key="index"
        :item="item"
        :index="index"
      ></RankingAcross>
    </div>
  </div>
</template>

<script>
import RankingAcross from "../widget/RankingAcross.vue";
export default {
  components: { RankingAcross },
  data() {
    return {
      rankingList: false,
      // 榜单url中的rankType值
      classNum: 0,
      // 榜单url中的uuid
      myBookId:"",
      listData: false,
      all:0
    };
  },
 
  methods: {
    switchover: function (val) {
      // console.log(val.naviInfos[0].url);
      var myUrl = val.naviInfos[0].url;
      this.classNum = myUrl.substring(
        myUrl.indexOf("rankType=") + 9,
        myUrl.indexOf("&uuid")
      );
      this.myBookId = myUrl.substring(
        myUrl.indexOf("&uuid=") + 6,
        myUrl.indexOf("&all")
      );
      this.$router.push({path:`/book/${this.myBookId}/list/${this.classNum}/${this.$route.meta}`})
      // 获取书本信息
      this.axios
        .get("https://apis.netstart.cn/yunyuedu" + val.naviInfos[0].url)
        .then((res) => {
          console.log(res.data.list);
          this.listData = res.data.list;
        });
    },
    getBook:function(){
      // 获取书本信息
    this.axios
      .get(
        "https://apis.netstart.cn/yunyuedu/store/rankList.json",
        {
          params: {
            rankType: this.$route.params.rankType,
            uuid: this.$route.params.bookId,
            all: 0,
          },
        }
      )
      .then((res) => {
        this.listData = res.data.list;
      });
    },
     grounding: function () {
      // 获取文档滚动出去的高度
      let scrollTop = this.$refs.ranking.scrollTop;
      // 获取可视区的高度
      let clientHeight = this.$refs.ranking.clientHeight;
      // 获取整个内容的高度
      let scrollHeight = this.$refs.ranking.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight && this.listData) {
        this.all += 20;
        this.axios
          .get(
            "https://apis.netstart.cn/yunyuedu/store/rankList.json",
            {
              params: {
                rankType: this.$route.params.rankType,
                uuid: this.$route.params.bookId,
                all:this.all,
              },
            }
          )
          .then((res) => {
            // console.log(res.data.list);
            let newArr = res.data.list;
            this.listData.push(...newArr);
          }).catch((err)=>{
            console.log(err);
          })
      }
    },
  },
  watch:{
    $route:function(){
      // 每次路由发生变化时重置all
      this.all = 0;
      // 重置listData数组
      this.getBook();
    }
  },
   // keep-alive 的生命周期钩子，进入时调用
  activated() {
    // li之间点击切换时rankType会冲突，所以进入组件时修改路由
    this.$router.push({
      path: `/book/017de2274aa5400e9dabe30f173e98d9/list/35/${this.$route.meta}`,
    });
  },
  created: function () {
    // 获取榜单
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/store/merged/rankNavi.json", {
        params: {
          uuid: "017de2274aa5400e9dabe30f173e98d9",
          rankType: 35,
        },
      })
      .then((res) => {
        // console.log(res);
        this.rankingList = res.data.data.list[1];

        // 进入排行榜默认选中人气榜
        var myUrl = this.rankingList.subNavis[0].naviInfos[0].url;
        this.classNum = myUrl.substring(
          myUrl.indexOf("rankType=") + 9,
          myUrl.indexOf("&uuid")
        );
      });
    // 获取书本信息
    this.getBook();
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .ranking-list-cmp {
    ul {
      border-right: 1rem solid #3b3b3b;
      background: #2f2f2f;
      li {
        color: #787878;
        &.icon {
          color: #a62612;
          &::after {
            background: #c1262f;
          }
        }
      }
    }
  }
}
.ranking-list-cmp {
  overflow-y: scroll;
  height: 100vh;
  ul {
    position: fixed;
    height: 100vh;
    width: 78rem;
    border-right: 1rem solid #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    li {
      margin-top: 45rem;
      font-size: 14rem;
      color: #b6b6b6;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &.icon {
        color: #ff585c;
        position: relative;
        &::after {
          content: "";
          display: inline-block;
          width: 2rem;
          height: 70%;
          background: #ff585c;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-41%);
          border-radius: 1rem;
        }
      }
    }
  }
  .ranking-module {
    padding-left: 78rem;
    padding-right: 19.5rem;
    padding-bottom: 50rem;
    // height: 200rem;
    width: 100%;
    // background: #ccc;
  }
}
</style>