<template>
	<div class="flex flex-center crossover" id="page">
		<page :currentPage="currentPage">
			<p class="text-center title">虚拟角色杂交</p>
			<section class="animate" ref="section1">
				<p class="textleft">左侧的功能为矢量格式杂交。父代基因可以随机产生，也可以选择自己基因库中的虚拟角色作为父代，通过多选框的选项，父代数据来源可以设为“以太猫”或“莱茨狗”，既可以进行同一物种杂交，也可以选择不同物种的杂交。勾选“用户偏好”选项时，用户偏好的”优秀基因“将有更大的可能性遗传给下一代。</p>
				<p class="textright">右侧的功能为标量格式杂交。用户可自行选择本地的虚拟角色图片上传到平台，平台会有训练好的自编码器将图像编码为256位的向量，利用该向量进行遗传进化，并使用DCGAN的判别器作为适应度函数，当适应度稳定多代后算法结束，返回适应度最高的向量并解码为JPG/PNG图片。</p>
			</section>
		</page>
		<page :currentPage="currentPage">
			<div class="mulchoice">
				<span for="jack">以太猫</span>
				<input type="checkbox" value="cat" v-model="mulchoice" checked>
			 	<span for="john">莱茨狗</span>
			  <input type="checkbox" value="dog" v-model="mulchoice">
			  <span for="mike">用户偏好</span>
			  <input type="checkbox" value="user" v-model="mulchoice">
			  <p class="resetbtn" @click="reset">reset</p>
			</div>
			<div class="left">
				<div class="box">
					<div class="ss" id="cat1">
						<div class="s1"></div>
						<div class="bb">
							<div class="b1" @click="randomCat(1)">随机</div>
							<div class="b2">选择</div>
						</div>
					</div>
					<div class="ss" id="cat2">
						<div class="s1"></div>
						<div class="bb">
							<div class="b1" @click="randomCat(2)">随机</div>
							<div class="b2">选择</div>
						</div>
					</div>
				</div>
				<div class="space">
					<img src="../statics/a1.png" height="40px" width="50%" />
				</div>
				<div class="box">
					<div class="ss" id="cat3">
						<div class="s1"></div>
						<div class="bb">
							<div class="b1" @click="mixCat(1,2,3)">合成</div>
						</div>
					</div>
				</div>
				<div class="addbtn">加入基因库</div>
			</div>
			<div class="right">
				<div class="box">
					<div class="ss" id="cat4">
						<div class="s1"></div>
						<div class="bb">
							<div class="b2">上传</div>
						</div>
					</div>
					<div class="ss" id="cat5">
						<div class="s1"></div>
						<div class="bb">
							<div class="b2">上传</div>
						</div>
					</div>
				</div>
				<div class="space">
					<img src="../statics/a1.png" height="40px" width="50%" />
				</div>
				<div class="box">
					<div class="ss" id="cat6">
						<div class="s1"></div>
						<div class="bb">
							<div class="b1" @click="mixCat(4,5,6)">合成</div>
						</div>
					</div>
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
	import {svgcatsCross} from '../assets/mixins/svgcatsCross'

	function afterEnterAnimate($child) {
		console.log($child)
		$child.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
	}

	function beforeLeaveAnimate($child) {
		let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
		$child.$el.querySelector('.animate').classList.add(moveType);
	}

	export default {
		name: 'crossover',
		mixins: [svgcatsCross],
		components: {
			Page,
			PageController
		},
		data() {
			return {
				mulchoice:['cat'],
				showgrid:true,
				
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
				}],
				controllerOption: {
					arrowsType: false,
					navbar: true,
					highlight: true,
					loop: false
				}
			}
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
			reset(){
				console.log('reset')
				let catdom = document.getElementById("cat1")
				let childs = catdom.childNodes;
				catdom.removeChild(childs[2]); 
				let catdom2 = document.getElementById("cat2")
				let childs2 = catdom2.childNodes;
				catdom2.removeChild(childs2[2]); 
				let catdom3 = document.getElementById("cat3")
				let childs3 = catdom3.childNodes;
				catdom3.removeChild(childs3[2]); 
			},
		},
		controllerOption: {
			arrowsType: true,
			navbar: true,
			highlight: true,
			loop: true
		},
		
	}
</script>

<style lang="stylus">
#page
 height 100%
 width 100%

.crossover .animate{
	transition: all 1s ease-out 0s;
	position: relative;
	top: 45%;
}


.move-left
  transform translateX(-1000%)


.move-right
  transform translateX(1000%)

.crossover .footer{
	background-color:rgb(141,188,188);
	opacity: 0.3;
	width: 100%;
	height:12%;
	position: fixed;
	bottom: 0px;
}

.crossover .box{
	width:98%;
	display: flex;
	justify-content: space-around;
	padding: 0 1%;
}
.crossover .ss {
  width: 49%;
  height: 217px;
  margin: 0.3%;
  padding: 0.3%;
  border: 1px solid rgb(83, 83, 83);
  position: relative;
  background-color: white;
}
.crossover .s1 {
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-image: url(../statics/t1.png);
  display: inline-block;
}
.crossover .space{
	height:40px;
	width:98%;
	display: flex;
	justify-content: space-around;
}
.crossover .bb{
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
.crossover .b1{
	height:35px;
	width:60px;
	background-color:#bed7d5;
	margin: 0 15px;
	cursor: pointer;
}
.crossover .b2{
	height:35px;
	width:60px;
	background-color:#f8c698;
	margin: 0 15px;
	cursor: pointer;
}
.crossover .cat{
	width: 98%;
	height: 100%;
	position: absolute;
	top: 0;
	background-color: white;
}
.crossover .left{
	width: 45%;
	height: 57%;
	position: absolute;
	top: 220px;
	left: 5%;
	border-right: 2px solid #757575;
}
.crossover .right{
	width: 45%;
	height: 57%;
	position: absolute;
	top: 220px;
	left: 51%;
}
.crossover .mulchoice{
	position: absolute;
	top: 170px;
	width: 100%;
	height: 50px;
	padding: 0 86px;
	display: flex;
	align-items: center;
}
.crossover .mulchoice span{
	font-size: 16px;
	line-height: 20px;
	margin-right: 16px;
	color: #6c6c6c;
}
.crossover .mulchoice input{
	display: inline-block;
	width: 15px;
	height: 15px;
	margin: 0 20px 0 0;
}
.crossover .addbtn{
	width: 47.0%;
	height: 35px;
	margin: 0.3%;
	padding: 0.3%;
	background-color: #757575;
	color: white;
	margin: 0 auto;
	transform: translate(-2.1%,-5%);
	text-align: center;
	font-size: 14px;
	line-height: 30px;
	padding-bottom: 5px;
	vertical-align: middle;
	cursor: pointer;
}

.crossover .title{
	font-size: 36px;
	color: #404343;
	position: absolute;
	top: 30%;
	width: 100%;
}
.crossover .textleft{
	font-size: 20px;
	color: #545454;
	width: 40%;
	position: absolute;
	left: 8%;
	font-weight: 300;
}
.crossover .textright{
	font-size: 20px;
	color: #545454;
	width: 40%;
	position: absolute;
	left: 52%;
	font-weight: 300;
}

.crossover .resetbtn{
	color: #494949;
	width: 100px;
	height: 20px;
	font-size: 18px;
	font-weight: 300;
	position: absolute;
	right: 5%;
	text-align: right;
	padding: 0 15px;
	cursor: pointer;
}
</style>

