<template>
  <div class="home-bookrack">
    <div class="home-bookrack-top">
      <h3>书架</h3>
      <div class="small-icon">
        <i class="iconfont icon-tubiaozhizuomoban_sousuo" @click="skip"></i>
        <i class="iconfont icon-shijian"></i>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
    <div class="bookrack-content">
      <div class="placeholder"></div>
      <template v-if="carousel.length">
        <div class="carousel" v-if="carouselShow">
          <i
            class="delete iconfont icon-shanchu1"
            @click="carouselShow = false"
          ></i>
          <van-swipe
            class="my-swipe"
            :autoplay="3000"
            indicator-color="#999999"
          >
            <van-swipe-item v-for="(item, index) in carousel" :key="index">
              <img
                :src="item.cover + '?imageView=1&type=webp&thumbnail=100x0'"
                alt=""
              />
              <div class="right">
                <h5>
                  <span>{{ item.title }}</span> <span>{{ item.readInfo }}</span>
                </h5>
                <div class="gist">{{ item.description }}</div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </template>
      <div class="recommend" v-if="recommend">
        <ul>
          <li v-for="(item, index) in recommend" :key="index" @click="bookContent(item)">
            <img
              :src="item.cover + '?imageView=1&type=webp&thumbnail=100x0'"
              alt=""
            />
            <h4>{{ item.title }}</h4>
            <div class="title">848章未读</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: [],
      recommend: [],
      carouselShow: true,
    };
  },
  methods: {
    skip: function () {
      this.$router.push({ path: "/SearchView" });
      // console.log(this.$route);
    },
    bookContent:function(value){
      // this.$store.
      this.$router.push({ path: `/book/${value.id}/title/${value.title}` });
    }
  },
  created: function () {
    // 书架轮播图
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/shelf/banner.json")
      .then((res) => {
        this.carousel = res.data.data.banners;
        // console.log(res.data.data);
      });
    // 书架推荐
    this.axios
      .get("https://apis.netstart.cn/yunyuedu/shelf/info.json")
      .then((res) => {
        this.recommend = res.data.data.list;
        // console.log(res.data.data.list);
      });
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  .home-bookrack-top{
    background: #2f2f2f;
    h3{
      color: #787878;
      .small-icon{
        i{
          color: #636363;
        }
      }
    }
  }
  .bookrack-content{
    .carousel{
      box-shadow: 0rem 0rem 10rem 0rem #2e2e2e;
      border: 1rem solid #2e2e2e;
      background: #333333;
      .delete{
        color: #5e5e5e;
      }
      .van-swipe-item{
        background: #333333;
        .right{
          h5 {
              color: #787878;
              span {
                &:nth-child(2) {
                  color: #a33437;
                }
              }
            }
          .gist{
            color: #4e4e4e;
          }
        }
      }
    }

    .recommend{
      h4{
        color: #767676;
      }
      .title{
        color: #5a5a5a;
      }
    }
  }
}
.home-bookrack {
  padding: 0rem 19.5rem;
  .home-bookrack-top {
    padding: 0 19.5rem;
    display: flex;
    background: #fff;
    align-items: center;
    width: 100%;
    height: 50rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    h3 {
      flex: 1;
      font-size: 18rem;
      color: #212121;
    }
    .small-icon {
      flex: 1;
      text-align: right;
      i {
        margin-right: 15rem;
        color: #727272;
        font-size: 16rem;
        &:nth-child(3) {
          margin: 0;
        }
      }
    }
  }
  .bookrack-content {
    // margin-top: 15rem;
    padding-bottom: 200rem;
    .placeholder{
      width: 100%;
      height: 50rem;
    }
    .carousel {
      margin-bottom: 30rem;
      margin-top: 10rem;
      width: 100%;
      height: 90rem;
      box-shadow: 0rem 0rem 10rem 0rem #cccccc6b;
      position: relative;
      padding: 10rem 25rem 0rem 10rem;
      border-radius: 5rem;
      border: 1rem solid #e5e5e5;
      .delete {
        position: absolute;
        top: 10rem;
        right: 7rem;
        color: #bfbfbf;
        font-size: 12rem;
        z-index: 9;
      }
      .my-swipe {
        width: 100%;
        height: 100%;
        .van-swipe-item {
          font-size: 20rem;
          line-height: 12rem;
          text-align: center;
          background-color: #fff;
          display: flex;
          img {
            width: 50rem;
            height: 67rem;
          }
          .right {
            flex: 1;
            margin-left: 12rem;
            font-size: 12rem;
            h5 {
              width: 100%;
              color: #474747;
              display: flex;
              height: 20rem;
              line-height: 22rem;
              span {
                width: 50%;
                padding-right: 10rem;
                text-align: left;
                // 文本溢出处理
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                &:nth-child(2) {
                  color: #ff3a43;
                  padding: 0;
                  text-align: right;
                }
              }
            }
            .gist {
              margin-top: 10rem;
              color: #999999;
              line-height: 17rem;
              // 文本溢出处理
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
    }
    .recommend {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 100rem;
          font-size: 12rem;
          // margin-right: 35rem;
          margin-bottom: 15rem;
          // &:nth-child(3n) {
          //   margin-right: 0;
          // }
          img {
            width: 100%;
            height: 136rem;
          }
          h4 {
            color: #2e2e2e;
          }
          .title {
            color: #a8a8a8;
          }
        }
      }
    }
  }
}
</style>
