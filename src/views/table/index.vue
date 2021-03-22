<template>
  <div class="app-container">
    <!-- <div class="relations">
      <font color="grey" size="2">关系 : </font>
      <el-button type="text" size="medium" v-for="i in relations" :key="i" @click="clickRelations(i)">{{ i }} > </el-button>
    </div> -->
    <!-- <br> -->
    <el-card>
      <el-form ref="form" :inline="true" :model="form" size="medium">
      <el-form-item prop="userId" label="ID">
        <el-input v-model="form.userId" placeholder="会员ID" style="width: 120px" />
      </el-form-item>
      <el-form-item prop="findname" label="账号">
        <el-input v-model="form.findname" placeholder="会员账号" />
      </el-form-item>
      <el-form-item prop="nikename" label="姓名">
        <el-input v-model="form.nikename" placeholder="会员姓名" />
      </el-form-item>
      <el-form-item prop="fromAmount" label="推荐积分">
        <el-input v-model="form.fromAmount" placeholder="推荐积分" style="width: 100px" />
      </el-form-item>
      <el-form-item prop="toAmount" label="至">
        <el-input v-model="form.toAmount" placeholder="推荐积分" style="width: 100px" />
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="doFind()">查找</el-button>
        <el-button size="medium" type="success" @click="doRefresh()">刷新</el-button>
      </el-form-item>
    </el-form>
      <el-table v-loading="listLoading" :data="list.tableData" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="left" label="ID" width="80">
          <template slot-scope="{row}">
            {{ row.Id }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="账号" align="left">
          <template slot-scope="{row}">
            <font color="blue" style="cursor: pointer" @click="clickID(row)">{{ row.name }}</font>
          </template>
        </el-table-column>
        <el-table-column prop="nikename" label="姓名" align="left" />
        <el-table-column prop="name" label="手机号" align="left" />
        <el-table-column prop="reference_Id" label="上级ID" align="left" />
        <el-table-column prop="reference_name" label="上级账号" align="left">
          <template slot-scope="scope">
            <font color="#9c27b0">{{ scope.row.reference_name }}</font>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="level" label="级别" align="left" /> -->
        <!-- <el-table-column prop="sign_score" label="签到积分" align="left" /> -->
        <el-table-column prop="answer_score" label="签到积分" align="left" />
        <el-table-column prop="referal_score" label="推荐积分" align="left" />
        <!-- <el-table-column prop="referal_score" label="推荐积分" align="left" /> -->
        <el-table-column prop="registTime" label="开户日期" align="left" min-width="120" />
        <!-- <el-table-column prop="lastLoginIp" label="最近登录IP" align="left" width="100"/> -->
        <!-- <el-table-column prop="lastLoginTime" label="最近登录" align="left" /> -->
        <el-table-column prop="onLineState" label="在线" align="left" width="60">
          <template slot-scope="scope">
            <span v-show="scope.row.onLineState===1">
              <font color="green">{{ '在线' }}</font>
            </span>
            <span v-show="scope.row.onLineState===0">{{ '离线' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enable" label="状态" align="left"  width="70">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#00A854"
              inactive-color="#F04134"
              active-value="启用"
              inactive-value="禁用"
              @change="handleEnableChange(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作" align="left" padding="0px" width="180px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" class="el-button-opt" @click="handleEditMember(scope.row)">密码</el-button>
            <el-button size="mini" type="success" class="el-button-opt" @click="handleEditScore(scope.row)">积分调整</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes"
        :total="list.totalItem"
        style="margin-top: 10px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <Edit ref="edit" :editData="editData" @editMOK="editMOK"/>
    <EditScore ref="editscore" :editsData="editsData" @editSMOK="editSMOK"/>


    <section>
      <el-dialog
        title="账号三级关系"
        :visible.sync="dialogVisible"
        width="40%">
        <span>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            class="tree"
            node-key="Id"
            :indent="0"
            :default-expanded-keys="expandedData"
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <font color="red"> -- </font>
              <span>Id: {{data.Id}}</span>
              <font color="red"> -- </font>
              <span style="padding-right: 100px">姓名: {{data.nickname}}</span>
            </span>
          </el-tree>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Edit from './components/edit.vue'
import EditScore from './components/editScore.vue'
export default {
  components: {
    Edit,
    EditScore
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      listLoading: true,
      form: {
        userId: '',
        findname: '',
        nikename: '',
        reference_name: '',
        fromAmount: '',
        toAmount: ''
      },
      editData: {
        type: Object,
        default: null
      },
      editsData: {
        type: Object,
        default: null
      },
      selectAcc: '',
      relations: [],
      // tree relations
      treeData: [],
      expandedData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    }
  },
  computed: {
    ...mapState({ list: state => state.md.MemberInfo, wsData: state => state.md.treeData }),
    ...mapGetters(['UState'])
  },
  watch: {
    UState: function(val) {
      if (val) {
        this.getList()
        this.$store.commit('md/setUserState', false)
      }
    }
  },
  created() {
    this.getList()
    this.relations.push(this.$Global.optioner.name)
  },
  methods: {
    editMOK(val) {
      val && this.getList()
    },
    editSMOK(val) {
      val && this.getList()
    },
    getList() {
      // console.log('this.relatiosn' , this.relations)
      
      if (this.relations.length >= 1) {
        var reverseList = this.relations
      }
      const reqt = {
        router: 'getMemberInfo',
        JsonData: {
          userId: '',
          findname: '',
          nickname: '',
          referalScore: (this.form.fromAmount !== '' && this.form.toAmount !== '') ? `${this.form.fromAmount}-${this.form.toAmount}` : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          reference_name: this.relations.length >= 1 ? reverseList.reverse()[0] : this.$Global.optioner.name
        }
      }
      // console.log('get list ', reqt)
      this.$pomelo.send(reqt)
      if (this.relations.length >= 1) {
        this.relations.reverse()
      }
      this.listLoading = false
    },
    doFind() {
      this.pageSize = 10
      this.currentPage = 1
      const reqt = {
        router: 'getMemberInfo',
        JsonData: {
          userId: this.form.userId || '',
          findname: this.form.findname || '',
          nickname: this.form.nikename || '',
          referalScore: (this.form.fromAmount !== '' && this.form.toAmount !== '') ? `${this.form.fromAmount}-${this.form.toAmount}` : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          reference_name: ""
        }
      }
      // console.log('send find ', reqt)
      this.$pomelo.send(reqt)
      this.listLoading = false
    },
    doRefresh() {
      this.form.userId = ''
      this.form.findname = ''
      this.form.nikename = ''
      this.form.toAmount = ''
      this.form.fromAmount = ''
      this.pageSize = 10
      this.currentPage = 1
      this.relations = this.relations.splice(0,1)
      const reqt = {
        router: 'getMemberInfo',
        JsonData: {
          userId: '',
          findname: '',
          nickname: '',
          referalScore: '',
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          reference_name: this.selectAcc ? this.selectAcc : this.$Global.optioner.name
        }
      }
      // console.log('get lsit ', reqt)
      this.$pomelo.send(reqt)
      this.listLoading = false
    },
    handleCurrentChange(s) {
      this.currentPage = s
      const reqt = {
        router: 'getMemberInfo',
        JsonData: {
          userId: this.form.userId || '',
          findname: this.form.findname || '',
          nickname: this.form.nikename ||'',
          referalScore: (this.form.fromAmount !== '' && this.form.toAmount !== '') ? `${this.form.fromAmount}-${this.form.toAmount}` : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          reference_name: this.selectAcc ? this.selectAcc : this.$Global.optioner.name
        }
      }
      this.$pomelo.send(reqt)
      this.listLoading = false
    },
    handleSizeChange(s) {
      this.pageSize = s
      const reqt = {
        router: 'getMemberInfo',
        JsonData: {
          userId: this.form.userId || '',
          findname: this.form.findname || '',
          nickname: this.form.nikename ||'',
          referalScore: (this.form.fromAmount !== '' && this.form.toAmount !== '') ? `${this.form.fromAmount}-${this.form.toAmount}` : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          reference_name: this.selectAcc ? this.selectAcc : this.$Global.optioner.name
        }
      }
      this.$pomelo.send(reqt)
      this.listLoading = false
    },
    getData(id) {
      // if (!this.wsData.tableData || this.wsData.tableData.length <= 1) return;
      // console.log('get Data .... ', this.wsData, id)
      var content = this.wsData.tableData;
      // console.log('content ........ ', content)
      for (var i = 0; i < content.length; i++) {
        var d = content[i].gx.split("^");
        var dd = d[d.length - 2];
        // console.log('d   dd ============', d, dd)
        content[i].pid = dd; // 上家的id
        content[i].children = [];
      }
      // console.log("expandedData:",this.expandedData)
      let dataArray = [];
      var self = this;
      content.forEach(function (data) {
        // console.log('enter data ', data)
        let pid = data.pid;
        if (data.pid == id) {
          // console.log('equale eeeeeeeeeeeeeeee', data.Id, id)
          let objTemp = {
            Id: data.Id,
            name: data.name,
            gx: data.gx,
            pid: pid,
            nickname: data.nickname
            // xmb_s: data.xmb_s,
            // xmb_d: data.xmb_d,
          };
          dataArray.push(objTemp);
        }
      });
      this.deepSort(content, dataArray);
    },
    deepSort(datas, dataArray) {
      for (let j = 0; j < dataArray.length; j++) {
        let dataArrayIndex = dataArray[j];
        let childrenArray = [];
        let Id = dataArrayIndex.Id;
        for (let i = 0; i < datas.length; i++) {
          let data = datas[i];
          let pid = data.pid;
          if (pid == Id) {
            //判断是否为儿子节点
            let objTemp = {
              Id: data.Id,
              name: data.name,
              gx: data.gx,
              pid: pid,
              nickname: data.nickname,
              // xmb_s: data.xmb_s,
              // xmb_d: data.xmb_d,
            };
            childrenArray.push(objTemp);
          }
        }
        dataArrayIndex.children = childrenArray;
        if (childrenArray.length > 0) {
          //有子节点则递归
          this.deepSort(datas, childrenArray);
        }
      }
      this.treeData = dataArray; //treeData
      // console.log('dataArray ... ... .. ', dataArray)
      return dataArray;
    },
    clickID(row) {
      const reqt = {
        router: 'getThreeLevelMember',
        JsonData: {
          userId: row.Id
        }
      }
      // console.log('getThreeLevel ... ', reqt)
      this.$pomelo.send(reqt)
      setTimeout(() => {
        // let he = {
        //     Id: row.Id,
        //     gx: `^${row.Id}`,
        //     level: row.level,
        //     name: row.name,
        //     nickname: row.nickname
        //   }
        // this.treeData.unshift(he)
        // let data = this.treeData
        this.getData(row.Id)
        this.dialogVisible = true
      }, 1000)
    },
    pushRelations(name) {
      let rel = this.relations
      if (!rel.includes(name)) {
        this.relations.push(name)
      }
    },
    clickRelations(name) {
      this.form.userId = ''
      this.form.findname = ''
      this.form.nikename = ''
      this.relations.forEach((val, i) => {
        if (val === name) {
          let relation = this.relations.splice(0, i + 1)
          this.relations = relation
        }
      })
      const reqt = {
        router: 'getMemberInfo',
        JsonData: {
          userId: this.form.userId || '',
          findname: this.form.findname || '',
          nickname: this.form.nikename ||'',
          referalScore: (this.form.fromAmount !== '' && this.form.toAmount !== '') ? `${this.form.fromAmount}-${this.form.toAmount}` : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          reference_name: name
        }
      }
      this.$pomelo.send(reqt)
      // console.log('reqt ', reqt)
      this.listLoading = false
    },
    handleEditMember(row) {
      this.editData = row
      this.$refs.edit.dialogVisible = true
    },
    handleEditScore(row) {
      this.editsData = row
      this.$refs.editscore.dialogVisible = true
    },
    handleEnableChange(row) {
      this.$store.commit('md/setUserState', false)
      var n = row.enable === '禁用' ? 0 : 1
      const reqt = {
        router: 'setUserState',
        JsonData: { username: row.name, state: n }
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


<style>
.el-tree-node__expand-icon.is-leaf::before {
  display: none;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  color: red !important;
}
.tree /deep/ .el-tree-node {
  position: relative;
  padding-left: 15px;
}
.el-tree {
  height: 60vh;
  width: 100%;
  overflow-x: scroll;
}

.el-tree>.el-tree-node {
  display: inline-block;
  min-width: 100%;
}

.tree /deep/ .el-tree-node__children {
  padding-left: 10px;
  overflow-x: scroll;
}

.tree /deep/ .el-tree-node :last-child:before {
  height: 38px;
}

.tree /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree /deep/ .el-tree-node:before {
  content: "";
  left: -5px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:after {
  content: "";
  left: -5px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree /deep/ .el-tree-node:before {
  border-left: 1px double #ee0a24;
  bottom: 0px;
  height: 100%;
  top: -26px;
  width: 1px;
}

.tree /deep/ .el-tree-node:after {
  border-top: 1px dashed #ee0a24;
  height: 20px;
  top: 12px;
  width: 24px;
}

/* .el-tree-node.is-current > .el-tree-node__content {
    background-color: #1989fa4d !important;
    color: red;
} */
</style>
