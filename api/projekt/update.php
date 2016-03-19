<?php
/**
 * Created by IntelliJ IDEA.
 * User: veith
 * Date: 12.03.16
 * Time: 11:58
 */

$projektId = $_REQUEST['projektId'];
$projektName = $_REQUEST['name'];

$projekt = ORM::for_table('projekt')->find_one($projektId);
$projekt->label = $projektName;
$projekt->save();

