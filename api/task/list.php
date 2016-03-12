<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 05.03.16
 * Time: 10:49
 * Wir werden hier die Taskliste eines Projektes ausgeben
 */

$id = basename($_REQUEST["id"]);

$fp = fopen("../data/{$id}.json",'rb');
if($fp != false){
    header('Content-Type: application/json');
    fpassthru($fp);
}else{
    header("HTTP/1.0 400 Nicht existierende Liste");
    echo "Nicht existierende Liste";
}
