<template>
  <PeopleProfile :people="people" />
  <br />
  <q-separator />
  <br />
  <div class="review-container">
    <div class="text-h4" style="margin-bottom: 2%">
      <b>Doctor Comment</b>
    </div>
    <div
      id="flashMessage"
      style="margin-right: 6%"
      v-if="Vaccination.DoctorNotify"
      class="text-subtitle1"
    >
      <b style="margin-left: 1%">
        {{ Vaccination.DoctorNotify }}
      </b>
    </div>
    <div class="row q-gutter-md" v-if="isDoctor">
      <div class="col-xs-12 col-sm-12 col-md-5">
        <q-card>
          <q-card-section>
            <CommentForm @comment-submitted="addComment" /> </q-card-section
        ></q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-card style="height: 100%">
          <q-card-section>
            <DoctorComment :comments="comments" /> </q-card-section
        ></q-card>
      </div>
    </div>
    <div class="row q-gutter-md" v-if="isUser">
      <div class="col-xs-12 col-sm-12 col-md-11">
        <q-card style="height: 100%">
          <q-card-section>
            <DoctorComment :comments="comments" /> </q-card-section
        ></q-card>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>
<script>
import PeopleProfile from '@/components/PeopleProfile.vue'
import CommentForm from '@/components/CommentForm.vue'
import DoctorComment from '@/components/DoctorComment.vue'
import AuthService from '@/services/AuthService.js'
export default {
  components: {
    DoctorComment,
    CommentForm,
    PeopleProfile
  },
  props: ['people'],
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
  data() {
    return {
      comments: []
    }
  },
  methods: {
    addComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>
<style scoped>
@keyframes Primary {
  from {
    background: #1976d3;
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: Primary;
  animation-duration: 5s;
  color: white;
}
</style>