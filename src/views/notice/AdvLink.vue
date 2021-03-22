<template>
  <div style="padding: 20px;">
    <el-card>
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="显示标题">
              <el-input v-model="link.title" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="文章链接">
              <el-input v-model="link.link" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" @click="setlink">确认添加</el-button>
          </el-form-item>
      </el-form>


      <el-table :data="linkData.tableData" border style="width: 100%; margin-top: 20px">
        <el-table-column label="ID" prop="Id" width="100" align="center"></el-table-column>
        <el-table-column label="显示标题" prop="title" align="center"></el-table-column>
        <el-table-column label="文章链接" prop="content" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="{row}">
            <el-button type="danger" @click="deleteLink(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes"
        :total="linkData.totalItem"
        style="margin-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      link: {
        title: '',
        link: ''
      }
    }
  },
  computed: {
    ...mapGetters(['LState']),
    ...mapState({ linkData: state => state.md.LinkData })
  },
  watch: {
    LState: function (val) {
      if (val) {
        this.close()
      }
    }
  },
  created() {
    this.getLink()
  },  
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getLink()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getLink()
    },
    getLink() {
      const reqt = {
        router: 'getLink',
        JsonData: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
      }
      // console.log('getlIns reqt ', reqt)
      this.$pomelo.send(reqt)
    },
    close() {
      this.link.title = ''
      this.link.link = ''
      this.$store.commit('md/setLinkState', false)
      this.getLink()
    },
    setlink() {
      if (this.link.title === '' || this.link.link === '') {
        return this.$message.info('请输入标题和链接')
      }
      const reqt = {
        router: 'setLink',
        JsonData: {
          title: this.link.title,
          link: this.link.link
        }
      }
      // console.log('send setlink ', reqt)
      this.$store.commit('md/setLinkState', false)
      this.$pomelo.send(reqt)
    },
    deleteLink(row) {
      const reqt = {
        router: 'deleteLink',
        JsonData: {
          Id: row.Id
        }
      }
      // console.log('dellet link ', reqt)
      this.$pomelo.send(reqt)
      setTimeout(() => {
        this.currentPage = 1
        this.getLink()
      }, 800)
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
