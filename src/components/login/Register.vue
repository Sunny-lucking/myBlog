<template>
    <div class="register">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
            <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="name"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="ruleForm.email" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="password"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="checkPassword"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js'

    import {BASE_URL} from "../../global/util";

    export default {
        name: "Register",
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入邮箱地址'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                            callback();
                    }
                }, 1000);
            };
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('昵称不能为空'));
                }
                callback();
            }

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name:'',
                    pass: '',
                    checkPass: '',
                    email: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    name: [
                        { validator: checkName, trigger: 'blur', }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$http.post(BASE_URL+'/api/user/signup',{
                            username: that.ruleForm.name,
                            password: CryptoJS.MD5(that.ruleForm.pass).toString(),
                            email: that.ruleForm.email,
                        })
                            .then(({status,data})=>{
                                if(status===200){ // 请求成功
                                    if(data&&data.code===0){ //注册成功
                                        this.$message({
                                            dangerouslyUseHTMLString: true,
                                            type: 'success',
                                            message: '<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1344169300,4118688467&fm=26&gp=0.jpg" style="width: 100px;height: 100px;">' +
                                                `<h1>恭喜您注册成功，举国欢庆，请登陆</h1>`
                                        });
                                        // location.href = '/login'
                                        that.ruleForm = {}
                                    }
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    .register{
        .el-button{
            width: 40%;
            margin-left: 5%;
        }
    }

</style>
