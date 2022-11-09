<!-- Reusable component for a form in an inline style (input and button on same line) -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
    >
    <b-button
      type="submit"
      variant="outline-primary"
    >
      {{ button }}
    </b-button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
export default {
  name: 'InlineForm',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {value: '', alerts: {}};
  }
};
</script>

<style scoped>
form {
    display: flex;
    position: relative;
    margin-bottom: 20px;
}

input {
    /* box-shadow: 0px 0px 3px rgb(218, 218, 218); */
    border-radius: 5px;
    padding: 0 5px;
    min-width: 200px;
    background-color: white;
    margin-right: 5px;
}
</style>
