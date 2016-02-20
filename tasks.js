$(document).ready(function () {
    'use strict';

    var modus = 'work';

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

    function neuenTaskHinzufuegen(task) {
        //TODO:: daten an server schicken und ID auswerten und das ding mit der Zufallszahl entfernen!!!!
        // var id = addTask(task,unserAktuellesProjekt) <-id
        var id = parseInt(Math.random() * 1000000);

        var $task = taskRendern({'task': task, id: id, erledigt: false, faelligAm: null});

        $('#taskliste').append($task);
    }


    function listeSetzen() {
        window.location.href = "index.html?projekt=" + $(this).val();

    }

    function projektListeLadenUndAufbauen() {
        $.ajax({
            type: 'GET',
            url: 'data/projektliste.json',
            success: function (projektliste) {

                projektliste.forEach(function (element) {

                    var $option = $('<option/>', {
                        value: element.id,
                        html: element.label
                    });
                    $('.projektauswahl').append($option);
                });

                // Vorausgesetztes Projekt ermitteln
                var projekt = getParameterByName('projekt');
                if (projekt) {
                    // dropdown auf gewähltes Projekt setzen
                    $('.projektauswahl').val(projekt);
                } else {
                    projekt = projektliste[0].id;
                }

                dieRiesengrosseListeDynamischLaden(projekt);

                // Absprungpunkt einfügen
                var $option = $('<option/>', {
                    value: -1,
                    html: 'Projektliste bearbeiten'
                });
                $('.projektauswahl').append($option);

            },
            error: function () {
                alert("Der Server ist kapputt");
            }
        });
    };

    function dieRiesengrosseListeDynamischLaden(projektListe) {

        if (projektListe === "-1") {
            // Auf projektseite wechseln
            window.location.href = "projekt.html";


        } else {
            unserAktuellesProjekt = projektListe;

            $.ajax({
                type: 'GET',
                url: 'data/' + projektListe + '.json',
                success: function (jsonBody) {

                    TasklisteAktualisieren('#taskliste', jsonBody);
                },
                error: function (error) {
                    alert('nicht gefunden');
                }
            });
        }
    }


    function taskRendern(taskElement) {
        var $task = $('<li>', {
            html: taskElement.task,
            class: istDerTaskErledigt(),
            "data-taskid": taskElement.id,
            "data-erledigt": taskElement.erledigt,
            contenteditable: true
        });

        $task.prepend('<span class="icon"></span>');

        function istDerTaskErledigt() {
            if (taskElement.erledigt) {
                return 'erledigt';
            }
            return 'offen';
        }

        return $task;
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

            var $task = taskRendern(element);
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


        if ($task.is('span') && modus === 'work') {
            // Aufgabe erledigt
            $task = $task.parent();
            var taskId = $task.data('taskid');
            var neuerZustand = !$task.data('erledigt');
            $task.data('erledigt', neuerZustand);
            $task.toggleClass('erledigt');
            taskAktualisieren(taskId, neuerZustand);
        }

        if ($task.is('span') && modus === 'edit') {
            // wir löschen den task
            $task = $task.parent();
            var taskId = $task.data('taskid');
            taskLoeschen(taskId);
            $task.remove();

        }
    });

    function taskLoeschen(taskId) {
        //TODO: Server über Löschen benachrichtigen
        console.log(taskId + ' wurde gelöscht');
    };

    function taskAktualisieren(task, zielzustand) {
        //TODO: Daten an den Server senden
        //Todo:: sende die daten an den Server
        console.dir(arguments);
    }


    function getParameterByName(name) {
        var regexS = "[\\?&]" + name + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(window.location.search);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }

    function getHashParameterByName(name) {

    }


});