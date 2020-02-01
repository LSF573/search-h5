<template>
  <transition name="toast">
    <div class="toast" v-if="visible">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'yw-toast',
  data() {
    return {
      visible: false,
      timer: null,
      duration: 2000,
      text: ''
    }
  },
  methods: {
    show() {
      this.visible = true
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  }
}
</script>

<style lang="scss">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 140px;
  font-size: 14px;
  border-radius: 4px;
  text-align: center;
  color: #ffffff;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 101;
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
}
</style>
