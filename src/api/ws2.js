/* eslint-disable */
import { Message } from 'element-ui'
import store from '@/store'
import AES from '@/api/aes'
import global from '@/api/global'
import moment from 'moment'
function doData (rData) {
  // const en = global.en
  // rData = JSON.parse(AES.decrypt(rData, en))
  rData = JSON.parse(rData)
  switch (rData.router) {
    case 'Login':
      SetMyCenterForm(rData)
      break
    case 'getOwnInfo':
      getOwnInfo(rData)
      break
    case 'getMemberInfo':
      getMemberInfo(rData)
      break
    case 'getBulletin':
      getBulletin(rData)
      break
    case 'setBulletin':
      setBulletin(rData)
      break
    case 'getTopicList':
      getTopicList(rData)
      break
    case 'setTopic':
      setTopic(rData)
      break
    case 'editTopic':
      editTopic(rData)
      break
    case 'editOwnPw':
      editOwnPw(rData)
      break
    case 'editMemberInfo':
      editMemberInfo(rData)
      break
    case 'setUserState':
      setUserState(rData)
      break
    case 'editCommission':
      editCommission(rData)
      break
    case 'editAnswerCommission':
      editAnswerCommission(rData)
      break
    case 'getCommission':
      getCommission(rData)
      break
    case 'getAnswerCommission':
      getAnswerCommission(rData)
      break
    case 'uploadImg':
      uploadImg(rData)
      break
    case 'setLink':
      setLink(rData)
      break
    case 'editScore':
      editScore(rData)
      break
    case 'getImgList':
      getImgList(rData)
      break
    case 'getAsset':
      getAsset(rData)
      break
    case 'getFunds':
      getFunds(rData)
      break
    case 'getThreeLevelMember':
      getThreeLevelMember(rData)
      break
    case 'getNewMember':
      getNewMember(rData)
      break
    case 'editImg':
      editImg(rData)
      break
    case 'getLink':
      getLink(rData)
      break
    case 'deleteLink':
      deleteLink(rData)
      break
    case 'getTodayLoginCount':
      getTodayLoginCount(rData)
      break
    case 'getSignNumber':
      getSignNumber(rData)
      break

  }
}

function SetMyCenterForm (rData) {
  // let tableData = rData.JsonData
  // store.commit('md/MemberInfo', tableData)
}

function getOwnInfo (rData) {
  // console.log('rd??? ', rData)
  // let tableData = rData.JsonData.data
  // store.commit('md/setOwnInfo', tableData)
}

function getMemberInfo (rData) {
  // console.log('member ifno ', rData)
  let data = rData.JsonData
  let tableData = rData.JsonData
  for (let i = 0; i < data.length; i++) {
    tableData[i].enable = data[i].enable == 1 ? '??????' : '??????'
    tableData[i].referal_score = data[i].referal_score === null ? 0 : data[i].referal_score
    tableData[i].reference_Id = data[i].gx.split('^').reverse()[1]
    tableData[i].level = data[i].level === 1
      ? '?????????'
      : data[i].level === 2
        ? '??????'
        : data[i].level === 3
          ? '????????????'
          : data[i].level === 4
            ? '????????????'
            : data[i].level === 5
              ? '????????????'
              : data[i].level === 6
                ? '????????????' : ''
  }
  let setData = {
    tableData: tableData,
    totalItem: rData.totalItem
  }
  store.commit('md/setMemberInfo', setData)
}

function getBulletin (rData) {
  let data = []
  data.push(rData.JsonData.data)
  store.commit('md/setBulletin', data)
}

function setBulletin (rData) {
  if (rData.JsonData.result === 'ok') {
    Message.success('??????????????????')
    store.commit('md/setAddBulletinState', true)
  } else {
    Message.info('??????????????????')
  }
}

function getTopicList (rData) {
  let data = rData.JsonData.data
  let tableData = rData.JsonData.data
  for (let i = 0; i < data.length; i++) {
    tableData[i].enable = data[i].enable == 1 ? '??????' : '??????'
  }
  let setData = {
    tableData: tableData,
    totalItem: rData.totalItem
  }
  store.commit('md/setQuestion', setData)
}

function setTopic (rData) {
  // console.log('rData', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('??????????????????')
    store.commit('md/setAddQuestionState', true)
  } else {
    Message.info('??????????????????')
  }
}

function editTopic (rData) {
  if (rData.JsonData.result === 'ok') {
    Message.success('??????????????????')
    store.commit('md/setEditQuestionState', true)
  } else {
    Message.info('??????????????????')
  }
}

function editOwnPw (rData) {
  // console.log('rData', rData)
  // let setData = {
  //   tableData: rData.JsonData.data,
  //   // totalItem: rData.totalItem
  // }
  // store.commit('md/setQuestion', setData)
  if (rData.JsonData.result === 'ok') {
    Message.success('??????????????????')
    store.commit('md/setEditPasswordState', true)
  } else {
    Message.info('??????????????????')
  }
}

function editMemberInfo (rData) {
  // console.log('rData', rData)
  // let setData = {
  //   tableData: rData.JsonData.data,
  //   // totalItem: rData.totalItem
  // }
  // store.commit('md/setQuestion', setData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????????????????')
    store.commit('md/setEditMemberOk', true)
  } else {
    Message.info('????????????????????????')
  }
}

function setUserState(rData) {
  // console.log('rData', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????')
    store.commit('md/setUserState', true)
  } else {
    Message.info('????????????')
  }
}

function getCommission(rData) {
  // console.log('get Commisions ==========', rData)
  store.commit('md/setCommission', rData.JsonData.commission)
}

function getAnswerCommission(rData) {
  // console.log('get answer Commisions ==========', rData)
  store.commit('md/setAnswerCommission', rData.JsonData.commission)
}

function editCommission(rData) {
  // console.log('edit commiston ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????')
    store.commit('md/setCommisionState', true)
    store.commit('md/setAnswerCommisionState', true)
  } else {
    Message.info('????????????')
  }
}

function editAnswerCommission(rData) {
  // console.log('edit answer ... ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????')
    store.commit('md/setAnswerCommisionState', true)
    // console.log(store, '..........')
  } else {
    Message.info('????????????')
  }
}

function uploadImg(rData) {
  // console.log('ws uplaod ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('??????????????????')
    store.commit('md/setUploadState', true)
    store.commit('md/setUploadNState', true)
    store.commit('md/setUploadAPPAState', true)
    store.commit('md/setUploadQRBGState', true)
  } else {
    Message.info('??????????????????')
  }
}

function setLink(rData) {
  // console.log('setLink ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????')
    store.commit('md/setLinkState', true)
  } else {
    Message.info('????????????')
  }
}

function editScore(rData) {
  // console.log('editScore ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('??????????????????')
    store.commit('md/setEditScoreState', true)
  } else {
    Message.info('??????????????????')
  }
}

function getImgList(rData) {
  // console.log('getImgList ', rData)
  if (rData.JsonData) {
    let data = rData.JsonData
    let tableData = rData.JsonData
    for (let i = 0; i < data.length; i++) {
      tableData[i].enable = data[i].enable == 1 ? '??????' : '??????'
    }
    let setData = {
      tableData: tableData,
      totalItem: rData.totalItem
    }
    if (rData.JsonData[0].address === 1) {
      store.commit('md/setImgList', setData)
    } else {
      store.commit('md/setNoticeImgList', setData)
    }
  }
}

function getAsset(rData) {
  // console.log('getAsset ', rData)
  if (rData.JsonData.result === 'ok') {
    let data = rData.JsonData.data
    let tableData = []
    for(let i = 0; i<data.length; i++) {
      tableData[i] = {}
      tableData[i].name = data[i].name
      tableData[i].score = data[i].score
      tableData[i].stime = transTime(data[i].stime)
      tableData[i].userId = data[i].userId
    }
    let setdata = {
      tableData: tableData,
      totalItem: rData.JsonData.itemCount
    }
    store.commit('md/setAssetList', setdata)
  }
}

function transTime (times) {
  moment.suppressDeprecationWarnings = true;
  return moment(times).format('YYYY-MM-DD HH:mm:ss')
}

function getFunds(rData) {
  // console.log('getFunds ', rData)
  if (rData.JsonData.result === 'ok') {
    let data = rData.JsonData.data
    let tableData = []
    for(let i = 0; i<data.length; i++) {
      tableData[i] = {}
      tableData[i].name = data[i].name
      tableData[i].score = data[i].score
      tableData[i].stime = transTime(data[i].stime)
      tableData[i].userId = data[i].userId
    }
    let setdata = {
      tableData: tableData,
      totalItem: rData.JsonData.itemCount
    }
    store.commit('md/setFundList', setdata)
  }
}

function getThreeLevelMember(rData) {
  // console.log('getThreeLevelMember ', rData)
  var data = rData.JsonData
  var treeData = {}
  treeData.tableData = data
  store.commit('md/setTreeData', treeData)
  store.commit('md/setThreeLevelState', true)
}

function getNewMember(rData) {
  // console.log('getNewMember wsss ', rData)
  if (rData.JsonData.result === 'ok') {
    let nm = {
      count: rData.JsonData.count,
      allcount: rData.JsonData.allCount > 2 ? rData.JsonData.allCount - 1 : rData.JsonData.allCount
    }
    store.commit('md/setNewMember', nm)
  }
}

function editImg(rData) {
  // console.log('editImg response ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????')
  }
}

function getLink(rData) {
  // console.log('getLinkData response ', rData)
  let setData = {
    tableData: rData.JsonData,
    totalItem: rData.totalItem
  }
  store.commit('md/setLinkData', setData)
}

function deleteLink(rData) {
  // console.log('deleteLink response ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('????????????')
  }
}

function getTodayLoginCount(rData) {
  // console.log('getTodayLoginCount response ', rData)
  let data = rData.JsonData
  if(data) {
    store.commit('md/setTodayTotalLogin', data.count)
  }
}

function getSignNumber(rData) {
  // console.log('getSignNumber response ', rData)
  let data = rData.JsonData
  if(data) {
    store.commit('md/setTodayTotalSign', data.count)
  }
}

export default {
  doData
}
