todo.projektDS = function () {
    'use strict';

    return {create:create};

    function create(name,callback) {

        $.ajax({
            url:"/api/projekt.php?method=create",
            data:{name:name},
            type: 'POST',
            dataType: "json",
            success:callback
        });



    }
}();