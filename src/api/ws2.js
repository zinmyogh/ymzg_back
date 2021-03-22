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
  }
}

function SetMyCenterForm (rData) {
  // let tableData = rData.JsonData
  // store.commit('md/MemberInfo', tableData)
}

function getOwnInfo (rData) {
  // console.log('rd阿 ', rData)
  // let tableData = rData.JsonData.data
  // store.commit('md/setOwnInfo', tableData)
}

function getMemberInfo (rData) {
  // console.log('member ifno ', rData)
  let data = rData.JsonData
  let tableData = rData.JsonData
  for (let i = 0; i < data.length; i++) {
    tableData[i].enable = data[i].enable == 1 ? '启用' : '禁用'
    tableData[i].referal_score = data[i].referal_score === null ? 0 : data[i].referal_score
    tableData[i].reference_Id = data[i].gx.split('^').reverse()[1]
    tableData[i].level = data[i].level === 1
      ? '管理员'
      : data[i].level === 2
        ? '代理'
        : data[i].level === 3
          ? '钻石会员'
          : data[i].level === 4
            ? '铂金会员'
            : data[i].level === 5
              ? '黄金会员'
              : data[i].level === 6
                ? '白银会员' : ''
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
    Message.success('添加公告成功')
    store.commit('md/setAddBulletinState', true)
  } else {
    Message.info('添加公告失败')
  }
}

function getTopicList (rData) {
  let data = rData.JsonData.data
  let tableData = rData.JsonData.data
  for (let i = 0; i < data.length; i++) {
    tableData[i].enable = data[i].enable == 1 ? '启用' : '禁用'
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
    Message.success('添加题目成功')
    store.commit('md/setAddQuestionState', true)
  } else {
    Message.info('添加题目失败')
  }
}

function editTopic (rData) {
  if (rData.JsonData.result === 'ok') {
    Message.success('修改题目成功')
    store.commit('md/setEditQuestionState', true)
  } else {
    Message.info('修改题目失败')
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
    Message.success('修改密码成功')
    store.commit('md/setEditPasswordState', true)
  } else {
    Message.info('修改密码失败')
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
    Message.success('修改会员信息成功')
    store.commit('md/setEditMemberOk', true)
  } else {
    Message.info('修改会员信息失败')
  }
}

function setUserState(rData) {
  // console.log('rData', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('修改成功')
    store.commit('md/setUserState', true)
  } else {
    Message.info('修改失败')
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
    Message.success('修改成功')
    store.commit('md/setCommisionState', true)
    store.commit('md/setAnswerCommisionState', true)
  } else {
    Message.info('修改失败')
  }
}

function editAnswerCommission(rData) {
  // console.log('edit answer ... ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('修改成功')
    store.commit('md/setAnswerCommisionState', true)
    // console.log(store, '..........')
  } else {
    Message.info('修改失败')
  }
}

function uploadImg(rData) {
  // console.log('ws uplaod ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('上传图片成功')
    store.commit('md/setUploadState', true)
    store.commit('md/setUploadNState', true)
    store.commit('md/setUploadAPPAState', true)
    store.commit('md/setUploadQRBGState', true)
  } else {
    Message.info('上传图片失败')
  }
}

function setLink(rData) {
  // console.log('setLink ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('上传成功')
    store.commit('md/setLinkState', true)
  } else {
    Message.info('上传失败')
  }
}

function editScore(rData) {
  // console.log('editScore ', rData)
  if (rData.JsonData.result === 'ok') {
    Message.success('积分修改成功')
    store.commit('md/setEditScoreState', true)
  } else {
    Message.info('积分修改失败')
  }
}

function getImgList(rData) {
  // console.log('getImgList ', rData)
  if (rData.JsonData) {
    let data = rData.JsonData
    let tableData = rData.JsonData
    for (let i = 0; i < data.length; i++) {
      tableData[i].enable = data[i].enable == 1 ? '启用' : '禁用'
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
    let setdata = {
      tableData: rData.JsonData.data,
      totalItem: rData.JsonData.itemCount
    }
    store.commit('md/setAssetList', setdata)
  }
}

function getFunds(rData) {
  // console.log('getFunds ', rData)
  if (rData.JsonData.result === 'ok') {
    let setdata = {
      tableData: rData.JsonData.data,
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
    Message.success('修改成功')
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
    Message.success('删除成功')
  }
}

export default {
  doData
}
