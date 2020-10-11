<template>
  <div class="home">
    <div v-if="characters.length">
      <GridWrapper>
        <template>
          <div
            v-for="(character, index) in characters"
            :key="index"
          >
            <AppCard :data="character" />
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

@Component({
  name: 'Home',
  components: {
    GridWrapper,
    AppCard,
  },
})
export default class Home extends Vue {
  private characters: Gnome[] = [];

  async mounted(): Promise<void> {
    const response: Gnome[] = await CharacterService.getCharacters();
    this.characters = response;
  }
}
</script>
