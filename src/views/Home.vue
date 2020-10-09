<template>
  <div class="home">
    <div v-if="characters.length">
      <GridWrapper>
        <template>
          <div
            v-for="(character, index) in characters"
            :key="index"
          >
            {{ character.name }}
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

@Component({
  name: 'Home',
  components: {
    GridWrapper,
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
