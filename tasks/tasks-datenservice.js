var taskDS = function () {


    return {
        taskAktualisieren:taskAktualisieren,
        taskLoeschen:taskLoeschen
    };


    function taskLoeschen(taskId) {
        //TODO: Server über Löschen benachrichtigen
        console.log(taskId + ' wurde gelöscht');
    };


    function taskAktualisieren(task, zielzustand) {
        //TODO: Daten an den Server senden
        //Todo:: sende die daten an den Server
        console.dir(arguments);
    }
}();
