<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddGroupMemberForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/groups',
      method: 'PUT',
      hasBody: true,
      fields: [
        {id: 'groupId', label: 'Group ID', value: ''},
        {id: 'username', label: 'Username', value: ''}
      ],
      title: 'Add a group member',
      refreshGroups: true,
      callback: () => {
        const message = 'Successfully added a group member!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
