<template>
  <div class="home" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CharacterService, { Character, CharacterResponse } from '@/models/CharacterService';


@Component({

})
export default class Home extends Vue {
  private characters: Character[] = [];

  async mounted(): Promise<void> {
    const response: CharacterResponse<Character> = await CharacterService.getCharacters();
    this.characters = response.Brastlewark;
  }
}
</script>
