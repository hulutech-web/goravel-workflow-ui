<template>
    <div>
        <div id="child_flow" v-if="process.position == 2">
            <div class="control-group">
                <a-form-item label="子流程">
                    <a-select v-model:value="process.child_flow_id">
                        <a-select-option value="0">请选择</a-select-option>
                        <a-select-option v-for="(flow, ind) in flows" :key="ind" :value="flow.id"
                            :selected="process.child_flow_id == flow.id">
                            {{ flow.flow_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

            </div>

            <div class="control-group">
                <a-form-item label="子流程结束后动作">
                    <a-radio-group v-model:value="process.child_after">
                        <a-radio :value="1">
                            同时结束父流程
                        </a-radio>
                        <a-radio :value="2">
                            返回父流程步骤
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
               
            </div>

            <div v-if="process.child_after == 2">
                <a-form-item label="返回步骤">
                    <a-select name="child_back_process">
                        <a-select-option value="0">
                            默认
                        </a-select-option>
                        <a-select-option v-for="(p, index) in processes" :key="index" :value="p.id"
                            :selected="p.child_back_process == p.id">
                            {{ p.process_name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <span class="help-inline">默认为当前步骤下一步</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch } from 'vue';

const props = defineProps({
    attrs: {
        type: Object,
        default: () => { }
    }
})
const process=ref({})
const flows=ref([])
const processes=ref([])
watch(()=>props.attrs,(newVal,oldVal)=>{
    process.value=newVal.process
    flows.value=newVal.flows
    processes.value=newVal.processes
},{
    deep:true,
    immediate:true
})
</script>

<style></style>