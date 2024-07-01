<template>
  <div v-if="showContent">
    <a-row>
      <a-col :span="9">
        <a-card title="下一步流程">
          <div>
            <div>
              <a-space>
                <a-space-compact direction="vertical">
                  <a-button @click="removePrs(item)" type="primary" v-for="(item, ind) in nextProcesses" :key="ind"
                    class="mt-3">
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
                    <a-button @click="addPrs(item)" type="primary" v-for="(item, ind) in beixuanProcess" :key="ind"
                      class="mt-3">
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
  submitState: {
    type: Object,
    default: () => { }
  }
});
const process_to = ref([])
const emit = defineEmits(["updateSubmitState"]);
const showContent = ref(false)
const beixuanProcess = ref([]);
const nextProcesses = ref([]);
watch(() => props.attrs, (newVal, oldVal) => {
  if (newVal) {
    showContent.value = true;
    beixuanProcess.value = newVal.beixuan_process;
    nextProcesses.value = newVal.next_process;
    process_to.value = newVal.next_process;
  }
}, { deep: true, immediate: true }
)

const tmpNextProcess = ref({})
const tmpBeixuanProcess = ref({})
const removePrs = (item) => {
  let tmpIndex = nextProcesses.value.findIndex(b => b.id == item.id)
  if (tmpIndex != -1) {
    tmpNextProcess.value = nextProcesses.value[tmpIndex]
    nextProcesses.value.splice(tmpIndex, 1)
    beixuanProcess.value.push(tmpNextProcess.value)
  }
}

const addPrs = (item) => {
  let tmpIndex = beixuanProcess.value.findIndex(b => b.id == item.id)
  if (tmpIndex != -1) {
    tmpBeixuanProcess.value = beixuanProcess.value[tmpIndex]
    beixuanProcess.value.splice(tmpIndex, 1)
    nextProcesses.value.push(tmpBeixuanProcess.value)
  }
}

</script>
