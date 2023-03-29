import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  faHouse, faGear, faBan,
  faListOl, faAnglesDown, faTrashArrowUp,
  faRotateLeft, faTrash, faHand,
  faUserPlus, faHeart, faEye
} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faHouse, faGear, faBan,
  faListOl, faAnglesDown, faTrashArrowUp,
  faRotateLeft, faTrash, faHand,
  faUserPlus, faHeart, faEye)

createApp(App)
  .use(store)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
