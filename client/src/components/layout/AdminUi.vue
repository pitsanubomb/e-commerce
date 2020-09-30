<template>
  <div>
    <b-button v-b-toggle.sidebar-1 class="ml-3 mt-3">Menu</b-button>
    <b-sidebar id="sidebar-1" title="E-commerce" shadow>
      <div class="px-3 py-2">
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item>
              <router-link to="/backoffice/user">User</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/backoffice/product">Product</router-link>
            </b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

export default {}
