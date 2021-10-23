<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md row q-gutter-xl Fixed" style="z-index: 20">
      <!--  <div v-if="Vaccination.currentUser"> -->
      <q-fab color="primary" text-color="white" icon="menu" direction="down">
        <router-link :to="{ name: 'About' }">
          <q-fab-action color="primary" text-color="white" icon="information" />
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

        <div @click="RouterPathToHome">
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
        </div>
      </q-fab>
      <!-- </div> -->
    </div>
    <div class="row justify-end q-pa-md">
      <q-btn-dropdown split no-caps>
        <template v-slot:label>
          <div class="row items-center no-wrap" style="margin-right: 10%">
            <q-avatar :size="lg" style="margin-right: 5%">
              <img
                src="https://i1.sndcdn.com/artworks-000073742775-gmszx7-t500x500.jpg"
              />
            </q-avatar>
            ThomasTheDarkEngine
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

    <router-view />
  </q-layout>
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['Vaccination'],
  /*  mounted() {
    if (!this.Vaccination.currentUser) {
      this.$router.push({ name: 'Login' })
    } else if (this.Vaccination.isUser && this.Vaccination.currentUser) {
      this.$router.push({ name: 'PeopleDetail' })
    } else if (this.Vaccination.isDoctor && this.Vaccination.currentUser) {
      this.$router.push({ name: 'Home' })
    } else if (this.Vaccination.isAdmin && this.Vaccination.currentUser) {
      this.$router.push({ name: 'AdminConsole' })
    }
  }, */
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('admin')
    },
    isDoctor() {
      return AuthService.hasRoles('doctor')
    },
    isUser() {
      return AuthService.hasRoles('user')
    }
  },
  methods: {
    RouterPathToHome() {
      if (this.Vaccination.isUser && this.Vaccination.currentUser) {
        this.$router.push({ name: 'PeopleDetail' })
      } else if (this.Vaccination.isDoctor && this.Vaccination.currentUser) {
        this.$router.push({ name: 'Home' })
      } else if (this.Vaccination.isAdmin && this.Vaccination.currentUser) {
        this.$router.push({ name: 'AdminConsole' })
      } else if (!this.Vaccination.currentUser) {
        this.$router.push({ name: 'Home' })
      }
    },
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
</style>