import Vue from 'vue'
import Vuex from 'vuex'
import apiClient from '@/services/FileUpload'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uploadedImages: {}
  },
  mutations: {
    ADD_IMAGE(state, image) {
      state.uploadedImages = Object.assign(image, state.uploadedImages)
    },
    UPDATE_IMAGE(state, data) {
      state.uploadedImages[data.name].status = 'done'
      state.uploadedImages[data.name].data = data.data
    },
    CANCEL_REQ(state, name) {
      state.uploadedImages[name].status = 'cancelled'
    }
  },
  actions: {
    uploadImage({ commit, getters }, formData) {
      let name = [...formData][0][1].name
      const axiosSource = axios.CancelToken.source()
      const image = {}
      image[name] = {
        rq: { cancel: axiosSource.cancel, msg: 'canceled' },
        status: 'uploading',
        name: name
      }

      commit('ADD_IMAGE', image)
      apiClient
        .upload(formData, { cancelToken: axiosSource.token })
        .then(data => {
          console.log(data.name)
          data.name = name
          commit('UPDATE_IMAGE', data)
          console.log(getters.getImage(name))
        })
        .catch(function(thrown) {
          if (axios.isCancel(thrown)) {
            commit('CANCEL_REQ', name)
          } else {
            console.log('cancel ', thrown)
          }
        })
    }
  },
  getters: {
    allImages: state => {
      return state.uploadedImages
    },
    getImage: state => name => {
      return state.uploadedImages[name]
    }
  }
})
