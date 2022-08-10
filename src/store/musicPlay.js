

// // 封装findIndex
function findIndex(list, song) {
  // 为true时是index下标,不满足返回-1
  return list.findIndex(item => item.id === song.id)
}

// 封装随机打乱函数
function shuffle(list) {
  const arr = list.slice()
  arr.sort((a, b) => {
      return Math.random() - 0.5
  })
  return arr
}

export default {
  namespaced:true,
  state: {
    //当前播放歌曲的列表
    sequenceList: [],
    // 源播放列表
    playList: [],
    // 播放状态
    playing: false,
    // 播放模式&:0顺序播放 1单曲循环 2随机播放
    playMode: 0,
    // 当前播放歌曲的索引值
    currentIndex: 0,
    // 全屏播放器/迷你播放器
    fullScreen: false,
    // 最爱的歌曲列表
    favoriteList: [],
    // 历史播放记录
    playHistory: [],
    currentTime: 0,
    tmpCurrentTime: null,
    durationTime: '00:00',//持续时长
    bufferedTime: 0,
    change: false,   // 判断是更改的时间还是播放的时间
    playViewHideFlag: false, //控制歌曲播放器是否展开
    playListHideFlag: false,  //播放列表显示
    ActionSheetShowFlag: false,
    playUrl:'',
    playEnded:false,
    nextPlay: false,    //适用与随机播放时添加下一首播放
    cutover: false //歌曲切换
  },
  actions: {
    // ----------添加一首歌到列表----------
    addOnePlay({ commit, state }, list) {
        // const playlist = [...state.playlist]//源播放列表(浅拷贝获取)
        const playList = state.playList.slice()
        const sequenceList = state.sequenceList.slice() //当前播放列表
        let currentIndex = state.currentIndex //当前播放的索引值
        // 新增歌曲放到当前播放歌曲的后面
        // sequenceList.splice(currentIndex + 1, 0, list)
        // 判断加入的歌曲是否在sequenceList中存在的
        let sequenceIndex = findIndex(sequenceList, list)
        if (sequenceIndex > 0) {
            // 歌曲存在
            if (currentIndex < sequenceIndex) {
                // 原本存在的歌曲在当前播放歌曲的后面,删除原来的
                sequenceList.splice(sequenceIndex + 1, 1,list)
                // 当前播放的索引值加一
                currentIndex++
            } else {
                // 原本存在的歌曲在当前播放歌曲的前面,删除原来的
                sequenceList.splice(sequenceIndex, 1,list)
            }
        } else {
            // 歌曲不存在
            // 当前播放的索引值加一
            // currentIndex++
            // 添加到源歌曲列表
            playList.splice(currentIndex + 1, 0,list)
            sequenceList.splice(currentIndex + 1, 0,list)
        }
  
        // 边界情况
        if (sequenceList.length === 1) {
            // 还原
            currentIndex = 0 //其他下标根本没有值
        }
  
        // 设置当前播放歌曲列表
        commit('setSequenceList', sequenceList)
        // 设置源歌曲列表
        commit('setPlaylist', playList)
        // 设置播放状态
        commit('setPlayingState', true)
        // 设置全屏
        commit('setFullScreen', true)
        // 设置当前歌曲下标
        commit('setCurrentIndex', currentIndex)
    },
  
    // ----------设置全部歌曲到当前歌曲列表----------
    addAllPlay({ commit }, lists) {
      let list = lists.list
        // 设置当前播放歌曲列表
        commit('setSequenceList', list)
        // 设置源歌曲列表
        commit('setPlaylist', list)
        // 设置播放状态
        commit('setPlayingState', true)
        // 设置全屏
        commit('setFullScreen', true)
        // 设置当前歌曲下标
        let index = lists.playIndex
        commit('setCurrentIndex', index)
        // 设置播放模式为顺序播放
        commit('setPlayMode', 0)
    },
    // ----------修改播放模式----------
    changeMode({ commit, state, getters }, mode) {
        const currentSong = getters.currentSong
        // 修改为随机播放
        if (mode === 2) {
            commit('setPlaylist', state.playList)
        } else {
            commit('setPlaylist', state.playList)
        }
        // 确保当前播放歌曲不变
        const index = findIndex(state.playList, currentSong)
        // 设置当前歌曲下标
        commit('setCurrentIndex', index)
        // 设置播放模式
        commit('setPlayMode', mode)
    },
  
    // ----------删除歌曲----------
    removeSong({ commit, state }, song) {
        const playList = state.playList.slice()//源播放列表
        const sequenceList = state.sequenceList.slice() //当前播放列表
        let currentIndex = state.currentIndex //当前播放的索引值
  
        // 找到需要被删除的歌曲对应的index
        const sequenceIndex = findIndex(sequenceList, song)
        const playlistIndex = findIndex(playList, song)
        // 找不到
        if (sequenceIndex < 0 || playList < 0) return
        // 找到删掉
        sequenceList.splice(sequenceIndex, 1)
        playList.splice(playlistIndex, 1)
        // 被删除项在当前播放歌曲前面
        if (sequenceIndex < currentIndex) {
            currentIndex--
        }
        // 被删除的是当前播放歌曲,且在sequenceList最后一项
        if (sequenceList.length === currentIndex) {
            currentIndex = 0
        }
        // 设置当前播放歌曲列表
        commit('setSequenceList', sequenceList)
        // 设置源歌曲列表
        commit('setPlaylist', playList)
        // 源歌曲列表为空
        if (!playList.length) {
            // 设置播放状态
            commit('setPlayingState', false)
        }
        // 设置当前歌曲下标
        commit('setCurrentIndex', currentIndex)
  
    },
  
    // ----------全部清空----------
    clearSongList({ commit }) {
        // 设置当前播放歌曲列表
        commit('setSequenceList', [])
        // 设置源歌曲列表
        commit('setPlaylist', [])
        // 设置播放状态
        commit('setPlayingState', false)
        // 设置当前歌曲下标
        commit('setCurrentIndex', 0)
    },
  },
  getters: {
    //  获取当前播放歌曲对象
    currentSong(state) {
       return state.playList[state.currentIndex] || {}
    },
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
            return state.currentTime / state.durationTime * 100;
    },
    change: state => state.change,
    durationTime: state => {
        state.durationTime
    //   let durationTime = state.durationTime
    //   console.log('durationTime'.state)
    //   let long = Math.floor(parseInt(durationTime));
    //   let minute = Math.floor(durationTime / 60);
    //   if (minute < 10) {
    //     minute = '0' + minute;
    //   }
    //   let second = long % 60;
    //   if (second < 10) {
    //     second = '0' + second;
    //   }
    //   console.log(minute + ':' + second)
    //   return minute + ':' + second;
    },
    playUrl: state => {
        if(state.playList.length>0) {
            let playId = state.playList[state.currentIndex].id
            state.playUrl =  'https://music.163.com/song/media/outer/url?id=' + playId + '.mp3'
            return state.playUrl
        }
        
    },
  },
  mutations: {
    // 设置当前歌曲列表
    setSequenceList(state, list) {
        state.sequenceList = list
    },
    // 设置源歌曲列表
    setPlaylist(state,list) {
        state.playList = list
    },
    // 设置播放状态
    setPlayingState(state, playing) {
      state.playing = playing
    },
    // 设置播放模式
    setPlayMode(state, mode) {
        state.playMode = mode
    },
    // 设置播放索引值
    setCurrentIndex(state, index) {
        state.currentIndex = index
    },
    // 设置全屏状态
    setFullScreen(state, fullScreen) {
        state.fullScreen = fullScreen
    },
    // 设置喜欢列表
    setFavoriteList(state, list) {
        state.favoriteList = list
    },
    // 设置历史播放记录
    setPlayHistory(state, list) {
        state.playHistory = list
    },
    updateBufferedTime (state, time) {
        state.bufferedTime = time;
    },
    updateDurationTime (state, time) {
        state.durationTime = time;
    },
    setChange (state, flag) {
        state.change = flag;
    },
    updateCurrentTime (state, time) {
        state.currentTime = time;
    },
    playViewHideFlag (state,playViewHideFlag) {
        state.playViewHideFlag = playViewHideFlag
    },
    playListHideFlag (state,playListHideFlag) {
        state.playListHideFlag = playListHideFlag
    },
    actionSheetHideFlag (state,actionSheetShowFlag) {
        state.actionSheetShowFlag = actionSheetShowFlag
    },
    changeTime (state, time) {
        state.tmpCurrentTime = time;
    },
    playEnded (state, flag) {
        state.playEnded = flag
    },
    nextPlay (state, flag) {
        state.nextPlay = flag
    },
    Cutover (state, flag) {
        state.cutover = flag
    },
  },
  modules: {
  }
}