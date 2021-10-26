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
      <tbody v-for="data in people" :key="data.id" :data="data">
        <tr v-if="data.enabled == false">
          <td class="text-center">{{ data.id }}</td>
          <td class="text-center">{{ data.username }}</td>
          <td class="text-center">
            <q-select class="text-box-align" :options="roles" v-model="role" />
            <q-btn
              label="Add patient"
              color="primary"
              style="margin-top: 3%"
              @click="alert = true"
              v-if="role.value == 'ROLE_DOCTOR'"
            />
            <div v-if="role.value == 'ROLE_DOCTOR'">{{ patientSelectedList }}</div>
            <q-dialog v-model="alert">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Add patient</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-option-group
                    :options="patient"
                    type="checkbox"
                    v-model="group"
                  />
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Add"
                    color="primary"
                    v-close-popup
                    @click="PatientListSelected"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </td>
          <td class="text-center">
            <div class="row">
              <div class="col-6">
                <q-select
                  class="text-box-align"
                  v-model="vaccine1"
                  :options="vaccines"
                />
              </div>

              <div class="col-6">
                <q-select
                  class="text-box-align"
                  v-model="vaccine2"
                  :options="vaccines"
                />
              </div>
            </div>
          </td>

          <td class="text-center">
            <q-td class="row justify-center">
              <q-btn
                color="green"
                style="margin-right: 3%"
                @click="AcceptUser(data.id)"
              >
                Accept
              </q-btn>
              <q-btn color="red"> Reject </q-btn>
            </q-td>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { ref } from 'vue'
import AdminService from '@/services/AdminService.js'
export default {
  setup() {
    return {
      role: ref(''),
      roles: [
        { label: 'Doctor', value: 'ROLE_DOCTOR' },
        { label: 'Patient', value: 'ROLE_PATIENT' }
      ],
      vaccines: ['null', 'Pfizer', 'Moderna'],
      separator: ref('vertical'),
      group: ref([]),
      patientSelectedList: ref([]),
      patient: [
        { label: 'Patient 1', value: 'pa1' },
        { label: 'Patient 2', value: 'pa2' },
        { label: 'Patient 3', value: 'pa3' }
      ],
      alert: ref(false),
      vaccine1: ref(''),
      vaccine2: ref('')
    }
  },
  methods: {
    VaccineCheck() {
      if (this.vaccine == null) {
        this.vaccine = 'Null'
      }
    },
    PatientListSelected() {
      this.patientSelectedList.push(this.patient[0])
    },
    AcceptUser(id) {
      AdminService.changeAndAcceptRole(id, this.role.value).then(() => {
        location.reload()
      })
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
  },
  data() {
    return {
      people: null
    }
  }
}
</script>
<style scoped>
.pointer:hover {
  cursor: pointer;
}
</style>