<template>
  <li class="ranking-publish-across">
    <img :src="item.cover + '?imageView=1&type=webp&thumbnail=247x0'" alt="" />
    <div class="right">
      <h3>{{ item.title }}</h3>
      <div class="name">
        {{ item.author }}
        <span v-if="item.category">/ {{ item.category }}</span>
      </div>
      <div class="gist">{{ item.content }}</div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="less" scoped>
#app.dark {
  .ranking-publish-across {
    .right {
      h3 {
        color: #787878;
      }
      .name {
        color: #5e5e5e;
      }
      .gist {
        color: #5e5e5e;
      }
    }
  }
}
.ranking-publish-across {
  display: flex;
  margin-bottom: 20rem;
  img {
    width: 73rem;
    height: 98rem;
  }
  .right {
    margin-left: 11rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 17rem;
      color: #222222;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .name {
      font-size: 12rem;
      color: #737373;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .gist {
      font-size: 12rem;
      color: #737373;
      margin-bottom: 10rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>