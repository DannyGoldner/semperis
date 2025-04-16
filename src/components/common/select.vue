<template>
  <select
    v-model="selected"
    @change="emitSelection"
    name="select"
    aria-label="Select"
  >
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="item in options" :key="item.key" :value="item.value">
      {{ item.value }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface SelectOption {
  key: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    selectedValue?: string;
    placeholder?: string;
  }>(),
  {
    options: () => [] as SelectOption[],
    selectedValue: '',
    placeholder: '',
  }
);

const selected = ref(props.selectedValue);

const emit = defineEmits<{
  onChange: [selected: string];
}>();

const emitSelection = () => {
  emit('onChange', selected.value);
};

watch(
  () => props.selectedValue,
  (newValue) => {
    selected.value = newValue;
  }
);
</script>
