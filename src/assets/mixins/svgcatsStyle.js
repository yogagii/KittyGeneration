import { catsvg } from '../js/catsvg.js'
import { colors } from '../js/matchcolours.js'

var crossRate = 0.5;
var mutateRate = 0.2;

var svg1 = `<div class="cat"><svg viewBox="180 400 3000 3000" preserveAspectRatio="none">
<g clip-path="url(#kittyClipPath)">
	<g id="tailFur">`
var svg2 =`<g clip-path="url(#tailFurClipPath)">`
var svg3 = `</g>
	</g>`
var svg4 = `</g>
<g clip-path="url(#kittyClipPath)">
	<g id="bodyFur">`
var svg5 = `</g>`
var svg6 = `</g>`
var svg7 = `</svg></div>`

var genku = [17,7,3,17,14]
var gen = []
var keys = [];
for (var p in colors){
	keys.push(p);
}

var pattern = []

export const svgcatsStyle = {
	methods: {
		randomCat(cat){
			let idp = Math.floor((Math.random()*genku[0])+1);
			let idb = Math.floor((Math.random()*genku[1])+1);
			let idt = Math.floor((Math.random()*genku[2])+1);
			let ide = Math.floor((Math.random()*genku[3])+1);
			let idm = Math.floor((Math.random()*genku[4])+1);
			gen[cat]=[idp,idb,idt,ide,idm]
			console.log(idp+"/17,"+idb+"/7,"+idt+"/3,"+ide+"/17,"+idm+"/14")
			
			let ar = Math.floor(Math.random()*keys.length)
			let colorrandom = colors[keys[ar]]['rgb'];
			//console.log("colorrandom: "+ar)
			gen[cat]=gen[cat].concat(colorrandom)
			this.generateCat(cat)
		},
		deepClone(obj){
		    let objClone = Array.isArray(obj)?[]:{};
		    if(obj && typeof obj==="object"){
		        for(let key in obj){
		            if(obj.hasOwnProperty(key)){
		                if(obj[key]&&typeof obj[key] ==="object"){
		                    objClone[key] = this.deepClone(obj[key]);
		                }else{
		                    objClone[key] = obj[key];
		                }
		            }
		        }
		    }
		    return objClone;
		},  
		generateCat(x){
			let pattern = this.deepClone(catsvg["pattern"][gen[x][0]])
			let body = this.deepClone(catsvg["body"][gen[x][1]])
			let tail = this.deepClone(catsvg["tail"][gen[x][2]])
			let eye = catsvg["eye"][gen[x][3]][0]
			let mouth = catsvg["mouth"][gen[x][4]][0]
			let colorbar = new Array()
			for(let j = 0; j < 5; j++) {
				let colorstr = 'rgb('
				colorstr += Math.round(gen[x][5+j][0] * 255) + ','
				colorstr += Math.round(gen[x][5+j][1] * 255) + ','
				colorstr += Math.round(gen[x][5+j][2] * 255) + ')'
				colorbar.push(colorstr)
			}
			console.log(colorbar)
			
			let colorSet = new Array();
			pattern[0].match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(colorSet.indexOf(path) == -1) {
					if(path.slice(6,7)=='#'){
						colorSet.push(path);
					}
				}
			})
			pattern[1].match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(colorSet.indexOf(path) == -1) {
					if(path.slice(6,7)=='#'){
						colorSet.push(path);
					}
				}
			})
			colorSet.forEach(function(col,i) {
				let colstr =  new RegExp(col,'g')
				let newcolor = 'fill="'+colorbar[i*2]+'"'
				pattern[0]=pattern[0].replace(colstr,newcolor)
				pattern[1]=pattern[1].replace(colstr,newcolor)
			})
			eye=eye.replace(/stop-color=\"(.*?)\"/g,'stop-color="'+colorbar[1]+'"')
			let eyelid = ''
			eye.match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(path.slice(6,7)!='n' && path.slice(6,7)!='u' && path.slice(7,13)!='31323d' && path.slice(7,13)!='31323D' && path.slice(7,10)!='fff'&& path.slice(7,10)!='FFF'){
					eyelid=path;
				}
			})
			if(eyelid){
				let eyelidstr =  new RegExp(eyelid,'g')
				//console.log(eyelidstr)
				//console.log(colorbar[3])
				eye=eye.replace(eyelidstr,'fill="'+colorbar[3]+'"')
			}
			//console.log(eye)
			
		
			
			var svg = svg1+tail[0]+svg2+pattern[0]+tail[1]+svg3+tail[2]+svg4+body[0]+pattern[1]+svg5+body[1]+svg6+eye+mouth+svg7
			$('#cat'+x).append(svg)
			this.showgrid = false
		},
		styleMixCat(c1,s,c2){
			let pattern = []
			let body = this.deepClone(catsvg["body"][gen[c1][1]])
			let tail = this.deepClone(catsvg["tail"][gen[c1][2]])
			let eye = catsvg["eye"][gen[c1][3]][0]
			let mouth = catsvg["mouth"][gen[c1][4]][0]
			let colorbar = new Array()
			for(let j = 0; j < 5; j++) {
				let colorstr = 'rgb('
				colorstr += Math.round(gen[c1][5+j][0] * 255) + ','
				colorstr += Math.round(gen[c1][5+j][1] * 255) + ','
				colorstr += Math.round(gen[c1][5+j][2] * 255) + ')'
				colorbar.push(colorstr)
			}
			console.log(colorbar)
			
			eye=eye.replace(/stop-color=\"(.*?)\"/g,'stop-color="'+colorbar[1]+'"')
			let eyelid = ''
			eye.match(/fill=\"(.*?)\"/g).forEach(function(path) {
				if(path.slice(6,7)!='n' && path.slice(6,7)!='u' && path.slice(7,13)!='31323d' && path.slice(7,13)!='31323D' && path.slice(7,10)!='fff'&& path.slice(7,10)!='FFF'){
					eyelid=path;
				}
			})
			if(eyelid){
				let eyelidstr =  new RegExp(eyelid,'g')
				//console.log(eyelidstr)
				//console.log(colorbar[3])
				eye=eye.replace(eyelidstr,'fill="'+colorbar[3]+'"')
			}
			//console.log(eye)
			let src = s.slice(-5,-4)
			pattern[0] = `<image xlink:href="../assets/img/style/`+src+`_`+gen[c1][0]+`.jpg" clip-path="url(#tailFurClipPath)"></image>`
			pattern[1] = `<image xlink:href="../assets/img/style/`+src+`_`+gen[c1][0]+`.jpg" clip-path="url(#furClipPath)"></image>`
			
			var svg = svg1+tail[0]+svg2+pattern[0]+tail[1]+svg3+tail[2]+svg4+body[0]+pattern[1]+svg5+body[1]+svg6+eye+mouth+svg7
			$('#cat'+c2).append(svg)
			this.showgrid = false
		}
	}
}

