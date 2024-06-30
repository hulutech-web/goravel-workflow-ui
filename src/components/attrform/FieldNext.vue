<template>
  <div v-if="showContent">
    <a-row>
      <a-col :span="9">
        <a-card title="下一步流程">
          <div>
            <div>
              <a-space>
                <a-space-compact direction="vertical">
                  <a-button type="primary" v-for="(item, ind) in nextProcesses" :key="ind" class="mt-3">
                    {{ item.NextProcess ? item.NextProcess.process_name : "" }}
                  </a-button>
                </a-space-compact>
              </a-space>
            </div>
          </div>
        </a-card>

      </a-col>

      <a-col :span="6">
        <div class="flex justify-center items-center h-full">
          <SwapOutlined style="font-size: 44px;color:seagreen" />
        </div>
      </a-col>
      <a-col :span="9">
        <a-card title="其他步骤">
          <div>
            <div>
              <div>
                <a-space>
                  <a-space-compact direction="vertical">
                    <a-button type="primary" v-for="(item, ind) in beixuanProcess" :key="ind" class="mt-3">
                      {{ item.Process.process_name ? item.Process.process_name : "" }}
                    </a-button>
                  </a-space-compact>
                </a-space>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  attrs: {
    type: Object,
    default: () => { },
  },
});
const showContent = ref(false)
const beixuanProcess = ref([]);
const nextProcesses = ref([]);
watch(() => props.attrs, (newVal, oldVal) => {
  if (newVal) {
    showContent.value = true;
    beixuanProcess.value = newVal.beixuan_process;
    nextProcesses.value = newVal.next_process;
  }
}, { deep: true,immediate:true }
)
</script>
