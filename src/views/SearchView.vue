<template>
  <div class="search-view">
    <!-- 搜索页面 -->
    <div class="search-view-top">
      <div class="input">
        <i
          class="iconfont icon-tubiaozhizuomoban_sousuo"
          @click="consequence"
        ></i>
        <input
          type="text"
          placeholder="赘婿出山"
          v-model="value"
          @keydown.enter="consequence"
        />
        <i class="iconfont icon-shanchu2" v-if="value" @click="value = ''"></i>
      </div>
      <span @click="searchReturn">取消</span>
    </div>
    <!-- 搜索结果页面 -->
    <template v-if="resultShow">
      <div class="search-result">
        <div class="search-result-center">
          <WidgetAcross
            v-for="item in searchresult"
            :key="item.bookId"
            :item="item"
          ></WidgetAcross>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 搜索关键字页面 -->
      <div class="search-suggest" v-if="suggestShow">
        <ul v-if="suggest && suggestOne">
          <li @click="consequence">
            <i class="iconfont icon-sousuo"></i>
            <span>搜索 “{{ value }}”</span>
          </li>
          <li
            v-for="item in suggestOne"
            :key="item.id"
            @click="bookContent(item)"
          >
            <div class="img">
              <img
                :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'"
                alt=""
              />
              <div class="right">
                <span class="title">{{ item.text }}</span>
                <div class="author">{{ item.author }}</div>
                <div class="text">{{ item.d }}</div>
              </div>
            </div>
          </li>
          <li v-for="item in suggest" :key="item.id" @click="bookContent(item)">
            <i class="iconfont icon-shu"></i>
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <!-- 热门搜索、最近搜索 -->
      <div class="search-view-center" v-else>
        <div class="hot-search">
          <h3>热门搜索</h3>
          <ul>
            <li v-for="(item, index) in searchData" :key="item.id">
              <span>{{ index + 1 }}</span>
              <div class="name">{{ item.name }}</div>
            </li>
          </ul>
        </div>
        <div class="recent-search">
          <h3>
            最近搜索
            <i class="iconfont icon-shanchu"></i>
          </h3>
          <ol>
            <li v-for="(item, index) in recentSearch" :key="index">
              <i class="iconfont icon-sousuo"></i>
              {{ item }}
            </li>
          </ol>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import WidgetAcross from "../widget/WidgetAcross.vue";
export default {
  components: { WidgetAcross },
  data() {
    return {
      value: "",
      // 热门搜索
      searchData: [],
      // 历史搜索
      recentSearch: ["人间值得", "在荒岛求生的日子", "上门女婿", "巅峰"],
      // 搜索关键字数据
      suggest: [],
      // 搜索关键字第一条
      suggestOne: [],
      // 搜索关键字
      suggestShow: false,
      // 搜索结果
      resultShow: false,
      // 搜索结果参数
      keyword: "人间值得",
      page: 2,
      sort: 0,
      channel: 0,
      bookStatus: 0,
      pay: 0,
      wordCount: 0,
      searchresult: [],
    };
  },
  methods: {
    searchReturn: function () {
      this.$router.go(-1);
    },
    bookContent: function (value) {
      // this.$store.
      this.$router.push({ path: `/book/${value.id}/title/${value.title}` });
    },
    consequence: function () {
      this.resultShow = true;
      this.keyword = this.value;
      // 搜索结果
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/search/book.json", {
          params: {
            keyword: this.keyword,
            page: this.page,
            sort: this.sort,
            channel: this.channel,
            bookStatus: this.bookStatus,
            pay: this.pay,
            wordCount: this.wordCount,
          },
        })
        .then((res) => {
          this.searchresult = res.data.data.books;
        });
    },
  },
  watch: {
    value: function () {
      if (this.value) {
        this.suggestShow = true;
        this.axios
          .get("https://apis.netstart.cn/yunyuedu/search/searchHint", {
            params: {
              search: this.value,
            },
          })
          .then((res) => {
            // console.log(res.data.words.w);
            var newArr = res.data.words.w;
            this.suggest = newArr.splice(1, newArr.length);
            this.suggestOne = newArr.splice(0, 1);
          });
      } else {
        this.suggestShow = false;
        this.resultShow = false;
      }
    },
  },
  created: function () {
    // 热门搜索
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/search/getHotWords")
      .then((res) => {
        // console.log(res.data.list);
        this.searchData = res.data.list;
      });
  },
};
</script>

<style lang="less" scoped>
#app.dark {
  .search-view {
    background: #2f2f2f;
    .search-view-top {
      background: #2f2f2f;
      .input {
        background: #343434;
        input {
          color: #878787;
        }
        i {
          color: #737373;
        }
      }
      span {
        color: #5e5e5e;
      }
    }
    .search-view-center {
      .hot-search {
        h3 {
          color: #787878;
        }
        ul {
          li {
            &:nth-child(1) span {
              background: #a62612;
            }
            &:nth-child(2) span {
              background: #b84800;
            }
            &:nth-child(3) span {
              background: #a97900;
            }
            span {
              background-color: #5e5e5e;
              color: #999999;
            }
            .name {
              color: #5e5e5e;
            }
          }
        }
      }
    }
    .recent-search {
      h3 {
        color: #787878;
        i {
          color: #787878;
        }
      }
      ol {
        li {
          background: #343434;
          color: #5e5e5e;
          i {
            color: #646464;
          }
        }
      }
    }
    .search-suggest {
      background: #2b2c30;
      ul {
        li {
          border-bottom: 1rem solid #222222;
          i {
            color: #666666;
          }
          span {
            color: #797979;
          }
          .img {
            .right {
              .title {
                color: #787878;
              }
              .author {
                color: #515151;
              }
              .text {
                color: #515151;
              }
            }
          }
        }
      }
    }
    .search-result {
    background: #2f2f2f;
  }
  }
}
.search-view {
  background: #f7f7f7;
  position: fixed;

  height: 100%;
  width: 100%;
  z-index: 300;

  .search-view-top {
    padding: 0 19.5rem;
    height: 50rem;
    background: #fff;
    display: flex;
    align-items: center;
    .input {
      flex: 1;
      background: #f0f0f0;
      height: 32rem;
      border-radius: 32rem;
      padding: 0 9rem;
      display: flex;
      align-items: center;
      input {
        flex: 1;
        background: none;
        outline: none;
        border: none;
        margin-left: 5rem;
        color: #121212;
      }
      i {
        color: #cdcdcd;
        font-size: 17rem;
        &:nth-child(3) {
          font-size: 20rem;
        }
      }
    }
    span {
      margin-left: 18rem;
      font-size: 15rem;
      color: #7d7d7d;
    }
  }
  .search-view-center {
    padding: 0 19.5rem;
    .hot-search {
      h3 {
        font-size: 14rem;
        color: #847d74;
        margin: 23rem 0;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          flex: 50%;
          display: flex;
          align-items: center;
          margin-bottom: 22rem;
          padding-right: 40rem;
          &:nth-child(1) span {
            background: #f93b17;
          }
          &:nth-child(2) span {
            background: #ff6e00;
          }
          &:nth-child(3) span {
            background: #ffba00;
          }
          span {
            width: 18rem;
            height: 18rem;
            border-radius: 50%;
            background-color: #d9d9d9;
            text-align: center;
            line-height: 18rem;
            font-size: 12rem;
            color: #fcfcfc;
            margin-right: 11rem;
          }
          .name {
            font-size: 14rem;
            color: #121212;

            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
  .recent-search {
    h3 {
      display: flex;
      justify-content: space-between;
      margin: 23rem 0;
      font-size: 14rem;
      color: #817a72;
      i {
        font-size: 17rem;
        color: #a2a2a2;
      }
    }
    ol {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 32rem;
        border-radius: 32rem;
        padding: 8rem 11rem;
        background: #f0f0f0;
        font-size: 14rem;
        color: #2d2d2d;
        margin-right: 16rem;
        margin-bottom: 16rem;

        display: flex;
        align-items: center;
        i {
          font-size: 13rem;
          color: #7d7d7d;
          margin-right: 5rem;
        }
      }
    }
  }
  .search-suggest {
    background: #f7f7f7;
    width: 100vw;
    height: 100vh;
    padding: 0 19.5rem;
    ul {
      li {
        padding: 17rem 0;
        border-bottom: 1rem solid #f3f0ec;
        display: flex;
        align-items: center;
        font-size: 16rem;
        i {
          color: #c3c3c2;
        }
        span {
          margin-left: 12rem;
          color: #2a2a29;
        }
        .img {
          display: flex;
          img {
            width: 58rem;
            height: 74rem;
          }
          .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 11rem;
            .title {
              margin: 0;
              font-size: 16rem;
              color: #1a1a1a;
            }
            .author {
              font-size: 12rem;
              color: #bcbbb9;
            }
            .text {
              font-size: 12rem;
              color: #bcbbb9;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  .search-result {
    background: #f7f7f7;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    .search-result-center {
      padding: 20rem 19.5rem 50rem;
    }
  }
}
</style>