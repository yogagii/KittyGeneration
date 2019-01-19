<template>
	<div class="flex flex-center index" id="page">
		<page :currentPage="currentPage">
			<div class="slide" style="float:left">
				<div class="slideshow">
					<ul>
						<li v-for="(img, index) in imgArray" v-show="index===mark" :key="index">
							<a href="#">
								<img :src='img'>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="title">
				<div class="titleh3">
					<p>虚拟角色</p>
					<p>生成式设计</p>
					<!--<p style="font-size: 15px;">一站式AI服务体验，助您轻松跨入“人工智能”时代！</p>-->
				</div>
				<div id='startbtn' @click="getstart">
					Get Start
				</div>
			</div>
			<div class="footer"></div>
			<section class="animate" ref="section1">
			</section>
		</page>
		<page :currentPage="currentPage">
			<div style="background-color: #479698;opacity: 0.3;width: 100%;height: 100%;position: fixed;top: 0px;"></div>
		 	<div class="container">
		 		<div class="genku">
		 			<div id="cats">
		 				<div style="position: absolute; width: 1088px;height: 679px;">
							<div v-for="item in items" style="display: inline-block;margin: 135px 0 0 155px;">
			                    <input type="checkbox" v-model="checkedNames" :value="item" style="width: 20px; height: 20px;"/>
				       		</div>
						</div>
		 			</div>
		 		</div>
		 		<div class="right">
		 			<div class="data">
			 			<section class="animate move-right">
			  				<p>交叉率：<span>50%</span></p>
			  				<p>变异率：<span>1%</span></p>
			  				<p>种群数：<span>24</span></p>
			  				<p>距离下一代：<span>2h6min</span></p>
			 			</section>
		 			</div>
		 			<div id='nextGenBtn' @click="CalFitness">Next Generation</div>
		 		</div>
		 	</div>
		 	
		</page>
		<page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption" />
	</div>
</template>

<style>

</style>

<script src="../assets/js/catsvg.js"></script>
<script src="../assets/js/jquery-1.8.3.min.js"></script>
<script src="../assets/js/matchcolours.js"></script>
<script>
	import Page from 'src/components/Page'
	import PageController from 'src/components/PageController'

	function afterEnterAnimate($child) {
		$child.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
	}

	function beforeLeaveAnimate($child) {
		/*let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';*/
		let moveType ='move-right';
		$child.$el.querySelector('.animate').classList.add(moveType);
  }

import {svgcatsGA} from '../assets/mixins/svgcatsGA'

export default {
	name:'PageIndex',
	mixins: [svgcatsGA],
	components: {
		Page,
		PageController
	},
	data() {
		return {
			mark: 0,
			imgArray: [
		        'statics/b1.png',
		        'statics/b2.png',
		        'statics/b3.png',
		        'statics/b4.png',
		    ],
		    items:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
			
			currentPage: 1,
			options: [{
					background: 'rgba(255, 255, 255, 1)',
					color: '#fff',
					isCenter: false,
					isIndex: true,
					afterEnter: afterEnterAnimate,
					beforeLeave: beforeLeaveAnimate
				}, {
					background: 'rgba(255, 255, 255, 1)',
					color: '#000',
					isCenter: false,
					isIndex: false,
					afterEnter: afterEnterAnimate,
					beforeLeave: beforeLeaveAnimate
				},
			],
			controllerOption: {
				arrowsType: true,
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
	created(){
	  	this.play()
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
		 
	    autoPlay() {
	    	this.mark++;
	    	if (this.mark === 4) { //当遍历到最后一张图片置零
	    		this.mark = 0
	    	}
	    },
	    play() {
	    	setInterval(this.autoPlay, 2500)
	    },
	    
	    getstart(){
	    	this.changePage(2)
	    }
    }
}
</script>

<style lang="stylus">

#page
 height 100%
 width 100%

.animate
  transition all 1s ease-out 0s


.move-left
  transform translateX(-1000%)


.move-right
  transform translateX(1000%)
.container
  width 100%
  height 100%  
.img-Responsive{
	max-height: 500px;
	max-width: 100%;
}

#imagePanel .panel-body{
	height: 500px;
}

#uploader .row{
	margin: 10px 1% 0 1% !important;
	padding-bottom: 0 !important;
}

#uploader .q-pa-xs{
	padding-top: 0 !important;
	height: 100px;
}


.index .startbtn{
	width:48%;
	background-color: grey;
}
.index .resetbtn{
	width:48%;
	float:right;
	background-color: grey;
}

.index .slide {
    width: 70%;
    height: 600px;
    overflow: hidden;
    position: relative;
    top: 120px;
    
}
.index .slideshow {
    width: 1000px;
    height: 600px;
    margin: 0 auto;
}
.index .slideshow img{
	height:600px;
	margin: 0 50px;
   /* max-height: 100%;*/
}

.index .title{
	width:30%;
	height:600px;
	float:left;
	position: relative;
	top: 120px;
}
.index .title .titleh3{
	position: absolute;
	top:50%;
	transform: translate(0,-50%);
	text-align: center;
}
.index .title .titleh3 p{
	font-size: 45px;
	font-weight: 600;
	margin: 5px 0;
	color: #404343;
	font-family: "黑体";
}
.index #startbtn{
	width:140px;
	height:42px;
	background-color: #bed7d5;
	box-shadow:0px 0px 10px rgba(255,255,255,0.6) inset, 2px 2px 2px rgba(0,0,0,0.15);
	font-size: 28px;
	color: #404343;
	text-align: center;
	line-height: 42px;
	position: absolute;
	top: 64%;
	left: 10%;
	cursor: pointer;
}
.index .container{
	position: relative;
	top: 8%;
	padding: 70px;
}
.index .genku{
	width: 80%;
	height: 90%;
	background-color: white;
	border: 2px solid #c3c3c3;
	display: inline-block;
}
.index .right{
	width: 20%;
	height: 90%;
	display: inline-block;
	position: relative;
}
.index .right .data{
	position: absolute;
	bottom: 50px;
	width: 100%;
	height: 200px;
	margin-left: 20px;
}
.index .right .data p{
	font-size: 20px;
	color: #404343;
	line-height: 30px;
}
.index .right .data span{
	color: #18474b;
	font-size: 26px;
	font-weight: 500;
}
.index .right #nextGenBtn{
	width:204px;
	height:40px;
	background-color: #f4f4f4;
	box-shadow:0px 0px 10px rgba(255,255,255,0.6) inset, 2px 2px 2px rgba(0,0,0,0.15);
	font-size: 24px;
	font-weight: 500;
	color: #18474b;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	position: absolute;
	bottom: 3px;
	left: 22px;
}

.index .cat {
	width: 17%;
	display: inline-block;
}

.index .footer{
	background-color:rgb(141,188,188);
	opacity: 0.5;
	width: 100%;
	height:12%;
	position: fixed;
	bottom: 0px;
}
</style>