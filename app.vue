<template>
  <div>
    <header>
      <h1>AI Companion Ranking System</h1>
    </header>
    <main>
      <div class="companion-list">
        <div v-for="companion in companions" :key="companion.id" class="companion-item">
          <h2>{{ companion.name }}</h2>
          <p>{{ companion.description }}</p>
          <div class="rating">
            <button @click="rateCompanion(companion.id, 1)">★</button>
            <button @click="rateCompanion(companion.id, 2)">★★</button>
            <button @click="rateCompanion(companion.id, 3)">★★★</button>
            <button @click="rateCompanion(companion.id, 4)">★★★★</button>
            <button @click="rateCompanion(companion.id, 5)">★★★★★</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const { $db } = useNuxtApp();
const companions = ref([]);

// Fetch companions from Firestore
async function fetchCompanions() {
  const querySnapshot = await getDocs(collection($db, 'companions'));
  companions.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Rate a companion
async function rateCompanion(id, rating) {
  const companionRef = doc($db, 'companions', id);
  await updateDoc(companionRef, {
    rating
  });
  fetchCompanions(); // Refresh the list
}

onMounted(() => {
  fetchCompanions();
});
</script>

<style>
.companion-list {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.companion-item {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}

.rating button {
  margin: 0 2px;
  cursor: pointer;
}
</style>
