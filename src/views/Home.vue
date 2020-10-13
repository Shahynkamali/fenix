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
          <AppSelect
            v-model="selectedAgeSort"
            :label="'ageSortOptions'"
            :options="SORTBYAGE"
            :value="SORTBYAGE.ASCENDING"
          />
          <AppSelect
            v-model="selectedHairColor"
            :label="'hairColorSortOptions'"
            :options="HAIRCOLORS"
            :value="HAIRCOLORS.ALL"
          />
          <AppSelect
            v-model="selectedProfession"
            :label="'professionOptions'"
            :options="collectionOfProfessions"
            :value="collectionOfProfessions[0]"
          />
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import CharacterService, { HAIRCOLORS } from '@/models/CharacterService';
import { SORTBYAGE } from '@/helpers';
import Gnome from '@/models/Gnome';
import GridWrapper from '~/GridWrapper/GridWrapper.vue';
import AppCard from '~/AppCard/AppCard.vue';
import SlideOver from '~/SlideOver/SlideOver.vue';
import AppToolbar from '~/AppToolbar/AppToolbar.vue';
import AppSelect from '~/AppSelect/AppSelect.vue';

@Component({
  name: 'Home',
  components: {
    GridWrapper,
    AppCard,
    SlideOver,
    AppToolbar,
    AppSelect,
  },
})

export default class Home extends Vue {
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

  private characters: Gnome[] = [];

  gnomesToDisplay: Gnome[] = [];

  get collectionOfProfessions(): string[] {
    const listOfProfessions = Gnome.collectionOfAllProfessions(this.characters);
    listOfProfessions.unshift('All Professions');
    return listOfProfessions;
  }

  isSlideOverActive = false;

  isLoading = false;

  HAIRCOLORS = HAIRCOLORS;

  SORTBYAGE = SORTBYAGE;

  selectedHairColor = HAIRCOLORS.ALL;

  selectedAgeSort = SORTBYAGE.ASCENDING;

  selectedProfession = this.collectionOfProfessions[0];

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
.home {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
