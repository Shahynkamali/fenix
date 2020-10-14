import { shallowMount, mount } from '@vue/test-utils';
import AppButton from './AppButton.vue';

describe('AppButton', () => {
  it('it should render the prop text', () => {
    const text = 'App';
    const wrapper = shallowMount(AppButton, {
      propsData: { text },
    });
    expect(wrapper.text()).toMatch(text);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should disable the button', () => {
    const disabled = true;
    const wrapper = mount(AppButton, {
      propsData: {
        disabled,
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Raises click event when clicked', () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(AppButton, {
      listeners: {
        click: onClick,
      },
    });
    wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
});
