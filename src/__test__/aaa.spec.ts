import { mount } from '@vue/test-utils';
import Input from '../components/input/input.vue';

describe('test Input components', () => {
  test('renders a todo', async () => {
    const wrapper = mount(Input);
    expect(wrapper.attributes('class')).toBe('yl-input');
    wrapper.vm.$emit('input', 'aaaa');
    expect(wrapper.emitted()).toHaveProperty('input');

    wrapper.vm.$emit('input1', 'aaaa');
    expect(wrapper.emitted()).toHaveProperty('input1');
  });
});
