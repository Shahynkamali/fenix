<template>
  <div class="home">
    <SlideOver
      :is-slide-over-active="isSlideOverActive"
      :data="gnomesToDisplay"
      @toggleSlideOver="toggleSlideOver"
    />
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
import CharacterService from '@/models/CharacterService';
import Gnome from '@/models/Gnome';
import GridWrapper from '~/GridWrapper/GridWrapper.vue';
import AppCard from '~/AppCard/AppCard.vue';
import SlideOver from '~/SlideOver/SlideOver.vue';

@Component({
  name: 'Home',
  components: {
    GridWrapper,
    AppCard,
    SlideOver,

  },
})
export default class Home extends Vue {
  private characters: Gnome[] = [];

  gnomesToDisplay: Gnome[] = [];

  isSlideOverActive = false;


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
