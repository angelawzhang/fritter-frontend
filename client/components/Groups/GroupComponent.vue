<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <article
      class="group"
    >
      <header>
        <h3 class="name">
          {{ group.name }}
        </h3>
        <!-- <h3 class="members">
          {{ group.members }}
        </h3> -->
        <h4 class="members">
            Members:
        </h4>
        <div v-for="member in group.members" class="members">
            {{member}}
        </div>
      </header>
    </article>
  </template>
  
  <script>
  export default {
    name: 'GroupComponent',
    props: {
      // Data from the stored freet
      group: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        members: [],
      };
    },
    methods: {
      startEditing() {
        /**
         * Enables edit mode on this freet.
         */
        this.editing = true; // Keeps track of if a freet is being edited
        this.draft = this.freet.content; // The content of our current "draft" while being edited
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
          this.$store.commit('refreshGroups');
  
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      },
    },
  };
  </script>
  
  <style scoped>
 .group {
    box-shadow: 0px 0px 8px rgb(240, 240, 240);
    border-radius: 10px;
    padding: 20px;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: white;
}
.name {
    margin-bottom: 20px;
}
.members {
    font-size: 20px;
}
  </style>
  