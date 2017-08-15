import 'cube.css/src/scss/neat.scss'
import 'element-ui/lib/theme-default/index.css'
//import './welcome.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import oddPrictureEdit from '@/components/oddPrictureEdit/oddPrictureEdit.vue'

Vue.use(ElementUI)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
   
  },
  components: {
    'unify-header': Header,
    'unify-footer': Footer,
    'add-edint':oddPrictureEdit
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})

