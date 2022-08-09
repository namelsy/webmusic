import { createStore } from 'vuex'
import musicPlay from './musicPlay'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  modules: {
    musicPlay
  },
  plugins:[
    createPersistedstate({
      reducer(val) {
        return {
          musicPlay: val.musicPlay
        }
        
      }
      // key: 'musicPlay',
      // paths: ['musicPlay']
    })
  ],
})
