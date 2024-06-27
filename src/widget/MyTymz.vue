<template>
  <div class="my-tymz">
    <div class="my-tymz-top">
      <WidgetTitle>{{ item.name }}</WidgetTitle>
      <div class="count-down">
        <i class="iconfont icon-shijian"></i>
        <van-count-down :time="time" />
      </div>
    </div>
    <div class="my-tymz-nav">
      <MyTymzEndlong
        v-for="item in item.list"
        :key="item.id"
        :item="item"
      ></MyTymzEndlong>
    </div>
  </div>
</template>

<script>
import MyTymzEndlong from "./MyTymzEndlong.vue";
import WidgetTitle from "./WidgetTitle.vue";
export default {
  components: { WidgetTitle, MyTymzEndlong },
  props: ["item"],
  data() {
    return {
      time: 62 * 41 * 47 * 1000,
    };
  },
};
</script>

<style lang="less" scoped>
#app.dark{
  .count-down{
    background: #ba5b00;
    i{
      color: #6c411a;
    }
    .van-count-down {
        //   flex:1;
        color: #6c411a;
      }
  }
}
.my-tymz {
  margin-bottom: 35rem;
  .my-tymz-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count-down {
      height: 21rem;
      width: 118rem;
      background: #ffa130;
      border-radius: 21rem;
      padding: 0 7rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      font-size: 15rem;
      i {
        color: #fdebd3;
      }
      .van-count-down {
        //   flex:1;
        color: #fdebd3;
      }
    }
  }
  .my-tymz-nav {
    display: flex;
    justify-content: space-between;
  }
}
</style>