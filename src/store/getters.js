const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  AQState: state => state.md.AddQuestionState,
  EQState: state => state.md.EditQuestionState,
  EPState: state => state.md.EditPasswordState,
  EditMemberOk: state => state.md.EditMemberOk,
  ABState: state => state.md.AddBulletinState,
  UState: state => state.md.UserState,
  // EBState: state => state.md.EditBulletinState,
  ECState: state => state.md.CommisionState,
  EASState: state => state.md.AnswerCommisionState,
  ULState: state => state.md.UploadState,
  ULNState: state => state.md.UploadNState,
  ULAPPAState: state => state.md.UploadAPPAState,
  ULQRBGState: state => state.md.UploadQRBGState,
  LState: state => state.md.LinkState,
  EditScoreOk: state => state.md.EditScoreState,
  ThreeLevelOk: state => state.md.ThreeLevelState
}
export default getters
