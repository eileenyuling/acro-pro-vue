<template>
  <div class="form-item">
    <label>
      <slot name="label">{{ label }}</slot>
    </label>
    <div>
      <slot></slot>
      <div>{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject, provide, ref, onMounted } from 'vue';
  import AsyncValidator from 'async-validator';
  import type { Values } from 'async-validator';
  import { formContextKey } from './form';
  import {
    FormItemContext,
    FormItemRule,
    formItemContextKey,
    FormItemValidateState,
    formItemProps,
    Arrayable,
  } from './form-item';

  defineOptions({
    name: 'form-item',
  });
  const props = defineProps(formItemProps);
  const formContext = inject(formContextKey);
  const convertArray = (
    rules: Arrayable<FormItemRule> | undefined
  ): FormItemRule[] => {
    return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
  };
  const _rules = computed(() => {
    const rules: FormItemRule[] = convertArray(props.rules);
    const formRules = formContext?.rules;
    if (formRules && props.prop) {
      const _temp = convertArray(formRules[props.prop]);
      rules.push(..._temp);
    }
    return rules;
  });
  const getRuleFiltered = (trigger: string) => {
    const rules = _rules.value;
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) {
        return true;
      }
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.includes(trigger);
      }
      return rule.trigger === trigger;
    });
  };
  // const validateState = ref<FormItemValidateState>('')
  const validateMessage = ref('');
  const validate: FormItemContext['validate'] = async (trigger, callback?) => {
    const rules = getRuleFiltered(trigger);
    const modelName: string = props.prop!;
    const validator = new AsyncValidator({
      [modelName]: rules,
    });
    const model = formContext?.model || '';
    return validator
      .validate({
        [modelName]: model[modelName],
      })
      .then(() => {
        validateMessage.value = '';
        callback?.();
      })
      .catch((err: Values) => {
        const { errors } = err;
        validateMessage.value = errors[0].message;
        return Promise.reject(err);
      });
  };

  const context: FormItemContext = {
    ...props,
    validate,
  };

  provide(formItemContextKey, context);

  onMounted(() => {
    formContext?.addField(context);
  });
</script>
