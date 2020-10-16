<template>
  <div class="home">
    首页
  </div>
</template>

<script>

import {a} from '@/http/api'
export default {
  name: 'Home',
  components: {
    
  },
  created(){
    a({shopId:"d0872c5e-fd12-42a6-b464-1d238919b54a"}).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log('err');
    })
  },
}
</script>
<style lang="less" scoped>

</style>
