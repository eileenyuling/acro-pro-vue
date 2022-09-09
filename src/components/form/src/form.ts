import { PropType, ExtractPropTypes, InjectionKey } from 'vue';
import { FormItemRule, Arrayable, FormItemContext } from './form-item';

export const formProps = {
  model: Object as PropType<any>,
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>,
    default: [],
  },
} as const;
export type FormProps = Partial<ExtractPropTypes<typeof formProps>>;

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
}
export const formContextKey: InjectionKey<FormContext> = Symbol();
