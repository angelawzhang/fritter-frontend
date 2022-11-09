<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFreetsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.groupFilter};
  },
  methods: {
    async submit() {
      const url = this.value ? `/api/groups?name=${this.value}` : '/api/groups';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        console.log(res);
        this.$store.commit('updateGroupFilter', this.value);
        this.$store.commit('updateGroups', res);
      } catch (e) {
        if (this.value === this.$store.state.groupFilter) {
          // This section triggers if you filter to a user but they
          // change their genre when you refresh
          this.$store.commit('updateGroupFilter', null);
          this.value = ''; // Clear filter
          this.$store.commit('refreshGroups');
        } else {
          // Otherwise reset to previous genre
          this.value = this.$store.state.groupFilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
