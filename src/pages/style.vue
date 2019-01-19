<template>
	<div class="flex flex-center style" id="page">
		<page :currentPage="currentPage">
			<p class="text-center title">虚拟角色风格迁移</p>
			<section class="animate" ref="section1">
				<p>风格迁移可以使虚拟角色的pattern部分产生丰富的变化，用户可以将任意一副图片的风格迁移到虚拟角色身上，但是由于训练模型需要耗费过多的时间以及服务器资源，平台上提供了5个已经训练好的风格模型。用户可以从自己的基因库中选取任一基因组，或者从基因池中随机生成，然后将图片风格迁移到基因组上生成新的虚拟角色。</p>
			</section>
		</page>

		<page :currentPage="currentPage">
			<p class="resetbtn" @click="reset">reset</p>
			<div class="row container">
				<div class="choosePanel">
					<q-scroll-area class="scrollarea">
						<div style="margin:0 10% 0 0;">
							<img v-for="s in imgsrc" :src=s style="width: 100%;margin: 2%;" @click="pickimg(s)" />
						</div>
					</q-scroll-area>
				</div>
				<div class="imagePanel">
					<p>请在左侧选择一张图片</p>
					<div class="s2" v-if="showgrid2"></div>
					<img id="previewImage" :src=bigimg style="max-height: 100%;max-width:100%;position: absolute;position: absolute;left: 50%;transform: translate(-50%,0);">
				</div>
				<div style="width: 5%;height: 100%;display: inline-block;color: #757575;position: relative;"><q-icon name="ion-add" size="50px" style="position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);"/></div>
				<div class="ss" id="cat7">
					<div class="s1" v-if="showgrid"></div>
					<div class="bb">
						<div class="b1" @click="randomCat(7)">随机</div>
						<div class="b2">选择</div>
					</div>
				</div>
				<div style="width: 5%;height: 100%;display: inline-block;color: #757575;position: relative;"><q-icon name="ion-pause" size="35px" style="position: absolute;top: 47%;left:35%;transform: rotateZ(90deg)"/></div>
				<div class="resultPanel">
					<div class="ss2" id="cat8">
						<div class="s1" v-if="showgrid"></div>
						<div class="bb" style="top: 54%;">
							<div class="b1" @click="styleMixCat(7,bigimg,8)">合成</div>
						</div>
					</div>
					<div class="addbtn">加入基因库</div>
				</div>
			</div>
			<div class="footer"></div>
			<section class="animate move-left">
			</section>
		</page>
		<page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption" />
	</div>
</template>

<style>

</style>

<script>
	import Page from 'src/components/Page'
	import PageController from 'src/components/PageController'
	import {svgcatsStyle} from '../assets/mixins/svgcatsStyle'

	function afterEnterAnimate($child) {
		console.log('childdddddddddddddd')
		console.log($child)
		$child.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
	}

	function beforeLeaveAnimate($child) {
		let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
		$child.$el.querySelector('.animate').classList.add(moveType);
  }

export default {
	name:'PageIndex',
	mixins: [svgcatsStyle],
	components: {
		Page,
		PageController
	},
	data() {
		return {
			imgsrc:['../assets/img/style/1.jpg','../assets/img/style/2.jpg','../assets/img/style/3.jpg','../assets/img/style/4.jpg','../assets/img/style/5.jpg','../assets/img/style/6.jpg','../assets/img/style/7.jpg','../assets/img/style/8.jpg'],
			bigimgsrc:['../assets/img/style/b1.jpg','../assets/img/style/b2.jpg','../assets/img/style/b3.jpg','../assets/img/style/b4.jpg','../assets/img/style/b5.jpg','../assets/img/style/b6.jpg','../assets/img/style/b7.jpg','../assets/img/style/b8.jpg'],
			bigimg:'',
			showgrid: true,
			showgrid2: true,
			
			currentPage: 1,
			options: [{
					background: 'rgba(255, 255, 255, 1)',
					color: '#000',
					isCenter: false,
					isIndex: false,
					afterEnter: afterEnterAnimate,
					beforeLeave: beforeLeaveAnimate
				}, {
					background: 'rgba(255, 255, 255, 1)',
					color: '#000',
					isCenter: false,
					isIndex: false,
					afterEnter: afterEnterAnimate,
					beforeLeave: beforeLeaveAnimate
				}
			],
			controllerOption: {
				arrowsType: false,
				navbar: true,
				highlight: true,
				loop: false
			}
		}
	},
	watch:{
	},
	computed: {
		// 总page数
		pageNum() {
			return this.options.length;
		}
	},
	mounted() {
		this.$children.forEach((child, index) => {
			// 动态设置各个page内的options
			if(child.option === null) {
				let childOption = this.options[index];
				console.log(childOption)
				this.$set(childOption, 'index', index + 1);
				console.log(childOption)
				child.option = childOption;
			}
		});
	
	},
	methods: {
		changePage(index) {
			// beforeLeave Hook
			let beforeIndex = this.currentPage - 1;
			let leaveFunction = this.options[beforeIndex].beforeLeave;
			typeof leaveFunction === 'function' && leaveFunction.call(this, this.$children[beforeIndex]);
			// change page
			this.currentPage = index;
			// afterEnter Hook
			let nextIndex = index - 1;
			let enterFunction = this.options[nextIndex].afterEnter;
			this.$nextTick(function() {
				typeof enterFunction === 'function' && enterFunction.call(this, this.$children[nextIndex]);
			})
		},
		pickimg(src){
			this.bigimg=src.slice(0,-5)+'b'+src.slice(-5)
			this.showgrid2 = false;
		},
		reset(){
			console.log('reset')
			this.bigimg=''
			this.showgrid2 = true;
			this.showgrid = true;
			let catdom = document.getElementById("cat7")
			let childs = catdom.childNodes;
			catdom.removeChild(childs[2]); 
			let catdom2 = document.getElementById("cat8")
			let childs2 = catdom2.childNodes;
			catdom2.removeChild(childs2[2]); 
		},
		
	},
}
</script>

<style lang="stylus">
.style #page
 height 100%
 width 100%

.style .animate{
	transition: all 1s ease-out 0s;
	position: relative;
	top: 45%;
}

.style .move-left
  transform translateX(-1000%)


.style .move-right
  transform translateX(1000%)

.style .container{
	width: 95%;
  	height: 50%; 
  	position:relative;
  	top: 240px;
  	display: flex;
  	align-items: center;
}

.style .resetbtn{
	color: #494949;
	width: 100px;
	height: 20px;
	font-size: 18px;
	font-weight: 300;
	position: absolute;
	top: 210px;
	right: 2.5%;
	text-align: right;
	padding: 0 15px;
	cursor: pointer;
}
  
.style .footer{
	background-color:rgb(141,188,188);
	opacity: 0.3;
	width: 100%;
	height:12%;
	position: fixed;
	bottom: 0px;
}

.style .imagePanel{
	width: 29%;
	height: 100%;
	display: inline-block;
	background-color: white;
	position: relative;
	border: 1px solid #535353;
}
.style .imagePanel p{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	color: #494949;
	font-size: 16px;
}
.style .choosePanel{
	width:10%; 
	height: 100%;
	display: inline-block;
	margin: 0 0.5%
}
.style .resultPanel{
	height: 100%;
	width: 25%;
	display: inline-block;
	position: relative;
  	background-color: white;
}
.style .scrollarea{
	width: 100%; 
	height: 100%;
	background-color:rgba(228,229,232,1);
}
.style .ss {
  width: 25%;
  height: 100%;
  border: 1px solid #535353;
  position: relative;
  background-color: white;
  display: inline-block;
  overflow: hidden;
}
.style .ss2 {
  width: 100%;
  height: 93%;
  border: 1px solid #535353;
  position: relative;
  background-color: white;
  display: inline-block;
  overflow: hidden;
}
.style .s1 {
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-image: url(../statics/t1.png);
  display: inline-block;
}
.style .s2 {
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-image: url(../statics/t1.png);
  position:absolute;
  top: 0px;
}
.style .bb{
	height: 35px;
	width: 100%;
	display: flex;
	justify-content: center;
	color: #494949;
	text-align:center;
	line-height: 35px;
	font-size: 15px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.style .b1{
	height:35px;
	width:60px;
	background-color:#bed7d5;
	margin: 0 15px;
	cursor: pointer;
}
.style .b2{
	height:35px;
	width:60px;
	background-color:#f8c698;
	margin: 0 15px;
	cursor: pointer;
}
.style .cat{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 20%;
	background-color: white;
}
.style .addbtn{
	width: 100%;
	height: 7%;
	padding: 0.3%;
	background-color: #757575;
	color: white;
	margin: 0 auto;
	transform: translate(0,-12%);
	text-align: center;
	font-size: 14px;
	line-height: 30px;
	padding-bottom: 5px;
	vertical-align: middle;
	cursor: pointer;
}
.style .title{
	font-size: 36px;
	color: #404343;
	position: absolute;
	top: 30%;
	width: 100%;
}
.style .animate p{
	font-size: 20px;
	color: #545454;
	width: 80%;
	position: absolute;
	left: 10%;
	font-weight: 300;
}
</style>