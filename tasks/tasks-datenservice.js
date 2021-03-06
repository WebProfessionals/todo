todo.taskDS = function () {
'use strict';

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
     * @param projekt (id) name des Projekts
     * @param taskID (id) ID des Tasks
     * @param text (string) Neuer Text vom Task
     */
    function updateTask(projekt, taskID, text, callback) {
        
        $.ajax({
            type: 'POST',
            dataType: "json",
            data:{listeID:projekt,task:text,taskID:taskID},
            url: 'api/task.php?method=update',
            success: function (r) {
                callback(r);
            },
            error: function (error) {
                alert(error);
            }
        });
    }


   

    /**
     * Fügt einen neuen Task auf dem Server hinzu
     * @param task (string) Text vom Task
     * @returns {Number} (id) die ID des Tasks
     */
    function neuenTaskHinzufuegen(projekt,text,callback) {
        $.ajax({
            type: 'GET',
            dataType: "json",
            data:{listeID:projekt,task:text},
            url: 'api/task.php?method=create',
            success: function (jsonBody) {
                callback(jsonBody.id);

            },
            error: function (error) {
                alert(error);
            }
        });
    }


    /**
     * Löscht einen Task anhand der übergebenen ID
     * @param taskId (id) ID eines Tasks
     */
    function taskLoeschen(projekt,taskId) {
        //TODO: Server über Löschen benachrichtigen
        $.ajax({
            type:"POST",
            data:{listeID:projekt,taskID:taskId},
            url: 'api/task.php?method=delete',
            success: function (r) {
                console.log(taskId + ' wurde gelöscht');
            },
            error: function (err) {
                console.dir(err)
            }
        });
    };


    
        function taskAktualisieren(projekt, taskID, erledigt, callback) {

            $.ajax({
                type: 'POST',
                dataType: "json",
                data:{listeID:projekt,istErledigt:erledigt,taskID:taskID},
                url: 'api/task.php?method=check',
                success: function (r) {
                    if(todo.isFunction(callback)){
                        callback(r);
                    }
                },
                error: function (error) {
                    alert(error);
                }
            });
        }

    
    function projektListeLaden(callback) {
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: 'api/projekt.php?method=list',
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
    /**
     * Ladet eine Taskliste vom Server
     * @param projektListe (id) Id einer Liste (im Moment ein String :-( )
     * @param callback (function) Die Funktion die ausgeführt wird wenn wir die Liste bekommen haben
     * @constructor
     */
    function TasklisteLaden(projektListe, callback) {

        if (projektListe === "-1") {
            // Auf projektseite wechseln
            window.location.href = "projekt.html";


        } else {
            var unserAktuellesProjekt = projektListe;
            $.ajax({
                type: 'GET',
                dataType: "json",
                data:{id:projektListe},
                url: 'api/task.php?method=list',
                success: function (jsonBody) {
                    callback(jsonBody);

                },
                error: function (error) {
                    alert('nicht gefunden');
                }
            });
        }
    }
}();

