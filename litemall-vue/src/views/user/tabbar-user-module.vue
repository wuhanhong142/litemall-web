<template>
  <div class="user_module">
    <van-cell-group>
      <van-cell icon="shoucang" title="我的收藏" to="/user/collect" isLink/>
      <van-cell icon="dingwei" title="收货地址" to="/user/address" isLink/>
      <van-cell icon="kefu" title="服务中心" to="/user/server" isLink/>
      <van-cell icon="phone" :title="title" :to="inviteCode ? '/user': '/user/bind'" isLink/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'user-module',
  data () {
    return {
      title:  `邀请码: ${ localStorage.getItem('inviteCode') }` || '绑定业务员邀请码',
      inviteCode: localStorage.getItem('inviteCode') || ''
    }
  },
  activated() {
    this.title = `邀请码: ${ localStorage.getItem('inviteCode') }` || '绑定业务员邀请码'
    this.inviteCode = localStorage.getItem('inviteCode') || ''
  },
};
</script>


<style scoped lang="scss">
.user_module {
  background-color: #fff;
}
</style>
