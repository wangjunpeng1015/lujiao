<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <span
        @click="sk === '点击查看/隐藏' ? sk = userinfo.secretKey : sk = '点击查看/隐藏'"
        v-if="userinfo.roleId === 2"
      >
        密钥:
        <span style="font-weight: bold">{{sk}}</span>
      </span>
      <el-divider direction="vertical" v-if="userinfo.roleId === 2"></el-divider>
      <span v-if="userinfo.roleId === 2">
        商户UID:
        <span style="font-weight: bold">{{userinfo.uid || '空'}}</span>
      </span>
      <el-divider direction="vertical" v-if="userinfo.roleId === 2"></el-divider>
      <span v-if="userinfo.roleId === 3">
        商户、码商注册邀请码:
        <span style="font-weight: bold">{{userinfo.id}}</span>
      </span>
      <el-divider v-if="userinfo.roleId === 3" direction="vertical"></el-divider>
      <span>{{ userinfo.roles[0] && userinfo.roles[0].roleName }}</span>
      <el-divider direction="vertical"></el-divider>

      <el-dropdown class="avatar-container" trigger="click">
        <span>{{ userinfo.account }}</span>
        <!-- <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>-->

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <p @click="edit">修改密码</p>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <p @click="logout">退出</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validPassword } from "@/utils/validate";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value == this.ruleForm.oldPassword) {
        callback(new Error("两次输入密码一致!"));
      }
      if (validPassword(this.ruleForm.newPassword)) {
        callback();
      } else {
        callback(new Error("密码包含 数字,英文,字符中的两种以上，长度6-20"));
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        newPassword: "",
        oldPassword: ""
      },
      sk: "点击查看/隐藏", // 密钥
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "userinfo"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    edit() {
      this.dialogVisible = true;
      this.$refs.ruleForm.resetFields();
    },
    changePassword() {
      this.$store
        .dispatch("user/changePassword", this.ruleForm)
        .then(res => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
