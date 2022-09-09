<template>
  <form>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
  import { Values } from 'async-validator';
  import { provide } from 'vue';
  import { FormContext, formContextKey, formProps } from './form';
  import { FormItemContext } from './form-item';

  defineOptions({
    name: 'form',
  });
  const fields: FormItemContext[] = [];
  const addField: FormContext['addField'] = (field: FormItemContext) => {
    fields.push(field);
  };
  const props = defineProps(formProps);

  const validate = async (
    callback?: (valid: boolean, fields?: Values) => void
  ) => {
    let errors: Values = {};
    for (const field of fields) {
      try {
        await field.validate('');
      } catch (error) {
        errors = {
          ...errors,
          ...(error as Values).fields,
        };
      }
    }
    const errorsLength = Object.keys(errors).length;
    if (errorsLength === 0) {
      callback?.(true);
      return Promise.resolve();
    }
    callback?.(false, errors);
    return Promise.reject(errors);
  };

  const context = {
    ...props,
    addField,
  };
  provide(formContextKey, context);
  defineExpose({
    validate,
  });
</script>
