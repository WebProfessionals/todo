<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 05.03.16
 * Time: 11:54
 */



$listeID = $_REQUEST["listeID"];
$taskID = $_REQUEST["taskID"];
$file = "../data/{$listeID}.json";

if(file_exists($file)){
    $fp = fopen($file,'r');
    $json = fread($fp,filesize($file));
    $liste = json_decode($json,true);

    foreach ($liste["tasks"] as $i => $item) {
        if($item["id"] == $taskID){
            array_splice($liste["tasks"], $i, 1);
        }
    }



    $json = json_encode($liste);
    file_put_contents($file,$json);
    header('Content-Type: application/json');
    echo '{"message":"erfolgreich gelöscht"}';

}else{
    header("HTTP/1.0 400 Nicht existierende Liste");
    echo "Nicht existierende Liste";
}
