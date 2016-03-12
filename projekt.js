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
        dataType: "json",
        url: 'data/projektliste.json',
        success: projektlisteParsen,
        error: function () {
            alert("Der Server ist kapputt");
        }
    });


    function projektlisteParsen(jsondata) {

        jsondata.forEach(function (e) {
            addProjekt(e.label, e.id, e.alleTasksErledigt);
        });
    }

    /**
     * Fügt ein Projekt der Liste hinzu (nur UI)
     * @param label
     * @param id
     * @param erledigt (bool) Indikator der anzeigt ob alle Tasks in diesem Projekt erledigt sind
     *
     */
    function addProjekt(label, id, erledigt) {

        label = label || 'unbekannt'; // wir geben dem label den defaultwert unbekannt

        var $projekt = $('<li/>', {
            contenteditable: true,
            html: label,
            id: id,
            class: (erledigt) ? 'allesErledigt' : ''
        }); // ternary operator, siehe https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

        var $icon = $('<span/>', {class: 'icon'});
        $projekt.prepend($icon);
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
    function projektAdden(projektname) {
        //TODO:: projektname an den Server senden
        todo.projektDS.create(projektname,callback);
        function callback(data) {
            var id = data.id;
            addProjekt(projektname, id);
        }
        
    }


    $projektliste.on('keypress', function (event) {
        // Wenn enter gedrückt wird...
        if (event.charCode === 13) {
            event.preventDefault(); // event nicht weiter geben
            var $projekt = $(event.target); // auf welchem element ist es passiert
            var idVomProjekt = $projekt.attr('id');


            var neuerName = $projekt.text();
            //TODO:: änderung an den Server schicken

        }
    });

    // wenn wir auf ein Projekt clicken
    $projektliste.on('click', function (event) {

        // ermitteln wir das projekt
        var $projekt = $(event.target).parent();
        // und. die Projektid attr('id')
        var projektID = $projekt.attr('id');

        // und wir im modus "edit" sind und auf den Kübel drücken (span)
        if (modus === 'edit' && $(event.target).is('span.icon')) {

            // wir teilen dem Server mit, dass er das Projekt löschen soll
            projektLoeschen(projektID);
            // wir entfernen das Projekt aus der liste
            $projekt.remove();
        }


        if (modus === 'work' && $(event.target).is('span.icon')) {
            // wir leiten auf die index page um
            window.location.href = "index.html?projekt=" + projektID;
        }


    });

    function projektLoeschen(projektID) {
        //TODO: Info an server senden, er soll bitte das Projekt mit der entsprechenden ID löschen
    }

});