<template>
    <div>
        <p>
        <div>
            <a-form-item label="自动选人">
                <a-select v-model:value="sys">
                    <a-select-option value="0">
                        不自动选人
                    </a-select-option>
                    <a-select-option value="-1001">
                        发起人部门主管
                    </a-select-option>
                    <a-select-option value="-1002">
                        发起人部门经理
                    </a-select-option>
                </a-select>
            </a-form-item>
        </div>
        </p>
        <a-divider>
            授权范围（适用于：当需要手动选人时，则授权范围生效）
        </a-divider>

        <div>
            <span>授权人员：</span>
            <input type="text"
                style="width:240px;outline: none; border-radius:4px;font-size: 18px; padding: 0 8px; border: 2px solid #ddd;">
            <a-button type="primary" @click="selPer">选择</a-button>
        </div>

        <div class="mt-3">
            <span>授权部门：</span>
            <input type="text"
                style="width:240px;outline: none; border-radius:4px;font-size: 18px; padding: 0 8px; border: 2px solid #ddd;">
            <a-button type="primary" @click="selDep">选择</a-button>
        </div>
        <a-modal v-model:open="open" width="1000px" title="人员&部门选择" centered :bodyStyle="{ height: '590px' }"
            @ok="submit">
            <a-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" rowKey="id"
                bordered :columns="columns" :dataSource="depts" :pagination="false" v-if="selectedEmp == false">
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
                </template>
            </a-table>
            <vxe-grid ref='xGrid' v-bind="gridOptions" v-on="gridEvent" v-if="selectedEmp == true">
                <template #checkbox_header="{ checked, indeterminate }">
                    <div>选择</div>
                </template>
                <template #checkbox_cell="{ row, checked, indeterminate }">
                    <span class="custom-checkbox" @click.stop="toggleCheckboxEvent(row)">
                        <a-checkbox v-if="indeterminate" :checked="checked"></a-checkbox>
                        <a-checkbox v-else-if="checked" :checked="checked"></a-checkbox>
                        <a-checkbox v-else></a-checkbox>
                    </span>
                </template>
                <template #dept="{ row }">
                    <div>
                        {{ row.Dept.id == 0 ? "未分配" : row.Dept.dept_name }}
                    </div>
                </template>
            </vxe-grid>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>

import useEmpconfig from './empconfig'
const { gridOptions } = useEmpconfig()
const { loadDepts } = useDept()

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
const emit = defineEmits(["updateSubmitState"]);
const sys = ref("0")
const open = ref(false)
const depts = ref([])
const xGrid = ref()
const toggleAllCheckboxEvent = () => {
    const $grid = xGrid.value
    if ($grid) {
        $grid.toggleAllCheckboxRow()
    }
}


const selectRecords = ref([])
const toggleCheckboxEvent = (row) => {
    const $grid = xGrid.value
    if ($grid) {
        $grid.toggleCheckboxRow(row)
        // 获取所有已经选择的项目
        const records = $grid.getCheckboxRecords()
        selectRecords.value = selectRecords
        console.log(selectRecords)
    }
}

const gridEvent: VxeGridListeners<RowVO> = {
    proxyQuery() {
        console.log('数据代理查询事件')
        const grid = xGrid.value
        // 获取表格中的数据
        const data = grid.getTableData().fullData
    },
    proxyDelete() {
        console.log('数据代理删除事件')
    },
    proxySave() {
        console.log('数据代理保存事件')
    }
}
watch(() => props.attrs, (newVal, oldVal) => {
    sys.value = newVal.sys
}, {
    deep: true,
    immediate: true
})
const selectedEmp = ref(false)
const selPer = () => {
    selectedEmp.value = true
    open.value = true
}
const selDep = async () => {
    open.value = true
    selectedEmp.value = false
    const { data } = await loadDepts()
    depts.value = data
}
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
]


const state = reactive({
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
};
const submit = () => {
    if (selectedEmp.value) {
        console.log("选择员工", selectRecords.value)
    } else {
        console.log("选择部门", state.selectedRowKeys)

    }
}
</script>

<style></style>