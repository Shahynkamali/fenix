<template>
  <div class="card">
    <div class="card__content">
      <AppImage
        width="128px"
        height="128px"
        :src="data.thumbnail"
        :custom-styles="'w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full'"
      />
      <h3 class="card__heading">
        {{ data.name }}
      </h3>
      <dl class="card__details">
        <dd class="card__flag-content">
          Hair color
          <span
            :class="data.hairColorCssClass"
            class="card__flag"
          >
            {{ data.hair_color }}
          </span>
        </dd>
        <dd class="card__flag-content">
          Age
          <span
            class="card__flag"
          >
            {{ data.age }}
          </span>
        </dd>
      </dl>
    </div>
    <slot name="cardActions" />
  </div>
</template>>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Gnome from '@/models/Gnome';
import AppImage from '~/AppImage/AppImage.vue';
import './style.css';


@Component({
  name: 'AppCard',
  components: {
    AppImage,
  },
})
export default class AppCard extends Vue {
    @Prop({ required: true })
    readonly data!: Gnome;

    toggleSlideOver() {
      this.$emit('toggleSlideOver');
    }
}
</script>
