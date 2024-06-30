<template>
    <div>
        <a-row>
            <a-col :span="4">
                <div class="text-md font-bold">
                    转出步骤
                </div>
            </a-col>
            <a-col :span="6">
                <div class="text-md font-bold">
                    转出条件
                </div>
            </a-col>
            <a-col :span="14">
                <div class="text-md font-bold">
                    更改规则
                </div>
            </a-col>
        </a-row>
        <div style="overflow-y: scroll;height:500px;">
            <a-row v-for="(item, index) in nextProcesses" :key="index" v-if="nextProcesses.length>1">
                <div>

                </div>
                <a-col :span="4">
                    <div class="show-item">
                        {{ item.NextProcess.process_name }}
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="show-expr">
                        {{ transText(item.Expression) }}
                    </div>
                </a-col>
                <a-col :span="14" style="background-color:#fafafa;">
                    <a-row>
                        <a-col :span="4">
                            <div class="text-center">字段</div>
                            <a-select style="width: 100%;" v-model:value="bindExprs[index]['field']">
                                <a-select-option :value="f.field" v-for="(f, index) in fields" :key="index">
                                    {{ f.field_name }}
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="4">
                            <div class="text-center">条件</div>
                            <a-select style="width: 100%;" v-model:value="bindExprs[index]['operator']">
                                <a-select-option value=">">
                                    大于
                                </a-select-option>
                                <a-select-option value="<">
                                    小于
                                </a-select-option>
                                <a-select-option value="=">
                                    等于
                                </a-select-option>
                                <a-select-option value="<=">
                                    小于等于
                                </a-select-option>
                                <a-select-option value=">=">
                                    大于等于
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="4">
                            <div class="text-center">值</div>
                            <a-input v-model:value="bindExprs[index]['value']"></a-input>
                        </a-col>
                        <a-col :span="4">
                            <div class="text-center">其他条件</div>
                            <a-select style="width: 100%;" v-model:value="bindExprs[index]['extra']">
                                <a-select-option value="" default>
                                    默认
                                </a-select-option>
                                <a-select-option value="AND">
                                    并且
                                </a-select-option>
                                <a-select-option value="OR">
                                    或者
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="4">
                            <div class="text-center">操作符</div>
                            <div class="text-center">
                                <a-button-group>
                                    <a-button type="primary" @click="bindExprs[index]['bracket'].push('(')">(</a-button>
                                    <a-button type="primary" @click="bindExprs[index]['bracket'].push(')')">)</a-button>
                                </a-button-group>
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div>
                                <div class="text-center">操作</div>
                            </div>
                            <div class="text-center">
                                <a-button-group>
                                    <a-button type="primary" @click="addCondi(index)">新增</a-button>
                                </a-button-group>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <div class="expr-exam" style="border-bottom: 1px solid #f8cb8b;border-top: 1px solid #f8cb8b;border-right: 1px solid #f8cb8b;
                                box-sizing:border-box;line-height:44px">
                            {{ bindExprs[index] }}
                        </div>
                        <div v-for="(sE, ind) in stateExprs[index]" :key="ind">
                            <div class="expr flex" v-if="index == sE['index']" style="border-bottom: 1px solid #f8cb8b;border-top: 1px solid #f8cb8b;border-right: 1px solid #f8cb8b;
                                box-sizing:border-box;line-height:44px">
                                {{ sE }}
                                <MinusCircleOutlined class="cursor-pointer" style="font-size: 20px; color:red"
                                    @click="delExpr(index, ind)" />
                                <a-button type="primary" @click="validateExpr(index)">☑️</a-button>
                            </div>
                        </div>

                    </a-row>
                </a-col>
            </a-row>
        </div>

    </div>
</template>

<script lang='ts'>
import { toRaw } from 'vue';
import { ExplainConditionSql } from './sql/explain'
import { message } from 'ant-design-vue'
interface Expression {
    index: number,
    field: string,
    operator: string,
    value: string,
    extra: string,
    bracket: [], //括号
}
const { getCurrCond } = useProcess()
export default {
    props: ["attrs"],
    data() {
        return {
            fields: [],
            nextProcesses: [],
            //Expression类型的二维数组
            bindExprs: [] as Expression[],
            stateExprs: [] as Expression[][],
        };
    },
    created() {
    },
    watch: {
        attrs: {
            handler(newVal, oldVal) {
                console.log("condition", newVal)
                this.fields = newVal.fields
                this.nextProcesses = newVal.next_process
                //初始化表达式
                this.nextProcesses.map((item, index) => {
                    this.bindExprs.push({
                        index: index,
                        field: "",
                        operator: "",
                        value: "",
                        extra: "",
                        bracket: []
                    })
                })
                this.stateExprs = new Array(newVal.next_process.length).fill(new Array())
                this.nextProcesses.map((item, index) => {
                    this.getCurrentCond(item)
                })
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        transText(exp) {
            if (exp && exp.startsWith("$")) {
                let text = exp.slice(1)
                let fieldItem = this.fields.find(item => text.includes(item['field']))
                if (fieldItem) {
                    //按照空格拆分，取除开第一项的
                    let arr = text.split(" ")
                    let suffix = arr.slice(1).join(" ")
                    return `${fieldItem['field_name']}${suffix}`
                }
            } else {
                return exp
            }

        },
        addCondi(index) {
            console.log("index", index)
            //判断某一些特定字段不能为空
            let keys = ['field', 'operator', 'value']
            if (keys.some(i => this.bindExprs[index][i] === '') == true) {
                return message.error("请填写完整")
            }
            if (this.bindExprs[index]['index'] == index) {
                this.stateExprs[index].push({ ...this.bindExprs[index] })
            }
        },
        validateExpr(index) {
            const { resultStr, isOk } = this.Explain(this.stateExprs[index])
            if (!isOk) {
                return message.error("校验失败")
            }else{
                return message.success(`校验成功${resultStr}`,)
            }
        },
        Explain(sqlArr) {
            //sqlArr按照空白分割并连接
            const { resultStr, isOk } = ExplainConditionSql(sqlArr)
            if (isOk) {
                return {
                    resultStr,
                    isOk
                }
            } else {
                return {
                    resultStr,
                    isOk: false
                }
            }
        },
        async getCurrentCond(process) {
            let param = {
                flow_id: process.FlowID,
                process_id: process.ProcessID,
                next_process_id: process.NextProcessID
            }
            await getCurrCond(param)
        },
        delExpr(index, ind) {
            this.stateExprs[index].splice(ind, 1)
        }
    }
};
</script>

<style lang="scss">
.show-item {
    width: 140px;
    height: 240px;
    border-bottom-style: 2px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 11px;
    margin: 0 8px;
    font-size: 18px;
    color: #1478FF;
    line-height: 22px;
    background-color: #fafafa;
    display: inline-block;
    position: relative;
    margin: 4px;
}

.show-item::before {
    position: absolute;
    content: '';
    width: 6px;
    height: 100%;
    background: #1478FF;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
}

.show-expr {
    width: 200px;
    height: 64px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 11px;
    margin: 0 8px;
    font-size: 14px;
    color: #20C06B;
    line-height: 22px;
    background-color: #fafafa;
    display: inline-block;
    position: relative;
    margin: 4px;
}

.show-expr::before {
    position: absolute;
    content: '';
    width: 6px;
    height: 100%;
    background: #20C06B;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
}

.expr {
    width: 100%;
    height: 44px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 11px;
    margin: 0 8px;
    font-size: 14px;
    color: #FC933C;
    line-height: 22px;
    background-color: #fafafa;
    display: inline-block;
    position: relative;
    margin: 4px;
}

.expr::before {
    position: absolute;
    content: '';
    width: 6px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    height: 100%;
    background: #FC933C;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
}

.expr-exam {
    width: 100%;
    height: 44px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 11px;
    margin: 0 8px;
    font-size: 14px;
    color: #9333EB;
    line-height: 22px;
    background-color: #fafafa;
    display: inline-block;
    position: relative;
    margin: 4px;
}

.expr-exam::before {
    position: absolute;
    content: '';
    width: 6px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    height: 100%;
    background: #9333EB;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
}
</style>