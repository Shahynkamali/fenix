<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    enter-class="translate-x-full"
    enter-to-class="translate-x-0"
  >
    <div
      v-if="isSlideOverActive"
      class="slide-over"
    >
      <section class="slide-over__container">
        <div class="slide-over__wrapper">
          <header class="slide-over__heading-container">
            <span class="inline-flex rounded-md shadow-sm">
              <AppButton
                type="AppButton"
                class="slide-over__button"
                @click="toggleSlideOver"
              >
                Close
              </AppButton>
            </span>
          </header>
          <div class="slide-over__content">
            <ProfileCard
              :data="data"
            />
          </div>
        </div>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Gnome from '@/models/Gnome';
import AppButton from '~/AppButton/AppButton.vue';
import ProfileCard from '~/ProfileCard/ProfileCard.vue';

@Component({
  name: 'SlideOver',
  components: {
    AppButton,
    ProfileCard,
  },
})
export default class SlideOver extends Vue {
  @Prop({ required: false })
  readonly isSlideOverActive!: boolean;

  @Prop({ required: true })
    readonly data!: Gnome;

  toggleSlideOver() {
    this.$emit('toggleSlideOver');
  }
}

</script>

<style scoped>
.slide-over {
  @apply inset-0 overflow-hidden absolute;
}

.screenWidth {
  max-width: 1100px;
  width: 100%;
}

.slide-over__container {
  @apply w-screen h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl fixed z-10 overflow-y-scroll;
}

.slide-over__wrapper {
  @apply flex-1 py-6 px-10;
}

.slide-over__heading-container {
  @apply px-4 sm:px-6 flex items-center justify-center space-x-3;
}

.slide-over__heading {
  @apply text-lg leading-7 font-medium text-gray-900 text-center;
}

.slide-over__content {
  @apply w-11/12 flex flex-col;
}

.slide-over__actions {
  @apply flex-shrink-0 px-4 py-4 space-x-4 flex justify-end;
}

.slide-over__button {
  @apply py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700;
}

.slide-over__button:focus {
  @apply bg-gray-50 text-gray-800 shadow-outline-blue border-blue-300 outline-none;
}

.slide-over__button:hover {
  @apply text-gray-500;
}

</style>
