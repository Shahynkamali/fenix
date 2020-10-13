<template>
  <div>
    <ul class="w-full my-10 p-5 shadow-lg rounded-md">
      <li class="flex flex-wrap w-full justify-start sm:justify-center xs:justify-center">
        <AppImage
          width="300px"
          height="300px"
          :custom-styles="'flex-shrink-0 mx-auto bg-black rounded-lg'"
          :src="data.thumbnail"
        />

        <div
          v-if="data"
          class=" w-2/4 ml-8 xs:mt-3 flex flex-col justify-between"
        >
          <h2 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Name
          </h2>
          <div class="text-lg leading-6 font-medium">
            <h4>{{ data.name }}</h4>
          </div>
          <h2 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Professions
          </h2>
          <ul>
            <li
              v-for="(profession, index) in data.professions"
              :key="index"
              class="text-indigo-600 inline-flex flex-wrap mr-3 text-leading-5 text-xl"
            >
              {{ profession }}
            </li>
          </ul>
          <h2 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Friends
          </h2>
          <ul>
            <li
              v-for="(friend, index) in data.friends"
              :key="index"
              class="text-teal-600 inline-flex flex-wrap mr-3 text-leading-5 text-xl"
            >
              {{ friend }}
            </li>
          </ul>
          <p class="bg-cool-gray-700 p-3 rounded-md text-white text-center mt-2">
            Hair Color {{ data.hair_color }}
          </p>
        </div>
      </li>
    </ul>
    <dl class="rounded-lg bg-white shadow-lg flex justify-center mt-2 xs:flex-col sm:flex-col">
      <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
        <dt
          id="item-1"
          class="order-2 mt-2 text-md leading-6 font-medium text-gray-500"
        >
          {{ data.heightInCentimeter }}
        </dt>
        <dd
          class="order-1 text-xl leading-none font-extrabold text-indigo-600"
          aria-describedby="item-1"
        >
          Height in CM
        </dd>
      </div>
      <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
        <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
          {{ data.heightInInches }}
        </dt>
        <dd class="order-1 text-xl leading-none font-extrabold text-indigo-600">
          Height In Inch
        </dd>
      </div>
      <div
        v-if="data.weight"
        class="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l"
      >
        <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
          {{ data.weight.toFixed(2) }} Kilogram
        </dt>
        <dd class="order-1 text-xl leading-none font-extrabold text-indigo-600">
          Weight
        </dd>
      </div>
    </dl>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Gnome from '@/models/Gnome';
import AppImage from '~/AppImage/AppImage.vue';

@Component({
  name: 'ProfileCard',
  components: {
    AppImage,
  },
})
export default class ProfileCard extends Vue {
   @Prop({ required: false })
    readonly data!: Gnome;
}

</script>
