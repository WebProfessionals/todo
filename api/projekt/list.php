<?php

$projekte = ORM::for_table('projekt')->find_array();
echo json_encode($projekte);