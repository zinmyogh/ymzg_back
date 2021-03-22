<template>
  <div style="padding: 20px;">
    <el-card>
      当前推荐奖励金 : ￥ <font color="red" size="4">{{ comm }}</font> 
    </el-card>
    <br>
    <el-card>
      <el-form>
        <el-form-item label="推荐奖金">
          <el-input v-model="commission" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      commission: ''
    }
  },
  computed: {
    ...mapGetters(['ECState']),
    ...mapState({ comm: state => state.md.Commission })
  },
  watch: {
    ECState: function(val) {
      if (val) {
        this.close()
      }
    }
  },
  created() {
    this.getCommision()
  },
  methods: {
    close() {
      this.commission = ''
      this.getCommision()
      this.$store.commit('md/setCommisionState', false)
      this.$store.commit('md/setAnswerCommisionState', false)
    },
    getCommision() {
      const reqt = {
        router: 'getCommission',
        JsonData: {}
      }
      // console.log('get commissions ', reqt)
      this.$pomelo.send(reqt)
    },
    submit() {
      this.$store.commit('md/setCommisionState', false)
      if (this.commission === '') return this.$message.warning('请输入分数')
        const reqt = {
          router: 'editCommission',
          JsonData: {
            commission: this.commission
          }
        }
        this.$pomelo.send(reqt)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
