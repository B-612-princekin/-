<template>
<transition name="bookContent">
  <div class="book-content">
    <div class="book-content-head">
      <i class="iconfont icon-xiangzuojiantou" @click="myReturn"></i>
      <i class="iconfont icon-fenxiang"></i>
    </div>

    <div class="book-content-top">
      <!-- 书本详情 -->
      <div
        class="book-particulars"
        v-for="item in bookContentData"
        :key="item.id"
      >
        <img
          :src="item.link[2].href + '?imageView=1&type=webp&thumbnail=247x0'"
          alt=""
        />
        <div class="right">
          <div class="title">{{ item.title }}</div>
          <div class="name">
            <span>{{ item["pris:book"].category }}</span
            >{{ item.author.name }}
          </div>
          <div class="grade">
            <div
              class="img"
              v-for="(aaa, index) in 5"
              :key="index"
              :class="{ icon: index <= grade }"
            ></div>
          </div>
          <div class="number">
            <div class="word">{{ words }}万字</div>
            <div class="click">
              {{ item["pris:subscribe"].clicksCount }}点击
            </div>
          </div>
          <div class="prive">{{ item["pris:book"].wprice }}阅点/千字</div>
        </div>
      </div>
      <!-- 下拉菜单 -->
      <div class="book-gist" v-if="bookContentData[0]">
        <div class="summary">
          <div class="text" :class="{ icon: !summaryShow }">
            {{ bookContentData[0].summary }}
          </div>
          <i
            class="iconfont icon-xialajiantou"
            v-if="!summaryShow"
            @click="summaryShow = !summaryShow"
          ></i>
        </div>
        <div class="information" v-if="summaryShow">
          <div class="impower">
            授权方：<span>{{
              bookContentData[0]["pris:book"].authorizer
            }}</span>
          </div>
          <div class="type">
            作品类型：<span>{{ bookContentData[0]["pris:book"].paydesc }}</span>
          </div>
        </div>
      </div>
      <!-- 连载中...  -->
      <div class="book-list" @click="skipBookCatalogue">
        <i class="iconfont icon-gengduo1"></i>
        <div class="ctr">
          <span class="date">{{ updata.update | dateUpdate }}</span>
          <span class="section">更至：{{ updata.latestArticleTitle }}</span>
        </div>
        <div class="rgt">
          <span>连载中</span>
          <i class="iconfont icon-jinrujiantou"></i>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="book-discuss">
      <div class="book-discuss-top">
        <h4>评论</h4>
        <div class="btn">
          <i class="iconfont icon-xie"></i>
          写评论
        </div>
      </div>
      <ul>
        <li v-for="item in comment" :key="item.commentId">
          <img
            :src="item.avatar + '?imageView=1&type=webp&thumbnail=247x0'"
            @error="changeImg($event)"
            alt=""
          />
          <div class="right">
            <div class="top">
              <div class="nameBox">
                <div class="name">
                  {{ item.nickName }}
                  <span v-if="item.userLevel">LV.{{ item.userLevel }}</span>
                </div>
                <div class="star">
                  <template v-if="item.grade">
                    <div
                      class="img"
                      v-for="(mystar, index) in 5"
                      :class="{ icon: index <= item.grade }"
                      :key="index"
                    ></div>
                  </template>
                  <div class="starDate">
                    {{ item.time | starTime }}
                  </div>
                </div>
              </div>
              <div class="praise">
                <span v-if="item.likes != 0">{{ item.likes }}</span>
                <i class="iconfont icon-dianzan"></i>
              </div>
            </div>
            <div class="remark">
              {{ item.comment }}
              <div class="wonderful" v-if="item.select">
                <span>{{ item.select | selectFront }}</span>
                {{ item.select | selectRear }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ul class="book-content-base">
      <li>加入书架</li>
      <li>购买</li>
      <li @click="oneSkipBookCatalogue">免费试读</li>
    </ul>
  </div>
</transition>
</template>

<script>
import "@/assets/animate.min.css";
export default {
  data() {
    return {
      // 书本详情
      bookContentData: [],
      // 最新章节
      updata: [],
      // 评论
      comment: [],
      // 书本章节
      BookCatalogueData: [],
      summaryShow: false,
    };
  },
  filters: {
    dateUpdate: function (value) {
      let starTime = new Date(value);
      let month = starTime.getMonth() + 1;
      let day = starTime.getDate();

      month = month >= 10 ? month : "0" + month;
      day = day >= 10 ? day : "0" + day;
      return month + "月" + day + "日";
    },
    starTime: function (value) {
      let starTime = new Date(value);
      let month = starTime.getMonth() + 1;
      let day = starTime.getDate();
      let myTime = starTime.getHours();
      let min = starTime.getMinutes();

      month = month >= 10 ? month : "0" + month;
      day = day >= 10 ? day : "0" + day;
      myTime = myTime >= 10 ? myTime : "0" + myTime;
      min = min >= 10 ? min : "0" + min;
      return month + "月" + day + "日" + " " + myTime + ":" + min;
    },
    selectFront: function (value) {
      value = value.substring(1, 5);
      return value;
    },
    selectRear: function (value) {
      value = value.substring(6, value.length);
      return value;
    },
  },
  methods: {
    myReturn: function () {
      this.$router.go(-1);
    },
    changeImg(e) {
      e.target.src = require("../assets/tx-default.png");
    },
    skipBookCatalogue: function () {
      this.$router.push({
        path: `/book/${this.bookContentData[0].id}/content`,
      });
    },
    oneSkipBookCatalogue: function () {
      if (this.BookCatalogueData[0]) {
        this.$router.push({
          path: `/book/${this.bookContentData[0].id}/read/${this.BookCatalogueData[1].uuid}`,
        });
      }
    },
  },
  computed: {
    words: function () {
      return Math.round(this.bookContentData[0]["pris:book"].words / 1000) / 10;
    },
    grade: function () {
      return this.bookContentData[0]["pris:ranking"].value * 1;
    },
  },
  created: function () {
    // 书本详情
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/book/getsub.json", {
        params: {
          id: this.$route.params.bookId,
          title: this.$route.params.title,
        },
      })
      .then((res) => {
        this.bookContentData = [{ ...res.data.feed.entry }];
      });
    // 最新章节
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/book/simpleInfo.json", {
        params: {
          id: this.$route.params.bookId,
        },
      })
      .then((res) => {
        this.updata = res.data.item;
      });
    // 评论
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/comment/getComments.json", {
        params: {
          id: this.$route.params.bookId,
        },
      })
      .then((res) => {
        this.comment = res.data.all.list;
      });
    // 书本章节
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/reader/book/info.json", {
        params: {
          source_uuid: this.$route.params.bookId,
        },
      })
      .then((res) => {
        this.BookCatalogueData = res.data.data.catalog;
      });
  },
};
</script>

<style lang="less">
#app.dark {
  .book-content {
    background: #2f2f2f;
    .book-content-head {
      background: #2f2f2f;
      border-bottom: 1rem solid #363435;
      i {
        color: #67635b;
      }
    }
    .book-content-top {
      border-bottom: 8rem solid #363435;
      .book-particulars {
        .right {
          .title {
            color: #736f69;
          }
          .name {
            color: #0a5b78;
            span {
              color: #5a5650;
              &::after {
                color: #898886;
              }
            }
          }
          .number {
            color: #5a5650;
          }
          .prive {
            color: #5a5650;
          }
        }
      }
      .book-gist {
        color: #5a5650;
        border-bottom: 1rem solid #363435;
        .summary {
          i {
            color: #58544e;
          }
        }
        .information {
          .impower {
            color: #b2b1b0;
            span {
              color: #6ebdf3;
            }
          }
          .type {
            color: #a4a4a2;
          }
        }
      }
      .book-list {
        color: #736f67;
        .rgt {
          color: #4d5e4c;
          i {
            color: #59554d;
          }
        }
      }
    }

    .book-discuss {
      .book-discuss-top {
        h4 {
          color: #5f5e5a;
          &::before {
            background: #656660;
          }
        }
        .btn {
          color: #555452;
          border: 1rem solid #585856;
        }
      }
      ul {
        li {
          .right {
            .top {
              .nameBox {
                .name {
                  color: #2a5774;
                  span {
                    border: 1rem solid #5c3a3b;
                    color: #6c3c3c;
                  }
                }
                .star {
                  .starDate {
                    color: #5e5d5b;
                  }
                }
              }
              .praise {
                color: #71706b;
              }
            }
            .remark {
              color: #716d6c;
              .wonderful {
                span {
                  background: #83736b;
                  color: #ceb7aa;
                }
              }
            }
          }
        }
      }
    }

    .book-content-base {
      background: #2f2f2f;
      border-top: 1rem solid #2f2f2f;
      li {
        color: #7a7a7a;
        &:nth-child(1) {
          border-right: 1rem solid #2c2c2c;
          &::after {
            background: #323232;
          }
        }
        &:nth-child(3) {
          background: #b13638;
          color: #eda39a;
        }
      }
    }
  }
}
.book-content {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background: #fff;
  z-index: 300;
  .book-content-head {
    height: 50rem;
    width: 100%;
    padding: 0 19.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1rem solid #f6f6f6;
    position: fixed;
    top: 0;
    left: 0;
    i {
      font-size: 18rem;
      color: #676560;
    }
  }
  .book-content-top {
    padding: 50rem 19.5rem 0rem;
    // padding-bottom: 2000rem;
    border-bottom: 8rem solid #f5f5f5;
    .book-particulars {
      display: flex;
      margin-top: 5rem;
      img {
        width: 97rem;
        height: 137rem;
      }
      .right {
        margin-left: 15rem;
        .title {
          font-size: 16rem;
          color: #23221d;
        }
        .name {
          font-size: 12rem;
          color: #4fb0f4;
          margin-top: 13rem;
          span {
            color: #aba9a8;
            &::after {
              content: "|";
              display: inline-block;
              margin: 0 8rem;
              color: #898886;
            }
          }
        }
        .grade {
          //   font-size: 12rem;
          margin-top: 12rem;
          display: flex;

          .img {
            width: 12rem;
            height: 12rem;
            margin-right: 5rem;
            background: url("@/assets/star-dark.png");
            background-size: 100% 100%;
            background-position: center;
            &.icon {
              background: url("@/assets/star-light.png");
              background-size: 100% 100%;
              background-position: center;
            }
          }
        }
        .number {
          display: flex;
          font-size: 12rem;
          color: #969593;
          margin-top: 9rem;
          .word {
            margin-right: 19rem;
          }
        }
        .prive {
          font-size: 12rem;
          color: #b9b8b8;
          margin-top: 15rem;
        }
      }
    }
    .book-gist {
      font-size: 14rem;
      color: #9e9d9a;
      margin-top: 17rem;
      display: flex;
      flex-direction: column;
      border-bottom: 1rem solid #cccccc4a;
      padding-bottom: 18rem;
      .summary {
        display: flex;
        // justify-content: space-between;
        // align-items: flex-end;
        position: relative;
        .text {
          &.icon {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        i {
          font-size: 14rem;
          color: #aaa9a7;
          position: absolute;
          right: -5rem;
          bottom: 0;
        }
      }
      .information {
        margin-top: 20rem;
        font-size: 12rem;
        .impower {
          color: #b2b1b0;
          span {
            color: #6ebdf3;
          }
        }
        .type {
          color: #a4a4a2;
          margin: 10rem 0;
        }
      }
    }
    .book-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12rem;
      color: #23221f;
      padding: 15rem 0;
      .ctr {
        margin: 0 10rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        .date {
          margin-right: 6rem;
        }
      }
      .rgt {
        display: flex;
        align-items: center;
        color: #75c178;
        span {
          flex: 1;
          white-space: nowrap;
        }
        i {
          color: #9b9a98;
          margin-left: -5rem;
        }
      }
    }
  }
  .book-discuss {
    padding: 0 19.5rem 53rem;
    .book-discuss-top {
      display: flex;
      justify-content: space-between;
      margin-top: 16rem;
      h4 {
        font-size: 17rem;
        color: #65645f;
        display: flex;
        align-items: center;
        &::before {
          content: "";
          display: inline-block;
          width: 4rem;
          height: 13rem;
          background: #65645f;
          border-radius: 2rem;
          margin-right: 6rem;
        }
      }
      .btn {
        font-size: 14rem;
        color: #8f8e8a;
        display: flex;
        align-items: center;
        padding: 7rem 5rem;
        border: 1rem solid #65645f;
        border-radius: 3rem;
        i {
          margin-right: 7rem;
        }
      }
    }
    ul {
      margin-top: 36rem;
      li {
        display: flex;
        margin-bottom: 30rem;
        img {
          width: 40rem;
          height: 40rem;
          border-radius: 50%;
        }
        .right {
          margin-left: 15rem;
          flex: 1;
          .top {
            display: flex;
            justify-content: space-between;
            .nameBox {
              .name {
                font-size: 14rem;
                color: #4baef4;
                display: flex;
                align-items: center;
                span {
                  font-size: 12rem;
                  transform: scale(0.7);
                  border: 1rem solid #ff7a7a;
                  color: #ff7a7a;
                  padding: 1rem 3rem 2rem 2rem;
                  margin-left: 2rem;
                }
              }
              .star {
                font-size: 12rem;
                margin-top: 11rem;
                display: flex;
                align-items: center;
                .img {
                  width: 12rem;
                  height: 12rem;
                  margin-right: 5rem;
                  background: url("@/assets/star-dark.png");
                  background-size: 100% 100%;
                  background-position: center;
                  &.icon {
                    background: url("@/assets/star-light.png");
                    background-size: 100% 100%;
                    background-position: center;
                  }
                }
                .starDate {
                  color: #9a9997;
                }
              }
            }
            .praise {
              color: #999896;
              i {
                font-size: 14rem;
              }
              span {
                font-size: 10rem;
                margin-right: 5rem;
              }
            }
          }
          .remark {
            font-size: 14rem;
            color: #252422;
            margin-top: 10rem;
            .wonderful {
              margin-top: 11rem;
              span {
                display: inline-block;
                padding: 2rem 6rem;
                background: #ffe9d6;
                color: #ff9c4e;
                font-size: 12rem;
                border-radius: 3rem;
                margin-right: 15rem;
              }
            }
          }
        }
      }
    }
  }
  .book-content-base {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 52rem;
    width: 100vw;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1rem solid #f8f8f8;
    li {
      flex: 1;
      text-align: center;
      line-height: 52rem;
      font-size: 14rem;
      color: #6a6a6a;
      position: relative;
      &:nth-child(1) {
        border-right: 1rem solid #f6f6f6;
        &::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 50%;
          right: 0;
          height: 50%;
          width: 2rem;
          background: #d0d0d0;
          transform: translateY(-50%);
        }
      }
      &:nth-child(3) {
        background: #ff343f;
        color: #fbeff0;
      }
    }
  }
}
.bookContent-enter {
  transform: translateX(100%);
  transition: all 0.3s;
}
.bookContent-enter-active {
  transform: translateX(0);
  transition: all 0.3s;
}
.bookContent-leave {
  transform: translateY(0);
  transition: all 0.3s;
}
.bookContent-leave-active {
  transform: translateY(100%);
  transition: all 0.3s;
}
</style>