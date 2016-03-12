todo.projektDS = function () {
    'use strict';

    return {
        create: create,
        update: update

    };

    function update(projektid, name, callback) {
     // mit ajax an den server senden
        $.ajax({
            url: "/api/projekt.php?method=update",
            data: {name: name, projektId:projektid},
            type: 'POST',
            dataType: "json",
            success: callback
        });

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