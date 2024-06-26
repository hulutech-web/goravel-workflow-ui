<template>
    <div>
        <a-form :model="formState">
            <div v-for="(field, index) in formFields" :key="index">
                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'text'">
                    <a-input v-model:value="formState[field.field]" />
                </a-form-item>
                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'select'">
                    <a-select v-model:value="formState[field.field]">
                        <a-select-option value="field_default_value">{{ field['field_default_value']
                            }}</a-select-option>

                        <a-select-option :value="item" v-for="(item, ind) in field['field_value'].split('\r\n')"
                            :key="ind">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'textarea'">
                    <a-textarea v-model:value="formState[field.field]" />
                </a-form-item>
                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'date'">
                    <a-date-picker v-model:value="formState[field.field]" />
                </a-form-item>
                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'radio'">
                    <a-radio-group v-model:value="formState[field.field]">
                        <a-radio :value="item" v-for="(item, ind) in field['field_value'].split('\r\n')" :key="ind">
                            {{ item }}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'checkbox'">

                    <a-checkbox-group v-model:value="formState[field.field]">
                        <a-checkbox :value="item" v-for="(item, ind) in field['field_value'].split('\r\n')" :key="ind">
                            {{ item }}
                        </a-checkbox>
                    </a-checkbox-group>

                </a-form-item>

                <a-form-item :label="field.field_name" :key="field.name" v-if="field['field_type'] == 'file'">
                    <a-upload v-model:file-list="formState[field.field]" name="file" :multiple="true"
                        action="/upload.do" :headers="{
                            authorization: 'authorization-text',
                        }">
                        <a-button>
                            <upload-outlined></upload-outlined>
                            Click to Upload
                        </a-button>
                    </a-upload>
                </a-form-item>
            </div>

        </a-form>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps({
    fields: {
        type: Array,
        default: []
    }
})

const formFields = ref(props.fields)
const formState = ref({

})
const initFormState = () => {
    const state = {}
    props.fields.forEach(field => {
        state[field.name] = field.field_default_value ?? ""
    })
    formState.value = state
}
watch(() => props.fields, (newVal) => {
    formFields.value = newVal
    initFormState()
}, {
    immediate: true,
    deep: true
})

const emit = defineEmits(["submit"])
const submit = () => {
    emit("submit", formState.value)
}



</script>

<style></style>