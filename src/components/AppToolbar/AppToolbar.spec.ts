import { mount } from '@vue/test-utils';
import UserSVG from '@/assets/svgs/users.svg';
import InformationCircleSVG from '@/assets/svgs/information-circle.svg';
import CloseSVG from '@/assets/svgs/close.svg';
import HamburgerSVG from '@/assets/svgs/hamburger.svg';
import AppToolbar from './AppToolbar.vue';

describe('AppToolbar', () => {
  const factory = (slotsProp?: any, propsData?: any) => mount(AppToolbar, {
    propsData: {
      ...propsData,
    },
    slots: {
      ...slotsProp,
    },
    stubs: {
      UserSVG,
      InformationCircleSVG,
      CloseSVG,
      HamburgerSVG,
    },
  });
  it('should render the template injected in the slot', () => {
    const slotToolBarContent = {
      toolBarContent: `
        <div class="stub-svg-container">
          <UserSVG/>
        </div>
        <div class="stub-svg-container">
          <InformationCircleSVG/>
        </div>
      `,
    };
    const wrapper = factory(slotToolBarContent);
    expect(wrapper.findAll('.stub-svg-container').length).toBe(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the state of isToolBarOpen to true on the click of the button', () => {
    global.innerWidth = 330;
    global.dispatchEvent(new Event('resize'));
    const wrapper = factory();
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.$data.isToolBarOpen).toBeTruthy();
    expect(wrapper.findComponent(HamburgerSVG).exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
