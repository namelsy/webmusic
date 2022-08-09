<template>
  <div class="userInfo">
    <div class="userInfoImg"><img :src="proFileData.avatarUrl" alt=""></div>
    <div class="userInfoMsg">
      <div>{{proFileData.nickname}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      proFileData: ''
    }
  },
  components: {

  },
  inject: ['$cookies'],//引用全局的cookies
  created() {
    let loginData = localStorage.getItem('loginData')
    loginData = JSON.parse(loginData)
    this.proFileData = loginData.profile
    
  }
}
</script>

<style scoped>
  .userInfo {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    position: relative;
    padding: 10px 0 10px 0;
  }
  .userInfoImg {
    position: absolute;
    top: 0;
    width: 70px;
    height: 70px;
  }
  .userInfoImg img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .userInfoMsg {
    width: 90%;
    height: 120px;
    margin-top: 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
  }
</style>
