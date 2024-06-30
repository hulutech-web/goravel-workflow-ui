<template>
    <div>
        <div class="flex justify-start items-center mt-3">
            <div class="flex-4" style="width:80px;">尺寸</div>
            <div class="flex-8 flex">
                <a-space>
                    <a-input></a-input>
                    X
                    <a-input></a-input>
                </a-space>
            </div>
        </div>
        <div class="flex mt-3">
            <div class="flex-4" style="width:80px;">字体颜色</div>
            <input type="text" 
                class="w-24 h-8 border-none outline-none bg-gray-100 rounded-sm px-3 mx-3" v-model="color">
                <div v-for="(c, ind) in colors" :key="ind" :style="{ background: `${c}` }" 
                class="h-8 w-8 cursor-pointer"
                @click="color = c"
                ></div>

        </div>
        <div class="flex mt-3">
            <div style="width:80px;">图标</div>

            <input type="text" 
                class="h-8 border-none outline-none bg-gray-100 rounded-sm px-3 flex-2" v-model:="ic">

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
        default: () => { }
    }
})
const process = ref({})
const MyIcons = ref(icons)
const ic = ref("")
const onMyIcon = (icon) => {
    ic.value = icon
}
const color = ref("")

// 定义一组颜色
const colors = ref([
    '#EE0000', '#FF8C00', '#FFD700', '#e84393',
    '#00CD00', '#0000CD', '#8B008B', '#808080', '#008B8B', '#006400'])
</script>

<style></style>