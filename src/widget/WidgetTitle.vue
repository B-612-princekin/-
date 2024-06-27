<template>
  <div class="widget-title">
    <h3><slot></slot></h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#app.dark {
  .widget-title {
    h3 {
        color: #757575;
    }
  }
}
.widget-title {
  h3 {
    color: #2a2a2a;
    font-size: 18rem;
    margin: 20rem 0;
  }
}
</style>