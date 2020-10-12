<template>
  <div class="vld-parent home">
    <Loading
      :active.sync="isLoading"
      :is-full-page="true"
      :lock-scroll="true"
      :enforce-focus="true"
      :can-cancel="false"
    />
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
              v-model="selectedHairColor"
              class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none
              focus:shadow-outline-blue
              focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              <option
                v-for="(color, index) in HAIRCOLORS"
                :key="index"
                :value="color"
              >
                {{ color }}
              </option>
            </select>
          </div>
        </template>
      </AppToolbar>
    </div>
    <div v-if="characters.length && !isLoading">
      <GridWrapper>
        <template>
          <div
            v-for="(character, index) in renderGnomes"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
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
  @Watch('selectedHairColor')
  watchHairColorChange(haircolor: HAIRCOLORS) {
    this.clearCollection(this.gnomesFilteredByHairColor);
    this.gnomesFilteredByHairColor = Gnome.sortGnomesByHairColor(this.characters, haircolor);
  }

  private characters: Gnome[] = [];

  gnomesToDisplay: Gnome[] = [];

  gnomesFilteredByHairColor: Gnome[] = [];

  isSlideOverActive = false;

  HAIRCOLORS = HAIRCOLORS;

  selectedHairColor = HAIRCOLORS.ALL;

  isLoading = true;

  get renderGnomes() {
    return this.gnomesFilteredByHairColor.length ? this.gnomesFilteredByHairColor : this.characters;
  }


  toggleSlideOver() {
    this.clearCollection(this.gnomesToDisplay);
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

  async sortGnomesByAge() {
    this.clearCollection(this.characters);
    this.isLoading = true;
    const foo = await CharacterService.getCharacters();
    this.characters = Gnome.sortGnomesByAge(foo);
    this.isLoading = false;
    // this.characters = Gnome.sortGnomesByAge(this.renderGnomes);
  }

  clearCollection(collection: Gnome[]): void {
    collection.splice(0, collection.length);
  }

  async mounted(): Promise<void> {
    this.isLoading = true;
    this.characters = await CharacterService.getCharacters();
    if (this.characters.length) {
      this.isLoading = false;
    }
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
