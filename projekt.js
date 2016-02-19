$(document).ready(function () {
    'use strict';

    //add back link
    var $link = $("<a/>", {href: './index.html', text: 'zurück zu Tasks'});
    $("body").prepend($link);

    var $projektliste = $('#projektliste');

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

        jsondata.forEach(function (e) {
            addProjekt(e.label,e.id);
        });
    }

    /**
     * Fügt ein Projekt der Liste hinzu (nur UI)
     * @param label
     * @param id
     */
    function addProjekt(label,id) {
        var $projekt = $('<li/>', {'contenteditable': true, html: label, id: id});
        var $bullet = $('<span/>', {class: 'bullet'});
        $projekt.prepend($bullet);
        $projektliste.append($projekt);
    }

    // Auf  Input Feld ...
    $('.eingabe').on('keypress', function (e) {
        // bei drücken von Enter (Zeichen #13) soll dieser eingegebene Text in die Liste angehängt werden
        if (e.charCode === 13) {
            projektAdden(this.value);
            // und das Eingabefeld wieder leer sein
            this.value = '';
        }
    });

    // Projekt an server schicken und in die Liste eintragen
    function projektAdden(projektname){
        //TODO:: projektname an den Server senden
        var id = projektname;
        addProjekt(projektname, id);
    }




    $projektliste.on('keypress', function (event) {
        // Wenn enter gedrückt wird...
        if (event.charCode === 13) {
            event.preventDefault(); // event nicht weiter geben
            var $projekt = $(event.target); // auf welchem element ist es passiert
            var idVomProjekt = $projekt.attr('id');
            console.dir($projekt);

            var neuerName = $projekt.text();
            //TODO:: änderung an den Server schicken
            console.dir(idVomProjekt + ', ' + neuerName);

        }
    });
});