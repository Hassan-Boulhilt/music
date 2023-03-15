<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <app-upload :addSong="addSong" />
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :index="i"
              :updateUnsaveFlag="updateUnsaveFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import useUserStore from "@/stores/user";
import AppUpload from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import {
  songsCollection,
  auth,
  getDocs,
  where,
  query,
} from "@/includes/firebase";

export default {
  name: "manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsaveFlag: false,
    };
  },
  async created() {
    const snapchat = await getDocs(
      query(songsCollection, where("uid", "==", auth.currentUser.uid))
    );

    snapchat.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(doc) {
      const song = {
        docId: doc.id,
        ...doc.data(),
      };
      this.songs.push(song);
    },
    updateUnsaveFlag(value) {
      this.unsaveFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.unsaveFlag) {
      const answer = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>
