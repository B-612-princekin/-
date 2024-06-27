<template>
<transition name="bookCatalogue">
  <div class="book-catalogue">
    <div class="book-catalogue-top">
      <i class="iconfont icon-xiangzuojiantou" @click="myReturn"></i>
      <div class="title">目录</div>
      <div></div>
    </div>
    <div class="book-catalogue-content" v-if="imgBox">
      <div class="imgBox" v-for="item in imgBox" :key="item.sourceUuid">
        <img
          :src="item.coverImage + '?imageView=1&type=webp&thumbnail=247x0'"
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
</transition>
</template>

<script>
export default {
  data() {
    return {
      BookCatalogueData: [],
      imgBox: [],
      flashbackShow: true,
    };
  },
  created: function () {
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/reader/book/info.json", {
        params: {
          source_uuid: this.$route.params.bookId,
        },
      })
      .then((res) => {
        this.BookCatalogueData = res.data.data.catalog;
        this.imgBox = [res.data.data.book];

      });
  },
  methods: {
    myReturn: function () {
      this.$router.go(-1);
    },
    skipChaptersArrangements: function (item) {
      this.$router.push({
        path: `/book/${this.imgBox[0].sourceUuid}/read/${item.uuid}`,
      });
    },
    myflashbackShow: function () {
      this.flashbackShow = !this.flashbackShow;
      this.BookCatalogueData.reverse();
    },
  },
  computed: {
    myLength: function () {
      return this.BookCatalogueData.length;
    },
  },
};
</script>

<style lang="less">
#app.dark{
  .book-catalogue {
  background: #2f2f2f;
  .book-catalogue-top {
    background: #2f2f2f;
    border-bottom: 1rem solid #363435;
    i {
      color: #67635b;
    }
    .title {
      color: #787878;
    }
  }
  .book-catalogue-content {
    .imgBox {
      img {
        box-shadow: 0rem 0rem 5rem #2f2f2f;
      }
      .right {
        h3 {
          color: #787878;
        }
        .name {
          color: #5a5650;
        }
      }
    }
    .book-catalogue-number {
      .left {
        color: #777777;
      }
      .right {
        color: #5e5e5e;
        border: 2rem solid #5e5e5e;
      }
    }
  }
  ul {
    li {
      color: #787878;
      border-bottom: 1rem dashed #444444;
      &.icon {
        color: #444444;
      }
      i {
        color: #3a3a3a;
      }
    }
  }
}
}
.book-catalogue {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 300;
  background: #fff;
  padding: 50rem 19.5rem 0;
  overflow: scroll;
  .book-catalogue-top {
    height: 50rem;
    width: 100vw;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1rem solid rgb(240, 240, 240);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18rem;
    padding: 0 19.5rem;
    z-index: 100;
    i {
      font-size: 19rem;
      color: #696560;
    }
    .title {
      color: #2a2a2a;
    }
  }
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
        border: 2rem solid #999999;
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
.bookCatalogue-enter {
  transform: translateX(100%);
  transition: all 0.3s;
}
.bookCatalogue-enter-active {
  transform: translateX(0);
  transition: all 0.3s;
}
.bookCatalogue-leave {
  transform: translateX(0);
  transition: all 0.3s;
}
.bookCatalogue-leave-active {
  transform: translateX(-100%);
  transition: all 0.3s;
}
</style>