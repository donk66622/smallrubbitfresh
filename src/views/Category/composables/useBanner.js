//封装轮播图相关函数
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'


//获取banner
export function useBanner () {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI()
    console.log(res)
    bannerList.value = res.result
  }

  onMounted(() => getBanner())

  return {
    bannerList
  }
}