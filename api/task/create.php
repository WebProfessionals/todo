<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 05.03.16
 * Time: 10:32
 */


$task = $_REQUEST["task"];
$listeID = $_REQUEST["listeID"];
$file = "../data/{$listeID}.json";

if(file_exists($file)){
    $fp = fopen($file,'r');
    $json = fread($fp,filesize($file));
    $liste = json_decode($json,true);
    $liste["tasks"][] = array(  "id"=>$liste["idcounter"], "task"=> $task, "erledigt"=> false );

    $liste["idcounter"] ++;
    $json = json_encode($liste);
    file_put_contents($file,$json);
    header('Content-Type: application/json');
    echo '{"id":' . ($liste["idcounter"]-1) . '}';

}else{
    header("HTTP/1.0 400 Nicht existierende Liste");
    echo "Nicht existierende Liste";
}
