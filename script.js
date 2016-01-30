$(document).ready(function () {
    'use strict';
    projektListeLadenUndAufbauen();
    //init
    var unserAktuellesProjekt;

    $('.projektauswahl').on('change', listeSetzen);


    $('.eingabe').on('keypress', function (e) {
        // Wenn enter gedrückt wird...
        if (e.charCode === 13) {
            neuenTaskHinzufuegen(this.value);


            this.value = '';
        }
    });

    function neuenTaskHinzufuegen(task) {
        //TODO:: daten an server schicken und ID auswerten und das ding mit der Zufallszahl entfernen!!!!
        // var id = addTask(task,unserAktuellesProjekt) <-id
        var id = parseInt(Math.random() * 1000000);

        var $task = $('<li/>', {
            html: task,
            class: 'offen',
            "data-taskid": id,
            "data-erledigt": false,
            contenteditable: true
        });

        $task.prepend('<span></span>');

        $('#taskliste').append($task);
    }


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
        unserAktuellesProjekt = liste;

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
                "data-erledigt": element.erledigt,
                contenteditable: true
            });

            $task.prepend('<span></span>');


            function istDerTaskErledigt() {
                if (element.erledigt) {
                    return 'erledigt';
                }
                return 'offen';
            }

            $taskliste.append($task);
        });
    }

    $('#taskliste').on('keypress', function (event) {


        // Wenn enter gedrückt wird...
        if (event.charCode === 13) {
            event.preventDefault();
            var $task = $(event.target);
            var neuerTextvomTask = $task[0].innerText;
            var idvomTask = $task.data('taskid');

            //TODO:: änderung an den Server schicken

        }
    });

    $('#taskliste').on('click', function (event) {
        var $task = $(event.toElement);

        if ($task.is('span')) {
            // Aufgabe erledigt
            $task = $task.parent();
            var taskId = $task.data('taskid');
            var neuerZustand = !$task.data('erledigt');
            $task.data('erledigt', neuerZustand);
            $task.toggleClass('erledigt');
            taskAktualisieren(taskId, neuerZustand);

        } else {


        }


    });


    function taskAktualisieren(task, zielzustand) {
        //TODO: Daten an den Server senden
        //Todo:: sende die daten an den Server
        console.dir(arguments);
    }


});