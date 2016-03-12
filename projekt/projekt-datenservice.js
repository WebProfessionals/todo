todo.projektDS = function () {
    'use strict';

    return {
        create: create,
        update: update

    };

    function update(projektid, name, callback) {
     // mit ajax an den server senden
    }

    function create(name, callback) {

        $.ajax({
            url: "/api/projekt.php?method=create",
            data: {name: name},
            type: 'POST',
            dataType: "json",
            success: callback
        });


    }
}();