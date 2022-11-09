<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'AddGenreForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.selectedGenre};
  },
  methods: {
    async submit() {
    console.log(this.value);
    this.$store.state.selectedGenre = this.value;
    if (this.value != "") {
        const url = '/api/feed';
        const params = {
            method: 'PUT',
            body: JSON.stringify({genre: this.value}),
            callback: () => {
            this.$store.commit('alert', {
                message: 'Successfully added genre!', status: 'success'
            });
            }
        };
        const options = {
            method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
            options.body = params.body;
        }
        try {
            const r = await fetch(url, options);
            const res = await r.json();
            if (!r.ok) {
            throw new Error(res.error);
            }

            this.$store.commit('updateGenre', this.value);
            this.$store.commit('updateFreets', res);
            console.log(res);
        } catch (e) {
        }
    }
    
    }
  }
};
</script>
