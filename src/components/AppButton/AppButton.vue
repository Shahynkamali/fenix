<template>
  <button
    :disabled="disabled"
    class="button"
    v-on="$listeners"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.css';

@Component({
  name: 'AppButton',
})

export default class AppButton extends Vue {
  @Prop({ required: false })
  readonly disabled!: boolean;

  @Prop({ required: false, default: 'click me' })
  readonly text!: string;
}
</script>
