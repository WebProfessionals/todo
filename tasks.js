$(document).ready(function () {
    'use strict';

    var modus = 'work';

    // Vorausgesetztes Projekt ermitteln
    var projekt = getParameterByName('projekt');
    
    
    //init
    taskDS.projektListeLaden( function (serverAntwort) {
        if (projekt) {
            // dropdown auf gewähltes Projekt setzen
            $('.projektauswahl').val(projekt);
        } else {
            projekt = serverAntwort[0].id;
        }

        // Absprungpunkt einfügen
        var $option = $('<option/>', {
            value: -1,
            html: 'Projektliste bearbeiten'
        });
        $('.projektauswahl').append($option);

        taskDS.TasklisteLaden(projekt,TasklisteAktualisieren);
        
    });
    

    $('.projektauswahl').on('change', listeSetzen);


    $('.eingabe').on('keypress', function (e) {
        // Wenn enter gedrückt wird...
        if (e.charCode === 13) {

            var text = this.value;
            var id = taskDS.neuenTaskHinzufuegen(projekt,text,function (id) {
                var $task = taskRendern({'task': text, id: id, erledigt: false, faelligAm: null});
                $('#taskliste').append($task);
            });
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

    


    function listeSetzen() {
        window.location.href = "index.html?projekt=" + $(this).val();

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
    function TasklisteAktualisieren(daten) {
        var $taskliste = $('#taskliste');
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
            taskDS.updateTask(projekt,idvomTask,neuerTextvomTask,function (r) {
                $('.eingabe').focus();
            });
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
            taskDS.taskAktualisieren(projekt,taskId, neuerZustand);
        }

        if ($task.is('span') && modus === 'edit') {
            // wir löschen den task
            $task = $task.parent();
            var taskId = $task.data('taskid');
            taskDS.taskLoeschen(projekt,taskId);
            $task.remove();

        }
    });

 
    

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
        var regexS = "[\\?&#]" + name + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(window.location.hash);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }


});