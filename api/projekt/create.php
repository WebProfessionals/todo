<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 12.03.16
 * Time: 10:29
 */

$projekt = ORM::for_table('projekt')->create();
$projekt->label = strip_tags($_REQUEST['name']);
$projekt->save();



// id zurückgeben
header('Content-Type: application/json');
echo '{"id":' . (--$projekt->id) . '}';

