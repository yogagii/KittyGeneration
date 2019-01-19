<template>
  <section class="page" v-if="option"
    :style="{background: option.background,color: option.color||'#fff'}"
    :class="{'page-before': option.index < currentPage,
      'page-after': option.index > currentPage,
      'page-current': option.index === currentPage}">
    <div :class="{'all-center': option.isCenter, 'fullpage1': option.isIndex, 'fullpage2': !option.isIndex}">
      <slot></slot>
    </div>
  </section>
  <section class="page" v-else>页面正在渲染中。。。</section>
</template>
<script>
export default {
  name: 'page',
  props: {
    currentPage: Number
  },
  data() {
    return {
      option: null
    }
  },

}
</script>

<style>
.page {
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.5s ease 0s;
  z-index: 1;
}
.page-before {
  z-index: 0;
  transform: translate3d(0, -100%, 0);
}
.page-after {
  z-index: 0;
  transform: translate3d(0, 100%, 0);
}
.fullpage1{
	/*padding-top:8% ;*/
	width:100%;
	height:100%;
	background-image: url(../assets/img/fish1.png);
}
.fullpage2{
	width:100%;
	height:100%;
	background-image: url(../assets/img/fish2.png);
}
/* 水平、垂直居中 */
.all-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; 
  height: 60%;
}

</style>
