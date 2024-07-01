<template>
    <div>
        <div class="flex justify-start items-center mt-3">
            <div class="flex-4" style="width:80px;">尺寸</div>
            <div class="flex-8 flex">
                <a-space>
                    <a-input v-model:value="styleState.style_width"></a-input>
                    X
                    <a-input v-model:value="styleState.style_height"></a-input>
                </a-space>
            </div>
        </div>
        <div class="flex mt-3 items-center">
            <div class="flex-4" style="width:80px;">字体颜色</div>
            <input type="text" v-model="styleState.style_color"
                class="w-24 h-8 border-none outline-none bg-gray-100 rounded-sm px-3 mx-3">
            <div v-for="(c, ind) in colors" :key="ind" :style="{ background: `${c}` }" class="h-8 w-8 cursor-pointer"
                @click="setColor(c)"></div>

        </div>
        <div class="flex mt-3 items-center">
            <div style="width:80px;">图标</div>
            <div>
                <HuluIcon :name="process.icon" :fontSize="'24px'" style="line-height:24px"
                    class="cursor-pointer bg-black text-white  rounded w-6" />
            </div>
            <input type="text" class="h-8 border-none outline-none bg-gray-100 rounded-sm px-3 flex-2"
                v-model="styleState.style_icon">

            <div style="width:600px;background-color: black;line-height:24px;" class="ml-4 flex flex-wrap">
                <HuluIcon @click="onMyIcon(ic)" fontSize="24px" :name="ic" v-for="(ic, index) in MyIcons" :key="index"
                    class="m-3 cursor-pointer" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { icons } from './icon'
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
const process = ref({})
const MyIcons = ref(icons)

const onMyIcon = (icon) => {
    process.value.icon = icon
    styleState.value.style_icon = icon
}
const styleState = ref({
    style_color: "",
    style_height: "",
    style_width: "",
    icon: "",
})

watch(() => props.attrs, (newVal, oldVal) => {
    process.value = newVal.process;
    styleState.value.style_height = process.value.style_height;
    styleState.value.style_width = process.value.style_width;
    styleState.value.style_color = process.value.style_color;
    styleState.value.style_icon = process.value.icon;
}, {
    deep: true,
    immediate: true
})
watch(()=>styleState.value,(newVal,oldVal)=>{
    emit("updateSubmitState", newVal)
},{
    deep:true
})
// 定义一组颜色
const colors = ref([
    '#EE0000', '#FF8C00', '#FFD700', '#e84393',
    '#00CD00', '#0000CD', '#8B008B', '#808080', '#008B8B', '#006400'])

const setColor = (color) => {
    process.value.style_color = color
    styleState.value.style_color = color
}
</script>

<style></style>