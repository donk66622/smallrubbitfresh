//封装category相关的业务代码
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category.js'
import { useRoute } from "vue-router"
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory () {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async () => {
  const res = await getCategoryAPI(route.params.id)
  categoryData.value = res.result
}

  onMounted(() => getCategory())


  return {
    categoryData
  }

//第二种路由缓存问题解决方式
// onBeforeRouteUpdate (() => {

// })
}