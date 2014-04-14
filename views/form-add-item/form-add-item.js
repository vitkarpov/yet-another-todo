ns.View.define('formAddItem', {
    events: {
        'ns-view-htmlinit'    : 'onhtmlinit',
        'ns-view-htmldestroy' : 'onhtmldestroy',
        'submit .js-form'     : 'onSubmit'
    },
    methods: {
        onhtmlinit: function() {
            this.input = this.node.querySelector('.js-input-title');
            this.todos = ns.Model.get('listTodo');
            this._update = this.update.bind(this);
            this.todos.on('ns-model-insert', this._update);
        },
        onhtmldestroy: function() {
            this.todos.off('ns-model-insert', this._update);
        },
        onSubmit: function(e) {
            e.preventDefault();

            this._todo = ns.Model.get('todo', {id: this.todos.models.length + 1});
            this._todo.setData({
                title: this.input.value || 'Yep!',
                done: 'false'
            });

            this.todos.insert(this._todo);
        },
        update: function() {
            if (this._todo) {
                this._todo.sync();
            }
            ns.page.go();
        }
    }
});