<template>
  <div>
    <footer class="footer">
      <div class="container mx-auto">
        <div class="flex flex-col">
          <ul class="flex justify-center">
            <li class="footer-link"><a href="#">Privacy Policy</a></li>
            <li class="footer-link"><a href="#">Terms Conditions</a></li>
          </ul>
          <div class="flex justify-center">
            <RouterLink to="/">
              <img
                src="@/assets/logo.jpg"
                width="150"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.footer {
  @apply my-10;
}
.footer-link {
  @apply mr-3;
}
</style>
