import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import InfoList from '@/components/InfoList'
import details from '@/components/details'
import opinion from '@/components/opinion'
import AboutAs from '@/components/AboutAs'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Info',
      name: 'InfoList',
      component: InfoList
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/opinion',
      name: 'opinion',
      component: opinion
    },
    {
      path: '/aboutAs',
      name: 'AboutAs',
      component: AboutAs
    }
  ]
})
