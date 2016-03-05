var taskDS = function () {


    return {
        taskAktualisieren: taskAktualisieren,
        taskLoeschen: taskLoeschen,
        neuenTaskHinzufuegen: neuenTaskHinzufuegen,
        updateTask: updateTask,
        projektListeLaden: projektListeLaden,
        TasklisteLaden:TasklisteLaden
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

        var id = parseInt(Math.random() * 1000000);
        return id;
    }


    /**
     * Löscht einen Task anhand der übergebenen ID
     * @param taskId (id) ID eines Tasks
     */
    function taskLoeschen(taskId) {
        //TODO: Server über Löschen benachrichtigen
        $.ajax({
            type:"POST",
            url:"/api/deleteTask.php",
            data:{task:taskId},
            success: function (r) {
                console.log(taskId + ' wurde gelöscht');
            },
            error: function (err) {
                console.dir(err)
            }
        });
    };


    function taskAktualisieren(task, zielzustand) {
        //TODO: Daten an den Server senden
        //Todo:: sende die daten an den Server
        console.dir(arguments);
    }

    
    function projektListeLaden(callback) {
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'data/projektliste.json',
            success: function (projektJson) {

                projektJson.forEach(function (element) {
                    var $option = $('<option/>', {
                        value: element.id,
                        html: element.label
                    });
                    $('.projektauswahl').append($option);
                });
                
                callback(projektJson);
                
            },
            error: function () {
                alert("Der Server ist kapputt");
            }
        });
    };

    function TasklisteLaden(projektListe, callback) {

        if (projektListe === "-1") {
            // Auf projektseite wechseln
            window.location.href = "projekt.html";


        } else {
            unserAktuellesProjekt = projektListe;

            $.ajax({
                type: 'GET',
                dataType: "json",
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

