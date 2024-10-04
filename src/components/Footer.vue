<template>
  <div>
    <footer class="footer">
      <svg
        class="footer-border"
        height="214"
        viewBox="0 0 2204 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2203 213C2136.58 157.994 1942.77 -33.1996 1633.1 53.0486C1414.13 114.038 1200.92 188.208 967.765 118.127C820.12 73.7483 263.977 -143.754 0.999958 158.899"
          stroke-width="2"
        />
      </svg>

      <div class="container">
        <div class="columns is-multiline is-align-items-center">
          <div class="column is-5-desktop has-text-centered has-text-left-desktop mb-4">
            <ul class="footer-list mb-0">
              <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
              <li class="list-inline-item"><a href="#">Terms Conditions</a></li>
            </ul>
          </div>
          <div class="column is-2-desktop has-text-centered mb-4">
            <a href="index.html">
              <img
                src="@/assets/logo.jpg"
                width="150"
              />
            </a>
          </div>
          <div class="column is-5-desktop has-text-right-desktop has-text-centered mb-4">
            <ul class="footer-list mb-0">
              <li class="list-inline-item">
                <span class="pi pi-facebook"></span>
              </li>

              <li class="list-inline-item"><span class="pi pi-youtube"></span></li>
            </ul>
          </div>
          <div class="column is-12">
            <div class="border-bottom border-default"></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// import type { RecipeCategory } from '@/types/Recipe'

// defineProps<{
//   tags: RecipeCategory[]
// }>()
</script>

<style scoped lang="scss">
.footer {
  padding: 120px 0 50px;
  background-image: url(../images/backgrounds/footer-bg.svg);
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.footer-list a {
  display: block;
  color: #333;
  padding: 5px;
}
.footer-list a:hover {
  color: #4fd675;
}
.footer-border {
  position: absolute;
  top: -75px;
  width: 100%;
  stroke: #4fd675;
}
</style>
