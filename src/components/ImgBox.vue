<template>
    <div class="main">
        <div class="img-item hover" v-for="(item,idx) of fileList" :key="idx">
            <el-image :ref="'image'+idx" class="img" :src="basePath+'/upload'+item[prop.path]"  :preview-src-list="srcList"></el-image>
            <!--            <img :src="basePath+'/upload'+item[prop.path]">-->
            <transition name="el-fade-in-linear">
                <div class="mask" v-if=" showSetting === 'both' || typeof showSetting === 'object'">
                    <div class="icon-btn-group">
                        <i v-if=" showSetting === 'both' || showSetting.indexOf('show') !== -1" class="el-icon-zoom-in" @click="showImg(item,idx)"></i>
                        <i v-if=" showSetting === 'both' || showSetting.indexOf('down') !== -1" class="el-icon-download" @click="downImg(item)"></i>
                        <i v-if=" showSetting === 'both' || showSetting.indexOf('delete') !== -1" class="el-icon-delete" @click="deleteImg(idx)"></i>
                    </div>
                </div>
            </transition>
        </div>
        <div v-if="showUpload" class="img-item upload">
            <el-upload :show-file-list="false" class="upload-box" multiple :http-request="httpRequest" action="#">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>


    </div>
</template>

<script>
    import {baseApi} from "../../config/config";
    import {copyObject, downloadFile} from "../../utils/utils";

    export default {
        name: "ImgBox",
        props:{
            // 现实文件列表
            fileList:{
                type:Array,
                default(){
                    return []
                }
            },
            // 指定绑定参数的名称 与地址名称,默认path 与name
            prop:{
                type:Object,
                default() {
                    return{
                        path:"path",
                        name:"name",
                        id:"id"
                    }
                }
            },
            // 是否显示上传弹框 默认true
            showUpload:{
                type:Boolean,
                default:true
            },
            // 是否显示操作按钮  默认都显示 both , none:不显示  ['show','down','delete'] 显示对应按钮,
            showSetting:{
                type:String | Array,
                default: 'both'
            }
        },
        data(){
            return{
                basePath:baseApi.fileUrl,
                imgDialog:false,
                imgUrl:'',
                srcList:[]
            }
        },
        //
        methods:{
            // 放大图片预览
            showImg(item,idx) {
                //this.imgDialog = true
                this.srcList = []

                this.srcList.push(this.basePath + '/upload' +  item[this.prop.path])
                this.$nextTick(()=>{
                    let str = 'image' + idx

                    this.$refs[str][0].clickHandler()
                })



            },
            // 下载图片
            downImg(item) {
                downloadFile(this.basePath + '/upload' +  item[this.prop.path],item[this.prop.name])
            },
            // 删除图片
            deleteImg(idx) {
                let arr = copyObject(this.fileList)
                arr.splice(idx,1)
                this.$emit('update:fileList',arr)
            },
            // 图片上传
            async httpRequest(file) {
                let formData = new FormData()
                formData.append('files',file.file)
                const {data,success,message} = await this.formAxios('/api/common/uploadForm',formData).catch(err=>{
                    this.$message.error(err.message)
                })
                if (success) {
                    let arr = copyObject(this.fileList)
                    let obj = new Object();
                    obj[this.prop.name] = data.pics[0].fileName
                    obj[this.prop.path] = data.pics[0].filePath
                    obj[this.prop.id] = data.pics[0].id
                    arr.push(obj)
                    this.$emit('update:fileList',arr)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/styles/color.scss";
    .main {
        >.img-item{
            width: 80px;
            height: 80px;
            border: 1px dashed $boderAsh;
            border-radius: 4px;
            display: inline-block;
            vertical-align: top;
            margin-left: 10px;
            padding: 1px;
            position: relative;
            margin-bottom: 10px;
            >.img{
                max-height: 78px;
                max-width:78px ;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
            >.upload-box{
                height: 76px;
                width: 76px;
                text-align: center;
                line-height: 76px;
                font-size: 20px;
                font-weight: 600;
                ::v-deep .el-upload{
                    width: 76px;
                }

            }
        }
        >.hover{
            >.mask{
                display: none;
                width: 78px;
                height: 78px;
                background: #7374779e;
                position: absolute;
                left: 0;
                top: 0;
                line-height: 78px;
                >.icon-btn-group{
                    text-align: center;
                    >i{
                        color: #ffffff;
                        font-size: 16px;
                        margin-right: 8px;
                        cursor: pointer;
                        &:first-child{
                            margin-left: 5px;
                        }
                    }
                }
            }
            &:hover{
                >.mask{
                    display: block;
                }
            }
        }
    }
    .dialog {
        ::v-deep .el-dialog {
            display: flex;
            flex-direction: column;
            margin: 0 !important;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            /*height:600px;*/
            max-height: calc(100% - 30px);
            max-width: calc(100% - 30px);

            > .el-dialog__header {
                display: none;
            }

            > .el-dialog__body {
                padding: 0;
            }
        }
    }
    .img-body {
        height: 670px;
        position: relative;

        > img {
            max-width: 670px;
            max-height: 670px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    }
</style>
