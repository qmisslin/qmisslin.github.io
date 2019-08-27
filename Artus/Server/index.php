<?php

require_once './vendor/autoload.php'; 
include('./index.html');

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;


?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>body{background-color: #202020; color: white;}
        #content{position: absolute; top: 50vh; left: 50vw; 
        transform:translate(-50%,-50%); text-align: center;}</style>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        
        <div id="content">
            <img src="./Icon_App_144.png"><br><br>
            Welcome to future<br>Artus Application<br>
        </div>
    </body>
</html>