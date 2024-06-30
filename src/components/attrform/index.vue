<template>
    <div>
        <a-tabs v-model:activeKey="activeKey" type="card">

            <a-tab-pane key="1" tab="常规" style="height: 200px">
                <a-form-item label="步骤名称">
                    <a-input v-model:value="formState.process.process_name"></a-input>
                </a-form-item>
                <a-form-item label="步骤类型">
                    <a-radio-group v-model:value="formState.process.position" @change="selectStepType">
                        <a-radio :value="1">正常步骤</a-radio>
                        <a-radio v-if="formState.can_child" :value="2">转入子流程</a-radio>
                        <a-radio :value="0">第一步</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-divider></a-divider>
                <div v-if="attrs">
                    <component :is="getCurrentComponent" :attrs="attrs" />
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="表单" style="height: 200px">
                <a-table bordered :columns="columns" :dataSource="dataSource"></a-table>
            </a-tab-pane>
            <a-tab-pane key="3" tab="权限" style="height: 200px">
                <Prms :attrs="attrs" />
            </a-tab-pane>
            <a-tab-pane key="4" tab="转出条件" style="height: 200px">
                <Condition :attrs="attrs" />
            </a-tab-pane>
            <a-tab-pane key="5" tab="样式" style="height: 200px">
                <div class="p-3">
                    <Style :attrs="attrs" />
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script lang='ts'>
import FieldEnd from './FieldEnd.vue';
import FieldNext from './FieldNext.vue';
import Style from './Style.vue'
import Prms from './Prms.vue'
import Condition from './Condition.vue'
import { icons } from './icon'
export default {
    components: {
        FieldEnd,
        FieldNext,
        Condition,
        Prms,
        Style
    },
    props: ['attrs'],
    setup(props) {
        const MyIcons = ref(icons)
        const columns = [
            {
                title: '字段名称',
                dataIndex: 'field_name',
                key: 'field_name',
            },
            {
                title: '字段标识',
                dataIndex: 'field',
                key: 'field',
            },
            {
                title: '字段类型',
                dataIndex: 'field_type',
                key: 'field_type',
            },
        ];

        // const dataSource = props.attrs.fields;
        const dataSource = computed(() => {
            return props.attrs.fields
        })
        const fieldIndex = ref('next');
        const formState = ref({
            process: {},
            can_child: true,

        })
        watch(() => props.attrs, (newVal, oldVal) => {
            if (newVal.process != oldVal.process) {
                formState.value.process = newVal.process
                formState.value.can_child = newVal.can_child
                // console.log(2222, formState.value.process)
            }
        })
        const selectStepType = (val) => {
            if (val.target.value == 2) {
            } else {
            }
        }
        const activeKey = ref('1');
        const getCurrentComponent = computed(() => {
            if (formState.value.process.position == 1 || formState.value.process.position == 0) {
                return 'field-next'
            }
            if (formState.value.process.position == 2) {
                return 'field-end'
            }
        });

        const ic = ref("")
        
        return {
            activeKey,
            formState,
            selectStepType,
            getCurrentComponent,
            dataSource,
            columns,
            MyIcons,
            ic
        };
    },
};

</script>

<style></style>