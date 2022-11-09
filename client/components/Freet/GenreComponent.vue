import { BootstrapVue } from 'bootstrap-vue'
import AddGenreForm from '@/components/Freet/AddGenreForm.vue'

<template>
    <article class="genre">
        <b-form-group
        v-slot="{ ariaDescribedby }"
        >
            <b-form-radio-group
                id="btn-radios"
                v-model="selected"
                :options="options"
                :aria-describedby="ariaDescribedby"
                button-variant="outline-primary"
                @change="filterGenre"
                size="lg"
                name="radio-btn-outline"
                buttons
            ></b-form-radio-group>
        </b-form-group>
    </article>
</template>

<script>
export default {
  name: 'GenreComponent',
  props: {
    selectedGenre: {
      type: String,
      required: true
    }
  },
  data() {
    return {
        selected: '',
        options: []
    }
  },
  methods: {
    filterGenre() {
      /**
       * Selects genre to filter
       */
       this.$store.commit('updateGenre', this.selected);
       this.$store.commit('refreshFreets');
    }
  },
  async mounted() {
    try {
        const res = await fetch('/api/feed/genres').then(async r => r.json());
        console.log(res.length);

        this.options = [{ text: " 🏠", value: "" }];
        for (let i = 0; i < res.length; i++) {
            this.options.push({ text: " " + res[i], value: res[i] });
        }
        this.options.push({ text: " " + selectedGenre, value: selectedGenre });
        this.$store.commit('refreshFreets');
    } catch (e) {
    }
  }
};
</script>

<style scoped>

b-form-radio-group{
    display: none;
    margin-bottom: 20px;
}
.genre {
    margin-bottom: 20px;
}

</style>