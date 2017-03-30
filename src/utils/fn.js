import Vue from 'vue';
import iview from 'iview'
import Dialog from './dialog'

let Message = iview.Message;
let Notice = iview.Notice;
let Modal = iview.Modal;
const fnMenu = {
	/**
	 * 获取当前hash格式化为标准URL
	 * @returns {string}
	 */
	getCurrentHashUrl: function () {
		return this.formatHashUrl(location.hash);
	},

	/**
	 * 格式化URL并返回
	 * @returns {string}
	 */
	formatHashUrl: function (url) {
		let hashUrl = typeof url == 'undefined' ? "" : url;
		hashUrl     = hashUrl.replace(/(^#*)/g, '');
		if (hashUrl.indexOf("/") !== 0) {
			hashUrl = "/" + hashUrl;
		}
		return hashUrl;
	},

	//判断是否有子菜单
	hasChild: function (objChild) {
		return typeof objChild == 'object' && objChild.length > 0;
	},

	//格式化菜单URL
	showMenuUrl: function (url, target) {
		if (url) {
			if (target == '_blank' || target == '_self' || /^https?:\/\/.+/i.test(url)) {
				return url;
			} else if (target == 'ajax') {
				return this.formatHashUrl(url);
			} else {
				return '#' + this.formatHashUrl(url);
			}
		} else {
			return 'javascript:void(0);';
		}
	},

	//格式化菜单ICON内容
	showMenuIcon: function (icon) {
		if (icon && icon.substring(0, 1) != '<') {
			return '<i class="' + icon + '"></i>';
		} else if (icon) {
			return icon;
		} else {
			return '';
		}
	}
};
// 判断参数是否是其中之一
function oneOf(value, validList) {
	for (let i = 0; i < validList.length; i++) {
		if (value === validList[i]) {
			return true;
		}
	}
	return false;
}

const handleAjaxResult = function(data) {
	if (data.code == undefined) {
		return false;
	}

	let message = function (content,type = 'info') {
		if (!content) {
			return;
		}
		switch (type) {
			case 'success':
				Message.success(content);
				break;
			case 'error':
				Message.error(content);
				break;
			case 'warning':
				Message.warning(content);
				break;
			default:
				Message.info(content);
				break;
		}
	};
	let notice = function (title,desc = '', type = 'info') {
		if (!title) {
			return;
		}
		switch (type) {
			case 'success':
				Notice.success({title,desc});
				break;
			case 'error':
				Notice.error({title,desc});
				break;
			case 'warning':
				Notice.warning({title,desc});
				break;
			default:
				Notice.info({title,desc});
				break;
		}
	};
	let confirm = function (content,callback,loading = false) {

		Modal.confirm({
			title: '确认操作',
			content: content,
			loading: loading,
			onOk: () => {
				if(typeof(callback) == "function") {
					callback(true);
				}
			}
		});
	};
	let trCode=function (code) {
		if(typeof code == 'undefined'){
			return '';
		}
		let codeType;
		switch (data.code.toString().substring(0,1)) {
			case 2:
				codeType = 'success';
				break;
			case 3:case 5:
				codeType = 'error';
				break;
			case 4:
				codeType = 'warning';
				break;
			default:
				codeType = 'info';
				break;
		}
		return codeType;
	};
	let trCodeText=function (type) {
		switch (type) {
			case 'info' :
				return "提示";break;
			case 'success' :
				return "成功";break;
			case 'error' :
				return "错误";break;
			case 'warning' :
				return "警告";break;
		}

	};

	let msgType = trCode(data.code);
	let codeText = trCodeText(msgType);

	function showMsg(content,style,type,callback) {
		switch (style){
			case 'notice':
				notice(trCodeText(type),content,type);
				if(typeof(callback) == "function") {
					callback(true);
				}
				break;
			case 'confirm':
				confirm(content,callback);
				break;
			case 'message':
			default:
				message(content,type);
				if(typeof(callback) == "function") {
					callback(true);
				}
				break;
		}
	}

	switch (data.action) {
		case 'message' :
			showMsg(data.message,data.style, msgType);
			break;
		case 'reload' :
			showMsg(data.message,data.style, msgType,function () {
				//刷新
				var target = data.target;
				if (target) {
					var reloadObj = $(target).data('reloadObj');
					if (reloadObj && typeof reloadObj.reload == 'function') {
						reloadObj.reload();
					}
				}
			});
			break;
		case "redirect":
			//重定向
			showMsg(data.message,data.style, msgType,function () {
				if (data.target.startsWith('#')) {
					window.location.hash = data.target;
				} else {
					window.location.href = data.target;
				}
			});
			break;
		case 'dialog':
			showMsg(data.message,data.style, msgType,function () {
				Dialog.open({
					title:'用户查看',
					content:'内容',
					width:1000

				});
			});
			//$.wula.dialog(data.args.title, data.args.content, data.args.width, data.args.height, data.args.ajax)

			break;
		case 'update':
			if (data.message) {
				$.wula.notify(data.message, msgType);
			}
			if (data.args.append) {
				$(data.target).append(data.args.content);
			} else {
				$(data.target).html(data.args.content);
			}
			break;
		case 'validate':
			if (data.message) {
				$.wula.notify(data.message, msgType);
			}
			var fname = data.target;
			var errs  = data.args.errors || {};

			var obj = $('form[name="' + fname + '"]').data('validateObj');
			if (obj) {
				obj.showErrors(errs);
			}
			break;

		case 'click':
			break;
		case 'callback':
			break;
		case 'script':
			eval(data.target);
			break;
		default:
			break;
	}

};

export {fnMenu, oneOf, handleAjaxResult};