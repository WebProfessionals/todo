<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 12.03.16
 * Time: 11:58
 */

$projektId = $_REQUEST['projektId'];
$projektName = $_REQUEST['name'];

// Projektliste aktualisieren
// datei lesen und in array umwandeln
$projektliste = json_decode(file_get_contents("../data/projektliste.json"),true);
// array durchgehen und element mit der richtigen Id finden und dort den neuen Namen eintragen
foreach($projektliste as $i => $element){
    if($element["id"] == $projektId){
        $projektliste[$i]["label"] = $projektName;
    }
}
// Datei als string wieder sichern
file_put_contents("../data/projektliste.json",json_encode($projektliste));




// Taskliste aktualisieren
$taskliste = json_decode(file_get_contents("../data/{$projektId}.json"),true);
$taskliste['projektname']=$projektName;
file_put_contents("../data/{$projektId}.json",json_encode($taskliste));