<template>
  <tr v-if="data.enabled == false">
    <td class="text-center">{{ data.id }}</td>
    <td class="text-center">{{ data.username }}</td>
    <td class="text-center">
      <q-select class="text-box-align" :options="roles" v-model="roleGet" />
      <q-btn
        label="Add patient"
        color="primary"
        style="margin-top: 3%"
        @click="alert = true"
        v-if="roleGet.value == 'ROLE_DOCTOR'"
      />
      <div v-if="roleGet.value == 'ROLE_DOCTOR'">
        {{ patientSelectedList }}
      </div>
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
      <div class="row" v-if="roleGet.value == 'ROLE_USER'">
        <div class="col-6">
          <select v-model="vaccine_user.vaccine.id">
            <option
              v-for="option in Vaccination.vaccine"
              :value="option.id"
              :key="option.id"
              :selected="option.id === this.vaccine_user.vaccine.id"
            >
              {{ option.name }}
            </option>
          </select>
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
        <q-btn color="red" @click="DelUser(data.id)"> Reject </q-btn>
      </q-td>
    </td>
  </tr>
</template>
<script>
import { ref } from 'vue'
import AdminService from '@/services/AdminService.js'
export default {
  inject: ['Vaccination'],
  name: 'AdminTable',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      roleGet: ref(''),
      roles: [
        { label: 'Doctor', value: 'ROLE_DOCTOR' },
        { label: 'Patient', value: 'ROLE_USER' }
      ],
      vaccines: ['null', 'Pfizer', 'Moderna'],
      group: ref([]),
      patientSelectedList: ref([]),
      patient: [
        { label: 'Patient 1', value: 'pa1' },
        { label: 'Patient 2', value: 'pa2' },
        { label: 'Patient 3', value: 'pa3' }
      ],
      alert: ref(false)
    }
  },
  data() {
    return {
      vaccine_user: {
        vaccine: [{ id: '', name: '' }]
      }
    }
  },
  methods: {
    AcceptUser(id) {
      console.log(this.vaccine_user.vaccine.id)
      console.log(id)
      /* if (this.roleGet.value == 'ROLE_USER') {
        AdminService.changeAndAcceptRole(id, this.roleGet.value).then(() => {
          AdminService.saveVaccine(id, this.vaccine_user.vaccine).then(() => {
            location.reload()
          })
        })
      } else { */
      AdminService.changeAndAcceptRole(id, this.roleGet.value).then(() => {
        location.reload()
      })
      //}
    },
    DelUser(id) {
      AdminService.deleteUser(id).then(() => {
        location.reload()
      })
    },
    VaccineCheck() {
      if (this.vaccine == null) {
        this.vaccine = 'Null'
      }
    },
    PatientListSelected() {
      this.patientSelectedList.push(this.patient[0])
    }
  }
}
</script>