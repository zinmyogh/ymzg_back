<template>
  <div style="padding: 20px">
    <el-card>
      <el-tabs v-model="activeTab">
        <!-- <el-tab-pane label="Activity" name="activity">
          <activity />
        </el-tab-pane>
        <el-tab-pane label="Timeline" name="timeline">
          <timeline />
        </el-tab-pane> -->
        <el-tab-pane label="首页轮播图上传" name="hommme">
          <HOme />
        </el-tab-pane>
        <el-tab-pane label="APP启动图上传" name="adv">
          <APPA />
        </el-tab-pane>
        <el-tab-pane label="推广背景图上传" name="qr">
          <QRBG />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import HOme from './component/homeC'
import APPA from './component/AppA'
import QRBG from './component/QrBG'
export default {
  components: {
    HOme,
    APPA,
    QRBG
  },
  data() {
    return {
      activeTab: 'hommme'
    }
  }
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>

<style lang="scss" scoped>
</style>
