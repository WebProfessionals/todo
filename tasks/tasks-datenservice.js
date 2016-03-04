var taskDS = function () {


    return {
        taskAktualisieren: taskAktualisieren,
        taskLoeschen: taskLoeschen,
        neuenTaskHinzufuegen: neuenTaskHinzufuegen,
        updateTask: updateTask,
        projektListeLadenUndAufbauen: projektListeLadenUndAufbauen,
        dieRiesengrosseListeDynamischLaden:dieRiesengrosseListeDynamischLaden
    };

    /**
     * Aktualisiert den Task auf dem Server
     * @param id (id) ID des Tasks
     * @param text (string) Neuer Text vom Task
     */
    function updateTask(id, text) {
        //TODO:: änderung an den Server schicken
        console.log(id, text);
    }

    /**
     * Fügt einen neuen Task auf dem Server hinzu
     * @param task (string) Text vom Task
     * @returns {Number} (id) die ID des Tasks
     */
    function neuenTaskHinzufuegen(task) {
        //TODO:: daten an server schicken und ID auswerten und das ding mit der Zufallszahl entfernen!!!!
        // var id = addTask(task,unserAktuellesProjekt) <-id
        var id = parseInt(Math.random() * 1000000);

        return id;
    }

    function taskLoeschen(taskId) {
        //TODO: Server über Löschen benachrichtigen
        console.log(taskId + ' wurde gelöscht');
    };


    function taskAktualisieren(task, zielzustand) {
        //TODO: Daten an den Server senden
        //Todo:: sende die daten an den Server
        console.dir(arguments);
    }

    function projektListeLadenUndAufbauen(callback) {
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
                
                callback(projektliste);


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

    function dieRiesengrosseListeDynamischLaden(projektListe, callback) {

        if (projektListe === "-1") {
            // Auf projektseite wechseln
            window.location.href = "projekt.html";


        } else {
            unserAktuellesProjekt = projektListe;

            $.ajax({
                type: 'GET',
                url: 'data/' + projektListe + '.json',
                success: function (jsonBody) {
                    callback('#taskliste',jsonBody);

                },
                error: function (error) {
                    alert('nicht gefunden');
                }
            });
        }
    }
}();

