import { catsvg } from '../js/catsvg.js'
import { colors } from '../js/matchcolours.js'

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
var patternmap = {"1":1,"2":3,"3":10,"4":15,"5":29,"6":31,"7":52,"8":40,"9":78,"10":55,"11":124,"12":147,"13":58,"14":61,"15":114,"16":66,"17":142}

export const svgcatsIndivi = {
	methods: {
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
		generateCat(gencat){
			let pattern = this.deepClone(catsvg["pattern"][gencat[0]])
			let body = this.deepClone(catsvg["body"][gencat[1]])
			let tail = this.deepClone(catsvg["tail"][gencat[2]])
			let eye = catsvg["eye"][gencat[3]][0]
			let mouth = catsvg["mouth"][gencat[4]][0]
			let colorbar = new Array()
			let pm = patternmap[gencat[0]]-1
			console.log(pm)
			console.log(colors)
			let catcolor = colors[keys[pm]]['rgb'];
			for(let j = 0; j < 5; j++) {
				let colorstr = 'rgb('
				colorstr += Math.round(catcolor[j][0] * 255) + ','
				colorstr += Math.round(catcolor[j][1] * 255) + ','
				colorstr += Math.round(catcolor[j][2] * 255) + ')'
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
			$('#cat9').append(svg)
		}
	}
}

