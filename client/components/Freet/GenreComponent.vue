import { BootstrapVue } from 'bootstrap-vue'

<template>
    <article class="genre">
        <!-- <button
          @click="filterGenre"
        > -->
        <!-- <div>
            <b-card no-body>
                <b-tabs pills card>
                <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
                <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
                </b-tabs>
            </b-card>
        </div> -->
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
                size="md"
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
    genre: {
      type: String,
      required: true
    }
  },
  data() {
    return {
        selected: 'test',
        options: [
            { text: ' Radio 1', value: 'test' },
            { text: ' Radio 3', value: 'radio2' },
            { text: ' Radio 3', value: 'radio3' },
            { text: ' Radio 4', value: 'radio4' }
        ]
    }
  },
  methods: {
    filterGenre() {
      /**
       * Selects genre to filter
       */
       this.$store.commit('updateGenre', this.selected);
       this.$store.commit('refreshFreets');
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.freet.content === this.draft) {
        const error = 'Error: Edited freet content should be different than current freet content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PATCH',
        message: 'Successfully edited freet!',
        body: JSON.stringify({content: this.draft}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    // async likesRequest(params) {
    //   /**
    //    * Submits a request to the likes's endpoint
    //    * @param params - Options for the request
    //    * @param params.body - Body for the request, if it exists
    //    * @param params.callback - Function to run if the the request succeeds
    //    */
    //   const options = {
    //     method: params.method, headers: {'Content-Type': 'application/json'}
    //   };

    //   try {
    //     const r = await fetch(`/api/feed/genres`);
    //     if (!r.ok) {
    //       const res = await r.json();
    //       throw new Error(res.error);
    //     }

    //     this.genres = r;
    //     this.$store.commit('refreshFreets');
    //     params.callback();
    //   } catch (e) {
    //     this.$set(this.alerts, e, 'error');
    //     setTimeout(() => this.$delete(this.alerts, e), 3000);
    //   }
    // }
  },
  async mounted() {
    try {
        const res = await fetch('/api/feed/genres').then(async r => r.json());
        console.log(res.length);

        this.options = [{ text: " 🏠", value: "" }];
        for (let i = 0; i < Math.min(res.length, 4); i++) {
            this.options.push({ text: " " + res[i], value: res[i] });
        }
        this.$store.commit('refreshFreets');
    } catch (e) {
    }
  }
};
</script>

<!-- <style scoped>
b-form-radio-group{
    display: none;
    
}
</style> -->