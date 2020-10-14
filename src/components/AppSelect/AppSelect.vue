<template>
  <div class="select">
    <label
      :for="label"
      class="sr-only"
    >
      {{ label }}
    </label>
    <select
      :id="label"
      v-model="selectedOption"
      class="select__button"
      v-bind="$attrs"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import './style.css';

@Component({
  name: 'AppSelect',
  inheritAttrs: false,
})
export default class AppSelect extends Vue {
  @Watch('selectedOption')
  emitValueToParent(payload: string) {
    this.$emit('input', payload);
  }

    @Prop({ required: true })
    readonly options!: string[];

    @Prop({ required: false, default: 'select' })
    readonly label!: string;

    @Prop({ required: false })
    readonly value!: string;

    private selectedOption: null | string = null;

    private mounted(): void {
      this.selectedOption = this.value;
    }
}
</script>
