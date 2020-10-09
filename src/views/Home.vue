<template>
  <div class="home">
    <div v-if="characters.length">
      {{ characters[0] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CharacterService from '@/models/CharacterService';
import Gnome from '@/models/Gnome';

@Component({

})
export default class Home extends Vue {
  private characters: Gnome[] = [];

  async mounted(): Promise<void> {
    const response: Gnome[] = await CharacterService.getCharacters();
    this.characters = response;
  }
}
</script>
