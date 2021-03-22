<template>
  <div class="app-container">
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="addQuestion" style="margin-bottom: 20px;">添加题目</el-button>
      <section>
        <el-table v-loading="listLoading" :data="question.tableData" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column align="left" label="题目编号" width="95">
            <template slot-scope="{row}">
              {{ row.Id }}
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" align="left" />
          <el-table-column prop="content" label="内容" align="left" />
          <el-table-column prop="selectItem" label="答案选项" align="left" width="300"/>
          <el-table-column prop="answer" label="答案" align="left" width="120" />
          <el-table-column prop="enable" label="状态" align="left" width="100">
            <template slot-scope="{row}">
              <font v-if="row.enable === '启用'" color="green">{{ row.enable }}</font>
              <font v-else color="red">{{ row.enable }}</font>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="left" padding="0px" width="110">
            <template slot-scope="scope">
              <el-button size="mini" type="success" class="el-button-opt" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes"
        :total="question.totalItem"
        style="margin-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
      </section>
    </el-card>

    <section>
      <el-dialog
        title="添加题目"
        :visible.sync="dialogVisibleAdd"
        width="500px"
        :close-on-click-modal="false"
      >
        <el-form :model="addform">
          <el-form-item label="标题">
            <el-input v-model="addform.title" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="addform.content" type="textarea" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <el-input placeholder="请输入" v-model="addform.selectItem1">
                  <template slot="prepend">选项A</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入" v-model="addform.selectItem3">
                  <template slot="prepend">选项C</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-input placeholder="请输入" v-model="addform.selectItem2">
                  <template slot="prepend">选项B</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入" v-model="addform.selectItem4">
                  <template slot="prepend">选项D</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="答案">
            <el-radio-group v-model="addform.answer">
              <el-radio label="A" border></el-radio>
              <el-radio label="B" border></el-radio>
              <el-radio label="C" border></el-radio>
              <el-radio label="D" border></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleAdd">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </el-dialog>
    </section>

    <Edit ref="edit" :editData="editData" @editOK="listenToChild"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Edit from './components/edit'
export default {
  components: {
    Edit,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      listLoading: true,
      setQuestion: {
        title: '', // 标题
        content: '', // 内容
        selectItem: '', // 选项abcd, 格式 # 隔开选项
        answer: '' // 答案,abcd
      },
      addform: {
        title: '',
        content: '',
        selectItem1: '',
        selectItem2: '',
        selectItem3: '',
        selectItem4: '',
        answer: ''
      },
      dialogVisibleAdd: false,
      editData: {
        type: Object,
        default: null
      }
    }
  },
  computed: {
    ...mapState({ question: state => state.md.Question }),
    ...mapGetters(['AQState'])
  },
  watch: {
    AQState: function(val) {
      if (val) {
        this.cancleAdd()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const reqt = {
        router: 'getTopicList',
        JsonData: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
      this.$pomelo.send(reqt)
      this.listLoading = false
    },
    handleCurrentChange(val) {
      this.currentPage = val
      const reqt = {
        router: 'getTopicList',
        JsonData: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
      this.$pomelo.send(reqt)
      this.listLoading = false
      // console.log('reqt list ', reqt)
    },
    handleSizeChange(val) {
      this.pageSize = val
      const reqt = {
        router: 'getTopicList',
        JsonData: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
      this.$pomelo.send(reqt)
      this.listLoading = false
      // console.log('reqt list ', reqt)
    },
    handleEdit(row) {
      this.editData = row
      this.$refs.edit.dialogVisibleEdit = true
    },
    listenToChild(val) {
      val && this.getList()
    },
    cancleAdd() {
      this.addform.title = ''
      this.addform.content = ''
      this.addform.selectItem1 = ''
      this.addform.selectItem2 = ''
      this.addform.selectItem3 = ''
      this.addform.selectItem4 = ''
      this.addform.answer = ''
      this.dialogVisibleAdd = false
      this.$store.commit('md/setAddQuestionState', false)
    },
    confirmAdd() {
      if (
        this.addform.title === '' || this.addform.content === '' || this.addform.selectItem1 === '' || this.addform.answer === '' ||
        this.addform.selectItem2 === '' || this.addform.selectItem3 === '' || this.addform.selectItem4 === ''
      ) return this.$message.info('请填写完毕后上传！')
      const reqt = {
        router: 'setTopic',
        JsonData: {
          title: this.addform.title,
          content: this.addform.content,
          selectItem: this.addform.selectItem1 + '#' + this.addform.selectItem2 + '#' + this.addform.selectItem3 + '#' + this.addform.selectItem4,
          answer: this.addform.answer
        }
      }
      this.$store.commit('md/setAddQuestionState', false)
      this.$pomelo.send(reqt)
      this.listLoading = false
      // console.log(reqt, 'reqt ')
    },
    
    addQuestion() {
      this.dialogVisibleAdd = true
    }
  }
}
</script>
