<template>
	<div class="flex flex-center indivi" id="page">
		<page :currentPage="currentPage">
			<p class="text-center title">虚拟角色个性化</p>
			<section class="animate" ref="section1">
				<p>风格迁移可以使虚拟角色的pattern部分产生丰富的变化，用户可以将任意一副图片的风格迁移到虚拟角色身上，但是由于训练模型需要耗费过多的时间以及服务器资源，平台上提供了5个已经训练好的风格模型。用户可以从自己的基因库中选取任一基因组，或者从基因池中随机生成，然后将图片风格迁移到基因组上生成新的虚拟角色。</p>
			</section>
		</page>

		<page :currentPage="currentPage">
			<p class="resetbtn" @click="reset">reset</p>
			<div class="row container">
				<div class="inputPanel">
					<div class="inputarea">
						<textarea class="inputtext" v-model="message" placeholder="请在此输入SVG"></textarea>
					</div>
					<div class="showarea">
						<div id="cat10">
							<div class="s1" v-if="showgrid2"></div>
							<div class="bb">
								<div class="b1" @click="gensvg">生成矢量图</div>
							</div>
						</div>
					</div>
					<div class="addbtn" @click="submitsvg">确认提交</div>
				</div>
				<div class="choosePanel">
					<div class="scrollareas">
						<div class="scrolltitle">pattern</div>
						<q-scroll-area class="scrollarea">
							<div style="margin:0 10% 0 0;">
								<div v-for="s,i in imgsrc1" style="position: relative;" @click="pickimg(1,s)">
									<img :src=s />
									<div class="mask" v-show=chooseit1[i]></div>
									<q-icon v-show=chooseit1[i] name="check" size="30px" class="qicon" />
								</div>
							</div>
						</q-scroll-area>
					</div>
					<div class="scrollareas">
						<div class="scrolltitle">body</div>
						<q-scroll-area class="scrollarea">
							<div style="margin:0 10% 0 0;">
								<div v-for="s,i in imgsrc2" style="position: relative;" @click="pickimg(2,s)">
									<img :src=s />
									<div class="mask" v-show=chooseit2[i]></div>
									<q-icon v-show=chooseit2[i] name="check" size="30px" class="qicon" />
								</div>
							</div>
						</q-scroll-area>
					</div>
					<div class="scrollareas">
						<div class="scrolltitle">tail</div>
						<q-scroll-area class="scrollarea">
							<div style="margin:0 10% 0 0;">
								<div v-for="s,i in imgsrc3" style="position: relative;" @click="pickimg(3,s)">
									<img :src=s />
									<div class="mask" v-show=chooseit3[i]></div>
									<q-icon v-show=chooseit3[i] name="check" size="30px" class="qicon" />
								</div>
							</div>
						</q-scroll-area>
					</div>
					<div class="scrollareas">
						<div class="scrolltitle">eye</div>
						<q-scroll-area class="scrollarea">
							<div style="margin:0 10% 0 0;">
								<div v-for="s,i in imgsrc4" style="position: relative;" @click="pickimg(4,s)">
									<img :src=s />
									<div class="mask" v-show=chooseit4[i]></div>
									<q-icon v-show=chooseit4[i] name="check" size="30px" class="qicon" />
								</div>
							</div>
						</q-scroll-area>
					</div>
					<div class="scrollareas">
						<div class="scrolltitle">mouth</div>
						<q-scroll-area class="scrollarea">
							<div style="margin:0 10% 0 0;">
								<!--<img v-for="s in imgsrc5" :src=s style="width: 100%;margin: 2%;" @click="pickimg5(s)" />-->
								<div v-for="s,i in imgsrc5" style="position: relative;" @click="pickimg(5,s)">
									<img :src=s />
									<div class="mask" v-show=chooseit5[i]></div>
									<q-icon v-show=chooseit5[i] name="check" size="30px" class="qicon" />
								</div>
							</div>
						</q-scroll-area>
					</div>
					<div class="scrollareas">
						<div class="scrolltitle">texture</div>
						<q-scroll-area class="scrollarea">
							<div style="margin:0 10% 0 0;">
								<div v-for="s,i in imgsrc6" style="position: relative;" @click="pickimg(6,s)">
									<img :src=s />
									<div class="mask" v-show=chooseit6[i]></div>
									<q-icon v-show=chooseit6[i] name="check" size="30px" class="qicon" />
								</div>
							</div>
						</q-scroll-area>
					</div>
				</div>
				<div class="resultPanel">
					<div class="ss2" id="cat9">
						<div class="s1" v-if="showgrid"></div>
						<div class="bb" style="top: 52%;">
							<div class="b2" @click="compose" v-if="showgrid">合成</div>
						</div>
					</div>
					<div class="addbtn" style="transform: translate(0,-4.5px);">加入基因库</div>
				</div>
			</div>
			<div class="footer"></div>
			<section class="animate move-left">
			</section>
		</page>
		<page-controller :pageNum="pageNum" :currentPage="currentPage" @changePage="changePage" :option="controllerOption" />
	</div>
</template>

<script>
	import Page from 'src/components/Page'
	import PageController from 'src/components/PageController'
	import {svgcatsIndivi} from '../assets/mixins/svgcatsIndivi'

	function afterEnterAnimate($child) {
		console.log('childdddddddddddddd')
		console.log($child)
		$child.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
	}

	function beforeLeaveAnimate($child) {
		let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
		$child.$el.querySelector('.animate').classList.add(moveType);
  }
import { catsvg } from '../assets/js/catsvg.js'
export default {
	name:'PageIndex',
	mixins: [svgcatsIndivi],
	components: {
		Page,
		PageController
	},
	data() {
		return {
			imgsrc1:[],
			imgsrc2:['../assets/img/indivi/body1.png','../assets/img/indivi/body2.png','../assets/img/indivi/body3.png','../assets/img/indivi/body4.png','../assets/img/indivi/body5.png','../assets/img/indivi/body6.png','../assets/img/indivi/body7.png'],
			imgsrc3:['../assets/img/indivi/tail1.png','../assets/img/indivi/tail2.png','../assets/img/indivi/tail3.png'],
			imgsrc4:[],
			imgsrc5:[],
			imgsrc6:[],
			finalimg:[],
			chooseit1: [],
			chooseit2: [],
			chooseit3: [],
			chooseit4: [],
			chooseit5: [],
			chooseit6: [],
			showgrid: true,
			showgrid2: true,
			message:"",
			
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
	created(){
		for(let i = 1; i <=17; i++){
			this.imgsrc1.push('../assets/img/indivi/pattern'+i+'.jpg')
			//this.chooseit1.push(false)
			this.imgsrc4.push('../assets/img/indivi/eye'+i+'.png')
			//this.chooseit4.push(false)
			if(i<=14){
				this.imgsrc5.push('../assets/img/indivi/mouth'+i+'.png')
				//this.chooseit5.push(false)
				if(i<=7){
					//this.chooseit2.push(false)
					if(i<=3){
						//this.chooseit3.push(false)
					}
				}
			}
		}
		for(let j = 1; j <=18; j++){
			if(j==4||j==6||j==8||j==11||j==12||j==16){
				this.imgsrc6.push('../assets/img/indivi/texture'+j+'.png')
			}else{
				this.imgsrc6.push('../assets/img/indivi/texture'+j+'.jpg')
			}
			//this.chooseit6.push(false)
		}
		for(let m = 1;m<22;m++){
			this.chooseit1.push(false)
			this.chooseit2.push(false)
			this.chooseit3.push(false)
			this.chooseit4.push(false)
			this.chooseit5.push(false)
			this.chooseit6.push(false)
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
		pickimg(n,src){
			let name = 'chooseit'+n
			for(let i = 0;i<this[name].length;i++){
				this[name].splice(i, 1, false)
			}
			let reg = /^[0-9]*$/
			console.log(src.length)
			if(n=="6"){
				this.finalimg[n-1] = src
				if(src.length==33){
					this[name].splice(src.slice(-5,-4)-1, 1, true)
				}else{
					this[name].splice(src.slice(-6,-4)-1, 1, true)
				}
			}else{
				//console.log(src.length-6)
				if(src.length==22){
					//catsvg["eye"]["18"]=this.message
					this.finalimg[n-1] = 18
					//this[name].splice(src.slice(-5,-4)-1+17, 1, true)
					this[name].splice(0, 1, true)
				}else{
					if(!reg.test(src.charAt(src.length-6))){
						this.finalimg[n-1] = src.slice(-5,-4)
						this[name].splice(src.slice(-5,-4)-1, 1, true)
						console.log(this.finalimg[n-1])
					}else{
						this.finalimg[n-1] = src.slice(-6,-4)
						this[name].splice(src.slice(-6,-4)-1, 1, true)
						console.log(this.finalimg[n-1])
					}
				}
			}
			
			//console.log(src.slice(-5,-4))
		},
		reset(){
			console.log('reset')
			this.showgrid = true;
			let catdom = document.getElementById("cat9")
			let childs = catdom.childNodes;
			catdom.removeChild(childs[2]);
			catdom.removeAttribute("style")
			this.finalimg = new Array()
			for(let n = 1;n<=6;n++){
				let name = 'chooseit'+n
				for(let i = 0;i<this[name].length;i++){
					this[name].splice(i, 1, false)
				}
			}
		},
		compose(){
			console.log(this.finalimg)
			this.showgrid = false;
			let catdom = document.getElementById("cat9")
			catdom.setAttribute("style","background-image: url("+this.finalimg[5]+");")
			this.generateCat(this.finalimg)
		},
		gensvg(){
			let div1=`<div class="gensvg">`
			let div2=`</div>`
			let m1 = this.message.split('>')
			let m2 = this.message.slice(m1[0].length+1)
			let m3 = `<svg  viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`+m2
			console.log(m3)
			let messages = div1+m3+div2
			$('#cat10').append(messages)
			let blob1 = new Blob([m3], {type: "text/plain;charset=utf-8"});
			saveAs(blob1, "eye1.svg");
		},
		submitsvg(){
			console.log(this.message)
			//this.imgsrc4.unshift('data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(this.message)))); 
			this.imgsrc4.unshift('../assets/svg/eye1.svg'); 
		}
	},
}
</script>

<style lang="stylus">
.indivi #page
 height 100%
 width 100%

.indivi .animate{
	transition: all 1s ease-out 0s;
	position: relative;
	top: 45%;
}

.indivi .move-left
  transform translateX(-1000%)


.indivi .move-right
  transform translateX(1000%)

.indivi .container{
	width: 95%;
  	height: 50%; 
  	position:relative;
  	top: 240px;
  	display: flex;
  	align-items: center;
}

.indivi .resetbtn{
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
  
.indivi .footer{
	background-color:rgb(141,188,188);
	opacity: 0.3;
	width: 100%;
	height:12%;
	position: fixed;
	bottom: 0px;
}

.indivi .inputPanel{
	width: 25%;
	height: 100%;
	display: inline-block;
	position: relative;
	padding-right: 5px;
}
.indivi .inputPanel .inputarea{
	width: 100%;
	height: 46.5%;
	padding-bottom: 4px;
}
.indivi .inputPanel .inputarea .inputtext{
	background-color: #f9f9f9;
	width: 100%;
	height: 100%;
	color: #757575;
	font-size: 8px;
}
.indivi .inputPanel .inputarea .inputtext::-webkit-input-placeholder{
	color: #c0c0c0;
	font-size: 15px;
	text-align: center;
	line-height: 200px;
} 
.indivi .inputPanel .showarea{
	width: 100%;
	height: 46.5%;
	padding-top: 4px;
}
.indivi .inputPanel #cat10{
	border: 1px solid #535353;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}
.indivi .inputPanel #cat10 .gensvg{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background-color: white;
} 
.indivi .choosePanel{
	width:50%; 
	height: 100%;
	display: flex;
	justify-content: space-around;
}
.indivi .resultPanel{
	width: 25%;
	height: 100%;
	display: inline-block;
	position: relative;
}
.indivi .scrollareas{
	width: 16%;
	height: 100%;
	background-color:white;
	display: inline-block;
}
.indivi .scrollareas .scrolltitle{
	width: 100%; 
	height: 6%;
	background-color: #757575;
	color: white;
	text-align: center;
	vertical-align: middle;
	line-height: 26px;
}
.indivi .scrollarea{
	width: 100%; 
	height: 94%;
}
.indivi .scrollarea img{
	width: 100%; 
	height: 100%;
	margin: 2%;
	border: 1px solid #dcdcdc;
}
.indivi .scrollarea .qicon{
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	color: white;
} 
.indivi .scrollareas .mask{
	background-color: rgba(117,117,117,0.5);
	position: absolute;
	top: 0;
	width: 100%;
	padding-bottom: 100%;
	height: 0;
	margin: 2%;
}
.indivi .ss {
  width: 25%;
  height: 100%;
  border: 1px solid #535353;
  position: relative;
  background-color: white;
  display: inline-block;
  overflow: hidden;
}
.indivi .ss2 {
  width: 100%;
  height: 93%;
  border: 1px solid #535353;
  position: relative;
  background-color: white;
  display: inline-block;
  overflow: hidden;
}
.indivi .s1 {
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-image: url(../statics/t1.png);
  display: inline-block;
}
.indivi .s2 {
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-image: url(../statics/t1.png);
  position:absolute;
  top: 0px;
}
.indivi .bb{
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
.indivi .b1{
	height:35px;
	width:100px;
	background-color:#f8c698;
	margin: 0 15px;
	cursor: pointer;
}
.indivi .b2{
	height:35px;
	width:60px;
	background-color:#f8c698;
	margin: 0 15px;
	cursor: pointer;
}
.indivi .cat{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 20%;
}
.indivi .addbtn{
	width: 100%;
	height: 7%;
	padding: 0.3%;
	background-color: #757575;
	color: white;
	margin: 1px auto;
	text-align: center;
	font-size: 14px;
	line-height: 30px;
	padding-bottom: 5px;
	vertical-align: middle;
	cursor: pointer;
}
.indivi .title{
	font-size: 36px;
	color: #404343;
	position: absolute;
	top: 30%;
	width: 100%;
}
.indivi .animate p{
	font-size: 20px;
	color: #545454;
	width: 80%;
	position: absolute;
	left: 10%;
	font-weight: 300;
}
</style>