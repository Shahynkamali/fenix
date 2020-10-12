<template>
  <div
    class="grid-wrappper"
    :class="[
      gridStyles,
      {'grid-wrappper--IE': isBrowserIE }
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.css';

@Component({
  name: 'GridWrapper',
})
export default class GridWrapper extends Vue {
  @Prop({ required: false, default: 3 })
  readonly column!: number;

  @Prop({ required: false, default: 3 })
  readonly gap!: number;

  get isBrowserIE() {
    return this.$browserDetect ? this.$browserDetect.isIE : false;
  }

  get gridStyles() {
    const smallGrid = Math.round(this.column) - 1;
    const largeGrid = Math.round(this.column) + 1;
    const extraLargeGrid = Math.round(this.column) + 2;
    const smallGap = Math.round(this.gap - 1);
    const largeGap = Math.round(this.gap + 1);
    return `
      sm:grid-cols-${smallGrid.toString()}
      md:grid-cols-${Math.round(this.column).toString()}
      lg:grid-cols-${largeGrid.toString()}
      xl:grid-cols-${extraLargeGrid.toString()}
      gap-${this.gap.toString()}
      sm:gap-${smallGap.toString()}
      md:gap-${this.gap.toString()}
      lg:gap-${largeGap.toString()}
      xl:gap-${largeGap.toString()}
    `;
  }
}
</script>
