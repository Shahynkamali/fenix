<template>
  <div class="home">
    <SlideOver
      :is-slide-over-active="isSlideOverActive"
      :data="gnomesToDisplay"
      @toggleSlideOver="toggleSlideOver"
    />
    <div class="w-full">
      <AppToolbar>
        <template #toolBarContent>
          <div @click="sortGnomesByAge">
            <span>sort by age</span>
          </div>
          <div>
            <label
              for="location"
              class="block text-sm leading-5 font-medium text-gray-700 sr-only"
            >
              Location
            </label>
            <select
              id="location"
              class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none
              focus:shadow-outline-blue
              focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              <option
                v-for="(color, index) in HAIRCOLORS"
                :key="index"
                @click="sortByHairColor(color)"
              >
                {{ color }}
              </option>
            </select>
          </div>
        </template>
      </AppToolbar>
    </div>
    <div v-if="characters.length">
      <GridWrapper>
        <template>
          <div
            v-for="(character, index) in characters"
            :key="index"
          >
            <AppCard
              :data="character"
              @toggleSlideOver="toggleSlideOver"
              @findFriends="findFriends"
              @displayDetails="displayDetails"
            />
          </div>
        </template>
      </GridWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CharacterService, { HAIRCOLORS } from '@/models/CharacterService';
import Gnome from '@/models/Gnome';
import GridWrapper from '~/GridWrapper/GridWrapper.vue';
import AppCard from '~/AppCard/AppCard.vue';
import SlideOver from '~/SlideOver/SlideOver.vue';
import AppToolbar from '~/AppToolbar/AppToolbar.vue';

@Component({
  name: 'Home',
  components: {
    GridWrapper,
    AppCard,
    SlideOver,
    AppToolbar,

  },
})
export default class Home extends Vue {
  private characters: Gnome[] = [];

  gnomesToDisplay: Gnome[] = [];

  isSlideOverActive = false;

  HAIRCOLORS = HAIRCOLORS;


  toggleSlideOver() {
    this.gnomesToDisplay.splice(0, this.gnomesToDisplay.length);
    this.isSlideOverActive = !this.isSlideOverActive;
  }

  findFriends(payload: string[]): void {
    this.isSlideOverActive = true;
    this.gnomesToDisplay = Gnome.findGnomes(payload, this.characters);
  }

  displayDetails(payload: Gnome): void {
    this.isSlideOverActive = true;
    this.gnomesToDisplay.push(payload);
  }

  sortGnomesByAge() {
    this.characters = Gnome.sortGnomesByAge(this.characters);
  }

  sortByHairColor(color: string) {
    console.log(color);
  }

  async mounted(): Promise<void> {
    const response: Gnome[] = await CharacterService.getCharacters();
    this.characters = response;
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
