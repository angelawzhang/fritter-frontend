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
        <GetGroupsForm
            ref="getGroupsForm"
            value="groups"
            placeholder="🔍 Filter by group"
            button="🔄 Get groups"
        />
      </section>
      <section
        v-if="$store.state.groups.length"
      >
        <GroupComponent
          v-for="group in $store.state.groups"
          :key="group.id"
          :group="group"
        />
      </section>
    </main>
  </template>
  
  <script>
  import CreateGroupForm from '@/components/Groups/CreateGroupForm.vue';
  import AddGroupMemberForm from '@/components/Groups/AddGroupMemberForm.vue';
  import GroupComponent from '@/components/Groups/GroupComponent.vue';
  import GetGroupsForm from '@/components/Groups/GetGroupsForm.vue';
  
  export default {
    name: 'GroupsPage',
    components: {
      CreateGroupForm,
      AddGroupMemberForm,
      GroupComponent,
      GetGroupsForm
    },
    mounted() {
        this.$refs.getGroupsForm.submit();
    }
  };
  </script>
  