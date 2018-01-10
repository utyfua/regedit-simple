//https://commandwindows.com/reg.htm
var path = require('path');
const exec = require('child_process').exec;
const basePath = path.join(process.env.WINDIR, 'system32', 'reg.exe');
function executeQuery(query) {
	return new Promise(resolve=>
		exec(basePath+' '+query, (error, stdout, stderr) =>
			resolve({error, stdout, stderr})
		)
	);
};
exports.query=exports.get=exports.getKey=(obj)=>(
	typeof obj==='string'&&(obj={target:obj}),
	executeQuery(
		'query '+obj.target+
		(obj.name?' /v '+obj.name:'')+
		(obj.type?' /t '+obj.type:'')
	)
	.then(data=>{
		if(data.error)return data;
		var arr=data.stdout.split('\r\n'),
			i=2,
			ret={ths:arr[1],values:{},valuesTypes:{}},
			tmp;
		for(;i<arr.length;i++){
			if(!arr[i])break;
			tmp=arr[i].split('    ');
			if(!tmp[3])break;
			ret.values[tmp[1]]=tmp[3];
			ret.valuesTypes[tmp[1]]=tmp[2];
		}
		ret.childsList=arr.slice(i+1,arr.length-1).filter(i=>i);
		ret.childsListAbs=ret.childsList.map(i=>(i=i.split('\\'),i[i.length-1]));
		return ret;
	})
);
exports.add=exports.addKey=(obj)=>executeQuery(
		' add ' + entry.target+
		' /v ' + entry.name+
		' /t ' + entry.type+
		' /d ' + entry.value+
		' /f'
	)
	.then(data=>data.error||data.stdout);
exports.delete=exports.del=exports.del=(obj)=>(
	typeof obj==='string'&&(obj={target:obj}),
	executeQuery(
		' delete ' + obj.target+
		(obj.name?' /v ' + obj.name:'')+
		(obj.del_default?' /ve':'')+
		(obj.del_all?' /va':'')+
		' /f'
	)
	.then(data=>data.error||data.stdout)
);