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
            <AppSelect
              v-model="selectedHairColor"
              :label="'hairColors'"
              :options="HAIRCOLORS"
              :value="HAIRCOLORS.ALL"
            />
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

  isLoading = false;

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
