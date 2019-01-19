<template>
	<q-layout view="lHh Lpr lFf">
		<q-layout-header>
			<q-toolbar color="secondary">
				<q-toolbar-title>
					虚拟角色生成式设计
					<!--<div slot="subtitle">上海仪电(集团)有限公司中央研究院</div>-->
				</q-toolbar-title>
				<router-link to="/">
					<q-btn outline class="text-grey-5 q-mr-md" icon="ion-finger-print" label="基因库" /> </router-link>
				<router-link to="/crossover">
					<q-btn outline class="text-grey-5 q-mr-md" icon="ion-git-network" label="杂交" /> </router-link>
				<router-link to="/style">
					<q-btn outline class="text-grey-5 q-mr-md" icon="ion-color-wand" label="风格" /> </router-link>
				<router-link to="/Individualization">
					<q-btn outline class="text-grey-5 q-mr-md" icon="ion-star-half" label="个性化" /> </router-link>
			</q-toolbar>
		</q-layout-header>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
</style>
