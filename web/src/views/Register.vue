<script setup>
import { ref, inject } from 'vue'


const username = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const gmail = ref("");
const route = inject('router')

function registerUser(e) {
  e.preventDefault();
  const url = "http://localhost:3000/register"
  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gmail: gmail.value,
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value
    })
  }).then(
    async res => {
      console.log(res.status)
      if (res.status >= 300 || res.status < 200) {
        const data = await res.json();
        alert(data.msg)
      } else {
        route.push('/success')
      }
    }
  )
}

</script>

<template>
  <form action="#" class="w-full text-[1.2rem] mt-10 lg:mt-0" @submit="registerUser">
    <h1 class=" text-[2.5rem] text-[#00BD7E]">Sign up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr class="mb-6">
    <div class="w-full rounded-lg h-1"></div>
    <!-- Gmail -->
    <label for="gmail">Gmail</label> <br>
    <input type="email" v-model="gmail" id="gmail" placeholder="example@gmail.com"
      class="input border-2 rounded-lg pl-2 w-full mb-6 mt-1 h-10"> <br>
    <!-- Username -->
    <label for="username">Username</label> <br>
    <input type="text" v-model="username" id="username" placeholder="Enter your username" class="input"> <br>
    <!-- First Name -->
    <label for="firstName">First name</label> <br>
    <input type="text" v-model="firstName" id="firstName" placeholder="Your first name" class="input"> <br>
    <!-- Last Name -->
    <label for="lastName">Last name</label> <br>
    <input type="text" v-model="lastName" id="lastName" placeholder="Your last name" class="input"> <br>
    <!-- Password -->
    <label for="password">Password</label> <br>
    <input type="password" v-model="password" id="password" placeholder="Create your password" class="input">

    <p>By creating an account you agree to our <span><a href="#" class="text-blue-500">Terms & Privacy</a></span>.</p>
    <button type="submit" class="bg-[#1EB37C] hover:bg-[#13392C] rounded-lg text-white px-10 py-2 mt-5">Sign up</button>
  </form>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.input {
  border-radius: 0.5rem;
  border-width: 2px;
  padding-left: 0.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
  margin-top: 0.25rem;
  height: 2.5rem;
  color: black;
}
</style>
