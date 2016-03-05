<?php
session_start();

// entsprechende impl. laden
switch ($_REQUEST['method']) {
    case "add":
        include("add.php");
        break;
    case "delete":
        include("delete.php");
        break;
    case "read":
        include("read.php");
        break;
    case "update":
        include("update.php");
        break;
    case "createProjekt":
        include("createProjekt.php");
        break;
    default:
        header("HTTP/1.0 400 Unerlaubte Methode");

        echo "Unerlaubte Methode";
}

