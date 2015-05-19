ns.ViewCollection.define('listTodo', {
    models: ['listTodo'],
    split: {
        byModel: 'listTodo',
        intoViews: 'todo'
    }
});