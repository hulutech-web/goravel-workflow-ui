<template>
    <div>
        <a-row :gutter="[24, 1]">
            <a-col :span="12">
                <a-card>
                    <p>部门</p>
                    <a-button type="primary" :icon="h(PlusOutlined)">
                        新增部门
                    </a-button>
                    <a-table bordered :columns="columns" :dataSource="depts" :pagination="false">
                        <template #bodyCell="{ column, text, record }">
                            <template v-if="column.dataIndex === 'html'">
                                <span class="text-blue-500 text-xl mr-3">
                                    {{ record.html }}
                                </span>
                                {{ record.dept_name }}
                            </template>
                            <template v-if="column.dataIndex === 'Manager'">
                                {{ record.Manager ? record.Manager.name : '' }}
                            </template>
                            <template v-if="column.dataIndex === 'Director'">
                                {{ record.Director ? record.Director.name : '' }}
                            </template>
                            <template v-if="column.dataIndex === 'action'">
                                <a-button-group>
                                    <a-button type="primary">修改</a-button>
                                    <a-button type="dashed" danger>删除</a-button>
                                </a-button-group>
                            </template>
                        </template>
                    </a-table>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card>
                    <p>部门</p>
                </a-card>
                <a-card>

                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
const { loadDepts } = useDept();
const { getEmpOpt } = useEmp();
const depts = ref([])
const emps = ref([])
const columns = [
    {
        title: '层级',
        dataIndex: 'html',
        key: 'html',
    },
    {
        title: '经理',
        dataIndex: 'Manager',
        key: 'Manager',
    },
    {
        title: '负责人',
        dataIndex: 'Director',
        key: 'Director',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    },


]
const init = async () => {
    let d_Data = await loadDepts()
    depts.value = d_Data.data
    let e_Data = await getEmpOpt()
    emps.value = e_Data.data
}
init()
</script>

<style scoped></style>