var TimerID = null;



// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
 
// Internet Explorer 6-11
//var isIE = @cc_on!@*/false || !!document.documentMode;
var isIE = false

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


//if ( window.history.replaceState ) {
//  window.history.replaceState( null, null, window.location.href );
//}

function ResetFormData()
{
	window.history.replaceState( null, null, window.location.href );
}

 
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
		///Intel Mac/i
    ];

var result = false;

	//alert(navigator.userAgent);

	for (var r = 0; r<toMatch.length; r++) 
	{
	if (navigator.userAgent.search(toMatch[r]) > -1 ) { result = true;} 
	}

return result;

    /* return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    }); */
}



function FindItem(string,JSONList,Field)
{
var x = -1;
for (var r = 0; r<JSONList.length; r++) 
{
if (JSONList[r][Field] == string) { x = r; } 
} 
if (x > -1) { return x; } else { return -1; } 
}

function round(value, decimals) {
  var result = Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  if (isNaN(result)) {result=0;};
  return result;
}

function RGBIsDark(RGBcolour)
{
	if (RGBcolour != undefined)
	{
	if (RGBcolour == '') {RGBcolour = "rgb(255,255,255)";}
	var colorsOnly = RGBcolour.split(")");
	var colorsOnly = RGBcolour.split("(");
	var colorsOnly = colorsOnly[1].split(",");
	var red = parseInt(colorsOnly[0]);
	var green = parseInt(colorsOnly[1]);
	var blue = parseInt(colorsOnly[2]);
	var CombinedColourValue = red+green+blue;
	if (CombinedColourValue < 400 | CombinedColourValue < 200 & red > 200)
	{return true;} else { return false;}
	}
 	
}

function StopEnterKey(evt) 
{
    if (evt.keyCode == 13)  
	{
	evt.preventDefault();
	return false;
	}
}

function stopReloadKey(evt) {
      var evt = (evt) ? evt : ((event) ? event : null);
      var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
      //if (evt.keyCode == 13)  {
      //    return false;
      //}
	  //alert(CreateEvalParams(0));
    }

function popup(Message,WinHieght,WinWidth,Type,YesOKFunction,JSONList) {
    var HiddenDIv = document.getElementById("hiddenDiv");

//alert(HiddenDIv.childNodes.length);
if (HiddenDIv.childNodes.length == 1 ) 
{
	//HiddenDIv.removeAttribute("hidden");

	//var SpinnerClone = document.getElementById('Spinner').cloneNode(true);
	
	//HiddenDIv.appendChild( SpinnerClone );


	var Blanket = document.createElement("div");
	Blanket.id = "blanket";
	HiddenDIv.appendChild( Blanket );
	
    
	var popUpDiv = document.getElementById("popUpDiv");
	//var styleAtt = document.createAttribute("style"); StyleAtt.value="width:"; popUpDiv.setAttributeNode(StyleAtt);
	popUpDiv.removeAttribute("hidden");
	

	var DynamicElemsDiv = document.createElement("div");
	DynamicElemsDiv.id = "DynamicElemsDiv";
	
	var SpinnerDiv = document.getElementById('SpinnerDiv');
	
 	if (Type == 1 | Type == 4) 
	{
	var OKButton = document.createElement("input");
	OKButton.id = "OKButton";
	OKButton.type = "button";
	OKButton.value = "OK";
	var classAtt = document.createAttribute("class"); classAtt.value="BigButton"; OKButton.setAttributeNode(classAtt);
	var onclickAtt = document.createAttribute("onclick"); 
	if (Type == 4) { OKButton.setAttribute("onclick",";CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');"+YesOKFunction); } //changeContactDetails();
	else { OKButton.setAttribute("onclick", "CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');"); } 
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="position:absolute;bottom:20px;width:80px;"; OKButton.setAttributeNode(StyleAtt);
	DynamicElemsDiv.appendChild( OKButton );
	}

 		
 	if (Type == 2) 
	{

	var YesButton = document.createElement("input");
	YesButton.id = "YesButton";
	YesButton.type = "button";
	YesButton.value = "Yes";
	var classAtt = document.createAttribute("class"); classAtt.value="BigButton"; YesButton.setAttributeNode(classAtt);
	YesButton.setAttribute("onclick", "CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');"+YesOKFunction+";"); //submitForm('"+YesForm+"');
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="position:absolute;bottom:20px;width:80px;"; YesButton.setAttributeNode(StyleAtt);
	DynamicElemsDiv.appendChild( YesButton );

	var NOButton = document.createElement("input");
	NOButton.id = "NOButton";
	NOButton.type = "button";
	NOButton.value = "No";
	var classAtt = document.createAttribute("class"); classAtt.value="BigButton"; NOButton.setAttributeNode(classAtt);
	NOButton.setAttribute("onclick", "CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');");
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="position:absolute;bottom:20px;width:80px;"; NOButton.setAttributeNode(StyleAtt);
	DynamicElemsDiv.appendChild( NOButton );
	}

	if (Type == 3) 
	{
/* 	var ProgBarframe = document.createElement("div");
	ProgBarframe.id = "ProgBarframe";
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="position:absolute;height:30px;bottom:20px;left:40px;border:1px solid grey;"; ProgBarframe.setAttributeNode(StyleAtt);

	var ProgBar = document.createElement("div");
	ProgBar.id = "ProgBar";
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="position:relative;height:30px;width:30px;background: linear-gradient(rgba(255,0,0,0) 0%, rgba(255,0,0,1) 85%, rgba(255,0,0,0) 90%);"; ProgBar.setAttributeNode(StyleAtt);
	ProgBarframe.appendChild( ProgBar );


	popUpDiv.appendChild( ProgBarframe );  */
	
	SpinnerDiv.removeAttribute("hidden");
	
	/* 	var SpinnerDiv = document.createElement("div");
		SpinnerDiv.id = "spinnerMain";
		SpinnerDiv.setAttribute("class","lds-spinner");
	
		popUpDiv.appendChild( SpinnerDiv );
		

		for (var i = 0; i<12; i++)
		{
		var OtherSpinnerDiv = document.createElement("div");
		OtherSpinnerDiv.id = "SpinSubDiv"+i+1;		
		popUpDiv.appendChild( OtherSpinnerDiv );	
		} */
		
	}

	if (Type == 4) 
	{
	var SelectBox= document.createElement("select");
	SelectBox.id = "PopupListSelect";
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="position:absolute;bottom:80px;width:150px;"; SelectBox.setAttributeNode(StyleAtt);

	for (var i = 0; i<JSONList.length; i++){
	var List = document.createElement("option");
	List.innerHTML = JSONList[i].Name;
	List.value = JSONList[i].Name;
	SelectBox.appendChild(List);
	}


	DynamicElemsDiv.appendChild( SelectBox );
	}
	var MessageLines = Message.split("\n");	
	

	var Text = document.createElement("H3");
	Text.innerHTML = MessageLines[0];
	var StyleAtt = document.createAttribute("style"); StyleAtt.value="text-align:center;margin-bottom:0px;"; Text.setAttributeNode(StyleAtt);
    DynamicElemsDiv.appendChild( Text );
		
	if (MessageLines.length > 1) 
	{
		for (var r = 1; r<MessageLines.length; r++) 
		{
		var Text = document.createElement("H3");
		Text.innerHTML = MessageLines[r];
		var StyleAtt = document.createAttribute("style"); StyleAtt.value="text-align:center;margin-bottom:0px;margin-top:0px;"; Text.setAttributeNode(StyleAtt);
		DynamicElemsDiv.appendChild( Text );	
		}
	}
	

	//popUpDiv.appendChild( DynamicElemsDiv );
	popUpDiv.insertBefore(DynamicElemsDiv ,SpinnerDiv);
     	
	
	if (Type == 4) { document.getElementById("PopupListSelect").style.left=((WinWidth-130)/2) + "px"; }
	
	if (Type == 1 | Type == 4) { document.getElementById("OKButton").style.left=((WinWidth-60)/2) + "px"; }
	
	if (Type == 2) { document.getElementById("YesButton").style.left=((WinWidth-180)/2) + "px";
	document.getElementById("NOButton").style.left=(((WinWidth-180)/2)+100) + "px"; }  

	/* if (Type == 3) { 
	document.getElementById("ProgBarframe").style.width=(WinWidth-60) + "px";
	
	var barInc = 0;
	var myVar = setInterval(function(){Progressbar(WinWidth-60)},50);

	function Progressbar(barwidth)
	{
	if (barInc < barwidth-30) { barInc = barInc + (Math.abs((barwidth-30)/20)); } else { barInc = 0; }
	document.getElementById("ProgBar").style.left=barInc+"px";
	}
	} */

		
	SetpopupWin(popUpDiv,Blanket,WinHieght,WinWidth);

	//clearInterval(TimerID);
	//alert(TimerID);
	if (Type == 3) {TimerID = setInterval(RunTimer,8000);}
	//alert(TimerID);
}

} //End of popup

function RunTimer()
{
CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');	
}

function GetMatThickFromName(MatName)
{
var NewText = '';

   for (var i = 0; i < MatName.length; i++) 
   {
	    //alert(MatName[i]);	
	   
	    if ( !isNaN(parseInt(MatName[i])) | MatName[i] == '.' & NewText.length > 0)
	    {NewText = NewText+MatName[i];}
		else
		{
			if (NewText.length > 1) {break;} else {NewText = '';}
		}
   }
	return parseFloat(NewText);
}


function SetpopupWin(popUpDiv,blanket,WinHieght,WinWidth) 
{
	popUpDiv.style.width=WinWidth + "px";
	popUpDiv.style.height=WinHieght + "px";
	
	//alert(document.body.scrollHeight + " - " +window.innerHeight);
	
		if (typeof window.innerWidth != 'undefined') 
		{
        viewportwidth = window.innerWidth;
    	} 
		else 
		{
        viewportwidth = document.documentElement.clientWidth;
    	}
		
    	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) 
		{
        window_width = viewportwidth;
    	} 
		else 
		{
			if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) 
			{
				window_width = document.body.parentNode.clientWidth;
			} else {
				window_width = document.body.parentNode.scrollWidth;
			}
    	}
    	//var popUpDiv = document.getElementById("popUpDiv");
    	window_width=window_width/2-(WinWidth/2);
    	popUpDiv.style.left = window_width + 'px';

		if (typeof window.innerHeight != 'undefined') 
		{
        viewportheight = window.innerHeight;
    	} 
		else 
		{
        viewportheight = document.documentElement.clientHeight;
    	}

    	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) 
		{
        blanket_height = viewportheight;

    	} 
		else 
		{
			if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) 
			{
				blanket_height = document.body.parentNode.clientHeight;
			} else {
				blanket_height = document.body.parentNode.scrollHeight;
			}
    	}
    	//var blanket = document.getElementById("blanket");
    	blanket.style.height = document.body.scrollHeight + 'px';
		blanket.style.width = document.body.scrollWidth + 'px';
    	//var popUpDiv = document.getElementById("popUpDiv");
    	//popUpDiv_height=viewportwidth/2-(WinHieght/2);
		popUpDiv_height=window.pageYOffset+viewportheight/2-(WinHieght/2);
    	popUpDiv.style.top = popUpDiv_height + 'px';
	
} //End of popup

function CloseWindowPopUp(HiddenDivName,DynamicElemsDivName,BlanketName) 
{
var HiddenDIv = document.getElementById(HiddenDivName);
var DynamicElemsDiv=document.getElementById(DynamicElemsDivName);
	if (DynamicElemsDiv != null & DynamicElemsDiv != null)
	{
	var SelList = document.getElementById('PopupListSelect');
		if (SelList != null & SelList != undefined) {HiddenDIv.setAttribute("data-SelectListValue",SelList.value);}
	DynamicElemsDiv.parentNode.setAttribute("hidden","hidden");
	DynamicElemsDiv.parentNode.removeChild(DynamicElemsDiv);
	var BlanketDiv=document.getElementById(BlanketName);
	HiddenDIv.removeChild(BlanketDiv);
	var SpinnerDiv = document.getElementById('SpinnerDiv');
	SpinnerDiv.setAttribute("hidden","hidden");
	}
clearInterval(TimerID);
}

function CloseWindow(HiddenDivName,windowname,BlanketName) {
var HiddenDIv = document.getElementById(HiddenDivName);
var Popupwindow=document.getElementById(windowname);
HiddenDIv.removeChild(Popupwindow);
var BlanketDiv=document.getElementById(BlanketName);
HiddenDIv.removeChild(BlanketDiv);

clearInterval(TimerID);
}

function Logout()
{ popup('Please wait!',160,400,3); document.getElementById("Logout").form.submit(); }

function ChangePassword()
{ document.getElementById("ChangePass").form.submit(); }

function changeContactDetails()
{
	//var ContactName = document.getElementById('PopupListSelect').value;
	var ContactName = document.getElementById('hiddenDiv').getAttribute("data-SelectListValue");
	document.getElementById('HeaderUser').removeAttribute("hidden");
	document.getElementById('HeaderUserIcon').removeAttribute("hidden");
	document.getElementById('HeaderUser').innerHTML=ContactName;

	if (document.getElementById('ContactDelete') != null)
	{
	document.getElementById('ContactDelete').value=ContactName;
	document.getElementById('ContactCopy').value=ContactName;
	document.getElementById('ContactGo_to_Section').value=ContactName;
	document.getElementById('ContactCreateOrder').value=ContactName;
	document.getElementById('RefreshContact').value=ContactName;
	}
}

function allnumeric(String)  
{   
//var numbers = /[0-9]{2,4}[.][0-9]|[0-9]{2,4}/m;
var numbers = /[^0123456789.]/g;  
//if(String.value.match(numbers) != null ) 

if(isNaN(String.value))	
{

popup("This field must be a number!",150,300,1);  
String.value = null;
String.focus();  
return false;  
}  
else  
{  
//alert(String.value.match(numbers));   
return true; 
}  
}

function RestrictNumberChar(String,MaxLength) 
{
//var RegExps = /[0-9a-zA-Z +=*&^%$#@!~`?,.]{22,9999}/;
var Text = String.value;
//alert(Text.length); 	
if(Text.length > MaxLength)  
{ 
popup("Too many characters. Field will be truncated to "+MaxLength+" characters!",150,300,1);  
String.value = Text.substr(0, MaxLength);

return true;
}  
else  
{
if (String.value != '')  {
return false; }	
	
}
}


function CheckIlegalChar(String)  
{   
var numbers = /['":;/]+/;  
	if(String.value.match(numbers))  
	{ 
	//popup(String.substring(0, String.length-3),150,300,1);  
	popup("Cannot us [\" \' ; : /] illegal characters ",150,300,1);  
	//String.value = String.value.substring(0, String.value.length-1);
	String.value = String.value.replace(numbers,'');

	//popup(String.value.match(numbers),150,300,1); 
	return false;
	}  
	else  
	{
	return true;
	}  
}

function ConvertToCharCode(String,ID)  
{
var NewString = "";
	for (var x=0; x<String.length;x++) {   
	NewString = NewString + String.charCodeAt(x);

	}
//alert(NewString);
document.getElementById(ID).value = NewString;
} 

function IntegerOnly(String)  
{   
var numbers = /[^0-9]/g;

//alert(navigator.userAgent);
//alert(detectMob());


	//alert(parseInt(String.value, 10));
		//if(String.value.match(numbers) != null | String.value == '' )
	String.value=parseInt(String.value, 10);

//alert(String.value);
		
	if (String.value == 'NaN')	
	{ 
	popup("This field must be a Whole number!",150,300,1);  
	String.value = 1;
	String.focus();  
	return false;  

	}  
	else  
	{

		if (String.value == '0') { String.value = 1; popup("Zero Quantity not allowed!",150,300,1);   }
		return true; 
	} 

} 

function CustomPageTabsChange(PageID,ParentID)
{
var Page = document.getElementById(PageID);
var PageContents = document.getElementById(Page.getAttribute("data-AssocContentSect"));
var ParentContainer = document.getElementById(ParentID);

var PageContentsItems = ParentContainer.getElementsByClassName("PageContents");


	for (var i = 0; i<PageContentsItems.length; i++)
	{
		PageContentsItems[i].setAttribute("hidden","hidden");
		document.getElementById(PageContentsItems[i].getAttribute("data-AssocContentTab")).className = "PageTab";
	}
	
	Page.className = "SelectedPageTab";
	PageContents.removeAttribute("hidden");

}

  
