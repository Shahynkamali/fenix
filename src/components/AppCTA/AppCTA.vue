<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        {{ message }}
      </h2>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'AppModal',
})
export default class AppModal extends Vue {
    @Prop({ required: true })
    readonly message!: string;
}
</script>
