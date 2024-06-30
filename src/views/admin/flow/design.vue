<template>
    <div>
        <a-card>
            <div class="flex justify-evenly">
                <a-space>
                    <a-button type="primary" @click="saveDesign">保存设计</a-button>
                    <a-button type="primary" @click="publishDesign">发布流程</a-button>
                </a-space>
                <a-space>
                    <a-button type="primary" ghost @click="changePos">调整位置</a-button>
                    <a-button type="primary" ghost @click="linkNode">连接步骤</a-button>
                </a-space>
            </div>
        </a-card>
        <div id="flow-chart-container">
            <hulu-menu :flow_id="(+id)" :init="initAll" ref="menuRef" />
            <!-- 动态生成节点 -->

            <div v-for="(node, nodeId) in nodeList" :key="node.id"
                :class="'node' + (node.process_to ? ' source-node' : '')" :id="'node-' + node.id" :style="node.style">
                <div class="flex justify-center align-items-center node-element" :id="`menu-${node.id}`">
                    <HuluIcon :id="`node-line-${node.id}-pointer`" />
                    {{ node.process_name }}
                    <a-button type="primary" style="color:#70f570;z-index:20;" @click="setProcess(node)" shape="circle">
                        <SettingOutlined class="node-setting" />
                    </a-button>
                </div>
            </div>
        </div>

        <a-modal v-model:open="open" width="1200px" title="节点设计" centered :bodyStyle="{ height: '600px' }">
            <attrform :attrs="attrs" />
        </a-modal>
    </div>

</template>

<script setup lang='ts'>
import initFlowChart from './flow'
const route = useRoute()
const { loadFlowDesign, storeFlow, updateFlow } = useFlow()
const { loadAttributes } = useProcess()
const id = route.params.id
const jsplumbJSON = ref({})
const nodeList = ref([])
const flow = ref({})
const menuRef = ref({})
const open = ref(false)
const init = async () => {
    const { data } = await loadFlowDesign(+id)
    flow.value = data
    jsplumbJSON.value = JSON.parse(data.jsplumb)
    nodeList.value = jsplumbJSON.value.list
}

onMounted(async () => {
    await initAll()
})
const initAll = async () => {
    await init()
    await initFlowChart(jsplumbJSON.value, getNewestNodes)
}
const saveDesign = async () => {
    // 保存设计逻辑
    await updateFlow(flow.value)
}
const changePos = () => {

}
const attrs = ref({})
const setProcess = async (node) => {
    //阻止点击事件向下穿透
    open.value = true
    const { data } = await loadAttributes(node.id)
    attrs.value = data
    console.log("全局attrs",attrs.value)

}
const linkNode = () => { }
const getNewestNodes = async (nodes) => {
    //获取最新的节点信息
    if (jsplumbJSON.value.total == 0) {
        // await storeFlow(+id,nodes)
    } else {
        let newJsplumb = {
            total: nodes.length,
            list: ""
        }
        let list = Object.create(null)
        for (let i = 0; i < newJsplumb.total; i++) {
            let node = nodes[i]
            list[node.id + ""] = node
        }
        newJsplumb.list = list
        flow.value.jsplumb = JSON.stringify(newJsplumb)
    }
}

const publishDesign = () => {
    // 发布设计逻辑
}
</script>


<style>
#flow-chart-container {
    width: 100%;
    height: 750px;
    border: 1px solid #ccc;
    position: relative;
}

.node {
    position: absolute;
    text-align: center;
}




.node-element {
    /* 设置节点的基础样式 */
    background-color: #151d29;
    border: 1px solid #4a69bd;
    border-radius: 5px;
    padding: 10px;
}

/* 如果需要针对特定状态（如鼠标悬停）设置样式 */
.node-element:hover {
    background-color: #1e3799;
    cursor: move;
}

.node-setting {
    cursor: pointer;
}
</style>