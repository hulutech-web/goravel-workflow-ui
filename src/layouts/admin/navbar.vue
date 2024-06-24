<script setup lang="ts">
import FullScreen from '@/components/fullscreen/index.vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import HistoryMenu from './historyMenu.vue'
import useMenuStore from '@/store/useMenuStore'
import router from '@/plugins/router'
const menuStore = useMenuStore()
const { open } = useUtil()
const keyword = ref("")
const onSearch = () => {
  console.log(keyword.value)
}

const logout=()=>{
  localStorage.clear();
  router.push({name:"auth.login"})
}
</script>

<template>
  <div class="flex justify-between  h-full items-stretch bg-white">
    <Breadcrumb style="height:80px;display:flex;justify-content: center;align-items: center;" />
    <HistoryMenu style="flex:1;height:80px;"/>
    <div class="flex justify-between items-center relative" style="width:300px;">
      <a-input-search style="width: 200px" v-model:value="keyword" placeholder="快捷菜单" enter-button
        @search="onSearch" />
      <a-space :size="24">
        <FullScreen />
      </a-space>
      <a-space :size="24">
        <a-dropdown :trigger="['hover']" placement="bottom" arrow>
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a href="http://www.alipay.com/">个人中心</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="logout" key="1">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>

    </div>
  </div>
</template>