<template>
  <div class="main_wrap">
    <div style="width: 100%; height: 50px; background-color: #f5f7fa">
      <div style="padding-top: 13px; padding-left: 20px">
        <span>
          欢迎代理:
          <span style="color: red; padding: 0 5px">{{
            this.$Global.optioner.name
          }}</span>
        </span>
      </div>
    </div>
    <div style="padding-top: 10px;">
      <fieldset style="border: 1px solid #dfdfdf">
        <legend
          style="
            margin-left: 20px;
            font-size: 20px;
            color: #080808;
            font-weight: 300;
            padding: 0 10px;
          "
        >
          我的信息
        </legend>
        <el-row :gutter="10" style="padding: 10px;">
          <el-col :span="4">
            <el-card shadow="hover">
              <div style="display: flex; flex-direction: column">
                <span
                  style="padding-bottom: 5px; color: #808080; font-size: 14px"
                  >账号</span
                >
                <span style="font-size: 22px; color: #009688">{{
                  m.name
                }}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div style="display: flex; flex-direction: column">
                <span
                  style="padding-bottom: 5px; color: #808080; font-size: 14px"
                  >等级</span
                >
                <span style="font-size: 22px; color: #009688">管理员</span>
                <!-- <span style="font-size: 22px; color: #009688">{{ m.level }}</span> -->
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div style="display: flex; flex-direction: column">
                <span
                  style="padding-bottom: 5px; color: #808080; font-size: 14px"
                  >状态</span
                >
                <span style="font-size: 22px; color: #009688">{{
                  m.enable === 1 ? "启用" : "禁用"
                }}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div style="display: flex; flex-direction: column">
                <span
                  style="padding-bottom: 5px; color: #808080; font-size: 14px"
                  >最近登录IP</span
                >
                <span style="font-size: 22px; color: #009688">{{
                  m.loginIp
                }}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div style="display: flex; flex-direction: column">
                <span
                  style="padding-bottom: 5px; color: #808080; font-size: 14px"
                  >登录时间</span
                >
                <span style="font-size: 22px; color: #009688">{{
                  formatDate(new Date())
                }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </fieldset>

      <!-- <el-button @click="getNewMember">Get New Member</el-button> -->

      <el-card style="margin-top: 30px">
        <div style="position: relative; display: flex;">
            <el-date-picker v-model="startDate" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:140px" />
            <span style="margin-top: 10px; padding: 0 10px;"> 至 </span>
            <el-date-picker v-model="endDate" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:140px" />
            <span style="margin-right: 10px"></span>
            <el-button size="medium" icon="el-icon-search" type="primary" @click="getNewMember()">查看</el-button>
            <div style="position: absolute; float: right; right: 0;">
                <el-button size="medium" type="success" @click="doSelectDate(1)">今日</el-button>
                <el-button size="medium" type="success" @click="doSelectDate(2)">昨日</el-button>
                <el-button size="medium" type="success" @click="doSelectDate(3)">本周</el-button>
                <el-button size="medium" type="success" @click="doSelectDate(4)">上周</el-button>
                <el-button size="medium" type="success" @click="doSelectDate(5)">本月</el-button>
                <el-button size="medium" type="success" @click="doSelectDate(6)">上月</el-button>
            </div>
        </div>

        <div style="margin-top: 20px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="hover">
                    <div style="display: flex; flex-direction: column">
                        <span
                        style="padding-bottom: 5px; color: #808080; font-size: 44px"
                        >用户总数量</span
                        >
                        <span style="font-size: 54px; color: #009688">{{ newMember.allcount }}</span>
                    </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover">
                        <div style="display: flex; flex-direction: column">
                            <span
                            style="padding-bottom: 5px; color: #808080; font-size: 44px"
                            >新增数量</span
                            >
                            <span style="font-size: 54px; color: #F44336">{{ newMember.count }}</span>
                        </div>
                        </el-card>
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="hover">
                    <div style="display: flex; flex-direction: column">
                        <span
                        style="padding-bottom: 5px; color: #808080; font-size: 44px"
                        >今日活跃用户</span
                        >
                        <span style="font-size: 54px; color: #FF9800">{{ totalLoginCount }}</span>
                    </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card shadow="hover">
                    <div style="display: flex; flex-direction: column">
                        <span
                        style="padding-bottom: 5px; color: #808080; font-size: 44px"
                        >今日签到用户</span
                        >
                        <span style="font-size: 54px; color: #9C27B0">{{ totalSignCount }}</span>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import share from '@/api/share'
import moment from 'moment'
export default {
  data() {
    return {
      m: this.$Global.optioner,
      startDate: '',
      endDate: '',
      value1: ''
    };
  },
  computed: {
      ...mapState({ 
        newMember: state => state.md.NewMember, 
        totalLoginCount: state => state.md.todayTotalLogin,
        totalSignCount: state => state.md.todayTotalSign
      })
  },
  created() {
    // console.log(this.$Global.optioner)
    this.thisMonth()
    this.getNewMember()
    this.getTodayLoginCount()
    this.getSignNumber()
  },
  methods: {
    formatDate(date) {
        return moment(date).format("YYYY-MM-DD hh:mm:ss")
    },
    getTodayLoginCount() {
      const reqt = {
        router: 'getTodayLoginCount',
        JsonData: {}
      }
      this.$pomelo.send(reqt)
    },
    getSignNumber() {
      const reqt = {
        router: 'getSignNumber',
        JsonData: {}
      }
      this.$pomelo.send(reqt)
    },
    getNewMember() {
      const reqt = {
        router: "getNewMember",
        JsonData: {
          startTime: moment(this.startDate).format('YYYY-MM-DD') + ' 00:00:00',
          endTime: moment(this.endDate).format('YYYY-MM-DD') + ' 00:00:00'
        }
      };
    //   console.log("send get new member ... ", reqt);
      this.$pomelo.send(reqt);
    },
    // 选择日期按钮点击事件
    doSelectDate(n) {
      switch (n) {
        case 1:
          this.today()
          break
        case 2:
          this.yesterday()
          break
        case 3:
          this.theWeek()
          break
        case 4:
          this.lastWeek()
          break
        case 5:
          this.thisMonth()
          break
        case 6:
          this.lastMonth()
          break
        default:
          this.today()
      }
    },
    // 昨日按钮
    yesterday() {
      var dateArr = new Date()
      dateArr.setTime(dateArr.getTime() - 24 * 60 * 60 * 1000)
      var dateArr1 = share.getDateBetween(0, '12:00:00', '今天')
      var startTime = this.$moment(dateArr).format('YYYY-MM-DD HH:mm:ss')
      // var endTime = dateArr1[0].split(' ')
      this.startDate = startTime.split(' ')[0]
      this.endDate = dateArr1[0]
    },
    // 今日
    today() {
      var dateArr = share.getDateBetween(0, '12:00:00', '今天')
      // var startTime = dateArr[0]
      var dateArr1 = new Date()
      dateArr1.setTime(dateArr1.getTime() + 24 * 60 * 60 * 1000)
      var Months = dateArr1.getMonth() + 1
      var Days = dateArr1.getDate()
      if (Months < 10) {
        Months = '0' + Months
      }
      if (Days < 10) {
        Days = '0' + Days
      }
      var endTime =
        dateArr1.getFullYear() + '-' + Months + '-' + Days
      this.startDate = dateArr[0]
      this.endDate = endTime.split(' ')[0]
    },
    // 本周
    theWeek() {
      var dateArr = share.getWeekStartAndEnd(0, new Date())
      var dateArr1 = share.getWeekStartAndEnd(1, new Date())
      // var startTime = dateArr[0]
      // var endTime = dateArr[1]
      this.startDate = dateArr[0]
      this.endDate = dateArr1[0]
    },
    // 上周
    lastWeek() {
      var dateArr = share.getDateBetween(3, '12:00:00', '上周')
      var dateArr1 = share.getWeekStartAndEnd(0, new Date())
      // var startTime = dateArr[0]
      // var endTime = dateArr[1]
      this.startDate = dateArr[0]
      this.endDate = dateArr1[0]
    },
    // 本月
    thisMonth() {
      var dateArr = share.getDateBetween(4, '12:00:00', '本月')
      // var startTime = dateArr[0]
      var date = new Date()
      var currentMonth = date.getMonth()
      var nextMonth = ++currentMonth
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      // var oneDay = 1000 * 60 * 60 * 24
      var endTime =
        this.$moment(new Date(nextMonthFirstDay)).format(
          'YYYY-MM-DD'
        )
      this.startDate = dateArr[0]
      this.endDate = endTime.split(' ')[0]
    },
    // 上月
    lastMonth() {
      var dateArr = share.getDateBetween(5, '12:00:00', '上月')
      var dateArr1 = share.getDateBetween(4, '12:00:00', '本月')
      // var startTime = dateArr[0]
      // var endTime = dateArr[1]
      this.startDate = dateArr[0]
      this.endDate = dateArr1[0]
    }
  }
};
</script>

<style lang="scss">
.main_wrap {
  padding: 20px;
}
</style>
