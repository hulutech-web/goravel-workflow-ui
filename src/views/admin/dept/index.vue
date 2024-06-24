<template>
    <div>
        <a-row :gutter="[24, 1]">
            <a-col :span="4">
                <a-card>
                    <p>运营商选择</p>
                    <a-tree :show-line="true" :show-icon="true" :autoExpandParent="true"
                        :field-names="{ children: 'children', title: 'name', key: 'ID' }" :defaultExpandAll="true"
                        :tree-data="treeData" @select="onSelect">
                        <template #icon>
                            <ApartmentOutlined />
                        </template>
                    </a-tree>
                </a-card>
            </a-col>
            <a-col :span="20">
                <a-card>
                    <p>设备信息</p>
                </a-card>
                <a-card>
                    <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvent">
                        <template #action="{ row }">
                            <div>
                                <a-button-group>
                                    <a-button type="link">BMS</a-button>
                                    <a-button type="link" @click="toMap(row.ID)">定位轨迹</a-button>
                                    <a-button type="link">详情</a-button>
                                    <a-button type="link">更多</a-button>

                                </a-button-group>
                            </div>
                        </template>
                    </vxe-grid>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
const { gridOptions, changeUserID } = useDevice()
const { topUsers } = useUser();
const router = useRouter();
const xGrid = ref();
const treeData = ref<TreeProps['treeData']>([]);

const gridEvent: VxeGridListeners<RowVO> = {
    proxyQuery() {
        console.log("数据代理查询事件");
    },
    proxyDelete() {
        console.log("数据代理删除事件");
    },
    proxySave() {
        console.log("数据代理保存事件");
    },
};
const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    // console.log('selectedKeys', selectedKeys);
    // console.log('info', info);
    // console.log('selectedKeys-0', selectedKeys[0]);
    changeUserID(selectedKeys[0])
    xGrid.value.commitProxy('query');
};

const init = async () => {
    const { Users, total } = await topUsers()
    treeData.value = Users
}

const toMap= (id)=>{
    router.push({path:`/admin/device/${id}/track`})
}
init();
</script>

<style scoped></style>