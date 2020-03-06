<template>
    <div class="update-info">
        <div class="header">
            个人信息
        </div>
        <div class="edit-info">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="职业" prop="job">
                    <el-input v-model="ruleForm.job"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择省份">
                        <el-option label="上海" value="shanghai"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人说明" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "UpdateInfo",
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    job:'',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    job: [
                        { required: true, message: '请输入职业', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],

                    desc: [
                        { required: true, message: '请填写个人说明', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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
.update-info{
    width: 100%;
    height: 100%;
    .header{
        height: 60px;
        font-size: 25px;
        border-bottom: 1px solid #F1F1F1;
        line-height: 60px;
        color: #737373;
    }
    .edit-info{
        margin-top: 20px;
    }
}
</style>
