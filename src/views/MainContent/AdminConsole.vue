<template>
  <div
    class="text-h3 flex flex-center"
    style="margin-bottom: 1%; margin-left: 1%; margin-right: 1%"
  >
    <b style="text-shadow: 4px 4px lightgray"> Admin Console </b>
  </div>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="index"
      :rows="rows"
      :columns="columns"
      :separator="separator"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="username" :props="props">
            {{ props.row.username }}
          </q-td>
          <q-td key="role" :props="props" class="pointer">
            <q-select
              class="text-box-align"
              v-model="props.row.role"
              :options="roles"
            />
          </q-td>
          <q-td key="vaccine" :props="props">
            <div class="row">
              <div class="col-6">
                <q-select
                  class="text-box-align"
                  v-model="props.row.vaccine[0]"
                  :options="vaccines"
                />
              </div>

              <div class="col-6">
                <q-select
                  class="text-box-align"
                  v-model="props.row.vaccine[1]"
                  :options="vaccines"
                />
              </div>
            </div>
          </q-td>

          <q-td key="approve" :props="props">
            <q-btn color="green" style="margin-right: 3%"> Accept </q-btn>
            <q-btn color="red"> Reject </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      columns,
      rows: ref(rows),
      separator: ref('cell'),
      role: ref(''),
      roles: ['Doctor', 'Normal User'],
      vaccines: ['Pfizer', 'Moderna']
    }
  },
  methods: {
    VaccineCheck() {
      if (this.vaccine == null) {
        this.vaccine = 'Null'
      }
    }
  }
}
const columns = [
  {
    name: 'id',
    required: true,
    label: 'User ID',
    align: 'center',
    field: (row) => row.id
  },
  {
    name: 'username',
    align: 'center',
    label: 'Username',
    field: 'username'
  },
  { name: 'role', align: 'center', label: 'Role', field: 'role' },
  { name: 'vaccine', align: 'center', label: 'Vaccine', field: 'vaccine' },
  {
    name: 'approve',
    align: 'center',
    label: 'Approve/Reject',
    field: 'approve'
  }
]
const rows = [
  {
    id: '1',
    username: 'InwZa007',
    role: '',
    vaccine: ['', ''],
    approve: true
  },
  {
    id: '2',
    username: 'InwZa007',
    role: '',
    vaccine: ['', ''],
    approve: true
  }
]
</script>
<style scoped>
.pointer:hover {
  cursor: pointer;
}
</style>