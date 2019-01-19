import { catsvg } from '../js/catsvg.js'
import { colors } from '../js/matchcolours.js'

var genku = [17, 7, 3, 17, 14]
var gen = []
var keys = [];
for(var p in colors) {
	keys.push(p);
}

var crossRate = 0.5;
var mutateRate = 0.1;
var degeneration = 1;
var showsize = 24

var svg1 = `<div style="width: 16%;display:inline-block;"><svg viewBox="180 0 3000 2800" preserveAspectRatio="none">
<g clip-path="url(#kittyClipPath)">
	<g id="tailFur">`
var svg2 = `<g clip-path="url(#tailFurClipPath)">`
var svg3 = `</g>
	</g>`
var svg4 = `</g>
<g clip-path="url(#kittyClipPath)">
	<g id="bodyFur">`
var svg5 = `</g>`
var svg6 = `</g>`
var svg7 = `</svg></div>`

var checkbox1 = `<input type="checkbox" value="`
var checkbox2 = `" v-model="checkedNames" style="width: 20px; height: 20px; display:inline-block;">`

export const svgcatsGA = {
	data(){
		return{
			popsize: 50,
			curgeneration: [],
			showgeneration: [],
			halfcurgeneration: [],
			checkedNames: [],
			chosenNum: 0,
			fscore: 1,
			chosenOne: [],
			generation: 1,
			fitness: [],
			nextgeneration: [],
			hasfinish: false,
			storagegen:{},
			dms: [],
		}
	},
	created: function() {
		/*for(let i = 0; i < this.popsize; i++) {
			console.log(i)
			this.randomCat(i)
		}*/
	},
	watch: {
		currentPage(){
			if(this.currentPage==2){
				//console.log("cccccccccccccccccccccccccc")
				for(let i = 0; i < this.popsize; i++) {
					//console.log(i)
					this.randomCat(i)
				}
			}else{
				let catdom = document.getElementById("cats")
				let childs = catdom.childNodes;
				for(let i = childs.length - 1; i >= 1; i--) { 
					catdom.removeChild(childs[i]); 
				}
			}
		}
	},
	methods: {
		CalFitness: function() {
			console.log("第" + this.generation + "代");
			this.generation++;
			//如果此代有选择fscore才增加
			if(this.checkedNames.length>0){
				this.fscore++;
			}
			//将选中的加入chosenOne
			console.log("选择: "+this.checkedNames)
			for(let ele in this.checkedNames) {
				let checkedNamesArray = this.curgeneration[this.checkedNames[ele]];
				
				let cnt = 0;
				let inumber = 0;
				for(let ii = 0; ii < this.chosenOne.length; ii++) {
					for(let j = 0; j < 6; j++) {
						if(checkedNamesArray[j] != this.chosenOne[ii][j]) {
							cnt++;
							break;
						}
						inumber = ii;
					}
				}
				if(cnt==this.chosenOne.length) {
					//console.log("hasnotexit");
					this.chosenOne.push(this.deepClone(checkedNamesArray));
					this.chosenOne[this.chosenOne.length-1][6]=this.fscore;
					
				}else{
					//console.log("hasexit");
					this.chosenOne[inumber][6] = this.fscore;
				}
				console.log("chosenOne: "+this.chosenOne)
				
				this.storagegen[checkedNamesArray]= this.fscore;
			}
			this.chosenNum = this.chosenOne.length;
			//console.log("chosenOne: ")
			//console.log(this.chosenOne)
			//console.log("chosenNum: "+this.chosenNum)
	
			//CalFitness()
			for(let i = 0; i < this.popsize; i++) {
				let f = 1;
				for(let ii = 0; ii < this.chosenNum; ii++) {
					if(this.compareArrs(this.curgeneration[i],this.chosenOne[ii])){
						f = this.chosenOne[ii][6];
						break;
					}
				}
				this.fitness[i] = f;
				//console.log(i + ": " + this.fitness[i]); //数字！=字符串
			}
			
			//console.log(this.fitness)
	
			//WheelSelect()
			let wheel = new Array();
			let selected = new Array();
			wheel[0] = 0;
			let sum = 0;
			for(let i = 0; i < this.popsize; i++) {
				sum += Math.ceil(this.fitness[i]*degeneration);
				wheel[i + 1] = wheel[i] + Math.ceil(this.fitness[i]*degeneration);
			}
			for(let i = 0; i < this.popsize*2; i++) {
				let r = Math.ceil(Math.random() * sum);
				//print("r:"+r);
				for(let j = 0; j < this.popsize; j++) {
					if(r >= wheel[j] && r <= wheel[j + 1]) {
						selected[i] = j;
						//console.log(selected[i])
						break;
					}
				}
			}
	
			//CreateNextGeneration()
			for(let i = 0; i < this.popsize; i++) {
				this.Crossover(selected[i*2], selected[i*2 + 1], i); //将序号为selected[i]和selected[i + 1]的染色体进行交叉，产生的子代放在pregeneration中i和i+1的位置
			}
			this.Mutation(); //变异
	
			//console.log('ProduceNext')
			//ProduceNext()
			let catdom = document.getElementById("cats")
			let childs = catdom.childNodes; 
			console.log("%c childNodes: "+childs.length,"color:red")
			for(let i = childs.length - 1; i >= 1; i--) { 
				catdom.removeChild(childs[i]); 
			}
			//console.log(this.nextgeneration)
			this.curgeneration = new Array()
			this.curgeneration[0] = this.deepClone(this.nextgeneration[0])
			for(let i = 1; i < this.popsize; i++) {
				let len = this.curgeneration.length
				for(let j = 0; j < len; j++){
					if(this.compareArrs(this.curgeneration[j],this.nextgeneration[i])){
						this.curgeneration.push(this.deepClone(this.nextgeneration[i]))
						break
					}
					if(j == len-1){
						this.curgeneration.unshift(this.deepClone(this.nextgeneration[i]))
					}
					
				}
			}
			this.dms=$("#cats").children();
			//console.log(this.dms)
			for(let i = 0;i<showsize;i++){
				this.generateCat(i,2)
			}
			//console.log(this.curgeneration)
			//console.log('finish');
			//this.FinishJudgement();
			this.checkedNames = [];
			
		},
		
		randomCat: function(cat) {
			let idp = Math.floor((Math.random() * genku[0]) + 1);
			let idb = Math.floor((Math.random() * genku[1]) + 1);
			let idt = Math.floor((Math.random() * genku[2]) + 1);
			let ide = Math.floor((Math.random() * genku[3]) + 1);
			let idm = Math.floor((Math.random() * genku[4]) + 1);
			gen[cat] = [idp, idb, idt, ide, idm]
			//console.log(idp + "/17," + idb + "/7," + idt + "/3," + ide + "/17," + idm + "/14")
	
			let ar = Math.floor(Math.random() * keys.length)
			gen[cat].push(ar)
			//let colorrandom = colors[keys[ar]]['rgb'];
			//console.log("colorrandom: " + ar)
			//this.curgeneration[cat] = gen[cat].concat(colorrandom)
			this.curgeneration[cat] = this.deepClone(gen[cat])
			if(cat<showsize){
				this.generateCat(cat,1)
			}
		},
		
		randomaCat: function() {
			let randcat = []
			randcat.push(Math.floor((Math.random() * genku[0]) + 1));
			randcat.push(Math.floor((Math.random() * genku[1]) + 1));
			randcat.push(Math.floor((Math.random() * genku[2]) + 1));
			randcat.push(Math.floor((Math.random() * genku[3]) + 1));
			randcat.push(Math.floor((Math.random() * genku[4]) + 1));
			//console.log(randcat)
	
			let ar = Math.floor(Math.random() * keys.length)
			randcat.push(ar)
			//let colorrandom = colors[keys[ar]]['rgb'];
			//console.log("colorrandom: " + ar)
			//randcat =randcat.concat(colorrandom)
			return randcat
		},
	
		deepClone: function(obj) {
			if(Array.isArray(obj)){
				let objClone = [];
				if(obj && typeof obj === "object") {
					for(let key in obj) {
						if(obj.hasOwnProperty(key)) {
							if(obj[key] && typeof obj[key] === "object") {
								objClone[key] = this.deepClone(obj[key]);
							} else {
								objClone[key] = obj[key];
							}
						}
					}
				}
				return objClone;
			}else{
				return obj
			}
		},
		
		joinarr: function(arr){
			arr.forEach(function(a,i){
				if(Array.isArray(a)){
					arr[i] = a.join('-')
				}
			})
			arr = arr.join('-')
			return arr
		},
		
		compareArrs: function(arr1,arr2){
			for(let i = 0;i<arr1.length;i++){
				if(Array.isArray(arr1[i])){
					if (!this.compareArrs(arr1[i],arr2[i])){
						return false
					}
				}else{
					if(arr1[i]!=arr2[i]){
						return false
					}
				}
			}
			return true
		},
		
		//交叉==>将序号为selected[i]和selected[i + 1]（这里形参是p1，p2）的染色体进行交叉，产生的子代放在pregeneration中i和i+1（这里形参是c1，c2）的位置
		Crossover: function(p1, p2, c1) {
			let dr = Math.random();
			//如果随机数小于杂交率，则杂交
			this.nextgeneration[c1] = new Array();
			//this.nextgeneration[c2] = new Array();
			if(dr < crossRate) {
				for(let i = 0; i < 6; i++) {
					let covering_code = Math.round(Math.random());
					//0不交换
					if(covering_code == 0) {
						this.nextgeneration[c1][i] = this.deepClone(this.curgeneration[p1][i]);
						//this.nextgeneration[c2][i] = this.deepClone(this.curgeneration[p2][i]);
					}
					//1交换
					else {
						this.nextgeneration[c1][i] = this.deepClone(this.curgeneration[p2][i]);
						//this.nextgeneration[c2][i] = this.deepClone(this.curgeneration[p1][i]);
					}
				}
			}
			//高于杂交率，不杂交
			else {
				this.nextgeneration[c1] = this.deepClone(this.curgeneration[p1]);
				//this.nextgeneration[c2] = this.deepClone(this.curgeneration[p2]);
			}
		},
		
		//变异
		Mutation: function() {
			for(let i = 0; i < this.popsize; i++) {
				let dr = Math.random();
				//若果随机数小于变异率，则变异
				if(dr < mutateRate) {
					this.nextgeneration[i] = this.randomaCat();
				}
			}
		},
	
		generateCat: function(x,y) {
			let pattern = this.deepClone(catsvg["pattern"][this.curgeneration[x][0]])
			let body = this.deepClone(catsvg["body"][this.curgeneration[x][1]])
			let tail = this.deepClone(catsvg["tail"][this.curgeneration[x][2]])
			let eye = catsvg["eye"][this.curgeneration[x][3]][0]
			let mouth = catsvg["mouth"][this.curgeneration[x][4]][0]
			
			//console.log(this.curgeneration[x])
			//console.log(keys[this.curgeneration[x][5]])
			//console.log(colors[keys[this.curgeneration[x][5]]]['rgb'])
			let catcolor = this.deepClone(colors[keys[this.curgeneration[x][5]]]['rgb']);
			let colorbar = new Array()
			for(let j = 0; j < 5; j++) {
				let colorstr = 'rgb('
				colorstr += Math.round(catcolor[j][0] * 255) + ','
				colorstr += Math.round(catcolor[j][1] * 255) + ','
				colorstr += Math.round(catcolor[j][2] * 255) + ')'
				colorbar.push(colorstr)
			}
	
			let colorSet = new Array();
			pattern[0].match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(colorSet.indexOf(path) == -1) {
					if(path.slice(6, 7) == '#') {
						colorSet.push(path);
					}
				}
			})
			pattern[1].match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(colorSet.indexOf(path) == -1) {
					if(path.slice(6, 7) == '#') {
						colorSet.push(path);
					}
				}
			})
			colorSet.forEach(function(col, i) {
				let colstr = new RegExp(col, 'g')
				let newcolor = 'fill="' + colorbar[i * 2] + '"'
				pattern[0] = pattern[0].replace(colstr, newcolor)
				pattern[1] = pattern[1].replace(colstr, newcolor)
			})
			eye = eye.replace(/stop-color=\"(.*?)\"/g, 'stop-color="' + colorbar[1] + '"')
			let eyelid = ''
			eye.match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(path.slice(6, 7) != 'n' && path.slice(6, 7) != 'u' && path.slice(7, 13) != '31323d' && path.slice(7, 13) != '31323D' && path.slice(7, 10) != 'fff' && path.slice(7, 10) != 'FFF') {
					eyelid = path;
				}
			})
			if(eyelid) {
				let eyelidstr = new RegExp(eyelid, 'g')
				eye = eye.replace(eyelidstr, 'fill="' + colorbar[3] + '"')
			}
			let svg = svg1 + tail[0] + svg2 + pattern[0] + tail[1] + svg3 + tail[2] + svg4 + body[0] + pattern[1] + svg5 + body[1] + svg6 + eye + mouth + svg7
	
			$('#cats').append(svg)
			
		}
	}


}
	
