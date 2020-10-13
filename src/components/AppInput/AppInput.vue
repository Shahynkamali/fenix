<template>
  <div>
    <label
      :for="label"
      class="sr-only"
    >
      {{ label }}
    </label>
    <div class="input__container">
      <input
        :id="label"
        :value="value"
        v-bind="$attrs"
        class="input"
        @input="handleInput($event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import './style.css';

@Component({
  name: 'AppInput',
  inheritAttrs: false,
})
export default class AppInput extends Vue {
    @Prop({ required: false, default: 'input' })
    readonly label!: string;

    @Prop({ required: false })
    readonly value!: string;

    private handleInput(payload: string | number): void {
      this.$emit('input', payload);
    }
}
</script>
