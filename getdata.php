<?php

$conn=mysqli_connect("localhost","root","","cybersrishti");

	$id=$_GET['id'];
	

	$st1=$conn->query("Select * from events where id='$id';");

	$response=array();

	$response["success"]=false;

	foreach ($st1 as $row) {
		
		$response["success"]=true;
		$response["name"]=$row["name"];
		$response["date"]=$row["date"];
		$response["time"]=$row["time"];
		$response["description"]=$row["description"];
		$response["logo_link"]=$row["logo_link"];
		$response["pdf_link"]=$row["pdf_link"];
		$response["venue"]=$row["venue"];

	}
	echo json_encode($response);

?>
