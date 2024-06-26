<template>
    <div class="p-4">
        流程管理
        <vxe-grid ref='xGrid' v-bind="gridOptions" v-on="gridEvent">
            <template #action="{ row }">
                <div>
                    <a-button type="primary">删除</a-button>
                    <a-button type="primary">编辑</a-button>
                    <a-button type="primary" @click="toDesign(row.id)">
                        <PartitionOutlined />流程图
                    </a-button>
                </div>
            </template>
            <template #dept="{ row }">
                <div>
                    {{ row.Dept.id == 0 ? "未分配" : row.Dept.dept_name }}
                </div>
            </template>
        </vxe-grid>
    </div>
</template>

<script setup lang="ts">
const { gridOptions } = useFlow()
const router = useRouter();
// TABLE
const xGrid = ref()
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

const toDesign = (id) => {
    router.push({ path: `/admin/flow/${id}/design` })
}
</script>

<style scoped></style>