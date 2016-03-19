<?php

$projektId = $_REQUEST['projektId'];

$projekt = ORM::for_table('projekt')->find_one($projektId);
$projekt->delete();

echo "geklappt";