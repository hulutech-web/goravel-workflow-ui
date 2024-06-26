<template>
  <div>
    <context-menu v-model:show="show" :options="optionsComponent">
      <context-menu-item @click="addNode">
        <template #default>
          <div class="h-12">
            <hulu-icon name="icon-add-location"></hulu-icon>
            <span>添加步骤</span>
          </div>
        </template>
      </context-menu-item>
      <context-menu-item @click="onMenuClick(1)">
        <template #default>
          <div class="h-12">
            <hulu-icon name="icon-box"></hulu-icon>
            <span>保存设计</span>
          </div>
        </template>
      </context-menu-item>
      <context-menu-item @click="onMenuClick(1)">
        <template #default>
          <div class="h-12">
            <hulu-icon name="icon-refresh"></hulu-icon>
            <span>刷新</span>
          </div>
        </template>
      </context-menu-item>
    </context-menu>
  </div>
</template>
<script lang="ts">
import { http } from "@/plugins/axios";
export default {
  props: {
    flow_id: {
      type: Number,
      default: 0
    },
  },
  data() {

    return {
      show: false,
      //For component
      optionsComponent: {
        theme: 'flat',
        zIndex: 3,
        minWidth: 230,
        x: 500,
        y: 200
      },
    }
  },
  mounted() {
    this.listenRightClick()
  },
  methods: {
    async addNode() {
      //直接发送网络请求，后刷新页面
      let node = {
        flow_id: this.flow_id,
        left: `${this.optionsComponent.x}px`,
        top: `${this.optionsComponent.y}px`,
      }

      await http.request({
        url: `process`,
        method: "POST",
        data: node
      });
    },
    listenRightClick() {
      let pNode = document.querySelector("#flow-chart-container")
      pNode?.addEventListener
        ("contextmenu", (e) => {
          e.preventDefault();
          // 显示组件菜单
          this.show = true;
          this.optionsComponent.x = e.x;
          this.optionsComponent.y = e.y;
        });
    },
    onMenuClick(index: number) {
      console.log('onMenuClick', index);
    }
  }
}
</script>