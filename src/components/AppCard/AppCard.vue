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
      </dl>
    </div>
    <div class="card__actions">
      <div class="card__button-container card__button-container--left">
        <AppButton
          class="card__button card__button--left"
          @click="findFriends(data.friends)"
        >
          <template>
            <UsersSVG class="card__icon" />
            <span class="card__button-content">Friends</span>
          </template>
        </AppButton>
      </div>
      <div class="card__button-container card__button-container-right">
        <AppButton
          class="card__button card__button--right"
          @click="displayDetails(data);"
        >
          <template>
            <InformationCircleSVG class="card__icon" />
            <span class="card__button-content">Details</span>
          </template>
        </AppButton>
      </div>
    </div>
  </div>
</template>>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Gnome from '@/models/Gnome';
import UsersSVG from '@/assets/svgs/users.svg';
import InformationCircleSVG from '@/assets/svgs/information-circle.svg';
import AppImage from '~/AppImage/AppImage.vue';
import AppButton from '~/AppButton/AppButton.vue';
import './style.css';


@Component({
  name: 'AppCard',
  components: {
    AppImage,
    AppButton,
    UsersSVG,
    InformationCircleSVG,
  },
})
export default class AppCard extends Vue {
    @Prop({ required: true })
    readonly data!: Gnome;

    toggleSlideOver() {
      this.$emit('toggleSlideOver');
    }

    findFriends(payload: string[]) {
      this.$emit('findFriends', payload);
    }

    displayDetails(payload: Gnome) {
      this.$emit('displayDetails', payload);
    }
}
</script>
