<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <app-upload />
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
              :index="i"
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
    };
  },
  async created() {
    const snapchat = await getDocs(
      query(songsCollection, where("uid", "==", auth.currentUser.uid))
    );

    snapchat.forEach((doc) => {
      const song = {
        docId: doc.id,
        ...doc.data(),
      };
      this.songs.push(song);
    });
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    // async deleteSong(song) {
    //   const index = this.songs.indexOf(song);
    //   this.songs.splice(index, 1);
    // },
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore();

  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
};
</script>
