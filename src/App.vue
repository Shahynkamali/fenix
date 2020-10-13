<template>
  <div class="app ">
    <SlideOver
      :is-slide-over-active="isSlideOverActive"
      :data="gnomesToDisplay"
      @toggleSlideOver="toggleSlideOver"
    />
    <AppToolbar
      class="app__toolbar"
      :custom-styles="'bg-cool-gray-50 w-10/12 mx-auto my-0'"
    >
      <template #toolBarContent>
        <AppInput
          :id="'input'"
          v-model="searchInput"
          class="app__toolbar-item"
          :value="searchInput"
          :label="'Search For Character'"
          aria-placeholder="Filter By Name"
          placeholder="filter by name"
        />
        <AppSelect
          v-model="selectedAgeSort"
          class="app__toolbar-item"
          :label="'ageSortOptions'"
          :options="SORTBYAGE"
          :value="SORTBYAGE.ASCENDING"
        />
        <AppSelect
          v-model="selectedHairColor"
          class="app__toolbar-item"
          :label="'hairColorSortOptions'"
          :options="HAIRCOLORS"
          :value="HAIRCOLORS.ALL"
        />
        <AppSelect
          v-model="selectedProfession"
          class="app__toolbar-item"
          :label="'professionOptions'"
          :options="collectionOfProfessions"
          :value="collectionOfProfessions[0]"
        />
      </template>
    </AppToolbar>
    <div class="vld-parent">
      <Loading
        :active.sync="isLoading"
        :is-full-page="true"
        :lock-scroll="true"
        :enforce-focus="true"
        :can-cancel="false"
      />
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import CharacterService, { HAIRCOLORS } from '@/models/CharacterService';
import { SORTBYAGE } from '@/helpers';
import Gnome from '@/models/Gnome';
import GridWrapper from '~/GridWrapper/GridWrapper.vue';
import SlideOver from '~/SlideOver/SlideOver.vue';
import AppCard from '~/AppCard/AppCard.vue';
import AppToolbar from '~/AppToolbar/AppToolbar.vue';
import AppSelect from '~/AppSelect/AppSelect.vue';
import AppInput from '~/AppInput/AppInput.vue';

@Component({
  name: 'App',
  components: {
    GridWrapper,
    SlideOver,
    AppCard,
    AppToolbar,
    AppSelect,
    AppInput,
  },
})

export default class App extends Vue {
  @Watch('selectedHairColor')
  async watchHairColorChange(haircolor: HAIRCOLORS) {
    this.clearCollection(this.characters);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByHairColor = Gnome.sortGnomesByHairColor(freshGnomes, haircolor);
    const gnomesFilteredByAgeAndHairColor = Gnome.sortGnomesByAge(gnomesFilteredByHairColor, this.selectedAgeSort);
    this.characters = gnomesFilteredByAgeAndHairColor;
  }

  @Watch('selectedAgeSort')
  async watchSortChange(sortBy: SORTBYAGE) {
    this.clearCollection(this.characters);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByHairColor = Gnome.sortGnomesByHairColor(freshGnomes, this.selectedHairColor);
    this.characters = Gnome.sortGnomesByAge(gnomesFilteredByHairColor, sortBy);
  }

  @Watch('selectedProfession')
  async watchProfessionChange(profession: string) {
    this.clearCollection(this.characters);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByAge = Gnome.sortGnomesByAge(freshGnomes, this.selectedAgeSort);
    const gnomesFilteredByProfession = Gnome.sortGnomesByProfession(gnomesFilteredByAge, profession);
    const gnomesFilteredByHairColorAndProfession = Gnome.sortGnomesByHairColor(gnomesFilteredByProfession, this.selectedHairColor);
    this.characters = gnomesFilteredByHairColorAndProfession;
  }

  @Watch('searchInput')
  async watchInputChange(searchText: string) {
    this.clearCollection(this.characters);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByAge = Gnome.sortGnomesByAge(freshGnomes, this.selectedAgeSort);
    const gnomesFilteredByProfession = Gnome.sortGnomesByProfession(gnomesFilteredByAge, this.selectedProfession);
    const gnomesFilteredByHairColorAndProfession = Gnome.sortGnomesByHairColor(gnomesFilteredByProfession, this.selectedHairColor);
    this.characters = Gnome.sortGnomesByName(gnomesFilteredByHairColorAndProfession, searchText);
  }

  private characters: Gnome[] = [];

  gnomesToDisplay: Gnome[] = [];

  searchInput = '';

  isSlideOverActive = false;

  isLoading = false;

  HAIRCOLORS = HAIRCOLORS;

  SORTBYAGE = SORTBYAGE;

  selectedHairColor = HAIRCOLORS.ALL;

  selectedAgeSort = SORTBYAGE.ASCENDING;

  selectedProfession = this.collectionOfProfessions[0];

  get collectionOfProfessions(): string[] {
    const listOfProfessions = Gnome.collectionOfAllProfessions(this.characters);
    listOfProfessions.unshift('All Professions');
    return listOfProfessions;
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

  clearCollection(collection: Gnome[]): void {
    this.isLoading = true;
    collection.splice(0, collection.length);
    this.isLoading = false;
  }

  async mounted(): Promise<void> {
    this.isLoading = true;
    const response = await CharacterService.getCharacters();
    this.characters = Gnome.sortGnomesByAge(response, SORTBYAGE.ASCENDING);
    if (this.characters.length) {
      this.isLoading = false;
    }
  }
}

</script>

<style scoped>
.app {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.app__toolbar {
  @apply my-4 w-full bg-white;
}

.app__toolbar-content {
  @apply w-full flex justify-between;
}

.app__toolbar-item {
  @apply px-2 xs:w-full;
}

</style>
