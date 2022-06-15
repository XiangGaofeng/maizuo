import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
// import actions from './actions'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    cityId: '110100',
    cityName: '北京',
    cinemaList: [],
    showTabbar: true
  },
  actions: {
    CinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=5121167`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
      console.log(cityName)
    },
    changeCityID (state, cityId) {
      state.cityId = cityId
      console.log(cityId)
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    cleanCinemaList (state) {
      state.cinemaList = []
    },
    show (state) {
      state.showTabbar = true
    },
    hide (state) {
      state.showTabbar = false
    }
  }

})
