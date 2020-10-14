import { mount } from '@vue/test-utils';
import { SORTBYAGE } from '@/helpers';
import AppSelect from './AppSelect.vue';

describe('AppSelect', () => {
  const factory = (propsData?: any) => mount(AppSelect, {
    propsData: {
      ...propsData,
    },
  });

  it('should display the selected option', async () => {
    const optionsProp = {
      options: SORTBYAGE,
    };
    const wrapper = factory(optionsProp);
    const options = wrapper.find('select').findAll('option');
    await options.at(1).setSelected();
    expect(wrapper.find('option').element.innerHTML.trim()).toBe(SORTBYAGE.ASCENDING.trim());
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should accept a array of strings as a prop and set that as options', () => {
    const optionsProp = {
      options: SORTBYAGE,
    };
    const wrapper = factory(optionsProp);
    expect(wrapper.vm.$props.options).toBe(SORTBYAGE);
    expect(wrapper.element).toMatchSnapshot();
  });
});
