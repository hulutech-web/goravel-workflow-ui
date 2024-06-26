<template>
    <div>
        <a-row :gutter="[24, 1]">
            <a-col :span="6">
                <a-card>
                    <p>模板</p>
                </a-card>
                <a-card>
                    <a-button type="primary" :icon="h(PlusOutlined)">
                        添加模板
                    </a-button>
                    <vxe-grid ref='xGrid' v-bind="gridOptions" v-on="gridEvent">
                        <template #action="{ row }">
                            <div>
                                <a-button-group>
                                    <a-button type="primary">删除</a-button>
                                    <a-button type="primary">编辑</a-button>
                                    <a-button type="primary" @click="loadTmplForm(row)">表单控件</a-button>
                                </a-button-group>
                            </div>
                        </template>
                        <template #dept="{ row }">
                            <div>
                                {{ row.Dept.id == 0 ? "未分配" : row.Dept.dept_name }}
                            </div>
                        </template>
                    </vxe-grid>
                </a-card>
            </a-col>

            <a-col :span="9">
                <a-card>
                    <p>表单字段</p>
                </a-card>
                <a-card>
                    <a-button type="primary" :icon="h(PlusOutlined)" @click="addField">
                        添加字段
                    </a-button>
                    <a-table bordered :columns="columns" :dataSource="fields">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.dataIndex === 'action'">
                                <div>
                                    <a-button-group>
                                        <a-button type="primary" @click="edit(record)">编辑</a-button>
                                        <a-button type="primary" danger>删除</a-button>
                                    </a-button-group>
                                </div>
                            </template>
                        </template>
                    </a-table>
                </a-card>
            </a-col>

            <a-col :span="9">
                <a-card>
                    <p>表单预览</p>
                </a-card>
                <a-card>
                    <Form :fields="fields"></Form>
                </a-card>
            </a-col>
        </a-row>

        <a-modal v-model:open="open" title="控件配置" centered width="800px" :footer="false">
            <a-form v-model="formField">
                <a-form-item label="控件名称" name="field_name">
                    <a-input v-model:value="formField.field_name"></a-input>
                </a-form-item>
                <a-form-item label="控件类型" name="field_type">
                    <a-select v-model:value="formField.field_type">
                        <a-select-option value="text">文本框</a-select-option>
                        <a-select-option value="textarea">文本域</a-select-option>
                        <a-select-option value="select">下拉框</a-select-option>
                        <a-select-option value="radio">单选框</a-select-option>
                        <a-select-option value="checkbox">复选框</a-select-option>
                        <a-select-option value="date">日期框</a-select-option>
                        <a-select-option value="datetime">时间框</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="字段名" name="field">
                    <a-input v-model:value="formField.field"></a-input>
                </a-form-item>
                <a-form-item label="控件选项(一行一个选项)" name="field_value">
                    <a-textarea :rows="8" v-model:value="formField.field_value"></a-textarea>
                </a-form-item>
                <a-form-item label="控件默认值" name="default_value">
                    <a-input v-model:value="formField.default_value"></a-input>
                </a-form-item>
                <a-form-item label="排序" name="sort">
                    <a-input-number v-model:value="formField.sort"></a-input-number>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary">提交</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>



<script setup lang="ts">
import { h } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import dataSample from 'echarts/types/src/processor/dataSample.js';
const { loadTemplates, gridOptions } = useTemplate();
const { loadTemplateForm } = useTemplateForm();
const router = useRouter()
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
const columns = [
    {
        dataIndex: "id",
        title: "id",
        key: "id"
    },
    {
        dataIndex: "field_name",
        title: "控件名称",
        key: "field_name"
    },
    {
        dataIndex: "field",
        title: "字段名",
        key: "field"
    },
    {
        dataIndex: "field_type",
        title: "字段类型",
        key: "field_type"
    },
    {
        dataIndex: "sort",
        title: "排序",
        key: "sort"
    },
    {
        dataIndex: "template_id",
        title: "模板id",
        key: "template_id"
    },
    {
        dataIndex: "action",
        title: "操作",
        key: "action"
    },

]
const fields = ref([])

const loadTmplForm = async (row) => {
    const { data } = await loadTemplateForm(row.id)
    fields.value = data
}

const open = ref(false)
const edit = (record) => {
    open.value = true
    formField.value = record
}
const resetFormField = () => {
    formField.value = {
        id: null,
        field: "",
        field_default_value: "",
        field_name: "",
        field_type: "",
        field_value: "",
        sort: "",
        template_id: "",
    }
}

const submit = async () => {
    const { data } = await loadTemplates()
    gridOptions.value.data = data
}
const deleteField = async (record) => {
    const { data } = await loadTemplates()
    gridOptions.value.data = data
}
const addField = () => {
    resetFormField()
    open.value = true

}

const formField = ref({
    id: null,
    field: "",
    field_default_value: "",
    field_name: "",
    field_type: "",
    field_value: "",
    sort: "",
    template_id: "",
})
</script>

<style scoped></style>