<template>
  <!-- http://element-cn.eleme.io/#/zh-CN/component/menu -->
  <el-menu mode="vertical" :default-active="$route.path"  background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <sidebar-item :routes="permissionRouters"/>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permissionRouters'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu {
    min-height: 100%;
  }
</style>
