import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import $Global from '@/api/global'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { name, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        // console.log(response, 'login responwse')
        commit('SET_TOKEN', data.JsonData.token)
        setToken(data.JsonData.token)
        $Global.optioner.Id = data.JsonData.Id
        $Global.optioner.enable = data.JsonData.enable
        $Global.optioner.gx = data.JsonData.gx
        $Global.optioner.level = data.JsonData.level
        $Global.optioner.loginIp = data.JsonData.loginIp
        $Global.optioner.loginTime = data.JsonData.loginTime
        $Global.optioner.name = data.JsonData.name
        $Global.optioner.nickname = data.JsonData.nickname
        $Global.optioner.token = data.JsonData.token
        $Global.optioner.ye = data.JsonData.ye

        const info = {
          id: data.JsonData.Id,
          token: data.JsonData.token
        }
        localStorage.setItem('LG_INFO', JSON.stringify(info))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      if (getToken()) {
        // commit('SET_NAME', $Global.optioner.name)
        commit('SET_AVATAR', require('@/assets/images/admin.jpg'))
        resolve()
      } else {
        reject('请重新登录验证')
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        window.location.reload()
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

