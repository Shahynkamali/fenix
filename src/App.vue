<template>
  <div class="app">
    <SlideOver
      v-model="activeGnome"
      :is-slide-over-active="isSlideOverActive"
      :data="activeGnome"
      @toggleSlideOver="toggleSlideOver"
    />
    <AppToolbar
      v-if="!isSlideOverActive"
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
    <div
      v-if="!isSlideOverActive"
      class="vld-parent"
    >
      <Loading
        :active.sync="isLoading"
        :is-full-page="true"
        :lock-scroll="true"
        :enforce-focus="true"
        :can-cancel="false"
      />
      <AppCTA :message="renderCTAMessage" />
      <GridWrapper v-if="hasCharacters && promiseWasResolved">
        <template>
          <div
            v-for="(character, index) in collection"
            :key="index"
          >
            <AppCard
              :data="character"
              @toggleSlideOver="toggleSlideOver"
            >
              <template #cardActions>
                <div
                  class="card__actions cursor-pointer"
                  @click="handleDetails(character)"
                >
                  <div class="card__button-container card__button-container-right">
                    <AppButton class="card__button card__button--right">
                      <template>
                        <InformationCircleSVG class="card__icon" />
                        <span class="card__button-content">Details</span>
                      </template>
                    </AppButton>
                  </div>
                </div>
              </template>
            </AppCard>
          </div>
        </template>
      </GridWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CharacterService from '@/models/CharacterService';
import { SORTBYAGE, HAIRCOLORS } from '@/helpers';
import Gnome from '@/models/Gnome';
import InformationCircleSVG from '@/assets/svgs/information-circle.svg';
import LoadingSVG from '@/assets/svgs/loading.svg';
import GridWrapper from '~/GridWrapper/GridWrapper.vue';
import SlideOver from '~/SlideOver/SlideOver.vue';
import AppCard from '~/AppCard/AppCard.vue';
import AppToolbar from '~/AppToolbar/AppToolbar.vue';
import AppSelect from '~/AppSelect/AppSelect.vue';
import AppInput from '~/AppInput/AppInput.vue';
import AppButton from '~/AppButton/AppButton.vue';
import AppCTA from '~/AppCTA/AppCTA.vue';

@Component({
  name: 'App',
  components: {
    GridWrapper,
    SlideOver,
    AppCard,
    AppToolbar,
    AppSelect,
    AppInput,
    InformationCircleSVG,
    AppButton,
    LoadingSVG,
    AppCTA,
  },
})

export default class App extends Vue {
  @Watch('selectedHairColor')
  async watchHairColorChange(haircolor: HAIRCOLORS) {
    this.clearCollection(this.collection);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByHairColor = Gnome.sortGnomesByHairColor(freshGnomes, haircolor);
    const gnomesFilteredByAgeAndHairColor = Gnome.sortGnomesByAge(gnomesFilteredByHairColor, this.selectedAgeSort);
    this.collection = gnomesFilteredByAgeAndHairColor;
  }

  @Watch('selectedAgeSort')
  async watchSortChange(sortBy: SORTBYAGE) {
    this.clearCollection(this.collection);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByHairColor = Gnome.sortGnomesByHairColor(freshGnomes, this.selectedHairColor);
    this.collection = Gnome.sortGnomesByAge(gnomesFilteredByHairColor, sortBy);
  }

  @Watch('selectedProfession')
  async watchProfessionChange(profession: string) {
    this.clearCollection(this.collection);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByAge = Gnome.sortGnomesByAge(freshGnomes, this.selectedAgeSort);
    const gnomesFilteredByProfession = Gnome.sortGnomesByProfession(gnomesFilteredByAge, profession);
    const gnomesFilteredByHairColorAndProfession = Gnome.sortGnomesByHairColor(gnomesFilteredByProfession, this.selectedHairColor);
    this.collection = gnomesFilteredByHairColorAndProfession;
  }

  @Watch('searchInput')
  async watchInputChange(searchText: string) {
    this.clearCollection(this.collection);
    const freshGnomes = await CharacterService.getCharacters();
    const gnomesFilteredByAge = Gnome.sortGnomesByAge(freshGnomes, this.selectedAgeSort);
    const gnomesFilteredByProfession = Gnome.sortGnomesByProfession(gnomesFilteredByAge, this.selectedProfession);
    const gnomesFilteredByHairColorAndProfession = Gnome.sortGnomesByHairColor(gnomesFilteredByProfession, this.selectedHairColor);
    this.collection = Gnome.sortGnomesByName(gnomesFilteredByHairColorAndProfession, searchText);
  }

  private collection: Gnome[] = [];

  private searchInput = '';

  private isSlideOverActive = false;

  private isLoading = false;

  private HAIRCOLORS = HAIRCOLORS;

  private SORTBYAGE = SORTBYAGE;

  private selectedHairColor = HAIRCOLORS.ALL;

  private selectedAgeSort = SORTBYAGE.ASCENDING;

  private selectedProfession = this.collectionOfProfessions[0];

  private activeGnome: Gnome | null = null;

  get hasCharacters(): boolean {
    return !!this.collection.length;
  }

  get promiseWasResolved(): boolean {
    return this.collection.length > 1;
  }

  get collectionOfProfessions(): string[] {
    const listOfProfessions = Gnome.collectionOfAllProfessions(this.collection);
    listOfProfessions.unshift('All Professions');
    return listOfProfessions;
  }

  get renderCTAMessage(): any {
    return this.promiseWasResolved ? 'Brastlewark' : this.collection[0];
  }

  private toggleSlideOver(): void {
    this.isSlideOverActive = !this.isSlideOverActive;
  }

  private handleDetails(payload: Gnome): void {
    this.activeGnome = payload;
    this.isSlideOverActive = true;
  }

  private clearCollection(collection: Gnome[]): void {
    this.isLoading = true;
    collection.splice(0, collection.length);
    this.isLoading = false;
  }

  async mounted(): Promise<void> {
    this.isLoading = true;
    const response = await CharacterService.getCharacters();
    this.collection = Gnome.sortGnomesByAge(response, SORTBYAGE.ASCENDING);
    if (this.collection.length) {
      this.isLoading = false;
    }
  }
}

</script>

<style scoped>
.app {
  max-width: 1100px;

  @apply w-full my-0 mx-auto p-10;
}

.app__toolbar {
  @apply my-4 w-full bg-white;
}

.app__toolbar-content {
  @apply w-full flex justify-between;
}

.app__toolbar-item {
  @apply px-2 xs:w-full sm:w-full;
}

</style>
