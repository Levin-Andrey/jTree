var nodes = {};

$.getJSON('data.php', function(data) {
    nodes = parseMMObject(data);
});

function parseMMObject(object) {
    var node_list = {};
    function parseNode(object, parent_id) {
        var id = object['@attributes'].ID;
        node_list[id] = {
            text: object['@attributes'].TEXT,
            parent_id: parent_id
        };
        if (object.hasOwnProperty('node')) {
            if (Array.isArray(object.node)) { //if object has more then one child
                var child_nodes = object.node;
                for (var i in child_nodes) {
                    parseNode(child_nodes[i], id);
                }
            } else {
                parseNode(object.node, id);
            }
        }
    }
    parseNode(object.node); //getting list of linked nodes
    for (var i in node_list) { //finding children
        var node = node_list[i];
        node.children = [];
        if (node.parent_id) {
            var parent_node = node_list[node.parent_id];
            if (parent_node.hasOwnProperty('children')) parent_node.children.push(i);
            else parent_node.children = [i];
        }
    }
    for (var i in node_list) { //getting results
        node = node_list[i];
        if (node.children.length == 0) {
            parent_node = node_list[node.parent_id];
            parent_node.result = node.text;
        }
    }
    for (var i in node_list) { //converting nodes to answers
        node = node_list[i];
        if (node.children.length == 1) {
            parent_node = node_list[node.parent_id];
            if (!parent_node.hasOwnProperty('answers')) parent_node.answers = [];
            var answer = {};
            answer.text = node.text;
            if (!node.result) answer.link = node.children[0];
            else answer.result = node.result;
            parent_node.answers.push(answer);
        }
    }
    for (var i in node_list) { // deleting trash
        node = node_list[i];
        node.id = i;
        if (!node.answers) delete node_list[i];
        else delete node_list[i].children;
    }
    return node_list;
}