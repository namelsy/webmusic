<template>
  <div class="loginView" v-show="loginHide">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="phone"
          label="手机"
          placeholder="请填写手机账号"
          :rules="[{ required: true, message: '请填写手机账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
      <div style="margin: 16px;">
        <van-button color="#ddd" round block type="primary" @click="loginShowHide">
          取消
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      username: '',
      password: '',
      loginHide: false
    }
  },
  components: {
    
  },
  inject: ['$cookies'],//引用全局的cookies
  methods: {
    onSubmit(val) {
      this.$emit('userLogin',val)
    },
    loginShowHide() {
      this.loginHide = false
      
    }
  }
}
</script>

<style scoped>
  .loginView {
    background-color: #eee;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .mailBoxPwd {
    margin-top: 20px;
  }
</style>
