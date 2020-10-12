<template>
  <button
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
  name: 'AButton',
})

export default class AButton extends Vue {
  @Prop({ required: false })
  readonly disabled!: boolean;

  @Prop({ required: false, default: 'click me' })
  readonly text!: string;
}
</script>
