<template>
  <form class="ph-form" @submit.prevent="submit"><slot></slot></form>
</template>

<script setup lang="ts">
import { provide, onUnmounted } from 'vue';
import Validator, { SchemaType } from 'ph-utils/lib/validator_m';
import { FormRegistInput, validatorKey, formRegistKey } from './types';

const props = withDefaults(defineProps<{ rules?: SchemaType[] }>(), {
  rules: undefined,
});

let validator: Validator | null = null;
if (props.rules != null) {
  validator = new Validator(props.rules);
}
const emit = defineEmits(['submit']);

provide(validatorKey, validator);

const inputMaps = new Map<string, FormRegistInput>();

function registInput(name: string, ipt: FormRegistInput) {
  inputMaps.set(name, ipt);
}

provide(formRegistKey, registInput);

function submit() {
  let datas: any = {};
  let isError = false;
  for (let [key, value] of inputMaps) {
    if (value.isError()) {
      isError = true;
      break;
    }
    datas[key] = value.value();
  }
  if (!isError) {
    if (validator == null) {
      emit('submit', datas);
    } else {
      validator
        .validate(datas)
        .then((d) => {
          emit('submit', d);
        })
        .catch((err) => {
          let $input = inputMaps.get(err.key);
          if ($input != null) {
            $input.error(err.message);
          }
        });
    }
  }
}

onUnmounted(() => {
  inputMaps.clear();
  validator = null;
});
</script>
