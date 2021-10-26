<template>
  <div
    class="text-h3 flex flex-center"
    style="margin-bottom: 1%; margin-left: 1%; margin-right: 1%"
  >
    <b style="text-shadow: 4px 4px lightgray"> Admin Console </b>
  </div>
  <div class="q-pa-md">
    <q-markup-table :separator="separator" flat bordered>
      <thead class="bg-cyan-1">
        <tr>
          <th class="text-center">User ID</th>
          <th class="text-center">Username</th>
          <th class="text-center">Role</th>
          <th class="text-center">Vaccine</th>
          <th class="text-center">Approve</th>
        </tr>
      </thead>
      <tbody>
        <AdminTable v-for="data in people" :key="data.id" :data="data" />
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { ref } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import AdminService from '@/services/AdminService.js'
export default {
  data() {
    return {
      people: ''
    }
  },
  components: {
    AdminTable
  },

  setup() {
    return {
      separator: ref('vertical')
    }
  },
  created() {
    AdminService.getUnEnableUser()
      .then((response) => {
        this.people = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>