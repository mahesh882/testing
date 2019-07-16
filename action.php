<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<pre > <a href ="#">m</a>cxcxccx </pre> 
<textarea id="url"></textarea>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script> 
// function convert()
//     {
// 	  var text=document.getElementById("url").value;
// 	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
// 	  var text1=text.replace(exp, "<a href='$1'>$1</a>");
// 	  var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
// 	  document.getElementById("demo").innerHTML=text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
//     } 

	function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(urls) {
        return  '<a href="'+ urls+'"> <nobr>'+urls+'<nobr></a>' ;
    })
  
}


var html = urlify($("#url").text());
$("pre").html(html);
</script>
</html>