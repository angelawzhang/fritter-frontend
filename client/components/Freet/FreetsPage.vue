<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>
    <section v-if="$store.state.username">
      <header>
        <div class="left">
          <h2>
            Viewing all freets
            <span v-if="$store.state.selectedGenre">
              in the {{ $store.state.selectedGenre }} genre
            </span>
          </h2>
        </div>
        <div class="right">
        </div>
      </header>
      <header>
        <div class="left">
          <GenreComponent :selectedGenre="$store.state.selectedGenre"/>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="genre"
            placeholder="🔍 Find genre"
            button="🔄 Get freets"
          />
        </div>
      </header>
      
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import GenreComponent from '@/components/Freet/GenreComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import AddGenreForm from '@/components/Freet/AddGenreForm.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, GenreComponent, GetFreetsForm, CreateFreetForm, AddGenreForm},
  mounted() {
    this.$refs.getFreetsForm.submit();
  }
};
</script>

<style scoped>
main {
  margin-left: 100px;
  margin-right: 100px;
}

section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    /* margin-bottom: 20px; */
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
