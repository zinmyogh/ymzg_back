import Vue from 'vue'
import Vuex from 'vuex'
import AES from '@/api/aes'
import $Global from '@/api/global'
Vue.use(Vuex)

const myCenterForm = {}
const MemberInfo = { tableData: [], totalItem: 0 }
const Bulletin = []
const Question = { tableData: [], totalItem: 0 }
const treeData = { tableData: [] }

const state = {
  WS_MSG: null,
  login: false, // 是否登录
  OwnInfo: {},
  treeData: treeData,
  myCenterForm: myCenterForm,
  Commission: '',
  AnswerCommission: '',
  MemberInfo: MemberInfo,
  Bulletin: Bulletin,
  Question: Question,
  ImageList: { tableData: [], totalItem: 0 },
  NoticeImgList: { tableData: [], totalItem: 0 },
  LinkData: { tableData: [], totalItem: 0 },
  AddQuestionState: false,
  EditQuestionState: false,
  EditPasswordState: false,
  EditMemberOk: false,
  AddBulletinState: false,
  UserState: false,
  CommisionState: false,
  AnswerCommisionState: false,
  UploadState: false,
  UploadNState: false,
  UploadAPPAState: false,
  UploadQRBGState: false,
  LinkState: false,
  EditScoreState: false,
  ImgList: { tableData: [], totalItem: 0 },
  AssetList: { tableData: [], totalItem: 0 },
  FundList: { tableData: [], totalItem: 0 },
  NewMember: {
    count: 0,
    allcount: 0
  },
  HomeCarousel: { tableData: [] }
  // EditBulletinState: false,
}

const mutations = {
  setHomeCarousel(state, payload) {
    state.HomeCarousel = payload
  },
  setNewMember(state, payload) {
    state.NewMember = payload
  },
  setTreeData(state, payload) {
    // console.log('payload ', payload)
    state.treeData = payload
  },
  setLinkData(state, payload) {
    state.LinkData = payload
  },
  setMyInfo(state, payload) {
    state.myInfo = payload
  },
  setOwnInfo(state, payload) {
    state.OwnInfo = payload
  },
  setMemberInfo(state, payload) {
    state.MemberInfo = payload
  },
  setCommission(state, payload) {
    state.Commission = payload
  },
  setAnswerCommission(state, payload) {
    state.AnswerCommission = payload
  },
  setBulletin(state, payload) {
    state.Bulletin = payload
  },
  setImageList(state, payload) {
    state.ImageList = payload
  },
  setQuestion(state, payload) {
    state.Question = payload
  },
  setAddQuestionState(state, payload) {
    state.AddQuestionState = payload
  },
  setEditQuestionState(state, payload) {
    state.EditQuestionState = payload
  },
  setEditPasswordState(state, payload) {
    state.EditPasswordState = payload
  },
  setEditMemberOk(state, payload) {
    state.EditMemberOk = payload
  },
  setAddBulletinState(state, payload) {
    state.AddBulletinState = payload
  },
  setUserState(state, payload) {
    state.UserState = payload
  },
  setCommisionState(state, payload) {
    state.CommisionState = payload
  },
  setAnswerCommisionState(state, payload) {
    // console.log('payl ', payload)
    state.AnswerCommisionState = payload
  },
  setUploadState(state, payload) {
    state.UploadState = payload
  },
  setUploadNState(state, payload) {
    state.UploadNState = payload
  },
  setUploadAPPAState(state, payload) {
    state.UploadAPPAState = payload
  },
  setUploadQRBGState(state, payload) {
    state.UploadQRBGState = payload
  },
  setLinkState(state, payload) {
    state.LinkState = payload
  },
  setEditScoreState(state, payload) {
    state.EditScoreState = payload
  },
  setImgList(state, payload) {
    state.ImgList = payload
  },
  setNoticeImgList(state, payload) {
    state.NoticeImgList = payload
  },
  setAssetList(state, payload) {
    state.AssetList = payload
  },
  setFundList(state, payload) {
    state.FundList = payload
  },
  // setEditBulletinState(state, payload) {
  //   state.EditBulletinState = payload
  // },
}

export default {
  namespaced: true,
  state,
  mutations
}
