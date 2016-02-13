$(document).ready(function () {
    'use strict';


    var modus = 'work';

    $('#modeswitcher').on('click', function () {

        $('body').removeClass();
        // Modus umschalten
        if (modus === 'work') {
            modus = 'edit';
        } else {
            modus = 'work';
        }
        $('body').addClass(modus);

    });

    // Projektliste laden
    $.ajax({
        type: 'GET',
        url: 'data/projektliste.json',
        success: projektlisteParsen,
        error: function () {
            alert("Der Server ist kapputt");
        }
    });

    function projektlisteParsen(jsondata) {
        var $projektliste = $('#projektliste');
        jsondata.forEach(function (e) {

            var $projekt = $('<li/>', {'contenteditable': true, html: e.label, id: e.id});
            var $bullet = $('<span/>', {class: 'bullet'});

            $projekt.prepend($bullet);

            $projektliste.append($projekt)
        });
    }

});