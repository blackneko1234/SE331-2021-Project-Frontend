<template>
  <q-layout view="lHh Lpr lFf">
    <div v-if="Vaccination.currentUser">
      <div class="q-pa-md row q-gutter-xl Fixed" style="z-index: 20">
        <q-fab color="primary" text-color="white" icon="menu" direction="down">
          <router-link :to="{ name: 'About' }">
            <q-fab-action
              color="primary"
              text-color="white"
              icon="information"
            />
            <q-tooltip
              anchor="center right"
              transition-show="scale"
              transition-hide="scale"
              self="center left"
              :offset="[10, 10]"
            >
              <strong> About us</strong>
            </q-tooltip>
          </router-link>

          <router-link v-if="isDoctor" :to="{ name: 'Home' }">
            <q-fab-action color="primary" text-color="white" icon="home" />
            <q-tooltip
              anchor="center right"
              transition-show="scale"
              transition-hide="scale"
              self="center left"
              :offset="[10, 10]"
            >
              <strong> Home </strong>
            </q-tooltip>
          </router-link>
          <router-link v-if="isAdmin" :to="{ name: 'AdminConsole' }">
            <q-fab-action color="primary" text-color="white" icon="home" />
            <q-tooltip
              anchor="center right"
              transition-show="scale"
              transition-hide="scale"
              self="center left"
              :offset="[10, 10]"
            >
              <strong> Home </strong>
            </q-tooltip>
          </router-link>
          <router-link
            v-if="isUser"
            :to="{
              name: 'PeopleDetail',
              params: { id: Vaccination.currentUser.id }
            }"
          >
            <q-fab-action color="primary" text-color="white" icon="home" />
            <q-tooltip
              anchor="center right"
              transition-show="scale"
              transition-hide="scale"
              self="center left"
              :offset="[10, 10]"
            >
              <strong> Home </strong>
            </q-tooltip>
          </router-link>
        </q-fab>
      </div>
      <div class="row justify-end q-pa-md">
        <q-btn-dropdown split no-caps>
          <template v-slot:label>
            <div class="row items-center no-wrap" style="margin-right: 10%">
              <q-avatar
                style="margin-right: 5%"
                v-if="Vaccination.currentUser.image"
              >
                <img :src="Vaccination.currentUser.image" />
              </q-avatar>
              <q-avatar
                style="margin-right: 5%"
                v-if="!Vaccination.currentUser.image"
              >
                <img
                  src="https://secure.gravatar.com/avatar/f63ba6eacfa6a7f1287872ee6bf5195b?s=96&r=g&d=https://dbtut.com/wp-content/plugins/userswp/assets/images/no_profile.png"
                />
              </q-avatar>
              {{ Vaccination.currentUser.username }}
            </div>
          </template>

          <q-list>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>

    <div
      class="notLogin justify-end q-pa-md"
      v-if="!Vaccination.currentUser"
    ></div>
    <router-view />
  </q-layout>
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['Vaccination'],
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isDoctor() {
      return AuthService.hasRoles('ROLE_DOCTOR')
    },
    isUser() {
      return AuthService.hasRoles('ROLE_USER')
    }
  },
  mounted() {
    if (!this.Vaccination.currentUser) {
      this.$router.push({ name: 'Login' })
    } else if (this.isUser) {
      this.$router.push({
        name: 'PeopleDetail',
        params: { id: this.Vaccination.currentUser.id }
      })
    } else if (this.isDoctor) {
      this.$router.push({ name: 'Home' })
    } else if (this.isAdmin) {
      this.$router.push({ name: 'AdminConsole' })
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style scope>
a {
  text-decoration: none;
  color: black;
}
.Fixed {
  position: fixed;
}

.fade-out {
  animation: fadeOut ease 2s;
  -webkit-animation: fadeOut ease 2s;
  -moz-animation: fadeOut ease 2s;
  -o-animation: fadeOut ease 2s;
  -ms-animation: fadeOut ease 2s;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.btn-submit {
  margin-top: 5%;
  justify-items: center;
  width: 90%;
}
.text-box-align {
  padding-top: 3%;
  padding-right: 5%;
  padding-left: 5%;
  font-size: 15px;
}
.card-align {
  margin-left: 30%;
  margin-right: 30%;
  margin-bottom: 5%;
  padding: 5%;
}

.notLogin {
  margin-bottom: 3%;
}
</style>