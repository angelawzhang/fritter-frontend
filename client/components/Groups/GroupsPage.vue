<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
    <main>
      <section>
        <header>
          <h2>Fritter Groups</h2>
        </header>
        <CreateGroupForm />
        <AddGroupMemberForm />
      </section>
      <!-- <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="group in $store.state.groups"
          :key="freet.id"
          :freet="freet"
        />
      </section> -->
    </main>
  </template>
  
  <script>
  import CreateGroupForm from '@/components/Groups/CreateGroupForm.vue';
  import AddGroupMemberForm from '@/components/Groups/AddGroupMemberForm.vue';
  
  export default {
    name: 'GroupsPage',
    components: {
      CreateGroupForm,
      AddGroupMemberForm,
    }
  };
  </script>
  