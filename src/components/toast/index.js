import ToastComp from '@/components/toast/toast'

let instance = null
const ToastPlugin = {
  install (Vue) {
    if (!instance) {
      const Loading = Vue.extend(ToastComp)
      instance = new Loading()
      document.body.appendChild(instance.$mount().$el)
    }
    const toast = {
      show (text, duration) {
        instance.text = text
        if (duration) instance.duration = duration
        instance.show()
      }
    }
    window.$toast = Vue.prototype.$toast = toast
  }
}

export default ToastPlugin
