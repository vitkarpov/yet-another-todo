ns.Model.define('listTodo', {
    split: {
        items: '.todos',
        model_id: 'todo',
        params: {
            id: '.id'
        }
    }
});