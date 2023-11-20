<template>
  <v-dialog width="500" v-model="isDialogOpened">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        text="Create Candidate"
        variant="elevated"
        color="primary"
        :loading="candidatesStore.isLoading"
      ></v-btn>
    </template>

    <template v-slot:default>
      <v-sheet class="body">
        <v-form v-model="isFormValid" @submit.prevent="createCandidate">
          <v-container>
            <v-text-field label="First Name" required v-model.trim="firstName" :rules="nameRules" />
            <v-text-field label="Last Name" required v-model.trim="lastName" :rules="nameRules" />
            <v-sheet class="d-flex justify-space-between">
              <v-btn
                variant="plain"
                class="cancel-btn"
                text="Cancel"
                @click="isDialogOpened = false"
              ></v-btn>
              <v-btn
                type="submit"
                text="Create"
                variant="elevated"
                color="primary"
                class="submit-btn"
              />
            </v-sheet>
          </v-container>
        </v-form>
      </v-sheet>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCandidatesStore } from '@/stores';

const { isOpened } = defineProps<{ isOpened: boolean }>();

const candidatesStore = useCandidatesStore();

const firstName = ref('');
const lastName = ref('');
const isFormValid = ref(false);
const isDialogOpened = ref(isOpened);

const nameRules = [
  (value: string) => {
    if (value) return true;

    return 'Field is required.';
  }
];

function createCandidate() {
  if (isFormValid.value) {
    candidatesStore.createNewCandidate(firstName.value, lastName.value);
    isDialogOpened.value = false;
    firstName.value = '';
    lastName.value = '';
  }
}
</script>
<style scoped lang="scss">
.cancel-btn {
  color: red;
}
</style>
