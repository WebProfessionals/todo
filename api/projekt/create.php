<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 12.03.16
 * Time: 10:29
 */

$projektname = strip_tags($_REQUEST['name']);

// projektcounter laden
$counterfile = "../geheim/projektcounter";
$projektcounter = intval(file_get_contents($counterfile));
$pljson = "../data/projektliste.json";

// in projektliste.json das neue Projekt einfügen
$projektliste = json_decode(file_get_contents($pljson), true);
$projektliste[] = array("id" => $projektcounter, "label" => $projektname, "alleTasksErledigt" => false);
file_put_contents($pljson, json_encode($projektliste));


// eine leere taskliste erstellen
umask(0);
$taskliste = json_encode(array("projektname" =>$projektname,  "tasks"=> array(), "idcounter" => 1 ));
file_put_contents("../data/{$projektcounter}.json",$taskliste);


// neuen projektcounter speichern
file_put_contents($counterfile, ++$projektcounter);

// id oder ganze liste zurückgeben
