<template>
  <div class="image">
    <div
      v-if="dataUrl"
      :style="background ? background : null "
      class="image__placeholder"
    >
      <img
        :src="placeholder || dataUrl"
        v-bind="$attrs"
      >
    </div>
    <img
      v-if="src"
      :src="dataUrl"
      :alt="$attrs.alt || 'image'"
      v-bind="$attrs"
      class="image__img"
      :class="customStyles"
    >
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.css';

@Component({
  name: 'AppImage',
  inheritAttrs: false,
})
export default class AppImage extends Vue {
  @Prop({ required: false })
  readonly src!: string;

  @Prop({ required: false })
  readonly background!: string;

  @Prop({ required: false })
  readonly placeholder!: string;

  @Prop({ required: false })
  readonly customStyles!: string;

  isToolTipVisible = false;

  toggleToolTip() {
    this.isToolTipVisible = !this.isToolTipVisible;
  }

  get dataUrl() {
    const { width, height } = this.$attrs;

    if (!width || !height) {
      return '';
    }

    const canvasWidth = 100;
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = (Number(height) / Number(width)) * canvasWidth;

    return canvas.toDataURL();
  }

  mounted() {
    const { src, srcset, $el } = this as any;
    let timeOut: any;

    const observer = new IntersectionObserver(([entry]) => {
      const img = $el.querySelector('.image__img') as any;
      const placeholder = $el.querySelector('.image__placeholder');

      if (img) {
        // eslint-disable-next-line func-names
        img.onload = function () {
          delete img.onload;
          $el.classList.add('image--loaded');
          if (placeholder) {
            timeOut = setTimeout(() => {
              placeholder.remove();
            }, 300);
          }
        };
      }

      if (entry.isIntersecting && img) {
        if (srcset) {
          img.srcset = srcset;
        }
        img.src = src;
        observer.disconnect();
      }
    });
    observer.observe($el);

    this.$once('hook:beforeDestroy', () => {
      observer.disconnect();
      if (timeOut) {
        clearTimeout(timeOut);
      }
    });
  }
}
</script>
