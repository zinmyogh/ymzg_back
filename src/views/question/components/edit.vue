<template>
  <div>
    <el-dialog title="修改题目" :visible.sync="dialogVisibleEdit" width="500px" :close-on-click-modal="false">
      <el-form :model="editform">
        <el-form-item label="状态">
          <el-radio-group v-model="editform.enable">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editform.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="editform.content" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <el-input placeholder="请输入" v-model="editform.selectItem1">
                <template slot="prepend">选项A</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入" v-model="editform.selectItem3">
                <template slot="prepend">选项C</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-input placeholder="请输入" v-model="editform.selectItem2">
                <template slot="prepend">选项B</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入" v-model="editform.selectItem4">
                <template slot="prepend">选项D</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="答案">
          <el-radio-group v-model="editform.answer">
            <el-radio label="A" border></el-radio>
            <el-radio label="B" border></el-radio>
            <el-radio label="C" border></el-radio>
            <el-radio label="D" border></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
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
      editform: {
        Id: '',
        title: '',
        content: '',
        selectItem1: '',
        selectItem2: '',
        selectItem3: '',
        selectItem4: '',
        answer: '',
        enable: '' // 0禁用　1启用　
      },
      dialogVisibleEdit: false,
    }
  },
  computed: {
    ...mapGetters(['EQState'])
  },
  watch: {
    editData: {
      handler(newValue, oldValue) {
        // console.log(newValue, 'this.editFrm')
        this.editform.Id = newValue.Id
        this.editform.title = newValue.title
        this.editform.content = newValue.content
        this.editform.selectItem1 = newValue.selectItem.split('#')[0]
        this.editform.selectItem2 = newValue.selectItem.split('#')[1]
        this.editform.selectItem3 = newValue.selectItem.split('#')[2]
        this.editform.selectItem4 = newValue.selectItem.split('#')[3]
        this.editform.answer = newValue.answer
        this.editform.enable = newValue.enable
      }
    },
    EQState: function(val) {
      if (val) {
        this.cancleEdit()
      }
    },
  },
  methods: {
    cancleEdit() {
      this.editform.title = ''
      this.editform.content = ''
      this.editform.selectItem1 = ''
      this.editform.selectItem2 = ''
      this.editform.selectItem3 = ''
      this.editform.selectItem4 = ''
      this.editform.answer = ''
      this.dialogVisibleEdit = false
      this.$store.commit('md/setEditQuestionState', false)
      // console.log('cancle edit .....')
      this.$emit('editOK', true)
    },
    confirmEdit() {
      if (this.editform.title === '' || this.editform.content === '' || this.editform.selectItem === '' || this.editform.answer === '') return this.$message.info('请填写完毕后上传！')
      const reqt = {
        router: 'editTopic',
        JsonData: {
          Id: this.editform.Id,
          title: this.editform.title,
          content: this.editform.content,
          selectItem: this.editform.selectItem1 + '#' + this.editform.selectItem2 + '#' + this.editform.selectItem3 + '#' + this.editform.selectItem4,
          answer: this.editform.answer,
          enable: this.editform.enable === '禁用' ? 0 : 1
        }
      }
      // console.log('edit ', reqt)
      this.$store.commit('md/setEditQuestionState', false)
      this.$pomelo.send(reqt)
    },
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
