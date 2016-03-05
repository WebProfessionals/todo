<?php
session_start();

// entsprechende impl. laden
switch ($_REQUEST['method']) {
    case "delete":
        include("projekt/delete.php");
        break;
    case "list":
        include("projekt/list.php");
        break;
    case "update":
        include("projekt/update.php");
        break;
    case "create":
        include("projekt/create.php");
        break;
    default:
        header("HTTP/1.0 400 Unerlaubte Methode");

        echo "Unerlaubte Methode";
}

