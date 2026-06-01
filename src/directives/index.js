//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install (app) {
    app.directive('img-lazy', {
       mounted (el, bingding) {
        //el指令绑定元素img
        //binging指令等号后面绑定的表达式的值
        console.log(el, bingding.value);
        const { stop } = useIntersectionObserver(el,([{ isIntersecting }]) => {
          console.log(isIntersecting)
          if (isIntersecting) {
            //进入视口区域
            el.src = bingding.value
            //停止监听器
            stop()
          }
        })
      }
    })
  }
}