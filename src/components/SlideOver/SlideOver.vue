<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    enter-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    leave-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="isSlideOverActive"
      class="slide-over"
    >
      <section class="slide-over__container">
        <div class="w-screen">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl fixed w-full z-10">
            <div class="h-0 flex-1 py-6 space-y-6 overflow-y-scroll">
              <header class="px-4 sm:px-6">
                <div class="flex items-start justify-evenly space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-gray-900 text-center">
                    Profiles
                  </h2>
                </div>
              </header>
              <div
                v-for="(profile, index) in data"
                :key="index"
                class="relative flex-1 px-4 sm:px-6 my-0 mx-auto screenWidth"
              >
                <div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                  <!-- Image -->
                  <div class="relative pb-2/3 sm:pt-2/3">
                    <AppImage
                      :src="profile.thumbnail"
                      width="200px"
                      height="200px"
                      :custom-styles="'inset-0 object-cover h-full w-full shadow-lg rounded-lg'"
                    />
                  </div>

                  <div class="sm:col-span-2">
                    <div class="space-y-4">
                      <div class="text-lg leading-6 font-medium space-y-1">
                        <h4>Leslie Alexander</h4>
                        <p class="text-indigo-600">
                          Co-Founder / CEO
                        </p>
                      </div>
                      <div class="text-lg leading-7">
                        <p class="text-gray-500">
                          Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget
                          turpis urna maecenas cras. Nisl dictum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                <span class="inline-flex rounded-md shadow-sm">
                  <AppButton
                    type="AppButton"
                    class="py-2 px-4 border border-gray-300 rounded-md
                  text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300
                  focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    @click="toggleSlideOver"
                  >
                    Close
                  </AppButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Character } from '@/models/CharacterService';
import AppButton from '~/AppButton/AppButton.vue';
import AppCard from '~/AppCard/AppCard.vue';
import AppImage from '~/AppImage/AppImage.vue';


@Component({
  name: 'SlideOver',
  components: {
    AppButton,
    AppCard,
    AppImage,
  },
})
export default class SlideOver extends Vue {
  @Prop({ required: false })
  readonly isSlideOverActive!: boolean;

  @Prop({ required: true })
    readonly data!: Character[];

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

</style>
