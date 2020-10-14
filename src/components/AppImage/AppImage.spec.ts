import { mount } from '@vue/test-utils';
import setupIntersectionObserverMock from '@/tests/__mocks__/intersection';
import AppImage from './AppImage.vue';

describe('AppImage', () => {
  const factory = (propsData?: any) => mount(AppImage, {
    propsData: {
      ...propsData,
    },
  });

  beforeEach(() => {
    setupIntersectionObserverMock();
  });

  it('should render a image', () => {
    const srcProp = {
      src: 'https://picsum.photos/200',
    };
    const wrapper = factory(srcProp);
    expect(wrapper.vm.$props.src).toBe(srcProp.src);
    expect(wrapper.find('.image__img')).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render a placeholder component', () => {
    const srcProp = {
      src: 'https://picsum.photos/200',
      placeholder: 'https://picsum.photos/200/?blur',
    };
    const wrapper = factory(srcProp);
    expect(wrapper.find('.image__placeholder')).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
