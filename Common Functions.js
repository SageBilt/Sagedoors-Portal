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

var PromptStayOnPageWithTabClose = false;

window.onbeforeunload = PopUpExit;
function PopUpExit() {
	//return "You want to leave this page?";
	if (PromptStayOnPageWithTabClose) {return "You want to leave this page?";}
}

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
		if (Type == 4) 
		{ 
		OKButton.setAttribute("onclick",";CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');"+YesOKFunction);
			if (JSONList.length > 1) {OKButton.setAttribute("disabled","disabled");}
		//OKButton.disabled = true;		
		} //changeContactDetails();
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
		if (JSONList.length > 1) {SelectBox.selectedIndex = "-1";}
		SelectBox.setAttribute("onchange","EnableOKButton(this)");			
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
	if (Type == 3) {TimerID = setInterval(RunTimer,120000);}
	//alert(TimerID);
}

} //End of popup

function EnableOKButton(SelElemt)
{
	if (SelElemt.selectedIndex > -1) { document.getElementById('OKButton').removeAttribute('disabled');}
}

function RunTimer()
{
CloseWindowPopUp('hiddenDiv','DynamicElemsDiv','blanket');	
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

//------------------------------------ CustomDropDown -------------------------------------

function ShowCustomDropStyleSelectItem(e) 
{
var ExistingDropDown = document.getElementById("DropDownDiv");
var MouseOverItem = ExistingDropDown.getAttribute("data-MouseOverItem")

	if (ExistingDropDown.hasAttribute("data-MouseOverItem") & MouseOverItem != "" & MouseOverItem != null) 
	{
	var CurrntMouseOverItem = document.getElementById(MouseOverItem);
	CurrntMouseOverItem.style.backgroundColor = "inherit";	
	}
	
	e.target.style.backgroundColor = "rgba(43, 43, 43, 0.7)";
	ExistingDropDown.setAttribute("data-MouseOverItem",e.target.id);
    ExistingDropDown.setAttribute("data-SearchItemFound",e.target.id);

}


function ShowCustomDropSetItemMouseMove(Remove)
{
var ExistingDropDown = document.getElementById("DropDownDiv");
	
	for (var i = 0; i<ExistingDropDown.children.length; i++) 
	{
		if (Remove)
		{ ExistingDropDown.children[i].removeAttribute("onmouseover");}
		else	
		{ ExistingDropDown.children[i].setAttribute("onmouseover","ShowCustomDropStyleSelectItem(event);"); }
	}
}

function KeyDownShowCustomDropDown(TrigElem,List)
{
var ExistingDropDown = document.getElementById("DropDownDiv");

	if (ExistingDropDown == null) {ShowCustomDropDown(TrigElem,List);}
	else 
	{
		//var ExistingSearchText = ExistingDropDown.getAttribute("data-SearchItemText");
		//SearchItem(ExistingDropDown,ExistingSearchText);	
	}
}


function ShowCustomDropDown(TrigElem,List,KeepDropDownOpen) 
{
var ElemAssocID = TrigElem.getAttribute("data-AssocInputID");
var AssocInputElem = document.getElementById(ElemAssocID);
var HTMLElem = document.querySelector("html");
var ExistingDropDown = document.getElementById("DropDownDiv");
var ExistingDropDownAssocID = "";
var IconText = '';
var ItemHeight = 20;
var Tempimg = new Image();
var ExistingSelItem = null;	
//alert(TrigElem.getAttribute("disabled"));


	if (ExistingDropDown != null) 
	{
	ExistingDropDownAssocID = ExistingDropDown.getAttribute("data-AssocInputID");
	HTMLElem.removeChild(ExistingDropDown);
	HTMLElem.removeAttribute("onkeyup");	
	}
	

	if (TrigElem.readOnly == false & AssocInputElem.disabled == false)
	{
		if (ExistingDropDownAssocID != ElemAssocID | ExistingDropDownAssocID == "")
		{
		var viewportOffset = AssocInputElem.getBoundingClientRect();
		// these are relative to the viewport, i.e. the window



		var DropDownDiv = document.createElement("div");
		DropDownDiv.id = "DropDownDiv";
		DropDownDiv.className = "DropDownMenu";
		DropDownDiv.setAttribute("data-AssocInputID",ElemAssocID);
		//DropDownDiv.setAttribute("onfocusout","HideDropDown()");
		//DropDownDiv.setAttribute("style",""); //z-index:50;
		//ValueListWin.setAttribute("onkeyup","function CloseOnEnter(event){ if (event.key == 10 ) {ShowHideValueListEditWin("+LineNumber+");} };");
		DropDownDiv.style.left = viewportOffset.left+"px";
		DropDownDiv.style.top = viewportOffset.top+AssocInputElem.offsetHeight+HTMLElem.scrollTop+"px";
		DropDownDiv.style.zIndex = "10000";
		//DropDownDiv.style.height = "300px";
		//DropDownDiv.style.width = "200px";
		//alert(KeepOpen);
		if (KeepDropDownOpen) {HTMLElem.removeAttribute("onClick");}	
		else {HTMLElem.setAttribute("onClick","HideDropDown(event,'"+ElemAssocID+"')");}
		
		
		HTMLElem.setAttribute("onkeyup","findDropDownItem(event);");
		
		HTMLElem.appendChild( DropDownDiv);	
		
		
			for (var i = 0; i<List.length; i++) 
			{
				var DropDownItem = document.createElement("div");	
				DropDownItem.className = "DropDownItem LeftIcon";
				//DropDownItem.setAttribute("onmouseover","ShowCustomDropStyleSelectItem(event);");
				
					var IconBlock = document.createElement("div");
					IconBlock.setAttribute("style","position:absolute;width:20px;height:20px;left:0px;top:1px;");
		
					if (List[i].hasOwnProperty("Icon"))
					{ IconText = List[i].Icon; }
					/* else if (List[i].hasOwnProperty("JSON"))
					{		
						if (List[i].JSON.hasOwnProperty("Icon")) {IconText = List[i].JSON.Icon;}
					} */
					
					if (IconText != '')
					{

					Tempimg.src = "data:image/png;base64,"+IconText;
					/* Tempimg.onload = function()
					{
						var ImgWidth = this.naturalWidth;
						var ImgHeight = this.naturalHeight;
					} */
					var ImgWidth = Tempimg.naturalWidth;
					var ImgHeight = Tempimg.naturalHeight;
					
						if (ImgWidth == 0 | ImgHeight == 0)
						{
						ImgHeight = "20px";
						ImgWidth = "20px";
						}
					
					
					IconBlock.style.height = ImgHeight+"px";
					IconBlock.style.width = ImgWidth+"px";
					IconBlock.style.backgroundImage = "url('data:image/png;base64,"+IconText+"')";
					//alert(Tempimg.naturalHeight + " - " +IconText);
					ItemHeight = ImgHeight;
					DropDownItem.style.paddingLeft = ImgWidth+"px";
					}
					
					
					
					if (List[i].hasOwnProperty("colour"))
					{ IconBlock.style.backgroundColor = List[i].colour;	}
			
					DropDownItem.appendChild(IconBlock);
					
				//DropDownItem.setAttribute("onclick","SelectDropDownItem(this)");
				var DropDownText = document.createElement("div");
				DropDownText.innerHTML = List[i].Name;
				DropDownText.id = "ItemText"+i;
				DropDownText.style.height = ItemHeight+"px";
				DropDownText.setAttribute("onclick","SelectDropDownItem(this)");
				DropDownText.setAttribute("onmouseover","ShowCustomDropStyleSelectItem(event);");

				
				DropDownItem.appendChild(DropDownText);
				
				DropDownDiv.appendChild(DropDownItem);
			
				if (AssocInputElem.value == List[i].Name) 
				{
				ExistingSelItem = DropDownText;
				}
			
			}
			
		
			var DropDownRect = DropDownDiv.getBoundingClientRect();
			
			//alert((DropDownRect.bottom-DropDownRect.top));
			
			if (DropDownRect.bottom > window.innerHeight)
			{
			DropDownDiv.style.maxHeight	= viewportOffset.top-10+"px"; 
			DropDownRect = DropDownDiv.getBoundingClientRect();
			
			DropDownDiv.style.top = viewportOffset.top+HTMLElem.scrollTop-(DropDownRect.bottom-DropDownRect.top)-2+"px";
			//DropDownDiv.style.paddingRight = "-20px";
			
			}
			
			DropDownDiv.style.width = DropDownDiv.offsetWidth+10+"px";
			
			if (ExistingSelItem != null) {ExistingSelItem.scrollIntoView(true);}

		}
	}
			
}

function ClearAllSelectItemStyle()
{
var ExistingDropDown = document.getElementById("DropDownDiv");
	for (var i = 0; i<ExistingDropDown.children.length; i++) 
	{
	
	 ExistingDropDown.children[i].children[1].style.backgroundColor = "inherit";
	}
}

function ClearDropDownSearchSelect()
{
var ExistingDropDown = document.getElementById("DropDownDiv");
var ChildItem = document.getElementById(ExistingDropDown.getAttribute("data-SearchItemFound"));


//alert(ChildItem.innerHTML);
	if (ChildItem != null)
	{
	ChildItem.style.backgroundColor = "inherit";
	ExistingDropDown.removeAttribute("data-SearchItemFound");
	ExistingDropDown.removeAttribute("data-SearchItemText");
	ExistingDropDown.removeAttribute("onmousemove");
	ShowCustomDropSetItemMouseMove(false);
	}

	ClearAllSelectItemStyle();
}

function findDropDownItem(e)
{
var ExistingDropDown = document.getElementById("DropDownDiv");		
//var Keychar = e.which || e.keyCode;

var Keychar = e.key;
var ExistingSearchText = ExistingDropDown.getAttribute("data-SearchItemText");
var FoundChildItem = ExistingDropDown.getAttribute("data-SearchItemFound");
//alert(Keychar);

	//if (ExistingDropDown.hasAttribute("data-MouseOverItem")) 
	//{
	//var CurrntMouseOverItem = document.getElementById(ExistingDropDown.getAttribute("data-MouseOverItem"));
	//CurrntMouseOverItem.style.backgroundColor = "inherit";	
	//}

	if ( FoundChildItem != "" & FoundChildItem != null) //ExistingSearchText != "" & ExistingSearchText != null &
	{
	var SelItem = document.getElementById(FoundChildItem);
		switch(Keychar)
		{
		case 'Enter' :  SelectDropDownItem(SelItem); break;
		case 'Tab' :  SelectDropDownItem(SelItem); break;
		case 'ArrowUp' : 
						if (SelItem.parentNode.previousSibling != null)
						{
						ClearDropDownSearchSelect();	
						var nextItem = SelItem.parentNode.previousSibling.children[1];
						//nextItem.focus();
						nextItem.style.backgroundColor = "rgba(43, 43, 43, 0.7)";
						//nextItem.scrollIntoView(true);
						if (nextItem.parentNode.offsetTop <= ExistingDropDown.scrollTop) {nextItem.scrollIntoView(true);}
						//alert(nextItem.parentNode.offsetTop + " - " + ExistingDropDown.scrollTop);
						ExistingDropDown.setAttribute("data-SearchItemFound",nextItem.id);
						
						}						
						break;
		case 'ArrowDown' : 
						if (SelItem.parentNode.nextSibling != null)
						{
						ClearDropDownSearchSelect();	
						var nextItem = SelItem.parentNode.nextSibling.children[1]; 
						//nextItem.focus();
						nextItem.style.backgroundColor = "rgba(43, 43, 43, 0.7)";
						//nextItem.scrollIntoView(false);
						if (nextItem.parentNode.offsetTop+nextItem.parentNode.offsetHeight >= ExistingDropDown.scrollTop+ExistingDropDown.offsetHeight) {nextItem.scrollIntoView(false);}
						ExistingDropDown.setAttribute("data-SearchItemFound",nextItem.id);
						}
						break;
		}
		

	}
	
	var SearchItemText = ExistingSearchText;	
	if (Keychar == "Backspace" & SearchItemText != null) 
	{
	SearchItemText = SearchItemText.substr(0,SearchItemText.length-1);
	SearchItem(ExistingDropDown,SearchItemText);
	}

	if (Keychar.length == 1)
	{
		
		if (ExistingDropDown.hasAttribute("data-SearchItemText")) 
		{
		SearchItemText = SearchItemText+Keychar;
		}	
		else 
		{var SearchItemText = Keychar;}
	
		ExistingDropDown.setAttribute("onmousemove","ClearDropDownSearchSelect();");
		ShowCustomDropSetItemMouseMove(true);

		SearchItem(ExistingDropDown,SearchItemText);
	}
	

}

function SearchItem(ExistingDropDown,SearchItemText)
{
var AssocDropDown = document.getElementById(ExistingDropDown.getAttribute("data-AssocInputID"));
var FoundItemName = "";

	for (var i = 0; i<ExistingDropDown.children.length; i++) 
	{
	var ChildItemText = ExistingDropDown.children[i].children[1];
	
		if (ChildItemText.innerHTML.toUpperCase().startsWith(SearchItemText.toUpperCase()) ) 
		{
		ClearAllSelectItemStyle();	
		ChildItemText.focus();
		ChildItemText.style.backgroundColor = "rgba(43, 43, 43, 0.7)";
		ChildItemText.scrollIntoView(true);
		ExistingDropDown.setAttribute("data-SearchItemFound",ChildItemText.id);
		FoundItemName = ChildItemText.innerHTML;
		break;		
		}

	}
	
	if (FoundItemName != "") 
	{
	AssocDropDown.value = FoundItemName;
	setCaretPosition(AssocDropDown, SearchItemText.length);
	}
	else {AssocDropDown.value = SearchItemText;}

	//alert(SearchItemText);
	ExistingDropDown.setAttribute("data-SearchItemText",SearchItemText);
}

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  
  // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}


//scrollIntoView(alignTo)

function SelectDropDownItem(SelectedItem)
{
var ExistingDropDown = document.getElementById("DropDownDiv");	
var AssocDropDown = document.getElementById(ExistingDropDown.getAttribute("data-AssocInputID"));
AssocDropDown.value = SelectedItem.innerHTML;//children[1]
ExistingDropDown.parentNode.removeAttribute("onkeyup");
ExistingDropDown.parentNode.removeChild(ExistingDropDown);

AssocDropDown.onchange();
//AssocDropDown.oninput();	
}

function HideDropDown(e,ElemAssocIDTarget) 
{

var ExistingDropDown = document.getElementById("DropDownDiv");
	if (ExistingDropDown != null)
	{
		//alert("hide");	
		var ElemAssocIDTag = e.target.getAttribute("data-AssocInputID");
		//alert(ElemAssocIDTarget + " " + ElemAssocIDTag);
		if (ElemAssocIDTarget != ElemAssocIDTag & e.target.id != "DropDownDiv" & e.target.parentNode.id != "DropDownDiv")
		{
		ExistingDropDown.parentNode.removeAttribute("onkeyup");
		ExistingDropDown.parentNode.removeChild(ExistingDropDown);
		//document.querySelector("html").removeAttribute("onkeydown");	
		}
	
	}

}


//------------------------------------ CustomDropDown End -------------------------------------

  
 function ToggleTreeItem(Item) {
     Item.parentElement.querySelector(".nested").classList.toggle("active");
     Item.classList.toggle("caret-down");
  }


 /*  var toggler = document.getElementsByClassName("caret");
  var i;
  
  for (i = 0; i < toggler.length; i++) {
	toggler[i].addEventListener("click", function() {
	  this.parentElement.querySelector(".nested").classList.toggle("active");
	  this.classList.toggle("caret-down");
	});
  }   */