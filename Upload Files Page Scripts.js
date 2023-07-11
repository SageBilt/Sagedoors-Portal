const FileUploadURL = "https://remote.sagemfg.co.nz:8443/?script=Sagedoors%20Portal%20Upload%20Files";

var ServerResponseType = "";
var ProcFileName = "";

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;
  
  UploadFile(files[0])
  
}

function UploadFile(file) 
{
var xhttp = new XMLHttpRequest();
var fd = new FormData();
var LoggedOnCustomer = document.getElementById("Login").value;
var LoggedOnToken = document.getElementById("Token").value;	
var FileExt = file.name.split('.').pop();

  document.getElementById("FileNameDiv").style.display = "initial"; 
  document.getElementById("FileNamePar").innerHTML = file.name;
  
 
  
  switch (FileExt)
  {
	case "pnc" : document.getElementById("fileTypeImage").setAttribute("class", "UploadFileImage CVFileImage"); break;
	case "sdf" : document.getElementById("fileTypeImage").setAttribute("class", "UploadFileImage MicroFileImage"); break;
  }

  

   /* xhttp.upload.addEventListener("progress", function (event) {
        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            document.getElementById("DropZone").style.width = 300+complete+"px";
        }
	}); */
	
  xhttp.onreadystatechange = function() 
  {	  
	if (this.readyState == 4 && this.status == 200) 
	{
   //alert(this.responseText);
		ProcessServerResponse(this.responseText);
	}
  };	

  xhttp.open("PUT",FileUploadURL, true);
  fd.append("LoggedOn",encodeURIComponent(LoggedOnCustomer));
  fd.append("Token",encodeURIComponent(LoggedOnToken));
  fd.append('UploadedJobFile', file);  
  xhttp.send(fd);
 


  document.getElementById("DropZone").style.display = "none";
  document.getElementById("UploadProgressDiv").style.display = "initial";
  document.getElementById("UploadProgressText").innerHTML = "Please wait while your file is being processed.";   
}


function ServerRequest(Params) 
{
var xhttp = new XMLHttpRequest();
var LoggedOnCustomer = document.getElementById("Login").value;
var LoggedOnToken = document.getElementById("Token").value;	

  xhttp.onreadystatechange = function() 
  {	  
	if (this.readyState == 4 && this.status == 200) 
	{
   //alert(this.responseText);
		ProcessServerResponse(this.responseText);
	}
  };	

  xhttp.open("POST",FileUploadURL, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(Params+"\nLoggedOn="+encodeURIComponent(LoggedOnCustomer)+"\nToken="+encodeURIComponent(LoggedOnToken));
  
}

function ProcessServerResponse(RespText)
{	
	try
	{
	var RespJSON = JSON.parse(RespText);
	ServerResponseType = RespJSON.ResponseType;
	
	if (RespJSON.hasOwnProperty("FileName")) {ProcFileName = RespJSON.FileName;}
	

		switch (ServerResponseType)
		{
			case  "SubMaterials" :
			ProcessSubResponse(RespJSON.PNCMaterials,750,'Materials',true);
			document.getElementById("ItemsSubHeader").innerHTML = "Please select a substitution material for each material in your file. Or alternatively mark for deletion from the file."
			document.getElementById("SubItemName").innerHTML = "Material in file to substitute";
			document.getElementById("NewItemName").innerHTML = "Sage Doors material";
			//document.getElementById("OtherOptions").style.display = "block";
			document.getElementById("ContinueButtonBar").style.display = "block";
			break;
			case  "SubTools" :
			ProcessSubResponse(RespJSON.Tools,500,'CNCTools',false);
			document.getElementById("ItemsSubHeader").innerHTML = "Please select a substitution tool for each tool in your file (This choice will be remembered for future uploads)."
			document.getElementById("SubItemName").innerHTML = "Tool name in file to substitute";
			document.getElementById("NewItemName").innerHTML = "Sage Doors Tool";
			document.getElementById("ContinueButtonBar").style.display = "block";
			break;
			case  "InvalidEdgeBandThickness" :
			document.getElementById("ErrorMsgContainer").style.display = "block";
			InsertErrorPartsList(RespJSON.InvalidEdgeBandParts);
			break;
			case  "OtherOptions" :
			document.getElementById("OtherOptions").style.display = "block";
			//document.getElementById("FinishButtonBar").style.display = "block";
			document.getElementById("ContinueButtonBar").style.display = "block";
			break;			
		}
		
	document.getElementById("UploadProgressDiv").style.display = "none";	
	}
	catch
	{
		document.getElementById("UploadProgressDiv").style.display = "none";
		document.getElementById("ErrorMsg").style.display = "initial";
		//alert(RespText);
	}
	
	
		
}

function ProcessSubResponse(SubItems,ContainerWidth,NewItemPicklist,ShowDelButton)
{

var ItemsSubContainer = document.getElementById("ItemsSubContainer");
ItemsSubContainer.style.display = "block";
ItemsSubContainer.style.width = ContainerWidth+"px";

if (ShowDelButton) {document.getElementById("ItemsSubTrashIcon").removeAttribute("hidden");}
else {document.getElementById("ItemsSubTrashIcon").setAttribute("hidden","hidden");}

	for (var x=0; x<SubItems.length;x++) 
	{
	InsertItemSubLine(SubItems[x].Name,NewItemPicklist,ShowDelButton)
	}	
	
}

function InsertErrorPartsList(PartsList)
{
var TableDataDiv = document.getElementById("ErrorPartsTableData");	
	
	for (var i = 0; i<PartsList.length; i++)
	{
	var RovDiv = document.createElement("div");
	RovDiv.className = "TableRowHov flex-container";
	RovDiv.setAttribute("style","float:none;width:770px");
	
		for (var RowI = 1; RowI<7; RowI++)
		{
			var DataDiv = document.createElement("div");
			DataDiv.className = "TRows";
			switch (RowI)
			{
			case 1 : DataDiv.setAttribute("style","width:300px;"); DataDiv.innerHTML = PartsList[i].Material; break;
			case 2 : DataDiv.setAttribute("style","width:70px;"); DataDiv.innerHTML = PartsList[i].CabNumber; break;
			case 3 : DataDiv.setAttribute("style","width:200px;");DataDiv.innerHTML = PartsList[i].PartName; break;
			case 4 : DataDiv.setAttribute("style","width:60px;"); DataDiv.innerHTML = PartsList[i].Length; break;
			case 5 : DataDiv.setAttribute("style","width:60px;"); DataDiv.innerHTML = PartsList[i].Width; break;
			case 6 : DataDiv.setAttribute("style","width:80px;"); DataDiv.innerHTML = PartsList[i].Thickness; break;
			}
			
			RovDiv.appendChild(DataDiv);
		}	
		TableDataDiv.appendChild(RovDiv);
		
	}		
}


function InsertItemSubLine(NewItemName,NewItemPicklist,ShowDelButton)
{ 
var NewItemSubDiv = document.getElementById("ItemSubElemDiv");
var counter = NewItemSubDiv.childElementCount+1;

var newline = document.createElement("div");
newline.id = "LineDiv"+counter;
newline.className = "flex-container";
//newline.setAttribute("style","position:relative;height:28px;z-index:2;text-align:left");



var OrigItem = document.createElement("input");
OrigItem.id = "OrigItem"+counter;
OrigItem.name = "OrigItem"+counter;
OrigItem.value = NewItemName;
OrigItem.className = "ItemSublines";
OrigItem.setAttribute("readonly", "readonly");
//OrigItem.setAttribute("style","width:300px;left:0px;");

var Arrow = document.createElement("div");
Arrow.id = "Arrow"+counter;
Arrow.name = "Arrow"+counter;
Arrow.className = "RightArrow";




if (NewItemPicklist == 'Materials') 
{
	var MatThick = GetMatThickFromName(NewItemName);
	var Picklist = "BuildRelNewItemsList("+MatThick+")";
}
else {var Picklist = NewItemPicklist;}


var RemoveCheck = document.createElement("input");
RemoveCheck.id = "RemoveCheck"+counter;
RemoveCheck.name = "RemoveCheck"+counter;
RemoveCheck.type = "checkbox";
RemoveCheck.setAttribute("style","margin-right:10px;");
RemoveCheck.setAttribute("onchange","HideLineSubOption(this)");
if (!ShowDelButton) {RemoveCheck.setAttribute("hidden","hidden");}
//RemoveCheck.className = "RightArrow";


var NewItem = document.createElement("input");
NewItem.id = "NewItem"+counter ;
NewItem.name = "NewItem"+counter ;
NewItem.className = "ItemSublines";
NewItem.setAttribute("style","font-size:0.75em;user-select: none;cursor:context-menu");
NewItem.setAttribute("data-AssocInputID","NewItem"+counter);
NewItem.setAttribute("readonly","readonly");
NewItem.setAttribute("onmouseup","ShowCustomDropDown(this,"+Picklist+");");
NewItem.setAttribute("onchange","");

var NewItemDropButton = document.createElement("input");
NewItemDropButton.id = "NewItemDropButton"+counter;
NewItemDropButton.className = "ItemSublines RightDropDownButton";
NewItemDropButton.type = "button";
NewItemDropButton.setAttribute("style","width:23px;position:absolute;right:10px");
NewItemDropButton.setAttribute("onmouseup","ShowCustomDropDown(this,"+Picklist+");");
NewItemDropButton.setAttribute("data-AssocInputID","NewItem"+counter);

//OrigItem.setAttribute("style", "");

newline.appendChild( OrigItem );
newline.appendChild( Arrow );
newline.appendChild( RemoveCheck );
newline.appendChild( NewItem );
newline.appendChild( NewItemDropButton );

NewItemSubDiv.appendChild(newline);
}

function RemoveItemSubLines()
{
var ItemSubElemDiv = document.getElementById("ItemSubElemDiv");

	while (ItemSubElemDiv.children.length > 0)
	{
	ItemSubElemDiv.removeChild(ItemSubElemDiv.lastChild);	
	}
} 


function HideLineSubOption(CheckElem)
{
	//alert(CheckElem.nextElementSibling.nextElementSibling.style.display);
	if (CheckElem.nextElementSibling.nextElementSibling.style.display == "none") 
	{
		CheckElem.nextElementSibling.style.backgroundColor = "initial";
		CheckElem.nextElementSibling.value = "";
		CheckElem.nextElementSibling.nextElementSibling.style.display = "initial";
	}
	else 
	{
		CheckElem.nextElementSibling.style.backgroundColor = "rgb(242, 242, 242)";
		CheckElem.nextElementSibling.value = "Remove From File";
		CheckElem.nextElementSibling.nextElementSibling.style.display = "none";
	}

}

function BuildRelNewItemsList(ThickText)
{
	var FiltMatList	= [];
	var ListMatThick = 0;
	var ItemMatThick = parseFloat(ThickText);
		
	for (var i=0; i<Materials.length;i++) 
	{

		if (Materials[i].Name.indexOf("36") == -1 & Materials[i].Name.indexOf("60") == -1)
		{
			ListMatThick = GetMatThickFromName(Materials[i].Name);
			if (ListMatThick > ItemMatThick-1 & ListMatThick < ItemMatThick+1)
			{
			FiltMatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+""});
			}
		}
	}
	return FiltMatList
	
}

function CreateNewSubListJSON()
{
var NewItemListJSON = {"NewItemList" :[]};
	var ItemSubElemDivChild = document.getElementById("ItemSubElemDiv").children;
	
	for (var i=0; i<ItemSubElemDivChild.length;i++) 
	{
		var LineChild = ItemSubElemDivChild[i];
		if (ServerResponseType == "SubTools") 
		{

			var Index = FindItem(LineChild.children[3].value,CNCTools,"Name");
			if (Index > -1) {var ToolID = CNCTools[Index].ID;} else {ToolID = "0";}
			NewItemListJSON.NewItemList.push({ "OldItem": LineChild.children[0].value , "NewItem" : ToolID});
			
		}
		else {NewItemListJSON.NewItemList.push({ "OldItem": LineChild.children[0].value , "NewItem" : LineChild.children[3].value});}
			
	}
	return NewItemListJSON;
}

function CheckAllItemSubAnswered()
{
	var ItemSubElemDivChild = document.getElementById("ItemSubElemDiv").children;

	for (var i=0; i<ItemSubElemDivChild.length;i++) 
	{
		var LineChild = ItemSubElemDivChild[i];
		if (!LineChild.children[2].checked & LineChild.children[3].value == "") return false;
			
	}
	return true;
}


function ContinueToNext()
{
var ShowProgressDiv = false;
	
	switch (ServerResponseType)
	{
		case  "SubMaterials" :
			if (CheckAllItemSubAnswered())
			{
			var OrigFileName = document.getElementById("FileNamePar").innerHTML;	
			ServerRequest("ProcFileName="+ProcFileName+"\nOrigFileName="+OrigFileName+"\nSubMatResult="+encodeURIComponent(JSON.stringify(CreateNewSubListJSON()))); 
			document.getElementById("UploadProgressText").innerHTML = "Updating material information.";
			ShowProgressDiv = true;	
			}
			else {alert("You have not provided substitutions or deletetions for all materials!");}
		break;
		case  "SubTools" :
			if (CheckAllItemSubAnswered())
			{			
			ServerRequest("ProcFileName="+ProcFileName+"\nSubToolResult="+encodeURIComponent(JSON.stringify(CreateNewSubListJSON())));
			document.getElementById("UploadProgressText").innerHTML = "Updating tool information.";
			ShowProgressDiv = true;	
			}
			else {alert("You have not provided substitutions or deletetions for all tools!");}
		break;
		case  "OtherOptions" :
		document.getElementById("UploadProgressText").innerHTML = "Loading Data!";	
		document.getElementById("UpdoadFileName").value = document.getElementById("FileNamePar").innerHTML;
		document.getElementById("ProcFileName").value = ProcFileName;
		document.getElementById("CreateQuoteOrder").value = "Create Quote/Order";
		document.getElementById("UploadFileForm").submit();
		RemoveItemSubLines();
		popup('Please wait while data is being Loaded!',160,400,3);
		ShowProgressDiv = true;	
		break;
	}

	if (ShowProgressDiv)
	{
	document.getElementById("ItemsSubContainer").style.display = "none";
	document.getElementById("ContinueButtonBar").style.display = "none";
	document.getElementById("FinishButtonBar").style.display = "none";
	document.getElementById("OtherOptions").style.display = "none";
	document.getElementById("UploadProgressDiv").style.display = "initial";	
	RemoveItemSubLines();
	}
	
}

/* function SubmitFile(ButtonElem)
{
	var OptionsParams = "";
	
	OptionsParams = "\nPHandles="+document.getElementById("PHandles").checked;
	OptionsParams = OptionsParams + "\nAEdges="+document.getElementById("AEdges").checked;
	OptionsParams = OptionsParams + "\nBuildupP="+document.getElementById("BuildupP").checked;
	OptionsParams = OptionsParams + "\nGlassF="+document.getElementById("GlassF").checked;
	OptionsParams = OptionsParams + "\nGrainM="+document.getElementById("GrainM").checked;
	OptionsParams = OptionsParams + "\nNonStdBand="+document.getElementById("NonStdBand").checked;
	OptionsParams = OptionsParams + "\nEdgeCutouts="+document.getElementById("EdgeCutouts").checked;
	OptionsParams = OptionsParams + "\nAEdgesBand="+document.getElementById("AEdgesBand").checked;

	document.getElementById("UploadProgressText").innerHTML = "Processing your order. Please wait.";
	document.getElementById("UploadProgressDiv").style.display = "initial";
    document.getElementById("FinishButtonBar").style.display = "none";
    document.getElementById("OtherOptions").style.display = "none";	
	
	var OrigFileName = document.getElementById("FileNamePar").innerHTML;
	
	ServerRequest("ProcFileName="+encodeURIComponent(ProcFileName)+"\n"+ButtonElem.id+"=Yes\nOrigFileName="+OrigFileName+OptionsParams);
	
} */
