<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-if="show_alert"
      :class="alert_variant"
    >
      {{ alert_message }}
    </div>
    <div class="border border-gray-200 p-3 mb-4 rounded">
      <div v-show="!isEditing">
        <h4 class="inline-block text-2xl font-bold">
          {{ song.modified_name }} {{ song.genre }}
        </h4>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
          @click="deleteSong"
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
              name="modified_name"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Song Title"
            />
          </div>
          <ErrorMessage class="text-red-600" name="modified_name" />
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
            :disabled="in_submission"
          >
            Submit
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            @click.prevent="isEditing = false"
            :disabled="in_submission"
          >
            Go Back
          </button>
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  songsCollection,
  storage,
  deleteObject,
  ref,
  updateDoc,
  doc,
} from "@/includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateSongd: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      songSchema: {
        modified_name: "required|min:3|max:50",
        genre: "required|min:3|max:50",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please wait! Updating song information",
    };
  },
  methods: {
    async submitSong(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Updating song information";
      try {
        await updateDoc(doc(songsCollection, this.song.docId), {
          modified_name: values.modified_name,
          genre: values.genre,
        });
      } catch (error) {
        this.in_submission = false;
        this.show_alert = true;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Error updating song information";
        return;
      }
      this.updateSong(this.index, values);
      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_message = "Song information updated successfully";
    },
    async deleteSong() {
      this.updateSongd(this.index);
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Deleting song";
      try {
        const songRef = ref(storage, `${this.song.modified_name}`);
        await deleteObject(storage, songRef.fullPath());
      } catch (error) {
        this.show_alert = true;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Error deleting song";
        return;
      }
      this.alert_variant = "bg-green-500";
      this.alert_message = "Song deleted successfully";
    },
  },
};
</script>
