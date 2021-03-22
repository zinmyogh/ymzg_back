<template>
  <div>
    <el-dialog :title="`设定会员密码`" :visible.sync="dialogVisible" width="450px">
      <el-form ref="editFrm" :model="editFrm" inline label-width="100px" size="medium">
        <el-form-item label="会员账号" prop="username">
          <el-input v-model="editFrm.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="密码" prop="pw">
          <el-input v-model="editFrm.pw" autocomplete="off" placeholder="不修改密码请留空" />
        </el-form-item>
        <!-- <el-form-item label="等级" prop="level">
          <el-select v-model="editFrm.level" placeholder="请选择会员等级" style="width:155px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel()">取 消</el-button>
        <el-button type="primary" @click="Ok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    editData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      options: [
        {
          value: 3,
          label: '钻石会员'
        },
        {
          value: 4,
          label: '铂金会员'
        },
        {
          value: 5,
          label: '黄金会员'
        },
        {
          value: 6,
          label: '白银会员'
        },
      ],
      dialogVisible: false,
      arrJxb: this.$Global.optioner.arrJxb,
      checkSD: this.$Global.optioner.xmType,
      editFrm: {
        username: '',
        level: '',
        pw: ''
      }
    }
  },
  computed: {
    ...mapGetters(['EditMemberOk'])
  },
  watch: {
    editData: {
      handler(newValue, oldValue) {
        // console.log(newValue, 'this.editFrm')
        this.editFrm.pw = ''
        this.editFrm.username = newValue.name
        this.editFrm.level = newValue.level
      }
    },
    EditMemberOk: function(val) {
      if (val) {
        this.close()
      }
    }
  },
  methods: {
    close() {
      this.editFrm.pw = ''
      this.editFrm.nusername = ''
      this.dialogVisible = false
      this.$store.commit('md/setEditMemberOk', false)
      this.$emit('editMOK', true)
    },
    Ok() {
      // console.log(this.editFrm)
      var frm = this.editFrm
      if (frm.pw.length >= 1 && frm.pw.length < 6) {
        this.$message.warning('密码不能小于6位')
        return
      }
      const reqt = {
        router: 'editMemberInfo',
        JsonData: {
          username: this.editFrm.username,
          level: this.editFrm.level === '钻石会员'
            ? 3 : this.editFrm.level === '铂金会员'
              ? 4 : this.editFrm.level === '黄金会员'
                ? 5 : this.editFrm.level === '白银会员'
                  ? 6 : this.editFrm.level,
          // eslint-disable-next-line
          pw: this.editFrm.pw != '' ? this.$md5(this.editFrm.pw) : ''
        }
      }
      this.$store.commit('md/setEditMemberOk', false)
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
