/* eslint-disable */
import './PomeloClient.js'
import defaultSetting from '@/settings'
import global from './global'
import AES from './aes'
import ws from './ws2'
var nHeartBeat = 0
var s_timer
var isConn = true
var p_server = new Pomelo()
var p_server2 = new Pomelo()

function conn(cb) {
  // const en = global.en
  var loginInfo = JSON.parse(localStorage.getItem('LG_INFO'))
  // var loginInfo = JSON.parse(AES.decrypt(localStorage.getItem('login_info'), en))
  var msg = { uid: loginInfo.id }
  var msg2 = { userId: loginInfo.id, token: loginInfo.token }
  p_server.init({ host: defaultSetting.ip, port: defaultSetting.pomelo_port, log: true },
    function () {
      p_server.request('gate.gateHandler.queryEntry', msg, function (res) {
        // console.log('pomelo first res ', res, defaultSetting.ip, defaultSetting.pomelo_port, loginInfo)
        p_server.disconnect()
        if (res.code === '200') {
          // console.log('enter second ..... ')
          p_server2.init(
            { host: res.host, port: res.port, log: true },
            function (res) {
              p_server2.request('connector.entryHandler.entry', msg2, function (res) {
                // console.log('pomelo second res ', res)
                if (res.code === '200') startTimer()
                cb(null, res)
              })
            }
          )
        } else {
          cb(null, res)
        }
      })
    }
  )
}

p_server2.on('close', function (e) {
  // 连接关闭
  if(isConn) {
    isConn = false
    // console.log('enter close ................')
    var interval = setInterval(() => {
      conn(function (err, res) {
        if (res.code == 200) {
          clearInterval(interval);
          isConn = true
          // console.log('isConn ', isConn)
        }
      });
      isConn = true
    }, 5000)
  }
})

p_server2.on('onMsg', function (e) {
  // 被踢开
  console.log('----onMsg------:', e)
})

p_server2.on('onKick', function (e) {
  // 被踢开
  alert('亲,有相同帐号登录,你被踢出来了!')
  kick()
})

function kick() {
  nHeartBeat = 0
  p_server2.disconnect()
  clearInterval(s_timer)
  window.location.reload(true)
}

var n = 0
function send(msg) {
  n = n + 1
  // const en = global.en
  const msgSend = JSON.stringify(msg)
  // const msgSend = AES.encrypt(JSON.stringify(msg), en)
  // console.log('msgSend ... ', msgSend)
  var route = 'agent.agentHandler.onMsg'
  p_server2.request(route, msgSend, function (res) {
    // console.log('res ', res)
    ws.doData(res)
  })
}

function startTimer() {
  clearInterval(s_timer)
  s_timer = setInterval(() => {
    chkHeartBeat(p_server2)
  }, 5000)
}

function chkHeartBeat(server) {
  if (nHeartBeat > 30) {
    // console.log('自检测跳线了')
    alert('因网络信号不好, 需重新登录!')
    server.disconnect()
    clearInterval(s_timer)
    window.location.reload(true)
  }
  nHeartBeat += 5
  var msg = { uid: global.optioner.Id } // 记得改
  var route = 'agent.agentHandler.chkHardBean'
  server.request(route, msg, function (data) {
    if (data.code == '07') nHeartBeat = 0
  })
}
export default { conn, send, kick }
