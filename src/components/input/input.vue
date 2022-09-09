<template>
  <input
    v-model="value"
    class="yl-input"
    @change="handleChange"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { formItemContextKey } from '../form/src/form-item';
  import { inputProps, inputEmits } from './input';

  const formItemContext = inject(formItemContextKey);
  const emit = defineEmits(inputEmits);
  // const props = defineProps(inputProps)
  const value = ref('');
  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
    emit('input', target.value, e);
    formItemContext?.validate('change');
  };

  const handleBlur = (e: FocusEvent) => {
    emit('blur', e);
    formItemContext?.validate('blur');
  };
</script>
