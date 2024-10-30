<template>
  <div class="z-10 grid h-screen grid-cols-2 items-stretch gap-x-8 px-20">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">Get started!</h1>
      <p>Create your first board!</p>
      <input
        v-model="newBoardTitle"
        type="text"
        data-cy="first-board"
        class="mt-4 h-8 w-full rounded-sm border-2 bg-white px-2"
        placeholder="Name of your first board"
        name="newBoard"
        @keyup.enter.prevent="redirectToNewBoard()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
const router = useRouter();

const newBoardTitle = ref('');
const { createBoard } = useStore();
const redirectToNewBoard = async () => {
  const { id } = await createBoard(newBoardTitle.value);
  router.push(`/board/${id}`);
};
</script>
