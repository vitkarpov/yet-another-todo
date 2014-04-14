ns.Model.define('todo', {
    params: {
        id: null
    },
    defaults: {
        title: 'Conquer the world',
        done: 'false'
    },
    methods: {
        sync: function() {
            ns.request('do-todo', {
                id: this.params.id,
                title: this.get('.title'),
                done: this.get('.done')
            });
        }
    }
});