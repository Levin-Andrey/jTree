$(function() {
    var $cnt = $("#cnt");
    var $history = $("#history");
    loadNode(null);
    var history = [];

    $history.on('click', ".history_link", function() {
        var ids = $(this).attr('id').split('_');
        var node_id = ids[0];
        var choice;
        while (!choice || choice[0] != node_id) {
            choice = history.pop();
        }
        loadNode(choice[0]);
        logHistory();
    });

    $("#back").click(function() {
        var last = history.pop();
        loadNode(last[0]);
        logHistory();
    });

    $("#new_site").click(function() {
        history = [];
        $history.html('');
        loadNode();
    });

    $cnt.on("click", 'button', function() {
        var button_id = $(this).attr('id');
        var node_id = $cnt.find('p').attr('id');
        history.push([node_id, button_id]);
        logHistory();
        var node = nodes[node_id];
        var answer = node.answers[button_id];
        if (answer.link) {
            loadNode(answer.link);
        } else {
            $cnt.text(answer.result);
        }
    });

    function logHistory() {
        $history.html('');
        for (var i in history) {
            var choice = history[i];
            var node = nodes[choice[0]];
            var answer = node.answers[choice[1]];
            var $link = $('<a />', {
                id: choice[0] + '_' + choice[1],
                text: node.text + ' ' + answer.text,
                href: '#',
                class: 'history_link'
            });
            $li = $('<li />').append($link);
            $('#history').append($li);
        }
    }

    function loadNode(id) {
        if ($.isEmptyObject(nodes)) {
            setTimeout(function() {loadNode(id)}, 100);
            return;
        }
        $cnt.html('');
        var node;
        if (!id) node = getTopNode();
        else node = nodes[id];
        if (!node) {
            $cnt.text('Broken link ' + id);
            return null;
        }
        $('<p/>', {id: node.id, text: node.text}).appendTo($cnt);
        for (var i in node.answers) {
            $('<button/>', {id: i, text: node.answers[i].text}).appendTo($cnt);
        }
    }
    function getTopNode() {
        for (var i in nodes) {
            if (!nodes[i].parent_id) return nodes[i];
        }
    }
});