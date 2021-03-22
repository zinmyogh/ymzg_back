<template>
  <div class="app-container">
    <el-card>
      
      <el-form ref="form" :inline="true" :model="form" size="medium">
      <el-form-item>
        <el-date-picker
        v-model="date1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item prop="findname" label="用户账号">
        <el-input v-model="form.findname" placeholder="请输入用户账号" />
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="doFind()">查找</el-button>
        <el-button size="medium" type="success" @click="doRefresh()">刷新</el-button>
      </el-form-item>
    </el-form>
      <el-table :data="assets.tableData" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column prop="userId" label="用户ID" align="center" />
        <el-table-column prop="name" label="入者账号" align="center" />
        <el-table-column prop="score" label="资金积分(￥)" align="center" />
        <el-table-column prop="stime" label="日期" align="center" />
      </el-table>

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes"
        :total="assets.totalItem"
        style="margin-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
       <!-- :total="list.totalItem" -->
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      listLoading: true,
      form: {
        findname: ''
      },
      date1: '',
    }
  },
  computed: {
    ...mapState({ assets: state => state.md.AssetList })
  },
  created() {
    // this.getAmount()
  },
  methods: {
    formatD(date) {
      return moment(date).format("YYYY-MM-DD hh:mm:ss")
    },
    doFind() {
      let setdata = {
        tableData: [],
        totalItem: 0
      }
      this.$store.commit('md/setAssetList', setdata)
      const reqt = {
        router: 'getAsset',
        JsonData: {
          Id: this.$Global.optioner.Id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.form.findname || '',
          startTime: this.formatD(this.date1[0]), //moment(this.date1[0]).format("YYYY-MM-DD hh:mm:ss"),
          endTime: this.formatD(this.date1[1]), //moment(this.date1[1]).format("YYYY-MM-DD hh:mm:ss")
        }
      }
      // console.log('getAsset5 .... ', reqt)
      this.$pomelo.send(reqt)
    },
    doRefresh() {
      this.pageSize = 10
      this.currentPage = 1

      const reqt = {
        router: 'getAsset',
        JsonData: {
          Id: this.$Global.optioner.Id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.form.findname || '',
          startTime: this.formatD(this.date1[0]), //moment(this.date1[0]).format("YYYY-MM-DD hh:mm:ss"),
          endTime: this.formatD(this.date1[1]), //moment(this.date1[1]).format("YYYY-MM-DD hh:mm:ss")
        }
      }
      this.$pomelo.send(reqt)
    },
    getAmount() {
      const reqt = {
        router: 'getAsset',
        JsonData: {
          Id: this.$Global.optioner.Id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.form.findname || '',
          startTime: this.formatD(this.date1[0]), //moment(this.date1[0]).format("YYYY-MM-DD hh:mm:ss"),
          endTime: this.formatD(this.date1[1]), //moment(this.date1[1]).format("YYYY-MM-DD hh:mm:ss")
        }
      }
      // console.log('getAsset5 .... ', reqt)
      this.$pomelo.send(reqt)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      const reqt = {
        router: 'getAsset',
        JsonData: {
          Id: this.$Global.optioner.Id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.form.findname || '',
          startTime: this.formatD(this.date1[0]), //moment(this.date1[0]).format("YYYY-MM-DD hh:mm:ss"),
          endTime: this.formatD(this.date1[1]), //moment(this.date1[1]).format("YYYY-MM-DD hh:mm:ss")
        }
      }
      this.$pomelo.send(reqt)
    },
    handleSizeChange(val) {
      // console.log('sizeChange ', this.assets)
      this.pageSize = val
      const reqt = {
        router: 'getAsset',
        JsonData: {
          Id: this.$Global.optioner.Id,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.form.findname || '',
          startTime: this.formatD(this.date1[0]), //moment(this.date1[0]).format("YYYY-MM-DD hh:mm:ss"),
          endTime: this.formatD(this.date1[1]), //moment(this.date1[1]).format("YYYY-MM-DD hh:mm:ss")
        }
      }
      this.$pomelo.send(reqt)
    }
  }
}
</script>


<style lang="scss" scoped>
.relations {
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 4px;
  overflow: hidden;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 0 10px;
}
</style>