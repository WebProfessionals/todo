$(document).ready(function () {
    'use strict';
    projektListeLadenUndAufbauen();
    //init


    $('.projektauswahl').on('change', listeSetzen);

    function listeSetzen() {
        dieRiesengrosseListeDynamischLaden($(this).val());
    }

    function projektListeLadenUndAufbauen() {
        $.ajax({
            type: 'GET',
            url: 'data/projektliste.json',
            success: function (projektliste) {
                dieRiesengrosseListeDynamischLaden(projektliste[0].id);
                projektliste.forEach(function (element) {

                    var $option = $('<option/>', {
                        value: element.id,
                        html: element.label
                    });
                    $('.projektauswahl').append($option);
                })
            },
            error: function () {
                alert("Der Server ist kapputt");
            }
        });
    };

    function dieRiesengrosseListeDynamischLaden(liste) {
        $.ajax({
            type: 'GET',
            url: 'data/' + liste + '.json',
            success: function (jsonBody) {
                TasklisteAktualisieren('#taskliste', jsonBody);
            },
            error: function (error) {
                alert('nicht gefunden');
            }
        });
    }


    /**
     * Aktualisiert eine Liste
     * @param selector (selector) Selektor für Zielelement and das die li angehängt werden
     * @param daten (json) Daten
     */
    function TasklisteAktualisieren(selector, daten) {
        var $taskliste = $(selector);
        $taskliste.find('li').remove();
        daten.tasks.forEach(function (element) {

            var $task = $('<li/>', {
                html: element.task,
                class: istDerTaskErledigt(),
                "data-taskid": element.id,
                "data-erledigt": element.erledigt
            });

            function istDerTaskErledigt() {
                if (element.erledigt) {
                    return 'erledigt';
                }
                return 'offen';
            }

            $taskliste.append($task);
        });
    }

    $('#taskliste').on('click', function (event) {
        var $task = $(event.toElement);
        var taskId = $task.data('taskid');

        var neuerZustand = !$task.data('erledigt');

        $task.data('erledigt', neuerZustand);
        $task.toggleClass('erledigt');
        taskAktualisieren(taskId, neuerZustand);
    });


    function taskAktualisieren(task, zielzustand) {
        //TODO: Daten an den Server senden
    //Todo:: sende die daten an den Server
        console.dir(arguments);
    }

});