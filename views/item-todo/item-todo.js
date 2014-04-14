ns.View.define('todo', {
    models: ['todo'],
    events: {
        'change .js-check' : 'onItemChange'
    },
    methods: {
        onItemChange: function(e) {
            this.models.todo.set('.done', e.target.checked);
            this.models.todo.sync();
        }
    }
});