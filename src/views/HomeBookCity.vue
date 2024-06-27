<template>
  <div class="home-book-city" @scroll="bookCity" ref="bookCity">
    <!-- 书城 -->
    <div class="home-book-city-top" v-if="cityTop">
      <div class="cut" @click="$store.commit('alterCutShow')">
        <i class="boy iconfont icon-nan" v-if="this.$store.state.cutShow"></i>
        <i class="girl iconfont icon-nv" v-else></i>
      </div>
      <div class="input" @click="skip">
        <input type="text" placeholder="赘婿出山" />
        <i class="iconfont icon-tubiaozhizuomoban_sousuo"></i>
      </div>
    </div>
    <div class="book-city-content">
      <div class="placeholder"></div>
      <nav class="book-city-nav">
        <router-link to="/book-city/BookCityChoiceness">精选</router-link>
        <router-link to="/book-city/BookCityGratis">免费</router-link>
        <router-link to="/book-city/BookCityBoy">男生</router-link>
        <router-link to="/book-city/BookCityGirl">女生</router-link>
        <router-link to="/book-city/BookCityPublish">出版</router-link>
        <router-link to="/book-city/BookCityVoiceBook">听书</router-link>
      </nav>
      <!-- <transition name="bookCity"> -->
        <keep-alive>
          <router-view />
        </keep-alive>
      <!-- </transition> -->
    </div>
    <div class="book-city-bottom">
      没有更多了
      <i class="iconfont icon-meiyougengduoliao"></i>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cityTop: true,
    };
  },
  methods: {
    skip: function () {
      this.$router.push({ path: "/SearchView" });
    },
    bookCity: function () {
      if (this.$refs.bookCity.scrollTop != 0) {
        this.cityTop = false;
      } else {
        this.cityTop = true;
      }
    },
  },
};
</script>

<style lang="less">
#app.dark {
  .home-book-city-top {
    background: #2f2f2f;
    .cut {
      box-shadow: 0rem 0rem 30rem 0rem #2e2e2e;
      background: #343434;
      i {
        &.boy {
          color: #0085f5;
        }
        &.girl {
          color: #ef5043;
        }
      }
    }
    .input {
      box-shadow: 0rem 0rem 30rem 0rem #2e2e2e;
      background: #343434;
      i {
        color: #767676;
      }
    }
  }
  .book-city-content {
    .book-city-nav {
      background: #2f2f2f;
      a {
        color: #999999;
        &.router-link-exact-active {
          color: #787878;
          &::after {
            background: #a62612;
          }
        }
      }
    }
  }
  .book-city-bottom {
    background: #363435;
    color: #605e5f;
  }
}
.home-book-city {
  padding: 0rem 0rem 50rem;
  height: 100vh;
  overflow: scroll;
  .home-book-city-top {
    padding: 0 19.5rem;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50rem;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .cut {
      width: 32rem;
      height: 32rem;
      border-radius: 50%;
      box-shadow: 0rem 0rem 30rem 0rem #cccccc73;
      position: relative;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16rem;
        &.boy {
          color: #0089f9;
        }
        &.girl {
          color: #f2614e;
        }
      }
    }
    .input {
      flex: 1;
      margin-left: 18rem;
      box-shadow: 0rem 0rem 30rem 0rem #cccccc73;
      height: 32rem;
      border-radius: 32rem;
      display: flex;
      align-items: center;
      input {
        flex: 1;
        margin-left: 10rem;
        font-size: 14rem;
        // height: 14rem;

        background: none;
        outline: none;
        border: none;
      }
      i {
        color: #cdcdcd;
        font-size: 16rem;
        margin: 0 15rem;
      }
    }
  }
  .book-city-content {
    .placeholder {
      width: 100%;
      height: 50rem;
    }
    .book-city-nav {
      padding: 0 19.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      left: 0;
      background: #fff;
      z-index: 120;
      a {
        font-weight: normal;
        color: #999;
        text-decoration: none;
        font-size: 15rem;
        padding: 5rem 0;
        position: relative;
        flex: 1;
        text-align: center;
        margin-bottom: 8rem;
        &.router-link-exact-active {
          font-weight: 600;
          color: #2e2e2e;
          font-size: 18rem;
          &::after {
            content: "";
            display: inline-block;
            height: 2rem;
            width: 16rem;
            background: #f24a49;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 1rem;
          }
        }
      }
    }
  }
  .book-city-bottom {
    height: 44rem;
    background: #f2f2f2;
    width: 100;
    text-align: center;
    line-height: 44rem;
    font-size: 11rem;
    color: #ababab;
  }
}
// .bookCity-enter {
//   transform: translateX(100%);
//   transition: all 1s;
// }
// .bookCity-enter-active {
//   transform: translateX(0);
//   transition: all 1s;
// }
// .bookCity-leave {
//   transform: translateX(0);
//   transition: all 1s;
// }
// .bookCity-leave-active {
//   transform: translateX(-100%);
//   transition: all 1s;
// }
</style>