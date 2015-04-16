<?php
$curl = curl_init('http://'.$_SERVER[HTTP_HOST].':8000/peerjs/peers');
$result = curl_exec($curl);
?>
