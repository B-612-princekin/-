<template>
<transition name="chaptersArrangements">
  <div class="chapters-arrangements">
    <transition name="shade">
      <div class="chapters-arrangements-top" v-if="shade">
        <i class="iconfont icon-xiangzuojiantou" @click="skipChapters"></i>
        <div class="right">
          <i class="iconfont icon-pinglun"></i>
          <i class="iconfont icon-shuqian"></i>
        </div>
      </div>
    </transition>
    <template v-if="ChaptersArrangements">
      <div
        class="read"
        v-html="ChaptersArrangements"
        @click="shade = !shade"
      ></div>
    </template>
    <!-- 底部弹框 -->
    <transition name="shadeBom">
      <div class="chapters-arrangements-bottom" v-if="shade">
        <div class="up">第一章 夏乐</div>
        <div class="middle">
          <i class="iconfont icon-xiangzuojiantou" @click="previous"></i>
          <div class="input">
            <div class="inputBox">
              <div class="inputRead" ref="read"><div class="box"></div></div>
              <div class="unread"></div>
            </div>
            <input
              type="Range"
              v-model="value"
              :min="myMin"
              :max="myMax"
              @change="rangeChange"
            />
          </div>
          <i class="iconfont icon-xiangyoujiantou" @click="next"></i>
        </div>
        <div class="down">
          <ul>
            <li @click="catalogue">
              <i class="iconfont icon-gengduo1"></i>
              <span>目录</span>
            </li>
            <li>
              <i class="iconfont icon-shezhi1"></i>
              <span>设置</span>
            </li>
            <li v-if="!isDarkMode" @click="toggleDarkMode(!isDarkMode)">
              <i class="iconfont icon-moonyueliang"></i>
              <span>夜间</span>
            </li>
            <li v-else @click="toggleDarkMode(!isDarkMode)">
              <i class="iconfont icon-taiyang-copy"></i>
              <span>日间</span>
            </li>
            <li>
              <i class="iconfont icon-gengduo2"></i>
              <span>更多</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 目录 -->
    <transition name="mycatalog">
      <div class="chapters-catalog" v-if="catalog" @click.self="mycatalog">
        <div class="catalog">
          <div class="book-catalogue-content" v-if="imgBox">
            <div class="imgBox" v-for="item in imgBox" :key="item.sourceUuid" @click="bookContent(item)">
              <img
                :src="
                  item.coverImage + '?imageView=1&type=webp&thumbnail=247x0'
                "
                alt=""
              />
              <div class="right">
                <h3>{{ item.title }}</h3>
                <div class="name">{{ item.author }}</div>
              </div>
            </div>
            <div class="book-catalogue-number">
              <div class="left">共{{ myLength }}章</div>
              <div class="right" @click="myflashbackShow">
                <div class="flashback" v-if="flashbackShow">
                  倒叙
                  <i class="iconfont icon-shangla"></i>
                </div>
                <div class="positive" v-else>
                  正叙
                  <i class="iconfont icon-xiala"></i>
                </div>
              </div>
            </div>
          </div>
          <ul v-if="BookCatalogueData">
            <li
              v-for="item in BookCatalogueData"
              :key="item.uuid"
              :class="{ icon: item.needPay }"
              @click="skipChaptersArrangements(item)"
            >
              <span>{{ item.title }}</span>
              <i class="iconfont icon-lianxi2hebing-19" v-if="item.needPay"></i>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      ChaptersArrangements: "",
      shade: false,
      catalog: false,
      // 目录
      BookCatalogueData: false,
      imgBox: [],
      flashbackShow: true,

      value: 1,
      myMin: 1,
      myMax: 100,
    };
  },
  methods: {
    ...mapMutations(["toggleDarkMode"]),
    skipChapters: function () {
      this.$router.go(-1);
    },
    // input 拉条
    rangeChange: function () {
      this.$refs.read.style.width = (this.value / this.myMax) * 100 + "%";
      if (this.BookCatalogueData) {
        this.axios
          .get("https://apis.netstart.cn/yunyuedu/reader/book/content.json", {
            params: {
              source_uuid: this.$route.params.bookId,
              content_uuid: this.BookCatalogueData[this.value].secId,
            },
          })
          .then((res) => {
            if (res.data.data) {
              this.ChaptersArrangements = res.data.data.content;
            } else {
              Toast.fail("请登陆阅读");
            }
          });
      }
    },
    previous: function () {
      this.value = this.value > 1 ? this.value - 1 : this.value;
      this.rangeChange();
    },
    next: function () {
      this.value =
        this.value < this.BookCatalogueData.length
          ? this.value + 1
          : this.value;
      this.rangeChange();
    },
    bookContent: function (item) {
      this.$router.push({
        path: `/book/${item.sourceUuid}/title/${item.title}`,
      });
    },
    catalogue: function () {
      this.catalog = !this.catalog;
      this.shade = !this.shade;
    },
    mycatalog: function () {
      this.catalog = !this.catalog;
    },
    // 跳转章节
    skipChaptersArrangements: function (item) {
      // 更新路由
     this.$router.push({
          path: `/book/${this.$route.params.bookId}/read/${item.secId}`,
        });

      this.axios
        .get("https://apis.netstart.cn/yunyuedu/reader/book/content.json", {
          params: {
            source_uuid: this.$route.params.bookId,
            content_uuid: item.secId,
          },
        })
        .then((res) => {
          this.ChaptersArrangements = res.data.data.content;

          this.catalog = !this.catalog;
        });
    },
    myflashbackShow: function () {
      this.flashbackShow = !this.flashbackShow;
      this.BookCatalogueData.reverse();
    },
  },
  created: function () {
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/reader/book/content.json", {
        params: {
          source_uuid: this.$route.params.bookId,
          content_uuid: this.$route.params.contentId,
        },
      })
      .then((res) => {
        this.ChaptersArrangements = res.data.data.content;
      });
    // 目录
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/reader/book/info.json", {
        params: {
          source_uuid: this.$route.params.bookId,
        },
      })
      .then((res) => {
        this.BookCatalogueData = res.data.data.catalog;
        this.imgBox = [res.data.data.book];

        this.myMax = this.BookCatalogueData.length;
      });
  },
  computed: {
    ...mapState(["isDarkMode"]),
    myLength: function () {
      return this.BookCatalogueData.length;
    },
  },
};
</script>

<style lang="less">
#app.dark{
  .chapters-arrangements {
  background: #1e2326;
  .chapters-arrangements-top {
    background: #333333;
    color: #63625d;
  }
  .chapters-arrangements-bottom {
    background: #333333;
    .up {
      color: #646464;
    }
    .middle {
      i {
        color: #959595;
      }
      .input {
        .inputBox {
          background: #525252;
          .inputRead {
            background: #ff585b;
            .box {
              background: #c2c2c2;
              box-shadow: 0rem 0rem 5rem 0rem #5e5e5e;
              &::before {
                background: #ff585b;
              }
            }
          }
        }
      }
    }
    .down {
      ul {
        li {
          i {
            color: #5c5c5c;
          }
          span {
            color: #5c5c5c;
          }
        }
      }
    }
  }
  .chapters-catalog {
    background: rgba(0, 0, 0, 0.3);
    .catalog {
      background: #2e2e2e;
      .book-catalogue-content {
        .imgBox {
          img {
            box-shadow: 0rem 0rem 5rem #0000002e;
          }
          .right {
            h3 {
              color: #757575;
            }
            .name {
              color: #54504a;
            }
          }
        }
        .book-catalogue-number {
          .left {
            color: #757575;
          }
          .right {
            color: #5c5c5c;
            border: 1rem solid #5c5c5c;
          }
        }
      }
      ul {
        li {
          color: #757575;
          border-bottom: 1rem dashed #424242;
          &.icon {
            color: #424242;
          }
          i {
            color: #424242;
          }
        }
      }
    }
  }
  .read {
    color: #757575;
  }
}
}
.chapters-arrangements {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 300;
  background: #f7f7f7;
  overflow: scroll;
  .chapters-arrangements-top {
    position: fixed;
    width: 100vw;
    height: 50rem;
    background: #fff;
    padding: 0 19.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18rem;
    color: #767570;
    .right {
      display: flex;
      align-items: center;
      i {
        &:nth-child(1) {
          font-size: 20rem;
          margin-right: 30rem;
        }
      }
    }
  }
  .chapters-arrangements-bottom {
    width: 100vw;
    height: 166rem;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25rem 19.5rem 15rem;
    .up {
      text-align: center;
      font-size: 14rem;
      color: #838383;
    }
    .middle {
      display: flex;
      justify-content: space-between;
      i {
        font-size: 15rem;
        color: #9b9b9b;
      }
      .input {
        flex: 1;
        margin: 0 28rem;
        position: relative;
        display: flex;
        align-items: center;
        .inputBox {
          width: 100%;
          height: 3rem;
          background: #9d9a90;
          margin: 0 auto;
          margin-bottom: 9rem;
          display: flex;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: -1;
          .inputRead {
            width: 0%;
            height: 100%;
            background: #ff585b;
            position: relative;
            .box {
              position: absolute;
              right: 0;
              top: 0;
              width: 17rem;
              height: 17rem;
              transform: translate(100%, -35%);
              border-radius: 50%;
              background: #fff;
              box-shadow: 0rem 0rem 5rem 0rem #5e5e5e;
              &::before {
                content: "";
                display: inline-block;
                width: 50%;
                height: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ff585b;
                border-radius: 50%;
              }
            }
          }
          .unread {
            height: 100%;
            flex: 1;
          }
        }
        input {
          width: 100%;
          opacity: 0;
        }
      }
    }
    .down {
      ul {
        display: flex;
        justify-content: space-between;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 15rem;
            color: #aaaaaa;
          }
          span {
            font-size: 20rem;
            color: #9c9c9c;
            transform: scale(0.5);
          }
        }
      }
    }
  }
  .chapters-catalog {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    .catalog {
      position: absolute;
      top: 0;
      left: 0;
      width: 312rem;
      height: 100vh;
      background: #fff;
      padding: 0 19.5rem;
      overflow: scroll;
      .book-catalogue-content {
        .imgBox {
          display: flex;
          margin-top: 28rem;
          img {
            width: 66rem;
            height: 83rem;
            box-shadow: 0rem 0rem 5rem #0000002e;
          }
          .right {
            margin-left: 27rem;
            h3 {
              font-size: 15rem;
              color: #4c4c4c;
              margin-bottom: 12rem;
            }
            .name {
              font-size: 12rem;
              color: #bebebe;
            }
          }
        }
        .book-catalogue-number {
          display: flex;
          justify-content: space-between;
          margin-top: 30rem;
          .left {
            font-size: 14rem;
            color: #292929;
          }
          .right {
            height: 22rem;
            font-size: 12rem;
            color: #b1b1b1;
            padding: 3rem 8rem 5rem 7rem;
            border: 1rem solid #999999;
            border-radius: 22rem;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 6rem;
            }
          }
        }
      }
      ul {
        margin-top: 20rem;
        li {
          font-size: 14rem;
          color: #2d2d2d;
          padding: 17rem 11rem 17rem 0;
          border-bottom: 1rem dashed #dddddd;
          display: flex;
          justify-content: space-between;
          &.icon {
            color: #c3c3c3;
          }
          i {
            font-size: 16rem;
            color: #c3c3c3;
          }
        }
      }
    }
  }
  .read {
    padding: 0 19.5rem;
    color: #222222;
    box-sizing: border-box;
    // column-width: 100vw;
    // column-gap: 30rem;
    h1 {
      margin: 15vh 0;
      font-size: 27rem;
    }
    p {
      line-height: 2em;
      text-indent: 2em;
      font-size: 20rem;
      margin: 1em 0;
    }
  }
}
// 头部
.shade-enter,
.shade-leave-to {
  transform: translateY(-100%);
  transition: all 0.3s;
}
.shade-enter-to,
.shade-leave {
  transform: translateY(0);
  transition: all 0.3s;
}
// 底部
.shadeBom-enter,
.shadeBom-leave-to {
  transform: translateY(100%);
  transition: all 0.3s;
}
.shadeBom-enter-to,
.shadeBom-leave {
  transform: translateY(0);
  transition: all 0.3s;
}
// 目录
.mycatalog-enter,
.mycatalog-leave-to {
  transform: translateX(-100%);
  transition: all 0.3s;
}
.mycatalog-enter-to,
.mycatalog-leave {
  transform: translateX(0);
  transition: all 0.3s;
}
// 进入组件动画
.chaptersArrangements-enter {
  transform: translateX(100%);
  transition: all 0.3s;
}
.chaptersArrangements-enter-active {
  transform: translateX(0);
  transition: all 0.3s;
}
.chaptersArrangements-leave {
  transform: translateX(0);
  transition: all 0.3s;
}
.chaptersArrangements-leave-active {
  transform: translateX(100%);
  transition: all 0.3s;
}
</style>