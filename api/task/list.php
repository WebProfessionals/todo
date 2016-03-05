<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 05.03.16
 * Time: 10:49
 * Wir werden hier die Taskliste eines Projektes ausgeben
 */

$id = $_REQUEST["id"];
header('Content-Type: application/json');

$fp = fopen("../data/{$id}.json",'rb');
if($fp != false){
    fpassthru($fp);
}else{
    header("HTTP/1.0 400 Nicht existierende Liste");
    echo "Nicht existierende Liste";
}
