<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <header>
      <h3 class="author">
        @{{ freet.author }}
      </h3>
    </header>
    <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    />
    <p
      v-else
      class="content"
    >
      {{ freet.content }}
    </p>
    <p class="info">
      Posted at {{ freet.dateModified }}
      <i v-if="freet.edited">(edited)</i>
    </p>
    <div>
      <div
        class="left"
      >
        <h3 class="likesCount">{{ likes }} ❤️</h3>
        <b-button @click="likeFreet" variant="outline-primary">
          Like
        </b-button>
      </div>
    </div>
      <div
        v-if="$store.state.username === freet.author"
        class="actions"
      >
        <b-button
          v-if="editing"
          variant="outline-primary"
          @click="submitEdit"
        >
          ✅ Save changes
        </b-button>
        <b-button
          v-if="editing"
          variant="outline-primary"
          @click="stopEditing"
        >
          🚫 Discard changes
        </b-button>
        <b-button
          v-if="!editing"
          variant="outline-primary"
          @click="startEditing"
        >
          ✏️ Edit
        </b-button>
        <b-button @click="deleteFreet" variant="outline-primary">
          🗑️ Delete
        </b-button>
      </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'FreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draft: this.freet.content, // Potentially-new content for this freet
      alerts: {}, // Displays success/error messages encountered during freet modification
      likes: 0 // Number of likes
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
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draft = this.freet.content;
    },
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    likeFreet() {
      /**
       * Likes this freet.
       */
      const params = {
        method: 'PUT',
        body: JSON.stringify({username: this.$store.state.username}),
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully liked freet!', status: 'success'
          });
        }
      };
      this.likesRequest(params);
    },
    async getLikes(freetId) {
      /**
       * Gets the number of likes.
       */
      const url = `/api/likes?freetId=${freetId}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        return res[0].likes.length;
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
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
    async likesRequest(params) {
      /**
       * Submits a request to the likes's endpoint
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
        const r = await fetch(`/api/likes/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshFreets');
        // const r_likes = await fetch(`/api/likes?freetId=${this.freet._id}`, options);
        this.likes += 1;
        // this.likes = r_likes[0].likes.length;
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  },
  async mounted() {
    this.likes = await this.getLikes(this.freet._id);
  }
};
</script>

<style scoped>
.freet {
    box-shadow: 0px 0px 8px rgb(240, 240, 240);
    border-radius: 10px;
    padding: 20px;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: white;
}
.left {
  display: flex;
	align-items: left;
  padding-bottom: 20px;
}
.likesCount {
  margin-right: 20px;
}

.actions {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}
.content {
  padding-top: 5px;
  font-size: 30px;
}
.info {
  color: gray;
}
.author {
  color: black;
  font-size: 20px;
}
</style>
