<template>
   <div>
      <a-row :gutter="[32, 8]">
         <a-col :span="12">
            <a-card title="管理面板">
               <div class="flex">
                  <div @click="toEmp" class="mx-3 border border-gray-500 bg-green-400 p-4 w-64 h-32
               rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
                     <p class="text-lg text-white font-bold border-b-2 border-gray-900">员工管理</p>
                     <span class="text-gray-700">员工信息，部门</span>
                  </div>
                  <div @click="toDept" class="mx-3 border border-gray-500 bg-orange-400 p-4 w-64 h-32
               rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
                     <p class="text-lg text-white font-bold border-b-2 border-gray-900">部门管理</p>
                     <span class="text-gray-700">部门管理、部门经理、部门主管</span>
                  </div>
                  <div @click="toFlow" class="mx-3 border border-gray-500 bg-red-400 p-4 w-64 h-32
               rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
                     <p class="text-lg text-white font-bold border-b-2 border-gray-900">流程管理</p>
                     <span class="text-gray-700">流程管理、低代码流程图</span>
                  </div>
                  <div @click="toTemplate" class="mx-3 border border-gray-500 bg-purple-600 p-4 w-64 h-32
               rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
                     <p class="text-lg text-white font-bold border-b-2 border-gray-900">模板管理</p>
                     <span class="text-gray-700">模板管理、表单控件</span>
                  </div>
               </div>
            </a-card>
         </a-col>
         <a-col :span="12">
            <a-card title="工作流">
               <div class="flex" v-for="(item, index) in form.flows" :key="index">
                  <div @click="" class="mx-3 border border-gray-500 bg-green-400 p-4 w-64 h-32
               rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
                     <p class="text-lg text-white font-bold border-b-2 border-gray-900">{{ item.flow_name }}</p>
                     <span class="text-gray-700">编号：{{ item.flow_no }}</span>
                  </div>
               </div>

            </a-card>
         </a-col>
      </a-row>
      <a-row class="mt-12" :gutter="[32, 8]">
         <a-col :span="8">
            <a-card title="我的申请" :headStyle="{ backgroundColor: '#4b7bec', color: 'white' }">
               <div style="height:400px;overflow-y: auto;" class="bg-blue-100"></div>
            </a-card>
         </a-col>
         <a-col :span="8">
            <a-card title="我的代办" :headStyle="{ backgroundColor: '#cc8e35', color: 'white' }">
               <div style="height:400px;overflow-y: auto;" class="bg-orange-100"></div>
            </a-card>
         </a-col>
         <a-col :span="8">
            <a-card title="我的审批" :headStyle="{ backgroundColor: '#20bf6b', color: 'white' }">
               <div style="height:400px;overflow-y: auto;" class="bg-green-100"></div>
            </a-card>
         </a-col>
      </a-row>
   </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const { index } = useHome()
const form = ref({
   entries: [],
   flows: [],
   handle_procs: [],
   procs: []
})
const init = async () => {
   const {data} = await index()
   form.value.entries = data.entries
   form.value.flows = data.flows
   form.value.handle_procs = data.handle_procs
   form.value.procs = data.procs
}
onMounted(() => {
   init()
})
const toEmp = () => {
   router.push({ path: "/admin/user/index" })
}
const toDept = () => {
   router.push({ path: "/admin/dept/index" })
}
const toFlow = () => {
   router.push({ path: "/admin/flow/index" })
}
const toTemplate = () => {
   router.push({ path: "/admin/template/index" })
}
</script>

<style scoped></style>