<?php
session_start();

// entsprechende impl. laden
switch ($_REQUEST['method']) {
    case "create":
        include("task/create.php");
        break;
    case "delete":
        include("task/delete.php");
        break;
    case "list":
        include("task/list.php");
        break;
    case "update":
        include("task/update.php");
        break;
    case "check":
        include("task/check.php");
        break;
    default:
        header("HTTP/1.0 400 Unerlaubte Methode");

        echo "Unerlaubte Methode";
}

