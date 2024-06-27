<template>
  <div class="voice-book" v-if="details">
    <audio ref="audio" style="display:none" src="https://easyreadfs.nosdn.127.net/5dced1b353c8412980850829a2126220.mp3"
      controls></audio>
    <div class="background-image" :style="`backgroundImage:url(${imgUrl})`"></div>
    <div class="voice-book-head">
      <i class="iconfont icon-xiangzuojiantou" @click="myReturn"></i>
      <span>{{ details.title }}</span>
      <i class="iconfont icon-gengduo2"></i>
    </div>
    <div class="voice-book-cnt">
      <div class="imgBox">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="book-message">
        <div class="top">
          <div>
            作者：<span v-if="details.author.name">{{
                details.author.name
            }}</span>
          </div>
          <div>
            主播：<span v-if="details['pris:book'].anchor">{{
                details["pris:book"].anchor
            }}</span>
          </div>
          <div>集数：{{ episodes }}</div>
          <div>
            每集价格：<span v-if="details['pris:book'].wprice">{{ details["pris:book"].wprice }}阅点</span>
          </div>
        </div>
        <div class="gist">
          <p>书本简介：</p>
          <div class="text">
            {{ details.content.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="play">
      <div class="play-top">
        <div class="inputBox">
          <div class="read">
            <div class="box"></div>
          </div>
          <div class="unread"></div>
        </div>
        <div class="time">
          <span>00:00</span>
          <span>00:00</span>
        </div>
      </div>
      <div class="play-bottom">
        <i class="iconfont icon-liebiao" @click="catalogueShow = true"></i>
        <i class="iconfont icon-shangyishoushangyige"></i>
        <i class="iconfont icon-bofang" v-if="isPlay" @click="isPlayFun"></i>
        <i class="iconfont icon-zanting" v-else @click="isPlayFun"></i>
        <i class="iconfont icon-xiayigexiayishou"></i>
        <i class="iconfont icon-miaobiao"></i>
      </div>
    </div>
    <div class="voice-book-base">
      <div><i class="iconfont icon-a-168-shu"></i>加入书架</div>
      <div><i class="iconfont icon-xiazai"></i>批量下载</div>
      <div><i class="iconfont icon-pinglun"></i>评论</div>
    </div>
    <transition name="shadeBom">
      <!-- 目录列表 -->
      <div class="catalogue" v-if="catalogueShow">
        <div class="catalogue-background" :style="`backgroundImage:url(${imgUrl})`"></div>
        <div class="catalogue-header">
          <div class="header-background" :style="`backgroundImage:url(${imgUrl})`"></div>
          <div class="header-left">
            <span>目录</span>
            <span class="catalogue-sort" v-if="sortShow" @click="sortFun">倒序</span>
            <span class="catalogue-sort" v-else @click="sortFun">正序</span>
          </div>
          <i class="iconfont icon-shanchu1" @click="catalogueShow = false"></i>
        </div>
        <ul class="catalogue-list">
          <li :class="{ 'catalogue-item': true, 'pay': (item.needPay == 1) }" v-for="(item, index) in catalogsList"
            :key="index">
            <div class="catalogue-item-left">
              <div class="label" v-if="item.needPay == 0">免费</div>
              <div class="label-fw" v-else>付费</div>
              <div class="catalogue-item-title">
                {{ item.title }}
              </div>
            </div>
            <i class="iconfont icon-xiazai"></i>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 书本详情
      details: false,
      // 音频列表
      mp3List: false,
      // 听书章节列表
      catalogsList: false,
      // 目录列表显示隐藏
      catalogueShow: false,
      // 目录列表正序倒序
      sortShow: true,
      imgUrl: "",
      isPlay: true
    };
  },
  methods: {
    myReturn: function () {
      this.$router.go(-1);
    },
    // 获取书本详情
    bookDetails: function () {
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/book/getsub.json", {
          params: {
            id: this.$route.params.audio,
            title: this.$route.params.title,
          },
        })
        .then((res) => {
          //   console.log(res.data.feed.entry);
          this.details = res.data.feed.entry;
          this.imgUrl =
            this.details.link[1].href +
            "?imageView=1&type=webp&thumbnail=247x0";
        });
    },
    // 获取音频列表
    audioList: function () {
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/ting/download.json")
        .then((res) => {
          // console.log("音频",res.data.data.urls);
          this.mp3List = res.data.data.urls;
        });
    },
    // 获取听书章节列表
    voiceBookList: function () {
      this.axios("https://apis.netstart.cn/yunyuedu/ting/catalog.json", {
        params: {
          sourceUuid: this.$route.params.audio,
        },
      }).then((res) => {
        // console.log(res.data.data.catalogs);
        this.catalogsList = res.data.data.catalogs;
      });
    },
    // 听书播放暂停
    isPlayFun:function(){
      this.isPlay = !this.isPlay
      if(!this.isPlay){
        this.$refs.audio.play();
      }else{
        this.$refs.audio.pause();
      }
    },
    // 目录正序倒叙
    sortFun: function () {
      this.sortShow = !this.sortShow
      this.catalogsList.reverse()
    }

  },
  computed: {
    episodes: function () {
      return this.catalogsList.length + "集";
    },
    audioSrc: function () {
      return this.catalogsList.filter((n) => { n.articleUuid == this.$route.params.audio })
    }
  },
  created: function () {
    // 获取书本详情
    this.bookDetails();
    // 获取音频列表
    this.audioList();
    // 获取听书章节列表
    this.voiceBookList();
  },
};
</script>

<style lang="less" scoped>
.voice-book {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #999;
  z-index: 300;

  audio {
    width: 100vw;
    height: 50px;
    z-index: 400;
    position: absolute;
    top: 0;
    left: 0;
  }

  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 200%;
    background-position: center center;
    filter: blur(60rem) saturate(50%);
    z-index: -1;
  }

  .voice-book-head {
    width: 100vw;
    height: 50rem;
    padding: 0 19.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18rem;

    span {
      color: #ffffff;
    }

    i {
      color: #dfddd7;
    }
  }

  .voice-book-cnt {
    padding: 0 19.5rem;

    .imgBox {
      margin-top: 30rem;
      margin-bottom: 70rem;
      text-align: center;

      img {
        width: 130rem;
        height: 182.09rem;
      }
    }

    .book-message {
      .top {
        display: flex;
        flex-wrap: wrap;

        div {
          flex-basis: 50%;
          color: #ffffff;
          font-size: 13rem;
          margin-bottom: 15rem;
        }
      }

      .gist {
        color: #878180;
        font-size: 13rem;
        line-height: 1.6em;

        .text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
      }
    }
  }

  .play {
    padding: 0 19.5rem;
    position: absolute;
    bottom: 60rem;
    left: 0;
    width: 100vw;
    margin-bottom: 20rem;

    .play-top {
      margin-bottom: 2rem;

      .inputBox {
        width: 95%;
        height: 3rem;
        background: #9d9a90;
        margin: 0 auto;
        margin-bottom: 9rem;
        display: flex;

        .read {
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
            transform: translate(50%, -35%);
            border-radius: 50%;
            background: #fff;

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
          // background: skyblue;
        }
      }

      .time {
        width: 100%;
        display: flex;
        justify-content: space-between;

        span {
          color: #fffeff;
        }
      }
    }

    .play-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      i {
        font-size: 20rem;
        color: #fff;

        &:nth-child(2) {
          font-size: 27rem;
        }

        &:nth-child(3) {
          font-size: 64rem;
        }

        &:nth-child(4) {
          font-size: 27rem;
        }
      }
    }
  }

  .voice-book-base {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60rem;
    width: 100vw;
    display: flex;
    border-top: 1rem solid rgba(250, 250, 250, 0.1);

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12rem;
      color: #fff;

      i {
        font-size: 20rem;
        margin-bottom: 8rem;
      }
    }
  }

  // 目录章节
  .catalogue {
    width: 100vw;
    height: 50vh;
    position: fixed;
    bottom: 0;
    background: #333;
    overflow-y: scroll;
    padding-top: 45rem;

    .catalogue-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background-repeat: no-repeat;
      background-size: 200%;
      background-position: center center;
      filter: blur(60rem) saturate(50%);
      z-index: -1;
    }

    .catalogue-header {
      width: 100%;
      height: 45rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rem 0 18rem;
      background: #333;
      border-bottom: 1rem solid rgba(250, 250, 250, 0.1);
      position: fixed;
      top: 50vh;
      left: 0;

      .header-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-repeat: no-repeat;
        background-size: 200%;
        background-position: center 0%;
        filter: blur(60rem) saturate(50%);
        z-index: -1;
      }

      .header-left {
        font-size: 15rem;
        color: #97928e;

        .catalogue-sort {
          font-size: 13rem;
          padding: 2rem 6rem;
          border: 1rem solid #afaea9;
          border-radius: 19rem;
          margin-left: 25rem;
        }
      }

      i {
        font-size: 12rem;
        color: #73726f;
      }

    }

    .catalogue-list {
      .catalogue-item {
        width: 100%;
        height: 45rem;
        border-bottom: 1rem solid rgba(250, 250, 250, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25rem 0 15rem;

        .catalogue-item-left {
          display: flex;

          .label {
            font-size: 10rem;
            color: #ffcece;
            padding: 1rem 2rem;
            background-color: #ff585b;
            border-radius: 2rem;
            margin-right: 5rem;
          }

          .label-fw {
            color: #5a544f;
            font-size: 10rem;
            padding: 1rem 2rem;
            border: 1rem solid #645e5a;
            border-radius: 2rem;
            margin-right: 5rem;
          }

          .catalogue-item-title {
            font-size: 14rem;
            color: #f3f3f2;
          }
        }

        i {
          font-size: 18rem;
          color: #cac9c8;
        }
      }

      .catalogue-item.pay {
        .catalogue-item-left {
          .catalogue-item-title {
            color: #675d59;
          }
        }

        i {
          color: #514f50;
        }
      }
    }
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
}
</style>

