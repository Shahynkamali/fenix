<template>
  <nav
    class="toolbar"
  >
    <div
      class="toolbar__container"
      :class="customStyles"
    >
      <div
        class="toolbar__button-container"
      >
        <button
          class="toolbar__button"
          aria-label="Toolbar menu"
          aria-expanded="false"
          @click="toggleToolBarButton"
        >
          <HamburgerSVG
            v-if="!isToolBarOpen"
            aria-label="Toolbar menu open"
            class="toolbar__icon"
          />
          <CloseSVG
            v-else
            aria-label="Toolbar menu close"
            class="toolbar__icon"
          />
        </button>
      </div>
      <div class="toolbar__content toolbar__content--horizontal">
        <slot name="toolBarContent" />
      </div>
    </div>
    <transition name="slide">
      <div
        v-show="isToolBarOpen"
        class="toolbar__content toolbar__content--vertical"
      >
        <slot name="toolBarContent" />
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import CloseSVG from '@/assets/svgs/close.svg';
import HamburgerSVG from '@/assets/svgs/hamburger.svg';
import './style.css';

@Component({
  name: 'AppToolbar',
  components: {
    CloseSVG,
    HamburgerSVG,
  },
})
export default class AppToolbar extends Vue {
  @Prop({ required: false })
    readonly customStyles!: string;

  @Watch('viewPortWidth')
  watchViewPortChange(viewPortWidth: number) {
    if (viewPortWidth <= 539 && this.isToolBarOpen) {
      this.isToolBarOpen = false;
    }
  }

  viewPortWidth = 0;

  isToolBarOpen = false;

  private toggleToolBarButton(): void {
    this.isToolBarOpen = !this.isToolBarOpen;
  }

  private handleResize(): void {
    this.viewPortWidth = window.innerWidth;
  }

  created(): void {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed(): void {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
