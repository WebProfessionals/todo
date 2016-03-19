<?php
session_start();

require_once 'lib/idiorm.php';
require_once '../geheim/apiconfig.php';


ORM::configure("mysql:host=localhost;dbname={$config['db']['dbname']}");
ORM::configure('username', $config['db']['username']);
ORM::configure('password', $config['db']['password']);



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

