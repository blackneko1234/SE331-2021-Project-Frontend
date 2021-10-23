<template>
  <div style="margin-left: 1%; margin-right: 1%">
    <q-card class="shadow-10 card-align" transition="scale">
      <div class="text-h3 flex flex-center" style="margin-bottom: 1%">
        <b style="text-shadow: 4px 4px lightgray"> Login </b>
      </div>
      <Form :validation-schema="schema" style="margin: 5%">
        <Field name="username" v-slot="{ errorMessage, value, field }">
          <q-input
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
            @keydown.space.prevent
            name="username"
            v-model="username"
            label="Username"
            class="text-box-align"
            :rules="[(val) => !!val || 'Username is required!']"
          />
        </Field>
        <Field name="password" v-slot="{ errorMessage, value, field }">
          <q-input
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
            @keydown.space.prevent
            name="password"
            label="Password"
            class="text-box-align"
            :rules="[(val) => !!val || 'Password is required!']"
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </Field>
        <div style="text-align: center">
          <div v-if="message" class="fade-out" style="color: red">
            {{ message }}
          </div>
          <q-btn
            @click="handleLogin"
            split
            rounded
            color="primary"
            class="btn-submit"
            label="Login"
          />
          <div style="margin-top: 5%">
            Do you want to join us?
            <router-link
              :to="{ name: 'Register' }"
              style="color: blue; text-decoration: underline"
            >
              Sign up
            </router-link>
            now!!!
          </div>
        </div>
      </Form>
    </q-card>
  </div>
</template>

<script>
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['Vaccination'],
  name: 'Login',
  components: {
    Form,
    Field
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required().label('Username'),
      password: yup.string().required().label('Password')
    })
    return {
      message: '',
      schema
    }
  },
  setup() {
    return {
      username: ref(''),
      password: ref(''),
      isPwd: ref(true)
    }
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          if (this.Vaccination.isUser && this.Vaccination.currentUser) {
            this.$router.push({ name: 'PeopleDetail' })
          } else if (
            this.Vaccination.isDoctor &&
            this.Vaccination.currentUser
          ) {
            this.$router.push({ name: 'Home' })
          } else if (this.Vaccination.isAdmin && this.Vaccination.currentUser) {
            this.$router.push({ name: 'AdminConsole' })
          }
        })
        .catch(() => {
          this.message =
            'Cannot login to the system please check username and password and login again'
          setTimeout(() => {
            this.message = ''
          }, 2000)
        })
    }
  }
}
</script>
