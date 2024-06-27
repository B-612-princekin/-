<template>
  <div class="widget-gratis-across" @click="bookContent">
    <img :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'" alt="" @error="changeImg($event)" />
    
    <div class="right">
      <h4>{{ item.title }}</h4>
      <div class="gist">{{ item.content }}</div>
      <div class="bottom">
        <div class="name">
          {{ item.author }} <span v-if="item.category"> / {{ item.category }}</span>
        </div>
        <div class="read">
          立即阅读 <i class="iconfont icon-jinrujiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    changeImg(e) {
      e.target.src = require("../assets/default.png");
    },
    bookContent:function(){
      // this.$store.
      this.$router.push({ path: `/book/${this.item.id}/title/${this.item.title}` });
    }
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  .right{
    h4{
      color: #787878;
    }
    .gist{
      color: #4a4a4a;
    }
    .bottom{
      .name{
        color: #585858;
      }
      .read{
        color: #787878;
      }
    }
  }
}
.widget-gratis-across {
  display: flex;
  margin-bottom: 22rem;
  img {
    width: 74rem;
    height: 100rem;
  }
  .right {
    margin-left: 11rem;
    h4 {
      font-size: 16rem;
      color: #292929;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .gist {
      margin-top: 12rem;
      font-size: 12rem;
      color: #666666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .bottom {
      margin-top: 14rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 10rem;
        color: #6e6e6e;
      }
      .read {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12rem;
        color: #3c3c3c;
      }
    }
  }
}
</style>