import { defineStore } from "pinia";
import {
  auth,
  usersCollection,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
  updateProfile,
} from "@/includes/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await setDoc(doc(usersCollection, userCred.user.uid), {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      await updateProfile(userCred.user, {
        displayName: values.name,
      });

      this.userLoggedIn = true;
    },
    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      this.userLoggedIn = true;
    },
    async signOut() {
      await signOut(auth);

      this.userLoggedIn = false;
    },
  },
});
