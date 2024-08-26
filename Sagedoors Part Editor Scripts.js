const AjaxRequestsURL = "https://remote.sagemfg.co.nz:8443/?script=Sagedoors%20Portal%20Ajax%20Requests";

var Rad = 180/Math.PI;
var degrees = Math.PI/180;
var UserRad = 50;

var IniMouseX=0;
var IniMouseY=0;

var ActiveMouseX=0;
var ActiveMouseY=0;

//var ViewboxRect = document.getElementById("PartEditorDiv").getBoundingClientRect();	

var ModeSelection = 'Operations';
var ToolsSelection = 'SelectTool';
var ViewFace = 'Back';
var EditingMode = 'Standard';
var SelectedObjects = { "Items" : [] , "StartX" : 0 , "StartY" : 0 , "EndX" : 0 , "EndY" : 0 };
var SelectBox = { "StartX" : 0 , "StartY" : 0 , "EndX" : 0 , "EndY" : 0 , "InSelect" : false };

var ToolPointClicks = [];
var SnapPoints = [];
var SmartlineV = {"SnapPointID": -1,"X":-50,"Y":-50};
var SmartlineH = {"SnapPointID": -1,"X":-50,"Y":-50};
var MoveObject = {"InMove": false,"X":0,"Y":0};
var VariableList = ["X","Y","PartLength","PartWidth","PartThick","Width","Dia","Qty","Spacing","AutoSpacing","MaxSpacing(300)","MaxSpacing(400)","PartLengthCentre","PartWidthCentre","Length","Tangential"];

/* For Zooming with middle mouse wheel */

var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

//window.onwheel = function(event){ if ( document.getElementById("PartEditpopUpDiv").hidden == false) {event.preventDefault(); } }
//document.getElementById("CanvasBorder").onmouseup = function(event){ if ( document.getElementById("PartEditpopUpDiv").hidden == false & event.button == 1) { alert(""); } }
//window.onauxclick = function(event){ alert(event);  }
//document.getElementById("CanvasBorder").addEventListener("mousewheel", function(event){ Zoom(event);});
document.getElementById("CanvasBorder").addEventListener(mousewheelevt, function(event){ Zoom(event);}, false);
//document.addEventListener("DOMMouseScroll", function(event){ Zoom(event); alert();}, false);
document.addEventListener("keydown", function(event){ if ( document.getElementById("PartEditpopUpDiv").hidden == false) { HotKey(event); } });

//document.onload = ShowParamsEditWindow();


//This is a test comment

var ScrollX = 0;
var ScrollY = 0;
window.onscroll = function () { if ( document.getElementById("PartEditpopUpDiv").hidden == false & detectMob() == false) {window.scrollTo(ScrollX, ScrollY);} };

/* document.onmousewheel = function(){ if ( document.getElementById("PartEditpopUpDiv").hidden == false) {stopWheel();} } //IE7, IE8
if(document.addEventListener){ Chrome, Safari, Firefox
    document.addEventListener('DOMMouseScroll', stopWheel, false);
}

function stopWheel(e){
    if(!e){ e = window.event; } //IE7, IE8, Chrome, Safari
    if(e.preventDefault) { e.preventDefault(); } //Chrome, Safari, Firefox
    e.returnValue = false; //IE7, IE8
} */


function FindViewPositionX(event)
{
var ViewboxRect = document.getElementById(event.target.id).getBoundingClientRect()	
var MouseX=event.clientX;
return (MouseX - ViewboxRect.left);
}

function FindViewPositionY(event)
{
var ViewboxRect = document.getElementById(event.target.id).getBoundingClientRect()	
var MouseY=event.clientY;
return (MouseY - ViewboxRect.top);
}

function ActualPositionX(event)
{
var ViewboxRect = document.getElementById(event.target.id).getBoundingClientRect();	
var MouseX=event.clientX;
return Math.round(((MouseX - ViewboxRect.left-ViewXOrigin)/ViewRatio)+(PartWidth/2));
}

function ActualPositionY(event)
{
var ViewboxRect = document.getElementById(event.target.id).getBoundingClientRect();	
var MouseY=event.clientY;
return PartLength - Math.round(((MouseY - ViewboxRect.top-ViewYOrigin)/ViewRatio)+(PartLength/2));
}

function Zoom(e)
{
	
	if (navigator.userAgent.indexOf("Firefox") > -1) { var WheelMoveValue = -e.detail; } else { var WheelMoveValue = e.wheelDelta; }	
//alert(event.type);
//alert(navigator.userAgent.indexOf("Firefox"));
//document.getElementById("TestP").innerHTML = e.deltaY;

if (WheelMoveValue > 0)
{
//document.getElementById("TestP").innerHTML = "ViewXOrigin=" +FindViewPositionX(e)+ " ViewYOrigin="+FindViewPositionY(e);
ViewXOrigin += ((event.target.width/2)-FindViewPositionX(e))/5;
ViewYOrigin += ((event.target.height/2)-FindViewPositionY(e))/5;	
}
else
{
ViewXOrigin -= ((event.target.width/2)-FindViewPositionX(e))/5;
ViewYOrigin -= ((event.target.height/2)-FindViewPositionY(e))/5;			
}	

//document.getElementById("TestP").innerHTML = "ViewXOrigin=" +((event.target.width/2)-FindViewPositionX(e))+ " ViewYOrigin="+((event.target.height/2)-FindViewPositionY(e));	
//document.getElementById("TestP").innerHTML = "ViewXOrigin=" +ViewXOrigin+ " ViewYOrigin="+ViewYOrigin;
	if (navigator.userAgent.indexOf("Firefox") > -1)
	{		
		if (ViewRatio+(40*WheelMoveValue)/1000 > 0) {ViewRatio += (40*WheelMoveValue)/1000;}
	}
	else
	{
		if (ViewRatio+WheelMoveValue/1000 > 0) {ViewRatio += WheelMoveValue/1000;}		
	}	
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function IsItemInList(Lookupvalue,ListArray)
{
var FoundValue = -1;
	for (var inc = 0; inc<ListArray.length; inc++)
	{
	if (ListArray[inc] == Lookupvalue) { FoundValue = ListArray[inc]; break;}	
	}
	
if (FoundValue == Lookupvalue) {return true;} else {return false;}
}

function MouseClickOnGraphic(event)
{
var CanvasObject = document.getElementById("CanvasBorder");

	if (EditingMode == 'Advanced')
	{
		switch (event.button)
		{
			case 0:
					//alert("x=" + (FindViewPositionX(event)/ViewRatio)+ " Y="+ (FindViewPositionY(event)/ViewRatio) + " Ratio=" + ViewRatio);
					
						switch (ToolsSelection)
						{
						case 'SelectTool':
							var ClickTol = 10/ViewRatio;
							//if (ModeSelection != 'Edgebanding')
							//{
									if (SelectedObjects.Items.length > 0) {ShowInputs();}
								
								
									CanvasObject.setAttribute("onmouseup","SelectObjects(event);");
									if (ActualPositionX(event) >= SelectedObjects.StartX-ClickTol & ActualPositionX(event) <= SelectedObjects.EndX+ClickTol & ActualPositionY(event) >= SelectedObjects.StartY-ClickTol & ActualPositionY(event) <= SelectedObjects.EndY+ClickTol || MoveObject.InMove == true )
									{
									//document.getElementById("TestP").innerHTML = "X=" + ActualPositionX(event) + " Y=" + ActualPositionY(event) + " StartX=" + SelectBox.StartX + " StartY=" + SelectBox.StartY + " EndX=" + SelectBox.EndX + " EndY=" + SelectBox.EndY;	
							
										if (SelectedObjects.Items.length > 0 & MoveObject.InMove == false)
										{			
											for (var i = 0; i<SnapPoints.length; i++)
											{
												if (ActiveMouseX > SnapPoints[i].X-ClickTol & ActiveMouseX < SnapPoints[i].X+ClickTol & ActiveMouseY > SnapPoints[i].Y-ClickTol & ActiveMouseY < SnapPoints[i].Y+ClickTol & ModeSelection == 'Operations') 
												{
													if (ActiveMouseX >= SelectedObjects.StartX-ClickTol & ActiveMouseY >= SelectedObjects.StartY-ClickTol & ActiveMouseX <= SelectedObjects.EndX+ClickTol & ActiveMouseY <= SelectedObjects.EndY+ClickTol)
													{
													MoveObject = {"InMove": true,"X":ActiveMouseX,"Y":ActiveMouseY};
													BuildSnapPoints();
													ShowInputs();
													document.getElementById("XPosInputCaption").focus();												
													}
												}

											}
										}
										else
										//if (MoveObject.InMove == true) 
										{
										SelectedObjects.Items.sort(function(a, b){return a-b});	
											for (var i = 0; i<SelectedObjects.Items.length; i++)
											{
												if (ModeSelection == 'Operations')
												{
													if (PartJSON.Operations[SelectedObjects.Items[i]].Type == 'Rebate' | PartJSON.Operations[SelectedObjects.Items[i]].Type == 'Route')
													{
													var OpLength = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Length);
													var OpDepth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Depth);
													var OpAngle = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Angle)*degrees;
													var OpWidth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Width); 	
													var	NewXPos = parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].X))-round(MoveObject.X-ActiveMouseX,3);
													var	NewYPos = parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Y))-round(MoveObject.Y-ActiveMouseY,3);
														if (CheckOperationAllowed(NewXPos,NewYPos,OpLength,OpWidth,OpAngle,OpDepth) == true)
														{
														PartJSON.Operations[SelectedObjects.Items[i]].X = (NewXPos).toString();
														PartJSON.Operations[SelectedObjects.Items[i]].Y = (NewYPos).toString();
														//delete PartJSON.PNCOperations;
														}
														else {popup("Invalid position! Operation too close to Edgebanding!",120,350,1);}
													}
													else
													{
														var	NewXPos = parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].X))-round(MoveObject.X-ActiveMouseX,3);
														var	NewYPos = parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Y))-round(MoveObject.Y-ActiveMouseY,3);
														PartJSON.Operations[SelectedObjects.Items[i]].X = (NewXPos).toString();
														PartJSON.Operations[SelectedObjects.Items[i]].Y = (NewYPos).toString();
														//delete PartJSON.PNCOperations;
													}
														
												}
												else
												{	
												var ConnVectors = FindConnedVector(PartJSON.Vectors[SelectedObjects.Items[i]],[SelectedObjects.Items[i]]);	
											
												PartJSON.Vectors[SelectedObjects.Items[i]].SX = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].SX))-round(MoveObject.X-ActiveMouseX,3)).toString();
												PartJSON.Vectors[SelectedObjects.Items[i]].SY = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].SY))-round(MoveObject.Y-ActiveMouseY,3)).toString();
												PartJSON.Vectors[SelectedObjects.Items[i]].EX = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].EX))-round(MoveObject.X-ActiveMouseX,3)).toString();
												PartJSON.Vectors[SelectedObjects.Items[i]].EY = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].EY))-round(MoveObject.Y-ActiveMouseY,3)).toString();
				
													if (SelectedObjects.Items.findIndex(function(ID) {return ID == ConnVectors.Start}) == -1 & ConnVectors.Start > -1) {PartJSON.Vectors[ConnVectors.Start].EX = PartJSON.Vectors[SelectedObjects.Items[i]].SX;PartJSON.Vectors[ConnVectors.Start].EY = PartJSON.Vectors[SelectedObjects.Items[i]].SY;}
													if (SelectedObjects.Items.findIndex(function(ID) {return ID == ConnVectors.End}) == -1 & ConnVectors.End > -1) {PartJSON.Vectors[ConnVectors.End].SX = PartJSON.Vectors[SelectedObjects.Items[i]].EX;PartJSON.Vectors[ConnVectors.End].SY = PartJSON.Vectors[SelectedObjects.Items[i]].EY;}
														
													if (PartJSON.Vectors[SelectedObjects.Items[i]].Type == 'Arc')
													{
													PartJSON.Vectors[SelectedObjects.Items[i]].CX = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].CX))-round(MoveObject.X-ActiveMouseX,3)).toString();
													PartJSON.Vectors[SelectedObjects.Items[i]].CY = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].CY))-round(MoveObject.Y-ActiveMouseY,3)).toString();													
													}
												//delete PartJSON.PNCOperations;	
												}
						
											}
										MoveObject.InMove = false;
										BuildSnapPoints();
										ToolPointClicks = [];
										FindSelectObjRec();
										ShowInputs();	
										}
		
									}
									else
									{
									document.getElementById("CanvasBorder").setAttribute("onmousemove","SetSelectRec(event);");
									SelectBox.InSelect = true;
									SelectBox.StartX=ActualPositionX(event);
									SelectBox.StartY=ActualPositionY(event);
									SelectBox.EndX = SelectBox.StartX;
									SelectBox.EndY = SelectBox.StartY;
									//document.getElementById("TestP").innerHTML = "StartX=" + SelectBox.StartX + " StartY=" + SelectBox.StartY + " EndX=" + SelectBox.EndX + " EndY=" + SelectBox.EndY;
									//document.getElementById("TestP").innerHTML = "InSelect";
									}
									
								
							//}
									break;
						case 'MeasureTool':
									if (ToolPointClicks.length >= 2) {CancelState();}
						
									if (ToolPointClicks.length < 2)
									{ToolPointClicks.push({ "Point" : ToolPointClicks.length+1 , "X" : ActiveMouseX , "Y" : ActiveMouseY });ShowInputs(); } 
									break;
						case 'Drilling':
									CanvasObject.removeAttribute("onmouseup");
									InsertObject(ActiveMouseX,ActiveMouseY);
									break;			
						case 'LineBore':
									CanvasObject.removeAttribute("onmouseup");
									if (ToolPointClicks.length == 0)
									{ToolPointClicks.push({ "Point" : 1 , "X" : ActiveMouseX , "Y" : ActiveMouseY }); } 
									else {InsertObject(ActiveMouseX,ActiveMouseY);}
									break;
						case 'Rebate':
									CanvasObject.removeAttribute("onmouseup");
									if (ToolPointClicks.length == 0)
									{ToolPointClicks.push({ "Point" : 1 , "X" : ActiveMouseX , "Y" : ActiveMouseY }); } 
									else {InsertObject(ActiveMouseX,ActiveMouseY);}
									break;
						case 'Route':
									CanvasObject.removeAttribute("onmouseup");
									if (ToolPointClicks.length == 0)
									{ToolPointClicks.push({ "Point" : 1 , "X" : ActiveMouseX , "Y" : ActiveMouseY }); } 
									else {InsertObject(ActiveMouseX,ActiveMouseY);}
									break;
						case 'ChainLine':
									CanvasObject.removeAttribute("onmouseup");
									if (CheckSnapPoint(ActiveMouseX,ActiveMouseY) == true) {
										if (ToolPointClicks.length == 0) {ToolPointClicks.push({ "Point" : 1 , "X" : ActiveMouseX , "Y" : ActiveMouseY });ShowInputs(); } 
										else {InsertObject(ActiveMouseX,ActiveMouseY);}
									}
									break;		
						case 'Line':
									CanvasObject.removeAttribute("onmouseup");
									if (CheckSnapPoint(ActiveMouseX,ActiveMouseY) == true) {
										if (ToolPointClicks.length == 0 ) {ToolPointClicks.push({ "Point" : 1 , "X" : ActiveMouseX , "Y" : ActiveMouseY });ShowInputs();} 
										else {InsertObject(ActiveMouseX,ActiveMouseY);}
									}
									break;					
						case 'CornerRadius':
									
									if (SelectedObjects.Items.length < 2)
									{
									CanvasObject.setAttribute("onmouseup","SelectObjects(event);");
									SelectBox.InSelect = true;
									SelectBox.StartX=ActualPositionX(event);
									SelectBox.StartY=ActualPositionY(event);
									SelectBox.EndX = SelectBox.StartX;
									SelectBox.EndY = SelectBox.StartY;
									}
									break;
						case '3PointArc':
									CanvasObject.removeAttribute("onmouseup");
									if (CheckSnapPoint(ActiveMouseX,ActiveMouseY) == true) {
										if (ToolPointClicks.length <= 1) {ToolPointClicks.push({ "Point" : ToolPointClicks.length+1 , "X" : ActiveMouseX , "Y" : ActiveMouseY });ShowInputs(); } 
										else {InsertObject(ActiveMouseX,ActiveMouseY);}
									}
									break;
						}
					break;
			case 1:
					CanvasObject.setAttribute("onmouseup","PanViewOff(event);");
					CanvasObject.style.cursor="move"
					PanViewOn(event);
					break;
			case 2:
					//if (ToolsSelection == 'SelectTool')
					//{
					CancelState();
					//}
					//break;
		}
	}
	
}

function CancelState()
{
	ClearSelectObjects();
	MoveObject.InMove = false;	
	SelectBox.InSelect = false;
	BuildSnapPoints();
	ToolPointClicks = [];
	FindSelectObjRec();
	ShowInputs();
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function CanvasMouseMove(event)
{
var XPosInput = document.getElementById("XPosInput");	
var YPosInput = document.getElementById("YPosInput");
var LengthInput = document.getElementById("LengthInput");
var AngleInput = document.getElementById("AngleInput");
ActiveMouseX = ActualPositionX(event);
ActiveMouseY = ActualPositionY(event);
var SnapTol = 10/ViewRatio;
var VirtHorTol = 50/ViewRatio;
var SnapType = 'No Snap'
var CustSnapPointCurser = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmUlEQVQ4T72UUQ7AIAhD5/0PvYUPDLJSQJfta1F5FimM6+NvbPJuFzc5vwNFib3UKtP1ZY0pZMESp/vLfxUoTxZCLBwBbZpWhUDbKaMAZIRSlf0hTXML2IFR66LSM2UK83aal0AvJd1D3/kU+MqmA2R2aqdctdPs09BXzsyqJOywqPFZXeiE8pvIjxaejruol5HCFFYxcHugP2GGJhWMxicsAAAAAElFTkSuQmCC")10 10, auto';



		SetCurserForTool();
		SmartlineH.SnapPointID = -1;
		SmartlineV.SnapPointID = -1;
		for (var i = 0; i<SnapPoints.length; i++)
		{
			//if (ModeSelection != 'Edgebanding')
			if (ToolsSelection == 'ChainLine' | ToolsSelection == 'Line' | ToolsSelection == '3PointArc')
			{
				if (ActiveMouseX > SnapPoints[i].X-SnapTol & ActiveMouseX < SnapPoints[i].X+SnapTol & ActiveMouseY > SnapPoints[i].Y-SnapTol & ActiveMouseY < SnapPoints[i].Y+SnapTol)
				{
					if (CheckSnapPoint(SnapPoints[i].X,SnapPoints[i].Y) == false) {document.getElementById("CanvasBorder").style.cursor='not-allowed';}
					else 
					{document.getElementById("CanvasBorder").style.cursor=CustSnapPointCurser;ActiveMouseX = SnapPoints[i].X;ActiveMouseY = SnapPoints[i].Y; SnapType = 'Point Snap'; }
				}
			}	
			
			if (ToolsSelection != "SelectTool" & ToolsSelection != 'CornerRadius' | MoveObject.InMove == true)
			{
				if (ActiveMouseX > SnapPoints[i].X-SnapTol & ActiveMouseX < SnapPoints[i].X+SnapTol & SnapType != 'Point Snap') {SmartlineH.SnapPointID = i; ActiveMouseX = SnapPoints[i].X; SmartlineH.X = ActiveMouseX; SmartlineH.Y = ActiveMouseY;SnapType = 'X Smart Line Snap';}
				if (ActiveMouseY > SnapPoints[i].Y-SnapTol & ActiveMouseY < SnapPoints[i].Y+SnapTol & SnapType != 'Point Snap') {SmartlineV.SnapPointID = i; ActiveMouseY = SnapPoints[i].Y; SmartlineV.X = ActiveMouseX; SmartlineV.Y = ActiveMouseY;SnapType = 'Y Smart Line Snap';}
			}
			
			if (ModeSelection == 'Operations' & SelectedObjects.Items.length > 0 & ToolsSelection == "SelectTool" & ActiveMouseX > SnapPoints[i].X-SnapTol & ActiveMouseX < SnapPoints[i].X+SnapTol & ActiveMouseY > SnapPoints[i].Y-SnapTol & ActiveMouseY < SnapPoints[i].Y+SnapTol) 
			{
				if (ActiveMouseX >= SelectedObjects.StartX-SnapTol & ActiveMouseY >= SelectedObjects.StartY-SnapTol & ActiveMouseX <= SelectedObjects.EndX+SnapTol & ActiveMouseY <= SelectedObjects.EndY+SnapTol)
				{document.getElementById("CanvasBorder").style.cursor="move"; ActiveMouseX = SnapPoints[i].X;ActiveMouseY = SnapPoints[i].Y}
			}
			

			if (ToolsSelection == 'MeasureTool')
			{
				if (ActiveMouseX > SnapPoints[i].X-SnapTol & ActiveMouseX < SnapPoints[i].X+SnapTol & ActiveMouseY > SnapPoints[i].Y-SnapTol & ActiveMouseY < SnapPoints[i].Y+SnapTol)
				{document.getElementById("CanvasBorder").style.cursor=CustSnapPointCurser; }
			}
			
		}
		
		if (ToolPointClicks.length > 0 & !event.ctrlKey) 
		{
			if (ActiveMouseX > ToolPointClicks[ToolPointClicks.length-1].X-VirtHorTol & ActiveMouseX < ToolPointClicks[ToolPointClicks.length-1].X+VirtHorTol) { ActiveMouseX = ToolPointClicks[ToolPointClicks.length-1].X; }
			if (ActiveMouseY > ToolPointClicks[ToolPointClicks.length-1].Y-VirtHorTol & ActiveMouseY < ToolPointClicks[ToolPointClicks.length-1].Y+VirtHorTol) { ActiveMouseY = ToolPointClicks[ToolPointClicks.length-1].Y; }
		}

		if (MoveObject.InMove == true)	{document.getElementById("CanvasBorder").style.cursor="move";}

		if (ToolsSelection != "SelectTool" & ToolsSelection != 'CornerRadius' | MoveObject.InMove == true)
		{
		XPosInput.value = round(ActiveMouseX,1);
		YPosInput.value = round(ActiveMouseY,1);
		}
		
		if (ToolPointClicks.length > 0)
		{
			if (ToolsSelection == 'ChainLine' | ToolsSelection == 'Line' | ToolsSelection == '3PointArc') 
			{
			AngleInput.value = round(Math.atan2( (ActiveMouseY-ToolPointClicks[0].Y),(ActiveMouseX-ToolPointClicks[0].X) )*Rad,1);
				if (ToolPointClicks.length == 1) {LengthInput.value = round(Math.sqrt( ( (ActiveMouseX-ToolPointClicks[0].X)*(ActiveMouseX-ToolPointClicks[0].X) )+( (ActiveMouseY-ToolPointClicks[0].Y)*(ActiveMouseY-ToolPointClicks[0].Y) ) ),1);}	
			}
	
		}
		
		
		//if (ToolPointClicks.length > 0)  {document.getElementById("TestP").innerHTML = (Math.atan2( (ActiveMouseY-ToolPointClicks[ToolPointClicks.length-1].Y),(ActiveMouseX-ToolPointClicks[ToolPointClicks.length-1].X) )*Rad);}
		
		//Math.sqrt( ( (ActiveMouseX-ToolPointClicks[0].X)*(ActiveMouseX-ToolPointClicks[0].X) )+( (ActiveMouseY-ToolPointClicks[0].Y)*(ActiveMouseY-ToolPointClicks[0].Y) ) );
		
		//document.getElementById("TestP").innerHTML = "ActiveMouseX="+ActiveMouseX+" ActiveMouseY="+ActiveMouseY; 
		//document.getElementById("TestP").innerHTML = document.activeElement.id	;
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function CheckSnapPoint(X,Y)
{
var Result = true;
	if (ToolsSelection == 'ChainLine' | ToolsSelection == 'Line' | ToolsSelection == '3PointArc')
	{
		for (var inc = 0; inc<PartJSON.Vectors.length; inc++)
		{
			if (CalcOutputValue(PartJSON.Vectors[inc].SX) == X & CalcOutputValue(PartJSON.Vectors[inc].SY) == Y)
			{
			var ConnVectors = FindConnedVector(PartJSON.Vectors[inc],[inc]);

				if (ConnVectors.Start > -1) {Result = false;}
			break;
			}
			if (CalcOutputValue(PartJSON.Vectors[inc].EX) == X & CalcOutputValue(PartJSON.Vectors[inc].EY) == Y)
			{
			var ConnVectors = FindConnedVector(PartJSON.Vectors[inc],[inc]);

				if (ConnVectors.End > -1) {Result = false;}
			break;
			}
		}
		for (var inc = 0; inc<ToolPointClicks.length; inc++)
		{
			if (ToolPointClicks[inc].X == X & ToolPointClicks[inc].Y == Y) {Result = false;}
		}
	} 
	return Result;
}

function CheckShapedClosed()
{
var Result = true;

	for (var inc = 0; inc<PartJSON.Vectors.length; inc++)
	{
	var ConnVectors = FindConnedVector(PartJSON.Vectors[inc],[inc]);
		if (ConnVectors.Start == -1 | ConnVectors.End == -1) {Result = false;}		
	}
	return Result;
	
}


function PanViewOn(event)
{
IniMouseX=event.clientX;
IniMouseY=event.clientY;
document.getElementById("CanvasBorder").setAttribute("onmousemove","PanViewOrigin(event);");
}

function PanViewOff(event)
{

IniMouseX=0;
IniMouseY=0;


	//if (ToolsSelection == "SelectTool") {document.getElementById("CanvasBorder").removeAttribute("onmousemove");} 

	document.getElementById("CanvasBorder").setAttribute("onmousemove","CanvasMouseMove(event);");
//document.getElementById("CanvasBorder").style.cursor="default"
//alert(document.getElementById("CanvasBorder"));
}

function PanViewOrigin(event)
{
var MouseX=event.clientX;
var MouseY=event.clientY;

ViewXOrigin -= (IniMouseX - MouseX);
ViewYOrigin -= (IniMouseY - MouseY);
	//alert(ViewXOrigin);
IniMouseX=event.clientX;
IniMouseY=event.clientY;

DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function ChangeSelTool(ToolButton)
{
	document.getElementById("CanvasBorder").removeAttribute("onmouseup");
	SelectedObjects.Items = [];
	ToolPointClicks = [];
	SelectBox.StartX=-100;
	SelectBox.StartY=-100;
	SelectBox.EndX=0;
	SelectBox.EndY=0;
	
	for (var i = 1; i<ToolButton.parentNode.childElementCount; i++)
	{
	ToolButton.parentNode.children[i].style.border = "1px solid rgba(43, 43, 43, 0.7)";
	}
	ToolButton.style.border = "2px solid red";
	

	switch (ToolButton.id)
	{
		case 'SelectImagebutton':
									ToolsSelection = "SelectTool";
									SetCurserForTool();
									break;
		case 'MeasureImagebutton':
									ToolsSelection = "MeasureTool";
									SetCurserForTool();
									break;							
		case 'DrillingImagebutton':
									ToolsSelection = "Drilling";
									SetCurserForTool();					
									break;
		case 'LineBoreImagebutton':
									ToolsSelection = "LineBore";
									SetCurserForTool();
									break;
		case 'RebateImagebutton':
									ToolsSelection = "Rebate";
									SetCurserForTool();
									break;
		case 'RouteImagebutton':
									ToolsSelection = "Route";
									SetCurserForTool();
									break;
		case 'ChainLineImagebutton':
									ToolsSelection = "ChainLine";
									SetCurserForTool();
									break;							
		case 'LineImagebutton':
									ToolsSelection = "Line";
									SetCurserForTool();
									break;
		case 'CornerRadiusImagebutton':
									document.getElementById("CanvasBorder").setAttribute("onmouseup","SelectObjects(event);");
									ToolsSelection = "CornerRadius";
									SetCurserForTool();
									break;
		case 'Point3ArcImagebutton':
									ToolsSelection = "3PointArc";
									SetCurserForTool();
									break;									
	}
	
	ShowInputs();
	
	
	//if (ToolsSelection == "SelectTool") {document.getElementById("CanvasBorder").removeAttribute("onmousemove");} 
	document.getElementById("CanvasBorder").setAttribute("onmousemove","CanvasMouseMove(event);");

	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function SetCurserForTool()
{
	var CanvasObject = document.getElementById("CanvasBorder");
	
	switch (ToolsSelection)
	{
		case 'SelectTool':
					CanvasObject.style.cursor="default" 
					break;
		case 'MeasureTool':
					CanvasObject.style.cursor="crosshair"
					break;
		case 'Drilling':
					CanvasObject.style.cursor="crosshair"					
					break;
		case 'LineBore':
					CanvasObject.style.cursor="crosshair"
					break;
		case 'Rebate':
					CanvasObject.style.cursor="crosshair"
					break;
		case 'Route':
					CanvasObject.style.cursor="crosshair"
					break;					
		case 'ChainLine':
					CanvasObject.style.cursor="crosshair"
					break;			
		case 'Line':
					CanvasObject.style.cursor="crosshair"
					break;
		case 'CornerRadius':
					CanvasObject.style.cursor="default"
					break;
		case '3PointArc':
					CanvasObject.style.cursor="crosshair"
					break;
	}
}

function ChangeEditMode(EditModeButton)
{
var ShapeOK = true;	

	if (ModeSelection == 'PartShape' & EditModeButton.id != 'PartShapeButton' & PartJSON.Vectors.length > 0) 
	{
	if (CheckShapedClosed() == false) {ShapeOK = false;	}
	else {SetShapeBounds();SetBandTickBoxesForCustomShape(document.getElementById(document.getElementById("selectedline").innerHTML));}
	}

if (ShapeOK)
{
	
	document.getElementById("CanvasBorder").removeAttribute("onmouseup");
	
	for (var i = 1; i<EditModeButton.parentNode.childElementCount; i++)
	{
	EditModeButton.parentNode.children[i].style.border = "1px solid rgba(43, 43, 43, 0.7)";
	}
	EditModeButton.style.border = "2px solid red";
	
	var InputContDiv = document.getElementById("ToolsGroup");	
	
	for (var i = 2; i<InputContDiv.childElementCount; i++)
	{
	InputContDiv.children[i].setAttribute("hidden","hidden");
	}
	
	document.getElementById("FaceRadio").removeAttribute("disabled");
	document.getElementById("BackRadio").removeAttribute("disabled");


	switch (EditModeButton.id)
	{
		case 'OperationsButton': 
			ModeSelection = 'Operations';
			document.getElementById("BackRadio").checked = true;
			ViewFace = 'Back'
			document.getElementById("MeasureImagebutton").removeAttribute("hidden");
			document.getElementById("CopyImagebutton").removeAttribute("hidden");
			document.getElementById("DeleteImagebutton").removeAttribute("hidden");
			document.getElementById("DrillingImagebutton").removeAttribute("hidden");
			document.getElementById("LineBoreImagebutton").removeAttribute("hidden");
			document.getElementById("RebateImagebutton").removeAttribute("hidden");
			document.getElementById("RouteImagebutton").removeAttribute("hidden");
			break;
		case 'EdgbandingButton': 
			ModeSelection = 'Edgebanding';
			document.getElementById("FaceRadio").setAttribute("disabled","disabled");
			document.getElementById("BackRadio").setAttribute("disabled","disabled");
			document.getElementById("FaceRadio").checked = true;			
			ViewFace = 'Front';		
			break;							
		case 'PartShapeButton': 
			ModeSelection = 'PartShape';
			document.getElementById("FaceRadio").setAttribute("disabled","disabled");
			document.getElementById("BackRadio").setAttribute("disabled","disabled");
			document.getElementById("FaceRadio").checked = true;			
			ViewFace = 'Front';
			document.getElementById("MeasureImagebutton").removeAttribute("hidden");
			document.getElementById("DeleteImagebutton").removeAttribute("hidden");
			document.getElementById("ChainLineImagebutton").removeAttribute("hidden");
			document.getElementById("LineImagebutton").removeAttribute("hidden");
			document.getElementById("CornerRadiusImagebutton").removeAttribute("hidden");
			document.getElementById("Point3ArcImagebutton").removeAttribute("hidden");
			break;	
	}
	
	ToolsSelection = "SelectTool";
	SetCurserForTool();
	
	SelectedObjects.Items = [];
	BuildSnapPoints();
	ShowInputs();
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}
else {popup("Invalid Shape! Shaped not closed.",150,350,1);}
}


function ShowInputs()
{
var InputContDiv = document.getElementById("ElementControlsDiv");

	for (var i = 1; i<InputContDiv.childElementCount; i++)
	{
	InputContDiv.children[i].setAttribute("hidden","hidden");
	}
	
	document.getElementById("VarButXPos").removeAttribute("hidden");
    document.getElementById("VarButYPos").removeAttribute("hidden");
	document.getElementById("VarButLength").removeAttribute("hidden");
	document.getElementById("XPosInputCaption").value = "X Position";
	document.getElementById("YPosInputCaption").value = "Y Position";
	
	document.getElementById("XPosInputCaption").focus();
	

	if (ModeSelection != 'Edgebanding')
	{	

		if (SelectedObjects.Items.length == 0 & ToolsSelection != "SelectTool" & ToolsSelection != "CornerRadius" )
		{
			document.getElementById("StartPosInputs").removeAttribute("hidden");
			document.getElementById("VarButXPos").setAttribute("hidden","hidden");
			document.getElementById("VarButYPos").setAttribute("hidden","hidden");
			if (ToolPointClicks.length > 0)
			{
				if (ToolsSelection == 'ChainLine' | ToolsSelection == 'Line' | ToolsSelection == '3PointArc') 
				{	
				document.getElementById("LengthInputs").removeAttribute("hidden");
				document.getElementById("AngleInputs").removeAttribute("hidden");
				document.getElementById("VarButLength").setAttribute("hidden","hidden");
				document.getElementById("LengthInput").tabIndex = "3";
				document.getElementById("AngleInputs").tabIndex = "4";
				
					if (ToolsSelection == '3PointArc' & ToolPointClicks.length > 1) {document.getElementById("VarButLength").setAttribute("hidden","hidden");}
				}
			}
		}
		else
		{			
			if (ModeSelection == 'Operations')
			{
				if (SelectedObjects.Items.length == 1 & MoveObject.InMove == false) 
				{
				document.getElementById("ObjectType").removeAttribute("hidden");
				document.getElementById("StartPosInputs").removeAttribute("hidden");
				
				document.getElementById("AfterPosHR").removeAttribute("hidden");
				document.getElementById("WidthInputs").removeAttribute("hidden");
				document.getElementById("DepthInputs").removeAttribute("hidden");
				document.getElementById("XPosInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].X);
				document.getElementById("YPosInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Y);
				document.getElementById("WidthInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Width);
				document.getElementById("DepthInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Depth);
				
				document.getElementById("WidthInput").tabIndex = "3";
				document.getElementById("DepthInput").tabIndex = "4";
			
								
				document.getElementById("WidthInputCaption").value = "Width";
				
				document.getElementById("VisibleInputDiv").removeAttribute("hidden");	
				
				document.getElementById("ObjectType").innerHTML = PartJSON.Operations[SelectedObjects.Items[0]].Type;
				if (PartJSON.Operations[SelectedObjects.Items[0]].Type == 'LineBore') { document.getElementById("ObjectType").innerHTML = 'Multi Drill';}
				if (PartJSON.Operations[SelectedObjects.Items[0]].Type == 'Hole') { document.getElementById("ObjectType").innerHTML = 'Single Drill';}
			
			
				if (PartJSON.Operations[SelectedObjects.Items[0]].hasOwnProperty("VisibleCond") )
				{document.getElementById("VisibleInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].VisibleCond);}
				else {document.getElementById("VisibleInput").value = "";}
			
			
					switch (PartJSON.Operations[SelectedObjects.Items[0]].Type)
					{
					case 'Hole':

							document.getElementById("WidthInputCaption").value = "Diameter";
							//SetInputValues();
							break;
					case 'LineBore':
							document.getElementById("WidthInputCaption").value = "Diameter";
							document.getElementById("AngleInputs").removeAttribute("hidden");
							document.getElementById("AngleInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Angle);
							
							document.getElementById("LineBoreInputs").removeAttribute("hidden");
							document.getElementById("QtyInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Qty);
							document.getElementById("SpacingInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Spacing);
							document.getElementById("AngleInput").tabIndex = "5";
							document.getElementById("QtyInput").tabIndex = "6";
							document.getElementById("SpacingInput").tabIndex = "7";
							break;
					default:
							document.getElementById("LengthInputs").removeAttribute("hidden");
							document.getElementById("AngleInputs").removeAttribute("hidden");
							document.getElementById("LengthInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Length);
							document.getElementById("AngleInput").value = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Angle);
							
							document.getElementById("LengthInput").tabIndex = "3";
							document.getElementById("WidthInput").tabIndex = "4";
							document.getElementById("DepthInput").tabIndex = "5";
							document.getElementById("AngleInput").tabIndex = "6";
							document.getElementById("QtyInput").tabIndex = "7";
							document.getElementById("SpacingInput").tabIndex = "8";
							break;
					}
				}
			}
			else
			{
				if (SelectedObjects.Items.length == 1 & MoveObject.InMove == false & ToolsSelection != 'CornerRadius' )				
				{
					document.getElementById("ObjectType").removeAttribute("hidden");
					//if (PartJSON.Vectors[SelectedObjects.Items[0]].Type != 'Arc')
					//{
					document.getElementById("ObjectType").innerHTML = PartJSON.Vectors[SelectedObjects.Items[0]].Type;	
					document.getElementById("StartPosInputs").removeAttribute("hidden");
					document.getElementById("XPosInputCaption").value = "X Start";
					document.getElementById("YPosInputCaption").value = "Y Start";
					document.getElementById("XPosInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].SX);
					document.getElementById("YPosInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].SY);
					document.getElementById("EndPosInputs").removeAttribute("hidden");
					document.getElementById("XEndInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].EX);
					document.getElementById("YEndInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].EY);
					document.getElementById("ObjectType").innerHTML = "Line";
					
					if (PartJSON.Vectors[SelectedObjects.Items[0]].Type == 'Arc')
					{
					document.getElementById("ArcCentreInputs").removeAttribute("hidden");
					document.getElementById("XArcCentreInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].CX);
					document.getElementById("YArcCentreInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].CY);
					document.getElementById("RadiusInput").value = GetVarText(PartJSON.Vectors[SelectedObjects.Items[0]].Radius);
				    document.getElementById("ObjectType").innerHTML = "Arc";
					}
					//}
				}			
			}


				if (SelectedObjects.Items.length > 1 & MoveObject.InMove == false) 
				{
				document.getElementById("ObjectType").removeAttribute("hidden"); document.getElementById("ObjectType").innerHTML = "Group";
				document.getElementById("StartPosInputs").removeAttribute("hidden");
				document.getElementById("XPosInputCaption").value = "X Centre";
				document.getElementById("YPosInputCaption").value = "Y Centre";
				document.getElementById("VarButXPos").setAttribute("hidden","hidden");
				document.getElementById("VarButYPos").setAttribute("hidden","hidden");
				document.getElementById("XPosInput").value = round(SelectedObjects.StartX+((SelectedObjects.EndX-SelectedObjects.StartX)/2),1);
				document.getElementById("YPosInput").value = round(SelectedObjects.StartY+((SelectedObjects.EndY-SelectedObjects.StartY)/2),1);

				}
				
				if (MoveObject.InMove == true) 
				{
				document.getElementById("StartPosInputs").removeAttribute("hidden");
				document.getElementById("XPosInput").value = round(ActiveMouseX,1);
				document.getElementById("YPosInput").value = round(ActiveMouseY,1);
				document.getElementById("VarButXPos").setAttribute("hidden","hidden");
				document.getElementById("VarButYPos").setAttribute("hidden","hidden");
				}

		}
	}	
	
}

function ChangeEditingMode(RadioID)
{
	switch (RadioID)
	{
	case 'StdModeRadio': 
						document.getElementById("EditTypeGroup").setAttribute("hidden","hidden");
						document.getElementById("ToolsGroup").setAttribute("hidden","hidden");
						document.getElementById("ElementControlsDiv").setAttribute("hidden","hidden");
						document.getElementById("PartParamsImagebutton").setAttribute("hidden","hidden");
						
						document.getElementById("TemplateGroup").removeAttribute("hidden");
						document.getElementById("ParametersDiv").removeAttribute("hidden");
						
						document.getElementById("ObjectType").innerHTML = "Part Parameters";
						
						document.getElementById("ParametersDiv").removeAttribute("hidden");						
						EditingMode = 'Standard'; 
						AddParametersToDiv(PartJSON,document.getElementById("ParamsList"));
						
						ChangeEditMode(document.getElementById('OperationsButton'));
						ChangeSelTool(document.getElementById('SelectImagebutton'));
						break;
						
	case 'AdvancedModeRadio':
						document.getElementById("EditTypeGroup").removeAttribute("hidden");
						document.getElementById("ToolsGroup").removeAttribute("hidden");
						document.getElementById("ElementControlsDiv").removeAttribute("hidden");
						document.getElementById("PartParamsImagebutton").removeAttribute("hidden");
						
						document.getElementById("TemplateGroup").setAttribute("hidden","hidden");
						document.getElementById("ParametersDiv").setAttribute("hidden","hidden");
						PartJSON,document.getElementById("ParamsList").innerHTML = '';
						EditingMode = 'Advanced'; 
						
						break;
	}
	SelectedObjects.Items = [];
	//BuildSnapPoints();
	ShowInputs();
	//DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
	
}


function ChangeFaceView(RadioID)
{
	switch (RadioID)
	{
	case 'FaceRadio': ViewFace = 'Front'; break;
	case 'BackRadio': ViewFace = 'Back'; break;
	}
	SelectedObjects.Items = [];
	BuildSnapPoints();
	ShowInputs();
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function HotKey(event)
{
	//var document.getElementById(event.target.id).class
	//alert(event.key);
	//alert(event.key.search(/[0-9]/));
	switch (event.key)
	{
	case 'Delete': if (event.target.id == '') {DeleteObject();} break;
	case 'Tab': CycleFocusInputs(event); break;
	case 'c' : if (event.ctrlKey == true & event.target.id == '') {CopyObject();} break;
	case 'Escape' : if (event.target.id == '') {CancelState();} break;
	}
	
	if (ToolPointClicks.length > 0 | document.getElementById("LengthInput").hidden == false)
	{
		//alert(event.key.search(/[0-9]/));
		if (event.key != undefined)
		{
			if (event.key.search(/[0-9]/) > -1 & FocusedInput() == false) {document.getElementById("LengthInput").focus();document.getElementById("LengthInput").select();}
		}
	}
}

function FocusedInput()
{
var result = false;
	var InputBoxes = document.querySelectorAll("input.inputright");
	
	for (var inc = 0; inc<InputBoxes.length; inc++)
	{
	//alert(InputBoxes[inc].id);	
		if (document.activeElement.id == InputBoxes[inc].id) {result = true;} 
	}
	return result;
}

function CycleFocusInputs(e)
{
var InputContDiv = document.getElementById("ElementControlsDiv");	
var InputBoxes = document.querySelectorAll("input.inputright");	
var FocusNextItem = false;			
	//document.getElementById("TestP").innerHTML = InputContDiv.id + " " + document.activeElement.parentNode.parentNode.id;
	//alert(document.activeElement.parentNode.parentNode.parentNode.id);		
	 //if (document.activeElement.id == "OperationsButton" | document.activeElement.parentNode.parentNode.parentNode.id != InputContDiv.id) {document.getElementById("XPosInput").focus();}
 	 for (var i = 0; i<InputBoxes.length; i++)
	{
//alert(InputBoxes[i].id + ' '+ document.activeElement.id + ' '+FocusNextItem+' '+InputBoxes[i].parentNode.parentNode.getAttribute("hidden"));	
		if (FocusNextItem == true & InputBoxes[i].parentNode.parentNode.getAttribute("hidden") != "hidden" ) {InputBoxes[i].focus();InputBoxes[i].select();break; } //alert(InputBoxes[i]);
		if (InputBoxes[i].id == document.activeElement.id) 
		{
			FocusNextItem = true; 
			if (i == InputBoxes.length-1) {InputBoxes[0].focus();InputBoxes[0].select();}	
			//document.getElementById("TestP").innerHTML = "Length=" + document.activeElement.id;
		}

		if (i == InputBoxes.length-1) {InputBoxes[0].focus();InputBoxes[0].select();}		
	}   
	e.preventDefault();
}

function CopyObject()
{
var currentLength = PartJSON.Operations.length;

	if (ModeSelection == 'Operations')
	{

		for (var i = 0; i<SelectedObjects.Items.length; i++)
		{
		var ObjString = JSON.parse(JSON.stringify(PartJSON.Operations[SelectedObjects.Items[i]]));	
		PartJSON.Operations.push(ObjString);
		delete PartJSON.PNCOperations;
		//PartJSON.Operations.copyWithin(PartJSON.Operations.length-1,SelectedObjects.Items[i]);
		//document.getElementById("TestP").innerHTML = JSON.stringify(PartJSON.Operations[SelectedObjects.Items[i]]);	
		}
		SelectedObjects.Items = [];

		for (var i = currentLength; i<PartJSON.Operations.length; i++)
		{
			//PartJSON.Operations[i].X += 200;
		SelectedObjects.Items.push(i);	
		}
		MoveObject = {"InMove": true,"X":round(SelectedObjects.StartX+((SelectedObjects.EndX-SelectedObjects.StartX)/2),1),"Y":round(SelectedObjects.StartY+((SelectedObjects.EndY-SelectedObjects.StartY)/2),1)};
	}
	
	/* if (ModeSelection == 'PartShape')
	{
		for (var i = 0; i<SelectedObjects.Items.length; i++)
		{
		var ObjString = JSON.parse(JSON.stringify(PartJSON.Vectors[SelectedObjects.Items[i]]));	
		PartJSON.Vectors.push(ObjString);	
		}
		SelectedObjects.Items = [];

		for (var i = currentLength; i<PartJSON.Vectors.length; i++)
		{
		SelectedObjects.Items.push(i);	
		}
	} */
	//document.getElementById("TestP").innerHTML = round(SelectedObjects.StartX+((SelectedObjects.EndX-SelectedObjects.StartX)/2),1);
	FindSelectObjRec();
	BuildSnapPoints();
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function DeleteObject()
{
	if (ModeSelection == 'Operations')
	{
		for (var i = 0; i<SelectedObjects.Items.length; i++)
		{
		PartJSON.Operations.splice(SelectedObjects.Items[i]-i,1);
		delete PartJSON.PNCOperations;	
		}
	}
	
	if (ModeSelection == 'PartShape')
	{	
		
		for (var i = 0; i<SelectedObjects.Items.length; i++)
		{
		var CurrentIndex = SelectedObjects.Items[i]-i;	
		var ConnVectors = FindConnedVector(PartJSON.Vectors[CurrentIndex],[CurrentIndex]);

		
		PartJSON.Vectors.splice(CurrentIndex,1);
		delete PartJSON.PNCVectors;
			//var TrueStartVector = ConnVectors.Start;
			//var TrueEndVector = ConnVectors.End;

			if (ConnVectors.Start > -1) 
			{
				if (ConnVectors.Start > CurrentIndex) {SetVectorAutoParams(ConnVectors.Start-1);} else {SetVectorAutoParams(ConnVectors.Start);}
				
			} 
			if (ConnVectors.End > -1) 
			{
				//alert("CurrentIndex="+CurrentIndex+" End="+ConnVectors.End);
				if (ConnVectors.End > CurrentIndex) {SetVectorAutoParams(ConnVectors.End-1);} else {SetVectorAutoParams(ConnVectors.End);}
			} 		
		}
	}
		
	SelectedObjects.Items = [];
	BuildSnapPoints();
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
	ShowInputs();
	document.getElementById("SelectImagebutton").focus();	
}

function ChangeConnVectPointValues(ConnVectors,ChangedField,NewValue)
{
var ConnIsReversed = false;
var ArcConnIsReversed = false;
var Field = '';
var ConnItem = [];
var ConnItemVectorID = -1;
var ArcConnVectorID = -1;
var ChangeStartPoint = true;
var ArcConnField = '';

	if (ChangedField == 'SX' | ChangedField == 'SY')
	{
	if (ConnVectors.StartRev == true) {ConnIsReversed = true;}	
	var ConnItem = PartJSON.Vectors[ConnVectors.Start];
	ConnItemVectorID = ConnVectors.Start;
	}
	if (ChangedField == 'EX' | ChangedField == 'EY')
	{
	if (ConnVectors.EndRev == true) {ConnIsReversed = true;}	
	var ConnItem = PartJSON.Vectors[ConnVectors.End];
	ConnItemVectorID = ConnVectors.End;
	}		
	
	
	switch (ChangedField)
	{
	case 'SX':
			if (ConnIsReversed == true) {Field = 'SX';} else {Field = 'EX';}	
			break;
	case 'SY':
			if (ConnIsReversed == true) {Field = 'SY';} else {Field = 'EY';}
			break;
	case 'EX':
			if (ConnIsReversed == true) {Field = 'EX';} else {Field = 'SX';}
			ChangeStartPoint = false;
			break;
	case 'EY':
			if (ConnIsReversed == true) {Field = 'EY';} else {Field = 'SY';}
			ChangeStartPoint = false;
			break;
	}
			//alert(" ConnStart="+ConnVectors.Start+" ConnEnd="+ConnVectors.End+" NewValue="+NewValue);

	
	if (ConnItem.Type == 'Arc') 
	{
	var ArcConnVectors = FindConnedVector(ConnItem,[ConnItemVectorID]);
		
	var Offset = CalcOutputValue(NewValue)-CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][Field]);
	
	switch (Field)
	{
	case 'SX':var OtherPointField = 'EX';var CenterField = 'CX';break;
	case 'SY':var OtherPointField = 'EY';var CenterField = 'CY';break;
	case 'EX':var OtherPointField = 'SX';var CenterField = 'CX';break;
	case 'EY':var OtherPointField = 'SY';var CenterField = 'CY';break;	
	}
	
	//var OtherPointOffset = CalcOutputValue(NewValue)-CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][OtherPointField]);
	
	//alert(OtherPointField + " " + CenterField + " " + Field);
	

	
	//alert(ChangedField + " Offset=" + Offset);
		if (ConnIsReversed == false & ChangeStartPoint == false | ConnIsReversed == true & ChangeStartPoint == true) 
		{
			ArcConnVectorID = ArcConnVectors.End;
			ArcConnIsReversed = ArcConnVectors.EndRev;
			//if(ArcConnVectors.EndRev == true) {PartJSON.Vectors[ArcConnVectors.End][OtherPointField] = CalcOutputValue(PartJSON.Vectors[ArcConnVectors.End][OtherPointField])+Offset;} 
			//else {PartJSON.Vectors[ArcConnVectors.End][Field] = CalcOutputValue(PartJSON.Vectors[ArcConnVectors.End][Field])+Offset;}
		}
		else
		{
			ArcConnVectorID = ArcConnVectors.Start;
			ArcConnIsReversed = ArcConnVectors.StartRev;
			//if(ArcConnVectors.StartRev == true) {PartJSON.Vectors[ArcConnVectors.Start][OtherPointField] = CalcOutputValue(PartJSON.Vectors[ArcConnVectors.Start][OtherPointField])+Offset;} 
			//else {PartJSON.Vectors[ArcConnVectors.Start][Field] = CalcOutputValue(PartJSON.Vectors[ArcConnVectors.Start][Field])+Offset;}	
		}
		
		if (ArcConnIsReversed) {ArcConnField = OtherPointField;} else {ArcConnField = Field;}
	

	
	
		if (NewValue.indexOf(';') > -1 & NewValue.indexOf("Tangential") == -1) 
		{
		var CentrePointOffset = -(CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][Field])-CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][CenterField]));
		var OtherPointOffset = -(CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][Field])-CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][OtherPointField]));
		var OutputValue = NewValue.substring(0,NewValue.indexOf(';'));
		
		var CentrePointfirstChar = CentrePointOffset.toString().substr(0, 1);
		var OtherPointfirstChar = OtherPointOffset.toString().substr(0, 1);
		
		//alert(OtherPointOffset.toString());
		
		//alert(CentrePointfirstChar + " " + OtherPointfirstChar );
	
		if (CentrePointfirstChar != "0" & CentrePointfirstChar != "-" | CentrePointfirstChar == "0") {CentrePointOffset = "+" + CentrePointOffset;}
		if (OtherPointfirstChar != "0" & OtherPointfirstChar != "-" | OtherPointfirstChar == "0" ) {OtherPointOffset = "+" + OtherPointOffset;}
		
		//alert(CentrePointOffset + " " + OtherPointOffset + " " + OutputValue);
		
		PartJSON.Vectors[ConnItemVectorID][CenterField] = OutputValue + CentrePointOffset;
		PartJSON.Vectors[ConnItemVectorID][OtherPointField] = OutputValue + OtherPointOffset;
		PartJSON.Vectors[ArcConnVectorID][ArcConnField] = OutputValue + OtherPointOffset;
		}
		else
		{
			if (NewValue.indexOf("Tangential") > -1) {var TangentText = 'Tangential' + ';';} else {var TangentText = '';}
		PartJSON.Vectors[ConnItemVectorID][CenterField] = TangentText+parseFloat(CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][CenterField])+Offset);
		PartJSON.Vectors[ConnItemVectorID][OtherPointField] = TangentText+parseFloat(CalcOutputValue(PartJSON.Vectors[ConnItemVectorID][OtherPointField])+Offset);
		PartJSON.Vectors[ArcConnVectorID][ArcConnField] = TangentText+parseFloat(CalcOutputValue(PartJSON.Vectors[ArcConnVectorID][ArcConnField])+Offset);
		}
		
	
	
	}	
	
	//alert(NewValue);
	PartJSON.Vectors[ConnItemVectorID][Field] = NewValue;

	//SetVectorAutoParams(ConnItemVectorID);
	return {"ConnItemVectorID" : ConnItemVectorID , "ArcConnVectorID" : ArcConnVectorID , }
	
}

function ChangeArcRadius(ArcIndex,NewRadius)
{
var CentreX = CalcOutputValue(PartJSON.Vectors[ArcIndex].CX);
var CentreY = CalcOutputValue(PartJSON.Vectors[ArcIndex].CY);
var StartX = CalcOutputValue(PartJSON.Vectors[ArcIndex].SX);
var StartY = CalcOutputValue(PartJSON.Vectors[ArcIndex].SY);
var EndX = CalcOutputValue(PartJSON.Vectors[ArcIndex].EX);
var EndY = CalcOutputValue(PartJSON.Vectors[ArcIndex].EY);	
var StartAngle = Math.atan2( (StartY-CentreY),(StartX-CentreX) );
var EndAngle = Math.atan2( (EndY-CentreY),(EndX-CentreX) );
var RadiusValue = CalcOutputValue(NewRadius);
var RadiusOffset = RadiusValue-CalcOutputValue(PartJSON.Vectors[ArcIndex].Radius);

//alert(RadiusValue);


	/*If the centre point is parametric then shift the start and end points*/
	if (PartJSON.Vectors[ArcIndex].CX.indexOf(';') == -1 & PartJSON.Vectors[ArcIndex].CY.indexOf(';') == -1)
	{
		if ((EndAngle-StartAngle)*Rad > 180 | (EndAngle-StartAngle)*Rad < -180)
		{var BiSectAngle = StartAngle+(((EndAngle % 360)-(StartAngle % 360))/2);} else {var BiSectAngle = StartAngle+((EndAngle-StartAngle)/2);}
	
		//alert(RadiusOffset + " " + Math.cos(BiSectAngle)*RadiusOffset);
	
		var NewCentreX = CentreX-Math.cos(BiSectAngle)*RadiusOffset;
		var NewCentreY = CentreY-Math.sin(BiSectAngle)*RadiusOffset;
		PartJSON.Vectors[ArcIndex].CX = CalcInputValue(NewCentreX);
		PartJSON.Vectors[ArcIndex].CY = CalcInputValue(NewCentreY);
		 	
	}
	else
	{
	var NewCentreX = CentreX;
	var NewCentreY = CentreY;	
	}
	
	if (PartJSON.Vectors[ArcIndex].SX.indexOf("Tangential") == -1 & PartJSON.Vectors[ArcIndex].SY.indexOf("Tangential") == -1)
	{
		var NewStartX = NewCentreX+Math.cos(StartAngle)*RadiusValue;
		var NewStartY = NewCentreY+Math.sin(StartAngle)*RadiusValue;
		PartJSON.Vectors[ArcIndex].SX = CalcInputValue(NewStartX);
		PartJSON.Vectors[ArcIndex].SY = CalcInputValue(NewStartY);
	}
	if (PartJSON.Vectors[ArcIndex].EX.indexOf("Tangential") == -1 & PartJSON.Vectors[ArcIndex].EY.indexOf("Tangential") == -1)
	{
		var NewEndX = NewCentreX+Math.cos(EndAngle)*RadiusValue;
		var NewEndY = NewCentreY+Math.sin(EndAngle)*RadiusValue;
		PartJSON.Vectors[ArcIndex].EX = CalcInputValue(NewEndX);
		PartJSON.Vectors[ArcIndex].EY = CalcInputValue(NewEndY);
	}
	
	PartJSON.Vectors[ArcIndex].Radius = NewRadius;
	
	return {"StartX" : PartJSON.Vectors[ArcIndex].SX , "StartY" : PartJSON.Vectors[ArcIndex].SY , "EndX" : PartJSON.Vectors[ArcIndex].EX , "EndY" : PartJSON.Vectors[ArcIndex].EY }
	
}

function ShiftArcPoints(ArcIndex,CenterField,NewValue)
{
var NewValueNum = CalcOutputValue(NewValue);
var OldValueNum = CalcOutputValue(PartJSON.Vectors[ArcIndex][CenterField]);
var Offset = NewValueNum-OldValueNum;
										
	switch (CenterField)
	{
	case 'CX':var StartField = 'SX';var EndField = 'EX';break;
	case 'CY':var StartField = 'SY';var EndField = 'EY';break;
	}
	
var OldStartValue = PartJSON.Vectors[ArcIndex][StartField];
var OldEndValue = PartJSON.Vectors[ArcIndex][EndField]	
	
	if (OldStartValue.indexOf(';') > -1 & OldStartValue.indexOf("Tangential") == -1) 
	{
	var OutputValue = NewValue.substring(0,NewValue.indexOf(';'));
	var StartPointOffset = -(OldValueNum-CalcOutputValue(OldStartValue));
	
	var StartPointfirstChar = StartPointOffset.toString().substr(0, 1);
	
	if (StartPointfirstChar != "-" ) {StartPointOffset = "+" + StartPointOffset;}
	
	PartJSON.Vectors[ArcIndex][StartField] = OutputValue + StartPointOffset;
	//alert(PartJSON.Vectors[ArcIndex][StartField]+' ' +PartJSON.Vectors[ArcIndex][EndField]);
	}
	else
	{
		if (OldStartValue.indexOf("Tangential") > -1) {var TangentText = 'Tangential' + ';';} else {var TangentText = '';}
	PartJSON.Vectors[ArcIndex][StartField] = TangentText+parseFloat(CalcOutputValue(OldStartValue)+Offset);
	//alert(PartJSON.Vectors[ArcIndex][StartField]+' ' +PartJSON.Vectors[ArcIndex][EndField]);
	//SetConstraintsValues(ArcIndex,true);
	}
	
	if (OldEndValue.indexOf(';') > -1 & OldEndValue.indexOf("Tangential") == -1) 
	{
	var OutputValue = NewValue.substring(0,NewValue.indexOf(';'));
	var EndPointOffset = -(OldValueNum-CalcOutputValue(OldEndValue));
	
	var EndPointfirstChar = EndPointOffset.toString().substr(0, 1);
	
	if (EndPointfirstChar != "-" ) {EndPointOffset = "+" + EndPointOffset;}
	
	PartJSON.Vectors[ArcIndex][EndField] = OutputValue + EndPointOffset;
	//alert(PartJSON.Vectors[ArcIndex][StartField]+' ' +PartJSON.Vectors[ArcIndex][EndField]);
	}
	else
	{
		if (OldEndValue.indexOf("Tangential") > -1) {var TangentText = 'Tangential' + ';';} else {var TangentText = '';}
	PartJSON.Vectors[ArcIndex][EndField] = TangentText+parseFloat(CalcOutputValue(OldEndValue)+Offset);
		SetConstraintsValues(ArcIndex,false);
	//alert(PartJSON.Vectors[ArcIndex][StartField]+' ' +PartJSON.Vectors[ArcIndex][EndField]);
	}
	
	//alert(PartJSON.Vectors[ArcIndex][StartField]+' ' +PartJSON.Vectors[ArcIndex][EndField]);
	
	return {"StartPointValue" : PartJSON.Vectors[ArcIndex][StartField] , "EndPointValue" : PartJSON.Vectors[ArcIndex][EndField] }
							
}

function ExtractNumPartOfParamStr(InputValue) //This is not being used yet as I coudn't make it work!
{
var CurChar = '';
var Operators = /[-+*/]/i;
var Numeric = /[0-9]/i;
var OutputString = '';

	if (InputValue.indexOf(';') > -1) {var ParamText = InputValue.substring(0,InputValue.indexOf(';'));}
    else {var ParamText = InputValue;}
    
var Values = ParamText.split(Operators);
    
    for (var i = 0; i<Values.length; i++)
    {
    	if (Values[i].charAt(0).search(Numeric) == -1)
        {
        OutputString = OutputString + 'var ' + Values[i] + '=0;' + '\n';
        }
    }
    
    OutputString = OutputString+ParamText;

var OutPut = eval(OutputString);
return OutPut;

}


function InputValueEnter(InputElem,event)
{
if (event.key == "Enter" ) {event.target.removeAttribute("onchange"); InputValueChange(InputElem,event);}
}

function InputValueChange(InputElem,event)
{
var OkToChange = true;
var OrigValue = '';

	if (InputElem.id == 'VisibleInput') {var IsCondition = true;} else {var IsCondition = false;}

	var CalcValue = CalcInputValue(InputElem.value,0,ModeSelection,IsCondition);
	//console.log(CalcValue);
	if (CalcValue != 'Error')
	{
	InputElem.style.backgroundColor = "initial";	
		if (SelectedObjects.Items.length == 1 & ToolsSelection == "SelectTool" & MoveObject.InMove == false) 
		{ 
			
			
			if (ModeSelection == 'Operations')
			{
				if (PartJSON.Operations[SelectedObjects.Items[0]].Type == 'Rebate' | PartJSON.Operations[SelectedObjects.Items[0]].Type == 'Route')
				{
				if (InputElem.id == 'XPosInput') {var OpX = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].X);} else {var OpX = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[0]].X);}
				if (InputElem.id == 'YPosInput') {var OpY = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Y);} else {var OpY = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[0]].Y);}
				if (InputElem.id == 'WidthInput') {var OpWidth = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Width);} else {var OpWidth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[0]].Width);}
				if (InputElem.id == 'LengthInput') {var OpLength = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Length);} else {var OpLength = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[0]].Length);}
				if (InputElem.id == 'DepthInput') {var OpDepth = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Depth);} else {var OpDepth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[0]].Depth);}
				if (InputElem.id == 'AngleInput') {var OpAngle = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Angle);} else {var OpAngle = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[0]].Angle)*degrees;}				
				
				
				if (CheckOperationAllowed(OpX,OpY,OpLength,OpWidth,OpAngle,OpDepth) == false) {popup("Invalid position! Operation too close to Edgebanding!",120,350,1); OkToChange = false;}
				}
				
				if (PartJSON.Operations[SelectedObjects.Items[0]].Type == 'Hole' | PartJSON.Operations[SelectedObjects.Items[0]].Type == 'LineBore')
				{
					if (InputElem.id == 'WidthInput')
					{
					var OpWidth = ParseVarCalc(InputElem.value,SelectedObjects.Items[0],ModeSelection); 
					OrigValue = GetVarText(PartJSON.Operations[SelectedObjects.Items[0]].Width);
					if (OpWidth < 3 | OpWidth > 3 & OpWidth < 5 | OpWidth > 5 & OpWidth < 8 | OpWidth > 8 & OpWidth < 10 | OpWidth > 10 & OpWidth < 12) {popup("Invalid hole size!",120,350,1);OkToChange = false;}
					}
				}
				
			
				if (OkToChange)
				{
					switch (InputElem.id)
					{
					case 'XPosInput': PartJSON.Operations[SelectedObjects.Items[0]].X = CalcValue; break;
					case 'YPosInput': PartJSON.Operations[SelectedObjects.Items[0]].Y = CalcValue; break;
					case 'WidthInput': PartJSON.Operations[SelectedObjects.Items[0]].Width = CalcValue; break;
					case 'DepthInput': PartJSON.Operations[SelectedObjects.Items[0]].Depth = CalcValue; break;
					case 'LengthInput': PartJSON.Operations[SelectedObjects.Items[0]].Length = CalcValue; break;
					case 'AngleInput': PartJSON.Operations[SelectedObjects.Items[0]].Angle = CalcValue; break; //parseFloat(InputElem.value);
					case 'QtyInput': PartJSON.Operations[SelectedObjects.Items[0]].Qty = CalcValue; break;
					case 'SpacingInput': PartJSON.Operations[SelectedObjects.Items[0]].Spacing = CalcValue; break;
					}
					delete PartJSON.PNCOperations;
				}
				
				if (InputElem.id == 'VisibleInput') {PartJSON.Operations[SelectedObjects.Items[0]].VisibleCond = CalcValue;}
			}
			else
			{
				if (InputElem.value == "Tangential")
				{
					switch (InputElem.id)
					{
					case 'XPosInput':
							//if (ConnVectors.Start > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'SX',CalcValue);}				
							PartJSON.Vectors[SelectedObjects.Items[0]].SX = "Tangential" + ';' + CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].SX);
							break;
					case 'YPosInput':
							PartJSON.Vectors[SelectedObjects.Items[0]].SY = "Tangential" + ';' + CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].SY);					
							break;
					case 'XEndInput':
							PartJSON.Vectors[SelectedObjects.Items[0]].EX = "Tangential" + ';' + CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].EX);				
							break;
					case 'YEndInput':		
							PartJSON.Vectors[SelectedObjects.Items[0]].EY = "Tangential" + ';' + CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].EY);				
							break;			
					}	
				}
				else
				{
					var ConnVectors = FindConnedVector(PartJSON.Vectors[SelectedObjects.Items[0]],[SelectedObjects.Items[0]]);
		//alert(CalcValue);		
					switch (InputElem.id)
					{
					case 'XPosInput':
							if (ConnVectors.Start > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'SX',CalcValue);}				
							PartJSON.Vectors[SelectedObjects.Items[0]].SX = CalcValue;
							break;
					case 'YPosInput':
							if (ConnVectors.Start > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'SY',CalcValue);}
							PartJSON.Vectors[SelectedObjects.Items[0]].SY = CalcValue;					
							break;
					case 'XEndInput':
							if (ConnVectors.End > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'EX',CalcValue);}
							PartJSON.Vectors[SelectedObjects.Items[0]].EX = CalcValue;				
							break;
					case 'YEndInput':
							if (ConnVectors.End > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'EY',CalcValue);} 		
							PartJSON.Vectors[SelectedObjects.Items[0]].EY = CalcValue;
												
							break;
					case 'XArcCentreInput':
							var AdjustPoints = ShiftArcPoints(SelectedObjects.Items[0],'CX',CalcValue);
							
							//alert("CalcValue="+CalcValue+" SX="+AdjustPoints.StartPointValue+" EX="+AdjustPoints.EndPointValue);
							
							if (ConnVectors.Start > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'SX',AdjustPoints.StartPointValue);}
							if (ConnVectors.End > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'EX',AdjustPoints.EndPointValue);}
							PartJSON.Vectors[SelectedObjects.Items[0]].CX = CalcValue;				
							break;
					case 'YArcCentreInput':
							var AdjustPoints = ShiftArcPoints(SelectedObjects.Items[0],'CY',CalcValue);
					
							if (ConnVectors.Start > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'SY',AdjustPoints.StartPointValue);}
							if (ConnVectors.End > -1) {ConnVectConnItem = ChangeConnVectPointValues(ConnVectors,'EY',AdjustPoints.EndPointValue);} 		
							PartJSON.Vectors[SelectedObjects.Items[0]].CY = CalcValue;
												
							break;	
					case 'RadiusInput':
							var AdjustPoints = ChangeArcRadius(SelectedObjects.Items[0],CalcValue);
							
							if (ConnVectors.Start > -1) 
							{
								ChangeConnVectPointValues(ConnVectors,'SX',AdjustPoints.StartX);
								ChangeConnVectPointValues(ConnVectors,'SY',AdjustPoints.StartY);
							}
							if (ConnVectors.End > -1) 
							{
								ChangeConnVectPointValues(ConnVectors,'EX',AdjustPoints.EndX);
								ChangeConnVectPointValues(ConnVectors,'EY',AdjustPoints.EndY);
							} 		
							break;					
					}
				}

				delete PartJSON.PNCVectors;
				
				/*if (InputElem.value == "Tangential")
				{
					if (InputElem.id == 'XPosInput' | InputElem.id == 'YPosInput') {var VectStart = true;} else {var VectStart = false;}
				
				SetConstraintsValues(SelectedObjects.Items[0],VectStart);	
				}*/
				

				//alert(ConnVectConnItem.ConnItemVectorID);
				
				/* if (isNaN(GetVarText(CalcValue)))
				{
					//alert(GetVarText(CalcValue));
					
					SetVectorAutoParams(ConnVectConnItem.ConnItemVectorID);
					if (PartJSON.Vectors[ConnVectConnItem.ConnItemVectorID].Type == 'Arc') 
					{

						SetVectorAutoParams(ConnVectConnItem.ArcConnVectorID);
					}
				} */
				

			}
			if (OkToChange) {InputElem.value = GetVarText(CalcValue);} else { InputElem.value = OrigValue;}	
			RecalcAllPartObj(document.getElementById("selectedline").innerHTML);
			
			if (InputElem.value == "Tangential") {ShowInputs();}
		}
		
		if (SelectedObjects.Items.length == 0 & event.key == "Enter") 
		{  
			if (ToolsSelection == 'Drilling' | ToolPointClicks.length > 0)
			{	
				if (InputElem.id == 'LengthInput' | InputElem.id == 'AngleInput' )
				{
					
					var LineAngle = parseFloat(document.getElementById("AngleInput").value);
					var LineLength = parseFloat(document.getElementById("LengthInput").value);
					var XPos = Math.cos(LineAngle*degrees)*LineLength;
					var YPos = Math.sin(LineAngle*degrees)*LineLength;
					
					if (ToolsSelection == '3PointArc')
					{
					var XPos = Math.cos(LineAngle*degrees)*LineLength;
					var YPos = Math.sin(LineAngle*degrees)*LineLength;
					
						if (ToolPointClicks.length <= 1) 
						{ToolPointClicks.push({ "Point" : ToolPointClicks.length+1 , "X" : ToolPointClicks[0].X+XPos , "Y" : ToolPointClicks[0].Y+YPos });ShowInputs(); 
						}
						else
						{InsertObject(ToolPointClicks[0].X+XPos,ToolPointClicks[0].Y+YPos);	}
					//alert("XPos="+XPos+" YPos="+YPos+" LineAngle="+LineAngle+" LineLength="+LineLength);							

					}
					else
					{
					
					InsertObject(ToolPointClicks[0].X+XPos,ToolPointClicks[0].Y+YPos);
					}
				}
				else
				{
				var XPos = parseFloat(document.getElementById("XPosInput").value);
				var YPos = parseFloat(document.getElementById("YPosInput").value);
				
					if (ToolsSelection == '3PointArc')
					{
						if (ToolPointClicks.length <= 1) {ToolPointClicks.push({ "Point" : ToolPointClicks.length+1 , "X" : XPos , "Y" : YPos });ShowInputs(); }
						else
						{			
						InsertObject(parseFloat(document.getElementById("XPosInput").value),parseFloat(document.getElementById("YPosInput").value));	
						}
					}
					else
					{
					InsertObject(XPos,YPos);
					}
				}				

			}
			else
			{
				if (ToolPointClicks.length == 0 & ToolsSelection != 'Drilling')
				{ToolPointClicks.push({ "Point" : 1 , "X" : parseFloat(document.getElementById("XPosInput").value) , "Y" : parseFloat(document.getElementById("YPosInput").value) });ShowInputs(); } 
			}
		}
		
			
		if (SelectedObjects.Items.length > 1 & MoveObject.InMove == false & ToolsSelection == "SelectTool" | MoveObject.InMove == true & ToolsSelection == "SelectTool" ) 
		{
			if (SelectedObjects.Items.length > 1 & MoveObject.InMove == false) 
			{ 
			var SelRecXRef = round(SelectedObjects.StartX+((SelectedObjects.EndX-SelectedObjects.StartX)/2),3);
			var SelRecYRef = round(SelectedObjects.StartY+((SelectedObjects.EndY-SelectedObjects.StartY)/2),3);
			//alert(SelRecXRef-parseFloat(CalcValue))	
			}
			
			if (MoveObject.InMove == true) 
			{
			var SelRecXRef = MoveObject.X;
			var SelRecYRef = MoveObject.Y;
			//alert(SelRecXRef-parseFloat(CalcValue))		
			}

			switch (InputElem.id)
			{
			case 'XPosInput':
						for (var i = 0; i<SelectedObjects.Items.length; i++)
						{
							if (ModeSelection == 'Operations')
							{
								if (PartJSON.Operations[SelectedObjects.Items[i]].Type == 'Rebate' | PartJSON.Operations[SelectedObjects.Items[i]].Type == 'Route')
								{
								var OpX = ParseVarCalc(InputElem.value,SelectedObjects.Items[i],ModeSelection); 
								var OpY = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Y);
								var OpWidth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Width);
								var OpLength = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Length);
								var OpDepth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Depth);
								var OpAngle = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Angle)*degrees;				
					
								if (CheckOperationAllowed(OpX,OpY,OpLength,OpWidth,OpAngle,OpDepth) == false) {popup("Invalid position! Operation too close to Edgebanding!",120,350,1);}
								else {PartJSON.Operations[SelectedObjects.Items[i]].X = (parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].X)) - (SelRecXRef-parseFloat(CalcValue))).toString();}
								}
								else {PartJSON.Operations[SelectedObjects.Items[i]].X = (parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].X)) - (SelRecXRef-parseFloat(CalcValue))).toString();}							
							}															
							else 
							{
							var ConnVectors = FindConnedVector(PartJSON.Vectors[SelectedObjects.Items[i]],[SelectedObjects.Items[i]]);			
							PartJSON.Vectors[SelectedObjects.Items[i]].SX = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].SX)) - (SelRecXRef-parseFloat(CalcValue))).toString();
							PartJSON.Vectors[SelectedObjects.Items[i]].EX = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].EX)) - (SelRecXRef-parseFloat(CalcValue))).toString();
							if (SelectedObjects.Items.findIndex(function(ID) {return ID == ConnVectors.Start}) == -1 & ConnVectors.Start > -1) {PartJSON.Vectors[ConnVectors.Start].EX = PartJSON.Vectors[SelectedObjects.Items[i]].SX;PartJSON.Vectors[ConnVectors.Start].EY = PartJSON.Vectors[SelectedObjects.Items[i]].SY;}
							if (SelectedObjects.Items.findIndex(function(ID) {return ID == ConnVectors.End}) == -1 & ConnVectors.End > -1) {PartJSON.Vectors[ConnVectors.End].SX = PartJSON.Vectors[SelectedObjects.Items[i]].EX;PartJSON.Vectors[ConnVectors.End].SY = PartJSON.Vectors[SelectedObjects.Items[i]].EY;}
								if (PartJSON.Vectors[SelectedObjects.Items[i]].Type == 'Arc')
								{
								PartJSON.Vectors[SelectedObjects.Items[i]].CX = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].CX)) - (SelRecXRef-parseFloat(CalcValue))).toString();	
								}
							}
						}
						break;
			case 'YPosInput': 
						for (var i = 0; i<SelectedObjects.Items.length; i++)
						{
							if (ModeSelection == 'Operations') 
							{
								if (PartJSON.Operations[SelectedObjects.Items[i]].Type == 'Rebate' | PartJSON.Operations[SelectedObjects.Items[i]].Type == 'Route')
								{
								var OpX = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].X);
								var OpY = ParseVarCalc(InputElem.value,SelectedObjects.Items[i],ModeSelection);
								var OpWidth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Width);
								var OpLength = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Length);
								var OpDepth = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Depth);
								var OpAngle = CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Angle)*degrees;				
					
								if (CheckOperationAllowed(OpX,OpY,OpLength,OpWidth,OpAngle,OpDepth) == false) {popup("Invalid position! Operation too close to Edgebanding!",120,350,1);}
								else {PartJSON.Operations[SelectedObjects.Items[i]].Y = (parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Y)) - (SelRecYRef-parseFloat(CalcValue))).toString();}
								}
								else {PartJSON.Operations[SelectedObjects.Items[i]].Y = (parseFloat(CalcOutputValue(PartJSON.Operations[SelectedObjects.Items[i]].Y)) - (SelRecYRef-parseFloat(CalcValue))).toString();}							
							}							
							else 
							{
							var ConnVectors = FindConnedVector(PartJSON.Vectors[SelectedObjects.Items[i]],[SelectedObjects.Items[i]]);
							PartJSON.Vectors[SelectedObjects.Items[i]].SY = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].SY)) - (SelRecYRef-parseFloat(CalcValue))).toString();
							PartJSON.Vectors[SelectedObjects.Items[i]].EY = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].EY)) - (SelRecYRef-parseFloat(CalcValue))).toString();
							if (SelectedObjects.Items.findIndex(function(ID) {return ID == ConnVectors.Start}) == -1 & ConnVectors.Start > -1) {PartJSON.Vectors[ConnVectors.Start].EX = PartJSON.Vectors[SelectedObjects.Items[i]].SX;PartJSON.Vectors[ConnVectors.Start].EY = PartJSON.Vectors[SelectedObjects.Items[i]].SY;}
							if (SelectedObjects.Items.findIndex(function(ID) {return ID == ConnVectors.End}) == -1 & ConnVectors.End > -1) {PartJSON.Vectors[ConnVectors.End].SX = PartJSON.Vectors[SelectedObjects.Items[i]].EX;PartJSON.Vectors[ConnVectors.End].SY = PartJSON.Vectors[SelectedObjects.Items[i]].EY;}
								if (PartJSON.Vectors[SelectedObjects.Items[i]].Type == 'Arc')
								{
								PartJSON.Vectors[SelectedObjects.Items[i]].CY = (parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[i]].CY)) - (SelRecXRef-parseFloat(CalcValue))).toString();	
								}
							}
						}		
						break;
			}
			
		//if (event.key == "Enter" & MoveObject.InMove == true) {MoveObject.InMove = false;}

		if (MoveObject.InMove == true) {MoveObject.InMove = false;}		
		
		}
		
		
		
		FindSelectObjRec();
		BuildSnapPoints();
		
		//if (event.key == "Enter") {document.getElementById("XPosInputCaption").focus();}
		ShowInputs();RecalcAllPartObj
		
		DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
	}
	else
	{InputElem.style.backgroundColor = "red";}
}

function RecalcAllPartObj()
{
	if ( PartLength > 0 & PartWidth > 0 )
	{
		for (var X = 0; X<2; X++) /*Run two passes of this loop so that all variables are calculated*/
		{
			for (var i = 0; i<PartJSON.Operations.length; i++)
			{
			PartJSON.Operations[i].Width = CalcInputValue(PartJSON.Operations[i].Width,i,'Operations');
			PartJSON.Operations[i].Depth = CalcInputValue(PartJSON.Operations[i].Depth,i,'Operations');	
			PartJSON.Operations[i].X = CalcInputValue(PartJSON.Operations[i].X,i,'Operations');
			PartJSON.Operations[i].Y = CalcInputValue(PartJSON.Operations[i].Y,i,'Operations');
				switch (PartJSON.Operations[i].Type)
				{
				case 'Hole':
						break;
				case 'LineBore':
						PartJSON.Operations[i].Qty = CalcInputValue(PartJSON.Operations[i].Qty,i,'Operations');
						PartJSON.Operations[i].Spacing = CalcInputValue(PartJSON.Operations[i].Spacing,i,'Operations');
						PartJSON.Operations[i].Angle = CalcInputValue(PartJSON.Operations[i].Angle,i,'Operations');
						break;
				default:	
						PartJSON.Operations[i].Length = CalcInputValue(PartJSON.Operations[i].Length,i,'Operations');
						PartJSON.Operations[i].Angle = CalcInputValue(PartJSON.Operations[i].Angle,i,'Operations');
						break;
				}

				if (PartJSON.Operations[i].hasOwnProperty("VisibleCond"))
				{PartJSON.Operations[i].VisibleCond = CalcInputValue(PartJSON.Operations[i].VisibleCond,i,'Operations',true);}	
			}
		}
		
		CalcConstraints();
		
		for (var i = 0; i<PartJSON.Vectors.length; i++)
		{

			if (PartJSON.Vectors[i].SX.indexOf("Tangential") == -1 ) {PartJSON.Vectors[i].SX = CalcInputValue(PartJSON.Vectors[i].SX,i,'PartShape');}
			if (PartJSON.Vectors[i].SY.indexOf("Tangential") == -1 ) {PartJSON.Vectors[i].SY = CalcInputValue(PartJSON.Vectors[i].SY,i,'PartShape');}
			if (PartJSON.Vectors[i].EX.indexOf("Tangential") == -1 ) {PartJSON.Vectors[i].EX = CalcInputValue(PartJSON.Vectors[i].EX,i,'PartShape');}
			if (PartJSON.Vectors[i].EY.indexOf("Tangential") == -1 ) {PartJSON.Vectors[i].EY = CalcInputValue(PartJSON.Vectors[i].EY,i,'PartShape');}
			if (PartJSON.Vectors[i].Type == 'Arc')
			{
			PartJSON.Vectors[i].CX = CalcInputValue(PartJSON.Vectors[i].CX,i,'PartShape');
			PartJSON.Vectors[i].CY = CalcInputValue(PartJSON.Vectors[i].CY,i,'PartShape');		
			}
		}
	}
}

function GetConnVectPoint(ConnVectRev,Field)
{
	if (ConnVectRev)
	{
		switch (Field)
		{
		case 'SX':var ConnField = 'SX'; break;
		case 'SY':var ConnField = 'SY'; break;
		case 'EX':var ConnField = 'EX'; break;
		case 'EY':var ConnField = 'EY'; break;
		}	
	}
	else
	{
		switch (Field)
		{
		case 'SX':var ConnField = 'EX'; break;
		case 'SY':var ConnField = 'EY'; break;
		case 'EX':var ConnField = 'SX'; break;
		case 'EY':var ConnField = 'SY'; break;
		}		
	}
	
	return ConnField		
}

function CalcConstraints()
{

	for (var i = 0; i<PartJSON.Vectors.length; i++)
	{
		if (PartJSON.Vectors[i].Type == 'Arc') // & i != 2
		{
		var StartX = GetVarText(PartJSON.Vectors[i].SX);
		var StartY = GetVarText(PartJSON.Vectors[i].SY);
		var EndX = GetVarText(PartJSON.Vectors[i].EX);
		var EndY = GetVarText(PartJSON.Vectors[i].EY);
		PartJSON.Vectors[i].Radius = CalcInputValue(PartJSON.Vectors[i].Radius,i,'PartShape');	

			if (StartX.indexOf("Tangential") > -1 | StartY.indexOf("Tangential") > -1 ) {SetConstraintsValues(i,true);}
			if (EndX.indexOf("Tangential") > -1 | EndY.indexOf("Tangential") > -1 ) {SetConstraintsValues(i,false);}
		
		}
	}
		
}

function SetConstraintsValues(Index,VectStart)
{
	if (PartJSON.Vectors[Index].Type == 'Arc')
	{	
	var ConnVectors = FindConnedVector(PartJSON.Vectors[Index],[Index]);
	var ConnVectType = '';
	var ConnVectIndex = -1;
	var ConnVectRev = false;
	var OthConnVectType = '';
	var OthConnVectIndex = -1;
	var OthConnVectRev = false;
	var OthConnVectIsTangent = false;

	var ArcRadius = CalcOutputValue(PartJSON.Vectors[Index].Radius);
	var ArcIsCC = PartJSON.Vectors[Index].CCW;
	/*Recalculate Centre Point positions in the case when the centre point is parametric*/
	PartJSON.Vectors[Index].CX = CalcInputValue(PartJSON.Vectors[Index].CX);
	PartJSON.Vectors[Index].CY = CalcInputValue(PartJSON.Vectors[Index].CY);
	var ArcCentX = CalcOutputValue(PartJSON.Vectors[Index].CX);
	var ArcCentY = CalcOutputValue(PartJSON.Vectors[Index].CY);
		//document.getElementById("TestP").innerHTML = " StartAngle=" + (StartAngle*Rad).toString() + " EndAngle=" + (EndAngle*Rad).toString();
		
	//alert("ArcCentX="+ArcCentX+" ArcCentY="+ArcCentY+" ArcStartX="+ArcStartX+" ArcStartY="+ArcStartY+" SX="+PartJSON.Vectors[Index].SX+" SY="+PartJSON.Vectors[Index].SY);
	
		if (VectStart & ConnVectors.Start > -1)
		{
		ConnVectIndex = ConnVectors.Start;	
		ConnVectType = PartJSON.Vectors[ConnVectors.Start].Type;
		ConnVectRev = ConnVectors.StartRev;
		var XField = 'SX';
		var YField = 'SY';
		var ConnVectXField = GetConnVectPoint(ConnVectRev,'SX');
		var ConnVectYField = GetConnVectPoint(ConnVectRev,'SY');
		//alert("ConnVectRev="+ConnVectRev+" XField="+XField+" YField="+YField+" ConnVectXField="+ConnVectXField+" ConnVectYField="+ConnVectYField);
		}
		if (VectStart == false & ConnVectors.End > -1)
		{
		ConnVectIndex = ConnVectors.End;	
		ConnVectType = PartJSON.Vectors[ConnVectors.End].Type;
		ConnVectRev = ConnVectors.EndRev;
		var XField = 'EX';
		var YField = 'EY';
		var ConnVectXField = GetConnVectPoint(ConnVectRev,'EX');
		var ConnVectYField = GetConnVectPoint(ConnVectRev,'EY');		
		}
		

		if (ConnVectIndex > -1)
		{
			if (ConnVectType == 'Arc')
			{
			PartJSON.Vectors[ConnVectIndex].CX = CalcInputValue(PartJSON.Vectors[ConnVectIndex].CX);
			PartJSON.Vectors[ConnVectIndex].CY = CalcInputValue(PartJSON.Vectors[ConnVectIndex].CY);
			var GovPointX = CalcOutputValue(PartJSON.Vectors[ConnVectIndex].CX);	
			var GovPointY = CalcOutputValue(PartJSON.Vectors[ConnVectIndex].CY);	
			}
			else
			{
				var OthConnVectors = FindConnedVector(PartJSON.Vectors[ConnVectIndex],[Index,ConnVectIndex]);
				if (ConnVectRev == false & OthConnVectors.Start > -1 & VectStart == true | ConnVectRev == true & OthConnVectors.Start > -1 & VectStart == false) 
				{
				OthConnVectIndex = OthConnVectors.Start;
				OthConnVectType = PartJSON.Vectors[OthConnVectors.Start].Type;
				OthConnVectRev = OthConnVectors.StartRev;
					if (PartJSON.Vectors[OthConnVectIndex][GetConnVectPoint(OthConnVectRev,'SX')].indexOf('Tangential') > -1 | PartJSON.Vectors[OthConnVectIndex][GetConnVectPoint(OthConnVectRev,'SY')].indexOf('Tangential') > -1)
					{OthConnVectIsTangent = true;}
				}
				if (ConnVectRev == false & OthConnVectors.End > -1 & VectStart == false | ConnVectRev == true & OthConnVectors.End > -1 & VectStart == true) 
				{
				OthConnVectIndex = OthConnVectors.End;
				OthConnVectType = PartJSON.Vectors[OthConnVectors.End].Type;
				OthConnVectRev = OthConnVectors.EndRev;
					if (PartJSON.Vectors[OthConnVectIndex][GetConnVectPoint(OthConnVectRev,'EX')].indexOf('Tangential') > -1 | PartJSON.Vectors[OthConnVectIndex][GetConnVectPoint(OthConnVectRev,'EY')].indexOf('Tangential') > -1)
					{OthConnVectIsTangent = true;}
				}
				
				
				if (OthConnVectType == 'Arc' & OthConnVectIsTangent)
				{
				PartJSON.Vectors[OthConnVectIndex].CX = CalcInputValue(PartJSON.Vectors[OthConnVectIndex].CX);
				PartJSON.Vectors[OthConnVectIndex].CY = CalcInputValue(PartJSON.Vectors[OthConnVectIndex].CY);	
				var GovPointX = CalcOutputValue(PartJSON.Vectors[OthConnVectIndex].CX);	
				var GovPointY = CalcOutputValue(PartJSON.Vectors[OthConnVectIndex].CY);
				}
				else
				{
					if (VectStart == true & ConnVectRev == false | VectStart == false & ConnVectRev == true)
					{
					PartJSON.Vectors[ConnVectIndex].SX = CalcInputValue(PartJSON.Vectors[ConnVectIndex].SX);
					PartJSON.Vectors[ConnVectIndex].SY = CalcInputValue(PartJSON.Vectors[ConnVectIndex].SY);	
					var GovPointX = CalcOutputValue(PartJSON.Vectors[ConnVectIndex].SX);	
					var GovPointY = CalcOutputValue(PartJSON.Vectors[ConnVectIndex].SY);
					}
					else
					{
					PartJSON.Vectors[ConnVectIndex].EX = CalcInputValue(PartJSON.Vectors[ConnVectIndex].EX);
					PartJSON.Vectors[ConnVectIndex].EY = CalcInputValue(PartJSON.Vectors[ConnVectIndex].EY);						
					var GovPointX = CalcOutputValue(PartJSON.Vectors[ConnVectIndex].EX);	
					var GovPointY = CalcOutputValue(PartJSON.Vectors[ConnVectIndex].EY);
					}
				}
			}
			
			if (OthConnVectType == 'Arc' & OthConnVectIsTangent) 
			{
			PartJSON.Vectors[OthConnVectIndex].Radius = CalcInputValue(PartJSON.Vectors[OthConnVectIndex].Radius);	
			var OthConnVectRadius = CalcOutputValue(PartJSON.Vectors[OthConnVectIndex].Radius);

			var OthConnVectArcIsCC = PartJSON.Vectors[OthConnVectIndex].CCW;
			if (ConnVectRev & !OthConnVectRev | !ConnVectRev & OthConnVectRev) {var OthArcIsRev = true;} else {var OthArcIsRev = false;}	
			
			
				if (VectStart & ArcIsCC & (OthConnVectArcIsCC & !OthArcIsRev | !OthConnVectArcIsCC & OthArcIsRev) | 
					VectStart & !ArcIsCC & (OthConnVectArcIsCC & OthArcIsRev | !OthConnVectArcIsCC & !OthArcIsRev) | 
					!VectStart & !ArcIsCC & (!OthConnVectArcIsCC & !OthArcIsRev | OthConnVectArcIsCC & OthArcIsRev) | 
					!VectStart & ArcIsCC & (OthConnVectArcIsCC & !OthArcIsRev | !OthConnVectArcIsCC & OthArcIsRev) 		
					)	
				{var TangentCrossCentToPoint = false;}	
				else {var TangentCrossCentToPoint = true;}
			
				if (TangentCrossCentToPoint) {var AdjRadius = OthConnVectRadius+ArcRadius;} else {var AdjRadius = OthConnVectRadius-ArcRadius;} 

			} 
			else {var AdjRadius = ArcRadius;}
			
			var CentToPointAngle = Math.atan2( (ArcCentY-GovPointY),(ArcCentX-GovPointX) );
			var CentToPointLength = Math.sqrt( Math.pow(ArcCentX-GovPointX,2) + Math.pow(ArcCentY-GovPointY,2) );							
			var PointToIntLength = Math.sqrt( Math.pow(CentToPointLength,2) - Math.pow(AdjRadius,2) );

			var InsideAngle = Math.asin(AdjRadius/CentToPointLength);
			
			//if (isNaN(InsideAngle)) {InsideAngle = 0;}
			//alert(InsideAngle);
			
			//if (Index == 8)
			//{alert("Index="+Index+" ConnVectIndex="+ConnVectIndex+" ConnVectRev="+ConnVectRev+" OthConnVectIndex="+OthConnVectIndex+" OthConnVectRev="+OthConnVectRev);}
		
			
			if (!isNaN(InsideAngle))
			{
				if (OthConnVectType == 'Arc' & OthConnVectIsTangent)
				{
					if (VectStart & ArcIsCC & !TangentCrossCentToPoint | !VectStart & !ArcIsCC & !TangentCrossCentToPoint |
						VectStart & !ArcIsCC & TangentCrossCentToPoint | !VectStart & ArcIsCC & TangentCrossCentToPoint
						)
					{var IntAngle = CentToPointAngle+InsideAngle;var Positive = true;} else {var IntAngle = CentToPointAngle-InsideAngle;var Positive = false;}
					
			
					
					if (Positive) {var OffsetForAdjRadius = OthConnVectRadius;} else {var OffsetForAdjRadius = -OthConnVectRadius;}
		
		
					var IntPointX2 = round(GovPointX + Math.sin(IntAngle)*OffsetForAdjRadius,3);
					var IntPointY2 = round(GovPointY - Math.cos(IntAngle)*OffsetForAdjRadius,3);						

					//PartJSON.Vectors[Index].IntPointX2 = IntPointX2;
					//PartJSON.Vectors[Index].IntPointY2 = IntPointY2;
					
					var IntPointX = round(IntPointX2 + Math.cos(IntAngle)*PointToIntLength,3);
					var IntPointY = round(IntPointY2 + Math.sin(IntAngle)*PointToIntLength,3);

					
					if (ConnVectXField == 'SX') { var ConnVectOppXField = 'EX';} else { var ConnVectOppXField = 'SX';}
					if (ConnVectYField == 'SY') { var ConnVectOppYField = 'EY';} else { var ConnVectOppYField = 'SY';}
						
					var OthConnVectXField = GetConnVectPoint(OthConnVectRev,ConnVectOppXField);
					var OthConnVectYField = GetConnVectPoint(OthConnVectRev,ConnVectOppYField);

					

					PartJSON.Vectors[ConnVectIndex][ConnVectOppXField] = "Tangential" + ';' + IntPointX2.toString();
					PartJSON.Vectors[ConnVectIndex][ConnVectOppYField] = "Tangential" + ';' + IntPointY2.toString();

					PartJSON.Vectors[OthConnVectIndex][OthConnVectXField] = "Tangential" + ';' + IntPointX2.toString();
					PartJSON.Vectors[OthConnVectIndex][OthConnVectYField] = "Tangential" + ';' + IntPointY2.toString();
					
					/* PartJSON.Vectors[ConnVectIndex][ConnVectOppXField] = IntPointX2.toString();
					PartJSON.Vectors[ConnVectIndex][ConnVectOppYField] = IntPointY2.toString();

					PartJSON.Vectors[OthConnVectIndex][OthConnVectXField] = IntPointX2.toString();
					PartJSON.Vectors[OthConnVectIndex][OthConnVectYField] = IntPointY2.toString(); */
					

				}
				else
				{
					if (ArcIsCC & !VectStart | !ArcIsCC & VectStart) {var IntAngle = CentToPointAngle+InsideAngle;var Positive = true;} else {var IntAngle = CentToPointAngle-InsideAngle;var Positive = false;}
					var IntPointX = round(GovPointX + Math.cos(IntAngle)*PointToIntLength,3);
					var IntPointY = round(GovPointY + Math.sin(IntAngle)*PointToIntLength,3);	
				//alert(ConnVectIndex);						
				}
				
				
				/* PartJSON.Vectors[Index].IntAngle = IntAngle;
				PartJSON.Vectors[Index].GovPointX = GovPointX;
				PartJSON.Vectors[Index].GovPointY = GovPointY;
				PartJSON.Vectors[Index].PointToIntLength = PointToIntLength; */
				//alert("GovPointX="+GovPointX+" GovPointY="+GovPointY+" CentToPointLength="+CentToPointLength+" CentToPointAngle="+CentToPointAngle*Rad+" ArcRadius="+ArcRadius+" IntAngle="+IntAngle*Rad+" InsideAngle="+InsideAngle*Rad+" PointToIntLength="+PointToIntLength+" IntPointX="+IntPointX+" IntPointY="+IntPointY+" IntPointX2="+IntPointX2+" IntPointY2="+IntPointY2+" RadPointToGovPointAngle="+RadPointToGovPointAngle*Rad);
				
			
				PartJSON.Vectors[Index][XField] = "Tangential" + ';' + IntPointX.toString();
				PartJSON.Vectors[Index][YField] = "Tangential" + ';' + IntPointY.toString();
				PartJSON.Vectors[ConnVectIndex][ConnVectXField] = "Tangential" + ';' + IntPointX.toString();
				PartJSON.Vectors[ConnVectIndex][ConnVectYField] = "Tangential" + ';' + IntPointY.toString();
				
			}
			//else {alert(InsideAngle*Rad);}
			
		}

	}		
}

function GetVarText(InputValue)
{
var OutputValue = '';	
var InputStr = InputValue.toString();
	if (InputStr.indexOf(';') > -1) {OutputValue = InputStr.substring(0,InputStr.indexOf(';'));} 
	else {OutputValue = InputStr;}
	
	//alert(InputStr + ' ' +OutputValue);
	return OutputValue;
}

function EvalOpVisibility(CondText,ItemID,ItemType)
{	

	if (CondText != '')
	{
		var EvalString = CreateEvalParams(null,ItemID,ItemType)+CondText;

		//alert(EvalString);	
		try { var OutputValue = eval(EvalString);} catch(err) {var OutputValue = true;}
	}
	else {var OutputValue = true;}
	
	
	if (OutputValue == true) { return true} else {return false}
}

function CalcInputValue(InputValue,ItemID,ItemType,IsCondition)
{
	var InputStr = InputValue.toString();

	if (InputStr.indexOf(';') > -1) {InputStr = InputStr.substring(0,InputStr.indexOf(';'));} 


	if (IsCondition)
	{
	var OutputCond = InputStr;	
	var CalcCond = EvalOpVisibility(InputStr,ItemID,ItemType);
		return OutputCond.toString() + ';' + CalcCond
	}
	else
	{
	var OutputValue = '0';

	
		if (InputStr.search(/[a-zA-Z]/) == -1) 
		{ 
		try { OutputValue = eval(InputStr);} catch(err) {OutputValue = 'Error';}
		 if (isNaN(OutputValue) == false) {return OutputValue.toString();} else {return 'Error';}
		} 
		else 
		{ 
		try { OutputValue = InputStr;} catch(err) {OutputValue = 'Error';}

			var CalcValue = ParseVarCalc(OutputValue,ItemID,ItemType);	
			//alert("InputValue="+InputValue+" ItemID="+" CalcValue="+CalcValue+ " OutputValue="+OutputValue);

			if (OutputValue != 'Error' & CalcValue != 'Error') 	
			{return OutputValue.toString() + ';' + CalcValue }
			else
			{return 'Error';}
		}
	}
}


//var VariableList = ["X","Y","PartLength","PartWidth","PartThick","Width","Dia","Qty","Spacing","AutoSpacing","MaxSpacing(300)","MaxSpacing(400)","PartLengthCentre","PartWidthCentre"];


function CreateEvalParams(InputValue,ItemID,ItemType) //,ParamIDs = []
{	
	
	var EvalString = "";
	var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");
	var itemMaterial = document.getElementById("Material"+LineNumber).value;
	if (itemMaterial != '') {EvalString = EvalString + "var PartThick = "+GetMatThickFromName(itemMaterial)+";";}
	else {EvalString = EvalString + "var PartThick = 18;";}
	
	if (ItemType == 'Operations')
	{
		var Width = CalcOutputValue(PartJSON.Operations[ItemID].Width);
		var Depth = CalcOutputValue(PartJSON.Operations[ItemID].Depth);
		//var Width = CalcInputValue(PartJSON.Operations[ItemID].Width,ItemID,null);
		//var Depth = CalcInputValue(PartJSON.Operations[ItemID].Depth,ItemID,null);
		EvalString = EvalString + "var Width = "+Width+";";
		EvalString = EvalString + "var Depth = "+Depth+";";
		var X = CalcOutputValue(PartJSON.Operations[ItemID].X);
		var Y = CalcOutputValue(PartJSON.Operations[ItemID].Y);
		EvalString = EvalString + "var X = "+X+";";
		EvalString = EvalString + "var Y = "+Y+";";

		switch (PartJSON.Operations[ItemID].Type)
		{
		case 'Hole':
				var Dia = CalcOutputValue(PartJSON.Operations[ItemID].Width);
				//var Dia = CalcInputValue(PartJSON.Operations[ItemID].Width,ItemID,null);
				EvalString = EvalString + "var Dia = "+Dia+";";
				EvalString = EvalString + "var PartLengthCentre = "+PartLength/2+";";
				EvalString = EvalString + "var PartWidthCentre = "+PartWidth/2+";";	
				break;
		case 'LineBore':
				//var Length = CalcOutputValue(PartJSON.Operations[ItemID].Length);
				var Qty = CalcOutputValue(PartJSON.Operations[ItemID].Qty);
				//var Qty = CalcInputValue(PartJSON.Operations[ItemID].Qty,ItemID,null);
				EvalString = EvalString + "var Qty = "+Qty+";";
				var Dia = CalcOutputValue(PartJSON.Operations[ItemID].Width);
				//var Dia = CalcInputValue(PartJSON.Operations[ItemID].Width,ItemID,null);
				var Spacing = CalcOutputValue(PartJSON.Operations[ItemID].Spacing);
				//var Spacing = CalcInputValue(PartJSON.Operations[ItemID].Spacing,ItemID,null);
				EvalString = EvalString + "var Dia = "+Dia+";";
				EvalString = EvalString + "var Spacing = "+Spacing+";";
				break;
		default:
				var Length = CalcOutputValue(PartJSON.Operations[ItemID].Length);
				//var Length = CalcInputValue(PartJSON.Operations[ItemID].Length,ItemID,null);
				EvalString = EvalString + "var Length = "+Length+";";
				break;
		}
		
		if (PartJSON.Operations[ItemID].Type != 'Hole')
		{
		var Angle = CalcOutputValue(PartJSON.Operations[ItemID].Angle);
		//var Angle = CalcInputValue(PartJSON.Operations[ItemID].Angle,ItemID,null);
		EvalString = EvalString + "var Angle = "+Angle+";";
		if (Angle >= 45 & Angle <= 135 | Angle >= -135 & Angle <= -45 | Angle >= 225 & Angle <= 315 ) {var OALength = PartLength-(Y*2); var OpDir = 'Virt';} else {var OALength = PartWidth-(X*2); OpDir = 'Hor';}
		
		EvalString = EvalString + "var OALength = "+OALength+";";
		var AutoSpacing = OALength/(Qty-1);
		EvalString = EvalString + "var AutoSpacing = "+AutoSpacing+";";
			
			switch (OpDir)
			{
			case 'Virt' :
				if (PartJSON.Operations[ItemID].Type == 'LineBore') {var OpBoundLength = (Spacing*(Qty-1))/2;var OpBoundWidth = 0;} else {var OpBoundLength = Length/2;var OpBoundWidth = Width/2;}
				break;
			case 'Hor' :
				if (PartJSON.Operations[ItemID].Type == 'LineBore') {var OpBoundWidth = (Spacing*(Qty-1))/2;var OpBoundLength = 0;} else {var OpBoundWidth = Length/2; var OpBoundLength = Width/2;}
				break;
			}
			var CalcPartLengthCentre = (PartLength/2)+OpBoundLength; 
			var CalcPartWidthCentre = (PartWidth/2)+OpBoundWidth;
			if (Angle >= -45 & Angle < 45) {var CalcPartLengthCentre = (PartLength/2)+OpBoundLength; var CalcPartWidthCentre = (PartWidth/2)-OpBoundWidth;}	
			if (Angle >= 45 & Angle < 135) {var CalcPartLengthCentre = (PartLength/2)-OpBoundLength; var CalcPartWidthCentre = (PartWidth/2)-OpBoundWidth;}
			if (Angle >= 135 & Angle <= 225 ) {var CalcPartLengthCentre = (PartLength/2)-OpBoundLength; var CalcPartWidthCentre = (PartWidth/2)+OpBoundWidth;}
			if (Angle >= -135 & Angle < -45) {var CalcPartLengthCentre = (PartLength/2)+OpBoundLength; var CalcPartWidthCentre = (PartWidth/2)+OpBoundWidth;}
			
			EvalString = EvalString + "var PartLengthCentre = "+CalcPartLengthCentre+";";
			EvalString = EvalString + "var PartWidthCentre = "+CalcPartWidthCentre+";";	
		
			EvalString = EvalString + "function MaxSpacing(SPCNG) {return Math.trunc(OALength/SPCNG)+2;}";
			
	
		}
	}
	else
	{

	EvalString = EvalString + "var Tangential = "+CalcOutputValue(InputValue)+ ";";	
	}
		//alert(InputValue);
		
	EvalString = EvalString + " function cos(Angle) {return Math.cos(Angle*degrees);}";
	EvalString = EvalString + " function sin(Angle) {return Math.sin(Angle*degrees);}";
	EvalString = EvalString + " function tan(Angle) {return Math.tan(Angle*degrees);}";		
	
	//if (ItemType == 'Parameter' & ParamIDs.length > 0 )
	//{alert("ParamIDs="+ParamIDs+" Value="+InputValue)}
	
	/*Add Paremeters to Eval String*/
	if (PartJSON.hasOwnProperty("Parameters") == true) 
	{	
		for (var i = 0; i<PartJSON.Parameters.length; i++)
		{
			/* if (ItemType != 'Parameter' | !ParamIDs.includes(i) & ItemType == 'Parameter')
			{
			var ArrOfStrs = PartJSON.Parameters[i].Value.split(",");
			//if (ArrOfStrs[0].search(/[a-zA-Z]/) > -1) { var FinalValue = "'"+ArrOfStrs[0]+"'";} else {FinalValue = ArrOfStrs[0];}
			//if (ArrOfStrs[0].search(/[a-zA-Z]/) > -1) {  var FinalValue = ParseVarCalc(ArrOfStrs[0],i,'Parameter');} else {FinalValue = ArrOfStrs[0];}
			//if (!isNaN(ArrOfStrs[0]) | ArrOfStrs[0][0] == "'" | ArrOfStrs[0][0] == '"') 
			if (!isNaN(ArrOfStrs[0])) {FinalValue = ArrOfStrs[0];}
			else if (PartJSON.Parameters[i].IsEquation) { ParamIDs.push(i);  var FinalValue = ParseVarCalc(ArrOfStrs[0],null,'Parameter',ParamIDs);}
			else { var FinalValue = "'"+ArrOfStrs[0]+"'";}
		
			//if (FinalValue == 'Error') { var FinalValue = "'"+ArrOfStrs[0]+"'";} 
			
			EvalString = EvalString + "var " + PartJSON.Parameters[i].ParamName + "=" + FinalValue + ";";
			} */
			var ParseParam = true;
			if (InputValue != null) 
			{ 
				if (InputValue.indexOf(PartJSON.Parameters[i].ParamName) == -1) {ParseParam = false;}
			}
			
			
			if (ParseParam)
			{
			var ArrOfStrs = PartJSON.Parameters[i].Value.split(",");
			
			if (!isNaN(ArrOfStrs[0])) {FinalValue = ArrOfStrs[0];}
			else if (PartJSON.Parameters[i].IsEquation) { var FinalValue = ParseVarCalc(ArrOfStrs[0],ItemID,ItemType);}
			else { var FinalValue = "'"+ArrOfStrs[0]+"'";}
		
			
			EvalString = EvalString + "var " + PartJSON.Parameters[i].ParamName + "=" + FinalValue + ";";	
			}
		}
	}
	

	return EvalString

}


function ParseVarCalc(InputValue,ItemID,ItemType) //,ParamIDs = []
{	

	var InputStr = InputValue.toString();
	
	//var EvalString = CreateEvalParams(InputStr,ItemID,ItemType,ParamIDs)+ InputStr;
	var EvalString = CreateEvalParams(InputStr,ItemID,ItemType)+ InputStr;

	//alert("InputValue="+InputValue+" ParamIDs"+ParamIDs+" EvalString="+EvalString);	
	try { var OutputValue = eval(EvalString);} catch(err) {OutputValue = 'Error';}
		//if (OutputValue == 'Error') {alert(EvalString + " - "+ParamIDs);}
	if (isNaN(OutputValue) == false) {return round(parseFloat(OutputValue),3).toString();} else {return 'Error';}
	


}

function CalcOutputValue(InputValue)
{
var OutputValue = '0';
var InputStr = InputValue.toString();
	if (InputStr.indexOf(';') > -1) {OutputValue = InputStr.substring(InputStr.indexOf(';')+1,InputStr.length);} 
	else {OutputValue = InputStr;}
	
	//alert(typeof OutputValue);
	if (isNaN(OutputValue) == false) {return parseFloat(OutputValue);} else {return 0;}
}

function CalcOutputCond(InputCond)
{
var OutputCond = true;
	if (InputCond != undefined)
	{
	var InputStr = InputCond.toString();
	if (InputStr.indexOf(';') > -1) {OutputCond = InputStr.substring(InputStr.indexOf(';')+1,InputStr.length);} 
	else {OutputCond = InputStr;}
	}
	
	//alert(typeof OutputValue);
	if (OutputCond == true | OutputCond == 'true') { return true} else {return false}

}

function SetSelectRec(event)
{
SelectBox.EndX=ActualPositionX(event);
SelectBox.EndY=ActualPositionY(event);
DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function ClearSelectObjects()
{

SelectedObjects.Items = [];
SelectedObjects.StartX = 0;	
SelectedObjects.StartY = 0;
SelectedObjects.EndX = 0;
SelectedObjects.EndY = 0;
}

function SelectObjects(event)
{
var createSelObj = true;	
var ClickTol = 10/ViewRatio;	
	
if (SelectBox.StartX > SelectBox.EndX ) {var SelSX=SelectBox.EndX; var SelEX=SelectBox.StartX;} else {var SelSX=SelectBox.StartX; var SelEX=SelectBox.EndX;};
if (SelectBox.StartY > SelectBox.EndY ) {var SelSY=SelectBox.EndY; var SelEY=SelectBox.StartY;} else {var SelSY=SelectBox.StartY; var SelEY=SelectBox.EndY;};	
var SelX=SelectBox.StartX;
var SelY=SelectBox.StartY;

	if (SelectedObjects.Items.length > 0)
	{
		if (ActualPositionX(event) >= SelectedObjects.StartX-ClickTol & ActualPositionY(event) >= SelectedObjects.StartY-ClickTol & ActualPositionX(event) <= SelectedObjects.EndX+ClickTol & ActualPositionY(event) <= SelectedObjects.EndY+ClickTol )
		{
		createSelObj = false;
		}
	}
	//document.getElementById("TestP").innerHTML = "event=" + event.target.id;
	//else {createSelObj = true;}
//document.getElementById("TestP").innerHTML = "Length="+ JSON.stringify(PartJSON.Operations).length;
//document.getElementById("TestP").innerHTML = "createSelObj=" + createSelObj;	
//document.getElementById("TestP").innerHTML = "JSON="+ JSON.stringify(PartJSON.Vectors);
//document.getElementById("TestP").innerHTML = "StartX=" + SelSX + " StartY=" + SelSY + " EndX=" + SelEX + " EndY=" + SelEY + "createSelObj=" + createSelObj;
//document.getElementById("TestP").innerHTML = SelectedObjects.Items.toString();


if (createSelObj == true)
{	
if (event.ctrlKey == false & ToolsSelection != 'CornerRadius') {ClearSelectObjects();}	
		
	if (ModeSelection == 'Operations')
	{
		for (var i = 0; i<PartJSON.Operations.length; i++)
		{
			if (PartJSON.Operations[i].Face == ViewFace)
			{
			var OpX = CalcOutputValue(PartJSON.Operations[i].X);
			var OpY = CalcOutputValue(PartJSON.Operations[i].Y);
			var OpWidth = CalcOutputValue(PartJSON.Operations[i].Width);
			var LineAngle = 90*degrees;
			var OpLength = OpWidth;
			
				
				switch (PartJSON.Operations[i].Type)
				{
				case 'Hole':
							OpX = OpX-(OpWidth/2);
							OpY = OpY-(OpWidth/2);
							break;
				case 'LineBore':
							OpLength = Math.round(CalcOutputValue(PartJSON.Operations[i].Spacing)*(CalcOutputValue(PartJSON.Operations[i].Qty)-1))+OpWidth;
							LineAngle = CalcOutputValue(PartJSON.Operations[i].Angle)*degrees;
							OpX = OpX-(Math.cos(LineAngle)*(OpWidth/2))-(Math.sin(LineAngle)*(OpWidth/2));
							OpY = OpY+(Math.cos(LineAngle)*(OpWidth/2))-(Math.sin(LineAngle)*(OpWidth/2));
							break;
				default:	
							OpLength = CalcOutputValue(PartJSON.Operations[i].Length);
							LineAngle = CalcOutputValue(PartJSON.Operations[i].Angle)*degrees;
							break;
				}
				
				
			var OpRec = BuildObjRecPoints(OpX,OpY,OpLength,OpWidth,LineAngle);	
				
	
				if ( SelX >= OpRec.X & SelX <= OpRec.X+OpRec.Width & SelY >= OpRec.Y & SelY <= OpRec.Y+OpRec.Height ) { SelectedObjects.Items.push(i); break;}
				if ( OpRec.X >= SelSX & OpRec.X+OpRec.Width <= SelEX & OpRec.Y >= SelSY & OpRec.Y+OpRec.Height <= SelEY ) { SelectedObjects.Items.push(i);}

			}								
		}
		
	}
	else
	{
		for (var i = 0; i<PartJSON.Vectors.length; i++)
		{
/* 		var VectSX = CalcOutputValue(PartJSON.Vectors[i].SX);
		var VectEX = CalcOutputValue(PartJSON.Vectors[i].EX);
		var VectSY = CalcOutputValue(PartJSON.Vectors[i].SY);
		var VectEY = CalcOutputValue(PartJSON.Vectors[i].EY);
		if (VectEX < VectSX) {VectSX = VectEX; VectEX = CalcOutputValue(PartJSON.Vectors[i].SX);}
		if (VectEY < VectSY) {VectSY = VectEY; VectEY = CalcOutputValue(PartJSON.Vectors[i].SY);}
		
			//var OpRec = BuildObjRecPoints(VectSX,VectSY,VectLength,1,VectAngle);	
			//document.getElementById("TestP").innerHTML = "StartX=" + VectSX + " StartY=" + VectSY + " EndX=" + VectEX + " EndY=" + VectEY;
			*/		
				
			var ObjRec = FindVectBoundsRec(i);	

			//document.getElementById("TestP").innerHTML = "SelSX" + SelX + " SelSY=" + SelSY + " SelEX=" + SelEX + " SelEY=" + SelEY;

			if (SelX == SelEX & SelSY == SelEY) {var PointSelect = true;} else {var PointSelect = false;}

			if ( SelX+ClickTol >= ObjRec.X & SelX-ClickTol <= ObjRec.X+ObjRec.Width & SelY+ClickTol >= ObjRec.Y & SelY-ClickTol <= ObjRec.Y+ObjRec.Height & PointSelect) { SelectedObjects.Items.push(i); break;}		
			if ( ObjRec.X >= SelSX & ObjRec.X+ObjRec.Width <= SelEX & ObjRec.Y >= SelSY & ObjRec.Y+ObjRec.Height <= SelEY ) { SelectedObjects.Items.push(i);} 

		}
		
		if (ModeSelection == 'Edgebanding')
		{
			SetEdgebanding(SelSX,SelSY);
		}
	}
//document.getElementById("TestP").innerHTML = SelectedObjects.Items.toString();		
		
		FindSelectObjRec();
		//document.getElementById("TestP").innerHTML = "StartX=" + SelectBox.StartX + " StartY=" + SelectBox.StartY + " EndX=" + SelectBox.EndX + " EndY=" + SelectBox.EndY;
		//document.getElementById("TestP").innerHTML = "Length=" + SelectedObjects.Items;
		
		//SelectBox.StartX=0;
		//SelectBox.StartY=0;
		//SelectBox.EndX=0;
		//SelectBox.EndY=0;
		SelectBox.InSelect = false;
		
		//if (SelectedObjects.Items.length > 0) { 
		ShowInputs();
		
	//if (SelectedObjects.Items.length == 2 & ToolsSelection == 'CornerRadius') {document.getElementById("CanvasBorder").removeAttribute("onmouseup");InsertObject(SelX,SelY);ClearSelectObjects();}	
	if (SelectedObjects.Items.length == 2 & ToolsSelection == 'CornerRadius') {ShowInputBox(document.getElementById("CanvasBorder"));}	
		//document.getElementById("CanvasBorder").removeAttribute("onmousemove");
		DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}
//document.getElementById("TestP").innerHTML = "StartX=" + SelectedObjects.StartX + " StartY=" + SelectedObjects.StartY + " EndX=" + SelectedObjects.EndX  + " EndY=" + SelectedObjects.EndY+ "Length=" + SelectedObjects.Items.length;
document.getElementById("CanvasBorder").setAttribute("onmousemove","CanvasMouseMove(event);");
}

function BuildObjRecPoints(RecX,RecY,RecLength,RecWidth,RecAngle)
{
	var XFloat = parseFloat(RecX);
	var YFloat = parseFloat(RecY);
	var LengthFloat = parseFloat(RecLength);
	var WidthFloat = parseFloat(RecWidth);
	var AngleFloat = parseFloat(RecAngle);
	var LengthSin = Math.sin(AngleFloat)*LengthFloat;
	var LengthCos = Math.cos(AngleFloat)*LengthFloat;
	var WidthSin = Math.sin(AngleFloat)*WidthFloat;
	var WidthCos = Math.cos(AngleFloat)*WidthFloat;
	var BoxRec = { "X" : parseFloat(XFloat) , "Y" : parseFloat(YFloat) , "Height" : 0 , "Width" : 0 };
	BoxRec.Width = parseFloat(LengthCos+WidthSin);	
	BoxRec.Height = parseFloat(LengthSin+WidthCos);
	BoxRec.X = parseFloat(XFloat);
	BoxRec.Y = parseFloat(YFloat-WidthCos);
	if (LengthSin < 0 & WidthSin < 0) { 
		BoxRec.X = parseFloat(XFloat+WidthSin); 
		BoxRec.Y = parseFloat(YFloat+LengthSin-WidthCos); 
		BoxRec.Width = parseFloat(LengthCos-WidthSin); 
		BoxRec.Height = parseFloat(WidthCos-LengthSin);
	}
	if (LengthCos < 0 & WidthCos < 0) { 
		BoxRec.X = parseFloat(XFloat+LengthCos); 
		BoxRec.Y = parseFloat(YFloat); 
		BoxRec.Width = parseFloat(WidthSin-LengthCos); 
		BoxRec.Height = parseFloat(LengthSin-WidthCos);
	}
	
	if (LengthSin < 0 & WidthSin < 0 & LengthCos < 0 & WidthCos < 0) 
	{ BoxRec.X = parseFloat(XFloat+LengthCos+WidthSin); BoxRec.Y = parseFloat(YFloat+LengthSin); BoxRec.Width = parseFloat(Math.abs(LengthCos+WidthSin)); BoxRec.Height = parseFloat(Math.abs(WidthCos+LengthSin));}

	// console.log(BoxRec.X);
	// console.log(BoxRec.Y);
	// console.log(BoxRec.Height);
	// console.log(BoxRec.Width);	
	// console.log(BoxRec.Height);
	// console.log(BoxRec.Width);	

	return BoxRec;
}

function FindVectBoundsRec(SelObjectID)
{
	var VectSX = CalcOutputValue(PartJSON.Vectors[SelObjectID].SX);
		var VectEX = CalcOutputValue(PartJSON.Vectors[SelObjectID].EX);
		var VectSY = CalcOutputValue(PartJSON.Vectors[SelObjectID].SY);
		var VectEY = CalcOutputValue(PartJSON.Vectors[SelObjectID].EY);
		
			if (PartJSON.Vectors[SelObjectID].Type == 'Arc')
			{
			var VectCX = CalcOutputValue(PartJSON.Vectors[SelObjectID].CX);
			var VectCY = CalcOutputValue(PartJSON.Vectors[SelObjectID].CY);
			var ArcRadius = Math.sqrt( ( (VectSX-VectCX)*(VectSX-VectCX) )+( (VectSY-VectCY)*(VectSY-VectCY) ) );
			var StartAngle = Math.atan2( (VectSY-VectCY),(VectSX-VectCX) );
			var EndAngle = Math.atan2( (VectEY-VectCY),(VectEX-VectCX) );			
			}	
		
		
		if (VectEX < VectSX) {VectSX = VectEX; VectEX = CalcOutputValue(PartJSON.Vectors[SelObjectID].SX);}
		if (VectEY < VectSY) {VectSY = VectEY; VectEY = CalcOutputValue(PartJSON.Vectors[SelObjectID].SY);}
		
			if (PartJSON.Vectors[SelObjectID].Type == 'Arc')
			{
				if (PartJSON.Vectors[SelObjectID].hasOwnProperty("CCW") ) {var ArcIsCC = PartJSON.Vectors[SelObjectID].CCW;}
				else
				{
				var ArcIsCC = false;								
				if ( (StartAngle-EndAngle)*Rad < -180  | (StartAngle-EndAngle)*Rad > 0 & (StartAngle-EndAngle)*Rad <= 180) {ArcIsCC = true;} 
				}
				//document.getElementById("TestP").innerHTML = "StartAngle="+StartAngle*Rad+" EndAngle="+EndAngle*Rad+" ArcRadius="+ArcRadius+" Calc="+(StartAngle-EndAngle)*Rad+" ArcIsCC="+ArcIsCC;			
				
				if (!ArcIsCC)
				{
					if ( StartAngle*Rad > -90 & StartAngle*Rad < 90 & (EndAngle*Rad < -90 | EndAngle*Rad > 90) ) {VectSY = VectCY-ArcRadius;}
					if (StartAngle*Rad > 0 & EndAngle*Rad < 0) {VectEX = VectCX+ArcRadius;}
					if ( (StartAngle*Rad > 90 | StartAngle*Rad < -90) & EndAngle*Rad < 90 ) {VectEY = VectCY+ArcRadius;}
					if (StartAngle*Rad > -180 & StartAngle*Rad < 0 & EndAngle*Rad < 180 & EndAngle*Rad > 0) {VectSX = VectCX-ArcRadius;}	
				}
				else
				{
					if ( (StartAngle*Rad < -90 | StartAngle*Rad > 90) & EndAngle*Rad > -90 ) {VectSY = VectCY-ArcRadius;}
					if (StartAngle*Rad < 0 & EndAngle*Rad > 0) {VectEX = VectCX+ArcRadius;}
					if (StartAngle*Rad < 90 & (EndAngle*Rad > 90 | EndAngle*Rad < -90) ) {VectEY = VectCY+ArcRadius;}
					if (StartAngle*Rad < 180 & StartAngle*Rad > 0 & EndAngle*Rad > -180 & EndAngle*Rad < 0) {VectSX = VectCX-ArcRadius;}
				}

				
			}	
		
						


		return { "X" : VectSX, "Y" : VectSY , "Height" : VectEY-VectSY , "Width" : VectEX-VectSX };	
}

function FindSelectObjRec()
{
	
	for (var i = 0; i<SelectedObjects.Items.length; i++)
	{
	var SelObjectID = SelectedObjects.Items[i];	
		if (ModeSelection == 'Operations')
		{

		var OpX = CalcOutputValue(PartJSON.Operations[SelObjectID].X);
		var OpY = CalcOutputValue(PartJSON.Operations[SelObjectID].Y);
		var OpWidth = CalcOutputValue(PartJSON.Operations[SelObjectID].Width);
		var LineAngle = 90*degrees;
		var OpLength = OpWidth;
		
			switch (PartJSON.Operations[SelObjectID].Type)
			{
			case 'Hole':
						OpX = OpX-(OpWidth/2);
						OpY = OpY-(OpWidth/2);
						break;
			case 'LineBore':
						OpLength = Math.round(CalcOutputValue(PartJSON.Operations[SelObjectID].Spacing)*(CalcOutputValue(PartJSON.Operations[SelObjectID].Qty)-1))+OpWidth;
						LineAngle = CalcOutputValue(PartJSON.Operations[SelObjectID].Angle)*degrees;
						OpX = OpX-(Math.cos(LineAngle)*(OpWidth/2))-(Math.sin(LineAngle)*(OpWidth/2));
						OpY = OpY+(Math.cos(LineAngle)*(OpWidth/2))-(Math.sin(LineAngle)*(OpWidth/2));
						break;
			default:	
						OpLength = CalcOutputValue(PartJSON.Operations[SelObjectID].Length);
						LineAngle = CalcOutputValue(PartJSON.Operations[SelObjectID].Angle)*degrees;
						break;
			}
			
		var ObjRec = BuildObjRecPoints(OpX,OpY,OpLength,OpWidth,LineAngle);
		}
		else
		{
		var ObjRec = FindVectBoundsRec(SelObjectID);		
		}


			if (i == 0)
			{
			SelectedObjects.StartX = ObjRec.X;
			SelectedObjects.StartY = ObjRec.Y;
			SelectedObjects.EndX = ObjRec.X+ObjRec.Width;
			SelectedObjects.EndY = ObjRec.Y+ObjRec.Height;
			}
			else
			{
			if (ObjRec.X < SelectedObjects.StartX) { SelectedObjects.StartX = ObjRec.X;}
			if (ObjRec.Y < SelectedObjects.StartY) { SelectedObjects.StartY = ObjRec.Y;}
			if (ObjRec.X+ObjRec.Width > SelectedObjects.EndX) { SelectedObjects.EndX = ObjRec.X+ObjRec.Width;}
			if (ObjRec.Y+ObjRec.Height > SelectedObjects.EndY) { SelectedObjects.EndY = ObjRec.Y+ObjRec.Height;}	
			}					

		
	}
}

function VectorIsOnPartEdge(Index)
{
var Result = false;
	
	if (Index < 0) {Index = PartJSON.Vectors.length-1;}
	if (Index > PartJSON.Vectors.length-1) {Index = 0;}
		
		
	var StartX = CalcOutputValue(PartJSON.Vectors[Index].SX);
	var StartY = CalcOutputValue(PartJSON.Vectors[Index].SY);
	var EndX = CalcOutputValue(PartJSON.Vectors[Index].EX);
	var EndY = CalcOutputValue(PartJSON.Vectors[Index].EY);
//alert(Index);	
	if (StartX == 0 & EndX == PartWidth & StartY == 0 & EndY == 0 | StartX == PartWidth & EndX == PartWidth & StartY == 0 & EndY == PartLength
		| StartX == PartWidth & EndX == 0 & StartY == PartLength & EndY == PartLength | StartX == 0 & EndX == 0 & StartY == PartLength & EndY == 0)
		{Result = true;}		

	return Result
}

function SetEdgebanding(XClick,YClick)
{
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var LineType = document.getElementById("PanelType"+LineNumber).value;	
var EdgeValue = '';
var ChangedVectors = [];
var EdgeIndType = '';
var WhichEdgeNode = null;
var LeftedgeNode = document.getElementById("Leftedge"+LineNumber);
var RightedgeNode = document.getElementById("Rightedge"+LineNumber);
var TopedgeNode = document.getElementById("Topedge"+LineNumber);
var BotedgeNode = document.getElementById("Bottomedge"+LineNumber);
var LeftedgeTick = document.getElementById("LeftedgeTick"+LineNumber);
var RightedgeTick = document.getElementById("RightedgeTick"+LineNumber);
var TopedgeTick = document.getElementById("TopedgeTick"+LineNumber);
var BotedgeTick = document.getElementById("BottomedgeTick"+LineNumber);

/* var XClick = SelectBox.StartX;
var YClick = SelectBox.StartY; */

	if (PartJSON.Vectors.length > 0)
	{		
		for (var LoopI = 0; LoopI<SelectedObjects.Items.length; LoopI++)
		{
		var CheckNextVector = true;	
		var Nexti = SelectedObjects.Items[LoopI]+1;
		var Previ = SelectedObjects.Items[LoopI]-1;
		var VectType = PartJSON.Vectors[SelectedObjects.Items[LoopI]].Type;
		var lastVectType = '';
		var ThisVectType = '';
		var VectItem = PartJSON.Vectors[SelectedObjects.Items[LoopI]];
		

			if (IsItemInList(SelectedObjects.Items[LoopI],ChangedVectors) == false )
			{
				if (PartJSON.Vectors[SelectedObjects.Items[LoopI]].Edge == "E" | PartJSON.Vectors[SelectedObjects.Items[LoopI]].Edge == "M") {EdgeIndType = "N";} 
				else 
				{
					if (VectType == 'Arc') {EdgeIndType = "M";} else {EdgeIndType = "E";}
					
					if (VectType == 'Line')
					{
						if (CalcOutputValue(VectItem.SX) > 0 & CalcOutputValue(VectItem.SX) < PartWidth & CalcOutputValue(VectItem.SY) > 0 & CalcOutputValue(VectItem.SY) < PartLength
						| CalcOutputValue(VectItem.EX) > 0 & CalcOutputValue(VectItem.EX) < PartWidth & CalcOutputValue(VectItem.EY) > 0 & CalcOutputValue(VectItem.EY) < PartLength) {EdgeIndType = "M";}
					}				
					
	
				} 
				
				lastVectType = VectType;
				if (Nexti < PartJSON.Vectors.length)
				{
				CheckNextVector = true;
					do 
					{

					ThisVectType = PartJSON.Vectors[Nexti].Type;
					//alert(" Nexti=" + Nexti + " ThisVectType=" + ThisVectType + " ThisVectOnPartEdge=" + VectorIsOnPartEdge(Nexti) + " LoopI=" + LoopI + " lastVectType=" + lastVectType + " ClickedPartOnPartEdge=" + VectorIsOnPartEdge(LoopI) );
					
						if (lastVectType == 'Arc' & ThisVectType == 'Line' & VectorIsOnPartEdge(Nexti) == false | lastVectType == 'Line' & ThisVectType == 'Arc' & VectorIsOnPartEdge(SelectedObjects.Items[LoopI]) == false) 
						{
						ChangedVectors.push(Nexti);
						if (EdgeIndType != "N") {EdgeIndType = "M";}
						PartJSON.Vectors[Nexti].Edge = EdgeIndType;	
						lastVectType = ThisVectType;
						}
						else {CheckNextVector = false;}
					Nexti++;					
					} 
					while (CheckNextVector == true & Nexti < PartJSON.Vectors.length)
				}
			
				lastVectType = VectType;
				if (Previ > -1)
				{
				CheckNextVector = true;	
					do 
					{
					ThisVectType = PartJSON.Vectors[Previ].Type;
					//alert(" Previ=" + Previ + " ThisVectType=" + ThisVectType + " ThisVectType=" + VectorIsOnPartEdge(Previ) + " LoopI=" + LoopI + " ThisVectType=" + lastVectType + " ThisVectType=" + VectorIsOnPartEdge(LoopI) );
					
						if (lastVectType == 'Arc' & ThisVectType == 'Line' & VectorIsOnPartEdge(Previ) == false  | lastVectType == 'Line' & ThisVectType == 'Arc' & VectorIsOnPartEdge(SelectedObjects.Items[LoopI]) == false) 
						{
						ChangedVectors.push(Previ);
						if (EdgeIndType != "N") {EdgeIndType = "M";}
						PartJSON.Vectors[Previ].Edge = EdgeIndType;	
						lastVectType = ThisVectType;
						}
						else {CheckNextVector = false;}
					Previ--;					
					} 
					while (CheckNextVector == true & Previ > -1)
				}
				//alert(LoopI);
				PartJSON.Vectors[SelectedObjects.Items[LoopI]].Edge = EdgeIndType;
				delete PartJSON.PNCVectors;
				
				if (VectType == 'Line') 
				{
				
					switch (VectItem.Edge)
					{
					case 'N' : EdgeValue = 'None'; break;
					case 'M' : EdgeValue = 'LaserEdge'; break;
					case 'E' : EdgeValue = 'LaserEdge'; break;
					}
								
					if (CalcOutputValue(VectItem.SX) == 0 & CalcOutputValue(VectItem.EX) == 0) {WhichEdgeNode = LeftedgeTick; }
					if (CalcOutputValue(VectItem.SX) == PartWidth & CalcOutputValue(VectItem.EX) == PartWidth) {WhichEdgeNode = RightedgeTick;}
					if (CalcOutputValue(VectItem.SY) == PartLength & CalcOutputValue(VectItem.EY) == PartLength) {WhichEdgeNode = TopedgeTick;} 	
					if (CalcOutputValue(VectItem.SY) == 0 & CalcOutputValue(VectItem.EY) == 0) {WhichEdgeNode = BotedgeTick;}			
					
					//document.getElementById("TestP").innerHTML ="EdgeValue="+EdgeValue+" WhichEdgeNode="+WhichEdgeNode.id;
					
					if (EdgeValue != '' & WhichEdgeNode != null)
					{

						switch (EdgeValue)
						{
						case 'LaserEdge' : ChangeCheckBoxValue(WhichEdgeNode.id,'Tick'); break;
						default : ChangeCheckBoxValue(WhichEdgeNode.id,'None'); break;
						}
					}					
				}
				
			}
		
		}
		//document.getElementById("TestP").innerHTML = "JSON="+ JSON.stringify(PartJSON.Vectors);
	}
	else
	{
	var ClickTol = 20/ViewRatio;	

		if (XClick > -ClickTol & XClick < ClickTol & YClick > -ClickTol & YClick < PartLength+ClickTol) {WhichEdgeNode = LeftedgeTick; EdgeValue = LeftedgeNode.value;}
		if (XClick > PartWidth-ClickTol & XClick < PartWidth+ClickTol & YClick > -ClickTol & YClick < PartLength+ClickTol) {WhichEdgeNode = RightedgeTick; EdgeValue = RightedgeNode.value;}
		if (XClick > -ClickTol & XClick < PartWidth+ClickTol & YClick > PartLength-ClickTol & YClick < PartLength+ClickTol) {WhichEdgeNode = TopedgeTick; EdgeValue = TopedgeNode.value;} 	
		if (XClick > -ClickTol & XClick < PartWidth+ClickTol & YClick > -ClickTol & YClick < ClickTol) {WhichEdgeNode = BotedgeTick; EdgeValue = BotedgeNode.value;}

		//document.getElementById("TestP").innerHTML ="EdgeValue="+EdgeValue+" WhichEdgeNode="+WhichEdgeNode.id;

 
		if (EdgeValue == 'LaserEdge' & LineType == 'Profile Handle') {EdgeValue = '45Profile';}
		else if (EdgeValue == 'LaserEdge' & LineType == 'Angle Edge') {EdgeValue = 'AngleEdge';}
		else
		{
		switch (EdgeValue)
		{
		case 'LaserEdge' : EdgeValue = 'None'; break;
		case '45Profile' : EdgeValue = 'None'; break;
		case 'AngleEdge' : EdgeValue = 'None'; break;
		default : EdgeValue = 'LaserEdge'; break;
		}
		}
		
		 
 

		
		if (EdgeValue != '' & WhichEdgeNode != null)
		{
		switch (EdgeValue)
		{
		case 'LaserEdge' : ChangeCheckBoxValue(WhichEdgeNode.id,'Tick'); break;
		case '45Profile' : ChangeCheckBoxValue(WhichEdgeNode.id,'45Profile'); break;
		case 'AngleEdge' : ChangeCheckBoxValue(WhichEdgeNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(WhichEdgeNode.id,'None'); break;
		}
		}	
	}
	
	
	ClearSelectObjects();
}

function OperationToBandEdgeCheck(LeftEdge,RightEdge,TopEdge,BotEdge,OpRec,ThroughOp,OpFace)
{
	var Result = true;	

		if (LeftEdge & OpFace == 'Front' | RightEdge & OpFace == 'Back')
		{
			if (ThroughOp) 
			{
				if (OpRec.X < 50 & OpRec.Height > 300 & OpRec.Width/PartWidth > 0.5 | OpRec.X < 50 & OpRec.Height/PartLength > 0.5) {Result = false;}
				if (OpRec.X < 20 ) {Result = false;}
			}
			else
			{
				if (OpRec.X < 20 & OpRec.Y < 50 | OpRec.X < 20 & OpRec.Y+OpRec.Height > PartLength-50 | OpRec.X < 5) {Result = false;}	
			}
		}
		if (RightEdge & OpFace == 'Front' | LeftEdge & OpFace == 'Back')
		{
			if (ThroughOp) 
			{
				if (OpRec.X+OpRec.Width > PartWidth-50 & OpRec.Height > 300 & OpRec.Width/PartWidth > 0.5 | OpRec.X+OpRec.Width > PartWidth-50 & OpRec.Height/PartLength > 0.5) {Result = false;}
				if (OpRec.X+OpRec.Width > PartWidth-20 ) {Result = false;}
			}
			else
			{
				if (OpRec.X+OpRec.Width > PartWidth-20 & OpRec.Y < 50 | OpRec.X+OpRec.Width > PartWidth-20 & OpRec.Y+OpRec.Height > PartLength-50 | OpRec.X+OpRec.Width > PartWidth-5) {Result = false;}		
			}
		}
		if (TopEdge)
		{

			if (ThroughOp) 
			{
				if (OpRec.Y+OpRec.Height > PartLength-50 & OpRec.Width > 300 & OpRec.Height/PartLength > 0.5 | OpRec.Y+OpRec.Height > PartLength-50 & OpRec.Width/PartWidth > 0.5) {Result = false;}
				if (OpRec.Y+OpRec.Height > PartLength-20 ) {Result = false;}
			}
			else
			{
				if (OpRec.Y+OpRec.Height > PartLength-20 & OpRec.X < 50 | OpRec.Y+OpRec.Height > PartLength-20 & OpRec.X+OpRec.Width > PartWidth-50 | OpRec.Y+OpRec.Height > PartLength-5) {Result = false;}		
			}
		}
		if (BotEdge)
		{
			if (ThroughOp) 
			{
				if (OpRec.Y < 50 & OpRec.Width > 300 & OpRec.Height/PartLength > 0.5 | OpRec.Y < 50 & OpRec.Width/PartWidth > 0.5) {Result = false;}
				if (OpRec.Y < 20 ) {Result = false;}
			}
			else
			{
				if (OpRec.Y < 20 & OpRec.X < 50 | OpRec.Y < 20 & OpRec.X+OpRec.Width > PartWidth-50 | OpRec.Y < 5) {Result = false;}		
			}
		}
		
		//console.log("X=" + OpRec.X);
		//console.log("Y=" + OpRec.Y);
		//console.log("Height=" + OpRec.Height);
		//console.log("Width=" + OpRec.Width);
		return Result;
}

function CheckOperationAllowed(OpX,OpY,OpLength,OpWidth,OpAngle,OpDepth)
{	
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var MaterialThick = GetMatThickFromName(itemMaterial);
var Leftedge= document.getElementById("Leftedge"+LineNumber).value != 'None';
var Rightedge = document.getElementById("Rightedge"+LineNumber).value != 'None';
var Topedge = document.getElementById("Topedge"+LineNumber).value != 'None';
var Botedge = document.getElementById("Bottomedge"+LineNumber).value != 'None';
if (OpDepth >= MaterialThick) {var ThroughOp = true;} else {var ThroughOp = false;}

var OpRec = BuildObjRecPoints(OpX,OpY,OpLength,OpWidth,OpAngle);

	return OperationToBandEdgeCheck(Leftedge,Rightedge,Topedge,Botedge,OpRec,ThroughOp,ViewFace);
}

function CheckBandAllowed(LineDiv,Edge,Type)
{
var Result = true;	
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var MaterialThick = GetMatThickFromName(itemMaterial);
var RoutingCount = 0;

if (Type != 'None')
{
	for (var inc = 0; inc<PartJSON.Operations.length; inc++)
	{
		if (PartJSON.Operations[inc].Type == 'Rebate' | PartJSON.Operations[inc].Type == 'Route')
		{
		RoutingCount += 1;
		var OpX = CalcOutputValue(PartJSON.Operations[inc].X);
		var OpY = CalcOutputValue(PartJSON.Operations[inc].Y);
		var OpAngle = CalcOutputValue(PartJSON.Operations[inc].Angle)*degrees;
		var OpLength = CalcOutputValue(PartJSON.Operations[inc].Length);
		var OpWidth = CalcOutputValue(PartJSON.Operations[inc].Width);
		var OpDepth = CalcOutputValue(PartJSON.Operations[inc].Depth);
		var OpFace = PartJSON.Operations[inc].Face;
		if (OpDepth >= MaterialThick) {var ThroughOp = true;} else {var ThroughOp = false;}
		
		var Leftedge = Edge == 'Left';
		var Rightedge = Edge == 'Right';
		var Topedge = Edge == 'Top';
		var Botedge = Edge == 'Bottom';

				
		var OpRec = BuildObjRecPoints(OpX,OpY,OpLength,OpWidth,OpAngle);

		Result = OperationToBandEdgeCheck(Leftedge,Rightedge,Topedge,Botedge,ThroughOp,OpFace);

		if (!Result) {return Result;}
			
	// 	//alert(" RecX=" + round(OpRec.X,1) + " RecY="+ round(OpRec.Y,1) + " BoxHeight="+ round(OpRec.Height,1) + " BoxWidth="+round(OpRec.Width,1));	

	// 		if (Edge == 'Left' & OpFace == 'Front' | Edge == 'Right' & OpFace == 'Back')
	// 		{
	// 			if (ThroughOp) 
	// 			{
	// 				if (OpRec.X < 50 & OpRec.Height > 300 | OpRec.X < 50 & OpRec.Height/PartLength > 0.5) {Result = false;}
	// 				if (OpRec.X < 20 ) {Result = false;}
	// 			}
	// 			else
	// 			{
	// 				if (OpRec.X < 20 & OpRec.Y < 50 | OpRec.X < 20 & OpRec.Y+OpRec.Height > PartLength-50 | OpRec.X < 5) {Result = false;}		
	// 			}
	// 		}
	// 		 if (Edge == 'Right' & OpFace == 'Front' | Edge == 'Left' & OpFace == 'Back')
	// 		{
	// 			if (ThroughOp) 
	// 			{
	// 				if (OpRec.X+OpRec.Width > PartWidth-50 & OpRec.Height > 300 | OpRec.X+OpRec.Width > PartWidth-50 & OpRec.Height/PartLength > 0.5) {Result = false;}
	// 				if (OpRec.X+OpRec.Width > PartWidth-20 ) {Result = false;}
	// 			}
	// 			else
	// 			{
	// 				if (OpRec.X+OpRec.Width > PartWidth-20 & OpRec.Y < 50 | OpRec.X+OpRec.Width > PartWidth-20 & OpRec.Y+OpRec.Height <= PartLength-50 | OpRec.X+OpRec.Width > PartWidth-5) {Result = false;}		
	// 			}
	// 		}
	// 		if (Edge == 'Top')
	// 		{
	// 			if (ThroughOp) 
	// 			{
	// 				if (OpRec.Y+OpRec.Height > PartLength-50 & OpRec.Width > 300 | OpRec.Y+OpRec.Height > PartLength-50 & OpRec.Width/PartWidth > 0.5) {Result = false;}
	// 				if (OpRec.Y+OpRec.Height > PartLength-20 ) {Result = false;}
	// 			}
	// 			else
	// 			{
	// 				if (OpRec.Y+OpRec.Height > PartLength-20 & OpRec.X < 50 | OpRec.Y+OpRec.Height > PartLength-20 & OpRec.X+OpRec.Width > PartWidth-50 | OpRec.Y+OpRec.Height > PartLength-5) {Result = false;}		
	// 			}
	// 		}
	// 		if (Edge == 'Bottom')
	// 		{
	// 			if (ThroughOp) 
	// 			{
	// 				if (OpRec.Y < 20 & OpRec.Width > 300 | OpRec.Y < 20 & OpRec.Width/PartWidth > 0.5) {Result = false;}
	// 				if (OpRec.Y < 50 ) {Result = false;}
	// 			}
	// 			else
	// 			{
	// 				if (OpRec.Y < 20 & OpRec.X < 50 | OpRec.Y < 20 & OpRec.X+OpRec.Width > PartWidth-50 | OpRec.Y < 5) {Result = false;}		
	// 			}
	// 		} 
		}
	}

	// //if (PartJSON.Operations.length == 0 | RoutingCount == 0) {Result = true;} 
}
	return Result;
}

function SetBandTickBoxesForCustomShape(LineDiv)
{
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var LeftedgeTick = document.getElementById("LeftedgeTick"+LineNumber);
var RightedgeTick = document.getElementById("RightedgeTick"+LineNumber);
var TopedgeTick = document.getElementById("TopedgeTick"+LineNumber);
var BottomedgeTick = document.getElementById("BottomedgeTick"+LineNumber);
EnableCustomCheckbox(LeftedgeTick);
EnableCustomCheckbox(RightedgeTick);
EnableCustomCheckbox(TopedgeTick);
EnableCustomCheckbox(BottomedgeTick);
var HasTopLine = false;
var HasBottomLine = false;
var HasLeftLine = false;
var HasRightLine = false;
//if (LineNumber == 12) {alert(LineNumber);}


	if (PartJSON.hasOwnProperty('Vectors') )
	{
		for (var inc = 0; inc<PartJSON.Vectors.length; inc++)
		{
		var StartX = CalcOutputValue(PartJSON.Vectors[inc].SX);
		var StartY = CalcOutputValue(PartJSON.Vectors[inc].SY);
		var EndX = CalcOutputValue(PartJSON.Vectors[inc].EX);
		var EndY = CalcOutputValue(PartJSON.Vectors[inc].EY);
		

		
		var ConnVectors = FindConnedVector(PartJSON.Vectors[inc],[inc]);		
			if (PartJSON.Vectors[inc].Type == 'Line' & ConnVectors.Start > -1 & ConnVectors.End > -1)
			{
				if (StartX == 0 & EndX == 0 ) {HasLeftLine = true;}
				if (StartX == PartWidth & EndX == PartWidth) {HasRightLine = true;}
				if (StartY == PartLength & EndY == PartLength) {HasTopLine = true;} 	
				if (StartY == 0 & EndY == 0) {HasBottomLine = true;}
				
				if (PartJSON.Vectors[ConnVectors.Start].Type == 'Arc' | PartJSON.Vectors[ConnVectors.End].Type == 'Arc')
				{

					if (StartX == 0 & EndX == 0 & (StartY != PartLength | EndY != 0) ) {DisableCustomCheckbox(LeftedgeTick);}
					if (StartX == PartWidth & EndX == PartWidth & (StartY != 0 | EndY != PartLength) ) {DisableCustomCheckbox(RightedgeTick);}
					if (StartY == PartLength & EndY == PartLength & (StartX != PartWidth | EndX != 0) ) {DisableCustomCheckbox(TopedgeTick);} 	
					if (StartY == 0 & EndY == 0 & (StartX != 0 | EndX != PartWidth) ) {DisableCustomCheckbox(BottomedgeTick);}
				

				}
			}	
		}
		
		if (PartJSON.Vectors.length > 0)
		{
		if (HasLeftLine == false) {DisableCustomCheckbox(LeftedgeTick);}
		if (HasRightLine == false) {DisableCustomCheckbox(RightedgeTick);}
		if (HasTopLine == false) {DisableCustomCheckbox(TopedgeTick);} 	
		if (HasBottomLine == false) {DisableCustomCheckbox(BottomedgeTick);}
		//alert(PartJSON.Vectors.length+" "+LineNumber);
		}
	}
	
	//if (LineNumber == 6)
	//{alert("Index="+inc+" StartX="+StartX+" StartY="+StartY+" EndX="+EndX+" EndY="+EndY+" HasLeftLine="+HasLeftLine+" HasRightLine="+HasRightLine+" HasTopLine="+HasTopLine+" HasBottomLine="+HasBottomLine);}
}

function SetBandTickBoxesForLibPart(LineNumber,LibPartList,PartIndex)
{
var LeftedgeTickNode = document.getElementById("LeftedgeTick"+LineNumber);
var RightedgeTickNode = document.getElementById("RightedgeTick"+LineNumber);
var TopedgeTickNode = document.getElementById("TopedgeTick"+LineNumber);
var BottomedgeTickNode = document.getElementById("BottomedgeTick"+LineNumber);	

		var TickEdgeType = GetStdEdgeType(LineDivID,'SetBandTickBoxesForLibPart('+LineNumber+','+LibPartList+','+PartIndex+')');

		switch (LibPartList[PartIndex].EdgeLeft)
		{
		case 1 : ChangeCheckBoxValue(LeftedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(LeftedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(LeftedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(LeftedgeTickNode.id,'None'); break;
		}
		switch (LibPartList[PartIndex].EdgeRight)
		{
		case 1 : ChangeCheckBoxValue(RightedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(RightedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(RightedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(RightedgeTickNode.id,'None'); break;
		}
		switch (LibPartList[PartIndex].EdgeTop)
		{
		case 1 : ChangeCheckBoxValue(TopedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(TopedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(TopedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(TopedgeTickNode.id,'None'); break;
		}
		switch (LibPartList[PartIndex].EdgeBot)
		{
		case 1 : ChangeCheckBoxValue(BottomedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(BottomedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(BottomedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(BottomedgeTickNode.id,'None'); break;
		}
}

function SetEdgingOnVectors(LineDivID,CheckBoxID,TickEdgeType)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
	
	var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
	if (LineJSON != '') 
	{
	PartJSON = JSON.parse(LineJSON);

	switch(TickEdgeType)
	{
	case "None": 
	var EdgeValue = "N";
	break;
	default:
	var EdgeValue = "E";
	break;
	}
	if ( CheckBoxID.match('Left') != null ) { var WhichEdge = 'Left';}
	if ( CheckBoxID.match('Right') != null ) { var WhichEdge = 'Right';}
	if ( CheckBoxID.match('Top') != null ) { var WhichEdge = 'Top';}
	if ( CheckBoxID.match('Bottom') != null ) { var WhichEdge = 'Bottom';}

	
	//console.log(TickEdgeType,EdgeValue);
	for (var i = 0; i<PartJSON.Vectors.length; i++)
	{
		//console.log(i,PartJSON.Vectors[i].Type,CalcOutputValue(PartJSON.Vectors[i].SX),CalcOutputValue(PartJSON.Vectors[i].EX),PartWidth,PartJSON.Vectors.length);
		if (PartJSON.Vectors[i].Type == 'Line')
		{
			
			if (CalcOutputValue(PartJSON.Vectors[i].SX) == 0 & CalcOutputValue(PartJSON.Vectors[i].EX) == 0 & WhichEdge == 'Left') {PartJSON.Vectors[i].Edge = EdgeValue;}
			if (CalcOutputValue(PartJSON.Vectors[i].SX) == PartWidth & CalcOutputValue(PartJSON.Vectors[i].EX) == PartWidth & WhichEdge == 'Right') {PartJSON.Vectors[i].Edge = EdgeValue;}
			if (CalcOutputValue(PartJSON.Vectors[i].SY) == PartLength & CalcOutputValue(PartJSON.Vectors[i].EY) == PartLength & WhichEdge == 'Top') {PartJSON.Vectors[i].Edge = EdgeValue;} 	
			if (CalcOutputValue(PartJSON.Vectors[i].SY) == 0 & CalcOutputValue(PartJSON.Vectors[i].EY) == 0 & WhichEdge == 'Bottom') {PartJSON.Vectors[i].Edge = EdgeValue;}
		}		
	}
	
	document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
	}

}

function RevVector(VectorID)
{
var OrigSX = PartJSON.Vectors[VectorID].SX;
var OrigSY = PartJSON.Vectors[VectorID].SY;
var OrigEX = PartJSON.Vectors[VectorID].EX;
var OrigEY = PartJSON.Vectors[VectorID].EY;
PartJSON.Vectors[VectorID].SX = OrigEX;
PartJSON.Vectors[VectorID].SY = OrigEY;
PartJSON.Vectors[VectorID].EX = OrigSX;
PartJSON.Vectors[VectorID].EY = OrigSY;
	if (PartJSON.Vectors[VectorID].Type == 'Arc') 
	{
		if (PartJSON.Vectors[VectorID].CCW)	{PartJSON.Vectors[VectorID].CCW = false;} else {PartJSON.Vectors[VectorID].CCW = true;}
	}
}

function ReOrientateVectors(DeleteEdgingFirst)
{

	FindFirstVector();
	
	//FindReversedVector();
	
	FindOutOrOrderVectors(DeleteEdgingFirst);

	
	var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");
	var LeftedgeTick = document.getElementById("LeftedgeTick"+LineNumber);
	var RightedgeTick = document.getElementById("RightedgeTick"+LineNumber);
	var TopedgeTick = document.getElementById("TopedgeTick"+LineNumber);
	var BottomedgeTick = document.getElementById("BottomedgeTick"+LineNumber);
	

	ChangeCheckBoxValue(LeftedgeTick.id,'None');
	ChangeCheckBoxValue(RightedgeTick.id,'None');
	ChangeCheckBoxValue(TopedgeTick.id,'None');
	ChangeCheckBoxValue(BottomedgeTick.id,'None');
	
	if (IsClockwise() == true & CheckShapedClosed() == true)
	{
			//alert('Shape is Clockwise');
		PartJSON.Vectors.reverse();	
		for (var LoopI = 0; LoopI<PartJSON.Vectors.length; LoopI++)
		{
			//if (LoopI == 0) {MoveVectorPos(LoopI,PartJSON.Vectors.length-1);}
			RevVector(LoopI);
			
		}
	//FindFirstVector();
	//FindReversedVector();	
	}

		
	
}

function FindOutOrOrderVectors(DeleteEdgingFirst)
{
	
	for (var LoopI = 0; LoopI<PartJSON.Vectors.length; LoopI++)
	{
		if (DeleteEdgingFirst) {PartJSON.Vectors[LoopI].Edge = 'N';}
		
		ConnVectors = FindConnedVector(PartJSON.Vectors[LoopI],[LoopI]);
					//alert(LoopI + " " + ConnVectors.StartRev);
	
		if (ConnVectors.End > -1 & LoopI < PartJSON.Vectors.length-1)
		{
		ConnEndConnVectors = FindConnedVector(PartJSON.Vectors[ConnVectors.End],[ConnVectors.End]);

			if (ConnVectors.End == LoopI-1 & ConnVectors.Start == LoopI+1) {RevVector(LoopI); ConnVectors = FindConnedVector(PartJSON.Vectors[LoopI],[LoopI]);}

			if (ConnVectors.End != LoopI+1 & ConnVectors.End > 0 ) //& LoopI < PartJSON.Vectors.length-1
			{
				//DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
				//alert("ID =" + LoopI + " Start =" + ConnVectors.Start + " End=" + ConnVectors.End + " StartRev=" + ConnVectors.StartRev + " EndRev=" + ConnVectors.EndRev);
				
				
				MoveVectorPos(ConnVectors.End,LoopI+1);
				//DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
				
			}
			ConnVectors = FindConnedVector(PartJSON.Vectors[LoopI],[LoopI]);
			if (ConnVectors.EndRev == true) {RevVector(ConnVectors.End);}	//(ConnVectors.Start != LoopI-1 & LoopI > 0)
			
		//if (ConnVectors.End != 0 & LoopI == PartJSON.Vectors.length-1) {alert("ID =" + LoopI + " Start =" + ConnVectors.Start + " End=" + ConnVectors.End + " Reverse=" + ConnVectors.Reverse);}
		}
		
		
	}	
}

/* function FindReversedVector()
{
	for (var LoopI = 1; LoopI<PartJSON.Vectors.length; LoopI++)
	{
	//ConnVectors = FindConnedVector(PartJSON.Vectors[LoopI],[LoopI]);

		//if (PartJSON.Vectors[LoopI].End != LoopI+1 & LoopI < PartJSON.Vectors.length-1) {RevVector(LoopI);}
		
		if (PartJSON.Vectors[LoopI].EX == PartJSON.Vectors[LoopI-1].EX & PartJSON.Vectors[LoopI].EY == PartJSON.Vectors[LoopI-1].EY) {RevVector(LoopI);}
		if (PartJSON.Vectors[LoopI].SX != PartJSON.Vectors[LoopI-1].EX | PartJSON.Vectors[LoopI].SY != PartJSON.Vectors[LoopI-1].EY) {break;}
	
	}
} */

function MoveVectorPos(VectorID,NewPos)
{
	//alert("VectorID=" + VectorID + " NewPos=" + NewPos);
	var ObjString = JSON.parse(JSON.stringify(PartJSON.Vectors[VectorID]));
	PartJSON.Vectors.splice(NewPos, 0, ObjString);
	if (NewPos > VectorID) {PartJSON.Vectors.splice(VectorID, 1);}
	else {PartJSON.Vectors.splice(VectorID+1, 1);}
	
	//document.getElementById("TestP").innerHTML = JSON.stringify(PartJSON.Vectors);
}

function FindFirstVector()
{
	var LowestSY = 0;
	var LowestSX = 0;
	var NewFirstVector = 0;
	for (var LoopI = PartJSON.Vectors.length-1; LoopI>-1; LoopI--)
	{
		if (LoopI == PartJSON.Vectors.length-1) 
		{
			LowestSY = CalcOutputValue(PartJSON.Vectors[LoopI].SY);
			LowestSX = CalcOutputValue(PartJSON.Vectors[LoopI].SX);
			NewFirstVector = LoopI;
			//alert("First Loop ="+NewFirstVector);
		}
		else
		{
			if (CalcOutputValue(PartJSON.Vectors[LoopI].SY) < LowestSY | CalcOutputValue(PartJSON.Vectors[LoopI].SY) == LowestSY & CalcOutputValue(PartJSON.Vectors[LoopI].SX) <= LowestSX) 
			{
			LowestSY = CalcOutputValue(PartJSON.Vectors[LoopI].SY);
			LowestSX = CalcOutputValue(PartJSON.Vectors[LoopI].SX);
			NewFirstVector = LoopI;
			//alert(NewFirstVector);
			}
			if (CalcOutputValue(PartJSON.Vectors[LoopI].SX) == 0 & CalcOutputValue(PartJSON.Vectors[LoopI].SY) == 0)
			{
			LowestSY = CalcOutputValue(PartJSON.Vectors[LoopI].SY);
			LowestSX = CalcOutputValue(PartJSON.Vectors[LoopI].SX);
			NewFirstVector = LoopI;
			break;
			}
		}
	}
	
	
	var ShiftedQty = 0;
	for (var LoopI = 0; LoopI<NewFirstVector; LoopI++)
	{
		//alert(LoopI);
	var ObjString = JSON.parse(JSON.stringify(PartJSON.Vectors[LoopI]));		
	//PartJSON.Vectors.splice(PartJSON.Vectors.length, 0, ObjString);
	PartJSON.Vectors.push(ObjString);
	//PartJSON.Vectors.shift();
	ShiftedQty = LoopI+1;
	}

	if (ShiftedQty > 0) {PartJSON.Vectors.splice(0, ShiftedQty);}

}

function IsClockwise()
{
	var SumAmount = 0;
	for (var LoopI = 0; LoopI<PartJSON.Vectors.length; LoopI++)
	{
		j = (LoopI+1) % PartJSON.Vectors.length;
		SumAmount += CalcOutputValue(PartJSON.Vectors[LoopI].SX) * CalcOutputValue(PartJSON.Vectors[j].SY);
		SumAmount -= CalcOutputValue(PartJSON.Vectors[j].SX)*CalcOutputValue(PartJSON.Vectors[LoopI].SY);
	}
	return SumAmount < 0 
}

function FindConnedVector(VectorPoints,ExcludeVectors = [])
{
var ReturnVectors = {"Start" : -1,"End" : -1,"StartRev" : false,"EndRev" : false};
var VectSX = round(CalcOutputValue(VectorPoints.SX),1);
var VectSY = round(CalcOutputValue(VectorPoints.SY),1);
var VectEX = round(CalcOutputValue(VectorPoints.EX),1);
var VectEY = round(CalcOutputValue(VectorPoints.EY),1);	
var StartZeroLengthVectIndex = -1;
var EndZeroLengthVectIndex = -1;

	for (var inc = 0; inc<PartJSON.Vectors.length; inc++)
	{
		if (!ExcludeVectors.includes(inc))
		{
		var ConVectSX = round(CalcOutputValue(PartJSON.Vectors[inc].SX),1);
		var ConVectSY = round(CalcOutputValue(PartJSON.Vectors[inc].SY),1);
		var ConVectEX = round(CalcOutputValue(PartJSON.Vectors[inc].EX),1);
		var ConVectEY = round(CalcOutputValue(PartJSON.Vectors[inc].EY),1);			
			
			if (ConVectEX == VectSX & ConVectEY == VectSY)
			{
				ReturnVectors.Start = inc; 
				if (ConVectSX == ConVectEX & ConVectSY == ConVectEY) {StartZeroLengthVectIndex = inc;var StartZeroLengthVectRev = false;}
			}
			else if (ConVectSX == VectSX & ConVectSY == VectSY)
			{
				ReturnVectors.Start = inc; ReturnVectors.StartRev = true;
				if (ConVectSX == ConVectEX & ConVectSY == ConVectEY) {StartZeroLengthVectIndex = inc;var StartZeroLengthVectRev = true;}
			}
		
		
			if (ConVectSX == VectEX & ConVectSY == VectEY)
			{
				ReturnVectors.End = inc;
				if (ConVectSX == ConVectEX & ConVectSY == ConVectEY) {EndZeroLengthVectIndex = inc;var EndZeroLengthVectRev = false;}
			}
			else if (ConVectEX == VectEX & ConVectEY == VectEY)
			{
				ReturnVectors.End = inc; ReturnVectors.EndRev = true;
				if (ConVectSX == ConVectEX & ConVectSY == ConVectEY) {EndZeroLengthVectIndex = inc;var EndZeroLengthVectRev = true;}
			}
		}
	}
	//alert("ExcludeVectorID=" + ExcludeVectorID + " " + ReturnVectors.Start + " " + ReturnVectors.End );
	
	/*For handling of zero length lines created from Tangiant Constraits*/
	if (StartZeroLengthVectIndex > -1 & StartZeroLengthVectIndex != ReturnVectors.Start)
	{
	//alert("ExcludeVectorID="+ExcludeVectors+" StartZeroLIndex="+StartZeroLengthVectIndex+" ReturnVectors.Start="+ReturnVectors.Start);	
	ReturnVectors.Start = StartZeroLengthVectIndex;
	ReturnVectors.StartRev = StartZeroLengthVectRev;

	}
	if (EndZeroLengthVectIndex > -1 & EndZeroLengthVectIndex != ReturnVectors.End)
	{
	//alert("ExcludeVectorID="+ExcludeVectors+" EndZeroLIndex="+EndZeroLengthVectIndex+" ReturnVectors.End="+ReturnVectors.End);		
	ReturnVectors.End = EndZeroLengthVectIndex;
	ReturnVectors.EndRev = EndZeroLengthVectRev;
	}
	
	return ReturnVectors;
}

function SetShapeBounds()
{
var ReturnShaperec = {"StartX" : 0,"StartY" : 0,"EndX" : 0, "EndY" : 0};

	for (var LoopI = 0; LoopI<PartJSON.Vectors.length; LoopI++)
	{	
	/* 	
	var VectSX = CalcOutputValue(PartJSON.Vectors[LoopI].SX);
	var VectEX = CalcOutputValue(PartJSON.Vectors[LoopI].EX);
	var VectSY = CalcOutputValue(PartJSON.Vectors[LoopI].SY);
	var VectEY = CalcOutputValue(PartJSON.Vectors[LoopI].EY);
	
		if (PartJSON.Vectors[LoopI].Type == 'Arc')
		{
		var VectCX = CalcOutputValue(PartJSON.Vectors[LoopI].CX);
		var VectCY = CalcOutputValue(PartJSON.Vectors[LoopI].CY);
		var ArcRadius = Math.sqrt( ( (VectSX-VectCX)*(VectSX-VectCX) )+( (VectSY-VectCY)*(VectSY-VectCY) ) );
		var StartAngle = Math.atan2( (VectSY-VectCY),(VectSX-VectCX) );
		var EndAngle = Math.atan2( (VectEY-VectCY),(VectEX-VectCX) );
		
		
			if (StartAngle*Rad < -90 & EndAngle*Rad > -90 & VectCY & (StartAngle-EndAngle)*Rad >= -180 ) {}
		
		}	
	
	
	if (VectEX < VectSX) {VectSX = VectEX; VectEX = CalcOutputValue(PartJSON.Vectors[LoopI].SX);}
	if (VectEY < VectSY) {VectSY = VectEY; VectEY = CalcOutputValue(PartJSON.Vectors[LoopI].SY); } */



	var ObjRec = FindVectBoundsRec(LoopI);

		
		
		if (LoopI == 0)
		{
		ReturnShaperec.StartX = ObjRec.X;
		ReturnShaperec.StartY = ObjRec.Y;
		ReturnShaperec.EndX = ObjRec.X+ObjRec.Width;
		ReturnShaperec.EndY = ObjRec.Y+ObjRec.Height;
		}
		else
		{
		if (ObjRec.X < ReturnShaperec.StartX) { ReturnShaperec.StartX = ObjRec.X;}
		if (ObjRec.Y < ReturnShaperec.StartY) { ReturnShaperec.StartY = ObjRec.Y;}
		if (ObjRec.X+ObjRec.Width > ReturnShaperec.EndX) { ReturnShaperec.EndX = ObjRec.X+ObjRec.Width;}
		if (ObjRec.Y+ObjRec.Height > ReturnShaperec.EndY) { ReturnShaperec.EndY = ObjRec.Y+ObjRec.Height;}	
		}
	
	}
	
	//alert(JSON.stringify(PartJSON));
	
	
	if (PartJSON.Vectors.length > 0 )
	{
		var LeftMargin = ReturnShaperec.StartX;
		var RightMargin = PartWidth-ReturnShaperec.EndX;
		var TopMargin = PartLength-ReturnShaperec.EndY;
		var BotMargin = ReturnShaperec.StartY;
		
		//document.getElementById("TestP").innerHTML = "StartX=" + ReturnShaperec.StartX + " StartY=" + ReturnShaperec.StartY + " EndX=" + ReturnShaperec.EndX  + " EndY=" + ReturnShaperec.EndY;
		
		//alert("LeftMargin="+LeftMargin+" RightMargin="+RightMargin+" TopMargin="+TopMargin+" BotMargin="+BotMargin);
		
		if (round(LeftMargin,1) > 0 | round(RightMargin,1) > 0 | round(TopMargin,1) > 0 | round(BotMargin,1) > 0 )
		{
			PartWidth = round(ReturnShaperec.EndX-ReturnShaperec.StartX,1);
			PartLength = round(ReturnShaperec.EndY-ReturnShaperec.StartY,1);

			var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
			var LineNumber = LineDiv.getAttribute("data-LineNumber");

			document.getElementById("Length"+LineNumber).value = PartLength;
			document.getElementById("Width"+LineNumber).value = PartWidth;	
			
			for (var LoopI = 0; LoopI<PartJSON.Vectors.length; LoopI++)
			{
				if (PartJSON.Vectors[LoopI].Type == 'Arc' ) {var FieldLength = 6;} else {var FieldLength = 4;}
				var Field = '';
				var AxisDir = '';
				var Margin = 0;
				
				for (var i=1; i<=FieldLength; i++)
				{
					switch(i)
					{
					case 1 : Field = 'SX';AxisDir = 'X';Margin = LeftMargin; break; 
					case 2 : Field = 'SY';AxisDir = 'Y';Margin = BotMargin; break; 
					case 3 : Field = 'EX';AxisDir = 'X';Margin = LeftMargin; break; 
					case 4 : Field = 'EY';AxisDir = 'Y';Margin = BotMargin; break; 
					case 5 : Field = 'CX';AxisDir = 'X';Margin = LeftMargin; break; 
					case 6 : Field = 'CY';AxisDir = 'Y';Margin = BotMargin; break; 
					}
					
					var FieldText = PartJSON.Vectors[LoopI][Field].toString();
					var FieldValue = CalcOutputValue(PartJSON.Vectors[LoopI][Field]);
					if (FieldText.indexOf(';') > -1) {FieldText = FieldText.substring(0,FieldText.indexOf(';'));} 
					

						
					if (FieldText.search('Tangential') > -1){PartJSON.Vectors[LoopI][Field] = "Tangential;"+ round(FieldValue-Margin,3);}
					else if (FieldValue-Margin == PartWidth & AxisDir == 'X') {PartJSON.Vectors[LoopI][Field] = CalcInputValue("PartWidth");}
					else if (FieldValue-Margin == PartLength & AxisDir == 'Y') {PartJSON.Vectors[LoopI][Field] = CalcInputValue("PartLength");}
					else if (isNaN(FieldText)) {PartJSON.Vectors[LoopI][Field] = CalcInputValue(FieldText+"-"+round(Margin,3));}
					else {PartJSON.Vectors[LoopI][Field] = round(FieldValue-Margin,3).toString();}
					
						
					
				}
				
			}
		RecalcAllPartObj();
		}
	}

}

function insertCornerRadius(event,inputElem)
{ 
//alert(inputElem.parentNode.parentNode.id);
	if ( event.key == 'Enter') 
	{
	UserRad = inputElem.value;
	InsertObject();
	CloseWindow('hiddenDiv2','popUpDiv','blanket');
	ShowInputs()
	//inputElem.parentNode.parentNode.removeChild(inputElem.parentNode);
	}
}


function ShowInputBox(ParentElem)
{
var HiddenDIv = document.getElementById("hiddenDiv2");

	if (HiddenDIv.childNodes.length == 0 ) 
	{

		var Blanket = document.createElement("div");
		Blanket.id = "blanket";
		HiddenDIv.appendChild( Blanket );

		var popUpDiv = document.createElement("div");
		popUpDiv.id = "popUpDiv";	

		var Inputfield = document.createElement("input");
		Inputfield.id = "Inputfield";
		Inputfield.type = "number";
		Inputfield.className = "Inputlines";
		Inputfield.value = UserRad;
		Inputfield.setAttribute("onkeypress", "insertCornerRadius(event,this);");
		Inputfield.setAttribute("style","position:absolute;width:80px;height:25px;left:100px;Top:5px;");
		
		popUpDiv.appendChild( Inputfield );
		
		var RLabel = document.createElement("Label"); 
		RLabel.id = "RLabel";
		RLabel.innerHTML = "Radius";
		RLabel.setAttribute("style","position:absolute;left:15px;Top:10px;");	
		popUpDiv.appendChild( RLabel );
		
		HiddenDIv.appendChild( popUpDiv );	
		
		Inputfield.focus()
		Inputfield.select();
		
		SetpopupWin(popUpDiv,Blanket,25,180);
		
	}
}

function InSAngle(SAngle,EAngle)
{
	var phi =  Math.abs((SAngle*Rad) -  (EAngle*Rad)) % 360;
	if (phi > 180) {var Result = 360 - phi;} else {var Result = phi;}
	//alert("Result="+ Result + " phi=" + phi);
	return Result*degrees;
}

function InsertObject(XPos,YPos)
{
var InvalidOp = false;
	if (ToolPointClicks.length > 0) 
	{
		var LineAngle = round(Math.atan2( (YPos-ToolPointClicks[0].Y),(XPos-ToolPointClicks[0].X) )*Rad,3);
		var LineLength = Math.sqrt( ( (XPos-ToolPointClicks[0].X)*(XPos-ToolPointClicks[0].X) )+( (YPos-ToolPointClicks[0].Y)*(YPos-ToolPointClicks[0].Y) ) );
		if (ToolsSelection == 'LineBore') {var RepeatQty = Math.trunc(LineLength/32)+1; }

		var InsertXPos = CalcInputValue(round(ToolPointClicks[0].X,3));
		var InsertYPos = CalcInputValue(round(ToolPointClicks[0].Y,3));
	}

	
	//document.getElementById("TestP").innerHTML = "StartX=" + ToolPointClicks[0].X + " StartY=" + ToolPointClicks[0].Y + " EndX=" + XPos + " EndY=" + YPos;
	switch (ToolsSelection)
		{
		case 'Drilling':
						var InsertXPos = CalcInputValue(round(XPos,3));
						var InsertYPos = CalcInputValue(round(YPos,3));
						PartJSON.Operations.push({ "Type" : "Hole" , "Face" : ""+ViewFace+"" , "X" : ""+InsertXPos+"" , "Y" : ""+InsertYPos+"" , "Width" : "5" , "Depth" : "10" });
						delete PartJSON.PNCOperations;
						break;
		case 'LineBore':
						PartJSON.Operations.push({ "Type" : "LineBore" , "Face" : ""+ViewFace+"" , "X" : ""+InsertXPos+"" , "Y" : ""+InsertYPos+"" , "Angle" : round(LineAngle,3) , "Qty" : RepeatQty , "Spacing" : "32" , "Width" : "5" , "Depth" : "10" });
						delete PartJSON.PNCOperations;
						break; 
		case 'Rebate':
						var InsertLengthPos = CalcInputValue(round(LineLength,3));
						if (CheckOperationAllowed(InsertXPos,InsertYPos,InsertLengthPos,10,round(LineAngle,3)*degrees,10) == true)
						{
							PartJSON.Operations.push({ "Type" : "Rebate" , "Face" : ""+ViewFace+"" , "X" : ""+InsertXPos+"" , "Y" : ""+InsertYPos+"" , "Angle"  : round(LineAngle,3) , "Length" : ""+InsertLengthPos+""  , "Width" : "10" , "Depth" : "10" });
							delete PartJSON.PNCOperations;
						}		
						else {popup("Invalid position! Operation too close to Edgebanding!",120,350,1);InvalidOp = true;}
						break;
		case 'Route':
						var InsertLengthPos = CalcInputValue(round(YPos-ToolPointClicks[0].Y,3));
						var InsertWidthPos = CalcInputValue(round(XPos-ToolPointClicks[0].X,3));
						if (InsertLengthPos < 0) {InsertLengthPos = Math.abs(InsertLengthPos); InsertYPos = YPos; }
						if (InsertWidthPos < 0) {InsertWidthPos = Math.abs(InsertWidthPos); InsertXPos = XPos; }
						
						if (CheckOperationAllowed(InsertXPos,InsertYPos,InsertLengthPos,InsertWidthPos,90*degrees,10) == true)
						{
							PartJSON.Operations.push({ "Type" : "Route" , "Face" : ""+ViewFace+"" , "X" : ""+InsertXPos+"" , "Y" : ""+InsertYPos+"" , "Angle"  : 90 , "Length" : ""+InsertLengthPos+"" , "Width" : ""+InsertWidthPos+"" , "Depth" : "10" });
							delete PartJSON.PNCOperations;
						}		
						else {popup("Invalid position! Operation too close to Edgebanding!",120,350,1);InvalidOp = true;}
						break;
		case 'CornerRadius':
						var ArcIsCC = true;
						var InsertVectPos = -1;
						var FirstVector = FindConnedVector(PartJSON.Vectors[SelectedObjects.Items[0]],[SelectedObjects.Items[0]]);
						var SecondVector = FindConnedVector(PartJSON.Vectors[SelectedObjects.Items[1]],[SelectedObjects.Items[1]]);
						var FirstVObj = PartJSON.Vectors[SelectedObjects.Items[0]];
						var SecVObj = PartJSON.Vectors[SelectedObjects.Items[1]];
						
						if (FirstVObj.Type == 'Line' & SecVObj.Type == 'Line')
						{
						//alert("Start=" + FirstVector.Start + " End=" + FirstVector.End + " Start=" + SecondVector.Start + " End=" + SecondVector.End);
						if (FirstVector.Start == SelectedObjects.Items[1] & SecondVector.End == SelectedObjects.Items[0]) 
						{
						var FirstAngle = Math.atan2( (CalcOutputValue(FirstVObj.EY)-CalcOutputValue(FirstVObj.SY)),(CalcOutputValue(FirstVObj.EX)-CalcOutputValue(FirstVObj.SX)) );
						var SecondAngle = Math.atan2( (CalcOutputValue(SecVObj.SY)-CalcOutputValue(SecVObj.EY)),(CalcOutputValue(SecVObj.SX)-CalcOutputValue(SecVObj.EX)) );
						var RadHAngle = ((FirstAngle - SecondAngle)/2)+SecondAngle;
						var InsideAngle = ((180*degrees)-InSAngle(FirstAngle,SecondAngle))/2;
						var RadHLength = Math.abs(UserRad/Math.cos(InsideAngle));
						var RadOLength = Math.abs(Math.sin(InsideAngle)*RadHLength);
						if ((FirstAngle - SecondAngle)*Rad > 180 | (FirstAngle - SecondAngle)*Rad < -180) {RadHAngle=RadHAngle+(180*degrees);};
						var	AdjDist = (Math.cos(RadHAngle)*RadHLength);
						var	OpDist = (Math.sin(RadHAngle)*RadHLength);	
						var CenX = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].SX)) + AdjDist,3);
						var CenY = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].SY)) + OpDist,3);							
						InsertVectPos = FirstVector.Start+1;
						var EndX = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].SX)) + Math.cos(FirstAngle)*RadOLength,3);
						var EndY = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].SY)) + Math.sin(FirstAngle)*RadOLength,3);
						var StartX = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[1]].EX)) + Math.cos(SecondAngle)*RadOLength,3);
						var StartY = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[1]].EY)) + Math.sin(SecondAngle)*RadOLength,3);
						PartJSON.Vectors[SelectedObjects.Items[0]].SX = EndX.toString();
						PartJSON.Vectors[SelectedObjects.Items[0]].SY = EndY.toString();
						PartJSON.Vectors[SelectedObjects.Items[1]].EX = StartX.toString();
						PartJSON.Vectors[SelectedObjects.Items[1]].EY = StartY.toString();
							if ( (FirstAngle-SecondAngle)*Rad < -180  | (FirstAngle-SecondAngle)*Rad > 0 & (FirstAngle-SecondAngle)*Rad <= 180) {ArcIsCC = false;}
						//alert("FirstAngle =" + FirstAngle*Rad + " SecondAngle=" + SecondAngle*Rad + " Angle=" + RadHAngle*Rad.toString() + " RadHLength=" + RadHLength.toString() + " AdjDist=" + AdjDist.toString() + " OpDist=" + OpDist.toString() + " RadOLength=" + RadOLength.toString() );
						}
						if (FirstVector.End == SelectedObjects.Items[1] & SecondVector.Start == SelectedObjects.Items[0]) 
						{
						var FirstAngle = Math.atan2( (CalcOutputValue(FirstVObj.SY)-CalcOutputValue(FirstVObj.EY)),(CalcOutputValue(FirstVObj.SX)-CalcOutputValue(FirstVObj.EX)) );
						var SecondAngle = Math.atan2( (CalcOutputValue(SecVObj.EY)-CalcOutputValue(SecVObj.SY)),(CalcOutputValue(SecVObj.EX)-CalcOutputValue(SecVObj.SX)) );
						var RadHAngle = ((FirstAngle - SecondAngle)/2)+SecondAngle;
						var InsideAngle = ((180*degrees)-InSAngle(FirstAngle,SecondAngle))/2;
						//alert(InsideAngle);
						var RadHLength = Math.abs(UserRad/Math.cos(InsideAngle));
						var RadOLength = Math.abs(Math.sin(InsideAngle)*RadHLength);
						if ((FirstAngle - SecondAngle)*Rad > 180 | (FirstAngle - SecondAngle)*Rad < -180) {RadHAngle=RadHAngle+(180*degrees);};
						var	AdjDist = (Math.cos(RadHAngle)*RadHLength);
						var	OpDist = (Math.sin(RadHAngle)*RadHLength);
						var CenX = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].EX)) + AdjDist,3);
						var CenY = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].EY)) + OpDist,3);
						InsertVectPos = FirstVector.End;
						var StartX = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].EX)) + Math.cos(FirstAngle)*RadOLength,3);
						var StartY = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[0]].EY)) + Math.sin(FirstAngle)*RadOLength,3);
						var EndX = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[1]].SX)) + Math.cos(SecondAngle)*RadOLength,3);
						var EndY = round(parseFloat(CalcOutputValue(PartJSON.Vectors[SelectedObjects.Items[1]].SY)) + Math.sin(SecondAngle)*RadOLength,3);
						PartJSON.Vectors[SelectedObjects.Items[0]].EX = StartX.toString();
						PartJSON.Vectors[SelectedObjects.Items[0]].EY = StartY.toString();
						PartJSON.Vectors[SelectedObjects.Items[1]].SX = EndX.toString();
						PartJSON.Vectors[SelectedObjects.Items[1]].SY = EndY.toString();
						//alert("FirstAngle =" + FirstAngle*Rad + " SecondAngle=" + SecondAngle*Rad + " Angle=" + RadHAngle*Rad.toString() + " RadHLength=" + RadHLength.toString() + " AdjDist=" + AdjDist.toString() + " OpDist=" + OpDist.toString() + " RadOLength=" + RadOLength.toString() );
							if ( (SecondAngle-FirstAngle)*Rad < -180  | (SecondAngle-FirstAngle)*Rad > 0 & (SecondAngle-FirstAngle)*Rad <= 180) {ArcIsCC = false;}
						}
						//alert(Math.cos((FirstAngle - SecondAngle)/2));
						
						var TangentialText = "Tangential;";
						//var TangentialText = "";
					
							if (InsertVectPos > -1)
							{
							delete PartJSON.PNCVectors;	
							PartJSON.Vectors.splice(InsertVectPos,0,{ "Type" : "Arc" , "SX" : ""+TangentialText+CalcInputValue(StartX)+"" , "SY" : ""+TangentialText+CalcInputValue(StartY)+"" , "EX"  : ""+TangentialText+CalcInputValue(EndX)+"" , "EY" : ""+TangentialText+CalcInputValue(EndY)+"", "CX"  : ""+CalcInputValue(CenX)+"" , "CY" : ""+CalcInputValue(CenY)+"", "Radius" : ""+CalcInputValue(UserRad)+"" , "CCW" : ArcIsCC ,   "Edge" : "N"  }); 
							SetVectorAutoParams(InsertVectPos);
							}
							ClearSelectObjects();
						}

						break;
		case '3PointArc':
		
						var ArcIsCC = true;
						var StartX = round(parseFloat(CalcOutputValue(ToolPointClicks[1].X)),3);
						var StartY = round(parseFloat(CalcOutputValue(ToolPointClicks[1].Y)),3);
						var CenX = round(parseFloat(CalcOutputValue(ToolPointClicks[0].X)),3);
						var CenY = round(parseFloat(CalcOutputValue(ToolPointClicks[0].Y)),3);
						
						var EndAngle = Math.atan2( (parseFloat(CalcOutputValue(YPos))-CenY),(parseFloat(CalcOutputValue(XPos))-CenX) );
						var StartAngle = Math.atan2( (StartY-CenY),(StartX-CenX) );
						var ArcRadius = Math.sqrt( ( (StartX-CenX)*(StartX-CenX) )+( (StartY-CenY)*(StartY-CenY) ) );						
						var EndX = round(CenX+Math.cos(EndAngle)*ArcRadius,3);
						var EndY = round(CenY+Math.sin(EndAngle)*ArcRadius,3);
						

						if ( (StartAngle-EndAngle)*Rad < -180  | (StartAngle-EndAngle)*Rad > 0 & (StartAngle-EndAngle)*Rad <= 180) {ArcIsCC = false;}
						
						
						//document.getElementById("TestP").innerHTML = " Calc=" + (StartAngle-EndAngle)*Rad + " StartAngle=" + StartAngle*Rad + " EndAngle=" + EndAngle*Rad + " ArcIsCC=" + ArcIsCC;
						delete PartJSON.PNCVectors;
						PartJSON.Vectors.push({ "Type" : "Arc" , "SX" : ""+CalcInputValue(StartX)+"" , "SY" : ""+CalcInputValue(StartY)+"" , "EX"  : ""+CalcInputValue(EndX)+"" , "EY" : ""+CalcInputValue(EndY)+"", "CX"  : ""+CalcInputValue(CenX)+"" , "CY" : ""+CalcInputValue(CenY)+"", "Radius" : ""+CalcInputValue(round(ArcRadius,3))+"" , "CCW" : ArcIsCC ,  "Edge" : "N"  })
						SetVectorAutoParams(PartJSON.Vectors.length-1);
						ToolPointClicks = [];
						ReOrientateVectors(true);
						
						break;
		default :
			if (ToolsSelection == 'ChainLine' | ToolsSelection == 'Line')
			{	
			var PropVectPoints = {"SX" : round(ToolPointClicks[0].X,3) , "SY" : round(ToolPointClicks[0].Y,3) , "EX"  : round(XPos,3) , "EY" : round(YPos,3) };
			var ConnVectors = FindConnedVector(PropVectPoints)
			
				if (PartJSON.Vectors.length == 0) {var InsertVectPos = 0}
				else
				{
				var ReverseInsertVect = false;	
				var BestConnVectMatch = '';
				//alert("Start =" + ConnVectors.Start + " End=" + ConnVectors.End + " StartRev=" + ConnVectors.StartRev + " EndRev=" + ConnVectors.EndRev);
	
					if (ConnVectors.Start == -1 & ConnVectors.End == -1 ) {var InsertVectPos = PartJSON.Vectors.length;}
					else
					{
						if (ConnVectors.Start > -1 & ConnVectors.End > -1 )
						{
							if (ConnVectors.Start < ConnVectors.End) {BestConnVectMatch = 'Start';} else {BestConnVectMatch = 'End';}
						}
						else
						{
							if (ConnVectors.End == -1) {BestConnVectMatch = 'Start';} else {BestConnVectMatch = 'End';}	
						}
						
						if (BestConnVectMatch == 'Start') 
						{
							if (ConnVectors.StartRev == true) {var InsertVectPos = ConnVectors.Start;ReverseInsertVect = true;} else {var InsertVectPos = ConnVectors.Start+1}
						} 
						else 
						{
							if (ConnVectors.EndRev == true) {var InsertVectPos = ConnVectors.End+1;ReverseInsertVect = true;} else {var InsertVectPos = ConnVectors.End;}
						}
						//alert("BestConnVectMatch=" + BestConnVectMatch + " ReverseInsertVect=" + ReverseInsertVect + " InsertVectPos=" + InsertVectPos);
					} 
							
				}
			//alert(InsertVectPos);
			delete PartJSON.PNCVectors;
			PartJSON.Vectors.splice(InsertVectPos,0,{ "Type" : "Line" , "SX" : ""+CalcInputValue(round(ToolPointClicks[0].X,3))+"" , "SY" : ""+CalcInputValue(round(ToolPointClicks[0].Y,3))+"" , "EX"  : ""+CalcInputValue(round(XPos,3))+"" , "EY" : ""+CalcInputValue(round(YPos,3))+"", "Edge" : "N"  });		
			//if (document.activeElement.id == "LengthInput") {document.getElementById("XPosInput").focus();}
			SetVectorAutoParams(InsertVectPos);
			document.getElementById("XPosInput").focus();
			if (ReverseInsertVect == true) {RevVector(InsertVectPos);}
			//alert(IsClockwise());
			if (ToolsSelection =='ChainLine' & ConnVectors.End == -1) {ToolPointClicks[0].X = XPos; ToolPointClicks[0].Y = YPos;} else {ToolPointClicks = [];}
			
			ReOrientateVectors(true);
						
			}
			break;	
		}

		if (ModeSelection == 'Operations') {ToolPointClicks = [];}
	
		//document.getElementById("TestP").innerHTML = JSON.stringify(PartJSON.Vectors);
	
	BuildSnapPoints();
	
	if (ModeSelection == 'Operations' & InvalidOp == false)
	{
	var LastInsertedOp = PartJSON.Operations[PartJSON.Operations.length-1];
	if (LastInsertedOp.Y == 0 && round(LastInsertedOp.Length,1) == PartLength || LastInsertedOp.Y == PartLength && round(LastInsertedOp.Length,1) == PartLength ) {LastInsertedOp.Length = CalcInputValue('PartLength',PartJSON.Operations.length-1,ModeSelection);}
	if (LastInsertedOp.X == 0 && round(LastInsertedOp.Length,1) == PartWidth || LastInsertedOp.X == PartWidth && round(LastInsertedOp.Length,1) == PartWidth ) {LastInsertedOp.Length = CalcInputValue('PartWidth',PartJSON.Operations.length-1,ModeSelection);}
	}
	
//var LineNode = document.getElementById(document.getElementById('selectedline').innerHTML);

	//alert(LineNode.childNodes.item(22).value);
	if (ModeSelection == 'Operations')
	{
	ChangeSelTool(document.getElementById("SelectImagebutton"));
		if (PartJSON.Operations.length > 0) {SelectedObjects.Items.push(PartJSON.Operations.length-1);}
	FindSelectObjRec();
	ShowInputs();
	}

	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function SetVectorAutoParams(VectorID)
{
	if (VectorID > -1)
	{
		
		var ConnVectors = FindConnedVector(PartJSON.Vectors[VectorID],[VectorID]);
		var HasAutoParamX = false;
		var HasAutoParamY = false;
		

		if (PartJSON.Vectors[VectorID].Type == 'Arc')
		{
			if (CalcOutputValue(PartJSON.Vectors[VectorID].SX) > PartWidth/2 & CalcOutputValue(PartJSON.Vectors[VectorID].SX) <= PartWidth |
			CalcOutputValue(PartJSON.Vectors[VectorID].EX) > PartWidth/2 & CalcOutputValue(PartJSON.Vectors[VectorID].EX) <= PartWidth ) 
			{HasAutoParamX = true;}
			
			if (CalcOutputValue(PartJSON.Vectors[VectorID].SY) > PartLength/2 & CalcOutputValue(PartJSON.Vectors[VectorID].SY) <= PartLength |
			CalcOutputValue(PartJSON.Vectors[VectorID].EY) > PartLength/2 & CalcOutputValue(PartJSON.Vectors[VectorID].EY) <= PartLength ) 
			{HasAutoParamY = true;}
		}
		
		//alert("VectorID="+VectorID+" start="+ConnVectors.Start+" End="+ConnVectors.End);
		
		
		
		if (ConnVectors.Start > -1)
		{
			if (PartJSON.Vectors[VectorID].SX.search('Tangential') == -1 & PartJSON.Vectors[VectorID].SY.search('Tangential') == -1)
			{
			var SXConnField = GetConnVectPoint(ConnVectors.StartRev,'SX');
			var SYConnField = GetConnVectPoint(ConnVectors.StartRev,'SY');
			
			//alert("VectorID="+VectorID+" SXConnField="+SXConnField+" SYConnField="+SYConnField+" SXConnValue="+PartJSON.Vectors[ConnVectors.Start][SXConnField]+" SYConnValue="+PartJSON.Vectors[ConnVectors.Start][SYConnField]);
			
			PartJSON.Vectors[VectorID].SX = PartJSON.Vectors[ConnVectors.Start][SXConnField];
			PartJSON.Vectors[VectorID].SY = PartJSON.Vectors[ConnVectors.Start][SYConnField];
			}
		}
		else
		{ 
			if (CalcOutputValue(PartJSON.Vectors[VectorID].SX) > PartWidth/2 & CalcOutputValue(PartJSON.Vectors[VectorID].SX) <= PartWidth | HasAutoParamX == true) 
			{	
				if (PartJSON.Vectors[VectorID].SX.search(/[a-zA-Z]/) == -1 | PartJSON.Vectors[VectorID].SX.search('Tangential') > -1)
				{
				var NewValue = round(PartWidth-CalcOutputValue(PartJSON.Vectors[VectorID].SX),3);	
				if (CalcOutputValue(PartJSON.Vectors[VectorID].SX) == PartWidth) {PartJSON.Vectors[VectorID].SX = CalcInputValue("PartWidth",VectorID,ModeSelection);} 
				else {PartJSON.Vectors[VectorID].SX = CalcInputValue("PartWidth-"+NewValue.toString(),VectorID,ModeSelection);}	
				}
			}	
			if (CalcOutputValue(PartJSON.Vectors[VectorID].SY) > PartLength/2 & CalcOutputValue(PartJSON.Vectors[VectorID].SY) <= PartLength | HasAutoParamY == true)  
			{	
				if (PartJSON.Vectors[VectorID].SY.search(/[a-zA-Z]/) == -1 | PartJSON.Vectors[VectorID].SY.search('Tangential') > -1)
				{
				var NewValue = round(PartLength-CalcOutputValue(PartJSON.Vectors[VectorID].SY),3);	
				if (CalcOutputValue(PartJSON.Vectors[VectorID].SY) == PartLength) {PartJSON.Vectors[VectorID].SY = CalcInputValue("PartLength",VectorID,ModeSelection);} 
				else {PartJSON.Vectors[VectorID].SY = CalcInputValue("PartLength-"+NewValue.toString(),VectorID,ModeSelection);}
				}
			}
		}
		
		if (ConnVectors.End > -1)
		{
			if (PartJSON.Vectors[VectorID].EX.search('Tangential') == -1 & PartJSON.Vectors[VectorID].EY.search('Tangential') == -1)
			{
			var EXConnField = GetConnVectPoint(ConnVectors.EndRev,'EX');
			var EYConnField = GetConnVectPoint(ConnVectors.EndRev,'EY');
			
			//alert("VectorID="+VectorID+" EXConnField="+EXConnField+" EYConnField="+EYConnField+" EXConnValue="+PartJSON.Vectors[ConnVectors.End][EXConnField]+" EYConnValue="+PartJSON.Vectors[ConnVectors.End][EYConnField]);
			
			PartJSON.Vectors[VectorID].EX = PartJSON.Vectors[ConnVectors.End][EXConnField];
			PartJSON.Vectors[VectorID].EY = PartJSON.Vectors[ConnVectors.End][EYConnField];
			}
		}
		else
		{	
			if (CalcOutputValue(PartJSON.Vectors[VectorID].EX) > PartWidth/2 & CalcOutputValue(PartJSON.Vectors[VectorID].EX) <= PartWidth | HasAutoParamX == true) 
			{
				if (PartJSON.Vectors[VectorID].EX.search(/[a-zA-Z]/) == -1 | PartJSON.Vectors[VectorID].EX.search('Tangential') > -1)
				{
				var NewValue = round(PartWidth-CalcOutputValue(PartJSON.Vectors[VectorID].EX),3);	
				if (CalcOutputValue(PartJSON.Vectors[VectorID].EX) == PartWidth) {PartJSON.Vectors[VectorID].EX = CalcInputValue("PartWidth",VectorID,ModeSelection);} 
				else {PartJSON.Vectors[VectorID].EX = CalcInputValue("PartWidth-"+NewValue.toString(),VectorID,ModeSelection);}	
				}
			}
			if (CalcOutputValue(PartJSON.Vectors[VectorID].EY) > PartLength/2 & CalcOutputValue(PartJSON.Vectors[VectorID].EY) <= PartLength | HasAutoParamY == true) 
			{	
				if (PartJSON.Vectors[VectorID].EY.search(/[a-zA-Z]/) == -1 | PartJSON.Vectors[VectorID].EY.search('Tangential') > -1)
				{
				var NewValue = round(PartLength-CalcOutputValue(PartJSON.Vectors[VectorID].EY),3);	
				if (CalcOutputValue(PartJSON.Vectors[VectorID].EY) == PartLength) {PartJSON.Vectors[VectorID].EY = CalcInputValue("PartLength",VectorID,ModeSelection);} 
				else {PartJSON.Vectors[VectorID].EY = CalcInputValue("PartLength-"+NewValue.toString(),VectorID,ModeSelection);}
				}
			}
		}
			
		if (PartJSON.Vectors[VectorID].Type == 'Arc')
		{


			if (CalcOutputValue(PartJSON.Vectors[VectorID].CX) > PartWidth/2 & CalcOutputValue(PartJSON.Vectors[VectorID].CX) <= PartWidth | HasAutoParamX == true) 
			{	
				var NewValue = round(PartWidth-CalcOutputValue(PartJSON.Vectors[VectorID].CX),3);	
				if (CalcOutputValue(PartJSON.Vectors[VectorID].CX) == PartWidth) {PartJSON.Vectors[VectorID].CX = CalcInputValue("PartWidth",VectorID,ModeSelection);} 
				else {PartJSON.Vectors[VectorID].CX = CalcInputValue("PartWidth-"+NewValue.toString(),VectorID,ModeSelection);}	
			}
			if (CalcOutputValue(PartJSON.Vectors[VectorID].CY) > PartLength/2 & CalcOutputValue(PartJSON.Vectors[VectorID].CY) <= PartLength | HasAutoParamY == true) 
			{	
				var NewValue = round(PartLength-CalcOutputValue(PartJSON.Vectors[VectorID].CY),3);	
				if (CalcOutputValue(PartJSON.Vectors[VectorID].CY) == PartLength) {PartJSON.Vectors[VectorID].CY = CalcInputValue("PartLength",VectorID,ModeSelection);} 
				else {PartJSON.Vectors[VectorID].CY = CalcInputValue("PartLength-"+NewValue.toString(),VectorID,ModeSelection);}	
			}
			//alert("Start =" + ConnVectors.Start + " End=" + ConnVectors.End + " StartRev=" + ConnVectors.StartRev + " EndRev=" + ConnVectors.EndRev);
			if (ConnVectors.Start > -1)
			{
				if (ConnVectors.StartRev == true) {PartJSON.Vectors[ConnVectors.Start].SX = PartJSON.Vectors[VectorID].SX;} else {PartJSON.Vectors[ConnVectors.Start].EX = PartJSON.Vectors[VectorID].SX;}
				if (ConnVectors.StartRev == true) {PartJSON.Vectors[ConnVectors.Start].SY = PartJSON.Vectors[VectorID].SY;} else {PartJSON.Vectors[ConnVectors.Start].EY = PartJSON.Vectors[VectorID].SY;}
			}
			if (ConnVectors.End > -1)
			{
				if (ConnVectors.EndRev == true) {PartJSON.Vectors[ConnVectors.End].EX = PartJSON.Vectors[VectorID].EX;} else {PartJSON.Vectors[ConnVectors.End].SX = PartJSON.Vectors[VectorID].EX;}
				if (ConnVectors.EndRev == true) {PartJSON.Vectors[ConnVectors.End].EY = PartJSON.Vectors[VectorID].EY;} else {PartJSON.Vectors[ConnVectors.End].SY = PartJSON.Vectors[VectorID].EY;}
			}
		}
	}
}

function BuildSnapPoints()
{
	
SnapPoints = [];

	SnapPoints.push({ "X" : 0 , "Y" : 0 });
	SnapPoints.push({ "X" : 0 , "Y" : PartLength });
	SnapPoints.push({ "X" : PartWidth , "Y" : PartLength });
	SnapPoints.push({ "X" : PartWidth , "Y" : 0 });
	
	for (var i = 0; i<PartJSON.Operations.length; i++)
	{
		
		if (MoveObject.InMove == false | MoveObject.InMove == true & IsItemInList(i,SelectedObjects.Items) == false)
		{
			if (PartJSON.Operations[i].Face == ViewFace)
			{
			var OpX = CalcOutputValue(PartJSON.Operations[i].X);
			var OpY = CalcOutputValue(PartJSON.Operations[i].Y);
			var OpWidth = CalcOutputValue(PartJSON.Operations[i].Width);
			var LineAngle = 90*degrees;
			var OpLength = OpWidth;
			
				SnapPoints
				switch (PartJSON.Operations[i].Type)
				{
				case 'Hole':
								SnapPoints.push({ "X" : OpX , "Y" : OpY });
								break;
				case 'LineBore':
								var LineAngle = (CalcOutputValue(PartJSON.Operations[i].Angle)*degrees)+1.5708;						
									for (var ii = 0; ii<CalcOutputValue(PartJSON.Operations[i].Qty); ii++)
									{
									var HoleX = OpX + ((Math.sin(LineAngle)*CalcOutputValue(PartJSON.Operations[i].Spacing))*ii);
									var HoleY = OpY - ((Math.cos(LineAngle)*CalcOutputValue(PartJSON.Operations[i].Spacing))*ii);		
									SnapPoints.push({ "X" : HoleX , "Y" : HoleY});
									}
								break;		
				default:
								var LineAngle = (CalcOutputValue(PartJSON.Operations[i].Angle)*degrees)+1.5708;
								var OpLength = CalcOutputValue(PartJSON.Operations[i].Length);
								SnapPoints.push({ "X" : OpX , "Y" : OpY });
								var WidthCalX = Math.round(Math.sin(LineAngle-1.5708)*OpWidth);
								var WidthCalY = Math.round(Math.cos(LineAngle-1.5708)*OpWidth);
								SnapPoints.push({ "X" : OpX + WidthCalX , "Y" : OpY - WidthCalY });
								SnapPoints.push({ "X" : OpX + (Math.sin(LineAngle)*OpLength) + WidthCalX , "Y" : OpY - (Math.cos(LineAngle)*OpLength) - WidthCalY });
								SnapPoints.push({ "X" : OpX + (Math.sin(LineAngle)*OpLength) , "Y" : OpY - (Math.cos(LineAngle)*OpLength) });
								break;
				}
			}
			
			
		}	
	}
	
	for (var i = 0; i<PartJSON.Vectors.length; i++)
	{
		if (MoveObject.InMove == false | MoveObject.InMove == true & IsItemInList(i,SelectedObjects.Items) == false)
		{
			if (ViewFace == 'Front')
			{
			var VectSX = CalcOutputValue(PartJSON.Vectors[i].SX);
			var VectEX = CalcOutputValue(PartJSON.Vectors[i].EX);
			}
			else
			{
			var VectSX = PartWidth - CalcOutputValue(PartJSON.Vectors[i].SX);
			var VectEX = PartWidth - CalcOutputValue(PartJSON.Vectors[i].EX);
			}
			var VectSY = CalcOutputValue(PartJSON.Vectors[i].SY);
			var VectEY = CalcOutputValue(PartJSON.Vectors[i].EY);	
			
			
			switch (PartJSON.Vectors[i].Type)
			{
			case 'Line':
					SnapPoints.push({ "X" : VectSX , "Y" : VectSY });
					SnapPoints.push({ "X" : VectEX , "Y" : VectEY });
					break;
			case 'Arc':
					if (ViewFace == 'Front') {var VectCX = CalcOutputValue(PartJSON.Vectors[i].CX);}
					else {var VectCX = PartWidth - CalcOutputValue(PartJSON.Vectors[i].CX);}
					var VectCY = CalcOutputValue(PartJSON.Vectors[i].CY);
					SnapPoints.push({ "X" : VectSX , "Y" : VectSY });
					SnapPoints.push({ "X" : VectEX , "Y" : VectEY });
					SnapPoints.push({ "X" : VectCX , "Y" : VectCY });
					break;
			}
		}
	}
}

function SetVarToInputValue(VarButtonID,VarText)
{
var VarButton = document.getElementById(VarButtonID);
var InputField = VarButton.previousElementSibling;
if (InputField.value.toString().search(/[a-zA-Z]/) == -1 | VarText == "Tangential") {InputField.value = VarText;} else {InputField.value = InputField.value+VarText;}

InputField.focus();
InputValueChange(InputField,event);
//InputField.setAttribute("onmouseleave","InputValueChange(event);");	
HideVarList(VarButton.parentNode,VarButton.id);
}


function ShowVarList(VarButton)
{
//alert(VarButton.parentNode.clientWidth);
VarButton.style.borderStyle="inset"

var ThisRect = VarButton.getBoundingClientRect();
var ParParRect = VarButton.parentNode.parentNode.parentNode.getBoundingClientRect();
var VarDropList = document.createElement("div");
VarDropList.setAttribute("style","font-size:15px;Width:115px;background-color: rgba(255,255,255,1);position:absolute;border:1px black solid;z-index:900;");
VarDropList.id = "VarDropList";
VarDropList.style.left=VarButton.parentNode.clientWidth-2+"px";
VarDropList.style.top=ThisRect.top-ParParRect.top+8+"px";
VarDropList.setAttribute("onmouseleave","HideVarList(this.parentNode,'"+VarButton.id+"')");


var VarListElements = [];

//["X","Y","PartLength","PartWidth","PartThick","Width","Dia","Qty","Spacing","AutoSpacing","MaxSpacing(300)","MaxSpacing(400)","PartLengthCentre","PartWidthCentre","Length"]

	switch (VarButton.id)
	{
	case 'VarButXPos': 
		if (ModeSelection == 'Operations') {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[14],VariableList[5],VariableList[13]);} 
		else 
		{
			if (PartJSON.Vectors[SelectedObjects.Items[0]].Type == 'Arc') {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[15]);}
			else {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]);}
		}
		break;
	case 'VarButYPos': 
		if (ModeSelection == 'Operations') {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[14],VariableList[5],VariableList[12]);}
		else 
		{
			if (PartJSON.Vectors[SelectedObjects.Items[0]].Type == 'Arc') {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[15]);}
			else {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]);}
		}
		break;
	case 'VarButXEnd':
		if (ModeSelection == 'Operations')	VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]); 
		else 
		{
			if (PartJSON.Vectors[SelectedObjects.Items[0]].Type == 'Arc') {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[15]);}
			else {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]);}
		}
		break;
	case 'VarButYEnd': 
		if (ModeSelection == 'Operations') VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]); 
		else 
		{
			if (PartJSON.Vectors[SelectedObjects.Items[0]].Type == 'Arc') {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[15]);}
			else {VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]);}
		}
		break;
	case 'VarButLength': VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[5]); break;
	case 'VarButWidth': VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4],VariableList[5]); break;
	case 'VarButDepth': VarListElements.splice(0, 0, VariableList[4]); break;
	//case 'VarButAngle': break;
	case 'VarButQty': VarListElements.splice(0, 0,VariableList[10],VariableList[11], VariableList[2], VariableList[3],VariableList[8],VariableList[6]); break;
	case 'VarButSpacing': VarListElements.splice(0, 0, VariableList[9],VariableList[2], VariableList[3],VariableList[7],VariableList[6]); break;
	case 'VarXArcCentreInput': VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]); break;
	case 'VarYArcCentreInput': VarListElements.splice(0, 0, VariableList[2], VariableList[3],VariableList[4]); break;
	//case 'VarRadiusInput'
	case 'VarButVisible':
						for (var i = 0; i<VariableList.length; i++)
						{
							if (VariableList[i] != 'Tangential' & i > 1 & i < 9)
							{VarListElements.push(VariableList[i]);}	
						}

						break;
	}
	

	for (var i = 0; i<VarListElements.length; i++)
	{
		var VarElement = document.createElement("H5");
		VarElement.innerHTML = VarListElements[i];
		VarElement.className = "VarListItem";
		VarElement.setAttribute("onclick","SetVarToInputValue('"+VarButton.id+"',this.innerHTML);");
		VarDropList.appendChild( VarElement );
	}
	
	for (var i = 0; i<PartJSON.Parameters.length; i++)
	{
	//VarListElements.push(PartJSON.Parameters[i].ParamName);
		var VarElement = document.createElement("H5");
		VarElement.innerHTML = PartJSON.Parameters[i].ParamName;
		VarElement.className = "VarListItem";
		VarElement.setAttribute("style","color:#035afc;");
		VarElement.setAttribute("onclick","SetVarToInputValue('"+VarButton.id+"',this.innerHTML);");
		VarDropList.appendChild( VarElement );	
	}
	


/* var VarElement = document.createElement("H5");
VarElement.innerHTML = "PartWidth"
VarElement.className = "VarList";
//VarElement.setAttribute("style","left:"+VarButton.parentNode.width+"px;");
//arElement.setAttribute("style","color:rgba(128,0,0,1);");
VarDropList.appendChild( VarElement ); */

	if (VarDropList.childElementCount > 0)
	{
	VarButton.parentNode.appendChild( VarDropList );
	VarButton.setAttribute("onclick","HideVarList(this.parentNode,this.id)");
	}

} //ShowVarList End

function HideVarList(PDiv,VarButton)
{
//alert(VarButton);	
document.getElementById("VarDropList").remove();
document.getElementById(VarButton).setAttribute("onclick","ShowVarList(this)");
document.getElementById(VarButton).style.borderStyle="outset"

}

function SetViewRatioAndOrigin(LineNode) 
{
var LineNumber = LineNode.getAttribute("data-LineNumber");
	
PartLength = parseFloat(document.getElementById("Length"+LineNumber).value);
PartWidth = parseFloat(document.getElementById("Width"+LineNumber).value);
var canvas = document.getElementById('PartEditCanvas');

 	if (PartWidth/PartLength > canvas.width/canvas.height) { ViewRatio=(canvas.width-61)/PartWidth;} else { ViewRatio=(canvas.height-61)/PartLength; }	
	
	ViewXOrigin=canvas.width/2;
	ViewYOrigin=canvas.height/2;
}

function ShowPartEditWindow(LineNode) 
{
var LineNumber = LineNode.getAttribute("data-LineNumber");	
PartLength = parseFloat(document.getElementById("Length"+LineNumber).value);
PartWidth = parseFloat(document.getElementById("Width"+LineNumber).value);	


var LoggedOnCustomer = document.getElementById("Login").value;

	if (LoggedOnCustomer == 'mr trial company')
	{
	document.getElementById("PartsLibraryGroup").style.height = "120px";
	document.getElementById("LibPartSaveTypeSelect").style.display = "initial";
	document.getElementById("LibPartSaveTypeIconText").style.display = "initial";
	}
	else {document.getElementById("LibPartSaveTypeSelect").selectedIndex = 0;}
	
	if (PartLength > 0 & PartWidth > 0)	
	{
    var PartEditorDiv = document.getElementById("PartEditorDiv");
	
	var Blanket = document.getElementById("PartEditBlanket");
	var popUpDiv = document.getElementById("PartEditpopUpDiv");
	
	Blanket.removeAttribute("hidden");
	popUpDiv.removeAttribute("hidden");
	
	PopulateLiPartSelect();
	PopulateTemplateSelect();
	
	document.getElementById("LibPartNameInput").value = document.getElementById("Description"+LineNumber).value;
	
	SetLibPartIconText();
	
	document.getElementById("MainPageParamsDiv").innerHTML = "";
	

	
	if (document.getElementById("LineJSON"+LineNumber).value == '') {PartJSON = {"Operations" :[] , "Vectors" :[] , "Parameters" : [] } } else {PartJSON = JSON.parse(document.getElementById("LineJSON"+LineNumber).value);}
	if (PartJSON.hasOwnProperty("Parameters") == false) {PartJSON.Parameters = [];}


	document.getElementById("LibPartStatus").innerHTML = '';
	ToogleLibPartInputs(document.getElementById("Description"+LineNumber).value);
	
	SizePartEditWin();
	
	ChangeEditMode(document.getElementById('OperationsButton'));
	ChangeSelTool(document.getElementById('SelectImagebutton'));
	
	SetViewRatioAndOrigin(LineNode);

	var ShapedButton = document.getElementById('PartShapeButton');
	var PanelType = document.getElementById("PanelType"+LineNumber).value;	
	var ShapingOK = PanelTypes[FindItem(PanelType,PanelTypes,"Name")].PartShaping;
	
	
	if(ShapingOK) 
	{ShapedButton.disabled = false;ShapedButton.style.opacity = "1";} else {ShapedButton.disabled = true;ShapedButton.style.opacity = "0.3";}
	
	BuildSnapPoints();
	
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
	
	ScrollX = window.scrollX;
	ScrollY = window.scrollY;
	
	AddParametersToDiv(PartJSON,document.getElementById("ParamsList"));
	}
	
}  //ShowPartEditWindow

function ClosePartEditWindow() 
{
	var LineNode = document.getElementById(document.getElementById('selectedline').innerHTML);
	var LineNumber = LineNode.getAttribute("data-LineNumber");

	
	if (CheckShapedClosed() == true)
	{
	SetBandTickBoxesForCustomShape(LineNode);		

	if (PartJSON.Operations.length > 0 | PartJSON.Vectors.length > 0 | PartJSON.Parameters.length > 0 | PartJSON.hasOwnProperty("Icon") ) {document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);} else {document.getElementById("LineJSON"+LineNumber).value = '';} 
	Calculations(LineNode.id);

	//alert(JSON.stringify(PartJSON));

	//Reset PartJSON to current line as it was changed on Calculations() function call!
	if (document.getElementById("LineJSON"+LineNumber).value != "" ) {PartJSON = JSON.parse(document.getElementById("LineJSON"+LineNumber).value);}
		if (PartJSON.Vectors.length > 0) {SetShapeBounds();}
		CancelState();
		
	var Blanket = document.getElementById("PartEditBlanket");
	var popUpDiv = document.getElementById("PartEditpopUpDiv");
	Blanket.setAttribute("hidden","hidden");
	popUpDiv.setAttribute("hidden","hidden");
	}
	else {popup("Invalid Shape! Shaped not closed.",150,350,1);}
	
	document.getElementById("ParamsList").innerHTML = "";
	
	AddParametersToDiv(PartJSON,document.getElementById("MainPageParamsDiv"));
	DrawPreview('PreviewBox','PreviewBox2',document.getElementById('selectedline').innerHTML);
}

function SizePartEditWin()
{
	var Blanket = document.getElementById("PartEditBlanket");
	var popUpDiv = document.getElementById("PartEditpopUpDiv");
	//SetpopupWin(popUpDiv,Blanket,document.body.scrollHeight-100,document.body.scrollWidth-100);
	SetpopupWin(popUpDiv,Blanket,document.documentElement.clientHeight-100,document.documentElement.clientWidth-100);
	var CanvasBordLeft = document.getElementById("CanvasBorder").style.left;
	var CanvasBordTop = document.getElementById("CanvasBorder").style.top;
	//var CanvasSizeW = (document.body.scrollWidth-100) - parseInt(CanvasBordLeft.slice(0, CanvasBordLeft.length-2));
	//var CanvasSizeH = (document.body.scrollHeight-100) - parseInt(CanvasBordTop.slice(0, CanvasBordTop.length-2))-60;
	var CanvasSizeW = (document.documentElement.clientWidth-100) - parseInt(CanvasBordLeft.slice(0, CanvasBordLeft.length-2));
	var CanvasSizeH = (document.documentElement.clientHeight-100) - parseInt(CanvasBordTop.slice(0, CanvasBordTop.length-2))-60;

	document.getElementById("CanvasBorder").style.width = CanvasSizeW+"px";
	document.getElementById("PartEditCanvas").width = CanvasSizeW;
	document.getElementById("CanvasBorder").style.height = CanvasSizeH+"px";
	document.getElementById("PartEditCanvas").height = CanvasSizeH;
	
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function SetPartFromTemplate()
{
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var TemplateName = document.getElementById("PartTemplatesList").value;


	var PartIndex = FindItem(TemplateName,PartTemplates,"Name");
	if (PartIndex > -1)
	{	
	var LengthNode = document.getElementById("Length"+LineNumber);
	var WidthNode = document.getElementById("Width"+LineNumber);
	
	LengthNode.value = PartTemplates[PartIndex].Length;
	WidthNode.value = PartTemplates[PartIndex].Width;
	PartLength = PartTemplates[PartIndex].Length;
	PartWidth = PartTemplates[PartIndex].Width;
	
	document.getElementById("Description"+LineNumber).value = PartTemplates[PartIndex].Name;
	
	PartJSON = JSON.parse(JSON.stringify(PartTemplates[PartIndex].JSON));
	
	document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
	
	SetBandTickBoxesForCustomShape(LineDiv);
	
	SetBandTickBoxesForLibPart(LineNumber,PartTemplates,PartIndex);
	
	RecalcAllPartObj();
	BuildSnapPoints();
	
	AddParametersToDiv(PartJSON,document.getElementById("ParamsList"));
	
	DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML);

	}
}

function ToogleLibPartInputs(InputValue)
{
var IsExistingPart = false;
var SavePartType = document.getElementById("LibPartSaveTypeSelect").value;
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;	
	
    switch (SavePartType)
	{	
	case 'Library Part': if(FindItem(InputValue,LibParts,"Name") > -1)  {IsExistingPart = true}  break;		
	case 'Template' : if(FindItem(InputValue,PartTemplates,"Name") > -1)  {IsExistingPart = true}   break;
	case 'DescType' : if(FindItem(InputValue,DescTypes,"Name") > -1)  {IsExistingPart = true}   break;
	case 'Type':

		var ItemTypeindex = FindItem(PanelType,PanelTypes,"Name");
		if (PanelTypes[ItemTypeindex].hasOwnProperty("Parts") )
		{
		if(FindItem(InputValue,PanelTypes[ItemTypeindex].Parts,"Name") > -1)  {IsExistingPart = true}
		}
		break;
	}
	
	/* if(FindItem(InputValue,LibParts,"Name") > -1)  {IsExistingPart = true}
	if(FindItem(InputValue,DescTypes,"Name") > -1)  {IsExistingPart = true}
	if(FindItem(InputValue,PartTemplates,"Name") > -1 & SavePartType == 'Template')  {IsExistingPart = true}
	
	for (var i = 0; i<PanelTypes.length; i++)
	{
		if (PanelTypes[i].hasOwnProperty("Parts") )
		{
			if (FindItem(InputValue,PanelTypes[i].Parts,"Name") > -1) {IsExistingPart = true;}
			
		}			
	} */
	
	
	document.getElementById("SaveLibPartButton").removeAttribute("hidden");
	if(IsExistingPart) 
	{
	document.getElementById("DeleteLibPartButton").removeAttribute("hidden");
	document.getElementById("SaveLibPartButton").value = 'Override Part';	
	}
	else
	{
	document.getElementById("DeleteLibPartButton").setAttribute("hidden","hidden");
		if (InputValue.toUpperCase() !== 'DOOR' & InputValue.toUpperCase() !== 'PANEL' & InputValue.toUpperCase() !== 'TOEKICK' & InputValue.toUpperCase() !== 'DRAWER FRONT' & InputValue.toUpperCase() !== '')
		{
		document.getElementById("SaveLibPartButton").value = 'Save New Part';
		}
		else { document.getElementById("SaveLibPartButton").setAttribute("hidden","hidden"); }
	}
	
}

function PopulateTemplateSelect()
{
	if (document.getElementById("PartTemplatesList").childElementCount == 0)
	{
		var PartTemplateOpt = document.createElement("option");
		PartTemplateOpt.innerHTML = '';
		PartTemplateOpt.value = '';
		document.getElementById("PartTemplatesList").appendChild(PartTemplateOpt);
		for (var i = 0; i<PartTemplates.length; i++){
		var PartTemplateOpt = document.createElement("option");
		PartTemplateOpt.innerHTML = PartTemplates[i].Name;
		PartTemplateOpt.value = PartTemplates[i].Name;
		document.getElementById("PartTemplatesList").appendChild(PartTemplateOpt);
		}
	}
}

function SetLibPartIconText()
{
var SavePartType = document.getElementById("LibPartSaveTypeSelect").value;
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;		
document.getElementById("LibPartSaveTypeIconText").value = '';

	switch (SavePartType)
	{	
	case 'Library Part': var PartListArr = LibParts; break;		
	case 'Template' : var PartListArr = PartTemplates; break;
	case 'DescType' : var PartListArr = DescTypes; break;
	case 'Type':

		var ItemTypeindex = FindItem(PanelType,PanelTypes,"Name");
		if (PanelTypes[ItemTypeindex].hasOwnProperty("Parts") )
		{
		var PartListArr = PanelTypes[ItemTypeindex].Parts; 
		}
		break;
	}
	
	if (PartListArr != undefined)
	{
		var Index = FindItem(document.getElementById("LibPartNameInput").value,PartListArr,"Name");
		
		if (Index > -1)
		{
			//if (PartListArr[Index].hasOwnProperty("Icon"))
			if (PartListArr[Index].Icon != '')	
			{document.getElementById("LibPartSaveTypeIconText").value = PartListArr[Index].Icon;}
			else if (PartListArr[Index].JSON.hasOwnProperty("Icon"))
			{document.getElementById("LibPartSaveTypeIconText").value = PartListArr[Index].JSON.Icon;}
		}
	}

}

function PopulateLiPartSelect()
{
	//if (document.getElementById("LibraryPartsList").childElementCount == 0)
	//{
document.getElementById("LibraryPartsList").innerHTML = '';
var SavePartType = document.getElementById("LibPartSaveTypeSelect").value;
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;		

	switch (SavePartType)
	{	
	case 'Library Part': var PartListArr = LibParts; break;		
	case 'Template' : var PartListArr = PartTemplates; break;
	case 'DescType' : var PartListArr = DescTypes; break;
	case 'Type':

		var ItemTypeindex = FindItem(PanelType,PanelTypes,"Name");
		if (PanelTypes[ItemTypeindex].hasOwnProperty("Parts") )
		{
		var PartListArr = PanelTypes[ItemTypeindex].Parts; 
		}
		break;
	}
						
	
	if (PartListArr != undefined)
	{
		var LibPartOpt = document.createElement("option");
		LibPartOpt.innerHTML = '';
		LibPartOpt.value = '';
		document.getElementById("LibraryPartsList").appendChild(LibPartOpt);
		for (var i = 0; i<PartListArr.length; i++)
		{
		var LibPartOpt = document.createElement("option");
		LibPartOpt.innerHTML = PartListArr[i].Name;
		LibPartOpt.value = PartListArr[i].Name;
		document.getElementById("LibraryPartsList").appendChild(LibPartOpt);
		}
	}
	
		
	//}
}

function RePopulateDescSelect()
{
	//for (var r = 1; r<counter; r++) 
	//{
	//DescSelect = document.getElementById("DescType"+r);
	//DescSelect.innerHTML = '';
	//PopulateDescSelect(DescSelect);
	//}
	
	document.getElementById("LibraryPartsList").innerHTML = '';	
	PopulateLiPartSelect();
}

function GetClashValue(IntValue)
{
	switch (IntValue)
	{
		case 'None' : return 0;break;
		case 'LaserEdge' : return 1;break;
		case '45Profile' : return 2;break;
		case 'AngleEdge' : return 3;break;
	}
	
}

function SaveLibraryPart(SaveType)
{
var xhttp = new XMLHttpRequest();
var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PartName = document.getElementById("LibPartNameInput").value;  
var LoggedOnCustomer = document.getElementById("Login").value;
var LoggedOnToken = document.getElementById("Token").value;
var SavePartType = document.getElementById("LibPartSaveTypeSelect").value;
var PartIconText = document.getElementById("LibPartSaveTypeIconText").value;
var PanelType = document.getElementById("PanelType"+LineNumber).value;
	

	 var Leftedge = document.getElementById("Leftedge"+LineNumber).value;
	 var Rightedge = document.getElementById("Rightedge"+LineNumber).value;
	 var Topedge= document.getElementById("Topedge"+LineNumber).value;
	 var Botedge = document.getElementById("Bottomedge"+LineNumber).value;

  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
	{
	document.getElementById("LibPartStatus").innerHTML = this.responseText;	
		if (SavePartType == 'Library Part')
		{
			
			var LibPartID = FindItem(PartName,LibParts,"Name");
			if (SaveType == 'Save')
			{
				if(LibPartID == -1) 
				{
				LibParts.push({ "Name" : ""+PartName+"", "Length" : PartLength , "Width" : PartWidth, "EdgeLeft" : GetClashValue(Leftedge), "EdgeRight" : GetClashValue(Rightedge), "EdgeTop" : GetClashValue(Topedge), "EdgeBot" : GetClashValue(Botedge), "JSON" : PartJSON });	
				RePopulateDescSelect();
				}
				else
				{
				LibParts[LibPartID].Name = PartName; LibParts[LibPartID].Length = PartLength; LibParts[LibPartID].Width = PartWidth;
				LibParts[LibPartID].EdgeLeft = GetClashValue(Leftedge); LibParts[LibPartID].EdgeRight = GetClashValue(Rightedge);
				LibParts[LibPartID].EdgeTop = GetClashValue(Topedge); LibParts[LibPartID].EdgeBot = GetClashValue(Botedge);
				LibParts[LibPartID].JSON = PartJSON;
				//alert(JSON.stringify(LibParts[LibPartID].JSON));			
				}
			}
			if (SaveType == 'Delete')
			{
				
			LibParts.splice(LibPartID,1);
			RePopulateDescSelect();
			}
		}
    }
  };
  
  //if (PartIconText != '') {PartJSON.Icon = PartIconText;}
  
  delete PartJSON.Icon;
  
  if (SavePartType != 'Library Part') {var PartType = SavePartType;} else {var PartType = '';}
  if (SavePartType == 'Type') {var PartType = PanelType; }

  xhttp.open("POST",AjaxRequestsURL, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if (SaveType == 'Save')
	{	  
	 xhttp.send("SaveLibPart="+SaveType+"\nLoggedOn="+encodeURIComponent(LoggedOnCustomer)+"\nPartName="+encodeURIComponent(PartName)+"\nLibPartIcon="+encodeURIComponent(PartIconText)+"\nLibPartJSON="+encodeURIComponent(JSON.stringify(PartJSON))+"\nLength="+PartLength+"\nWidth="+PartWidth+"\nLeftedge="+Leftedge+"\nRightedge="+Rightedge+"\nTopedge="+Topedge+"\nBottomedge="+Botedge+"\nPartType="+PartType+"\nToken="+encodeURIComponent(LoggedOnToken));
	}
	
	if (SaveType == 'Delete')
	{	  
	 xhttp.send("SaveLibPart="+SaveType+"\nLoggedOn="+encodeURIComponent(LoggedOnCustomer)+"\nPartName="+encodeURIComponent(PartName)+"\nPartType="+PartType+"\nToken="+encodeURIComponent(LoggedOnToken));
	}
	
}

//------------------------------------------- Sidebar Parameters --------------------------------------------


function EvalParamVisibility(LineNodeJSON,Index)
{
	var CondText = LineNodeJSON.Parameters[Index].VisibleCond;
	
	if (CondText != '')
	{
		var EvalString = '';
		
		/*Add Paremeters to Eval String*/

		for (var i = 0; i<LineNodeJSON.Parameters.length; i++)
		{
			var ArrOfStrs = LineNodeJSON.Parameters[i].Value.split(",");
			//if (ArrOfStrs[0].search(/[a-zA-Z]/) > -1) { var FinalValue = "'"+ArrOfStrs[0]+"'";} else {FinalValue = ArrOfStrs[0];}


			if (!isNaN(ArrOfStrs[0])) {FinalValue = ArrOfStrs[0];}
			else if (PartJSON.Parameters[i].IsEquation) { var FinalValue = ParseVarCalc(ArrOfStrs[0],null,'Parameter');}
			else { var FinalValue = "'"+ArrOfStrs[0]+"'";}	
			
			
			EvalString = EvalString + "var " + LineNodeJSON.Parameters[i].ParamName + "=" + FinalValue + ";\n";	
		}
		
		//if (LineNodeJSON.Parameters[Index].ParamName == 'Hinge3Dist' ) {}

		EvalString = EvalString + CondText; 


		try { var OutputValue = eval(EvalString);} catch(err) {var OutputValue = true;}
		
		//if (LineNodeJSON.Parameters[Index].ParamName == 'Hinge3Dist' ) {alert(EvalString+"\n Result="+eval(EvalString));}	
	}
	else {var OutputValue = true;}
	

	
	if (OutputValue == true) { return true} else {return false}
	
}

function AddParametersToDiv(LineNodeJSON,InsertDiv)
{
InsertDiv.innerHTML = "";
InsertDiv.removeAttribute("hidden");

	//if (LineNode.childNodes.item(22).value != '') 
	//{
		//var LineNodeJSON = JSON.parse(LineNode.childNodes.item(22).value);	
		if (LineNodeJSON.hasOwnProperty("Parameters") == true) 
		{
		var NewItemNo = 1;	
		
		var ParamImage = document.createElement("img");
		//ParamImage.setAttribute("class","inputright"); //width:50px;height:50px;
		ParamImage.id = "ParamImgPreview";
		//ParamImage.width = "100";
		//ParamImage.height = "100";
		
		if (InsertDiv.id != 'ParamsList')
		{
		ParamImage.setAttribute("style","float:right;");//width:50px;height:50px;
		InsertDiv.appendChild( ParamImage );
		}
		
						
			for (var i = 0; i<LineNodeJSON.Parameters.length; i++)
			{	

		
				if ( EvalParamVisibility(LineNodeJSON,i) )
				{
				var newline = document.createElement("div");
				newline.id = "ParamLineDivDisplay"+NewItemNo;
				newline.setAttribute("style","position:relative;height:28px;float:left;"); //z-index:2; //border: 1px dotted black;

				var DisplayName = document.createElement("input");
				DisplayName.id = "ParamDisplayName"+NewItemNo;
				DisplayName.type = "text";
				DisplayName.setAttribute("class","inputleft");
				DisplayName.setAttribute("style","width:180px;");
				DisplayName.setAttribute("readonly","readonly");
				DisplayName.setAttribute("onfocus","DrawParamImage(this.id);");
				DisplayName.value = LineNodeJSON.Parameters[i].DisplayName;
				
				var ArrOfStrs = LineNodeJSON.Parameters[i].Value.split(",");
				
				
				if (ArrOfStrs.length > 1)
				{
				var ParamValue = document.createElement("select");
				ParamValue.setAttribute("class","inputrightSelect"); 
					for (var r = 0; r<ArrOfStrs.length; r++)
					{	
					var ParamOpt = document.createElement("option");
					ParamOpt.innerHTML = ArrOfStrs[r];
					ParamOpt.value = ArrOfStrs[r];
					//ParamOpt.setAttribute("style","font-size:14px;");	
					if (r == 0) 
					{ 
					ParamOpt.setAttribute("selected","selected"); 
					//ParamValue.value = ArrOfStrs[r];
					}		
					ParamValue.appendChild(ParamOpt);
					}	
				}
				else
				{ 
				var ParamValue = document.createElement("input");
				ParamValue.type = "text";
				//ParamValue.value = LineNodeJSON.Parameters[i].Value; 
				ParamValue.value = ParseVarCalc(LineNodeJSON.Parameters[i].Value,null,'Parameter',[i]);
				ParamValue.setAttribute("class","inputright");
				}
				
				ParamValue.id = "ParamValue"+NewItemNo;
				
				ParamValue.setAttribute("style","width:80px;");
				ParamValue.setAttribute("onchange","UpdateParamValue(this.id,event);");
				//ParamValue.setAttribute("onkeypress","UpdateParamValue(this.id,event);");
				ParamValue.setAttribute("onfocus","DrawParamImage(this.id);");
				ParamValue.autocomplete = "off";
				

				newline.appendChild( DisplayName );
				newline.appendChild( ParamValue );


				InsertDiv.appendChild( newline );

				
				/* ParamsListBox.lastChild.childNodes[0].value = LineNodeJSON.Parameters[i].ParamName;
				ParamsListBox.lastChild.childNodes[1].value = LineNodeJSON.Parameters[i].DisplayName;
				ParamsListBox.lastChild.childNodes[2].value = LineNodeJSON.Parameters[i].Value;
				if (LineNodeJSON.Parameters[i].VisibleCond != "") {ParamsListBox.lastChild.childNodes[4].value = LineNodeJSON.Parameters[i].VisibleCond;}
				if (LineNodeJSON.Parameters[i].Base64Image != "") {ParamsListBox.lastChild.childNodes[5].value = LineNodeJSON.Parameters[i].Base64Image;} */
				
				}
			NewItemNo++	//must incr line number even when not visible
			}
			
			if (InsertDiv.id == 'ParamsList')
			{
			ParamImage.setAttribute("style","float:left;");//width:50px;height:50px;
			InsertDiv.appendChild( ParamImage );
			}
		
	
		}
	//}
	
	
}

function DrawParamImage(ParamElemID)
{
var ParamImg = document.getElementById("ParamImgPreview");
var patt1=/[0-9]+/i;			
var LineNo = patt1.exec(ParamElemID);	
var Tempimg = new Image();

ParamImg.style.display = 'none';

	if (PartJSON.Parameters[LineNo-1].hasOwnProperty("Image") )
	{
	var LibImageID = FindItem(PartJSON.Parameters[LineNo-1].Image,LibImages,"Name");	
		//alert(PartJSON.Parameters[LineNo-1].Image);
		if (LibImageID > -1 & PartJSON.Parameters[LineNo-1].Image != "")
		{
		ParamImg.style.display = 'initial';	


		Tempimg.src = "data:image/png;base64,"+LibImages[LibImageID].Icon;

		//alert(Tempimg.naturalHeight);
		ParamImg.style.height = Tempimg.naturalHeight+"px";
		ParamImg.style.width = Tempimg.naturalWidth+"px";
		if (Tempimg.naturalHeight == 0 | Tempimg.naturalWidth == 0)
		{
		ParamImg.style.height = "60px";
		ParamImg.style.width = "60px";
		}

		ParamImg.style.backgroundImage = "url('data:image/png;base64,"+LibImages[LibImageID].Icon+"')";
		}
		//else {ParamImg.style.display = 'none';}
	}
}

function UpdateParamValue(ParamElemID,e)
{
	//alert(event.type);
	if (e.key == "Enter" | e.type == "change")
	{		
	var patt1=/[0-9]+/g;			
	var LineNo = patt1.exec(ParamElemID);
	var CurrentValue = PartJSON.Parameters[LineNo-1].Value;
	//var MinValue = PartJSON.Parameters[LineNo-1].MinValue;
	if (PartJSON.Parameters[LineNo-1].MinValue == '' | PartJSON.Parameters[LineNo-1].MinValue == undefined) {var MinValue = '';}
	else {var MinValue = ParseVarCalc(PartJSON.Parameters[LineNo-1].MinValue,null,'Parameter',[LineNo-1]);}
	var NewValue = document.getElementById(ParamElemID).value;
	

		if (parseFloat(NewValue) >= parseFloat(MinValue) | MinValue == '' )
		{
			if (CurrentValue.indexOf(",") > -1)
			{
				var ArrOfStrs = CurrentValue.split(",");
				var CurrPos = ArrOfStrs.indexOf(NewValue);

				ArrOfStrs.splice(CurrPos,1);
				ArrOfStrs.splice(0,0,NewValue);
				
			//alert(ArrOfStrs);	
				PartJSON.Parameters[LineNo-1].Value = ArrOfStrs.toString();	
			}
			else 
			{
			PartJSON.Parameters[LineNo-1].Value = NewValue;	
			}
			
				/*This section control banding on carcass ends that have a "Hand" parameter.*/
				if (PartJSON.Parameters[LineNo-1].ParamName == "Hand")
				{
				var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
				var LineNumber = LineDiv.getAttribute("data-LineNumber");
				var LeftedgeTickNode = document.getElementById("LeftedgeTick"+LineNumber);
				var RightedgeTickNode = document.getElementById("RightedgeTick"+LineNumber);
				var LeftedgeNode = document.getElementById("Leftedge"+LineNumber);
				var RightedgeNode = document.getElementById("Rightedge"+LineNumber);
				
					if (PartJSON.Parameters[LineNo-1].Value.split(",")[0] == "RH" & RightedgeNode.value == "LaserEdge" & LeftedgeNode.value == "None")
					{
					ChangeCheckBoxValue(LeftedgeTickNode.id,'Tick');
					ChangeCheckBoxValue(RightedgeTickNode.id,'None');	
					}
					if (PartJSON.Parameters[LineNo-1].Value.split(",")[0] == "LH" & RightedgeNode.value == "None" & LeftedgeNode.value == "LaserEdge")
					{
					ChangeCheckBoxValue(LeftedgeTickNode.id,'None');
					ChangeCheckBoxValue(RightedgeTickNode.id,'Tick');	
					}
					
				//alert(RightedgeNode.value);
				}
			

			var LineDiv = document.getElementById(document.getElementById('selectedline').innerHTML);
			var LineNumber = LineDiv.getAttribute("data-LineNumber");
			RecalcAllPartObj(document.getElementById("selectedline").innerHTML);		
			document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
			BuildSnapPoints();
			
			//alert(PartJSON.Parameters[LineNo-1].Value);
			
			if (document.getElementById("PartEditpopUpDiv").hidden == false)
			{ DrawPreview('PartEditCanvas','PreviewBox2',document.getElementById("selectedline").innerHTML); }
			else { DrawPreview('PreviewBox','PreviewBox2',document.getElementById("selectedline").innerHTML); }
			
			AddParametersToDiv(PartJSON,document.getElementById(ParamElemID).parentNode.parentNode);	
		}
		else
		{
			if( CurrentValue < MinValue){document.getElementById(ParamElemID).value = MinValue;}
			else
			{
				if (CurrentValue.indexOf(",") > -1) {document.getElementById(ParamElemID).value = CurrentValue.split(",")[0];}
				else {document.getElementById(ParamElemID).value = CurrentValue;}
			}
			popup("The value you have selected is less than the minimum value of "+MinValue+"!",150,350,1);
		}
		
	}
}

//------------------------------------------- Parameters Window --------------------------------------------


function PopulateParamsEditWindow()
{
var ParamsListBox = document.getElementById("ParamsListBox");		

	ParamsListBox.innerHTML = "";


	for (var i = 0; i<PartJSON.Parameters.length; i++)
	{	
		InsertParamLine();
		
		
		ParamsListBox.lastChild.childNodes[0].value = PartJSON.Parameters[i].ParamName;
		ParamsListBox.lastChild.childNodes[1].value = PartJSON.Parameters[i].DisplayName;
		ParamsListBox.lastChild.childNodes[2].value = PartJSON.Parameters[i].Value;
		ParamsListBox.lastChild.childNodes[4].value = PartJSON.Parameters[i].MinValue;
		if (PartJSON.Parameters[i].VisibleCond != "") {ParamsListBox.lastChild.childNodes[5].value = PartJSON.Parameters[i].VisibleCond;}
		if (PartJSON.Parameters[i].Image != "" & PartJSON.Parameters[i].Image != undefined) {ParamsListBox.lastChild.childNodes[6].value = PartJSON.Parameters[i].Image;}
		if (PartJSON.Parameters[i].Base64Image != "" & PartJSON.Parameters[i].Base64Image != undefined) {ParamsListBox.lastChild.childNodes[6].value = PartJSON.Parameters[i].Base64Image;}
		if (PartJSON.Parameters[i].IsEquation) {ParamsListBox.lastChild.childNodes[8].checked=true;} else {ParamsListBox.lastChild.childNodes[8].checked=false;}
		 
	}
}

function SaveParamsToJSON()
{
var ParamsListBox = document.getElementById("ParamsListBox");	
var NewLineNo = 1;

PartJSON.Parameters = [];

	for (var x=0; x<ParamsListBox.childElementCount;x++) 
	{
	var LineDiv = ParamsListBox.childNodes[x];
	
	
		var ParamNameVal = LineDiv.childNodes[0].value;
		var DisplayNameVal = LineDiv.childNodes[1].value;
		var ParamValue = LineDiv.childNodes[2].value;
		var ParamMinValue = LineDiv.childNodes[4].value;
		var VisCondVal = LineDiv.childNodes[5].value;
		var ImageVal = LineDiv.childNodes[6].value;
		if (LineDiv.childNodes[8].checked) {var IsEquation = true;} else {var IsEquation = false;} 
		
		if (ParamNameVal != "" & DisplayNameVal != "" & ParamValue != "")
		{
			PartJSON.Parameters.push({ "LineNumber" : NewLineNo , "ParamName" : ParamNameVal , "DisplayName" : DisplayNameVal , "Value" : ParamValue , "MinValue" : ParamMinValue , "VisibleCond" : VisCondVal , "Image" : ImageVal , "IsEquation" : IsEquation });
		}
		
		NewLineNo++
	}
		
	var LineDiv  = document.getElementById(document.getElementById('selectedline').innerHTML);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");	
	document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);

}

function ShowParamsEditWindow()
{
	document.onkeypress = null;
	
	var Blanket = document.getElementById("ParamsEditBlanket");
	var popUpDiv = document.getElementById("ParamsEditpopUpDiv");
	Blanket.removeAttribute("hidden");
	popUpDiv.removeAttribute("hidden");
	SetpopupWin(popUpDiv,Blanket,window.innerHeight-300,window.innerWidth-300);
	
	var ParamsBoxBordLeft = document.getElementById("ParamsListBox").style.left;
	var ParamsBoxBordTop = document.getElementById("ParamsListBox").style.top;
	var ParamsBoxSizeW = (window.innerWidth-300) - parseInt(ParamsBoxBordLeft.slice(0, ParamsBoxBordLeft.length-2));
	var ParamsBoxSizeH = (window.innerHeight-300) - parseInt(ParamsBoxBordTop.slice(0, ParamsBoxBordTop.length-2))-80;

	document.getElementById("ParamsListBox").style.width = ParamsBoxSizeW+"px";
	//document.getElementById("PartEditCanvas").width = CanvasSizeW;
	document.getElementById("ParamsListBox").style.height = ParamsBoxSizeH+"px";
	//document.getElementById("PartEditCanvas").height = CanvasSizeH;
	PopulateParamsEditWindow();
	PopulateImageLibSelect();
	document.getElementById("LibImageStatus").innerHTML = '';
	
	if (LoggedOnCustomer = 'mr trial company')
	{
	document.getElementById("ImagesLibraryGroup").style.display = "initial";		
	}
}

function ClosePartParamsEditWindow(SaveParams) 
{
	if (SaveParams == true) {SaveParamsToJSON();}	
		
	var Blanket = document.getElementById("ParamsEditBlanket");
	var popUpDiv = document.getElementById("ParamsEditpopUpDiv");
	Blanket.setAttribute("hidden","hidden");
	popUpDiv.setAttribute("hidden","hidden");

	document.onkeypress = stopReloadKey;
}

function CleanSpaces(Item) 
{
Item.value = Item.value.replace(" ", "");
}

function InsertParamLine() 
{
var ParamsListBox = document.getElementById("ParamsListBox");	
var NewItemNo = ParamsListBox.childElementCount+1;	
	
var newline = document.createElement("div");
newline.id = "ParamLineDiv"+NewItemNo;
newline.setAttribute("style","position:relative;height:28px;"); //z-index:2;

var ParamName = document.createElement("input");
ParamName.id = "ParamName"+NewItemNo;
ParamName.name = "ParamName"+NewItemNo;
ParamName.type = "text";
ParamName.setAttribute("class","Inputlines");
ParamName.setAttribute("style","width:120px;left:0px;");
ParamName.setAttribute("onchange","CleanSpaces(this);");

var DisplayName = document.createElement("input");
DisplayName.id = "DisplayName"+NewItemNo;
DisplayName.name = "DisplayName"+NewItemNo;
DisplayName.type = "text";
DisplayName.setAttribute("class","Inputlines");
DisplayName.setAttribute("style","width:120px;left:125px;");

var DefaultValue = document.createElement("input");
DefaultValue.id = "DefaultValue"+NewItemNo;
DefaultValue.name = "DefaultValue"+NewItemNo;
DefaultValue.type = "text";
DefaultValue.setAttribute("class","Inputlines InputlinesLeft");
DefaultValue.setAttribute("style","width:120px;left:250px;");

var ValueListDropButton = document.createElement("input");
ValueListDropButton.id = "ValueListDropButton"+NewItemNo;
ValueListDropButton.name = "ValueListDropButton"+NewItemNo;
ValueListDropButton.type = "button";
ValueListDropButton.setAttribute("class","Inputlines RightDropDownButton");
ValueListDropButton.setAttribute("style","width:23px;left:370px;");
ValueListDropButton.setAttribute("onmouseup","ShowHideValueListEditWin(this.parentNode);");

var MinValue = document.createElement("input");
MinValue.id = "MinValue"+NewItemNo;
MinValue.name = "MinValue"+NewItemNo;
MinValue.type = "text";
MinValue.setAttribute("class","Inputlines");
MinValue.setAttribute("style","width:100px;left:398px;");

var VisibleCond = document.createElement("input");
VisibleCond.id = "VisibleCond"+NewItemNo;
VisibleCond.name = "VisibleCond"+NewItemNo;
VisibleCond.type = "text";
VisibleCond.setAttribute("class","Inputlines");
VisibleCond.setAttribute("style","width:140px;left:503px;");

var Image = document.createElement("input");
Image.id = "Image"+NewItemNo;
Image.name = "Image"+NewItemNo;
Image.type = "text";
Image.setAttribute("class","Inputlines");
Image.setAttribute("style","width:240px;left:648px;");
Image.setAttribute("onmouseup","ShowCustomDropDown(this,LibImages);");
Image.setAttribute("onchange","");
Image.setAttribute("data-AssocInputID","Image"+NewItemNo);

var ImageDropButton = document.createElement("input");
ImageDropButton.id = "ImageDropButton"+NewItemNo;
ImageDropButton.name = "ImageDropButton"+NewItemNo;
ImageDropButton.type = "button";
ImageDropButton.setAttribute("class","Inputlines RightDropDownButton");
ImageDropButton.setAttribute("style","width:23px;left:888px;");
ImageDropButton.setAttribute("onmouseup","ShowCustomDropDown(this,LibImages);");
ImageDropButton.setAttribute("data-AssocInputID","Image"+NewItemNo);

var EquationTick = document.createElement("input");
EquationTick.id = "IsEquation"+NewItemNo;
EquationTick.name = "IsEquation"+NewItemNo;
EquationTick.type = "checkbox";
EquationTick.setAttribute("class","Inputlines");
EquationTick.setAttribute("style","width:24px;left:916px;");

var DeleteParamButton = document.createElement("input");
DeleteParamButton.id = "DeleteParamButton"+NewItemNo;
DeleteParamButton.name = "DeleteParamButton"+NewItemNo;
DeleteParamButton.value = "Delete";
DeleteParamButton.type = "button";
DeleteParamButton.setAttribute("class","Inputlines NormalButton");
DeleteParamButton.setAttribute("style","border-style:initial;width:60px;left:944px;");
DeleteParamButton.setAttribute("onclick","RemoveParamLine(this.parentNode);");

var MoveUpButton = document.createElement("input");
MoveUpButton.id = "MoveUpButton"+NewItemNo;
MoveUpButton.name = "MoveUpButton"+NewItemNo;
MoveUpButton.type = "button";
MoveUpButton.setAttribute("class","UpArrow");
MoveUpButton.setAttribute("style","left:1010px;");
MoveUpButton.setAttribute("onclick","MoveParamLine(this.parentNode,true);");

var MoveDownButton = document.createElement("input");
MoveDownButton.id = "MoveDownButton"+NewItemNo;
MoveDownButton.name = "MoveDownButton"+NewItemNo;
MoveDownButton.type = "button";
MoveDownButton.setAttribute("class","DownArrow");
MoveDownButton.setAttribute("style","left:1038px;");
MoveDownButton.setAttribute("onclick","MoveParamLine(this.parentNode,false);");



newline.appendChild( ParamName );
newline.appendChild( DisplayName );
newline.appendChild( DefaultValue );
newline.appendChild( ValueListDropButton );
newline.appendChild( MinValue );
newline.appendChild( VisibleCond );
newline.appendChild( Image );
newline.appendChild( ImageDropButton );
newline.appendChild( EquationTick );
newline.appendChild( DeleteParamButton );
newline.appendChild( MoveUpButton );
newline.appendChild( MoveDownButton );

ParamsListBox.appendChild(newline);

}

function ShowHideValueListEditWin(ParamLineDiv)
{
var patt1=/[0-9]+/i;	
//var LineDiv = document.getElementById("ParamLineDiv"+LineNumber);
var LineNumber = Number(patt1.exec(ParamLineDiv.id));	
var ExistingListWin = document.getElementById("ValueListWin");
var ValueInput = document.getElementById("DefaultValue"+LineNumber);	
	
//alert(ValueInput);	
	
	if (ExistingListWin == null)
	{
	
		//var ParamLineDiv = document.getElementById("ParamLineDiv"+LineNumber);
		var ArrOfStrs = new Array();	

		var ValueListWin = document.createElement("textarea");
		ValueListWin.id = "ValueListWin";
		ValueListWin.setAttribute("style","position:relative;height:300px;width:200px;z-index:50;");
		//ValueListWin.setAttribute("onkeyup","function CloseOnEnter(event){ if (event.key == 10 ) {ShowHideValueListEditWin("+LineNumber+");} };");
		ValueListWin.style.left = ValueInput.style.left;
		ValueListWin.style.top = ValueInput.offsetHeight+1+"px";
		//ValueListWin.value = ValueInput.value;
		ArrOfStrs = ValueInput.value.split(",");
		//alert(ArrOfStrs.length);
		
		for (var inc = 0; inc<ArrOfStrs.length; inc++)
		{
		ValueListWin.value = ValueListWin.value + ArrOfStrs[inc];
			if (inc < ArrOfStrs.length-1) {ValueListWin.value = ValueListWin.value + "\n"; }
		}

		ParamLineDiv.appendChild( ValueListWin );
	}
	else
	{
		var CurrStr = ""; 
		ValueInput.value = ExistingListWin.value.split("\n");

		CurrStr = ValueInput.value;	

		while (CurrStr.endsWith(",")) {

		CurrStr = CurrStr.slice(0,-1);
		//alert(CurrStr);
		}
		ValueInput.value = CurrStr;
			
		ExistingListWin.parentNode.removeChild(ExistingListWin);	
	}
		
}

function RemoveParamLine(LineDiv)
{
var patt1=/[0-9]+/i;	
//var LineDiv = document.getElementById("ParamLineDiv"+LineNumber);
var LineNumber = Number(patt1.exec(LineDiv.id));		
var LineCount = LineDiv.parentNode.childElementCount;
	
LineDiv.parentNode.removeChild(LineDiv);
var patt1=/[^0-9]+/i;

	for (var i=LineNumber+1; i<=LineCount;i++) 
	{
		LineDiv = document.getElementById("ParamLineDiv"+i);
		for (var x=0; x<LineDiv.childElementCount;x++) 
		{
		
			var OldId = LineDiv.childNodes.item(x).id;
			var OldName = LineDiv.childNodes.item(x).name;
			
			var NewID = (OldId.substr(0,1)+patt1.exec(OldId.substr(1,OldId.length-1))+(i-1));
			//var NewID =	OldId.splice	
			LineDiv.childNodes.item(x).id = NewID;
			
			var NewName = LineDiv.childNodes.item(x).name.slice(0,LineDiv.childNodes.item(x).name.length-1)+(i-1); 
			LineDiv.childNodes.item(x).name = NewName;
			
			if (LineDiv.childNodes.item(x).hasAttribute("data-AssocInputID") )
			{
				var AssocInputIDAtt = LineDiv.childNodes.item(x).getAttribute("data-AssocInputID");
				LineDiv.childNodes.item(x).setAttribute("data-AssocInputID",patt1.exec(AssocInputIDAtt)+(i-1));
			}
	
		//LineDiv.childNodes.item(x).value = 	NewName;		
		}
		
		LineDiv.id = "ParamLineDiv"+(i-1);
	}

}

function MoveParamLine(LineDiv,MoveUp)
{
var patt1=/[0-9]+/i;	
//var LineDiv = document.getElementById("ParamLineDiv"+LineNumber);
var LineNumber = Number(patt1.exec(LineDiv.id));	
var LineCount = LineDiv.parentNode.childElementCount;


	if (MoveUp) {var NewLineNumber = LineNumber-1;} else {var NewLineNumber = LineNumber+1;}
	//alert("NewLineNumber="+NewLineNumber+" LineNumber="+LineNumber);	
	if (NewLineNumber > LineCount) {NewLineNumber = LineCount;}
	if (NewLineNumber < 1) {NewLineNumber = 1;}

	var LineDivSameNewNumber = document.getElementById("ParamLineDiv"+NewLineNumber);
	
	//alert(" LineDivSameNewNumber="+LineDivSameNewNumber.id+" LineDiv="+LineDiv.id);
	//alert("NewLineNumber="+NewLineNumber+" LineNumber="+LineNumber);

	if (LineDivSameNewNumber != LineDiv)
	{
		if (MoveUp){var NumberInc = NewLineNumber+1;} else {var NumberInc = NewLineNumber-1;}

		RenameElem(LineDivSameNewNumber,NumberInc);	
		
		for (var x=0; x<LineDivSameNewNumber.childElementCount;x++) 
		{
			var LineChild = LineDivSameNewNumber.children[x];
			RenameElem(LineChild,NumberInc);
		}
		
		RenameElem(LineDiv,NewLineNumber);	

		for (var x=0; x<LineDiv.childElementCount;x++) 
		{
			var LineChild = LineDiv.children[x];
			RenameElem(LineChild,NewLineNumber);	
		}		

	var LineDivParent = LineDiv.parentNode;
	
	if (MoveUp)  {LineDivParent.insertBefore(LineDiv,LineDivSameNewNumber);}
	else {LineDivParent.insertBefore(LineDivSameNewNumber,LineDiv);}		
	}
	
	
}

function RenameElem(Elem,NewNumber)
{
var patt1=/[^0-9]+/i;
	
	var OldId = Elem.id;
	var OldName = Elem.name;
	
	var NewID = patt1.exec(OldId)+(NewNumber); 
	Elem.id = NewID;
			
	var NewName = patt1.exec(OldName)+(NewNumber);
	Elem.name = NewName; 

	if (Elem.hasAttribute("data-AssocInputID") )
	{
		var AssocInputIDAtt = Elem.getAttribute("data-AssocInputID");
		Elem.setAttribute("data-AssocInputID",patt1.exec(AssocInputIDAtt)+(NewNumber));
	}	
}

function SaveLibraryImage(SaveType)
{
var xhttp = new XMLHttpRequest();
var ImageName = document.getElementById("LibImageNameInput").value;  
var IconText = document.getElementById("LibImageIconText").value;
var LoggedOnCustomer = document.getElementById("Login").value;
var LoggedOnToken = document.getElementById("Token").value;
	


  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
	{
	document.getElementById("LibImageStatus").innerHTML = this.responseText;	
	
		var LibImageID = FindItem(ImageName,LibImages,"Name");
		if (SaveType == 'Save')
		{
			if(LibImageID == -1) 
			{
			LibImages.push({ "Name" : ImageName , "Icon" : IconText });	
			PopulateImageLibSelect();
			}
			else
			{
			LibImages[LibImageID].Name = ImageName;
			LibImages[LibImageID].Icon = IconText;			
			}
		}
		if (SaveType == 'Delete')
		{
			
		LibImages.splice(LibImageID,1);
		PopulateImageLibSelect();
		}
    }
  };
  
 
  xhttp.open("POST",AjaxRequestsURL, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("SaveLibImage="+SaveType+"\nImageName="+encodeURIComponent(ImageName)+"\nLoggedOn="+encodeURIComponent(LoggedOnCustomer)+"\nToken="+encodeURIComponent(LoggedOnToken)+"\nBase64IconText="+encodeURIComponent(IconText) );
	
}

function PopulateImageLibSelect()
{

document.getElementById("ImageLibraryList").innerHTML = '';

	var LibImageOpt = document.createElement("option");
	LibImageOpt.innerHTML = '';
	LibImageOpt.value = '';
	document.getElementById("ImageLibraryList").appendChild(LibImageOpt);
	for (var i = 0; i<LibImages.length; i++)
	{
	var LibImageOpt = document.createElement("option");
	LibImageOpt.innerHTML = LibImages[i].Name;
	LibImageOpt.value = LibImages[i].Name;
	document.getElementById("ImageLibraryList").appendChild(LibImageOpt);
	}

}

function ToogleImageLibInputs(InputValue)
{
var LibImageID = FindItem(InputValue,LibImages,"Name");
var ImgPreview = document.getElementById("LibImagePreview");
	
	
	document.getElementById("SaveLibImageButton").removeAttribute("hidden");
	if(LibImageID > -1) 
	{
	document.getElementById("DeleteLibImageButton").removeAttribute("hidden");
	document.getElementById("SaveLibImageButton").value = 'Override Image';
	document.getElementById("LibImageIconText").value = LibImages[LibImageID].Icon;
	
		var Tempimg = new Image();	
		Tempimg.src = "data:image/png;base64,"+LibImages[LibImageID].Icon;
		ImgPreview.style.height = Tempimg.naturalHeight+"px";
		ImgPreview.style.width = Tempimg.naturalWidth+"px";
		ImgPreview.style.backgroundImage = "url('data:image/png;base64,"+LibImages[LibImageID].Icon+"')";
	
	}
	else
	{
	document.getElementById("DeleteLibImageButton").setAttribute("hidden","hidden");
	document.getElementById("SaveLibImageButton").value = 'Save New Image';
	document.getElementById("LibImageIconText").value = '';
	ImgPreview.style.backgroundImage = "";
	}
	
}

function GetLibImages()
{
var xhttp = new XMLHttpRequest();
var LoggedOnCustomer = document.getElementById("Login").value;
var LoggedOnToken = document.getElementById("Token").value;

  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
	{
	//alert(this.responseText);	
	var ImglistJSON = JSON.parse(this.responseText);	
	LibImages = ImglistJSON.LibImagesList; 
    }
  };
  
  xhttp.open("POST",AjaxRequestsURL, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("GetLibImages=Yes\nLoggedOn="+encodeURIComponent(LoggedOnCustomer)+"\nToken="+encodeURIComponent(LoggedOnToken));
	
}

function GetLibParts()
{
var xhttp = new XMLHttpRequest();
var LoggedOnCustomer = document.getElementById("Login").value;
var LoggedOnToken = document.getElementById("Token").value;


  xhttp.onreadystatechange = function() 
  {	  
    if (this.readyState == 4 && this.status == 200) 
	{
		var OnlyChangeIcon = true;
		var DontUpdateJSON = true;
		var UpdoadFileName = document.getElementById("UpdoadFileName").value;

		var FileExt = decodeURI(UpdoadFileName).split('.').pop();

		if (FileExt == "xls" || FileExt == "xlsx"  || FileExt == "csv" || FileExt == "ods")
		{
			//console.log(FileExt);
			OnlyChangeIcon = false;
			DontUpdateJSON = false;		
		}

		var LibPartslistJSON = JSON.parse(this.responseText);	
		LibParts = LibPartslistJSON.LibPartsList; 
		var OrderLines = document.getElementById("Orderlines");
		
			for (var x=0; x<OrderLines.childElementCount;x++) 
			{
			ChangeDesc(OrderLines.children[x].id,OnlyChangeIcon,DontUpdateJSON);
			}
	
    }
  };
  
  xhttp.open("POST",AjaxRequestsURL, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("GetLibParts=Yes\nLoggedOn="+encodeURIComponent(LoggedOnCustomer)+"\nToken="+encodeURIComponent(LoggedOnToken));
	
}


