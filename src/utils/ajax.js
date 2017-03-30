import $ from 'jquery';

import LoadingBar from '../../vendor/iview/src/components/loading-bar'

$.ajaxSetup({
	beforeSend( jqXHR, opts){
		jqXHR.options = opts;
		LoadingBar.config({ color: '#1ab394',failedColor: '#f0ad4e',height:5});
		LoadingBar.start();
		console.log('beforesend',jqXHR,opts)
		if(opts.loading){

		}
	},
	//Anything data, String textStatus, jqXHR jqXHR
	success(data,textStatus,jqXHR){
		LoadingBar.finish();
		console.log(['opts success',jqXHR.options])
	},
	//jqXHR jqXHR, String textStatus, String errorThrown
	error(jqXHR, textStatus, errorThrown ){
		LoadingBar.error();
		console.log(['opts error',jqXHR.options])

	},
	//jqXHR jqXHR, String textStatus
	complete(jqXHR,textStatus){
		LoadingBar.finish();
		console.log(['opts complete',jqXHR.options])

	}
});

var ajaxObj = function (method,url,params,opts) {

	this.opts = Object.assign({},{
		url:url,
		method: method,
		data:params,
		dataType:'json'
	},opts);

};

ajaxObj.prototype.json = function (cb=null) {
		this.opts.dataType = 'json';
		return $.ajax(this.opts).done(cb).fail().always;
};

ajaxObj.prototype.html = function (cb) {
	this.opts.dataType = 'html';
	return $.ajax(this.opts).done(cb);
};

export default {
	put(url,params={},opts={}){
		return new ajaxObj('put',url,params,opts);
	},
	get(url,params={},opts={}){
		console.log(this.ajax);
		return new ajaxObj('get',url,params,opts);
	},
	post(url,params={},opts={}){
		return new ajaxObj('post',url,params,opts);
	},
	del(url,params={},opts={}){
		return new ajaxObj('delete',url,params,opts);
	},
	head(url,params={},opts={}){
		return new ajaxObj('head',url,params,opts);
	},
	req(opts){
		let url,params;
		if (typeof opts == 'string'){
			url = opts;
		}else if(typeof opts == 'object'){
			url = opts.url;
			params=opts.params;
		}

		return new ajaxObj('get',url).json((d)=>{console.log(d)});
	}
};