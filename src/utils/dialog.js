import $ from 'jquery';
let modalInstance;
let Dialog = {};

Dialog.newInstance  = properties => {
	const _props = properties || {};
	const div = document.createElement('div');
	div.innerHTML = `
 	<Modal v-model="visible" :width="width" :title="title" @on-ok="ok" :footer-hide="footerHide" :mask-closable="maskClosable" :closable="closable" @on-cancel="cancel">
   	<div style="position: relative;min-height: 30px;">
        <div id="dialog-body">	</div>
        <div class="ivu-modal-confirm-footer" v-if="showOk || showCancel">
        	<i-button type="text"  v-if="showCancel" @click.native="cancel">{{ cancelText }}</i-button>
            <i-button type="primary"  v-if="showOk"  @click.native="ok">{{ okText }}</i-button>
        </div>
        <Spin fix v-if="spinShow"></Spin>
	</div>
    </Modal>

    `;
	document.body.appendChild(div);

	const modal = new Vue({
		el: div,
		data: Object.assign({
			visible: false,
			width: 520,
			title: '',
			okText: '确定',
			cancelText: '取消',
			showCancel: false,
			showOk: true,
			footerHide:true,
			closable:true,
			maskClosable:false,
			url:'',
			content:'',
			spinShow:false
		},_props),
		watch:{
			content(val,oldVal){
				this.setContent(val);
			}
		},
		mounted(){
			if(this.url){
				let that = this;
				$.ajax({
					url     : this.url,
					dataType: 'html',
					method  : 'get',
					beforeSend(){
						that.spinShow = true
					}
				}).done((response)=> {
					this.setContent(response.getBody());
				}).fail((error)=> {
					this.setContent(error.responseText.getBody());
				}).always(()=> {
					this.spinShow = false
				});
			}else if(this.content){
				this.setContent(this.content);
			}
		},
		methods: {
			setContent(content){
				$(this.$el).find("#dialog-body").html(content);
			},
			cancel () {
				this.$children[0].visible = false;
				this.onCancel();
				this.remove();
			},
			ok () {
				console.log('ok')
				if (this.loading) {
					this.buttonLoading = true;
				} else {
					this.$children[0].visible = false;
					this.remove();
				}
				this.onOk();
			},
			onOk () {},
			onCancel () {},
			remove () {
				this.destroy();
			},
			destroy () {
				this.$destroy();
				document.body.removeChild(this.$el);
				this.onRemove();
			},
			onRemove () {}
		}
	}).$children[0];

	return {
		show () {
			modal.visible = true;
		},
		remove () {
			modal.visible = false;
			modal.$parent.remove();
		}
	};
};

Dialog.open = function (props = {}) {
	modalInstance = Dialog.newInstance(props);
	props.onRemove = function () {
		modalInstance = null;
	};
	modalInstance.show(props);
}

Dialog.remove = function () {
	if (!modalInstance) {   // at loading status, remove after Cancel
		return false;
	}
	modalInstance.remove();
};

export default Dialog;