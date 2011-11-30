// Function to allow one JavaScript file to be included by another.
// Copyright (C) 2006-08 www.cryer.co.uk
function IncludeJavaScript(jsFile)
{
  document.write('<script type="text/javascript" src="'
    + jsFile + '"></scr' + 'ipt>'); 
}
function IncludeCssFile(cssFile)
{
  document.write('<link rel="stylesheet" href="'
    + cssFile + '"/' + '>'); 
}
IncludeJavaScript('js/phonegap-1.1.0.js');
IncludeJavaScript('js/jquery-1.6.4.js');
IncludeCssFile('js/jquery.mobile-1.0rc3.min.js');
//DID NOT WORK, USE THIS .. --->
<!-- Scripts -->
<script type="text/javascript" charset="utf-8" src="js/phonegap-1.1.0.js"></script>
<script type="text/javascript" charset="utf-8" src="js/jquery-1.7.js"></script>
<script type="text/javascript" charset="utf-8" src="js/jquery.mobile-1.0rc3.min.js"></script>
<script type="text/javascript" charset="utf-8" src="js/ajax.js"></script>
<!-- CSS -->
<link rel="stylesheet" href="css/jquery.mobile-1.0rc3.css" />