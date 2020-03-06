<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">

            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="name"></el-input>
            </el-form-item>
            <el-form-item prop="pass"  >
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" >登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js'
    import {BASE_URL} from "../../global/util";

    export default {
        name: "Login",
        data(){
            var checkusername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }

                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    pass: '',
                    username: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkusername, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let self=this;
                        self.$http.post(BASE_URL+ '/api/user/login',{
                            username:self.ruleForm.username,
                            password:CryptoJS.MD5(self.ruleForm.pass).toString()
                        }).then(({status,data})=>{
                            if(status===200){
                                if(data&&data.code===0){
                                    console.log("登陆成功");
                                    console.log(data.blogFrontToken);
                                    localStorage.setItem('blogFrontToken',data.blogFrontToken)
                                    // this.$router.go(0)
                                    self.$router.push('/home')
                                }else{
                                    self.error=data.msg
                                    alert(data.msg)
                                }
                            }else{
                                alert(`服务器出错`)
                                self.error=`服务器出错`
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="scss">
   .login{
       .el-form-item input{
           background-color: transparent;
           color: white;
           font-weight: bold;
       }
   }
</style>
<style scoped lang="scss">
    .el-form-item input{
        background-color: transparent;
        outline: none;
        border: 1px solid slategray;

    }
    .el-button{
        width: 100%;
        background-color: #ef4300;
    }
</style>
