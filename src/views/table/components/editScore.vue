<template>
  <div>
    <el-dialog :title="`设定会员`" :visible.sync="dialogVisible" width="450px">
      <el-form ref="editFrm" :model="editFrm" inline label-width="100px" size="medium">
        <el-form-item label="推荐资金" prop="ye">
          <el-input v-model="editFrm.referal_score" autocomplete="off" />
        </el-form-item>
        <el-form-item label="签到资金" prop="answer_score">
          <el-input v-model="editFrm.answer_score" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel()">取 消</el-button>
        <el-button type="primary" @click="Ok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    editsData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      arrJxb: this.$Global.optioner.arrJxb,
      checkSD: this.$Global.optioner.xmType,
      editFrm: {
        Id: '',
        referal_score: '',
        answer_score: ''
      }
    }
  },
  computed: {
    ...mapGetters(['EditScoreOk']),
    // ...mapState({ userInfo: state => state.user.info })
  },
  watch: {
    editsData: {
      handler(newValue, oldValue) {
        // console.log(newValue, 'this.editFrm')
        this.editFrm.referal_score = newValue.referal_score
        this.editFrm.answer_score = newValue.answer_score
        this.editFrm.Id = newValue.Id
      }
    },
    EditScoreOk: function(val) {
      if (val) {
        this.close()
      }
    }
  },
  methods: {
    close() {
      this.editFrm.referal_score = ''
      this.editFrm.answer_score = ''
      this.dialogVisible = false
      this.$store.commit('md/setEditScoreState', false)
      this.$emit('editSMOK', true)
    },
    Ok() {
      // console.log(this.editFrm)
      // if (frm.pw.length >= 1 && frm.pw.length < 6) {
      //   this.$message.warning('密码不能小于6位')
      //   return
      // }
      const reqt = {
        router: 'editScore',
        JsonData: {
          Id: this.editFrm.Id,
          referal_score: this.editFrm.referal_score,
          answer_score: this.editFrm.answer_score
        }
      }
      this.$store.commit('md/setEditScoreState', false)
      this.$pomelo.send(reqt)
      // console.log('send ', reqt)
    },
    Cancel() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.max-set {
  line-height: 38px;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
}
</style>
