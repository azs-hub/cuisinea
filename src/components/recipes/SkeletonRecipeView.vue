<template>
  <div
    class="recipe"
    data-testid="recipe-view-skeleton"
  >
    <div class="flex flex-col items-center">
      <PvSkeleton
        width="20rem"
        height="2rem"
        class="recipe__title"
      />
      <PvSkeleton
        width="40rem"
        height="6rem"
        class="recipe__short-description"
      />
      <div class="flex">
        <PvSkeleton
          width="4rem"
          height="2rem"
          class="mr-5"
        />
        <PvSkeleton
          width="4rem"
          height="2rem"
          class="mr-5"
        />
        <PvSkeleton
          width="4rem"
          height="2rem"
        />
      </div>
    </div>

    <div class="recipe-card">
      <div class="mb-4">
        <PvSkeleton
          width="100%"
          height="20rem"
        />
      </div>
      <div class="recipe-card__primary">
        <PvSkeleton
          width="10rem"
          height="4rem"
        />
        <PvSkeleton
          width="10rem"
          height="4rem"
        />
        <PvSkeleton
          width="10rem"
          height="4rem"
        />
      </div>

      <h3 class="recipe-card__title">Ingredients</h3>
      <div class="flex justify-between">
        <PvSkeleton
          width="16rem"
          height="13rem"
        /><PvSkeleton
          width="16rem"
          height="13rem"
        /><PvSkeleton
          width="16rem"
          height="13rem"
        />
      </div>

      <h3 class="recipe-card__title">Steps</h3>

      <div class="my-4">
        <PvSkeleton
          width="8rem"
          height="2rem"
          class="mb-4"
        />
        <PvSkeleton
          width="100%"
          height="6rem"
        />
      </div>
      <div class="my-4">
        <PvSkeleton
          width="8rem"
          height="2rem"
          class="mb-4"
        />
        <PvSkeleton
          width="100%"
          height="6rem"
        />
      </div>

      <hr />
      <h3 class="recipe-card__title">
        <i class="pi pi-sparkle"></i>
        Note from the author
      </h3>

      <PvSkeleton
        width="100%"
        height="4rem"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
