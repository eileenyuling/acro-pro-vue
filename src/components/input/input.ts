import { ExtractPropTypes } from 'vue';

export const inputProps = {
  modelValue: String,
  defaultValue: {
    type: String,
    default: '',
  },
  placeholder: String,
};

export const inputEmits = {
  'input': (value: string, ev: Event) => true,
  'change': (value: string, ev: Event) => true,
  'update:modelValue': (value: string) => true,
  'pressEnter': (ev: KeyboardEvent) => true,
  'clear': (ev: MouseEvent) => true,
  'focus': (ev: FocusEvent) => true,
  'blur': (ev: FocusEvent) => true,
};
export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>;
export type InputEmits = Partial<typeof inputEmits>;
