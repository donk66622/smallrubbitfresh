//封装购物车模块

import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { useUserStore } from "./user"
import { insertCartAPI, findNewCartlistAPI, delCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', ()=>{
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  //定义state - cartList
  const cartList = ref([])
  //获取最新购物车列表
  const updateNewList = async ()=>{
    const res = await findNewCartlistAPI()
    cartList.value = res.result
  }
  //定义action - addCart
  const addCart = async (goods)=>{
    const { skuId, count } = goods
    if(isLogin.value){
      //登陆之后的加入购物车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    }else{
    //添加购物车操作
    //已添加过 - count + 1
    //没有添加 直接push
    //思路：通过匹配传递来的商品对象中的skuId能不能再cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if(item) {
      item.count++
    }else {
      cartList.value.push(goods)
    }
    }
  }

  //删除购物车
  const delCart = async (skuId) => {
    if(isLogin.value){
      await delCartAPI([skuId])
      updateNewList()
    }else{
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx,1)
    }
  }

  //清楚购物车
  const cleanCart = () => {
    cartList.value = []
  }

  //单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item)=> item.skuId === skuId)
    item.selected = selected
  }

  //全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  //计算总价格
  //总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a,c) => a+c.count, 0))
  //总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a,c) => a+c.count*c.price, 0))

  //是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  //已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a,c) => a+c.count,0))
  //已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a,c) => a+c.count*c.price,0))

  return {
    cartList,
    isAll,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    allCheck,
    singleCheck,
    cleanCart,
    updateNewList
  }
},{
  persist: true
})