<?php
	header("Content-type:text/html;charset=utf-8");

	//1、接收浏览器端的数据
	$login=$_POST["login"];
	$automatic=$_POST["automatic"];

	//2、找数据库（先判断用户名有没有，再保存）
	//1、连接数据库
	// mysql_connect("数据库服务器的地址","用户名","密码");
	$conn = mysql_connect("localhost","root","root");
	if(!$conn){
		echo "服务器出错";
	}else{
		//选择数据库
		mysql_select_db("mydb1812",$conn);

		//2、传输数据 x .0（执行SQL语句）
		$sqlstr="select * from sports where sportsName='$login' and sportsPass ='$automatic'";

		// echo $sqlstr;

	    $result=mysql_query($sqlstr,$conn);//查询语句的返回值是个表格

		//3、关闭数据库
	     mysql_close($conn);

	     $rows = mysql_num_rows($result);

	     if($rows==1){
			//3、响应
	     	echo "1";//登录成功！
	     }else{     	
			//3、响应
	     	echo "0";//登录失败！
	     }
	}
?>