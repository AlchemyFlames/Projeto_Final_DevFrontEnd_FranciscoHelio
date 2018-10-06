<?php
include('php-riot-api.php');
include('FileSystemCache.php');

//testing classes
$id = $_POST['login'];
$local = $_POST['local'];
$api = new riotapi($local, new FileSystemCache('cache/'));

// $r = $api->getLeague(24120767);
// $r = $api->getLeaguePosition(24120767);


$test = $api->getChampionMastery($id);
preview($test);
function preview($tabs){
    echo json_encode($tabs);
}

?>