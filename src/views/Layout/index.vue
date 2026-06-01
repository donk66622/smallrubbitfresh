<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';

//初始化数据
import { useCategoryStore} from '@/stores/category.js'
import { onMounted, ref } from 'vue'

  const categoryStore = useCategoryStore()

  onMounted(() => {
    categoryStore.getCategory()
  })
</script>

<template>
  <LayoutFixed/>
  <LayoutNav/>
  <LayoutHeader/>
  <!-- 路由缓存问题第一种解决方式 -->
  <RouterView :key="$route.fullPath" />
  <LayoutFooter/>
</template>