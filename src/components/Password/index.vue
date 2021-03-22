<template>
  <div style="padding: 20px;">
    <el-card>
    <!-- <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%"> -->
      <el-form>
        <!-- <el-form-item label="原始密码">
          <el-input v-model="editPwDialogFrm.oldPw" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="新密码">
          <el-input v-model="editPwDialogFrm.newPw" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="editPwDialogFrm.pw_ok" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认修改</el-button>
        </el-form-item>
      </el-form>
    <!-- </el-dialog> -->
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      oldPw: '',
      newPw: '',
      pw_ok: '',
      editPwDialogFrm: {
        oldPw: '',
        newPw: '',
        pw_ok: ''
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['EPState'])
  },
  watch: {
    EPState: function(val) {
      if (val) {
        this.close()
      }
    }
  },
  methods: {
    close() {
      // this.$Global.Pass = this.$Global.newPass
      this.editPwDialogFrm.oldPw = ''
      this.editPwDialogFrm.newPw = ''
      this.editPwDialogFrm.pw_ok = ''
      this.$message.success('修改密码成功')
      // let info = getHtInfo()
      // info = JSON.parse(info)
      // const ht_info = { account: info.account, password: this.$Global.Pass }
      // setHtInfo(AES.encrypt(JSON.stringify(ht_info), this.$Global.en))
      this.$store.commit('md/setEditPasswordState', false)
    },
    submit() {
      this.$store.commit('md/setEditPasswordState', false)
      if (this.editPwDialogFrm.newPw === '') return this.$message.warning('请输入原始密码')
      if (this.editPwDialogFrm.newPw !== this.editPwDialogFrm.pw_ok) {
        this.$message.warning('两次输入密码不一致')
        return
      }
      if (this.editPwDialogFrm.newPw === '' || this.editPwDialogFrm.pw_ok === '') {
        this.$message.warning('密码或确认密码不能为空')
        return
      }
      // if (this.editPwDialogFrm.oldPw !== this.$Global.Pass) return this.$message.warning('原始密码不正确')
      // if (this.editPwDialogFrm.oldPw === this.editPwDialogFrm.newPw) return this.$message.warning('请更换与原密码不同的密码')
      if (this.editPwDialogFrm.newPw.length < 6) return this.$message.warning('新密码长度不能少于6位')
      // if (/\d/.test(this.editPwDialogFrm.newPw) && /[a-zA-Z]/.test(this.editPwDialogFrm.newPw)) {
        const reqt = {
          router: 'editOwnPw',
          JsonData: {
            Id: this.$Global.optioner.Id,
            pw: this.$md5(this.editPwDialogFrm.newPw)
          }
        }
        // this.$Global.newPass = this.editPwDialogFrm.newPw
        // console.log(reqt)
        this.$pomelo.send(reqt)
    }
  }
}
</script>

<style lang="scss" scoped>
.notice_password_hint {
  color: #1989fa;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  font-family: "Microsoft YaHei";
  border: 1px solid #aaaaaa;
  line-height: 25px;
  margin: 15px 0;
  padding: 10px;
}
</style>
