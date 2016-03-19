todo.projektDS = function () {
    'use strict';

    return {
        create: create,
        update: update,
        deleteProjekt: deleteProjekt,
        projektListeLaden:projektListeLaden

    };

    function deleteProjekt(projektid, callback) {
     // mit ajax an den server senden
        $.ajax({
            url: '/api/projekt.php?method=delete',
            data: {name: name, projektId:projektid},
            type: 'POST',
            
            success: callback
        });
    }

    function update(projektid, name, callback) {
     // mit ajax an den server senden
        $.ajax({
            url: '/api/projekt.php?method=update',
            data: {name: name, projektId:projektid},
            type: 'POST',
            dataType: 'json',
            success: callback
        });

    }

    function create(name, callback) {

        $.ajax({
            url: '/api/projekt.php?method=create',
            data: {name: name},
            type: 'POST',
            dataType: 'json',
            success: callback
        });


    }

    function projektListeLaden(callback) {
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'api/projekt.php?method=list',
            success: callback,
            error: function () {
                alert("Der Server ist kapputt");
            }
        });
    };
}();