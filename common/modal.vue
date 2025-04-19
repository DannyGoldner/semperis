<template>
  <dialog :open="visible" @click.self="close">
    <article>
      <header>
        <button
          aria-label="Close"
          rel="prev"
          @click="close"
          data-tooltip="Close"
          data-placement="left"
        ></button>
        <p>
          <slot name="header">
            <h3>Header</h3>
          </slot>
        </p>
      </header>

      <slot>
        <p>Main content</p>
      </slot>
      <footer>
        <div v-if="$slots.footer">
          <slot name="footer">
            <p>Footer</p>
          </slot>
        </div>
        <button @click="close" class="secondary">Close</button>
      </footer>
    </article>
  </dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val);
  },
});

const close = () => {
  visible.value = false;
  emit('close');
};
</script>

<style scoped>
dialog {
  > article {
    max-width: 1200px;
  }
}
</style>
