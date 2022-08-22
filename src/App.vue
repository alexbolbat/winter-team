<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>

body {
  background: rgb(234,246,246);
  background: radial-gradient(circle, rgba(234,246,246,1) 0%, rgba(182,237,237,1) 100%);
}

#app {
  margin: 100px auto;
  text-align: center;
  background-color: #fcfefe;
  max-width: 900px;
  border-radius: 35px;
  color: #66bfbf;
  padding: 10px 20px 10px;
  box-shadow: 0px 0px 15px 0px rgba(37,69,69,0.25);
}

nav {
  padding: 30px;
  font-size: 25px;
}

nav a {
  font-weight: bold;
  color: #2d4d4d;
}

nav a.router-link-exact-active {
  color: #66bfbf;
}
</style>
