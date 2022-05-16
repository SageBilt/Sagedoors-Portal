function ShowOptions(PButton)
{
var SectionStatus = PButton.parentNode.childNodes.item(1).childNodes.item(17).innerHTML;
//alert(PButton.parentNode.clientWidth);
PButton.style.borderStyle="inset"
var Dropdownbox = document.createElement("div");
Dropdownbox.setAttribute("style","font-size:15px;Width:60px;background-color: rgba(128,0,00,1);position:absolute;border:1px black solid;top:0px;z-index:900;");
Dropdownbox.id = "Dropbox";
Dropdownbox.style.left=PButton.parentNode.clientWidth-2+"px";
Dropdownbox.setAttribute("onmouseleave","HideOption(this.parentNode)");

var CopyTag = document.createElement("H4");
CopyTag.innerHTML = "Clone"
CopyTag.setAttribute("style","height:25px;text-align: center;margin:2px;");
CopyTag.className = "TOptions";
CopyTag.setAttribute("onclick","document.getElementById('Copy_Section').value=this.parentNode.parentNode.childNodes.item(1).childNodes.item(3).innerHTML;popup('Are you sure that you want to make a duplicate of '+this.parentNode.parentNode.childNodes.item(1).childNodes.item(3).innerHTML+'?',200,300,2,'Copy');");



Dropdownbox.appendChild( CopyTag );

if ( SectionStatus == 'Quote' || SectionStatus == 'Open' || SectionStatus == 'OnHold') {

var DeleteTag = document.createElement("H4");
DeleteTag.innerHTML = "Delete"
DeleteTag.setAttribute("style","height:25px;text-align: center;margin:2px;");
DeleteTag.className = "TOptions";
DeleteTag.setAttribute("onclick","document.getElementById('Delete_Section').value=this.parentNode.parentNode.childNodes.item(1).childNodes.item(3).innerHTML;popup('Are you sure that you want to Delete '+this.parentNode.parentNode.childNodes.item(1).childNodes.item(3).innerHTML+'?',200,300,2,'Delete');");

//Dropdownbox.style.Height="50px";
Dropdownbox.appendChild( DeleteTag );

}

PButton.parentNode.appendChild( Dropdownbox );
PButton.setAttribute("onclick","HideOption(this.parentNode)");

}

function HideOption(PDiv)
{
PDiv.removeChild(PDiv.lastChild);
PDiv.childNodes.item(3).setAttribute("onclick","ShowOptions(this)");
PDiv.childNodes.item(3).style.borderStyle="outset"
//alert(PDiv.childNodes.item(3).id);
}

/* var QuotesData = [
  { "Type" : "Panels", "RefNo" : "LP111155", "CreateDate" : "1/1/2020", "CreatedBy" : "David Bilton", "JobDesc" : "This Is a Test", "JobRef" : "Test 1", "DeliveryAddress" : "2 Tait Place", "Price" : "$110" }
 ,{ "Type" : "Panels", "RefNo" : "LP111155", "CreateDate" : "1/1/2020", "CreatedBy" : "David Bilton", "JobDesc" : "This Is a Test", "JobRef" : "Test 1", "DeliveryAddress" : "2 Tait Place", "Price" : "$110" } 
]; */

function GotoSection(LineID,Type) 
{
	document.getElementById("ExistOrderType").value=Type;
	document.getElementById("NewOrderType").value=Type; 	
	document.getElementById("Go_to_Section").value=LineID; 
	popup("Please wait while data is being Loaded!",160,400,3); document.Go_to_Section.submit(); 
}

function submitForm(Type)
{
if ( Type == "Delete" ) {popup("Please wait while Section is being deleted",160,400,3);document.Delete.submit();}
if ( Type == "Copy" ) {popup("Please wait while Section is being copied",160,400,3);document.Copy.submit();}
}

function FilterTableContent(TableDataDivID)
{
var TableDataDiv = document.getElementById(TableDataDivID);
var OrderType = TableDataDiv.getAttribute("data-OrderType");

	switch (OrderType)
	{
	case "Quotes" : var DataArray = QuotesData; break;
	case "Orders" : var DataArray = OrdersData; break;
	case "Completed" : var DataArray = CompletedData; break;
	}

	
}

function CopySection(SectionID)
{
	var OrderNumber = GetSelItemsOrderNos(SectionID);
	
	//alert(OrderNumber);
	if (OrderNumber != "")
	{
		document.getElementById('Copy_Section').value=OrderNumber;
		popup('Are you sure that you want to make a duplicate of '+OrderNumber+'?',200,300,2,'submitForm("Copy")');
	}	
}

function DeleteSections(SectionID)
{
	var OrderNumbers = GetSelItemsOrderNos(SectionID);
	if (OrderNumbers != "")
	{
		document.getElementById('Delete_Section').value=OrderNumbers;
		if (OrderNumbers.indexOf(",") > -1)
		{
		
		var SelCount = CheckSelItems(document.getElementById(SectionID).children[1].children[1].id);
		var addForTextHeight = Math.trunc(SelCount/4)*25;
		//alert(addForTextHeight);
		popup('Are you sure that you want to delete ordernumbers '+OrderNumbers+'?',200+addForTextHeight,300,2,'submitForm("Delete")');
		}
		else
		{
		popup('Are you sure that you want to delete '+OrderNumbers+'?',200,300,2,'submitForm("Delete")');	
		}
	}	
}


function CheckSelItems(TableDataDivID)
{
var TableDataDiv = document.getElementById(TableDataDivID);	
var CheckCount = 0;
var LineStatus = "";
var DeleteNotAllowed = false;

	var TrashButton = TableDataDiv.parentNode.parentNode.children[0].querySelector("#TrashButton");
	
	if (TrashButton != null)
	{	
	TrashButton.setAttribute("style","opacity:0.5;width:28px;");
	TrashButton.removeAttribute("disabled");	
	}

	TableDataDiv.parentNode.parentNode.children[0].children[0].setAttribute("style","opacity:0.5;width:28px;");
	TableDataDiv.parentNode.parentNode.children[0].children[0].removeAttribute("disabled");

	for (var i = 0; i<TableDataDiv.children.length; i++)
	{
	if (TableDataDiv.children[i].firstChild.firstChild.checked) {CheckCount++;}
	LineStatus = TableDataDiv.children[i].children[9].innerHTML;
		if (LineStatus != 'Quote' & LineStatus != 'Open' & TableDataDiv.children[i].firstChild.firstChild.checked)
		{
		DeleteNotAllowed = true;	
		}
	}
	//alert(CheckCount);
	
	if (CheckCount > 1) 
	{
	TableDataDiv.parentNode.parentNode.children[0].children[0].setAttribute("style","opacity:0.1;width:28px;");
	TableDataDiv.parentNode.parentNode.children[0].children[0].setAttribute("disabled","disabled");
	}
	
	if (TrashButton != null & CheckCount > 0)
	{	
		if (DeleteNotAllowed)
		{
		TrashButton.setAttribute("style","opacity:0.1;width:28px;");
		TrashButton.setAttribute("disabled","disabled");		
		}
	}
	
	
	//alert(TableDataDiv.parentNode.parentNode.children[0].querySelector("#TrashButton").id);

	
	
	return CheckCount
}

function GetSelItemsOrderNos(SectionID)
{	
var TableDataDiv = document.getElementById(SectionID).children[1].children[1];	
var ResultText = "";
var OrderNumber = "";
var LineStatus = "";

//alert(TableDataDiv.children[0].children[2].innerHTML);

	for (var i = 0; i<TableDataDiv.children.length; i++)
	{
		if (TableDataDiv.children[i].firstChild.firstChild.checked) 
		{
			OrderNumber = TableDataDiv.children[i].children[2].innerHTML;
			LineStatus = TableDataDiv.children[i].children[9].innerHTML;
			//if (LineStatus == 'Quote' | LineStatus == 'Open')
			//{
			if (ResultText == "") {ResultText = "'"+OrderNumber+"'";} else {ResultText = ResultText+", '"+OrderNumber+"'";}	
			//}
		}
	}
	
	return ResultText
}


function PopulateTableContent(TableDataDivID,FilterText)
{
var TableDataDiv = document.getElementById(TableDataDivID);
var OrderType = TableDataDiv.getAttribute("data-OrderType");

switch (OrderType)
{
case "Quotes" : var DataArray = QuotesData; var LineType = 'Quote'; break;
case "Orders" : var DataArray = OrdersData; var LineType = 'Order'; break;
case "Completed" : var DataArray = CompletedData; var LineType = 'Completed'; break;
}
FilterText = FilterText.toUpperCase();
//var FilterText =  document.getElementById(SeachBarID).value;
TableDataDiv.innerHTML = "";
var RowWasInserted = false;

		
	for (var i = 0; i<DataArray.length; i++)
	{
	var RovDiv = document.createElement("div");
	RovDiv.className = "TableRowHov";
	RovDiv.title = "Clicking on this will enter this Job/Quote";
	RowWasInserted = false;
	
		for (var RowI = 1; RowI<11; RowI++)
		{
	//alert(DataArray[i].CreatedBy.indexOf(FilterText) + " " + DataArray[i].CreatedBy + " " + FilterText);
			if (FilterText == "" | FilterText == undefined | FilterText == null | DataArray[i].RefNo.toUpperCase().indexOf(FilterText) > -1 | DataArray[i].CreatedBy.toUpperCase().indexOf(FilterText) > -1 
			| DataArray[i].JobDesc.toUpperCase().indexOf(FilterText) > -1 | DataArray[i].JobRef.toUpperCase().indexOf(FilterText) > -1 | DataArray[i].DeliveryAddress.toUpperCase().indexOf(FilterText) > -1)
			{
				var DataDiv = document.createElement("div");
				DataDiv.className = "TRows";
				switch (RowI)
				{
				case 1 : 
						DataDiv.setAttribute("style","width:50px;"); 
						var CheckBoxCntrl = document.createElement("input");
						CheckBoxCntrl.type = "checkbox";
						CheckBoxCntrl.title = "Select this item";
						CheckBoxCntrl.setAttribute("onclick","CheckSelItems('"+TableDataDivID+"');");
						//CheckBoxCntrl.setAttribute("data-OrderNumber",DataArray[i].RefNo);
						
						DataDiv.appendChild(CheckBoxCntrl);
						break;
				case 2 : DataDiv.setAttribute("style","width:70px;"); DataDiv.innerHTML = DataArray[i].Type; break;
				case 3 : DataDiv.setAttribute("style","width:70px;"); DataDiv.innerHTML = DataArray[i].RefNo; break;
				case 4 : DataDiv.setAttribute("style","width:100px;");DataDiv.innerHTML = DataArray[i].CreateDate; break;
				case 5 : DataDiv.setAttribute("style","width:130px;"); DataDiv.innerHTML = DataArray[i].CreatedBy; break;
				case 6 : DataDiv.setAttribute("style","width:200px;"); DataDiv.innerHTML = DataArray[i].JobDesc; break;
				case 7 : DataDiv.setAttribute("style","width:180px;"); DataDiv.innerHTML = DataArray[i].JobRef; break;
				case 8 : DataDiv.setAttribute("style","width:230px;"); DataDiv.innerHTML = DataArray[i].DeliveryAddress; break;
				case 9 : DataDiv.setAttribute("style","width:80px;"); DataDiv.innerHTML = DataArray[i].Price; break;
				case 10 : DataDiv.setAttribute("style","width:80px;"); DataDiv.innerHTML = DataArray[i].Status; break;
				}
				
				if (RowI > 1) {DataDiv.setAttribute("onclick","GotoSection('"+DataArray[i].RefNo+"','"+DataArray[i].Status+"');");}
				

				
			RovDiv.appendChild(DataDiv);
			RowWasInserted = true;
			}
			
		}
		
		if (RowWasInserted) { TableDataDiv.appendChild(RovDiv);}
		
	}
}