<template>
  <div class="home-mine">
    <div class="mine-news"><i class="iconfont icon-duanxin"></i></div>
    <div class="mine-log-in">
      <div class="mine-picture-frame">
        <i class="iconfont icon-shu"></i>
      </div>
      <div class="mine-text">
        <div class="text1">点击登陆</div>
        <div class="text2">登陆即可全场免费阅读<span>5天</span></div>
      </div>
    </div>
    <div class="mine-top-up">
      <div class="balance">
        <div class="title">余额</div>
        <p>充值送红包</p>
        <div class="pattern">充值</div>
      </div>
      <div class="sign-in">
        <div class="title">签到</div>
        <p>做任务领红包</p>
        <div class="pattern">签到</div>
      </div>
    </div>
    <ul>
      <li>
        <i class="iconfont icon-bijijilu"></i>
        <p>笔记</p>
        <span class="iconfont icon-jinrujiantou"></span>
      </li>
      <li>
        <i class="iconfont icon-shangchuan"></i>
        <p>已购和上传</p>
        <span class="iconfont icon-jinrujiantou"></span>
      </li>
      <li>
        <i class="iconfont icon-kefu"></i>
        <p>在线客服</p>
        <span class="iconfont icon-jinrujiantou"></span>
      </li>
      <li>
        <i class="iconfont icon-moonyueliang"></i>
        <p>夜间模式</p>
        <van-switch
          :value="isDarkMode"
          active-color="#b23636"
          size="28rem"
          @change="toggleDarkMode"
        />
        <!-- <span class="iconfont icon-jinrujiantou"></span> -->
      </li>
      <li>
        <i class="iconfont icon-jifen"></i>
        <p>积分商城</p>
        <span class="iconfont icon-jinrujiantou"></span>
      </li>
      <li>
        <i class="iconfont icon-shezhi"></i>
        <p>设置</p>
        <span class="iconfont icon-jinrujiantou"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["isDarkMode"]),
  },

  methods: {
    ...mapMutations(["toggleDarkMode"]),
  },
};
</script>

<style lang="less">
#app.dark {
  .home-mine {
    .mine-news {
      i {
        color: #666666;
      }
    }
    .mine-log-in {
      .mine-picture-frame {
        background-color: #474747;
        border: 2rem solid #707070;
        box-shadow: 0rem 0rem 3rem rgba(51, 51, 51, 1);
        i {
          color: #686868;
        }
      }
      .mine-text {
        .text1 {
          color: #787878;
        }
        .text2 {
          display: none;
        }
      }
    }
    .mine-top-up {
      box-shadow: 0rem 0rem 15rem #272727;
      &::after {
        background-color: #353535;
      }
      .title {
        color: #727272;
      }
      p {
        color: #585858;
      }
      .pattern {
        color: #e69ea2;
        background-color: #c1262f;
      }
      .sign-in {
        .pattern {
          color: #f53641;
          background-color: #2f2f2f;
          border: 1rem solid #602e30;
        }
      }
    }
    ul{
      li{
        i{
          color: #666666;
        }
        p{
          color: #5e5e5e;
        }
        span{
          color: #666666;
        }
      }
    }
  }
}
.home-mine {
  padding: 10rem 19.5rem 0;
  .mine-news {
    text-align: right;
    padding-right: 10rem;
    i {
      font-size: 24rem;
      color: #666666;
    }
  }
  .mine-log-in {
    display: flex;
    align-items: center;
    .mine-picture-frame {
      width: 78rem;
      height: 78rem;
      background-color: #f0f0f0;
      border-radius: 50%;
      border: 2rem solid #fbfbfb;
      box-shadow: 0rem 0rem 3rem rgba(80, 80, 80, 0.4);
      position: relative;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40rem;
        color: #bfbfbf;
      }
    }
    .mine-text {
      padding-left: 22rem;
      flex: 1;
      .text1 {
        font-size: 24rem;
        color: #222222;
        margin-bottom: 10rem;
      }
      .text2 {
        font-size: 14rem;
        color: #707070;
        span {
          color: #ff343f;
        }
      }
    }
  }
  .mine-top-up {
    // width: 340rem;
    width: 351rem;
    height: 132rem;
    // outline: 1rem solid red;
    display: flex;
    align-items: center;
    margin-top: 12rem;
    position: relative;
    box-shadow: 0rem 0rem 15rem #cccccc59;
    &::after {
      content: "";
      width: 1rem;
      height: 50%;
      background-color: #ccc;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .title {
      font-size: 17rem;
      color: #2e2e2e;
      margin-bottom: 10rem;
    }
    p {
      font-size: 12rem;
      color: #848484;
      margin-bottom: 16rem;
    }
    .pattern {
      font-size: 12rem;
      color: #ffeceb;
      padding: 8rem 24rem;
      border-radius: 28rem;
      background-color: #ff343f;
    }
    .balance {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .sign-in {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .pattern {
        color: #ff5059;
        padding: 7rem 23rem;
        background-color: #ffffff;
        border: 1rem solid #e5a2a2;
      }
    }
  }
  ul {
    margin-top: 14rem;
    li {
      height: 64rem;
      display: flex;
      align-items: center;
      i {
        font-size: 21rem;
        color: #999999;
        margin-right: 20rem;
      }
      p {
        flex: 1;
        font-size: 15rem;
        color: #717171;
      }
      span {
        font-size: 14rem;
        color: #ccc;
      }
    }
  }
}
</style>