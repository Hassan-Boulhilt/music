<template>
  <div>
    <div class="border border-gray-200 p-3 mb-4 rounded">
      <div v-show="!isEditing">
        <h4 class="inline-block text-2xl font-bold">
          {{ song.original_name }}
        </h4>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        >
          <i class="fa fa-times"></i>
        </button>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
          @click.prevent="isEditing = true"
        >
          <i class="fa fa-pencil-alt"></i>
        </button>
      </div>
      <div v-show="isEditing">
        <vee-form
          @submit="submitSong"
          :validation-schema="songSchema"
          :initial-values="song"
        >
          <div class="mb-3">
            <label class="inline-block mb-2">Song Title</label>
            <vee-field
              name="title"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Song Title"
            />
          </div>
          <ErrorMessage class="text-red-600" name="title" />
          <div class="mb-3">
            <label class="inline-block mb-2">Song Genre</label>
            <vee-field
              name="genre"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Genre"
            />
          </div>
          <div>
            <ErrorMessage class="text-red-600" name="genre" />
          </div>

          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
          >
            Submit
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            @click.prevent="isEditing = false"
          >
            Go Back
          </button>
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
import { updateDoc, doc } from "firebase/firestore";
export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      songSchema: {
        title: "required|min:3|max:50",
        genre: "required|min:3|max:50",
      },
    };
  },
  methods: {
    async submitSong(values) {
      await updateDoc(doc(songsCollection, this.song.docId), {
        original_name: values.title,
        genre: values.genre,
      });
    },
  },
};
</script>
