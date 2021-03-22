<template>
  <div style="padding: 20px">
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="addNoticeMsg">添加公共公告消息</el-button>
      <section>
        <div>
          <el-table
            :data="noticeData"
            style="width:100%;margin-top:10px"
            border
          >
            <el-table-column prop="Id" label="公告ID号" width="80" align="left" />
            <el-table-column prop="title" label="公告标题" width="300" align="left" />
            <el-table-column prop="content" label="公告内容" min-width="500" align="left" />
            <!-- <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="editNoticeMsg(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delNoticeMsg(scope.row)">删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </section>
      <section>
        <el-dialog
          title="添加公告消息"
          :visible.sync="dialogVisible"
          width="500px"
          :close-on-click-modal="false"
        >
          <el-form :model="form">
            <el-form-item label="公告标题" label-width="100px">
              <el-input v-model="form.title" autocomplete="off" style="width: 85%" />
            </el-form-item>
            <el-form-item label="公告内容" label-width="100px">
              <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 3, maxRows: 8}" autocomplete="off" style="width: 85%;" />
            </el-form-item>
            <!-- <el-form-item label="起始时间" label-width="100px">
              <el-date-picker
                v-model="form.start_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="截止时间" label-width="100px">
              <el-date-picker
                v-model="form.end_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </el-card>
    <!-- <section>
      <el-dialog
        title="修改公告"
        :visible.sync="dialogVisibleEdit"
        width="500px"
        :close-on-click-modal="false"
      >
        <el-form :model="eform">
          <el-form-item label="公告标题" label-width="100px">
            <el-input v-model="eform.title" autocomplete="off" style="width: 85%" />
          </el-form-item>
          <el-form-item label="公告内容" label-width="100px">
            <el-input v-model="eform.content" autocomplete="off" style="width: 85%" />
          </el-form-item>
          <el-form-item label="起始时间" label-width="100px">
            <el-date-picker
              v-model="eform.start_time"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="截止时间" label-width="100px">
            <el-date-picker
              v-model="eform.end_time"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
      </el-dialog>
    </section> -->

    <!-- <section>
      <el-dialog
        title="删除公告"
        :visible.sync="dialogVisibleDel"
        width="300px"
        :close-on-click-modal="false"
      >
        <span>您确定要删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDel = false">取 消</el-button>
          <el-button type="primary" @click="confirmDel">确 定</el-button>
        </span>
      </el-dialog>
    </section> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleEdit: false,
      dialogVisibleDel: false,
      form: {
        title: '',
        content: '',
        agent_id: '',
        start_time: '',
        end_time: ''
      },
      eform: {
        Id: '',
        title: '',
        content: '',
        agent_id: '',
        start_time: '',
        end_time: ''
      },
      delId: '',
    }
  },
  computed: {
    ...mapState({ noticeData: state => state.md.Bulletin }),
    ...mapGetters(['ABState'])
  },
  watch: {
    ABState: function(val) {
      // console.log(val)
      if (val) {
        this.cancleAdd()
      }
    }
  },
  created() {
    this.getNotcieMsg()
  },
  methods: {
    // 限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!#$%^&*()\-+=<>?:'{}|,.\/;'\\[\]·~！#￥%……&*（）\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    },
    getNotcieMsg() {
      const sendStr = {
        router: 'getBulletin',
        JsonData: {
          userId: this.$Global.optioner.Id
        }
      }
      this.$pomelo.send(sendStr)
    },
    addNoticeMsg() {
      this.dialogVisible = true
    },
    refreshNoticeMsg() {
      // console.log(' refresh notice msg ');
    },
    confirmAdd() {
      if (this.form.title === '' || this.form.content === '') {
        return this.$message.warning('请填写完成后提交！')
      }
      const sendStr = {
        router: 'setBulletin',
        JsonData: {
          title: this.form.title,
          content: this.form.content,
          // agent_id: this.$Global.optioner.Id,
          // start_time: this.form.start_time,
          // end_time: this.form.end_time
        }
      }
      this.$store.commit('md/setAddBulletinState', false)
      this.$pomelo.send(sendStr)
    },
    cancleAdd() {
      this.form.title = ''
      this.form.content = ''
      this.dialogVisible = false
      this.$store.commit('md/setAddBulletinState', false)
      this.getNotcieMsg()
    },
    // editNoticeMsg(e) {
    //   this.eform.Id = e.Id
    //   this.eform.title = e.title
    //   this.eform.content = e.content
    //   this.eform.start_time = e.startTime
    //   this.eform.end_time = e.endTime
    //   this.dialogVisibleEdit = true
    // },
    // confirmEdit() {
    //   if (
    //     this.eform.title === '' ||
    //     this.eform.content === '' ||
    //     this.eform.start_time === '' ||
    //     this.eform.end_time === ''
    //   ) {
    //     return this.$message.warning({
    //       message: '请填写完成后提交！'
    //     })
    //   }
    //   const sendStr = {
    //     router: 'editBulletin',
    //     JsonData: {
    //       Id: this.eform.Id,
    //       title: this.eform.title,
    //       content: this.eform.content,
    //       agent_id: this.$Global.optioner.Id,
    //       start_time: this.eform.start_time,
    //       end_time: this.eform.end_time
    //     }
    //   }
    //   this.$pomelo.send(sendStr)

    //   this.dialogVisibleEdit = false
    //   setTimeout(() => {
    //     this.getNotcieMsg()
    //   }, 1000)
    // },
    // delNoticeMsg(i) {
    //   this.delId = i.Id
    //   this.dialogVisibleDel = true
    // },
    // confirmDel() {
    //   const sendStr = {
    //     router: 'deleteBulletin',
    //     JsonData: {
    //       Id: this.delId
    //     }
    //   }
    //   this.$pomelo.send(sendStr)

    //   this.dialogVisibleEdit = false
    //   setTimeout(() => {
    //     this.getNotcieMsg()
    //   }, 1000)
    //   this.dialogVisibleDel = false
    // },
  }
}
</script>

