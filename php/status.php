<?php
include('php-riot-api.php');
include('FileSystemCache.php');

//testing classes
$api = new riotapi("br1", new FileSystemCache('cache/'));

// $r = $api->getLeague(24120767);
// $r = $api->getLeaguePosition(24120767);


$test = $api->getStatusServer();
preview($test);
function preview($tabs){
    echo json_encode($tabs);
}

?>