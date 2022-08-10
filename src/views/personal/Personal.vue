<template>
  <div class="personal">
    <!-- 导航栏 -->
    <nav-bar>
      <template #nav-left> 
        <img src="~assets/images/icon/share/set.png" alt="">
      </template>
      <template #nav-center>
          <div class="nav-center" @click="loginShow" v-if="whether == '1'">
            立即登录
          </div>
          <div class="nav-center" else @click="logout">
            退出登录
          </div>
			</template>
      <template #nav-right> 
          <img src="~assets/images/icon/share/tgsq.png" alt="">
      </template>
    </nav-bar>
    <!-- 登录 -->
    <login-view @userLogin="userLogin" ref="loginHide"></login-view>
    <!-- 用户信息 -->
    <user-info></user-info>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from '@/components/common/navBar/NavBar.vue'
import loginView from '@/components/content/LoginView'
import UserInfo from './personalChild/UserInfo'

import {userLogin,loginStatus,loginLogout,userDetail} from "network/detail"

export default {
  data() {
    return {
      loginData: '',
      loginShowHide: false,
      whether: '1'
    }
  },
  components: {
    NavBar,
    loginView,
    UserInfo
  },
  created() {
    this.loginStatus()
    // let loginData = localStorage.getItem('loginData')
    // if(loginData) {
    //   this.whether = '2'
    // }
    // else{ this.whether = '1' }
  },
  inject: ['$cookies'],//引用全局的cookies
  methods: {
    loginStatus() {
      loginStatus().then(res=> {
        console.log(res)
      })
    },  
    //用户登录
    loginShow() {
      this.$refs.loginHide.loginHide = true
    },

    //退出
    logout() {
      loginLogout().then(res => {
      })
    },
    //点击登录
    userLogin(val) {
      let phone = val.phone
      let  password = val.password
      localStorage.removeItem('loginData')
      userLogin(phone,password).then(res=>{
        if(res.data.code == 200) {
          this.$refs.loginHide.loginHide = false
          //用户信息本地缓存
          let loginData = res.data
          this.whether = '2'
          localStorage.setItem('loginData',JSON.stringify(loginData))
          
          //CooKie
          let loginCooKie = res.data.cookie
          $cookies.set('loginCooKie',loginCooKie,'1M')
          let uid = loginData.bindings[0].userId
          userDetail(uid).then(res => {
          })


        }
        else if(res.data.code == (502 && 250)) {
          alert(res.data.message)
        }
      })
    },
  }
}
</script>

<style scoped>
  .personal {
  }
  .nav-center {
    font-size: 14px;
  }
</style>
