<template>
    <Form
            ref = "ajaxForm"
            :rules="formData.rules"
            :model="formData.forms"
            :label-width="labelWidth"
            :label-position="labelPosition"
            :inline="inline"
            :show-message="showMessage">
        <slot> </slot>

        <slot name="submit">
            <Form-item>
                <Button type="primary" @click="submit" :loading="loading" v-if="showSubmit">提交</Button>
                <Button type="ghost" @click="reset" class="margin-left-8" v-if="showReset">重置</Button>
            </Form-item>
        </slot>
    </Form>
</template>
<script lang="babel">
    import jquery from 'jquery'
    import {oneOf,handleAjaxResult} from '../../utils/fn'
    export default{
        name:'AjaxForm',
        props: {
            formData:{
                type:Object,
                required:true,
                default: {forms:{},rules:{}}
            },
            ajax:{
                type:Boolean,
                default:true
            },
            url:{
                type:String,
                required:true
            },
            method:{
                type:String,
                validator (value) {
                    return oneOf(value, ['get', 'post', 'put', 'delete']);
                },
                default:'get'
            },
            showReset:{
                type:Boolean,
                default:true

            },
            showSubmit:{
                type:Boolean,
                default:true

            },
            labelWidth: {
                type: Number
            },
            labelPosition: {
                type:String,
            },
            inline: {
                type: Boolean,
                default: false
            },
            showMessage: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return{
                loading:false
            }
        },
        created(){
          console.log(this.$props,);
        },
        methods:{
            submit(){
                this.$refs.ajaxForm.validate((valid) => {
                    if (valid) {
                        if(this.ajax){
                            this.submitAjax();
                        }else{
                            this.$refs.ajaxForm.$el.submit();
                        }
                    } else {
                        console.log('表单验证失败!');
                    }
                })
            },
            reset(){
                this.$refs.ajaxForm.resetFields();
            },
            submitAjax(){
                this.loading = true;
                jquery.ajax(this.url,{
                    method: this.method,
                    data:this.formData.forms,
                    dataType:'json'
                }).done( data=>{
                    if(data.code == 200){
                        this.$emit('on-submit',data);
                    }
                    handleAjaxResult(data);
                }).fail(data=>{
                    this.$Modal.error({
                        title: data.statusText,
                        content: data.responseText.getBody()
                    });
                }).always(()=>{this.loading = false;})
            }
        },
        components:{}
    }
</script>
