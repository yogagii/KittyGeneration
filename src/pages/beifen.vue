<template>
	<div class="flex flex-center" id="page">
		<page>
			<div style="background-color:rgba(141,188,188);opacity: 0.5;width: 100%;height:12%;position: fixed;bottom: 0px;"></div>
			<section class="animate" ref="section1">
			</section>
		</page>

		<page :currentPage="currentPage" class="q-pa-xl">
			<div class="row container">
				<div class="col-xs-12 line">
					<!--<div class="col-md-12 col-lg-12" style="height:40px;">
						<p style="margin: 0 auto;width:100%;text-align: center;font-size: 15px;color: red;">{{ErrMessage}}</p>
					</div>-->
					<!--<div id="imagePanel" class="col-md-5 col-lg-5" style="height: 100%;display: flex;align-items: center;justify-content:center;border: 1px solid #777777;">-->
					<div id="imagePanel" class="col-md-5 col-lg-5" style="height: 100%;display: flex;align-items: center;justify-content:center;background-color: #EDF0F2">
						<img id="previewImage" :src=bigimg style="max-height: 100%;max-width:100%;position: absolute;">
					</div>
					<div class="col-md-2 col-lg-2" style="height: 100%;">
						<q-scroll-area style="width: 100%; height: 100%;">
							<div style="margin:0 40% 0 0;background-color:rgba(228,229,232,1);">
								<img v-for="s in imgsrc" :src=s style="width: 100%;margin: 2%;" @click="pickimg(s)" />
							</div>
						</q-scroll-area>
					</div>
					<div id="resultPanel" class="col-md-5 col-lg-5" style="height: 100%;">
						<div style="height:30px;width: 100%;margin-top: 10px;">
							<p style="margin: 0 auto;width:100%;text-align: center;font-size: 15px;color: #777777;">请上传本地图片或提供图片URL。</p>
						</div>
						<div id="uploader" style="margin: 0;">
							<label for="saveImage" id="labfile" style="font-size: 13px;padding: 7.5px 10px;background:darkgray;color:white;border:none;border-radius:5px;cursor: pointer;">本地上传</label>
							<input type="file" id="saveImage" @change="great()" ng-file-select='install($files)' style='display:none'/>
							<!--<q-uploader no-thumbnails stack-label="上传本地图片" :url="url" @finish="addurl()"/>-->
							<!--<q-uploader :url="url" stack-label="上传本地图片" @start="addurl()" :url-factory="getSignedUrl"/>-->
							<input type="text" id="imageUrl" class="form-control choose" placeholder=" 输入图片URL" v-model="inputurl" style="display: inline;width: 70%;margin: 0 10px;">
							<div style="background-image: url(../assets/img/ok3.PNG);width:34px;height:34px;display: inline-block;position: absolute;" @click="enterUrl"></div>
						</div>
						<div style="height:30px;width: 100%;margin-top: 20px;" v-show="messagebar">
							<p style="margin: 0 auto;width:100%;text-align: center;font-size: 15px;color: #278EE7;">{{ErrMessage}}</p>
						</div>
						<div style="width: 100%;height:40px;margin-top: 10px;" v-show="progressbar">
							<q-progress :percentage="progress" stripe animate style="height: 20px" />
						</div>
						
						<div id="resultPanel" style="position: absolute;bottom: 0px;height: 60%;width: 100%;">
							<div style="width: 100%;height:100%;padding-right: 30px;">
								<q-btn color="blue-13" text-color="white" label="开始" size="md" class="startbtn" @click="StartOCR" id="btnStartOCR"/>
								<q-btn color="light" text-color="faded" label="重置" size="md" outline class="resetbtn" @click="reset"/>
								<div style="background-color:white;width: 100%;height: 80%;border: 1px solid grey;margin-top: 20px;position: relative;">
									<p class="all-center" style="margin: 0;font-size: 15px;color: lightgrey;">{{resultText}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
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

	function afterEnterAnimate($child) {
		console.log('childdddddddddddddd')
		console.log($child)
		$child.$el.querySelector('.animate').classList.remove('move-left', 'move-right');
	}

	function beforeLeaveAnimate($child) {
		let moveType = Math.random() > 0.5 ? 'move-left' : 'move-right';
		$child.$el.querySelector('.animate').classList.add(moveType);
  }

import { lazy } from '../assets/mixins/lazy'
export default {
	name:'PageIndex',
	mixins: [lazy],
	components: {
		Page,
		PageController
	},
	data() {
		return {
			imgsrc:['../assets/img/1.jpg','../assets/img/2.jpg','../assets/img/3.jpg','../assets/img/4.jpg','../assets/img/5.jpg','../assets/img/6.jpg'],
			bigimg:'../assets/img/1.jpg',
			inputurl:'',
			url:'',
			detectType:'watermeterPanel',
			resultText:'识别结果',
			progress: 100,
			progressbar: false,
			messagebar: false,
			
			currentPage: 1,
			options: [{
					// the color of background
					background: 'rgba(255, 255, 255, 1)',
					// the color of text
					color: '#fff',
					// is content center
					isCenter: false,
					// the function before page show
					afterEnter: afterEnterAnimate,
					// the function after page show
					beforeLeave: beforeLeaveAnimate
				}, {
					background: '#F7FAFF',
					color: '#000',
					isCenter: true,
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
			this.bigimg=src
			this.messagebar = false;
			this.progressbar = false;
		},
		enterUrl(){
			if(!this.inputurl){
				this.ErrMessage = '请提供图片URL'
				this.messagebar = true;
				this.progressbar = false;
			}else{
				this.bigimg=this.inputurl;
				this.messagebar = false;
				this.progressbar = false;
			}
		},
		addurl(){
			this.bigimg = document.getElementsByClassName('q-uploader-file')[0].getElementsByTagName('img')[0].src
		},
		reset(){
			console.log('reset')
			this.bigimg=this.imgsrc[0]
			this.inputurl = ''
			this.ErrMessage=''
			this.progressbar = false;
     		this.messagebar = false;
		},
		async getSignedUrl(file){
			console.log(file)
//			const contentType = file.type // 发送正确的Content-Type
//			const fileName = file.name // 如果你想使用这个值来计算S3密钥。
//			const response = await api.getSignedUrl({ fileName, contentType }) // 你的API向一个计算的服务器请求调用
//			console.log(response.data.url)
//			return response.data.url
		},
     //实时显示该图片在页面
     great(){
//          document.getElementById('saveImage').onchange = function () {
          	console.log(document.getElementById('saveImage').files[0])
     
            var imgFile = document.getElementById('saveImage').files[0]
            var fr = new FileReader();
            fr.readAsDataURL(imgFile);
            fr.onload = () =>{
             //console.log(fr.result)
              this.bigimg = fr.result;
            };
			this.messagebar = false;
			this.progressbar = false;
            console.log( fr.readAsDataURL)
//        }
       },
		
	},
     //实时显示该图片在页面
  
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


.startbtn{
	width:48%;
	background-color: grey;
}
.resetbtn{
	width:48%;
	float:right;
	background-color: grey;
}

.slide {
    width:1920px;
    height:1080px;
    list-style: none;
  }
.slideshow {
    width: 100%;
    height: 100%;
  }
</style>