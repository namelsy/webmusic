import { Search,Button,Image as VanImage,Swipe, SwipeItem,Form, Field, CellGroup,Popover,Toast,NoticeBar,Slider,ActionSheet    } from 'vant'

export default {
  install: function (createApp) {
    let Vue = createApp
    Vue.use(Search)
    Vue.use(Button)
    Vue.use(VanImage)
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(CellGroup);
    Vue.use(Popover);
    Vue.use(Toast);
    Vue.use(NoticeBar);
    Vue.use(Slider);
    Vue.use(ActionSheet);
  },
}
  