<template>
  <div style="margin-left: 1%; margin-right: 1%">
    <q-card class="shadow-10 card-align" transition="scale" style="">
      <div class="text-h3 flex flex-center" style="margin-bottom: 1%">
        <b style="text-shadow: 4px 4px lightgray"> Sign up </b>
      </div>
      <Form
        @submit="handleRegister"
        :validation-schema="schema"
        style="margin: 5%"
      >
        <div class="row">
          <Field name="firstname" v-slot="{ errorMessage, value, field }">
            <q-input
              :model-value="value"
              v-bind="field"
              @keydown.space.prevent
              name="firstname"
              label="Firstname"
              class="text-box-align col-5"
              :error-message="errorMessage"
              :error="!!errorMessage"
              v-on:keypress="isLetterOnly($event)"
            />
          </Field>
          <Field name="lastname" v-slot="{ errorMessage, value, field }">
            <q-input
              :model-value="value"
              v-bind="field"
              @keydown.space.prevent
              name="lastname"
              label="Lastname"
              :error-message="errorMessage"
              :error="!!errorMessage"
              class="text-box-align col-7"
              v-on:keypress="isLetterOnly($event)"
            />
          </Field>
        </div>
        <Field name="username" v-slot="{ errorMessage, value, field }">
          <q-input
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
            @keydown.space.prevent
            name="username"
            label="Username"
            maxlength="20"
            class="text-box-align"
            v-on:keypress="isLetterOrNumber($event)"
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
            maxlength="40"
            class="text-box-align"
            :type="isPwd ? 'password' : 'text'"
            v-on:keypress="isLetterOrNumber($event)"
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

        <div class="row">
          <Field name="gender" v-slot="{ errorMessage, value, field }">
            <q-select
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
              class="text-box-align col-5"
              :options="options"
              label="Gender"
            />
          </Field>
          <Field name="birthdate" v-slot="{ errorMessage, value, field }">
            <q-input
              :model-value="value"
              v-bind="field"
              :error-message="errorMessage"
              :error="!!errorMessage"
              @keydown.space.prevent
              v-model="date"
              label="Birth Date"
              class="text-box-align col-7 calculatedAge"
              mask="####-##-##"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date minimal v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </Field>
        </div>
        <Field name="hometown" v-slot="{ errorMessage, value, field }">
          <q-select
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
            class="text-box-align"
            :options="province"
            label="Hometown"
          />
        </Field>
        <div class="text-box-align" style="margin-top: 5%">
          <UploadImages :max="1" @changed="handleImages" name="image" />
        </div>

        <div style="text-align: center; margin-top: 5%">
          <div v-if="message" class="fade-out" style="color: red">
            {{ message }}
          </div>
          <q-btn
            split
            rounded
            color="primary"
            class="btn-submit"
            label="Sign up"
            type="submit"
          />
          <div style="margin-top: 5%">
            Oh you already have an account?
            <router-link
              :to="{ name: 'Login' }"
              style="color: blue; text-decoration: underline"
            >
              Login
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
import UploadImages from 'vue-upload-drop-images'
import { ref } from 'vue'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'Register',
  components: {
    UploadImages,
    Form,
    Field
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup.string().required().label('Firstname'),
      lastname: yup.string().required().label('Lastname'),
      username: yup.string().required().min(3).max(20).label('Username'),
      password: yup.string().required().min(6).max(40).label('Password'),
      gender: yup.string().required().label('Gender'),
      birthdate: yup.string().required().label('Birth Date'),
      hometown: yup.string().required().label('Hometown'),
      image: yup.string()
    })
    return {
      message: '',
      schema,
      image: '',
      files: [],
      age: ''
    }
  },
  computed: {
    calculateAge: function () {
      let currentDate = new Date()
      let birthDate = new Date(String(this.date))
      let difference = currentDate - birthDate
      let age = Math.floor(difference / 31557600000)
      return age
    }
  },
  methods: {
    handleRegister(user) {
      Promise.all(
        this.files.map((file) => {
          return AuthService.uploadFile(file)
        })
      ).then((response) => {
        user.age = this.calculateAge
        user.image = response.map((r) => r.data)
        user.image = user.image[0]
        AuthService.register(user)
          .then(() => {
            this.$router.push({ name: 'Login' })
          })
          .catch(() => {
            this.message = 'Cannot register to the system'
            setTimeout(() => {
              this.message = ''
            }, 2000)
          })
      })
    },

    handleImages(files) {
      this.files = files
    },
    isLetterOrNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z0-9_-]+$/.test(char)) return true
      else e.preventDefault()
    },
    isLetterOnly(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z]+$/.test(char)) return true
      else e.preventDefault()
    }
  },
  setup() {
    return {
      date: ref(''),
      isPwd: ref(true),
      options: ['Male', 'Female', 'LGBTQ', 'Genderless'],
      province: [
        'Bangkok',
        'Amnat Charoen',
        'Ang Thong',
        'Bueng Kan',
        'Buriram',
        'Chachoengsao',
        'Chainat',
        'Chaiyaphum',
        'Chanthaburi',
        'Chiang Mai',
        'Chiang Rai',
        'Chonburi',
        'Chumphon',
        'Kalasin',
        'Kamphaeng Phet',
        'Kanchanaburi',
        'Khon Kaen',
        'Krabi',
        'Lampang',
        'Lamphun',
        'Loei',
        'Lopburi',
        'Mae Hong Son',
        'Maha Sarakham',
        'Mukdahan',
        'Nakhon Nayok',
        'Nakhon Pathom',
        'Nakhon Phanom',
        'Nakhon Ratchasima',
        'Nakhon Sawan',
        'Nakhon Si Thammarat',
        'Nan',
        'Narathiwat',
        'Nong Bua Lamphu',
        'Nong Khai City',
        'Nonthaburi',
        'Pathum Thani',
        'Pattani',
        'Phang Nga',
        'Phatthalung',
        'Phayao',
        'Phetchabun',
        'Phetchaburi',
        'Phichit',
        'Phitsanulok',
        'Phra Nakhon Si Ayutthaya',
        'Phrae',
        'Phuket',
        'Prachinburi',
        'Prachuap Khiri Khan',
        'Ranong',
        'Ratchaburi',
        'Rayong',
        'Roi Et',
        'Sa Kaeo',
        'Sakon Nakhon',
        'Samut Prakan',
        'Samut Sakhon',
        'Samut Songkhram',
        'Saraburi',
        'Satun',
        'Sing Buri',
        'Sisaket',
        'Songkhla',
        'Sukhothai',
        'Suphan Buri',
        'Surat Thani',
        'Surin',
        'Tak',
        'Trang',
        'Trat',
        'Ubon Ratchathani',
        'Udon Thani',
        'Uthai Thani',
        'Uttaradit',
        'Yala',
        'Yasothon'
      ]
    }
  }
}
</script>
