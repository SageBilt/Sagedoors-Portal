var counter = 1;
/*var StdLeadTime = 4;
var MitreHandlesLeadTime = 4;
var GlassFrameLeadTime = 6;
var BuildupPanelLeadTime = StdLeadTime;
var NonStockLeadTime = 12;

//var PriceIncPercent = 1.012*1.05*1.05 /*Added 5 percent 1st May 2022*/
var CurrentOrderLeadTime = 4;

var GrainMatchPartSizeRatio = 0;
var ShowPartEditor = false;
var PartJSON = { "Operations" : [] , "Vectors" : [] };
var ViewXOrigin = 0;
var ViewYOrigin = 0;
var ViewRatio = 0.20;
var CustomerMachiningCharge = true;

var PartLength = 0;
var PartWidth = 0;

var HDFPrefix = 'OPTIDOOR';

var LastSelectedLineID = "";



var PanelTypes = [
{ "Name" : "Standard Panel" , "PartShaping" : true , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA9SURBVDhPY/z//z8DGDAyMkIYBAFCC7Lm9082QNh4gKBMAFwLE4QiD4xqJhGMaiYRjGomEVCkmYJiiIEBAOKsFR0Z4/bgAAAAAElFTkSuQmCC" },
{ "Name" : "Glass Frame" , "PartShaping" : false , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABgSURBVDhPY/z//z8DGDAyMkIYBAFCC7LmnVXhEDYe4N62Eq6FCUKRB1igNBIAmg1loQJMd2HRDASHDx+GsmDA1tYWykICFDl7VDOJYFQziQB72saakjHBwOVnCoohBgYAvjok1vXxW9UAAAAASUVORK5CYII=" }, 
{ "Name" : "Roller Surround" , "PartShaping" : false , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB1SURBVDhPY/z//z8D2YBszUCNIJsZGRkLJu2DihEHJuQ5ATUyQXlkARYoDQZA86As3ADZjeg2Ax2DB0AVwQCKzUBw5MgRKIsIgK7ZxsYGyiICjNo8ajNBQJHN0PwM5TEwHD58GMrCBmxtbaEseGEA5ZEKGBgAVhFRDfcAtfIAAAAASUVORK5CYII=" },
{ "Name" : "Builtup Panel" , "PartShaping" : false , "Parts" : [{ "Name" : "Builtup Panel", "EdgeLeft" : 1, "EdgeRight" : 0, "EdgeTop" : 0, "EdgeBot" : 0}] , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABBSURBVDhPY/z//z8DuYAJSpMFBk4zI5TGDfAECkjzzqpwCAcTuLetxKN5iAYYRYBAgOEBwLAckQE2ArMkBZoZGAChzBIUyv2tRgAAAABJRU5ErkJggg==" },  
{ "Name" : "Profile Handle" , "PartShaping" : false , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACESURBVDhPY/wPBAxUBCgGvpNVhbJQgdDj21AWYcAEpfECXBZhAyguZGRkhLJQwVsZFTBNjEuxuhBkBwyDgPCTO2CaGJcS9DKphhIVhqQYSpSBIECsoUQbCALEGEqSgSBAyFCSDQQBdEORAdZ0iCSEF2BTT5YL8YFRAykHg99AKlcBDAwAsVZQCkn2XVcAAAAASUVORK5CYII=" }, 
{ "Name" : "Angle Edge" , "PartShaping" : false , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAACJSURBVDhPrdUxDoAgDIVh6hWcHb3/hRydvYL6CJgSKLaFf8EBP2tikO63MLElrV/XtqcrXwVIRHEdQasJ1/OIqxetQDSCNkHkRUUQedAmyL8kKypO6EW7r+xBuyCyor8gsqAqEGlRNYg0qAlELZRXHF/5cOA3SeW9iO83T5iTHuoGpaaDk38BITyDt1JWRLLQ9QAAAABJRU5ErkJggg==" },  
{ "Name" : "Shapes" , "PartShaping" : true , "Parts" : [] , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABqSURBVDhPYwCC/4TwWxmV/8QCRpCGw4cPAynswNbWlgFoIIPQ49tQEfyACUpTDYwaSDkYBgaC0qjwkzsM72RVoSL4AcGEDQOwBE4IEG0gCIAMJQRIMpAQAFk4mmwoB4PfQHCygTCpARgYAP6jTY4T7QMHAAAAAElFTkSuQmCC" }, 
{ "Name" : "Handle Cut-outs" , "PartShaping" : true , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAB9SURBVDhPY/wPBAxUBExQmmqA8a2MCk4XCj2+DWWhgneyqlAWdgAyECsGWYYOoA7AiRlBxOHDh4EUKrC1tWUAasZwJch1wk/uMODSQzAMQQYgY0IApwtBAGQjNoBPPV4DSQVEeZlUMGog5WAEGghO2BAmdcDgL2CpbCADAwA84E069WcNsgAAAABJRU5ErkJggg==" },
{ "Name" : "Optidoor" , "PartShaping" : false , "Icon" : "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABFSURBVDhP7cvLDQAwCAJQ5u1mXacL2U84iyb2JiGBy4O9IBkqDrDmCPYPPseJxpFDxWksDxWnsTxUnCrsROBIq3Eq15ht59xLx6zprEUAAAAASUVORK5CYII=" }    
];

var LibImages = [];

var HDFDoorSpecData = [
{"Profile" : "ALASKA" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 42 , "MaxEdge" : 0 , "IsFixedSpacing" : false, "UserSpacing" : true, "HalfSpacingSideMargin" : true, "Width" : 26} },
{"Profile" : "ANNAPOLIS" , "ProfileMargin" : 18 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "ARIZONA" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : true},
{"Profile" : "ASPEN" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "VGrooves" : {"MaxScallopWidth" : 32, "MaxMaxScallopWidth" : 32 , "IsFixedSpacing" : false, "FlatWidth" : 3, "MinFlatWidth" : 3, "ScallopToolRad" : 35} },
{"Profile" : "BARNSLEY" , "ProfileMargin" : 18 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "CALIFORNIA" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "VGrooves" : {"MaxScallopWidth" : 39, "MaxMaxScallopWidth" : 42 , "IsFixedSpacing" : false, "FlatWidth" : 3, "MinFlatWidth" : 3, "ScallopToolRad" : 35} },
{"Profile" : "CAROLINA" , "ProfileMargin" : 18 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "CHICAGO" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 13 ,"GrooveWidth" : 6.4 ,"GrooveDepth" : 1.5,"MinGrooveWidth" : 6.4,"MaxGrooveDepth" : 15, "UserSpacing" : true, "ToggleStartFinishOnLow" : true} },
{"Profile" : "COLORADO" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false},
{"Profile" : "DAKOTA" , "ProfileMargin" : 60 , "Frame" : true , "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 71 , "MaxEdge" : 75 , "IsFixedSpacing" : true , "ExtendThroughFrame" : true} },
{"Profile" : "DELAWARE" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 40 , "MaxEdge" : 0 , "IsFixedSpacing" : false , "FixedSideMargin" : 0.01 } },
{"Profile" : "FLORIDA" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : true},
{"Profile" : "GEORGIA" , "ProfileMargin" : 10 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "HAWAII" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 22 , "MaxEdge" : 0 , "IsFixedSpacing" : false , "FixedSideMargin" : 13 } },
{"Profile" : "ILLINOIS" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 31 ,"GrooveWidth" : 6.4 ,"GrooveDepth" : 5,"MinGrooveWidth" : 6.4,"MaxGrooveDepth" : 15, "UserSpacing" : true, "ToggleStartFinishOnLow" : true} },
{"Profile" : "IOWA" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 24 , "MaxEdge" : 0 , "IsFixedSpacing" : false, "UserSpacing" : true, "HalfSpacingSideMargin" : true, "MaxScallopWidth" : 9, "MaxMaxScallopWidth" : 9, "ScallopToolRad" : 4.75 } },
//{"Profile" : "IOWA" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "VGrooves" : {"MaxScallopWidth" : 9, "MaxMaxScallopWidth" : 9 , "IsFixedSpacing" : false, "FlatWidth" : 15, "MinFlatWidth" : 3, "ScallopToolRad" : 4.75, "HalfSpacingSideMargin" : true} },
{"Profile" : "KANSAS" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MinSpacing" : 60 , "IsFixedSpacing" : false , "FixedSideMargin" : 32 , "Width" : 60} },
{"Profile" : "KENDAL" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "KENTUCKY" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : true, "UserPocketDepth" : 6, "MaxUserPocketDepth" : 12 },
{"Profile" : "LAUREL" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "TEL" : 43 ,"VGrooves" : {"MaxSpacing" : 38 , "MaxEdge" : 0 , "IsFixedSpacing" : false, "UserSpacing" : true, "HalfSpacingSideMargin" : true, "Width" : 22} },
{"Profile" : "LINCOLN" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 31 ,"GrooveWidth" : 6.4 ,"GrooveDepth" : 4 ,"MinGrooveWidth" : 6.4,"MaxGrooveDepth" : 15 , "UserSpacing" : true} },
{"Profile" : "LOUISIANA" , "ProfileMargin" : 10 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "MARYLAND" , "ProfileMargin" : 18 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "MIAMI" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 11 , "MaxEdge" : 0 , "IsFixedSpacing" : false , "UserSpacing" : true, "FixedSideMargin" : -0.5 } },
{"Profile" : "MICHIGAN" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : true},
{"Profile" : "MINNESOTA" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : true },
{"Profile" : "MISSISSIPPI" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "MISSOURI" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 20 , "MaxEdge" : 0 , "IsFixedSpacing" : false , "FixedSideMargin" : 0.01 } },
{"Profile" : "MONTANA" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 71 , "MaxEdge" : 75 , "IsFixedSpacing" : true} },
{"Profile" : "NEW YORK" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 85 , "MaxEdge" : 0 , "IsFixedSpacing" : false} },
{"Profile" : "NEWPORT" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 85 , "MaxEdge" : 0 , "IsFixedSpacing" : false} },
{"Profile" : "NORTH CAROLINA" , "ProfileMargin" : 18 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "OKLAHOMA" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 71 , "MaxEdge" : 75 , "IsFixedSpacing" : true} },
{"Profile" : "OREGON" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : true },
{"Profile" : "PENCIL" , "ProfileMargin" : 18 , "Frame" : true, "GlassFrame" : false },
{"Profile" : "PENNSYLVANIA" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 11 , "MaxEdge" : 0 , "IsFixedSpacing" : false , "UserSpacing" : true, "FixedSideMargin" : -0.5 } },
{"Profile" : "PRESTON" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false },
{"Profile" : "RHODE ISLAND" , "ProfileMargin" : 53 , "Frame" : true, "GlassFrame" : true},
{"Profile" : "SAN DIEGO" , "ProfileMargin" : 0 , "Frame" : false , "GlassFrame" : false , "VGrooves" : {"MaxScallopWidth" : 55, "MaxMaxScallopWidth" : 59 , "IsFixedSpacing" : false, "FlatWidth" : 3, "MinFlatWidth" : 3, "ScallopToolRad" : 66} },
{"Profile" : "TENNESSEE" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 12 , "MaxEdge" : 0 , "IsFixedSpacing" : false, "UserSpacing" : true} },
{"Profile" : "TEXAS" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false},
{"Profile" : "TURNBERRY" , "ProfileMargin" : 0 , "Frame" : false, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 22 , "MaxEdge" : 0 , "IsFixedSpacing" : false , "FixedSideMargin" : 13 } },
{"Profile" : "UTAH" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false},
{"Profile" : "WASHINGTON" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 71 , "MaxEdge" : 75 , "IsFixedSpacing" : true} },
{"Profile" : "WISCONSIN" , "ProfileMargin" : 60 , "Frame" : true, "GlassFrame" : false , "VGrooves" : {"MaxSpacing" : 71 , "MaxEdge" : 75 , "IsFixedSpacing" : true , "ExtendThroughFrame" : true} }
];

var HDFEdgeProfiles = [
{"Name" : "Aris Both Sides" , "Value" : "Aris Both" , "ImageClass" : "checkboxArisBoth"},
{"Name" : "R1.5 Face Only" , "Value" : "R1.5 Face" , "ImageClass" : "checkboxR1_5Face"},
{"Name" : "R1.5 Both Sides" , "Value" : "R1.5 Both" , "ImageClass" : "checkboxR1_5Both"},
{"Name" : "R3 Face Only" , "Value" : "R3 Face" , "ImageClass" : "checkboxR3Face"},
{"Name" : "R3 Both Sides" , "Value" : "R3 Both" , "ImageClass" : "checkboxR3Both"},
{"Name" : "R5 Face Only" , "Value" : "R5 Face" , "ImageClass" : "checkboxR5Face"},
{"Name" : "R5 Both Sides" , "Value" : "R5 Both" , "ImageClass" : "checkboxR5Both"},
{"Name" : "9.5mm Ogee" , "Value" : "9.5mm Ogee" , "ImageClass" : "checkbox95Ogee"},
{"Name" : "6.3mm Ogee" , "Value" : "6.3mm Ogee" , "ImageClass" : "checkbox63Ogee"},
{"Name" : "R1.5 Face Aris Back" , "Value" : "R1.5 Face Aris Back" , "ImageClass" : "checkboxR1_5FaceArisBack"}
];

/* var DescTypes = [
{ "Name" : "Door" , "EdgeLeft" : "1", "EdgeRight" : "1", "EdgeTop" : "1", "EdgeBot" : "1"},
{ "Name" : "Drawer Front" , "EdgeLeft" : "1", "EdgeRight" : "1", "EdgeTop" : "1", "EdgeBot" : "1"}, 
{ "Name" : "Panel" , "EdgeLeft" : "1", "EdgeRight" : "0", "EdgeTop" : "0", "EdgeBot" : "0"},
{ "Name" : "ToeKick" , "EdgeLeft" : "0", "EdgeRight" : "0", "EdgeTop" : "0", "EdgeBot" : "0"}  
];  */


/* function PopulateShortCutTypeIcons()
{
var SectionElem = document.getElementById("ShortCutIconsSection"); 

	for (var i = 0; i<PanelTypes.length; i++) 
	{
	var Icon = document.createElement("span");
	Icon.className = "ShortCutTypeIcons";
	Icon.title = PanelTypes[i].Name;
	Icon.style.backgroundImage = "url('data:image/png;base64,"+PanelTypes[i].Icon+"')";
	Icon.setAttribute("draggable", "true" );

	SectionElem.appendChild(Icon);	
	}
} */


//------------------------------------ CustomDropDown -------------------------------------



//------------------------------------ CustomDropDown End -------------------------------------


function insertline() {
var newline = document.createElement("div");
newline.id = "LineDiv"+counter;
newline.setAttribute("data-LineNumber",""+counter+"");
newline.setAttribute("style","position:relative;height:28px;z-index:2");
//newline.setAttribute("onmouseover","SelectLine(this.id);");

var LineNumber = document.createElement("input");
LineNumber.id = "LineNo"+counter ;
LineNumber.name = "LineNo"+counter;
LineNumber.value = counter;
//LineNumber.innerHTML = counter;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:35px;left:1px;text-align:center;color:black;background-color:rgb(241, 241, 241);"; LineNumber.setAttributeNode(StyleAtt); //
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; LineNumber.setAttributeNode(ClassAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";LineNumber.setAttributeNode(onmousedownAtt);
var TitleAtt = document.createAttribute("title"); TitleAtt.value="Sequential Line number"; LineNumber.setAttributeNode(TitleAtt);
var readonlyAtt = document.createAttribute("readonly"); LineNumber.setAttributeNode(readonlyAtt);


/* var PanelType = document.createElement("Select");
PanelType.id = "PanelType"+counter ;
PanelType.name = "PanelType"+counter ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:120px;left:38px;"; PanelType.setAttributeNode(StyleAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; PanelType.setAttributeNode(ClassAtt);
var ChangeAtt = document.createAttribute("onchange"); ChangeAtt.value="ChangePanelType(this.parentNode.id);ChangeBanding(this.parentNode.id);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);"; PanelType.setAttributeNode(ChangeAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";PanelType.setAttributeNode(onmousedownAtt);
var TitleAtt = document.createAttribute("title"); TitleAtt.value="Type of panel"; PanelType.setAttributeNode(TitleAtt); */
var PanelType = document.createElement("input");
PanelType.id = "PanelType"+counter;
PanelType.name = "PanelType"+counter;
PanelType.className = "Inputlines";
PanelType.value = 'Standard Panel';
PanelType.setAttribute("style","width:134px;left:38px;user-select: none;cursor:context-menu");
PanelType.setAttribute("data-AssocInputID","PanelType"+counter);
PanelType.setAttribute("data-ItemsList",PanelTypes);
PanelType.setAttribute("readonly","readonly");
PanelType.setAttribute("onmouseup","ShowCustomDropDown(this,PanelTypes);SelectLine(this.parentNode.id);");
PanelType.setAttribute("onchange","ChangePanelType(this.parentNode.id);ChangeBanding(this.parentNode.id);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);");
PanelType.setAttribute("title","Type of panel");

var PanelTypeDropButton = document.createElement("input");
PanelTypeDropButton.id = "PanelTypeDropButton"+counter;
PanelTypeDropButton.className = "Inputlines RightDropDownButton";
PanelTypeDropButton.type = "button";
PanelTypeDropButton.setAttribute("style","width:23px;left:172px;");
PanelTypeDropButton.setAttribute("onmouseup","ShowCustomDropDown(this,PanelTypes);SelectLine(this.parentNode.id);");
PanelTypeDropButton.setAttribute("data-AssocInputID","PanelType"+counter);


var Material = document.createElement("input");
Material.id = "Material"+counter ;
Material.name = "Material"+counter ;
Material.className = "Inputlines";
Material.setAttribute("style","width:193px;left:195px;font-size:0.75em;user-select: none;cursor:context-menu");
Material.setAttribute("data-AssocInputID","Material"+counter);
//Material.setAttribute("readonly","readonly");
Material.setAttribute("onmouseup","ShowCustomDropDown(this,BuildRelMaterialsList(this.parentNode.id));SelectLine(this.parentNode.id);");
Material.setAttribute("oninput","KeyDownShowCustomDropDown(this,BuildRelMaterialsList(this.parentNode.id));");
Material.setAttribute("onchange","CheckMaterial(this.parentNode.id);Calculations(this.parentNode.id);SelectLine(this.parentNode.id);");

//CheckSize(this.parentNode.id,this.parentNode.childNodes.item(5).id);CheckSize(this.parentNode.id,this.parentNode.childNodes.item(6).id);
var MaterialDropButton = document.createElement("input");
MaterialDropButton.id = "MaterialDropButton"+counter;
MaterialDropButton.className = "Inputlines RightDropDownButton";
MaterialDropButton.type = "button";
MaterialDropButton.setAttribute("style","width:23px;left:388px;");
MaterialDropButton.setAttribute("onmouseup","ShowCustomDropDown(this,BuildRelMaterialsList(this.parentNode.id));SelectLine(this.parentNode.id);");
MaterialDropButton.setAttribute("data-AssocInputID","Material"+counter);


var ItemQty = document.createElement("input");
ItemQty.id = "Qty"+counter;
ItemQty.name = "Qty"+counter;
ItemQty.value = 1 ;
if (detectMob() == true) {ItemQty.type = "number";} else {ItemQty.type = "text";}
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:40px;left:412px;"; ItemQty.setAttributeNode(StyleAtt);
var PatternAtt = document.createAttribute("pattern");  PatternAtt.value="[0-9]+"; ItemQty.setAttributeNode(PatternAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; ItemQty.setAttributeNode(ClassAtt);
var ChangeAtt = document.createAttribute("onchange"); ChangeAtt.value="IntegerOnly(this);Calculations(this.parentNode.id); "; ItemQty.setAttributeNode(ChangeAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";ItemQty.setAttributeNode(onmousedownAtt);
//var autocompleteATT = document.createAttribute("autocomplete"); autocompleteATT ="off"; ItemQty.setAttributeNode(autocompleteATT);
ItemQty.setAttribute("autocomplete","off");
ItemQty.setAttribute("onkeydown","ForceOnChangeOnEnter(this,event);");


var Description = document.createElement("input");
Description.id = "Description"+counter ;
Description.name = "Description"+counter ;
Description.className = "Inputlines";
Description.setAttribute("style","width:145px;left:454px;cursor:context-menu");
Description.setAttribute("data-AssocInputID","Description"+counter);
//Description.setAttribute("readonly","readonly");
Description.setAttribute("onmouseup","SelectLine(this.parentNode.id);HideDropDown(event,''); ");
Description.setAttribute("onchange","ChangeDesc(this.parentNode.id);ChangeBanding(this.parentNode.id);CheckIlegalChar(this);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);CheckForUserComments(this);");
Description.setAttribute("title","You can select from the dropdown box or free type your part name here");
Description.setAttribute("autocomplete","off");
Description.setAttribute("onkeydown","ForceOnChangeOnEnter(this,event);");

var DescriptionDropButton = document.createElement("input");
DescriptionDropButton.id = "DescriptionDropButton"+counter;
DescriptionDropButton.className = "Inputlines RightDropDownButton";
DescriptionDropButton.type = "button";
DescriptionDropButton.setAttribute("style","width:23px;left:599px;");
DescriptionDropButton.setAttribute("onmouseup","ShowCustomDropDown(this,BuildRelDescTypeList(this.parentNode.id));SelectLine(this.parentNode.id);");
DescriptionDropButton.setAttribute("data-AssocInputID","Description"+counter);

var ItemLength = document.createElement("input");
ItemLength.id = "Length"+counter;
ItemLength.name = "Length"+counter ;
if (detectMob() == true) {ItemLength.type = "number";} else {ItemLength.type = "text";}
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:47px;left:623px;"; ItemLength.setAttributeNode(StyleAtt);
var PatternAtt = document.createAttribute("pattern");  PatternAtt.value="[0-9]{2,4}[.][0-9]|[0-9]{2,4}"; ItemLength.setAttributeNode(PatternAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; ItemLength.setAttributeNode(ClassAtt);
var ChangeAtt = document.createAttribute("onchange"); ChangeAtt.value="allnumeric(this);CheckSize(this.parentNode.id,this.id);Calculations(this.parentNode.id);SelectLine(this.parentNode.id);"; ItemLength.setAttributeNode(ChangeAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";ItemLength.setAttributeNode(onmousedownAtt);
var TitleAtt = document.createAttribute("title"); TitleAtt.value="Must be a number";ItemLength.setAttributeNode(TitleAtt);
ItemLength.setAttribute("autocomplete","off");
ItemLength.setAttribute("onkeydown","ForceOnChangeOnEnter(this,event);");

var ItemWidth = document.createElement("input");
ItemWidth.id = "Width"+counter;
ItemWidth.name = "Width"+counter ;
if (detectMob() == true) {ItemWidth.type = "number";} else {ItemWidth.type = "text";}
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:47px;left:672px;"; ItemWidth.setAttributeNode(StyleAtt);
var PatternAtt = document.createAttribute("pattern");  PatternAtt.value="[0-9]{2,4}[.][0-9]|[0-9]{2,4}"; ItemWidth.setAttributeNode(PatternAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; ItemWidth.setAttributeNode(ClassAtt);
var ChangeAtt = document.createAttribute("onchange"); ChangeAtt.value="allnumeric(this);CheckSize(this.parentNode.id,this.id);Calculations(this.parentNode.id);SelectLine(this.parentNode.id);"; ItemWidth.setAttributeNode(ChangeAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";ItemWidth.setAttributeNode(onmousedownAtt);
var TitleAtt = document.createAttribute("title"); TitleAtt.value="Must be a number";ItemWidth.setAttributeNode(TitleAtt);
ItemWidth.setAttribute("autocomplete","off");
ItemWidth.setAttribute("onkeydown","ForceOnChangeOnEnter(this,event);");

var ItemLeftedge = document.createElement("input");
ItemLeftedge.id = "Leftedge"+counter ;
ItemLeftedge.name = "Leftedge"+counter ;
ItemLeftedge.type = "hidden" ;
ItemLeftedge.value = "None" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="left:726px;"; ItemLeftedge.setAttributeNode(StyleAtt);

var ItemLeftedgeTick = document.createElement("Div");
ItemLeftedgeTick.id = "LeftedgeTick"+counter ;
ItemLeftedgeTick.name = "LeftedgeTick"+counter ;
ItemLeftedgeTick.setAttribute("class", "checkboxBlank");
//ItemLeftedgeTick.setAttribute("data-EdgeCheckBox","");
ItemLeftedgeTick.setAttribute("style", "left:726px;");
ItemLeftedgeTick.setAttribute("onclick", "CustomCheckbox(this.id,event);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);");
//ItemLeftedgeTick.setAttribute("onmouseup", "DrawPreview('PreviewBox','PreviewBox2',this.parentNode.id);");
ItemLeftedgeTick.setAttribute("onmouseover", "ChangeCheckBoxCurser(this);");
ItemLeftedgeTick.title = "Hold down the Ctrl key while clicking to enable special colour edging.";

var ItemRightedge = document.createElement("input");
ItemRightedge.id = "Rightedge"+counter ;
ItemRightedge.name = "Rightedge"+counter ;
ItemRightedge.type = "hidden" ;
ItemRightedge.value = "None" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="left:756px;"; ItemRightedge.setAttributeNode(StyleAtt);

var ItemRightedgeTick = document.createElement("Div");
ItemRightedgeTick.id = "RightedgeTick"+counter ;
ItemRightedgeTick.name = "RightedgeTick"+counter ;
ItemRightedgeTick.setAttribute("class", "checkboxBlank");
ItemRightedgeTick.setAttribute("style", "left:756px;");
ItemRightedgeTick.setAttribute("onclick", "CustomCheckbox(this.id,event);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);");
ItemRightedgeTick.setAttribute("onmouseover", "ChangeCheckBoxCurser(this);");
ItemRightedgeTick.title = "Hold down the Ctrl key while clicking to enable special colour edging.";

var ItemTopedge = document.createElement("input");
ItemTopedge.id = "Topedge"+counter ;
ItemTopedge.name = "Topedge"+counter ;
ItemTopedge.type = "hidden" ;
ItemTopedge.value = "None" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="left:785px;"; ItemTopedge.setAttributeNode(StyleAtt);

var ItemTopedgeTick = document.createElement("Div");
ItemTopedgeTick.id = "TopedgeTick"+counter ;
ItemTopedgeTick.name = "TopedgeTick"+counter ;
ItemTopedgeTick.setAttribute("class", "checkboxBlank");
ItemTopedgeTick.setAttribute("style", "left:785px;");
ItemTopedgeTick.setAttribute("onclick", "CustomCheckbox(this.id,event);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);");
ItemTopedgeTick.setAttribute("onmouseover", "ChangeCheckBoxCurser(this);");
ItemTopedgeTick.title = "Hold down the Ctrl key while clicking to enable special colour edging.";

var ItemBottomedge = document.createElement("input");
ItemBottomedge.id = "Bottomedge"+counter ;
ItemBottomedge.name = "Bottomedge"+counter ;
ItemBottomedge.type = "hidden" ;
ItemBottomedge.value = "None" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="left:814px;"; ItemBottomedge.setAttributeNode(StyleAtt);


var ItemBottomedgeTick = document.createElement("Div");
ItemBottomedgeTick.id = "BottomedgeTick"+counter ;
ItemBottomedgeTick.name = "BottomedgeTick"+counter ;
ItemBottomedgeTick.setAttribute("class", "checkboxBlank");
ItemBottomedgeTick.setAttribute("style", "left:814px;");
ItemBottomedgeTick.setAttribute("onclick", "CustomCheckbox(this.id,event);SelectLine(this.parentNode.id);Calculations(this.parentNode.id);");
ItemBottomedgeTick.setAttribute("onmouseover", "ChangeCheckBoxCurser(this);");
ItemBottomedgeTick.title = "Hold down the Ctrl key while clicking to enable special colour edging.";


var UnitRef = document.createElement("input");
UnitRef.id = "UnitRef"+counter ;
UnitRef.name = "UnitRef"+counter ;
UnitRef.type = "text" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:60px;left:839px;"; UnitRef.setAttributeNode(StyleAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; UnitRef.setAttributeNode(ClassAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";UnitRef.setAttributeNode(onmousedownAtt);
var TitleAtt = document.createAttribute("title"); TitleAtt.value="This could be your cabinet number or name to help with sorting panels";UnitRef.setAttributeNode(TitleAtt);
var ChangeAtt = document.createAttribute("oninput"); ChangeAtt.value="CheckIlegalChar(this);"; UnitRef.setAttributeNode(ChangeAtt);

var AddINfo = document.createElement("input");
AddINfo.id = "AddInfo"+counter ;
AddINfo.name = "AddInfo"+counter ;
AddINfo.type = "text" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:120px;left:902px;"; AddINfo.setAttributeNode(StyleAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; AddINfo.setAttributeNode(ClassAtt);
var onmousedownAtt = document.createAttribute("onmouseup"); onmousedownAtt.value="SelectLine(this.parentNode.id);";AddINfo.setAttributeNode(onmousedownAtt); 
//AddINfo.setAttribute("onchange", "CheckForUserComments(this);");
//var onChangeAtt = document.createAttribute("onchange"); onChangeAtt .value="CheckForUserComments(this);"; AddINfo.setAttributeNode(onChangeAtt);
var TitleAtt = document.createAttribute("title"); TitleAtt.value="Any additional information that you might need to communicate to Sage Doors or yourself";AddINfo.setAttributeNode(TitleAtt);
//var PatternAtt = document.createAttribute("pattern");  PatternAtt.value="[abc]"; AddINfo.setAttributeNode(PatternAtt);
var ChangeAtt = document.createAttribute("oninput"); ChangeAtt.value="CheckIlegalChar(this);RestrictNumberChar(this,14);CheckForUserComments(this);"; AddINfo.setAttributeNode(ChangeAtt);





var LinePrice = document.createElement("input");
LinePrice.id = "LinePrice"+counter ;
LinePrice.name = "LinePrice"+counter ;
LinePrice.type = "text" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:60px;left:1025px;background-color:#F2F2F2;color:black;"; LinePrice.setAttributeNode(StyleAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; LinePrice.setAttributeNode(ClassAtt);
var readonlyAtt = document.createAttribute("readonly"); LinePrice.setAttributeNode(readonlyAtt);

var DeleteLine = document.createElement("input");
DeleteLine.id = "DeleteLine"+counter ;
DeleteLine.name = "DeleteLine"+counter ;
DeleteLine.type = "button" ;
DeleteLine.title = "Delete Line";
//DeleteLine.value = "Delete" ;
var StyleAtt = document.createAttribute("style"); StyleAtt.value="width:23px;left:1090px;position:absolute;margin:2px;height:23px;text-align: center;padding:1px;"; DeleteLine.setAttributeNode(StyleAtt);
var ClassAtt = document.createAttribute("class"); ClassAtt.value="DeleteLineButton"; DeleteLine.setAttributeNode(ClassAtt);
var onclickAtt = document.createAttribute("onclick"); onclickAtt.value="RemoveLine(this.id);"; DeleteLine.setAttributeNode(onclickAtt);

var CopyLine = document.createElement("input");
CopyLine.id = "CopyLine"+counter ;
CopyLine.name = "CopyLine"+counter ;
CopyLine.type = "button" ;
CopyLine.title = "Copy Line";
//CopyLine.value = "Copy" ;
CopyLine.setAttribute("style", "width:23px;left:1120px;position:absolute;margin:2px;height:23px;text-align: center;padding:1px;");
CopyLine.setAttribute("class", "CopyLineButton");
CopyLine.setAttribute("onclick", "CopyLine(this.parentNode.id);");
if (ShowCopyButton == false) {CopyLine.setAttribute("style", "visibility: hidden;");}


var EditLine = document.createElement("input");
EditLine.id = "EditLine"+counter ;
EditLine.name = "EditLine"+counter ;
EditLine.type = "button" ;
EditLine.title = "Open Part Editor";
//EditLine.value = "Edit" ;
if (ShowPartEditor == false) {EditLine.setAttribute("hidden","hidden");}
EditLine.setAttribute("style", "width:23px;left:1150px;position:absolute;margin:2px;height:23px;text-align: center;");
//EditLine.style.backgroundImage = "url('data:image/png;base64,""')";
EditLine.setAttribute("class", "EditLineButton");
EditLine.setAttribute("onclick", "SelectLine(this.parentNode.id);ShowPartEditWindow(this.parentNode);");





var ExtraPar = document.createElement("input");
ExtraPar.id = "ExtraPar"+counter ;
ExtraPar.name = "ExtraPar"+counter ;
ExtraPar.type = "text" ;
ExtraPar.setAttribute("class", "Inputlines");
//ExtraPar.setAttribute("style", "width:150px;left:1190px;position:absolute;margin:2px;height:23px;");
ExtraPar.setAttribute("style", "display:none;");
//ExtraPar.value = "Return#Full;TopFacWidth#58;LeftFacWidth#46;RigthFacWidth#46;GrainMatchGroup#0;GrainMatchOrder#0;";
//var StyleAtt = document.createAttribute("style"); StyleAtt.value="display:none;"; ExtraPar.setAttributeNode(StyleAtt);
//var ClassAtt = document.createAttribute("class"); ClassAtt.value="Inputlines"; ExtraPar.setAttributeNode(ClassAtt);
//var hiddenAtt = document.createAttribute("hidden"); ExtraPar.setAttributeNode(hiddenAtt);

var LineJSON = document.createElement("input");
LineJSON.id = "LineJSON"+counter ;
LineJSON.name = "LineJSON"+counter ;
LineJSON.type = "text" ;
LineJSON.value = '';
LineJSON.setAttribute("style", "display:none;");


var PNCPartID = document.createElement("input");
PNCPartID.id = "PNCPartID"+counter ;
PNCPartID.name = "PNCPartID"+counter ;
PNCPartID.type = "text" ;
PNCPartID.value = '';
PNCPartID.setAttribute("style", "display:none;");


newline.appendChild( PanelType );
newline.appendChild( PanelTypeDropButton );
newline.appendChild( Material );
newline.appendChild( MaterialDropButton );
newline.appendChild( ItemQty );
newline.appendChild( Description);
newline.appendChild( DescriptionDropButton );
newline.appendChild( ItemLength );
newline.appendChild( ItemWidth );
newline.appendChild( ItemLeftedge );
newline.appendChild( ItemRightedge );
newline.appendChild( ItemTopedge );
newline.appendChild( ItemBottomedge );
newline.appendChild( UnitRef );
newline.appendChild( AddINfo );
newline.appendChild( LinePrice );
newline.appendChild( DeleteLine );
newline.appendChild( ExtraPar );
newline.appendChild( LineNumber );
newline.appendChild( ItemLeftedgeTick );
newline.appendChild( ItemRightedgeTick );
newline.appendChild( ItemTopedgeTick );
newline.appendChild( ItemBottomedgeTick );
newline.appendChild( EditLine );
newline.appendChild( LineJSON );
newline.appendChild( CopyLine );
newline.appendChild( PNCPartID );

document.getElementById("Orderlines").appendChild(newline);	 document.getElementById("PanelType"+counter).focus(); counter++;

	if (counter > 2 )
	{
		/*Copy edging from previous line*/
		CopyCheckBoxValueFromPrevLine(ItemLeftedge,ItemLeftedgeTick,counter-2);
		CopyCheckBoxValueFromPrevLine(ItemRightedge,ItemRightedgeTick,counter-2);
		CopyCheckBoxValueFromPrevLine(ItemTopedge,ItemTopedgeTick,counter-2);
		CopyCheckBoxValueFromPrevLine(ItemBottomedge,ItemBottomedgeTick,counter-2);
		
		var LibPartID = FindItem(document.getElementById("Description"+(counter-2)).value,LibParts,"Name");
		var BlankJSONPart = true;
		
		/*Check if previous line has any operations or part shape*/
		if (document.getElementById("LineJSON"+(counter-2)).value != "")
		{
			var PrevLineJSON = JSON.parse(document.getElementById("LineJSON"+(counter-2)).value);
			if (PrevLineJSON.hasOwnProperty("Vectors") & PrevLineJSON.hasOwnProperty("Operations") )
			{
				if (PrevLineJSON.Vectors.length > 0 | PrevLineJSON.Operations.length > 0) {BlankJSONPart = false;}
			}
		}
		
		/*Copy the description from the previous line if it's not a library part and it has not operations and part shape*/
		if (document.getElementById("Description"+(counter-2)).value != "" & LibPartID == -1 & BlankJSONPart) 
		{ 
		Description.value = document.getElementById("Description"+(counter-2)).value;
		ChangeDesc(newline.id,true);
		}
		
		/*Copy the PanelType from the previous line if the PanelType is not blank*/
		if (document.getElementById("PanelType"+(counter-2)).value != "") 
		{
		PanelType.value = document.getElementById("PanelType"+(counter-2)).value;
	    SetPanelType(newline.id);
		}
		
		/*Copy the Material from the previous line if the Material is not blank*/
		if (document.getElementById("Material"+(counter-2)).value != "") 
		{
		Material.value = document.getElementById("Material"+(counter-2)).value;
		//CheckMaterial(newline.id);
		}


		/*Copy the previous lines operations, part shape & size if it's a library part*/
		var LibPartID = FindItem(Description.value,LibParts,"Name");
		//alert(LibPartID);
		if (LibPartID > -1 & PanelType.value != 'Builtup Panel')
		{
		PartJSON = JSON.parse(JSON.stringify(LibParts[LibPartID].JSON));
		ItemLength.value = document.getElementById("Length"+(counter-2)).value;
		ItemWidth.value = document.getElementById("Width"+(counter-2)).value;
		
			var ShapingOK = PanelTypes[FindItem(PanelType.value,PanelTypes,"Name")].PartShaping;
		
			/*Clear the new lines part shape if the PanelType doesn't allow part shaping*/
			if (!ShapingOK) 
			{	
			PartJSON.Vectors = [];
			LineJSON.value = JSON.stringify(PartJSON);
			}
			else 
			{LineJSON.value = JSON.stringify(LibParts[LibPartID].JSON);}
			
			SetBandTickBoxesForCustomShape(document.getElementById(newline.id));
		}

	}

//SelectLine(newline.id);	
} //end of InsertLine

function LoadExistLinesData()
{
	var LineNo = 0;
	var EdgeValue = 0;
	var EdgeIDName = '';
	var InvalidHDFEdges = false;
	
	if (ExistLinesData.hasOwnProperty("Address1")) {document.getElementById("Address").value=atob(ExistLinesData.Address1);}
	if (ExistLinesData.hasOwnProperty("City")) {document.getElementById("Cityinput").value=atob(ExistLinesData.City);}	
	if (ExistLinesData.hasOwnProperty("Address3")) {document.getElementById("Suberbinput").value=atob(ExistLinesData.Address3);}
	if (ExistLinesData.hasOwnProperty("PostCode")) {document.getElementById("PostCode").value=ExistLinesData.PostCode;}
	if (ExistLinesData.hasOwnProperty("OrderNotes")) {document.getElementById("SpecInstruct").value=atob(ExistLinesData.OrderNotes);}
	if (ExistLinesData.hasOwnProperty("OrderDesc")) {document.getElementById("JobDesc").value=atob(ExistLinesData.OrderDesc);}	
	if (ExistLinesData.hasOwnProperty("OrderRef")) {document.getElementById("YourRef").value=atob(ExistLinesData.OrderRef);}
	 
	if (ExistLinesData.hasOwnProperty("CollectContact")) {document.getElementById("CollectContact").value=ExistLinesData.CollectContact;}	
	if (ExistLinesData.hasOwnProperty("CollectNumber")) {document.getElementById("CollectContactNumber").value=ExistLinesData.CollectNumber;}
	if (ExistLinesData.hasOwnProperty("IsCollect")) {document.getElementById("ClientCollectCheck").checked=ExistLinesData.IsCollect;}

	if (ExistLinesData.hasOwnProperty("UploadedFileName")) 
	{
		var UpdoadFileNameElem = document.getElementById("UpdoadFileName");
		UpdoadFileNameElem.value = ExistLinesData.UploadedFileName;
		UpdoadFileNameElem.name = UpdoadFileNameElem.id; 
		SetLinesReadOnly();
	}
	if (ExistLinesData.hasOwnProperty("ProcFileName")) 
	{
		var ProcFileNameElem = document.getElementById("ProcFileName");
		ProcFileNameElem.value = ExistLinesData.ProcFileName;
		ProcFileNameElem.name = ProcFileNameElem.id;
	}	
	if (ExistLinesData.hasOwnProperty("OrderNumber")) 
	{
		var OrderNumberElem = document.getElementById("OrderNumber").name
		OrderNumberElem.value = ExistLinesData.OrderNumber;
		OrderNumberElem.name = OrderNumberElem.id;
	}
	
	HideShowAddressInputs();



	for (var i=0; i<ExistLinesData.PanelLines.length;i++) 
	{	
		InvalidHDFEdges = false;	
		LineNo++;	
		insertline();
		document.getElementById("selectedline").innerHTML = "LineDiv"+LineNo;

		document.getElementById("PanelType"+LineNo).value=ExistLinesData.PanelLines[i].PanelType;
		document.getElementById("Material"+LineNo).value=ExistLinesData.PanelLines[i].Material;
		document.getElementById("Description"+LineNo).value=atob(ExistLinesData.PanelLines[i].Description);
		document.getElementById("Qty"+LineNo).value=ExistLinesData.PanelLines[i].Qty;
		ChangeDesc("LineDiv"+LineNo,true,true);
		
		document.getElementById("Length"+LineNo).value=ExistLinesData.PanelLines[i].Length;
		document.getElementById("Width"+LineNo).value=ExistLinesData.PanelLines[i].Width;
		document.getElementById("UnitRef"+LineNo).value=ExistLinesData.PanelLines[i].UnitNo;
		document.getElementById("AddInfo"+LineNo).value=atob(ExistLinesData.PanelLines[i].AddInfo);
		document.getElementById("ExtraPar"+LineNo).value=ExistLinesData.PanelLines[i].ExtraParams;
		document.getElementById("PNCPartID"+LineNo).value=ExistLinesData.PanelLines[i].PNCPartID;

		var GrainMatchGroup = GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+LineNo).id);

		if (GrainMatchGroup > 0) {document.getElementById("AddInfo"+LineNo).placeholder = "Group " + GrainMatchGroup;}
		
		if (parseInt(ExistLinesData.PanelLines[i].PNCPartID) > 0) 
		{
		//document.getElementById("Material"+LineNo).setAttribute('disabled','disabled');
		document.getElementById("Qty"+LineNo).setAttribute('disabled','disabled');
		document.getElementById("Description"+LineNo).setAttribute('disabled','disabled');
		document.getElementById("Length"+LineNo).setAttribute('disabled','disabled');
		document.getElementById("Width"+LineNo).setAttribute('disabled','disabled');
		document.getElementById("UnitRef"+LineNo).setAttribute('disabled','disabled');
		document.getElementById("CopyLine"+LineNo).setAttribute('hidden','hidden');
		//document.getElementById("EditLine"+LineNo).setAttribute('hidden','hidden');
		}
		
		//ExistLinesData.PanelLines[i].PopupMsg
			
		if (ExistLinesData.PanelLines[i].JSON != "") 
		{
		
		PartJSON=PartJSON = ExistLinesData.PanelLines[i].JSON;
		ReOrientateVectors(false);
		document.getElementById("LineJSON"+LineNo).value=JSON.stringify(PartJSON);
		}
	
		for (var j=1; j<=4;j++) 
		{
			switch (j)
			{
			case 1 : EdgeValue = ExistLinesData.PanelLines[i].EdgeLeft; EdgeIDName = 'LeftedgeTick'; break;
			case 2 : EdgeValue = ExistLinesData.PanelLines[i].EdgeRight; EdgeIDName = 'RightedgeTick'; break;
			case 3 : EdgeValue = ExistLinesData.PanelLines[i].EdgeTop; EdgeIDName = 'TopedgeTick'; break;
			case 4 : EdgeValue = ExistLinesData.PanelLines[i].EdgeBot; EdgeIDName = 'BottomedgeTick'; break;
			}
			
			switch (EdgeValue)
			{
			case 1: EdgeCheckBoxValue ='Tick'; break;
			case 2: EdgeCheckBoxValue ='45Profile'; break;
			case 3: EdgeCheckBoxValue ='AngleEdge'; break;
			case 4: EdgeCheckBoxValue = 'SpecialEdge'; break;
			case 10: EdgeCheckBoxValue ='Aris Both Sides'; break;
			case 11: EdgeCheckBoxValue ='R1.5 Face Only'; break;
			case 12: EdgeCheckBoxValue ='R1.5 Both Sides'; break;
			case 13: EdgeCheckBoxValue ='R3 Face Only'; break;
			case 14: EdgeCheckBoxValue ='R3 Both Sides'; break;
			case 15: EdgeCheckBoxValue ='R5 Face Only'; break;
			case 16: EdgeCheckBoxValue ='R5 Both Sides'; break;
			case 17: EdgeCheckBoxValue ='9.5mm Ogee'; break;
			case 18: EdgeCheckBoxValue ='6.3mm Ogee'; break;
			case 19: EdgeCheckBoxValue ='R1.5 Face Aris Back'; break;
			default: EdgeCheckBoxValue ='None';		
			}	

			 ChangeCheckBoxValue(EdgeIDName+LineNo,EdgeCheckBoxValue);
		 
		 //if (LineNo == 7) {alert(EdgeIDName+" value="+EdgeCheckBoxValue);}
			
			if (ExistLinesData.PanelLines[i].Material.indexOf(HDFPrefix) > -1 & EdgeValue > 0 & EdgeValue < 10) {InvalidHDFEdges = true;}

			if (InvalidHDFEdges) {SwapOutStdEdgeType("LineDiv"+LineNo,LineNo,'ChangeOutHDFEdgesForMat("",'+parseInt(LineNo+1)+')');}
		}


	 SetPanelType("LineDiv"+LineNo);
	 Calculations("LineDiv"+LineNo);	
	}
	
	
	
	document.getElementById("Dispdate").value =	ExistLinesData.RequiredDate;	
}


function CheckForUserComments(Elem)  
{ 
//alert(Elem.id.search("Description")); 
	if (Elem.id.search("Description") > -1 & Elem.value != 'Glass Frame' | Elem.id.search("Description") == -1)
	{
		if(Elem.value.toUpperCase().search("FRAME") > -1 )  
		{
		popup("Writing 'Frame' here will not work if you want a glass frame. Please select 'Glass Frame' under the 'Type' dropdown instead.",200,350,1);  
		Elem.value = null;
		Elem.focus();  
		}
		if(Elem.value.toUpperCase().search("GLASS") > -1 )  
		{
		popup("Writing 'Glass' here will not work if you want a glass frame. Please select 'Glass Frame' under the 'Type' dropdown instead.",200,350,1);  
		Elem.value = null;
		Elem.focus();  
		}  
	}  

	if(Elem.value.toUpperCase().search("GRAIN") > -1 )  
	{
	popup("Writing 'Grain' here will not work if you want to grain match your parts. Please us the grain matching editor instead.",200,350,1);  
	Elem.value = null;
	Elem.focus();  
	}

}

/*function HDFGlassFramedAllowed(LineMaterial)
{
	var ProfileName = GetHDFProfileName(LineMaterial);
	var HHDItemIndex = FindItem(ProfileName,HDFDoorSpecData,'Profile');
	
	if (HHDItemIndex > -1) {return HDFDoorSpecData[HHDItemIndex].GlassFrame}
	else {return false}
}*/

function BuildRelMaterialsList(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");		
var PanelType = document.getElementById("PanelType"+LineNumber).value;
var PNCPartID = document.getElementById("PNCPartID"+LineNumber).value;
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var FiltMatList	= [];


	for (var i=0; i<Materials.length;i++) 
	{
		if (Materials[i].GlassFrame != 'Only Glass Frame' | PanelType == 'Glass Frame')
		{
			var AllowThickness = true;

			if (PNCPartID > 0) /*Only allow selection of same material family*/
			{
				var MatThick = GetMatThickFromName(Materials[i].Name);
				var ExistMatThick = GetMatThickFromName(itemMaterial);
				if (MatThick <= ExistMatThick-1 | MatThick >= ExistMatThick+1)
				{ AllowThickness = false;}
			}
	
			if (AllowThickness)
			{
				switch (PanelType)
				{
					case 'Profile Handle' : 
							if (Materials[i].NoProfileHandle != 'Yes' & Materials[i].Name.indexOf("36") == -1 & Materials[i].Name.indexOf("60") == -1 )	
							{ FiltMatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+"" }); }
							break;
					case 'Glass Frame' : 
							if (Materials[i].GlassFrame == 'Only Glass Frame' | Materials[i].GlassFrame == '') // && Materials[i].Name.indexOf('(POCKET BACK)') == -1 
							{ FiltMatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+"" }); }
							break;
					case 'Optidoor' :
							if (Materials[i].Name.indexOf(HDFPrefix) > -1)
							{ FiltMatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+"" }); }
							break;

		
					default : FiltMatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+"" });
				}
			}
	
		}		
	}
	return FiltMatList

}

function CheckMaterial(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");	
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var PanelType = document.getElementById("PanelType"+LineNumber).value;
var MatIndex = FindItem(itemMaterial,Materials,"Name");

//if (PopUpMessage != '') { popup(PopUpMessage,150,350,1); }
//alert(LeadTimeString);NonStockLeadTime.toString()
			//alert(typeof Materials[FindItem(itemMaterial,Materials,"Name")].Grained);
	if (MatIndex > -1)
	{
		var PopUpMessage = Materials[MatIndex].PopupMessage;
		
		if( Materials[MatIndex].Grained == 'True') {var IsGrained = true;} else {var IsGrained = false;}
		
		if ( !IsGrained ) {RemoveGrainMatchParams(LineDivID);}

		if (itemMaterial.indexOf("36") > -1 | itemMaterial.indexOf("60") > -1) //Is a builtup panel
		{ 
			if (PanelType != 'Builtup Panel') {document.getElementById("PanelType"+LineNumber).value = 'Builtup Panel'; document.getElementById("PanelType"+LineNumber).onchange();} 
		}
		else
		{
			if (PanelType == 'Builtup Panel') 
			{
			document.getElementById("PanelType"+LineNumber).value = 'Standard Panel'; 
			document.getElementById("Description"+LineNumber).value = '';
			document.getElementById("PanelType"+LineNumber).onchange();
			} 
		}

		if (itemMaterial.indexOf(HDFPrefix) > -1 ) 
		{
			if (PanelType == 'Standard Panel') {document.getElementById("PanelType"+LineNumber).value = 'Optidoor'; document.getElementById("PanelType"+LineNumber).onchange();} 
		}
		else
		{
			if (PanelType == 'Optidoor') 
			{
			document.getElementById("PanelType"+LineNumber).value = 'Standard Panel'; 
			document.getElementById("PanelType"+LineNumber).onchange();
			} 
		}
		
		

		if (itemMaterial.indexOf("NON-STOCK") > -1) 
		{
		//popup("Please note that "+NonStockLeadTime.toString()+" working days will need to be allowed for ordering in Non Stock colours",150,350,1);
			if (PanelType == 'Profile Handle') {popup("Please note that some Non Stock colours are not available with mitre handles. Please call us to check first!",150,350,1);}
		}
		else if (PopUpMessage != '') { popup(PopUpMessage,150,350,1); }
		
		CheckSize(LineDivID,"Length"+LineNumber);
		CheckSize(LineDivID,"Width"+LineNumber);
		
		/*Check for banding changes on material change*/
		SwapOutStdEdgeType(LineDivID,LineNumber,'');	
	}
	else
	{
		for (var i = 0; i<Materials.length; i++) 
		{
			if (Materials[i].Name.toUpperCase().startsWith(itemMaterial.toUpperCase()) ) 
			{
			document.getElementById("Material"+LineNumber).value = Materials[i].Name;
			break;
			}
			
			if (i == Materials.length-1) {document.getElementById("Material"+LineNumber).value = "";}
		}
	}
}

function SwapOutStdEdgeType(LineDivID,LineNumber,CallFuncWithArg)
{
	var edgeTickNode;
	var ImageClassIndex;
	var TickEdgeType = '';

	
	for (var r = 1; r<=4; r++) 
	{
		switch(r)
		{
		case 1 : edgeTickNode = document.getElementById("LeftedgeTick"+LineNumber); break;
		case 2 : edgeTickNode = document.getElementById("RightedgeTick"+LineNumber); break;
		case 3 : edgeTickNode = document.getElementById("TopedgeTick"+LineNumber); break;
		case 4 : edgeTickNode = document.getElementById("BottomedgeTick"+LineNumber); break;
		}
		
		if (edgeTickNode.className != "checkboxBlank" & TickEdgeType == '') {TickEdgeType = GetStdEdgeType(LineDivID,CallFuncWithArg);}
		
		ImageClassIndex = FindItem(edgeTickNode.className,HDFEdgeProfiles,"ImageClass");

		if ((TickEdgeType == 'Tick' | TickEdgeType == 'SpecialEdge' ) & ImageClassIndex > -1 
			| TickEdgeType != 'Tick' & ImageClassIndex == -1 & (edgeTickNode.className == "checkboxTick" | edgeTickNode.className == "checkboxSpecial")) {ChangeCheckBoxValue(edgeTickNode.id,TickEdgeType);}
	}
	
	//alert(TickEdgeType + " - " + ImageClassIndex);
}

function CopyCheckBoxValueFromPrevLine(ItemEdge,AssocEdgeTick,PrevLineNumber)
{
var LineDiv  = document.getElementById(ItemEdge.id).parentNode;
var LineNumber = LineDiv.getAttribute("data-LineNumber");

var EdgeName = /[^1-9]+/.exec(ItemEdge.id);

ItemEdge.value = document.getElementById(EdgeName+PrevLineNumber).value;
AssocEdgeTick.setAttribute("class",document.getElementById(EdgeName+"Tick"+PrevLineNumber).className);

if (document.getElementById(EdgeName+"Tick"+PrevLineNumber).getAttribute("disabled")) {DisableCustomCheckbox(AssocEdgeTick);} else {EnableCustomCheckbox(AssocEdgeTick);}	

}

function GetNextHDFEdgeProfileType(CurrentClass)
{
var HDGEdgeIndex = FindItem(CurrentClass,HDFEdgeProfiles,"ImageClass");
	if (HDGEdgeIndex < HDFEdgeProfiles.length-1) {return HDFEdgeProfiles[HDGEdgeIndex+1].Name;} else {return HDFEdgeProfiles[0].Name;}
}

function CustomCheckbox(CheckBoxId,e)
{	
var LineDiv  = document.getElementById(CheckBoxId).parentNode;
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var CheckBoxClass = document.getElementById(CheckBoxId).className;
var PNCPartID = parseInt(document.getElementById("PNCPartID"+LineNumber).value);
var WasChanged = false;
		//alert(LineJSON);

	//else {PartJSON = {"Operations" :[] , "Vectors" :[]}}
	//alert(LineJSON);
	if (itemMaterial.indexOf(HDFPrefix) > -1 ) {var IsHDFMaterial = true} else {var IsHDFMaterial = false}
	
	if (document.getElementById("ToggleAngleEdgesCheck").checked) {var ToggleAngleEdges = true;} else {var ToggleAngleEdges = false;}


	if (document.getElementById(CheckBoxId).getAttribute("disabled") != 'disabled')
	{	
		SetEdgingOnVectors(LineDiv.id,CheckBoxId,CheckBoxClass);
		
		var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
		if (LineJSON != '') {PartJSON = JSON.parse(LineJSON);}


		var TickEdgeType = GetStdEdgeType(LineDiv.id,"");

		
		if (e.ctrlKey) 
		{
			if (IsHDFMaterial & TickEdgeType != 'Tick') {TickEdgeType = GetNextHDFEdgeProfileType(CheckBoxClass);}
			if (!IsHDFMaterial & CheckBoxClass != 'checkboxSpecial') {TickEdgeType = 'SpecialEdge';}
		}
		
		switch(CheckBoxClass)
		{
			case "checkboxBlank": WasChanged = ChangeCheckBoxValue(CheckBoxId,TickEdgeType);
				break;
			case "checkboxTick":
				if (e.ctrlKey) {WasChanged = ChangeCheckBoxValue(CheckBoxId,TickEdgeType);}
				else if(PanelType == 'Angle Edge' | ToggleAngleEdges) {WasChanged = ChangeCheckBoxValue(CheckBoxId,'AngleEdge');}
				else if (PanelType == 'Profile Handle') {WasChanged = ChangeCheckBoxValue(CheckBoxId,'45Profile');}
				else {WasChanged = ChangeCheckBoxValue(CheckBoxId,'None');}	
				break;
			case "checkboxSpecial": 
				if (e.ctrlKey) {WasChanged = ChangeCheckBoxValue(CheckBoxId,TickEdgeType);}
				else {WasChanged = ChangeCheckBoxValue(CheckBoxId,'None');}
				break;
			case "checkbox45Profile": WasChanged = ChangeCheckBoxValue(CheckBoxId,'None');	
				break;
			case "checkboxAngleEdge": 
					//if (ToggleAngleEdges) {ChangeCheckBoxValue(CheckBoxId,'AngleEdge');}
					if (PanelType == 'Profile Handle') {WasChanged = ChangeCheckBoxValue(CheckBoxId,'45Profile');}
					else {WasChanged = ChangeCheckBoxValue(CheckBoxId,'None');}	
					break;
			default : 	
				if(PanelType == 'Angle Edge' | ToggleAngleEdges) {WasChanged = ChangeCheckBoxValue(CheckBoxId,'AngleEdge');}
				else if (PanelType == 'Profile Handle') {WasChanged = ChangeCheckBoxValue(CheckBoxId,'45Profile');}
				else if (e.ctrlKey) {WasChanged = ChangeCheckBoxValue(CheckBoxId,TickEdgeType);}
				else {WasChanged = ChangeCheckBoxValue(CheckBoxId,'None');}		
		}
		
		if (PanelType == 'Angle Edge' | ToggleAngleEdges) {SetSpecialTypeInputs(LineDiv.id);};

		if (PNCPartID > 0 & PartJSON.hasOwnProperty("Vectors") & WasChanged) 
		{
			//if (PartJSON.Vectors.length > 0) {
			delete PartJSON.PNCVectors; document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
			//alert(document.getElementById("LineJSON"+LineNumber).value);
		}		
	}
		
}


function ChangeCheckBoxValue(ItemID,CheckType)
{
var LineDiv  = document.getElementById(ItemID).parentNode;
var LineNumber = LineDiv.getAttribute("data-LineNumber");	
//var LineChildNodes = document.getElementById(ItemID).parentNode.childNodes;
//var LineNumber = document.getElementById(ItemID).parentNode;
var BandChangeOK = true;
var SetEdgeType = '';

var LeftedgeNode = document.getElementById("Leftedge"+LineNumber);
var RightedgeNode = document.getElementById("Rightedge"+LineNumber);
var TopedgeNode = document.getElementById("Topedge"+LineNumber);
var BotedgeNode = document.getElementById("Bottomedge"+LineNumber);

var LeftedgeTickNode = document.getElementById("LeftedgeTick"+LineNumber);
var RightedgeTickNode = document.getElementById("RightedgeTick"+LineNumber);
var TopedgeTickNode = document.getElementById("TopedgeTick"+LineNumber);
var BottomedgeTickNode = document.getElementById("BottomedgeTick"+LineNumber);

var PNCPartID = parseInt(document.getElementById("PNCPartID"+LineNumber).value);

	if ( ItemID.match('Left') != null ) { var WhichEdge = 'Left'}
	if ( ItemID.match('Right') != null ) { var WhichEdge = 'Right'}
	if ( ItemID.match('Top') != null ) { var WhichEdge = 'Top'}
	if ( ItemID.match('Bottom') != null ) { var WhichEdge = 'Bottom'}
	
	//alert(ItemID + " - " + CheckType);

	if (LeftedgeNode.value != 'AngleEdge' & RightedgeNode.value != 'AngleEdge' & TopedgeNode.value != 'AngleEdge' & BotedgeNode.value != 'AngleEdge')
	{document.getElementById("PartParmsFlowDiv").style.maxHeight = "100%";}

	
	var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
	
	if (LineJSON != '' & PNCPartID == 0) 
	{
	if (CheckBandAllowed(LineDiv,WhichEdge,CheckType) == false) {BandChangeOK = false; popup("Invalid edge! Operations too close to Edgebanding!",120,350,1);}
	}

if (BandChangeOK == true)
{
	document.getElementById(ItemID).title = "Hold down the Ctrl key while clicking to enable special colour edging.";	

	switch(CheckType)
	{
	case 'Tick':
		//if (document.getElementById(ItemID).getAttribute("disabled") != "disabled")
		//{
		document.getElementById(ItemID).className = "checkboxTick";	
		SetEdgeType = 'LaserEdge';

		if ( TopedgeNode.value == 'SpecialEdge') { TopedgeNode.value = SetEdgeType; TopedgeTickNode.className = "checkboxTick";}
		if ( BotedgeNode.value == 'SpecialEdge') { BotedgeNode.value = SetEdgeType; BottomedgeTickNode.className = "checkboxTick";}
		if ( LeftedgeNode.value == 'SpecialEdge') { LeftedgeNode.value = SetEdgeType; LeftedgeTickNode.className = "checkboxTick";}
		if ( RightedgeNode.value == 'SpecialEdge') { RightedgeNode.value = SetEdgeType; RightedgeTickNode.className = "checkboxTick";}		
		//}
		break;
	case 'SpecialEdge':
			document.getElementById(ItemID).className = "checkboxSpecial";	
			SetEdgeType = 'SpecialEdge';

			if ( TopedgeNode.value == 'LaserEdge') { TopedgeNode.value = SetEdgeType; TopedgeTickNode.className = "checkboxSpecial";}
			if ( BotedgeNode.value == 'LaserEdge') { BotedgeNode.value = SetEdgeType; BottomedgeTickNode.className = "checkboxSpecial";}
			if ( LeftedgeNode.value == 'LaserEdge') { LeftedgeNode.value = SetEdgeType; LeftedgeTickNode.className = "checkboxSpecial";}
			if ( RightedgeNode.value == 'LaserEdge') { RightedgeNode.value = SetEdgeType; RightedgeTickNode.className = "checkboxSpecial";}

			break;
	case 'None':
		document.getElementById(ItemID).className = "checkboxBlank";
		SetEdgeType = 'None';
		break;
		
	case 'AngleEdge':	
		document.getElementById("PartParmsFlowDiv").style.maxHeight = "250px";
	
		document.getElementById(ItemID).className = "checkboxAngleEdge";
		SetEdgeType = 'AngleEdge';
		break;
		
	case '45Profile':
		//if (document.getElementById(ItemID).getAttribute("disabled") != "disabled")
		//{
			document.getElementById(ItemID).className = "checkbox45Profile";
			SetEdgeType = '45Profile';
			
			var TickEdgeType = GetStdEdgeType(LineDiv.id,"");
			var HDGEdgeIndex = FindItem(TickEdgeType,HDFEdgeProfiles,"Name");
			var OtherEdgeType = 'LaserEdge';
			var OtherClass = 'checkboxTick';
			if (HDGEdgeIndex > -1) 
			{
			var OtherEdgeType = HDFEdgeProfiles[HDGEdgeIndex].Value;
			var OtherClass = HDFEdgeProfiles[HDGEdgeIndex].ImageClass;		
			}
			
			if ( WhichEdge == 'Left' | WhichEdge == 'Right')
			{		
	
				if ( TopedgeNode.value == '45Profile') { TopedgeNode.value = OtherEdgeType; TopedgeTickNode.className = OtherClass;}
				if ( BotedgeNode.value == '45Profile') { BotedgeNode.value = OtherEdgeType; BottomedgeTickNode.className = OtherClass;} 
			}
			if ( WhichEdge == 'Top' | WhichEdge == 'Bottom')
			{

				if ( LeftedgeNode.value == '45Profile') { LeftedgeNode.value = OtherEdgeType; LeftedgeTickNode.className = OtherClass;}
				if ( RightedgeNode.value == '45Profile') { RightedgeNode.value = OtherEdgeType; RightedgeTickNode.className = OtherClass;}
			}	
		//}
		break;
	default :
		var HDGEdgeIndex = FindItem(CheckType,HDFEdgeProfiles,"Name");
		document.getElementById(ItemID).className = HDFEdgeProfiles[HDGEdgeIndex].ImageClass;
		SetEdgeType	= HDFEdgeProfiles[HDGEdgeIndex].Value;
		document.getElementById(ItemID).title = "Hold down the Ctrl key while clicking to cycle through edge profile options.";		
	} //end of case
	
	switch(WhichEdge)
	{
	case 'Left': LeftedgeNode.value = SetEdgeType; break;
	case 'Right': RightedgeNode.value = SetEdgeType; break;
	case 'Top': TopedgeNode.value = SetEdgeType; break;
	case 'Bottom': BotedgeNode.value = SetEdgeType; break;	
	}

	return true;
}

}


function ChangeCheckBoxCurser(CheckBox)
{
	//alert(CheckBox.getAttribute("disabled"));
	if (CheckBox.getAttribute("disabled") == "disabled") {CheckBox.style.cursor='not-allowed';} else {CheckBox.style.cursor='pointer';}
}

function DisableCustomCheckbox(CheckBox)
{
CheckBox.style.opacity = "0.5";
CheckBox.setAttribute("disabled","disabled")	
}

function EnableCustomCheckbox(CheckBox)
{
CheckBox.style.opacity = "1";
CheckBox.removeAttribute("disabled");
}


function CheckSize(LineDivID,ItemID)
{
var ValueNode = document.getElementById(ItemID);
var SheetMargin = 0;
var MaxSize = 0;
var InputValue = parseFloat(ValueNode.value);
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var PanelType = document.getElementById("PanelType"+LineNumber).value;
var PNCPartID = document.getElementById("PNCPartID"+LineNumber).value;

 if (itemMaterial != 0 )
 {

	var LengthNode = parseFloat(document.getElementById("Length"+LineNumber).value);
	var WidthNode = parseFloat(document.getElementById("Width"+LineNumber).value);
	var SheetSize = Materials[FindItem(itemMaterial,Materials,"Name")].SheetArea;
	var SheetLength = Materials[FindItem(itemMaterial,Materials,"Name")].SheetLength;
	var SheetWidth =  Materials[FindItem(itemMaterial,Materials,"Name")].SheetWidth;
	//alert(SheetSize);
	if (itemMaterial.indexOf("ACRYGLOSS") > -1 | itemMaterial.indexOf("ACRYMATTE") > -1 | itemMaterial.indexOf("TIMBALOOK") > -1 | itemMaterial.indexOf("SOFT TOUCH") > -1 | itemMaterial.indexOf("LOOKCRETE") > -1 | itemMaterial.indexOf("TEXTAURA") > -1  ) { SheetMargin = 12;} else { SheetMargin = 4.5;}
	//if (SheetSize == 2.9768) { SheetMargin = 4.5}
	if ( Materials[FindItem(itemMaterial,Materials,"Name")].Grained == "True" ) {var IsGrained = true;} else {var IsGrained = false;}	
	
	if (PanelType == 'Profile Handle' & IsGrained) { var ExtraLength = 60;} else {var ExtraLength = 0;}
	
	var MaxSheetLength = SheetLength-ExtraLength-(SheetMargin*2)-1;
	var MaxSheetWidth = SheetWidth-ExtraLength-(SheetMargin*2)-1;

	
	
	PartLength = LengthNode;
	PartWidth = WidthNode;

	var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
	if (LineJSON != '') 
	{
	PartJSON = JSON.parse(LineJSON);
	RecalcAllPartObj();
	document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
	}
	

	var ExtraParamNode = document.getElementById("ExtraPar"+LineNumber);
	var Shortstring = ExtraParamNode.value.slice(ExtraParamNode.value.indexOf("Return"),ExtraParamNode.value.length);
	var CarPos = Shortstring.indexOf(";"); 
	var ReturnValue = Shortstring.slice(7,CarPos)

	if (PanelType == 'Builtup Panel' )
	{ 
		if (ReturnValue =="400")
		{  if (parseFloat(ValueNode.value) < 500 ) { popup("Panel is too small! This value must be greater than 499mm.",150,350,1); ValueNode.value = "500" } }
		if (ReturnValue =="100")
		{  if (parseFloat(ValueNode.value) < 200 ) { popup("Panel is too small! This value must be greater than 199mm.",150,350,1); ValueNode.value = "200" } }

	}


	if (parseFloat(ValueNode.value) <= 5 ) { popup("Panel is too small! This value must be greater than 5mm.",150,350,1); ValueNode.value = "60" }
	
	//alert(SheetLength);
	
	if (ValueNode.id.indexOf("Length") > -1 & IsGrained == true & InputValue > MaxSheetLength | 
		ValueNode.id.indexOf("Length") > -1 & IsGrained == false & InputValue > MaxSheetLength |
		ValueNode.id.indexOf("Width") > -1 & IsGrained == false & InputValue > MaxSheetLength )
	{
	MaxSize = MaxSheetLength;		
	popup("Panel is too large for sheet! This value must be less than "+parseFloat(MaxSize)+"mm.",150,350,1);
	if (PNCPartID == 0) {ValueNode.value = MaxSize;}
	}
	
	if (ValueNode.id.indexOf("Length") > -1 & IsGrained == false & WidthNode > MaxSheetWidth & InputValue > MaxSheetWidth | 
		ValueNode.id.indexOf("Width") > -1 & IsGrained == false & LengthNode > MaxSheetWidth & InputValue > MaxSheetWidth | 
		ValueNode.id.indexOf("Width") > -1 & IsGrained == true & InputValue > MaxSheetWidth) 
	{
		MaxSize = MaxSheetWidth;	
		popup("Panel is too large for sheet! This value must be less than "+parseFloat(MaxSize)+"mm.",150,350,1);
		if (PNCPartID == 0) {ValueNode.value = MaxSize;}
	}



 } else { popup("You must select a material first!",150,350,1); ValueNode.value = ""; document.getElementById("Material"+LineNumber).focus(); }
} // end of CHeckSize


function findinput(itemid) 
{
var LineNumber = document.getElementById(itemid).parentNode.getAttribute("data-LineNumber");	
return document.getElementById("Description"+LineNumber).id; 
}

function SetLinesReadOnly()
{
var OrderLines = document.getElementById("Orderlines").children;	

 	for (var r = 0; r<OrderLines.length; r++) 
	{ 
	//alert(OrderLines[r].children.length);	
	 	 for (var i = 0; i<OrderLines[r].children.length; i++) 
		{ 	
		OrderLines[r].children[i].readOnly = true;
			if (OrderLines[r].children[i].id.indexOf("edgeTick") > -1) {DisableCustomCheckbox(OrderLines[r].children[i]);}
			
		}	 	 
	} 
	
}

function RemoveLine(DelButtonID)
{
var MainDiv = document.getElementById(DelButtonID).parentNode.parentNode;
var LineDiv = document.getElementById(DelButtonID).parentNode;
var LineNumber = parseFloat(LineDiv.getAttribute("data-LineNumber"));
//var LineNumber = parseFloat(document.getElementById(DelButtonID).parentNode.id.slice(7,document.getElementById(DelButtonID).parentNode.id.length));


	if (document.getElementById(DelButtonID).readOnly == false | document.getElementById(DelButtonID).readOnly == undefined)
	{
	MainDiv.removeChild(LineDiv);
	LastSelectedLineID = "";
//alert(counter);

		for (var i=LineNumber+1; i<counter;i++) 
		{

		var ChildQty = parseFloat(document.getElementById("LineDiv"+i).children.length);
		var patt1=/[^1-9]+/i;

	//alert(ChildQty);
			for (var x=0; x<ChildQty;x++) 
			{
			var LineChild = document.getElementById("LineDiv"+i).children[x];	
			var OldId = LineChild.id;
			var OldName = LineChild.name;

			
				var NewID = patt1.exec(OldId)+(i-1);
	//alert(NewID);				
				LineChild.id = NewID;
				if ( LineChild.id.indexOf('LineNo') > -1) { LineChild.value = i-1; }

				if (LineChild.name != undefined)
				{
					var NewName = LineChild.name.slice(0,LineChild.name.length-1)+(i-1); 
					if ( OldName != undefined & OldName != '') 
					{
					var NewName = patt1.exec(OldName)+(i-1);
					LineChild.name = NewName;  
					} 
				}
				
				if (LineChild.hasAttribute("data-AssocInputID") )
				{
					var AssocInputIDAtt = LineChild.getAttribute("data-AssocInputID");
					//alert(patt1.exec(AssocInputIDAtt)+(i-1) + " - " + OldName);
					LineChild.setAttribute("data-AssocInputID",patt1.exec(AssocInputIDAtt)+(i-1));
				}

			}
		document.getElementById("LineDiv"+i).setAttribute("data-LineNumber",i-1);
		document.getElementById("LineDiv"+i).id = "LineDiv"+(i-1);
		}

		counter--

		if (MainDiv.childNodes.length > 1) {Calculations(MainDiv.childNodes.item(1).id);}
	}	

} // end of RemoveLine

function CopyLine(LineDivID)
{
//insertline();	

var LineDiv = document.getElementById(LineDivID);

	if (LineDiv.readOnly == false | LineDiv.readOnly == undefined)
	{	
	//var NewLineDive = document.getElementById('LineDiv'+(counter-1));
	var LineNumber = parseFloat(LineDiv.getAttribute("data-LineNumber"));
	var NewLineDive = LineDiv.cloneNode(true);


		var patt1=/[^1-9]+/i;
		var patt2=/[1-9]+/i;
		counter++
		document.getElementById("Orderlines").appendChild(NewLineDive);

			for (var x=0; x<NewLineDive.children.length;x++) 
			{
			var OldId = NewLineDive.children[x].id;
			var OldName = NewLineDive.children[x].name;
	//alert(patt2.exec(OldId));

				var NewID = patt1.exec(OldId)+(counter-1); 			
				NewLineDive.children[x].id = NewID;
				//if ( NewLineDive.children[x].name == 'LineNo'+patt2.exec(OldId)+'' ) { NewLineDive.children[x].value = counter-1; }
				if ( NewLineDive.children[x].id.indexOf("LineNo") > -1 ) { NewLineDive.children[x].value = counter-1; }

				//var NewName = NewLineDive.children[x].name.slice(0,NewLineDive.children[x].name.length-1)+(counter-1);
				//alert(OldName);
				if ( OldName != undefined & OldName != '') 
				{
				var NewName = patt1.exec(OldName)+(counter-1);
				NewLineDive.children[x].name = NewName;  
				} 
				
				if (NewLineDive.children[x].hasAttribute("data-AssocInputID") )
				{
					var AssocInputIDAtt = NewLineDive.children[x].getAttribute("data-AssocInputID");
					//alert(patt1.exec(AssocInputIDAtt)+(i-1) + " - " + OldName);
					NewLineDive.children[x].setAttribute("data-AssocInputID",patt1.exec(AssocInputIDAtt)+(counter-1));
				}
			}
		NewLineDive.setAttribute("data-LineNumber",counter-1);
		NewLineDive.id = "LineDiv"+(counter-1);
		NewLineDive.style.backgroundColor = "initial";
		NewLineDive.scrollIntoView(); 
		

		//RenameChildNodes(NewLineDive,i);
		
		SetPanelType('LineDiv'+(counter-1))
		SelectLine('LineDiv'+(counter-1))
		RemoveGrainMatchParams(LineDivID)

		
	//Calculations(MainDiv.childNodes.item(1).id);
	Calculations(NewLineDive.id); 
	}

}

function ChangeDesc(LineDivID,OnlyChangeIcon,DontUpdateJSON)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var DescNode = document.getElementById("Description"+LineNumber);
var PanelType = document.getElementById("PanelType"+LineNumber).value;	
var TypeID = FindItem(PanelType,PanelTypes,"Name");
var LibPartID = -1;
var DescTypeID = -1;
var ArrIndex = -1;
var LitPartListArr;

	var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
	if (LineJSON != '') {PartJSON = JSON.parse(LineJSON);} else {PartJSON = {"Operations" :[] , "Vectors" :[] , "Parameters" : [] };} 


	if (PanelTypes[TypeID].hasOwnProperty("Parts") ) {var TypePartID = FindItem(DescNode.value,PanelTypes[TypeID].Parts,"Name");}
	else {var TypePartID = -1;}

	
	if (TypePartID > -1) {var PartListArr = PanelTypes[TypeID].Parts;LitPartListArr = 'PanelTypes['+TypeID+'].Parts';ArrIndex = TypePartID; }
	else
	{
		DescTypeID = FindItem(DescNode.value,DescTypes,"Name");
		if (DescTypeID > -1) {var PartListArr = DescTypes;LitPartListArr = 'DescTypes';ArrIndex = DescTypeID; }
		else
		{
			LibPartID = FindItem(DescNode.value,LibParts,"Name");
			if (LibPartID > -1) {var PartListArr = LibParts;LitPartListArr = 'LibParts';ArrIndex = LibPartID; }
		}
	}
	

	if (ArrIndex > -1)
	{
	var IconBase64Text = "";
	var LengthNode = document.getElementById("Length"+LineNumber);
	var WidthNode = document.getElementById("Width"+LineNumber);

		if (DontUpdateJSON == null | DontUpdateJSON == false)
		{
		
			if ((LibPartID > -1 | TypePartID > -1) & ArrIndex > -1)
			{
				if (LengthNode.value == "" & WidthNode.value == "" & PartListArr[ArrIndex].Length != undefined & PartListArr[ArrIndex].Width != undefined) 
				{
				LengthNode.value = PartListArr[ArrIndex].Length;
				WidthNode.value = PartListArr[ArrIndex].Width;
				}
			}
			
			PartLength = LengthNode.value;
			PartWidth = WidthNode.value;


			if (PartListArr[ArrIndex].hasOwnProperty("JSON") )
			{
			PartJSON = JSON.parse(JSON.stringify(PartListArr[ArrIndex].JSON));
			
			RecalcAllPartObj();
			document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);

				//if (PartListArr[ArrIndex].JSON.hasOwnProperty("Icon")){IconBase64Text = PartListArr[ArrIndex].JSON.Icon;}
			}
			else
			{	
			document.getElementById("LineJSON"+LineNumber).value = "";	
			}
			
		}
		
		if (PartListArr[ArrIndex].hasOwnProperty("Icon") ) {IconBase64Text = PartListArr[ArrIndex].Icon;}
		
		//alert(JSON.stringify(PartListArr[ArrIndex].JSON));
		//if (LibPartID > -1) {alert(PartListArr[ArrIndex].hasOwnProperty("Icon"));}
		
		if ((IconBase64Text == "" | IconBase64Text == "undefined") & LibPartID > -1)
		{IconBase64Text = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAHZJREFUOE/VksERgCAMBIMtWYmVWok1oWjiOHgxYYgP9gOPYyfApXxAgUy8hmFOmOaVdxd5W3iHUYW1qEYTwytbsoKWeQk9MgFlwz9lQKFViycoCyf0SLXMv8X2Hv7K3cKW/iFEer5hr6wgjgF72Eu40OxhG0Q7BhI7zDzuq1wAAAAASUVORK5CYII=";}

		DescNode.style.backgroundImage = "url('data:image/png;base64,"+IconBase64Text+"')";  
		if (IconBase64Text != "") {DescNode.className = "Inputlines LeftIcon";} else {DescNode.className = "Inputlines";}
		
		//if (PartListArr[ArrIndex].hasOwnProperty("JSON") )
		//{
		//RecalcAllPartObj();
		//document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
		//}

	}
	else {DescNode.className = "Inputlines";DescNode.style.backgroundImage = "";}
	
	if (OnlyChangeIcon == null | OnlyChangeIcon == false) {SetBandingFromJSON(LineDiv,ArrIndex,PartListArr,LitPartListArr);}

}

function SetBandingFromJSON(LineDiv,ArrIndex,PartListArr,LitPartListArrText)
{

	SetBandTickBoxesForCustomShape(LineDiv);
	//alert(LitPartListArrText);
	if (ArrIndex > -1)
	{	
	var LineNumber = LineDiv.getAttribute("data-LineNumber");
	var LeftedgeTickNode = document.getElementById("LeftedgeTick"+LineNumber);
	var RightedgeTickNode = document.getElementById("RightedgeTick"+LineNumber);
	var TopedgeTickNode = document.getElementById("TopedgeTick"+LineNumber);
	var BottomedgeTickNode = document.getElementById("BottomedgeTick"+LineNumber);
	var TickEdgeType = '';
	var edgeTickNode;
	var edgeTickValue = 0;

	
	
	
		for (var r = 1; r<=4; r++) 
		{
			switch(r)
			{
			case 1 : edgeTickNode = document.getElementById("LeftedgeTick"+LineNumber);
					edgeTickValue = PartListArr[ArrIndex].EdgeLeft;
					break;
			case 2 : edgeTickNode = document.getElementById("RightedgeTick"+LineNumber); 
					edgeTickValue = PartListArr[ArrIndex].EdgeRight;
					break;
			case 3 : edgeTickNode = document.getElementById("TopedgeTick"+LineNumber); 
					edgeTickValue = PartListArr[ArrIndex].EdgeTop;
					break;
			case 4 : edgeTickNode = document.getElementById("BottomedgeTick"+LineNumber); 
					edgeTickValue = PartListArr[ArrIndex].EdgeBot;
					break;		
			}
			
			
			switch (edgeTickValue)
			{
			case 1 : 
					if (TickEdgeType == '') {TickEdgeType = GetStdEdgeType(LineDiv.id,'SetBandingFromJSON('+LineDiv.id+','+ArrIndex+','+LitPartListArrText+')');}
					ChangeCheckBoxValue(edgeTickNode.id,TickEdgeType); 
					break;
			case 2 : ChangeCheckBoxValue(edgeTickNode.id,'45Profile'); break;
			case 3 : ChangeCheckBoxValue(edgeTickNode.id,'AngleEdge'); break;
			default : ChangeCheckBoxValue(edgeTickNode.id,'None'); break;
			}
			
		}
	
		/* switch (PartListArr[ArrIndex].EdgeLeft)
		{
		case 1 : ChangeCheckBoxValue(LeftedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(LeftedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(LeftedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(LeftedgeTickNode.id,'None'); break;
		}
		switch (PartListArr[ArrIndex].EdgeRight)
		{
		case 1 : ChangeCheckBoxValue(RightedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(RightedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(RightedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(RightedgeTickNode.id,'None'); break;
		}
		switch (PartListArr[ArrIndex].EdgeTop)
		{
		case 1 : ChangeCheckBoxValue(TopedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(TopedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(TopedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(TopedgeTickNode.id,'None'); break;
		}
		switch (PartListArr[ArrIndex].EdgeBot)
		{
		case 1 : ChangeCheckBoxValue(BottomedgeTickNode.id,TickEdgeType); break;
		case 2 : ChangeCheckBoxValue(BottomedgeTickNode.id,'45Profile'); break;
		case 3 : ChangeCheckBoxValue(BottomedgeTickNode.id,'AngleEdge'); break;
		default : ChangeCheckBoxValue(BottomedgeTickNode.id,'None'); break;
		} */
	
	}	
}

function BuildRelDescTypeList(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");		
var PanelType = document.getElementById("PanelType"+LineNumber).value;
var TypeID = FindItem(PanelType,PanelTypes,"Name");

	if (PanelTypes[TypeID].hasOwnProperty("Parts") ) 
	{
		return PanelTypes[TypeID].Parts	
	}
	else
	{

	var UserIconText = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAHZJREFUOE/VksERgCAMBIMtWYmVWok1oWjiOHgxYYgP9gOPYyfApXxAgUy8hmFOmOaVdxd5W3iHUYW1qEYTwytbsoKWeQk9MgFlwz9lQKFViycoCyf0SLXMv8X2Hv7K3cKW/iFEer5hr6wgjgF72Eu40OxhG0Q7BhI7zDzuq1wAAAAASUVORK5CYII=";
		
		for (var r = 0; r<LibParts.length; r++) 
		{
			if (LibParts[r].hasOwnProperty("Icon"))
			{	
				if (LibParts[r].Icon == "" | LibParts[r].Icon == "undefined")
				{LibParts[r].Icon = UserIconText;}
			}	
			else if (LibParts[r].JSON.hasOwnProperty("Icon"))
			{
				
				if (LibParts[r].JSON.Icon == "" | LibParts[r].JSON.Icon == "undefined")
				{LibParts[r].JSON.Icon = UserIconText;}
			}
			else
			{LibParts[r].JSON.Icon = UserIconText;}
			
		}
		
			return DescTypes.concat(LibParts);
	}

}

function ChangeBanding(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");	


var PanelType = document.getElementById("PanelType"+LineNumber).value;	
var itemDesc = document.getElementById("Description"+LineNumber).value;
var LengthNode = document.getElementById("Length"+LineNumber);
var WidthNode = document.getElementById("Width"+LineNumber);
//var PerentLineNode = document.getElementById(LineNumber);

var LeftedgeTickNode = document.getElementById("LeftedgeTick"+LineNumber);
var RightedgeTickNode = document.getElementById("RightedgeTick"+LineNumber);
var TopedgeTickNode = document.getElementById("TopedgeTick"+LineNumber);
var BottomedgeTickNode = document.getElementById("BottomedgeTick"+LineNumber);

var ReturnValue = GetExtraParValue("Return",LineDivID);

/* for (var i = 0; i<LibParts.length; i++){

LibParts[i].Name;

} */

			
	var LibPartID = FindItem(itemDesc,LibParts,"Name");

	if (LibPartID > -1 & PanelType != 'Builtup Panel')
	{

	}
	else
	{	
		//if (itemDesc == "Drawer Front"| itemDesc == "Door"|itemDesc == "Panel"|itemDesc == "ToeKick" ) 
		//{document.getElementById("LineJSON"+LineNumber).value = ''}
	
		if (PanelType == 'Profile Handle') 
		{
			ChangeCheckBoxValue(TopedgeTickNode.id,'45Profile');
		}
		if (PanelType == 'Angle Edge') 
		{
			ChangeCheckBoxValue(TopedgeTickNode.id,'AngleEdge');
		}


//var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
				//alert(LineJSON);
		//if (LineJSON == '') 
		//alert(PartJSON.Vectors.length);
		var PartIsNotShaped = true;
		if (PartJSON.hasOwnProperty('Vectors'))
		{
			if (PartJSON.Vectors.length > 0) {PartIsNotShaped = false;}
		}
	
		
		if (PartIsNotShaped)
		{
			

			if (PanelType == 'Glass Frame' ) 
			{
			var TickEdgeType = GetStdEdgeType(LineDivID,'ChangeBanding("'+LineDivID+'")');	
			ChangeCheckBoxValue(LeftedgeTickNode.id,TickEdgeType);
			ChangeCheckBoxValue(RightedgeTickNode.id,TickEdgeType);
			ChangeCheckBoxValue(TopedgeTickNode.id,TickEdgeType);
			ChangeCheckBoxValue(BottomedgeTickNode.id,TickEdgeType);
			//DisableCustomCheckbox(LeftedgeTickNode);
			//DisableCustomCheckbox(RightedgeTickNode);
			//DisableCustomCheckbox(TopedgeTickNode);
			//DisableCustomCheckbox(BottomedgeTickNode);
			}
			else
			{
			EnableCustomCheckbox(LeftedgeTickNode);
			EnableCustomCheckbox(RightedgeTickNode);
			EnableCustomCheckbox(TopedgeTickNode);
			EnableCustomCheckbox(BottomedgeTickNode);
			}

			if (PanelType == 'Builtup Panel' )
			{ 
			
		
				if (ReturnValue =="400")
				{
				var TickEdgeType = GetStdEdgeType(LineDivID,'ChangeBanding("'+LineDivID+'")');	
				ChangeCheckBoxValue(LeftedgeTickNode.id,TickEdgeType);
				ChangeCheckBoxValue(RightedgeTickNode.id,TickEdgeType);
				ChangeCheckBoxValue(TopedgeTickNode.id,'None');
				ChangeCheckBoxValue(BottomedgeTickNode.id,'None');
				//DisableCustomCheckbox(LeftedgeTickNode);
				//DisableCustomCheckbox(RightedgeTickNode);
				
				}

				if (ReturnValue =="100")
				{
				var TickEdgeType = GetStdEdgeType(LineDivID,'ChangeBanding("'+LineDivID+'")');	
				ChangeCheckBoxValue(LeftedgeTickNode.id,TickEdgeType);
				ChangeCheckBoxValue(RightedgeTickNode.id,'None');
				ChangeCheckBoxValue(TopedgeTickNode.id,'None');
				ChangeCheckBoxValue(BottomedgeTickNode.id,'None');
				//DisableCustomCheckbox(LeftedgeTickNode);
				} 
				
				if (parseFloat(WidthNode.value) < parseFloat(ReturnValue)+100 & parseFloat(WidthNode.value) > 0 & ReturnValue != "Full" )
				{ WidthNode.value = parseFloat(ReturnValue)+100; popup("The Buildup size you have selected is greater than part width less 100mm. The part width will now be adjusted automatically!",200,350,1);}
			}
		
			//SwapOutStdEdgeType(LineDivID,LineNumber,'');
		}
	}

} //end of ChangeBanding

function SetTickBoxesForShapedParts()
{

	for (var r = 1; r<counter; r++) 
	{
	PartLength = parseFloat(document.getElementById("Length"+r).value);
	PartWidth = parseFloat(document.getElementById("Width"+r).value);	
		var LineJSON = document.getElementById("LineJSON"+r).value;
		if (LineJSON != '') 
		{
		//try { PartJSON = JSON.parse(LineJSON); } catch(err) {alert(err + " LineJSON= " +LineJSON);}	
		 PartJSON = JSON.parse(LineJSON);
		 SetBandTickBoxesForCustomShape(document.getElementById("LineDiv"+r));
		//if (PartJSON.Vectors.length > 0) {SetBandTickBoxesForCustomShape(document.getElementById("LineDiv"+r));}
		}
	}	
}

function FindFirstHDFEdgeProfile(MatchMaterial,LineNumber)
{
var edgeTickNode;
var ImageClassIndex;
var LineMaterial = document.getElementById("Material"+LineNumber).value;
	
	if (LineMaterial == MatchMaterial)
	{
		for (var r = 1; r<=4; r++) 
		{
			switch(r)
			{
			case 1 : edgeTickNode = document.getElementById("LeftedgeTick"+LineNumber); break;
			case 2 : edgeTickNode = document.getElementById("RightedgeTick"+LineNumber); break;
			case 3 : edgeTickNode = document.getElementById("TopedgeTick"+LineNumber); break;
			case 4 : edgeTickNode = document.getElementById("BottomedgeTick"+LineNumber); break;		
			}
			
			ImageClassIndex = FindItem(edgeTickNode.className,HDFEdgeProfiles,"ImageClass");
			if (ImageClassIndex > -1) {return HDFEdgeProfiles[ImageClassIndex].Name;}		
		}
	}
	return '';
}

function ApplyHDFMaterialSelection(LineNumber)
{
var HDFMaterialName = document.getElementById('hiddenDiv').getAttribute("data-SelectListValue");
document.getElementById("Material"+LineNumber).value = HDFMaterialName;
document.getElementById("Material"+LineNumber).onchange();
}

function ApplyHDFEdgeProfileSelection(LineNumber)
{
//var HDFEdgeName = document.getElementById('PopupListSelect').value;
var HDFEdgeName = document.getElementById('hiddenDiv').getAttribute("data-SelectListValue");
var edgeTickNode;
//var ImageClassIndex = FindItem(HDFEdgeName,HDFEdgeProfiles,"Name");

	for (var r = 1; r<=4; r++) 
	{
		switch(r)
		{
		case 1 : edgeTickNode = document.getElementById("LeftedgeTick"+LineNumber); break;
		case 2 : edgeTickNode = document.getElementById("RightedgeTick"+LineNumber); break;
		case 3 : edgeTickNode = document.getElementById("TopedgeTick"+LineNumber); break;
		case 4 : edgeTickNode = document.getElementById("BottomedgeTick"+LineNumber); break;		
		}
		
		if (edgeTickNode.className == "checkboxTick" | edgeTickNode.className == "checkboxSpecial") {ChangeCheckBoxValue(edgeTickNode.id,HDFEdgeName);}	
	}
}


function GetStdEdgeType(LineDivID,CallFuncWithArg)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var itemMaterial = document.getElementById("Material"+LineNumber).value;

	if (itemMaterial.indexOf(HDFPrefix) > -1) /*look for a previously used HDF edge profile*/
	{
	var ExistEdgeName = ''; 

		/*check the current line first*/
		var ExistEdgeName = FindFirstHDFEdgeProfile(itemMaterial,LineNumber);
		

		if (ExistEdgeName == '') /*Now search through previous lines if no edges found on this part*/
		{
			for (var r = counter-1; r>0; r--) 
			{
			ExistEdgeName = FindFirstHDFEdgeProfile(itemMaterial,r);
				if (ExistEdgeName != '') {break;}
			}
		}
		 //alert(LineDivID+" "+CallFuncWithArg);
		
		if (ExistEdgeName == '') {popup('Please select an Optidoor edge profile!',200,300,4,'ApplyHDFEdgeProfileSelection('+LineNumber+');'+CallFuncWithArg,HDFEdgeProfiles);return 'Tick';}
		return ExistEdgeName;
	}
	else
	{
	return 'Tick';	
	}
	
}

function ChangePanelType(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;		
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var DescNode = document.getElementById("Description"+LineNumber);
var ShapingOK = PanelTypes[FindItem(PanelType,PanelTypes,"Name")].PartShaping;
var TypeID = FindItem(PanelType,PanelTypes,"Name");
var PNCPartID = document.getElementById("PNCPartID"+LineNumber).value;



	if (!ShapingOK) 
	{	
	 PartJSON.Vectors = [];
	 document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
	}
	
	/*Check if current Description type is in another Type*/
	var InOtherType = false;
	for (var i = 0; i<PanelTypes.length; i++)
	{
		if (PanelTypes[i].hasOwnProperty("Parts") )
		{
			if (FindItem(DescNode.value,PanelTypes[i].Parts,"Name") > -1 & i != TypeID) {InOtherType = true;} /* i != TypeID = Exclude this type from the check*/
		}			
	}
	
	if (InOtherType | PanelType != 'Glass Frame' & DescNode.value == "Glass Frame" | PanelType != 'Builtup Panel' & DescNode.value == "Builtup Panel") 
	{
		if (PNCPartID == "")
		{
		DescNode.value = '';
		ChangeDesc(LineDivID);
		}
	}
	
	
	//if (PanelType == 'Builtup Panel') {DescNode.value = 'Builtup Panel';ChangeDesc(LineDivID);}
	


	/* else 
	{
	var LibPartID = FindItem(itemDesc,LibParts,"Name");	
		if (LibPartID > -1)
		{
		document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(LibParts[LibPartID].JSON);
		PartJSON = JSON.parse(JSON.stringify(LibParts[LibPartID].JSON));
		}
	} */
	
	if (itemMaterial.indexOf("NON-STOCK") > -1 & PanelType == 'Profile Handle') 
	{
		if (PanelType == 'Profile Handle') {popup("Please note that some Non Stock colours are not available with mitre handles. Please call us to check first!",150,350,1);}
	}
	else if (PanelType == 'Profile Handle') {popup("please note with darker colours there will be whitening along the bent edge. Phone 09 415 6322 if unsure.",150,350,1);}
	


	if (TypeID > -1 & PNCPartID == "")
	{
		if (PanelTypes[TypeID].hasOwnProperty("Parts") )
		{
			if (PanelTypes[TypeID].Parts.length == 1 )
			{
			DescNode.value = PanelTypes[TypeID].Parts[0].Name;
			ChangeDesc(LineDivID);	
			}
			else
			{
				if (FindItem(DescNode.value,DescTypes,"Name") > -1) {DescNode.value = '';ChangeDesc(LineDivID);}
				
			var DescDropButNode = document.getElementById("DescriptionDropButton"+LineNumber);
			ShowCustomDropDown(DescDropButNode,BuildRelDescTypeList(DescDropButNode.parentNode.id),true);
			}
			
			
		}
	}
	
	if (PanelType == 'Profile Handle' & (DescNode.value == '' | DescNode.value == 'Panel' | DescNode.value == 'Toe Kick')) 
	{
		DescNode.value = 'Door';ChangeDesc(LineDivID);
		//var TopedgeTickNode = document.getElementById("TopedgeTick"+LineNumber);
		//ChangeCheckBoxValue(TopedgeTickNode.id,'45Profile');
	}
	if (PanelType == 'Angle Edge' & DescNode.value == '') 
	{
		DescNode.value = 'Door';ChangeDesc(LineDivID);
		//var TopedgeTickNode = document.getElementById("TopedgeTick"+LineNumber);
		//ChangeCheckBoxValue(TopedgeTickNode.id,'AngleEdge');
	}

	if (PanelType == 'Optidoor' & itemMaterial != "")
	{
		if (itemMaterial.indexOf(HDFPrefix) == -1)
		{popup('Please select an Optidoor material!',200,300,4,'ApplyHDFMaterialSelection('+LineNumber+');',BuildRelMaterialsList(LineDivID));}
	}
	
	
	SetPanelType(LineDivID);
	
	CheckInvalidBanding(LineNumber);
	
	
	
}

function CheckInvalidBanding(LineNumber)
{
var LeftedgeNode = document.getElementById("Leftedge"+LineNumber);
var RightedgeNode = document.getElementById("Rightedge"+LineNumber);
var TopedgeNode = document.getElementById("Topedge"+LineNumber);
var BotedgeNode = document.getElementById("Bottomedge"+LineNumber);
var PanelType = document.getElementById("PanelType"+LineNumber).value;

	if (PartJSON.hasOwnProperty("Vectors") )
	{
		if (PartJSON.Vectors.length == 0)
		{
		var LeftedgeTick = document.getElementById("LeftedgeTick"+LineNumber);
		var RightedgeTick = document.getElementById("RightedgeTick"+LineNumber);
		var TopedgeTick = document.getElementById("TopedgeTick"+LineNumber);
		var BottomedgeTick = document.getElementById("BottomedgeTick"+LineNumber);
		EnableCustomCheckbox(LeftedgeTick);
		EnableCustomCheckbox(RightedgeTick);
		EnableCustomCheckbox(TopedgeTick);
		EnableCustomCheckbox(BottomedgeTick);
		}
		
		if (PanelType == 'Angle Edge' | document.getElementById("ToggleAngleEdgesCheck").checked) {var AngleEdgesAvail = true;} else {var AngleEdgesAvail = false;}


		var TickEdgeType = '';
		var edgeTickNode;


		for (var r = 1; r<=4; r++) 
		{
			switch(r)
			{
			case 1 : edgeTickNode = LeftedgeTick; break;
			case 2 : edgeTickNode = RightedgeTick; break;
			case 3 : edgeTickNode = TopedgeTick; break;
			case 4 : edgeTickNode = BottomedgeTick; break;		
			}
			
			if (edgeTickNode.value == 'AngleEdge' & AngleEdgesAvail | edgeTickNode.value == '45Profile' & PanelType != 'Profile Handle' )
			{
				if (TickEdgeType == '') {TickEdgeType = GetStdEdgeType("LineDiv"+LineNumber,'CheckInvalidBanding('+LineNumber+')');}
			ChangeCheckBoxValue(edgeTickNode.id,TickEdgeType);
			}			
		}


		/* if (LeftedgeNode.value == 'AngleEdge' & AngleEdgesAvail | LeftedgeNode.value == '45Profile' & PanelType != 'Profile Handle' )
		{
		ChangeCheckBoxValue("LeftedgeTick"+LineNumber,TickEdgeType);
		}
		if (RightedgeNode.value == 'AngleEdge' & PanelType != 'Angle Edge' | RightedgeNode.value == '45Profile' & PanelType != 'Profile Handle' )
		{
		ChangeCheckBoxValue("RightedgeTick"+LineNumber,TickEdgeType);
		}
		if (TopedgeNode.value == 'AngleEdge' & PanelType != 'Angle Edge' | TopedgeNode.value == '45Profile' & PanelType != 'Profile Handle' )
		{
		ChangeCheckBoxValue("TopedgeTick"+LineNumber,TickEdgeType);
		}
		if (BotedgeNode.value == 'AngleEdge' & PanelType != 'Angle Edge' | BotedgeNode.value == '45Profile' & PanelType != 'Profile Handle' )
		{
		ChangeCheckBoxValue("BottomedgeTick"+LineNumber,TickEdgeType);
		} */
	}
	
}

function GetMaterialNamePart(MaterialName)
{
	const regex = /\d+/;
	var NumCharPos = MaterialName.search(regex);

	return MaterialName.substr(0,NumCharPos-1);
}

function MatchMaterialFamily(ExistingMat,FindBuildup)
{
	var NewMaterial = null;
	var FamilyName = GetMaterialNamePart(ExistingMat);
	var IsBuildupMat = false;

	for (var r = 0; r<Materials.length; r++) 
	{
		IsBuildupMat = false;

		if (Materials[r].Name.indexOf("36") > -1 | Materials[r].Name.indexOf("60") > -1) {IsBuildupMat = true;}


		if (Materials[r].Name.indexOf(FamilyName) > -1 && IsBuildupMat & FindBuildup | !IsBuildupMat & !FindBuildup) 
		{ 
			NewMaterial = Materials[r].Name;
			break;
		} 
	} 

	return NewMaterial;
}

function RemoveGrainMatchParams(LineDivID)
{
	RemoveExtraPar("GrainMatchGroup",LineDivID);
	RemoveExtraPar("GrainMatchOrder",LineDivID);
	RemoveExtraPar("GrainMatchXPos",LineDivID);
	RemoveExtraPar("GrainMatchYPos",LineDivID);
	RemoveExtraPar("DrwFrontOption",LineDivID);
}

function SetPanelType(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;	
var itemMaterial = document.getElementById("Material"+LineNumber);
var PartEditButton = document.getElementById("EditLine"+LineNumber);
var PanelTypeNode = document.getElementById("PanelType"+LineNumber);
var LineDesc = document.getElementById("Description"+LineNumber);
var AddInfo = document.getElementById("AddInfo"+LineNumber);
var PNCPartID = document.getElementById("PNCPartID"+LineNumber).value;
//alert(PanelTypes[FindItem(PanelTypeNode.value,PanelTypes,"Name")].Icon);

if(ShowPartEditor == true & PNCPartID == "") {PartEditButton.removeAttribute("hidden");} 

var IconBase64Text = PanelTypes[FindItem(PanelTypeNode.value,PanelTypes,"Name")].Icon;
PanelTypeNode.style.backgroundImage = "url('data:image/png;base64,"+IconBase64Text+"')";  
if (IconBase64Text != "") {PanelTypeNode.className = "Inputlines LeftIcon";} else {PanelTypeNode.className = "Inputlines";}


	switch(PanelType)
	{
	case 'Builtup Panel': 
		RemoveGrainMatchParams(LineDivID)
		AddInfo.removeAttribute("placeholder");

		if (itemMaterial.value.indexOf("36") == -1 & itemMaterial.value.indexOf("60") == -1)  { itemMaterial.value = MatchMaterialFamily(itemMaterial.value,true);  }
		
		itemMaterial.removeAttribute("disabled");		
		 
		PartEditButton.setAttribute("hidden","hidden");
		document.getElementById("LineJSON"+LineNumber).value = '';
		PartJSON = [];
	break;
	case 'Profile Handle':
		//RemoveGrainMatchParams(LineDivID)
		AddInfo.removeAttribute("placeholder");	


		var MatIndex = FindItem(itemMaterial.value,Materials,"Name");
		if (MatIndex > -1)
		{
			if (Materials[MatIndex].NoProfileHandle == 'Yes') { itemMaterial.value = null; }
		}
	break;
	case 'Glass Frame'  :
		if (PNCPartID == "")
		{
		document.getElementById("Description"+LineNumber).value = "Glass Frame"; 
		ChangeDesc(LineDivID);
		}

		var MatIndex = FindItem(itemMaterial.value,Materials,"Name");
		if (MatIndex > -1)
		{
			if (Materials[MatIndex].GlassFrame == 'No Glass Frame' ) {itemMaterial.value = null;} //| itemMaterial.value.indexOf('(POCKET BACK)') > -1
		}
	break;	
	/*case 'Optidoor'  :
		if (itemMaterial.value.indexOf(HDFPrefix) == -1) 
		{popup('Please select an Optidoor material!',200,300,4,'ApplyHDFMaterialSelection('+LineNumber+');',BuildRelMaterialsList(LineDivID));}
	break;*/
	default:
		
	}
	
	if (itemMaterial.value.indexOf("36") > -1 | itemMaterial.value.indexOf("60") > -1)
	{
		if (PanelType != 'Builtup Panel') {itemMaterial.value = MatchMaterialFamily(itemMaterial.value,false); }	
	}
	
	
	if (PNCPartID == "")
	{
		if (PanelType == 'Roller Surround') // | PanelType == 'Glass Frame' 
		{
		document.getElementById("DescriptionDropButton"+LineNumber).setAttribute("disabled","disabled");
		LineDesc.setAttribute("readonly","readonly");
		LineDesc.style.backgroundColor="#F2F2F2";

		}
		else
		{
		if ( LineDesc.value == "Roller Door Surround" | PanelType != 'Glass Frame' & LineDesc.value == 'Glass Frame' ) { LineDesc.value = ""; }
		//if ( PanelType != 'Glass Frame' & AddInfo.value == 'Glass Frame' ) { AddInfo.value = ""; }
		document.getElementById("DescriptionDropButton"+LineNumber).removeAttribute("disabled"); //was DescType
		LineDesc.removeAttribute("readonly");
		LineDesc.style.backgroundColor="rgba(255,255,255,255)";
		}
	}
	
}

function Is1FaceMaterial(MaterialName)
{
	var Result = false;
	if (MaterialName.indexOf(' 1F') > -1 ) {Result = true;}
	if (MaterialName.indexOf(' 2F') == -1 & MaterialName.indexOf('ACRYGLOSS') > -1 ) {Result = true;}

	return Result;
}


function Calculations(LineDivID) {

var LengthIndex = 0;
var WidthIndex = 0;
var Lenghtrounded = 0;
var Widthrounded = 0;
var EdgeTapeLength = 0;
var EdgeTapeWidth = 0;
var CuttingCostLength = 0;
var CuttingCostWidth = 0;
var NonStockPartLength = 0;
var NonStockPartWidth = 0;
var AdjustedPartArea = 0;
var PartPrice = 0;
var SheetMargin = 0;
var CuttingCostPerM = 0;
var EdgetapeCostPerM = 0;
var ProcessCost = 0;
var SheetCost = 0;
var SheetArea = 0;
var LeftEdge = 0;
var RightEdge = 0;
var TopEdge = 0;
var BottomEdge = 0;
var TotalPrice=0;
var TotalMachiningPrice = 0;
var DiscountRate=(100-Discount)/100;
var EdgetapeCostPerPiece = 0;
var ProfileHandleCost = 0;
var AngleEdgeCost = 0;
var LongSHSurcharge = 0;
var TotalPanelCount = 0;

var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");

//alert(document.getElementById("PanelType"+LineNumber));
var PanelType = document.getElementById("PanelType"+LineNumber).value
var itemMaterial = document.getElementById("Material"+LineNumber).value;
var itemQty = parseFloat(document.getElementById("Qty"+LineNumber).value);
//var itemDesc = document.getElementById("Description"+LineNumber).value;
var LengthNode = parseFloat(document.getElementById("Length"+LineNumber).value);
var WidthNode = parseFloat(document.getElementById("Width"+LineNumber).value);
var LeftedgeNode = document.getElementById("Leftedge"+LineNumber).value;
var RightedgeNode = document.getElementById("Rightedge"+LineNumber).value;
var TopedgeNode = document.getElementById("Topedge"+LineNumber).value;
var BotedgeNode = document.getElementById("Bottomedge"+LineNumber).value;
//var ExtraParamNode = document.getElementById("ExtraPar"+LineNumber);


//var Shortstring = ExtraParamNode.value.slice(ExtraParamNode.value.indexOf("Return"),ExtraParamNode.value.length);
//var CarPos = Shortstring.indexOf(";"); 
//var ReturnValue = Shortstring.slice(7,CarPos);
var ReturnValue = GetExtraParValue("Return",LineDivID);
if (ReturnValue == "") {ReturnValue = "Full";}
var OversizeCalc = 0;
var NonStockColour = [];
var LineMaterial = '';
var NonStockBigPartsTotal = 0;
var NonStockCharge = 0;
var MachiningCharge = 0;
var RoutingCharge = 0;
var SecondPrgCharge = 0;
var HasManualClashing = false;
var ManualClashingCharge = 0;
var GMGroupsArr = [];
var GrianMatchCharge = 0;
var FaceOpsCount = 0;
var BackOpsCount = 0;
var SecPrgCount = 0;

//alert(LeftedgeNode);

if (LeftedgeNode != 'None' ) {LeftEdge = 1;}
if (RightedgeNode != 'None') {RightEdge = 1;} 
if (TopedgeNode != 'None') {TopEdge = 1;} 
if (BotedgeNode != 'None') {BottomEdge = 1;}

if (LeftedgeNode == '45Profile' ) {ProfileHandleCost = ProfileHandleCost + 30;}
if (RightedgeNode == '45Profile') {ProfileHandleCost = ProfileHandleCost + 30;} 
if (TopedgeNode == '45Profile') {ProfileHandleCost = ProfileHandleCost + 30;} 
if (BotedgeNode == '45Profile') {ProfileHandleCost = ProfileHandleCost + 30;}

if (LeftedgeNode == 'AngleEdge' ) {AngleEdgeCost = AngleEdgeCost + 50;}
if (RightedgeNode == 'AngleEdge') {AngleEdgeCost = AngleEdgeCost + 50;} 
if (TopedgeNode == 'AngleEdge') {AngleEdgeCost = AngleEdgeCost + 50;} 
if (BotedgeNode == 'AngleEdge') {AngleEdgeCost = AngleEdgeCost + 50;}




if (LengthNode > 0 && WidthNode > 0 && itemMaterial != "")
{
	var MatIndex = FindItem(itemMaterial,Materials,"Name");
	if (MatIndex > -1)
	{
	
		if (itemMaterial.indexOf("LPM WHITE") > -1 && LPMDiscount < 1 ){ DiscountRate = LPMDiscount; }

	SheetMargin = Materials[MatIndex].SheetMargin;
	EdgetapeCostPerM = Materials[MatIndex].EdgetapeCostPerM;
	ProcessCost = Materials[MatIndex].ProcessCost;

	if (Materials[MatIndex].NoLongSheetSurcharge == "No" 
	& (Materials[MatIndex].SheetLength > 2800 | Materials[MatIndex].SheetWidth > 1250)
	& (LengthNode > 2430 | WidthNode > 2430) ) 
	{LongSHSurcharge = 60; } //alert('Long Sheet Surcharge $'+LongSHSurcharge);


		if ( PanelType == "Builtup Panel" && ReturnValue=="Full" ) 
		{ 
				//if (itemMaterial == "ACRYGLOSS WHITE 36 2F" ) 
				//{  
				//SheetCost = 240;
				//CuttingCostPerM = 5;
				//}
				//if (itemMaterial == "ACRYGLOSS WHITE 60 2F" ) 
				//{ 
				//SheetCost = 240;
				//CuttingCostPerM = 6;
				//}
		SheetCost = Materials[MatIndex].AltSheetCost;
		CuttingCostPerM = Materials[MatIndex].AltCuttingCostPerM;
		}
		else
		{
		SheetCost = Materials[MatIndex].SheetCost;
		CuttingCostPerM = Materials[MatIndex].CuttingCostPerM;
		}

	
	if ( itemMaterial.indexOf("36") > -1 || itemMaterial.indexOf("60") > -1  ) { EdgetapeCostPerPiece = 10; } else { EdgetapeCostPerPiece = 1;}
	SheetArea = Materials[MatIndex].SheetArea;
	LengthIndex = (Math.ceil((LengthNode+49)/50))-2;
	WidthIndex = (Math.ceil((WidthNode+49)/50))-2;
	if (LengthIndex < 0) {LengthIndex = 0;}
	if (WidthIndex < 0) {WidthIndex = 0;}
	Lenghtrounded = roundedsizes[LengthIndex].ReCalcValue;
	Widthrounded = roundedsizes[WidthIndex].ReCalcValue;
	EdgeTapeLength = adjustededgetape[LengthIndex].ReCalcValue;
	EdgeTapeWidth = adjustededgetape[WidthIndex].ReCalcValue;
	CuttingCostLength = adjustedcuttingcost[LengthIndex].ReCalcValue;
	CuttingCostWidth = adjustedcuttingcost[WidthIndex].ReCalcValue;
	if (Materials[MatIndex].Name.search("24MDF") > -1 || Materials[MatIndex].Name.search("25MDF") > -1 || Materials[MatIndex].Name.search("30MDF") > -1 || Materials[MatIndex].Name.search("32MDF") > -1
	|| Materials[MatIndex].Name.search("32MRC2") > -1)
	{
	AdjustedPartArea = ((adjustedsizes24mm[LengthIndex].ReCalcValue)/1000)*((adjustedsizes24mm[WidthIndex].ReCalcValue)/1000);
	}
	else
	{
	AdjustedPartArea = ((adjustedsizes[LengthIndex].ReCalcValue)/1000)*((adjustedsizes[WidthIndex].ReCalcValue)/1000);
	}

	PartPrice = itemQty*(ProfileHandleCost+AngleEdgeCost+LongSHSurcharge+parseFloat(((SheetCost/SheetArea*(AdjustedPartArea)*SheetMargin+(ProcessCost+(Lenghtrounded+Widthrounded)*0.001*CuttingCostPerM*2*CuttingCostLength*CuttingCostWidth)+(((LeftEdge*Lenghtrounded+RightEdge*Lenghtrounded+TopEdge*Widthrounded+BottomEdge*Widthrounded)*0.001*EdgetapeCostPerM)+(LeftEdge*EdgeTapeLength+RightEdge*EdgeTapeLength+TopEdge*EdgeTapeWidth+BottomEdge*EdgeTapeWidth)+(LeftEdge+RightEdge+TopEdge+BottomEdge)*EdgetapeCostPerPiece))*1.25).toFixed(2)));
	if (PanelType == 'Glass Frame' ) { PartPrice = PartPrice + (itemQty*80) ; } 
	if (PanelType == 'Roller Surround' ) { PartPrice = PartPrice + (itemQty*40); }


		var LineJSON = document.getElementById("LineJSON"+LineNumber).value;
		if (LineJSON != '') 
		{
			var PartJSONObj = JSON.parse(LineJSON);

			for (var i = 0; i<PartJSONObj.Vectors.length; i++)
			{
				if (PartJSONObj.Vectors[i].Edge == "M") {HasManualClashing = true;break;}		
			}
			
		if (HasManualClashing == true) {ManualClashingCharge = 40*itemQty;PartPrice = PartPrice+ManualClashingCharge}	
		}
	PartPrice = (PartPrice*PriceIncPercent)*DiscountRate;

	document.getElementById("LinePrice"+LineNumber).value = PartPrice.toFixed(2); 


	for (var r = 1; r<counter; r++) 
	{
		var LineItemQty = parseFloat(document.getElementById("Qty"+r).value);
		LineMaterial = document.getElementById("Material"+r).value;
		var MatThick = GetMatThickFromName(LineMaterial);
		if (LineMaterial.indexOf(HDFPrefix) > -1 ) {var IsHDFMaterial = true} else {var IsHDFMaterial = false}

		if ( document.getElementById("Length"+r).value > 0 && document.getElementById("Width"+r).value > 0 ) 
		{
			
			if (LineMaterial.indexOf("NON-STOCK") > -1 ) 
			{
				if (NonStockColour.length == 0 ) { NonStockColour.push( {"MatName" : LineMaterial , "SheetCost" : Materials[FindItem(LineMaterial,Materials,"Name")].SheetCost , "SmallParts" : 0 , "BigParts" : 0 , "BigPartsCost" : 0 } ); NonStockCharge = 125; }				
				//if (NonStockColour.length == 0 ) { NonStockColour.push( { "MatName" : LineMaterial } ) }				
				if ( FindItem(LineMaterial,NonStockColour,"MatName") == -1 )
				{ NonStockColour.push( {"MatName" : LineMaterial , "SheetCost" : Materials[FindItem(LineMaterial,Materials,"Name")].SheetCost , "SmallParts" : 0 , "BigParts" : 0 , "BigPartsCost" : 0 } ); NonStockCharge = NonStockCharge + 100; }
				
				//NonStockColour = true;
				SheetCost = Materials[FindItem(LineMaterial,Materials,"Name")].SheetCost;
				LengthIndex = (Math.ceil((parseFloat(document.getElementById("Length"+r).value )+49)/50))-2;
				WidthIndex = (Math.ceil((parseFloat(document.getElementById("Width"+r).value)+49)/50))-2;
				NonStockPartLength = ExtraForBadPartSizes[LengthIndex].ReCalcValue;
				NonStockPartWidth = ExtraForBadPartSizes[WidthIndex].ReCalcValue;
				OversizeCalc = (SheetCost*0.025*((NonStockPartLength+NonStockPartWidth-100+Math.abs(NonStockPartLength+NonStockPartWidth-100))*(Math.abs(((NonStockPartLength+NonStockPartWidth-128+Math.abs(NonStockPartLength+NonStockPartWidth-100))-Math.abs((NonStockPartLength+NonStockPartWidth-128+Math.abs(NonStockPartLength+NonStockPartWidth-100))))*((NonStockPartLength+NonStockPartWidth-100+Math.abs(NonStockPartLength+NonStockPartWidth-100)))))/((Math.abs(((NonStockPartLength+NonStockPartWidth-128+Math.abs(NonStockPartLength+NonStockPartWidth-100))-Math.abs((NonStockPartLength+NonStockPartWidth-128+Math.abs(NonStockPartLength+NonStockPartWidth-100))))*((NonStockPartLength+NonStockPartWidth-100+Math.abs(NonStockPartLength+NonStockPartWidth-100)))))+0.1))).toFixed(2);
				//alert(OversizeCalc);
				if (OversizeCalc == 0) {NonStockColour[FindItem(LineMaterial,NonStockColour,"MatName")].SmallParts = NonStockColour[FindItem(LineMaterial,NonStockColour,"MatName")].SmallParts + LineItemQty; }
				if (OversizeCalc > 0) {NonStockColour[FindItem(LineMaterial,NonStockColour,"MatName")].BigParts = NonStockColour[FindItem(LineMaterial,NonStockColour,"MatName")].BigParts + (LineItemQty*2); }
				NonStockColour[FindItem(LineMaterial,NonStockColour,"MatName")].BigPartsCost = NonStockColour[FindItem(LineMaterial,NonStockColour,"MatName")].BigPartsCost + (parseFloat(OversizeCalc)*LineItemQty);
				//document.getElementById("AddInfo"+r).value = OversizeCalc * parseFloat(document.getElementById("Qty"+r).value);
			}

		TotalPrice = TotalPrice + parseFloat(document.getElementById("LinePrice"+r).value);
		TotalPanelCount = TotalPanelCount+LineItemQty;	
		}
		
		var LineJSON = document.getElementById("LineJSON"+r).value;
		if (LineJSON != '') 
		{
			var PartJSONObj = JSON.parse(LineJSON);
			var OponFace = false;
			var OponBack = false;
			var HasDrilling = false;
			var HasRouting = false;
			var HasManualClashing = false;
			
			for (var i = 0; i<PartJSONObj.Operations.length; i++)
			{
				var OpDepth = CalcOutputValue(PartJSONObj.Operations[i].Depth);

				if (PartJSONObj.Operations[i].Face == 'Front' & OpDepth < MatThick) {OponFace = true;}
				if (PartJSONObj.Operations[i].Face == 'Back' & OpDepth < MatThick) {OponBack = true;}
				if (PartJSONObj.Operations[i].Type == "Hole" | PartJSONObj.Operations[i].Type == "LineBore") {HasDrilling = true;}
				if (PartJSONObj.Operations[i].Type == "Rebate" | PartJSONObj.Operations[i].Type == "Route") {HasRouting = true;}
			}
			
			for (var i = 0; i<PartJSONObj.Vectors.length; i++)
			{
				if (PartJSONObj.Vectors[i].Edge == "M") {HasManualClashing = true;break;}		
			}
			
			if (HasManualClashing == true) {ManualClashingCharge = ManualClashingCharge+(40*LineItemQty);}	
			if (HasDrilling == true) {MachiningCharge = MachiningCharge+(2*LineItemQty);}
			if (HasRouting == true) {RoutingCharge = RoutingCharge+(5*LineItemQty);}

			if (Is1FaceMaterial(LineMaterial))
			{
				if (OponFace) {FaceOpsCount += 1;}
				if (OponBack) {BackOpsCount += 1;}	
			}
			else if (OponFace & OponBack) {SecPrgCount += LineItemQty;}	
		}

		var GrainMatchGroup = GetExtraParValue("GrainMatchGroup","LineDiv"+r);
		if (GrainMatchGroup > 0 & !IsHDFMaterial)
		{
			if (GMGroupsArr.indexOf(GrainMatchGroup) == -1) {GMGroupsArr.push(GrainMatchGroup);}
		}
		
	}

	if (FaceOpsCount < BackOpsCount & FaceOpsCount != 0) {SecPrgCount += FaceOpsCount;} //Add the number of parts with face ops
	if (BackOpsCount <= FaceOpsCount & BackOpsCount != 0) {SecPrgCount += BackOpsCount;} //Add the number of parts with back ops

	SecondPrgCharge += (10*SecPrgCount);



	if (TotalPanelCount > 0) {document.getElementById('TotalPanelQty').innerHTML="Total panel Quantity "+TotalPanelCount;} 
	if (GMGroupsArr.length > 0) {GrianMatchCharge = GMGroupsArr.length*30;}


	for (var xx = 0; xx<NonStockColour.length; xx++)
	{

		if ( NonStockColour[xx].BigParts > NonStockColour[xx].SmallParts )
		{NonStockColour[xx].BigPartsTotalCost = NonStockColour[xx].BigPartsCost*((NonStockColour[xx].BigParts-NonStockColour[xx].SmallParts)/NonStockColour[xx].BigParts); }
		else 
		{NonStockColour[xx].BigPartsTotalCost = 0;}

		NonStockBigPartsTotal = NonStockBigPartsTotal + NonStockColour[xx].BigPartsTotalCost;
	}

	if (CustomerMachiningCharge) {TotalMachiningPrice = MachiningCharge+RoutingCharge+SecondPrgCharge;}

	TotalPrice = TotalPrice+TotalMachiningPrice+NonStockBigPartsTotal+NonStockCharge+GrianMatchCharge;

	//alert(GBigPartsTotalCost + " \ " + BigPartsTotalCost);
	//if ( NonStockColour.length > 0 ) { var PricewithFeight = TotalPrice+NonStockBigPartsTotal+NonStockCharge+parseFloat(CalcFreight());}
	//else {var PricewithFeight = TotalPrice+parseFloat(CalcFreight()); }
	var PricewithFeight = TotalPrice+parseFloat(CalcFreight());

	if ( NonStockColour.length > 0  ) 
	{ 
	document.getElementById("OverSizePanel").innerHTML=(NonStockBigPartsTotal).toFixed(2);
	document.getElementById("OverSizePanelHidden").value=(NonStockBigPartsTotal).toFixed(2);
	document.getElementById("NonStockCharge").innerHTML=(NonStockCharge).toFixed(2);
	document.getElementById("NonStockChargeHidden").value=(NonStockCharge).toFixed(2); 
	document.getElementById('OverSizePanelSpan').style.visibility = "visible"; 
	document.getElementById('NonStockChargeSpan').style.visibility = "visible"; 
	} 
	else 
	{ 
	document.getElementById("OverSizePanel").innerHTML=0;
	document.getElementById("OverSizePanelHidden").value="0.00";
	document.getElementById("NonStockCharge").innerHTML=0;
	document.getElementById("NonStockChargeHidden").value="0.00";
	document.getElementById('OverSizePanelSpan').style.visibility = "hidden"; 
	document.getElementById('NonStockChargeSpan').style.visibility = "hidden";  
	}

	if (GrianMatchCharge > 0)
	{
		document.getElementById("GrainMatchCharge").innerHTML=(GrianMatchCharge).toFixed(2);
		document.getElementById("GrainMatchChargeHidden").value=(GrianMatchCharge).toFixed(2);
		document.getElementById('GrainMatchChargeSpan').style.visibility = "visible";		
	}
	else
	{
		document.getElementById("GrainMatchChargeHidden").value="0.00";
		document.getElementById('GrainMatchChargeSpan').style.visibility = "hidden";
	}


	if (CustomerMachiningCharge)
	{
		if ( MachiningCharge > 0  ) 
		{ 
		document.getElementById("MachiningCharge").innerHTML=(MachiningCharge).toFixed(2);
		document.getElementById("MachiningChargeHidden").value=(MachiningCharge).toFixed(2); 
		document.getElementById('MachiningChargeSpan').style.visibility = "visible"; 
		} else { document.getElementById("MachiningCharge").innerHTML=0; document.getElementById("RouteChargeHidden").value=(0).toFixed(2); document.getElementById('MachiningChargeSpan').style.visibility = "hidden";}
		if ( RoutingCharge > 0  ) 
		{ 
		document.getElementById("RouteCharge").innerHTML=(RoutingCharge).toFixed(2);
		document.getElementById("RouteChargeHidden").value=(RoutingCharge).toFixed(2);
		document.getElementById('RouteChargeSpan').style.visibility = "visible";  
		} else { document.getElementById("RouteCharge").innerHTML=0; document.getElementById("RouteChargeHidden").value=(0).toFixed(2); document.getElementById('RouteChargeSpan').style.visibility = "hidden";}
		if ( SecondPrgCharge > 0  ) 
		{ 
		document.getElementById("SecondPrgCharge").innerHTML=(SecondPrgCharge).toFixed(2);
		document.getElementById("SecondPrgChargeHidden").value=(SecondPrgCharge).toFixed(2);
		document.getElementById('SecondPrgChargeSpan').style.visibility = "visible";  
		} else { document.getElementById("SecondPrgCharge").innerHTML=0; document.getElementById("SecondPrgChargeHidden").value=(0).toFixed(2); document.getElementById('SecondPrgChargeSpan').style.visibility = "hidden";}
	}
	
	document.getElementById("Total").innerHTML=(PricewithFeight).toFixed(2);
	document.getElementById("GST").innerHTML=(PricewithFeight*0.15).toFixed(2);
	document.getElementById("TotalGST").innerHTML=((PricewithFeight*0.15)+PricewithFeight).toFixed(2);

	}
	else {popup("Material '"+itemMaterial+"' is nolonger available!",150,350,1);}
} //end


//SetLeadTime();
ExcDate(SetManDate());
Checkdate(document.getElementById('Dispdate').value,false);
//ExcDate();

} //end of function Calculations





function myRound(value) {
    return Math.round(value);
}



function SetSpecialTypeInputs(LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");
var PanelType = document.getElementById("PanelType"+LineNumber).value;
var itemMaterial = document.getElementById("Material"+LineNumber).value;	
var TopFaciaBox = document.getElementById("TopFacWidth");
var LeftFaciaBox = document.getElementById("LeftFacWidth");
var RightFaciaBox = document.getElementById("RigthFacWidth");
var PNCPartID = document.getElementById("PNCPartID"+LineNumber).value;
	
	if (PanelType == 'Roller Surround' | PanelType == 'Glass Frame' | PanelType == 'Profile Handle')
	{document.getElementById("AdditEdgeAngleDiv").style.display = "inherit";}
	else
	{
	document.getElementById("AdditEdgeAngleDiv").style.display = "none";
	document.getElementById("ToggleAngleEdgesCheck").checked = false;
	}
	
	
	if (PanelType == 'Builtup Panel' )
	{
	document.getElementById("BuiltupInputsDiv").style.display = "inherit";
	//var ReturnValue = GetExtraParValue('Return',LineDivID);
	var ReturnValue = SetExtraParInputValue('Return',LineDivID,'Full');
	if (ReturnValue == 'Full') {document.getElementById("Return").value = ReturnValue;} else {document.getElementById("Return").value = ReturnValue+'mm';}
	document.getElementById("ReturnSelect").selectedIndex = -1;
	}
	else
	{
	document.getElementById("BuiltupInputsDiv").style.display = "none";
	}


	document.getElementById("TopFacWidthL").style.display = "None";
	document.getElementById("LeftFacWidthL").style.display = "None";
	document.getElementById("RigthFacWidthL").style.display = "None";

	if (PanelType == 'Roller Surround') 
	{
		if (PanelType == 'Roller Surround' )
		{
			if (PNCPartID == "")
			{
			document.getElementById("Description"+LineNumber).value = "Roller Door Surround"; 
			ChangeDesc(LineDivID);
			}
		document.getElementById("TopFacWidthL").style.display = "inherit";
		document.getElementById("LeftFacWidthL").style.display = "inherit";
		document.getElementById("RigthFacWidthL").style.display = "inherit";
		TopFaciaBox.value = SetExtraParInputValue('TopFacWidth',LineDivID,58); //GetExtraParValue('TopFacWidth',LineDivID);
		LeftFaciaBox.value = SetExtraParInputValue('LeftFacWidth',LineDivID,46); //GetExtraParValue('LeftFacWidth',LineDivID);
		RightFaciaBox.value = SetExtraParInputValue('RigthFacWidth',LineDivID,46); //GetExtraParValue('RigthFacWidth',LineDivID);
		}
		//if ( PanelType == 'Glass Frame' ) { document.getElementById("Description"+LineNumber).value = "Glass Frame";}
	}

	document.getElementById("GlassFrameMarginsDiv").style.display = "none";	

	if (PanelType == 'Glass Frame' & itemMaterial.indexOf(HDFPrefix) == -1)
	{
		var MatThick = GetMatThickFromName(itemMaterial);
		document.getElementById("GlassFrameMarginsDiv").style.display = "inherit";	
		
		SetExtraParInputValue('GFMTop',LineDivID,60);
		SetExtraParInputValue('GFMLeft',LineDivID,60);
		SetExtraParInputValue('GFMRight',LineDivID,60);
		SetExtraParInputValue('GFMBot',LineDivID,60);
		SetExtraParInputValue('GFRD',LineDivID,MatThick-9);
		SetExtraParInputValue('GFRW',LineDivID,10);
	}


	document.getElementById("LeftEdgeAngleDiv").style.display = "none";
	document.getElementById("RightEdgeAngleDiv").style.display = "none";
	document.getElementById("TopEdgeAngleDiv").style.display = "none";
	document.getElementById("BotEdgeAngleDiv").style.display = "none";

	//if (PanelType == 'Angle Edge' )
	//{
	var Leftedge = document.getElementById("Leftedge"+LineNumber).value;
	var Rightedge = document.getElementById("Rightedge"+LineNumber).value;
	var Topedge= document.getElementById("Topedge"+LineNumber).value;
	var Botedge = document.getElementById("Bottomedge"+LineNumber).value;	
	
		/* if (Leftedge == 'AngleEdge' & (Topedge == 'AngleEdge' | Botedge == 'AngleEdge') | Rightedge == 'AngleEdge' & (Topedge == 'AngleEdge' | Botedge == 'AngleEdge') )
		{
		
		}
		else
		{ */
		if (Leftedge == 'AngleEdge') 
		{
			document.getElementById("LeftEdgeAngleDiv").style.display = "inherit";
			document.getElementById("LeftEdgeAngle").value = GetExtraParValue('LeftEdgeAngle',LineDivID);
			document.getElementById("LeftEdgeAngleList").selectedIndex = -1;
			if (document.getElementById("LeftEdgeAngle").value == '') {document.getElementById("LeftEdgeAngle").value = 45;CheckExtraPar("LeftEdgeAngle",true);}
		}
		if (Rightedge == 'AngleEdge') 
		{
			document.getElementById("RightEdgeAngleDiv").style.display = "inherit";
			document.getElementById("RightEdgeAngle").value = GetExtraParValue('RightEdgeAngle',LineDivID);
			document.getElementById("RightEdgeAngleList").selectedIndex = -1;
			if (document.getElementById("RightEdgeAngle").value == '') {document.getElementById("RightEdgeAngle").value = 45;CheckExtraPar("RightEdgeAngle",true);}
		}
		if (Topedge == 'AngleEdge') 
		{
			document.getElementById("TopEdgeAngleDiv").style.display = "inherit";
			document.getElementById("TopEdgeAngle").value = GetExtraParValue('TopEdgeAngle',LineDivID);
			document.getElementById("TopEdgeAngleList").selectedIndex = -1;
			if (document.getElementById("TopEdgeAngle").value == '') {document.getElementById("TopEdgeAngle").value = 45;CheckExtraPar("TopEdgeAngle",true);}
		}
		if (Botedge == 'AngleEdge') 
		{
			document.getElementById("BotEdgeAngleDiv").style.display = "inherit";
			document.getElementById("BotEdgeAngle").value = GetExtraParValue('BotEdgeAngle',LineDivID);
			document.getElementById("BotEdgeAngleList").selectedIndex = -1;
			if (document.getElementById("BotEdgeAngle").value == '') {	document.getElementById("BotEdgeAngle").value = 45;CheckExtraPar("BotEdgeAngle",true);}
		}
		//}
		
	
	//}
	
	document.getElementById("HDFProfileQtyDiv").style.display = "none";	
	document.getElementById("HDFRailWidthDiv").style.display = "none";
	document.getElementById("HDFBaseDoorHeightDiv").style.display = "none";
	document.getElementById("HDFExtendEdgesDiv").style.display = "none";
	document.getElementById("FlatWidthDiv").style.display = "none";
	document.getElementById("VGrooveSpacingDiv").style.display = "none";
	document.getElementById("MaxScallopWidthDiv").style.display = "none";
	document.getElementById("VGrooveSpacingCalcDiv").style.display = "none";	
	document.getElementById("HDFPocketDepthDiv").style.display = "none";
	document.getElementById("HDFGrooveWidthDiv").style.display = "none";
	document.getElementById("HDFGrooveDepthDiv").style.display = "none";
	document.getElementById("FlatWidthCalcDiv").style.display = "none";
	document.getElementById("ScallopDepthCalcDiv").style.display = "none";
	
	if (itemMaterial.indexOf(HDFPrefix) > -1) 
	{
		var ProfileName = GetHDFProfileName(itemMaterial);
		var ELvalue = 0;
		var HHDItemIndex = FindItem(ProfileName,HDFDoorSpecData,'Profile');
		if (HHDItemIndex > -1)
		{
		var Framed = HDFDoorSpecData[HHDItemIndex].Frame;
		var UserPocketDepth = HDFDoorSpecData[HHDItemIndex].UserPocketDepth;
		
		if (Framed) {document.getElementById("HDFProfileQtyDiv").style.display = "inherit";}
		else {document.getElementById("HDFProfileQtyDiv").style.display = "none";}
		
		if (UserPocketDepth > 0) 
		{
			document.getElementById("HDFPocketDepthDiv").style.display = "inherit";
			SetExtraParInputValue('PKDepth',LineDivID,UserPocketDepth);		
		}
		

		var VGrooves = HDFDoorSpecData[HHDItemIndex].VGrooves;
		
		if (VGrooves != undefined)
		{
			if (VGrooves.UserSpacing) 
			{
				document.getElementById("VGrooveSpacingDiv").style.display = "inherit";
				SetExtraParInputValue('VGSpacing',LineDivID,VGrooves.MaxSpacing);
			}
			if (VGrooves.MaxScallopWidth) 
			{
				document.getElementById("MaxScallopWidthDiv").style.display = "inherit";
				SetExtraParInputValue('MaxScallopW',LineDivID,VGrooves.MaxScallopWidth);
			}			
			if (VGrooves.FlatWidth > 0) 
			{
				document.getElementById("FlatWidthDiv").style.display = "inherit";
				SetExtraParInputValue('FlatW',LineDivID,VGrooves.FlatWidth);
			}
			if (VGrooves.GrooveWidth > 0) 
			{
				document.getElementById("HDFGrooveWidthDiv").style.display = "inherit";
				SetExtraParInputValue('GrooveW',LineDivID,VGrooves.GrooveWidth);
			}			
			if (VGrooves.GrooveDepth > 0) 
			{
				document.getElementById("HDFGrooveDepthDiv").style.display = "inherit";
				SetExtraParInputValue('GrooveD',LineDivID,VGrooves.GrooveDepth);
			}

			document.getElementById("VGrooveSpacingCalcDiv").style.display = "inherit";
		}
		
		document.getElementById("HDFExtendEdgesDiv").style.display = "inherit";

		var FrameMargin = parseFloat(HDFDoorSpecData[HHDItemIndex].ProfileMargin);
		
		var ProfileQty = SetExtraParInputValue('ProfileQty',LineDivID,"1");
		
		SetExtraParInputValue('RailW',LineDivID,(FrameMargin*2)+2);
		SetExtraParInputValue('BDH',LineDivID,720);
		
		var TEL = 0;
		if (HDFDoorSpecData[HHDItemIndex].hasOwnProperty("TEL")) {TEL = HDFDoorSpecData[HHDItemIndex].TEL;}
		
		ELvalue = parseFloat(SetExtraParInputValue('TEL',LineDivID,TEL));
		document.getElementById("TELCalc").innerHTML = FrameMargin+ELvalue;
		ELvalue = parseFloat(SetExtraParInputValue('LEL',LineDivID,0));
		document.getElementById("LELCalc").innerHTML = FrameMargin+ELvalue;
		ELvalue = parseFloat(SetExtraParInputValue('REL',LineDivID,0));
		document.getElementById("RELCalc").innerHTML = FrameMargin+ELvalue;
		ELvalue = parseFloat(SetExtraParInputValue('BEL',LineDivID,0));
		document.getElementById("BELCalc").innerHTML = FrameMargin+ELvalue;	

		HDFProfileQtyInputsVisibility(ProfileQty);
		
		}
	}

	
		
} //SetSpecialTypeInputs END

function SetExtraParInputValue(InputID,LineDivID,DefaultValue)
{
var ParValue = GetExtraParValue(InputID,LineDivID);
if (ParValue != '') {document.getElementById(InputID).value = ParValue;} else {document.getElementById(InputID).value = DefaultValue;}
return document.getElementById(InputID).value;	
}

function GetHDFProfileName(MatName)
{
var NewText = '';
var PrefixLength = 0;
var FlexiPos = MatName.indexOf('FLEXI PANEL');

	if (MatName.substr(0,HDFPrefix.length+3) == HDFPrefix+' 1F') {PrefixLength = HDFPrefix.length+5;}
	else if (MatName.substr(0,HDFPrefix.length) == HDFPrefix)  {PrefixLength = HDFPrefix.length+2;}
	
	if (PrefixLength > 0)
	{
		for (var i = PrefixLength-1; i < MatName.length; i++) 
		{
			//alert(MatName[i]);	
		   
			if ( !isNaN(parseInt(MatName[i])) || FlexiPos > -1 & i == FlexiPos)
			{
			NewText = NewText.substr(0,NewText.length-1);
			break;
			}
			else
			{
			NewText = NewText+MatName[i];
			}
		}
	}
	return NewText;
}

function SelectLine(LineDivID)
{
	document.getElementById("selectedline").innerHTML = LineDivID;
	
	if (LastSelectedLineID != "") 
	{ 
	//document.getElementById(LastSelectedLineID).style.backgroundColor = "initial";
	//document.getElementById(LastSelectedLineID).style.boxShadow = "initial";
	//document.getElementById(LastSelectedLineID).className = document.getElementById(LastSelectedLineID).className.replace(/\SelectedLine\b/g, "");
		var ChildInputItems = document.getElementById(LastSelectedLineID).getElementsByClassName("Inputlines");
		for (var i = 0; i<ChildInputItems.length; i++)
		{
		//ChildInputItems[i].className = "Inputlines";
		ChildInputItems[i].style.boxShadow = "initial";		
		}

	}
	//document.getElementById(LastSelectedLineID).style.border = "initial";
	var LineDiv = document.getElementById(LineDivID);
	//LineDiv.style.backgroundColor = "#fc7e81";
	
	/* var arr;
	
	  arr = LineDiv.className.split(" ");
	  if (arr.indexOf('SelectedLine') == -1) {
		LineDiv.className += " " + 'SelectedLine';
	} */
	
	var ChildInputItems = LineDiv.getElementsByClassName("Inputlines");
	for (var i = 0; i<ChildInputItems.length; i++)
	{
	//ChildInputItems[i].className = "Inputlines SelectedLine";
	ChildInputItems[i].style.boxShadow = "rgba(200, 0, 0, 0.7) 2px 2px 2px ";	
	}
	
	//document.getElementById(LineNumber).style.borderStyle = "solid";
	//document.getElementById(LineNumber).style.borderColor = "red";
	//document.getElementById(LineNumber).style.border = "1px solid red";
	
	

	SetSpecialTypeInputs(LineDivID); 
	
	DrawPreview('PreviewBox','PreviewBox2',LineDivID); 
	
	AddParametersToDiv(PartJSON,document.getElementById("MainPageParamsDiv"));

	LastSelectedLineID = LineDivID;
}

function DrawAngleEdgePreview(AngleInput)
{
	var LineDiv = document.getElementById(document.getElementById("selectedline").innerHTML);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");
	var canvas = document.getElementById("PreviewBox2");	
	var PlanBoxHeight=parseFloat(canvas.height)-1;
	var PlanBoxWidth=parseFloat(canvas.width)-1;
	var PlanBox = canvas.getContext("2d");
	var AngleValue = 0;
	var LineMaterial = document.getElementById("Material"+LineNumber).value;
	var NumberPatt = /[0-9]+/;
	var MatThick = GetMatThickFromName(LineMaterial); //parseFloat(LineMaterial.match(NumberPatt)); 
	
	var RegExp = /[\xB0mm]/g;
	
	if (document.getElementById("LeftEdgeAngleDiv").style.display == "none") {var LeftEdgeAngle = 0 ;}
	else {var LeftEdgeAngle = document.getElementById("LeftEdgeAngle").value.replace(RegExp,'');}
	if (document.getElementById("RightEdgeAngleDiv").style.display == "none") {var RightEdgeAngle = 0 ;}
	else {var RightEdgeAngle = document.getElementById("RightEdgeAngle").value.replace(RegExp,'');}
	if (document.getElementById("TopEdgeAngleDiv").style.display == "none") {var TopEdgeAngle = 0 ;}
	else {var TopEdgeAngle = document.getElementById("TopEdgeAngle").value.replace(RegExp,'');}
	if (document.getElementById("BotEdgeAngleDiv").style.display == "none") {var BotEdgeAngle = 0 ;}
	else {var BotEdgeAngle = document.getElementById("BotEdgeAngle").value.replace(RegExp,'');}
	

	if (AngleInput.id == 'LeftEdgeAngleList' | AngleInput.id == 'LeftEdgeAngle' ) {AngleValue = LeftEdgeAngle;}
	if (AngleInput.id == 'TopEdgeAngleList' | AngleInput.id == 'TopEdgeAngle' ) {AngleValue = TopEdgeAngle;}
	if (AngleInput.id == 'RightEdgeAngleList' | AngleInput.id == 'RightEdgeAngle') {AngleValue = RightEdgeAngle;} 
	if (AngleInput.id == 'BotEdgeAngleList' | AngleInput.id == 'BotEdgeAngle') {AngleValue = BotEdgeAngle;}
	
	var BotMargin = 15;
	var ViewRatio=PlanBoxHeight/(MatThick+BotMargin);	
	
	PlanBox.save();
	// Use the identity matrix while clearing the canvas
	PlanBox.setTransform(1, 0, 0, 1, 0, 0);
	PlanBox.clearRect(0, 0, canvas.width, canvas.height);
	// Restore the transform
	PlanBox.restore();
	
	var LHAngleXPos = parseFloat(Math.tan(AngleValue*degrees)*(MatThick*ViewRatio));

	
	//alert(LHAngleXPos + " " + ViewRatio);
	
	PlanBox.fillStyle="Peru";
	PlanBox.strokeStyle="black"; PlanBox.lineWidth=1;
	PlanBox.beginPath();
	if (LHAngleXPos > 0) {PlanBox.moveTo(LHAngleXPos,PlanBoxHeight-(MatThick*ViewRatio)-BotMargin);} else {PlanBox.moveTo(0,PlanBoxHeight-(MatThick*ViewRatio)-BotMargin);}
	if (LHAngleXPos < 0) {PlanBox.lineTo(-LHAngleXPos,PlanBoxHeight-BotMargin);} else {PlanBox.lineTo(0,PlanBoxHeight-BotMargin);}
	PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-BotMargin);
	PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-(MatThick*ViewRatio)-BotMargin);
	PlanBox.closePath();
	PlanBox.fill();
	PlanBox.stroke();
	
	PlanBox.font="15px Arial";
	PlanBox.fillStyle = 'black';
	
	PlanBox.fillText(AngleValue+'\xB0',Math.abs(LHAngleXPos),PlanBoxHeight-((MatThick*ViewRatio)/2)-BotMargin+4);
	PlanBox.fillText('Face',PlanBoxWidth/2-10,PlanBoxHeight);
	
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

function ChangePrevFaceView()
{
	DrawPreview('PreviewBox','PreviewBox2',document.getElementById("selectedline").innerHTML);
}

function DrawDimension(Cnv,DimText,FontH,StartX,StartY,EndX,EndY)
{
	const DimOffset = 5;
	const HalfStrL = 10;
	Cnv.setLineDash([]);	
	
	var TextW = Cnv.measureText(DimText).width;
	var DimAngle = Math.atan2( (StartY-EndY),(StartX-EndX) );
	var DimLength = Math.sqrt( ( (StartX-EndX)*(StartX-EndX) )+( (StartY-EndY)*(StartY-EndY) ) );	
	
	var StartXDimCnt = StartX+Math.sin(DimAngle)*(DimOffset+HalfStrL);
	var StartYDimCnt = StartY-Math.cos(DimAngle)*(DimOffset+HalfStrL);
	var EndXDimCnt = EndX+Math.sin(DimAngle)*(DimOffset+HalfStrL);
	var EndYDimCnt = EndY-Math.cos(DimAngle)*(DimOffset+HalfStrL);	

	var VirtTextSpace = FontH+5;
	var HozTextSpace = TextW+5;

	var AngleDegs = Math.abs(DimAngle*Rad % 360);

	if (AngleDegs > 45 & AngleDegs < 135 | AngleDegs > 225 & AngleDegs < 315)
	{var SpcForDimText = FontH+5;} else {var SpcForDimText = TextW+5;}


	var DimLineLength = (DimLength-SpcForDimText)/2;
	
	//alert("DimAngle="+ DimAngle + " DimLength=" + DimLength);
	
	Cnv.beginPath();
	Cnv.moveTo(StartXDimCnt-Math.sin(DimAngle)*HalfStrL,StartYDimCnt+Math.cos(DimAngle)*HalfStrL); 
	Cnv.lineTo(StartXDimCnt+Math.sin(DimAngle)*HalfStrL,StartYDimCnt-Math.cos(DimAngle)*HalfStrL);
	Cnv.stroke();
	
	Cnv.beginPath();
	Cnv.moveTo(EndXDimCnt-Math.sin(DimAngle)*HalfStrL,EndYDimCnt+Math.cos(DimAngle)*HalfStrL); 
	Cnv.lineTo(EndXDimCnt+Math.sin(DimAngle)*HalfStrL,EndYDimCnt-Math.cos(DimAngle)*HalfStrL);
	Cnv.stroke();
	
	Cnv.font=FontH+"px Arial";
	Cnv.fillStyle = 'black';
	Cnv.textBaseline = "ideographic";

	
	//alert("DimLength="+ DimLength + " TextH=" + TextH);

	var XDimCnt = StartXDimCnt-Math.cos(DimAngle)*(DimLength/2);
	var YDimCnt = StartYDimCnt-Math.sin(DimAngle)*(DimLength/2);


	if (DimLength > SpcForDimText)
	{Cnv.fillText(DimText,XDimCnt-(TextW/2),YDimCnt+(FontH/2));}
	else
	{
		var SmallClear = HalfStrL*2;
		DimLineLength = DimLength/2;
		Cnv.fillText(DimText,XDimCnt+Math.sin(DimAngle)*SmallClear-(TextW/2),YDimCnt-Math.cos(DimAngle)*SmallClear+(FontH/2));
	}

	Cnv.beginPath();
	Cnv.moveTo(StartXDimCnt,StartYDimCnt); 
	Cnv.lineTo(StartXDimCnt-Math.cos(DimAngle)*DimLineLength,StartYDimCnt-Math.sin(DimAngle)*DimLineLength);
	Cnv.stroke();

	Cnv.beginPath();
	Cnv.moveTo(EndXDimCnt,EndYDimCnt); 
	Cnv.lineTo(EndXDimCnt+Math.cos(DimAngle)*DimLineLength,EndYDimCnt+Math.sin(DimAngle)*DimLineLength);
	Cnv.stroke();		
}


function DrawPreview(canvasId,canvas2Id,LineDivID)
{	
//alert(typeof(LineNumber));
	if (LineDivID != "")
	{
	var LineDiv = document.getElementById(LineDivID);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");			
	var itemMaterial = document.getElementById("Material"+LineNumber).value;	
	var MatIndex = FindItem(itemMaterial,Materials,"Name");	
	
		if (MatIndex > -1)
		{

			
		var PanelType = document.getElementById("PanelType"+LineNumber).value;
		var itemQty = parseFloat(document.getElementById("Qty"+LineNumber).value);

		var LengthNode = parseFloat(document.getElementById("Length"+LineNumber).value);
		var WidthNode = parseFloat(document.getElementById("Width"+LineNumber).value);
		var LeftedgeNode = document.getElementById("Leftedge"+LineNumber).value;
		var RightedgeNode = document.getElementById("Rightedge"+LineNumber).value;
		var TopedgeNode = document.getElementById("Topedge"+LineNumber).value;
		var BotedgeNode = document.getElementById("Bottomedge"+LineNumber).value;
		var ExtraParamNode = document.getElementById("ExtraPar"+LineNumber);
		var TopFaciaBox = document.getElementById("TopFacWidth");
		var LeftFaciaBox = document.getElementById("LeftFacWidth");
		var RightFaciaBox = document.getElementById("RigthFacWidth");
		var canvas = document.getElementById(canvasId);
		var canvas2 = document.getElementById(canvas2Id);
		var RecHeight=0;
		var RecWidth=0;
		var framewidth=0;
		var RollerRight=0;
		var RollerLeft=0;
		var RollerTOp=0;
		var LinewidthCalc=0;
		var Shortstring;
		var CarPos = 0;
		var ViewBoxHeight=parseFloat(canvas.height)-1;
		var ViewBoxWidth=parseFloat(canvas.width)-1;
		var ViewBoxX=0;
		var PanelThick=0;
		var IsPartShapeEditor = false;

		var PartDesc = document.getElementById("Description"+LineNumber).value;
		var PartUnitRef = document.getElementById("UnitRef"+LineNumber).value;
		if (PartUnitRef != '' ) {PartUnitRef = "Unit "+PartUnitRef;}

						
						
				
		var DrawingFace = ViewFace;
		if (canvasId.indexOf("PartCanvas") > -1) {DrawingFace = 'Front';}
		if (canvasId == 'PreviewBox' ) 
		{
			if (document.getElementById("PrevFaceRadio").checked) {DrawingFace = 'Front';}
			else {DrawingFace = 'Back';}
		}	


		/* if ( WidthNode < 350 ) { 
		canvas2.width = 250;
		if ( WidthNode < 270 ) { canvas2.width = 150; }
		if ( WidthNode < 150 ) { canvas2.width = 100; }
		}else { canvas2.width = 331;} */


		var PlanBoxHeight=parseFloat(canvas2.height)-1;
		var PlanBoxWidth=parseFloat(canvas2.width)-1;


			/* if (document.getElementById(LineNumber).childNodes.item(0).value == 'Builtup Panel' )
			{
			ViewBoxHeight=parseFloat(canvas.height)-61;
			ViewBoxWidth=parseFloat(canvas.width)-61;
			ViewBoxX=25;
			} */

		var Edge = canvas.getContext("2d");
		var PlanBox = canvas2.getContext("2d");
		//Edge.translate(-0.5, -0.5)


		Edge.save();
		// Use the identity matrix while clearing the canvas
		Edge.setTransform(1, 0, 0, 1, 0, 0);
		Edge.clearRect(0, 0, canvas.width, canvas.height);
		// Restore the transform
		Edge.restore();

		PlanBox.save();
		// Use the identity matrix while clearing the canvas
		PlanBox.setTransform(1, 0, 0, 1, 0, 0);
		PlanBox.clearRect(0, 0, canvas2.width, canvas2.height);
		// Restore the transform
		PlanBox.restore();


		if (canvasId == 'PreviewBox' | canvasId.indexOf("PartCanvas") > -1)
		{
			PartLength = LengthNode;
			PartWidth = WidthNode;
			ViewXOrigin=canvas.width/2;
			ViewYOrigin=canvas.height/2;
		  if (WidthNode > LengthNode) { ViewRatio=ViewBoxWidth/WidthNode; } else { ViewRatio=ViewBoxHeight/LengthNode;}	
		}


		var RecY=0;
		var RecX=0;


		RecHeight=myRound(LengthNode*ViewRatio);
		RecWidth=myRound(WidthNode*ViewRatio);
		RecX=ViewXOrigin-(RecWidth/2);
		RecY=ViewYOrigin-(RecHeight/2)+0.5;
		LinewidthCalc=ViewRatio;
		RollerRight=myRound(parseFloat(RightFaciaBox.value)*ViewRatio);
		RollerLeft=myRound(parseFloat(LeftFaciaBox.value)*ViewRatio);
		RollerTop=myRound(parseFloat(TopFaciaBox.value)*ViewRatio);
		Edge.setLineDash([]);

		var ClashingStoke = "Red";
		if (itemMaterial != '' ) 
		{
		var PanelColour = Materials[FindItem(itemMaterial,Materials,"Name")].colour;
		if (PanelColour == '' ) {Edge.fillStyle = "#FFFFFF";} else {Edge.fillStyle = PanelColour;} //if (PanelColour == '' ) {PanelColour = "rgb(255,255,255)";} 
		}

		switch(PanelColour) {
			case 'rgb(120,23,31)': ClashingStoke = "#00FF00"; break;
			case 'rgb(255,78,0)': ClashingStoke = "#00FF00"; break;     
		}
		
		if (RGBIsDark(PanelColour) == true ) 
		{
		var DefOpStroke="Gainsboro";
		var DefSelRecStroke="rgb(164,239,67)";
		var HiddenOpStroke="#caed9d";
		var ManualClashingStoke = "Cyan";
		} 
		else 
		{
		var DefOpStroke="black";
		var DefSelRecStroke="#464646";
		var HiddenOpStroke="#969696";
		var ManualClashingStoke = "Gold";
		}

		var MaterialThick = GetMatThickFromName(itemMaterial);
		var LineJSON = document.getElementById("LineJSON"+LineNumber).value;

		if (canvasId != 'PartEditCanvas') {if (LineJSON == '') {PartJSON = {"Operations" :[] , "Vectors" :[]}} else {PartJSON = JSON.parse(LineJSON);}}
		
		

		if (ModeSelection != 'PartShape' & canvasId == 'PartEditCanvas' & PartJSON.Vectors.length == 0 | canvasId == 'PreviewBox' & PartJSON.Vectors.length == 0 | canvasId.indexOf("PartCanvas") > -1 & PartJSON.Vectors.length == 0)
		{

			Edge.fillRect(RecX,RecY,RecWidth,RecHeight);
			
			Edge.strokeStyle="black"; Edge.lineWidth=1;
			if (LeftedgeNode != 'None') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=3; } 
			if (LeftedgeNode == '45Profile') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=10; }

			Edge.beginPath();
			if (DrawingFace == 'Front') {Edge.moveTo(RecX,RecHeight+RecY); Edge.lineTo(RecX,RecY);}
			else {Edge.moveTo(RecX+RecWidth,RecY); Edge.lineTo(RecX+RecWidth,RecHeight+RecY);}
			Edge.stroke();

			Edge.strokeStyle="black"; Edge.lineWidth=1;
			if (TopedgeNode != 'None') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=3; }
			if (TopedgeNode == '45Profile') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=10; }

			Edge.beginPath();
			Edge.moveTo(RecX,RecY);
			Edge.lineTo(RecX+RecWidth,RecY);
			Edge.stroke();

			Edge.strokeStyle="black"; Edge.lineWidth=1;
			if (RightedgeNode != 'None') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=3; } 
			if (RightedgeNode == '45Profile') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=10; } 

			Edge.beginPath();
			if (DrawingFace == 'Front') {Edge.moveTo(RecX+RecWidth,RecY); Edge.lineTo(RecX+RecWidth,RecHeight+RecY);}
			else {Edge.moveTo(RecX,RecHeight+RecY); Edge.lineTo(RecX,RecY);}
			Edge.stroke();

			Edge.strokeStyle="black"; Edge.lineWidth=1;
			if (BotedgeNode != 'None') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=3; }
			if (BotedgeNode == '45Profile') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=10; }

			Edge.beginPath();
			if (DrawingFace == 'Front') {Edge.moveTo(RecX+RecWidth,RecHeight+RecY);} else {Edge.moveTo(RecX,RecHeight+RecY);}
			if (PanelType == 'Roller Surround' ) 
			{
				if (DrawingFace == 'Front') {Edge.lineTo(RecX+RecWidth-RollerRight,RecHeight+RecY);}
				else {Edge.lineTo(RecX+RollerRight,RecHeight+RecY);}	
			} 
			else { if (DrawingFace == 'Front') {Edge.lineTo(RecX,RecHeight+RecY);} else {Edge.lineTo(RecX+RecWidth,RecHeight+RecY);} }
			Edge.stroke();
			
				
		
		}
		
		if (PanelType == 'Angle Edge' | document.getElementById("ToggleAngleEdgesCheck").checked)
		{
			if (WidthNode > LengthNode) {var AngleSideMargin = 0;var AngleBotTopMargin = (ViewBoxHeight-(LengthNode*ViewRatio))/2;}
			else {var AngleSideMargin = (ViewBoxWidth-(WidthNode*ViewRatio))/2;var AngleBotTopMargin = 0;}

			var LeftAngle = GetExtraParValue('LeftEdgeAngle',LineDivID);
			var RightAngle = GetExtraParValue('RightEdgeAngle',LineDivID);
			var TopAngle = GetExtraParValue('TopEdgeAngle',LineDivID);
			var BotAngle = GetExtraParValue('BotEdgeAngle',LineDivID);
			
			var TextHeight = 7;
			Edge.font=(TextHeight*2)+"px Arial";
			Edge.fillStyle = DefSelRecStroke;
			
			var LeftSideAdj = 0;
			if (AngleSideMargin > Edge.measureText(LeftAngle).width+10) {LeftSideAdj = Edge.measureText(LeftAngle).width+10;}
			var RightSideAdj = 0;
			if (AngleSideMargin > Edge.measureText(RightAngle).width+10) {RightSideAdj = Edge.measureText(RightAngle).width+10;}
			
			var TopSideAdj = 0;
			if (AngleBotTopMargin > TextHeight*2+10) {TopSideAdj = TextHeight*2+10;}
			var BotSideAdj = 0;
			if (AngleBotTopMargin > TextHeight*2+10) {BotSideAdj = TextHeight*2+10;}
			
			if (DrawingFace == 'Front')
			{
				if (LeftedgeNode == 'AngleEdge') {Edge.fillText(LeftAngle,RecX+5-LeftSideAdj,RecY+TextHeight+RecHeight/2);}
				if (RightedgeNode == 'AngleEdge') {Edge.fillText(RightAngle,RecX+RecWidth-5+RightSideAdj-Edge.measureText(RightAngle).width,RecY+TextHeight+RecHeight/2);}
			}
			else
			{
				if (LeftedgeNode == 'AngleEdge') {Edge.fillText(LeftAngle,RecX+RecWidth-5+LeftSideAdj-Edge.measureText(LeftAngle).width,RecY+TextHeight+RecHeight/2);}
				if (RightedgeNode == 'AngleEdge') {Edge.fillText(RightAngle,RecX+5-RightSideAdj,RecY+TextHeight+RecHeight/2);}	
			}
			if (TopedgeNode == 'AngleEdge') {Edge.fillText(TopAngle,RecX-Edge.measureText(TopAngle).width/2+RecWidth/2,RecY+TextHeight+10-TopSideAdj);}
			if (BotedgeNode == 'AngleEdge') {Edge.fillText(BotAngle,RecX-Edge.measureText(BotAngle).width/2+RecWidth/2,RecY+RecHeight-10+BotSideAdj);}
			Edge.fillStyle = "#FFFFFF";
			
		}

		if (ModeSelection == 'PartShape' & canvasId == 'PartEditCanvas')
		{
			Edge.setLineDash([5, 5]);
			Edge.strokeStyle="black"
			Edge.strokeRect(RecX,RecY,RecWidth,RecHeight);	
			Edge.setLineDash([]);
			IsPartShapeEditor = true;	
		}
			
		//alert(RGBIsDark(PanelColour));


		Edge.lineWidth=1;

				var MoveOffsetX = 0;
				var MoveOffsetY = 0;
				
				if (PartJSON.Vectors.length > 0)
				{
				var ClashingEdges = [];
					//if (canvasId == 'PartEditCanvas' & ModeSelection == 'PartShape' ) {var PartShapingMode = true;} else {var PartShapingMode = false;}
				

					if (PanelColour == '' ) {Edge.fillStyle = "#FFFFFF";} else {Edge.fillStyle = PanelColour;}	

					if (IsPartShapeEditor == false) {Edge.beginPath();}

					for (var i = 0; i<PartJSON.Vectors.length; i++)
					{ 
				
					if (canvasId == 'PartEditCanvas') {Edge.lineWidth=2;}
					if (IsPartShapeEditor) {Edge.lineWidth=3;}
					Edge.strokeStyle="Black";
					
					if (MoveObject.InMove == true & IsItemInList(i,SelectedObjects.Items) & ModeSelection == 'PartShape') 
					{
					MoveOffsetX = (MoveObject.X-ActiveMouseX)*ViewRatio;	
					MoveOffsetY = (MoveObject.Y-ActiveMouseY)*ViewRatio;	
					}
					else {MoveOffsetX = 0;MoveOffsetY = 0;}
					
					var OrigVectSX = CalcOutputValue(PartJSON.Vectors[i].SX);
					var OrigVectSY = CalcOutputValue(PartJSON.Vectors[i].SY);
					var OrigVectEX = CalcOutputValue(PartJSON.Vectors[i].EX);
					var OrigVectEY = CalcOutputValue(PartJSON.Vectors[i].EY);
					
					if (DrawingFace!= 'Front') {var VectSX = RecX - MoveOffsetX + RecWidth - Math.round((OrigVectSX)*ViewRatio);}
					else {var VectSX = RecX - MoveOffsetX + Math.round((OrigVectSX)*ViewRatio);}
					var  VectSY = RecY + MoveOffsetY + RecHeight - Math.round((OrigVectSY)*ViewRatio);
					
					if (DrawingFace!= 'Front') {var VectEX = RecX - MoveOffsetX + RecWidth - Math.round((OrigVectEX)*ViewRatio);}
					else {var VectEX = RecX - MoveOffsetX + Math.round((OrigVectEX)*ViewRatio);}
					var  VectEY = RecY + MoveOffsetY + RecHeight - Math.round((OrigVectEY)*ViewRatio);
					
					//Edge.font="30px Arial";
					//Edge.fillStyle = 'black';
					//Edge.fillText(i,VectSX,VectSY); 
					
					if (PanelColour == '' ) {Edge.fillStyle = "#FFFFFF";} else {Edge.fillStyle = PanelColour;}	
						
						switch (PartJSON.Vectors[i].Type)
						{
						case 'Line':
								if (IsPartShapeEditor) {Edge.beginPath();}	
								if (i==0 | IsPartShapeEditor) {Edge.moveTo(VectSX,VectSY);}										
								Edge.lineTo(VectEX,VectEY);
								if (IsPartShapeEditor) {Edge.stroke();}
								
									if (PartJSON.Vectors[i].Edge != 'N') 
									{
									ClashingEdges.push({"Type":"Line","SX":VectSX,"SY":VectSY,"EX":VectEX,"EY":VectEY,"Edge":PartJSON.Vectors[i].Edge});
									}
								
								break;
						case 'Arc':
								var OrigVectCX = CalcOutputValue(PartJSON.Vectors[i].CX);
								var OrigVectCY = CalcOutputValue(PartJSON.Vectors[i].CY);
								
								
								if (DrawingFace!= 'Front') {var VectCX = RecX - MoveOffsetX + RecWidth - Math.round((OrigVectCX)*ViewRatio);}
								else {var VectCX = RecX - MoveOffsetX + Math.round((OrigVectCX)*ViewRatio);}
								var  VectCY = RecY + MoveOffsetY + RecHeight - Math.round((OrigVectCY)*ViewRatio);
								
		
								var StartAngle = Math.atan2( (VectSY-VectCY),(VectSX-VectCX) );
								var EndAngle = Math.atan2( (VectEY-VectCY),(VectEX-VectCX) );
		
								//document.getElementById("TestP").innerHTML = " StartAngle=" + (StartAngle*Rad).toString() + " EndAngle=" + (EndAngle*Rad).toString();
								
								if (!PartJSON.Vectors[i].hasOwnProperty("CCW") | !PartJSON.Vectors[i].hasOwnProperty("Radius"))
								{
									if ( (StartAngle-EndAngle)*Rad < -180  | (StartAngle-EndAngle)*Rad > 0 & (StartAngle-EndAngle)*Rad <= 180) {ArcIsCC = true;} else {ArcIsCC = false;}
									PartJSON.Vectors[i].CCW = ArcIsCC;
									
									var ArcRadius = Math.sqrt( ( (OrigVectSX-OrigVectCX)*(OrigVectSX-OrigVectCX) )+( (OrigVectSY-OrigVectCY)*(OrigVectSY-OrigVectCY) ) );
									PartJSON.Vectors[i].Radius = ArcRadius;
									
									document.getElementById("LineJSON"+LineNumber).value = JSON.stringify(PartJSON);
								}								
								else 
								{
								var ArcIsCC = PartJSON.Vectors[i].CCW;
								var ArcRadius = CalcOutputValue(PartJSON.Vectors[i].Radius);
								}
								
								if (DrawingFace!= 'Front' ) //| canvasId != 'PartEditCanvas'
								{
									if (ArcIsCC) {ArcIsCC = false;} else {ArcIsCC = true;}
								}


								Edge.font="12px Arial";
								Edge.fillStyle = 'black';
								if (IsPartShapeEditor == true) {Edge.fillText("R" + round(ArcRadius,1),VectCX,VectCY); } //Edge.fillText("CCW " + ArcIsCC,VectCX+15,VectCY+15);
								if (PanelColour == '' ) {Edge.fillStyle = "#FFFFFF";} else {Edge.fillStyle = PanelColour;}	
								
								//
								if (IsPartShapeEditor) {Edge.beginPath();}							
								Edge.arc(VectCX, VectCY, ArcRadius*ViewRatio, StartAngle, EndAngle, ArcIsCC);
								if (IsPartShapeEditor) {Edge.stroke();}

									if (PartJSON.Vectors[i].Edge != 'N') 
									{
									ClashingEdges.push({"Type":"Arc","CX":VectCX,"CY":VectCY,"Radius":ArcRadius*ViewRatio,"BA":StartAngle,"EA":EndAngle,"Dir":ArcIsCC,"Edge":PartJSON.Vectors[i].Edge});								
									}
									
									/* if (PartJSON.Vectors[i].hasOwnProperty("IntAngle"))
									{
									Edge.strokeStyle="Red";
									Edge.lineWidth=1;
									Edge.beginPath();
									var DrawX = RecX - MoveOffsetX + Math.round((PartJSON.Vectors[i].GovPointX)*ViewRatio);
									var DrawY = RecY + MoveOffsetY + RecHeight - Math.round((PartJSON.Vectors[i].GovPointY)*ViewRatio);
									Edge.moveTo(DrawX,DrawY);
									var SecGovPointX = PartJSON.Vectors[i].GovPointX + Math.cos(PartJSON.Vectors[i].IntAngle)*PartJSON.Vectors[i].PointToIntLength;
									var SecGovPointY =PartJSON.Vectors[i].GovPointY + Math.sin(PartJSON.Vectors[i].IntAngle)*PartJSON.Vectors[i].PointToIntLength;
									var DrawX = RecX - MoveOffsetX + Math.round((SecGovPointX)*ViewRatio);
									var DrawY = RecY + MoveOffsetY + RecHeight - Math.round((SecGovPointY)*ViewRatio);								
									Edge.lineTo(DrawX,DrawY);
									Edge.stroke();
													
									}
									
									if (PartJSON.Vectors[i].hasOwnProperty("IntPointX2"))
									{
									Edge.strokeStyle="Red";
									Edge.lineWidth=1;
									Edge.beginPath();
									var DrawX = RecX - MoveOffsetX + Math.round((PartJSON.Vectors[i].IntPointX2)*ViewRatio);
									var DrawY = RecY + MoveOffsetY + RecHeight - Math.round((PartJSON.Vectors[i].IntPointY2)*ViewRatio);
									Edge.moveTo(DrawX-5,DrawY);
									Edge.lineTo(DrawX+5,DrawY);
									Edge.moveTo(DrawX,DrawY-5);
									Edge.lineTo(DrawX,DrawY+5);
									Edge.stroke();					
													
									} */
									

								break;
						}
					}
					//Edge.closePath();
					if (IsPartShapeEditor == false) 
					{
					Edge.fill();
					Edge.stroke();
					}
					
					
					Edge.lineWidth=4;
					//document.getElementById("TestP").innerHTML = "JSON="+ JSON.stringify(ClashingEdges);
					if (ModeSelection != 'PartShape' & canvasId == 'PartEditCanvas' | canvasId != 'PartEditCanvas')
					{
						for (var i = 0; i<ClashingEdges.length; i++)
						{ 
							switch (ClashingEdges[i].Edge)
							{
							case "N" : var VectorEdgeing = "Black"; break;
							case "E" : var VectorEdgeing = ClashingStoke; break;
							case "M" : var VectorEdgeing = ManualClashingStoke; break;
							}
							
						
								switch (ClashingEdges[i].Type)
								{
								case 'Line':
											Edge.strokeStyle=VectorEdgeing;
											Edge.beginPath();		
											Edge.moveTo(ClashingEdges[i].SX,ClashingEdges[i].SY);
											Edge.lineTo(ClashingEdges[i].EX,ClashingEdges[i].EY);
											Edge.stroke();
											break;
								case 'Arc':
											Edge.strokeStyle=VectorEdgeing;
											Edge.beginPath();								
											Edge.arc(ClashingEdges[i].CX, ClashingEdges[i].CY,ClashingEdges[i].Radius, ClashingEdges[i].BA, ClashingEdges[i].EA,ClashingEdges[i].Dir); // ClashingEdges[i].Dir
											Edge.stroke();
											break;
								}
						}
					}
					Edge.lineWidth=1;
					
				}

				for (var i = 0; i<PartJSON.Operations.length; i++)
				{
					
				if (MoveObject.InMove == true & IsItemInList(i,SelectedObjects.Items) & ModeSelection == 'Operations') 
				{
				MoveOffsetX = (MoveObject.X-ActiveMouseX)*ViewRatio;	
				MoveOffsetY = (MoveObject.Y-ActiveMouseY)*ViewRatio;	
				}
				else {MoveOffsetX = 0;MoveOffsetY = 0;}
					
					
				var OpFace = PartJSON.Operations[i].Face;
				if (DrawingFace!= OpFace) {var OpX = RecX - MoveOffsetX + RecWidth - Math.round(CalcOutputValue(PartJSON.Operations[i].X)*ViewRatio);}
				else {var OpX = RecX - MoveOffsetX + Math.round(CalcOutputValue(PartJSON.Operations[i].X)*ViewRatio);}
				var OpY = RecY + MoveOffsetY + RecHeight - Math.round(CalcOutputValue(PartJSON.Operations[i].Y)*ViewRatio);
				var OpWidth = Math.round(CalcOutputValue(PartJSON.Operations[i].Width)*ViewRatio);
				var OpDepth = CalcOutputValue(PartJSON.Operations[i].Depth);
				var OpVisibility = CalcOutputCond(PartJSON.Operations[i].VisibleCond);
				
				if (OpDepth < MaterialThick) {Edge.fillStyle = "#c47e17";} else {Edge.fillStyle = "#FFFFFF";}
				
					

				if (DrawingFace != OpFace) 
				{
					if (canvasId == 'PreviewBox') {Edge.setLineDash([3, 1]); } else {Edge.setLineDash([3, 5]); }
					Edge.strokeStyle=DefSelRecStroke;
				} 
				else if (!OpVisibility) 
					{
					Edge.setLineDash([5, 5]); 
					Edge.strokeStyle=HiddenOpStroke;
					if (PanelColour == '' ) {Edge.fillStyle = "#FFFFFF";} else {Edge.fillStyle = PanelColour;}
					} 
				else {Edge.setLineDash([]); Edge.strokeStyle=DefOpStroke;}
				
				
					if (canvasId == 'PreviewBox' & OpVisibility | canvasId != 'PreviewBox')
					{
						switch (PartJSON.Operations[i].Type)
						{
						case 'Hole':
									Edge.beginPath();
									Edge.arc(OpX, OpY, OpWidth/2, 0, 2 * Math.PI);
									if (IsPartShapeEditor == false) {if (DrawingFace == OpFace | OpDepth >= MaterialThick) {Edge.fill();}}
									Edge.stroke();
									break;
						case 'LineBore':
									var LineAngle = (CalcOutputValue(PartJSON.Operations[i].Angle)*degrees)-1.5708;	
										var OpQtyValue = CalcOutputValue(PartJSON.Operations[i].Qty);					
										for (var ii = 0; ii<OpQtyValue; ii++)
										{
										if (DrawingFace == OpFace)	
											{ var HoleX = OpX - (((Math.sin(LineAngle)*CalcOutputValue(PartJSON.Operations[i].Spacing))*ii)*ViewRatio);}
											else { var HoleX = OpX + (((Math.sin(LineAngle)*CalcOutputValue(PartJSON.Operations[i].Spacing))*ii)*ViewRatio);}
										var HoleY = OpY - (((Math.cos(LineAngle)*CalcOutputValue(PartJSON.Operations[i].Spacing))*ii)*ViewRatio);		
										Edge.beginPath();
										Edge.arc(HoleX, HoleY, OpWidth/2, 0, 2 * Math.PI);
										if (IsPartShapeEditor == false) { if (DrawingFace == OpFace | OpDepth >= MaterialThick ) {Edge.fill();}}
										Edge.stroke();
										}
									break;
						default:
									var LineAngle = (CalcOutputValue(PartJSON.Operations[i].Angle)*degrees)-1.5708;
									var OpLength = Math.round(CalcOutputValue(PartJSON.Operations[i].Length)*ViewRatio);
									Edge.beginPath();
									Edge.moveTo(OpX,OpY);
									var WidthCalX = (Math.sin(LineAngle-1.5708)*OpWidth);
									var WidthCalY = (Math.cos(LineAngle-1.5708)*OpWidth);
									if (DrawingFace == OpFace)
									{
									Edge.lineTo(OpX - WidthCalX,OpY - WidthCalY);
									Edge.lineTo(OpX - (Math.sin(LineAngle)*OpLength) - WidthCalX,OpY - (Math.cos(LineAngle)*OpLength) - WidthCalY);
									Edge.lineTo(OpX - (Math.sin(LineAngle)*OpLength),OpY - (Math.cos(LineAngle)*OpLength) );
									}
									else
									{
									Edge.lineTo(OpX + WidthCalX,OpY - WidthCalY);
									Edge.lineTo(OpX + (Math.sin(LineAngle)*OpLength) + WidthCalX,OpY - (Math.cos(LineAngle)*OpLength) - WidthCalY);
									Edge.lineTo(OpX + (Math.sin(LineAngle)*OpLength),OpY - (Math.cos(LineAngle)*OpLength) );	
									}
									Edge.lineTo(OpX,OpY);
									if (IsPartShapeEditor == false) { if (DrawingFace == OpFace | OpDepth >= MaterialThick ) {Edge.fill();}}
									Edge.stroke();
									break;

						}
						
						if (SelectedObjects.Items.length == 1 & i == SelectedObjects.Items[0])
						{
						Edge.strokeStyle="Magenta";
						var RefPointSize = (3*ViewRatio);		
						Edge.strokeRect(OpX-RefPointSize,OpY-RefPointSize,RefPointSize*2,RefPointSize*2);	
						}
					}
				}
				Edge.setLineDash([]);
				
				
			if (canvasId == 'PartEditCanvas')
			{
			/* Axis Reference Arrow */
			Edge.font="12px Arial";
			Edge.fillStyle = 'black';
			Edge.fillText("Y",4,canvas.height-30);
			Edge.fillText("X",30,canvas.height-4);
			Edge.strokeStyle='black'; Edge.lineWidth=1;
			Edge.beginPath();
			Edge.moveTo(7,canvas.height-25);
			Edge.lineTo(7,canvas.height-7);
			Edge.lineTo(25,canvas.height-7);
			Edge.stroke();

			Edge.beginPath();
			Edge.moveTo(5,canvas.height-23);
			Edge.lineTo(7,canvas.height-25);
			Edge.lineTo(9,canvas.height-23);
			Edge.stroke();

			Edge.beginPath();
			Edge.moveTo(23,canvas.height-9);
			Edge.lineTo(25,canvas.height-7);
			Edge.lineTo(23,canvas.height-5);
			Edge.stroke();
			/* Banding Colour Key */
			if (ModeSelection == 'Edgebanding')
			{
			Edge.beginPath();
			Edge.lineWidth=7;
			Edge.strokeStyle=ClashingStoke;
			Edge.moveTo(canvas.width-250,canvas.height-35);
			Edge.lineTo(canvas.width-190,canvas.height-35);
			Edge.stroke();
			Edge.fillText("= Invisedge edge",canvas.width-180,canvas.height-31);
			
			Edge.beginPath();
			Edge.lineWidth=7;
			Edge.strokeStyle=ManualClashingStoke;
			Edge.moveTo(canvas.width-250,canvas.height-20);
			Edge.lineTo(canvas.width-190,canvas.height-20);
			Edge.stroke();
			Edge.fillText("= Manually applied Invisedge",canvas.width-180,canvas.height-16);
			}
			Edge.lineWidth=1;
			/* Part Dimensions */
			if (ModeSelection != 'Edgebanding')
			{
			Edge.beginPath();
			Edge.strokeStyle='Black';
			Edge.moveTo(RecX-50,RecY+RecHeight);
			Edge.lineTo(RecX-100,RecY+RecHeight);
			Edge.moveTo(RecX-50,RecY);
			Edge.lineTo(RecX-100,RecY);
			Edge.moveTo(RecX-75,RecY);
			Edge.lineTo(RecX-75,RecY+(RecHeight/2)-30);
			Edge.moveTo(RecX-75,RecY+(RecHeight/2)+30);
			Edge.lineTo(RecX-75,RecY+RecHeight);
			
			Edge.moveTo(RecX,RecY+RecHeight+50);
			Edge.lineTo(RecX,RecY+RecHeight+100);
			Edge.moveTo(RecX+RecWidth,RecY+RecHeight+50);
			Edge.lineTo(RecX+RecWidth,RecY+RecHeight+100);
			Edge.moveTo(RecX,RecY+RecHeight+75);
			Edge.lineTo(RecX+(RecWidth/2)-45,RecY+RecHeight+75);
			Edge.moveTo(RecX+(RecWidth/2)+45,RecY+RecHeight+75);
			Edge.lineTo(RecX+RecWidth,RecY+RecHeight+75);
			
			Edge.stroke();
			Edge.font="15px Arial";
			Edge.fillText("Part Length",RecX-110,RecY+(RecHeight/2)-7);
			Edge.fillText(PartLength,RecX-88,RecY+(RecHeight/2)+16);
			Edge.fillText("Part Width",RecX+(RecWidth/2)-35,RecY+RecHeight+70);
			Edge.fillText(PartWidth,RecX+(RecWidth/2)-18,RecY+RecHeight+90);
			}

				
				for (var i = 0; i<SnapPoints.length; i++)
				{
					
					
					var CalX = RecX + (SnapPoints[i].X*ViewRatio);
					var CalY = RecY + RecHeight - (SnapPoints[i].Y*ViewRatio);
					Edge.beginPath();
					Edge.moveTo(CalX-1,CalY-1);
					Edge.lineTo(CalX+1,CalY-1);
					Edge.lineTo(CalX+1,CalY+1);
					Edge.lineTo(CalX-1,CalY+1);
					Edge.moveTo(CalX-1,CalY-1);
					Edge.fillStyle = "black";
					Edge.fill();
					//Edge.arc(, , 1, 0, 2 * Math.PI);
					if (SmartlineH.SnapPointID == i) 
					{ 
					Edge.setLineDash([5, 5]);
					Edge.strokeStyle="blue";
					Edge.beginPath();
					Edge.moveTo(RecX + (SmartlineH.X*ViewRatio), RecY + RecHeight - (SmartlineH.Y*ViewRatio));
					Edge.lineTo(CalX,CalY);
					Edge.stroke();
					Edge.setLineDash([]);	
					}
					if (SmartlineV.SnapPointID == i) 
					{ 
					Edge.setLineDash([5, 5]);
					Edge.strokeStyle="blue";
					Edge.beginPath();
					Edge.moveTo(RecX + (SmartlineV.X*ViewRatio), RecY + RecHeight - (SmartlineV.Y*ViewRatio));
					Edge.lineTo(CalX,CalY);
					Edge.stroke();
					Edge.setLineDash([]);	
					}
			
				}
				
				
				if (ToolPointClicks.length > 0)
				{
				var CalcStartX = RecX + Math.round(ToolPointClicks[0].X*ViewRatio);
				var CalcStartY = RecY + RecHeight - Math.round(ToolPointClicks[0].Y*ViewRatio);
				var CalcEndX = RecX + Math.round(ActiveMouseX*ViewRatio);
				var CalcEndY = RecY + RecHeight - Math.round(ActiveMouseY*ViewRatio);
					switch (ToolsSelection)
						{
						case 'MeasureTool':
								if (ToolPointClicks.length == 2)
								{
								var CalcEndX = RecX + Math.round(ToolPointClicks[1].X*ViewRatio);
								var CalcEndY = RecY + RecHeight - Math.round(ToolPointClicks[1].Y*ViewRatio);
								}
						
								if (CalcEndX > CalcStartX) {var HorStartX = CalcStartX;var HorEndX = CalcEndX;} else {var HorStartX = CalcEndX;var HorEndX = CalcStartX;}
								if (CalcEndY > CalcStartY) {var HorStartY = CalcStartY;var HorEndY = CalcStartY;} else {var HorStartY = CalcEndY;var HorEndY = CalcEndY;}
								if (CalcEndX > CalcStartX) {var VertStartX = CalcStartX;var VertEndX = CalcStartX;} else {var VertStartX = CalcEndX;var VertEndX = CalcEndX;}
								if (CalcEndY > CalcStartY) {var VertStartY = CalcStartY;var VertEndY = CalcEndY;} else {var VertStartY = CalcEndY;var VertEndY = CalcStartY;} 
								
								var LineAngle = Math.atan2( (CalcStartY-CalcEndY),(CalcEndX-CalcStartX) );
								var LineLength = Math.sqrt( ( (CalcEndX-CalcStartX)*(CalcEndX-CalcStartX) )+( (CalcEndY-CalcStartY)*(CalcEndY-CalcStartY) ) );


								Edge.font="15px Arial";
								Edge.fillStyle = DefSelRecStroke;
								
								Edge.setLineDash([5, 5]);
								Edge.strokeStyle=DefSelRecStroke;

								Edge.beginPath();
								Edge.moveTo(CalcStartX,CalcStartY);
								Edge.lineTo(CalcEndX,CalcEndY);	
								Edge.stroke();
								Edge.setLineDash([]);
								
								if (LineAngle != 0)
								{
								Edge.fillText(round((LineAngle*Rad),0)+'\xB0',CalcStartX+Math.cos(LineAngle)*(LineLength*0.7),CalcStartY-Math.sin(LineAngle)*(LineLength*0.7));
								Edge.fillText(round(LineLength/ViewRatio,0)+'L',CalcStartX+Math.cos(LineAngle)*(LineLength*0.9),CalcStartY-Math.sin(LineAngle)*(LineLength*0.9));
								}
								
								
								/*Horizontal*/
								var HorLineDist = HorEndX-HorStartX;
								if ( HorLineDist > 0)
								{
								Edge.beginPath();
								Edge.moveTo(HorStartX,HorStartY-20);
								Edge.lineTo(HorStartX,HorStartY);	
								Edge.stroke();
								Edge.beginPath();
								Edge.moveTo(HorEndX,HorEndY-20);
								Edge.lineTo(HorEndX,HorEndY);	
								Edge.stroke();							
									
								Edge.beginPath();
								Edge.moveTo(HorStartX,HorStartY-10);
								Edge.lineTo(HorEndX,HorEndY-10);	
								Edge.stroke();
								var HorText = round(HorLineDist/ViewRatio,0);
								var TextW = Edge.measureText(HorText).width;
								Edge.fillText(HorText,HorStartX+HorLineDist/2-TextW/2,HorStartY+5);
								}
								/*Vertical*/
								var VertLineDist = VertEndY-VertStartY;
								if ( VertLineDist > 0)
								{
								Edge.beginPath();
								Edge.moveTo(VertStartX-20,VertStartY);
								Edge.lineTo(VertEndX,VertStartY);	
								Edge.stroke();
								Edge.beginPath();
								Edge.moveTo(VertStartX-20,VertEndY);
								Edge.lineTo(VertEndX,VertEndY);	
								Edge.stroke();								
									
								Edge.beginPath();
								Edge.moveTo(VertStartX-10,VertStartY);
								Edge.lineTo(VertEndX-10,VertEndY);	
								Edge.stroke();
								var VertText = round(VertLineDist/ViewRatio,0);
								Edge.fillText(VertText,VertStartX-7,VertStartY+VertLineDist/2+7);
								}
								
								break;
						case 'LineBore':
								Edge.setLineDash([5, 5]);
								Edge.strokeStyle=DefSelRecStroke;
								Edge.beginPath();
								Edge.moveTo(CalcStartX,CalcStartY);
								Edge.lineTo(CalcEndX,CalcEndY);
								Edge.stroke();
								Edge.setLineDash([]);
								var LineAngle = Math.atan2( (CalcEndY-CalcStartY),(CalcEndX-CalcStartX) )+1.5708;
								var LineLength = Math.sqrt( ( (CalcEndX-CalcStartX)*(CalcEndX-CalcStartX) )+( (CalcEndY-CalcStartY)*(CalcEndY-CalcStartY) ) );
								//document.getElementById("TestP").innerHTML = LineAngle;
									for (var i = 0; i<Math.trunc((LineLength/ViewRatio)/32)+1; i++)
									{							
									var HoleX = CalcStartX + (Math.sin(LineAngle)*(32*ViewRatio))*i;
									var HoleY = CalcStartY - (Math.cos(LineAngle)*(32*ViewRatio))*i;	
									Edge.beginPath();
									Edge.arc(HoleX, HoleY, 2.5*ViewRatio, 0, 2 * Math.PI);
									Edge.stroke();
									}
								break;
						case 'Rebate':
									Edge.setLineDash([5, 5]);
									Edge.strokeStyle=DefSelRecStroke;
									var LineAngle = Math.atan2( (CalcEndY-CalcStartY),(CalcEndX-CalcStartX) )+1.5708;
									//document.getElementById("TestP").innerHTML = Math.atan2( (CalcEndY-CalcStartY),(CalcEndX-CalcStartX)*Rad );
									Edge.beginPath();
									Edge.moveTo(CalcStartX,CalcStartY);						
									var WidthCalX = (Math.sin(LineAngle-1.5708)*(10*ViewRatio));
									var WidthCalY = (Math.cos(LineAngle-1.5708)*(10*ViewRatio));
									Edge.lineTo(CalcStartX - WidthCalX,CalcStartY + WidthCalY);
									Edge.lineTo(CalcEndX - WidthCalX,CalcEndY + WidthCalY);
									Edge.lineTo(CalcEndX,CalcEndY);
									Edge.lineTo(CalcStartX,CalcStartY);
									Edge.stroke();
									Edge.setLineDash([]);			
									break;
						case 'Route':
									Edge.setLineDash([5, 5]);
									Edge.strokeStyle=DefSelRecStroke;						
									Edge.strokeRect(CalcStartX,CalcStartY,CalcEndX-CalcStartX,CalcEndY-CalcStartY);
									Edge.setLineDash([]);			
									break;
						case 'ChainLine':
									Edge.lineWidth=3;
									Edge.strokeStyle=DefSelRecStroke;
									Edge.beginPath();
									Edge.moveTo(CalcStartX,CalcStartY);			
									Edge.lineTo(CalcEndX,CalcEndY);	
									Edge.stroke();
									Edge.lineWidth=1;			
									break;
						case 'Line':
									Edge.lineWidth=3;
									Edge.strokeStyle=DefSelRecStroke;
									Edge.beginPath();
									Edge.moveTo(CalcStartX,CalcStartY);			
									Edge.lineTo(CalcEndX,CalcEndY);	
									Edge.stroke();
									Edge.lineWidth=1;			
									break;
						case '3PointArc':			
								
									
									if (ToolPointClicks.length > 1)
									{
									var CalcArcStartX = RecX + Math.round(ToolPointClicks[1].X*ViewRatio);
									var CalcArcStartY = RecY + RecHeight - Math.round(ToolPointClicks[1].Y*ViewRatio);	
									var ArcRadius = Math.sqrt( ( (CalcArcStartX-CalcStartX)*(CalcArcStartX-CalcStartX) )+( (CalcArcStartY-CalcStartY)*(CalcArcStartY-CalcStartY) ) );
									var StartAngle = Math.atan2( (CalcArcStartY-CalcStartY),(CalcArcStartX-CalcStartX) );
									var EndAngle = Math.atan2( (CalcEndY-CalcStartY),(CalcEndX-CalcStartX) );
									var ArcIsCC = false;								
									if ( (StartAngle-EndAngle)*Rad < -180  | (StartAngle-EndAngle)*Rad > 0 & (StartAngle-EndAngle)*Rad <= 180) {ArcIsCC = true;} 
									
									//document.getElementById("TestP").innerHTML = "StartAngle="+StartAngle*Rad+" EndAngle="+EndAngle*Rad+" ArcRadius="+ArcRadius;
									
									Edge.lineWidth=3;
									Edge.strokeStyle=DefSelRecStroke;
									Edge.beginPath();
									Edge.arc(CalcStartX, CalcStartY, ArcRadius, StartAngle,EndAngle, ArcIsCC);
									Edge.stroke();

									Edge.lineWidth=1;
									Edge.setLineDash([5, 5]);
									Edge.strokeStyle=DefSelRecStroke;
									Edge.beginPath();
									Edge.moveTo(CalcStartX,CalcStartY);								
									Edge.lineTo(CalcArcStartX,CalcArcStartY);
									Edge.stroke();
									Edge.setLineDash([]);
									
									}
									//else
									//{
									Edge.lineWidth=1;
									Edge.setLineDash([5, 5]);
									Edge.strokeStyle=DefSelRecStroke;
									Edge.beginPath();
									Edge.moveTo(CalcStartX,CalcStartY);	
									Edge.lineTo(CalcEndX,CalcEndY);								
									Edge.lineTo(CalcEndX,CalcEndY);
									Edge.stroke();
									Edge.setLineDash([]);	
									//}
									
									
									break;
						}
				//Edge.setLineDash([5, 3]);
				//Edge.strokeStyle="#464646";
				//Edge.setLineDash([]);		
				}


				if (SelectedObjects.Items.length > 0)
				{
				if (ModeSelection != 'PartShape') {SelRecMargin = 2;} else {SelRecMargin = 5;}
					if (MoveObject.InMove == true) 
					{
					MoveOffsetX = (MoveObject.X-ActiveMouseX)*ViewRatio;	
					MoveOffsetY = (MoveObject.Y-ActiveMouseY)*ViewRatio;	
					}	
					
				Edge.setLineDash([5, 3]);
				Edge.strokeStyle=DefSelRecStroke;
				var CalcStartX = RecX - MoveOffsetX +  Math.round(SelectedObjects.StartX*ViewRatio)-SelRecMargin;
				var CalcStartY = RecY + MoveOffsetY + RecHeight - Math.round(SelectedObjects.StartY*ViewRatio)+SelRecMargin;
				var CalcEndX = RecX - MoveOffsetX + Math.round(SelectedObjects.EndX*ViewRatio)+SelRecMargin;
				var CalcEndY = RecY + MoveOffsetY + RecHeight - Math.round(SelectedObjects.EndY*ViewRatio)-SelRecMargin;
				Edge.strokeRect(CalcStartX,CalcStartY,CalcEndX-CalcStartX,CalcEndY-CalcStartY);
				Edge.setLineDash([]);		
				}
				
				if (SelectBox.InSelect == true) 
				{
				Edge.setLineDash([5, 3]);
				Edge.strokeStyle=DefSelRecStroke;
				var CalcStartX = RecX + Math.round(SelectBox.StartX*ViewRatio);
				var CalcStartY = RecY + RecHeight - Math.round(SelectBox.StartY*ViewRatio);
				var CalcEndX = RecX + Math.round(SelectBox.EndX*ViewRatio);
				var CalcEndY = RecY + RecHeight - Math.round(SelectBox.EndY*ViewRatio);		
				Edge.strokeRect(CalcStartX,CalcStartY,CalcEndX-CalcStartX,CalcEndY-CalcStartY);	
				Edge.setLineDash([]);
				}
					
				
			}

			if (canvasId.indexOf("PartCanvas") > -1)
			{
			Edge.font="12px Arial";
			if (RGBIsDark(PanelColour) == true) {Edge.fillStyle = 'rgb(255,255,255)';} else {Edge.fillStyle = 'rgb(0,0,0)';}
			Edge.fillText("Line "+LineNumber+" "+PartDesc+" "+PartLength+"Lx"+PartWidth+"W "+PartUnitRef,10,20);
			}

		if (PanelType == 'Roller Surround' ) 
		{
			if (BotedgeNode == 'LaserEdge') { Edge.strokeStyle=ClashingStoke; Edge.lineWidth=3; } else { Edge.strokeStyle="black"; Edge.lineWidth=1;}



			Edge.fillStyle = "#FFFFFF";
			if (DrawingFace == 'Front') {Edge.fillRect(RecX+RollerLeft,RecY+RollerTop+1,RecWidth-RollerLeft-RollerRight,RecHeight-RollerTop+1);}
			else {Edge.fillRect(RecX+RollerRight,RecY+RollerTop+1,RecWidth-RollerLeft-RollerRight,RecHeight-RollerTop+1);}


			Edge.beginPath();
			if (DrawingFace == 'Front') {Edge.moveTo(RecX+RollerLeft,RecHeight+RecY); Edge.lineTo(RecX,RecHeight+RecY);}
			else {Edge.moveTo(RecX+RecWidth-RollerLeft,RecHeight+RecY); Edge.lineTo(RecX+RecWidth,RecHeight+RecY);}
			Edge.stroke();

			Edge.strokeStyle=ClashingStoke; Edge.lineWidth=3;
			Edge.beginPath();
			if (DrawingFace == 'Front')
			{
			Edge.moveTo(RecX+RecWidth-RollerRight,RecHeight+RecY);
			Edge.lineTo(RecX+RecWidth-RollerRight,RecY+RollerTop);
			Edge.lineTo(RecX+RollerLeft,RecY+RollerTop);
			Edge.lineTo(RecX+RollerLeft,RecHeight+RecY);
			}
			else
			{
			Edge.moveTo(RecX+RollerRight,RecHeight+RecY);
			Edge.lineTo(RecX+RollerRight,RecY+RollerTop);
			Edge.lineTo(RecX+RecWidth-RollerLeft,RecY+RollerTop);
			Edge.lineTo(RecX+RecWidth-RollerLeft,RecHeight+RecY);
			}
			Edge.stroke();
		}


		if (PanelType == 'Builtup Panel' && WidthNode > 0 )
		{
			var ThickString = GetMatThickFromName(itemMaterial); 
			//PanelThick=myRound(parseFloat(itemMaterial.slice(itemMaterial.length-8,itemMaterial.length-6))*(PlanBoxWidth/WidthNode));
			PanelThick=myRound(parseFloat(ThickString)*(PlanBoxWidth/WidthNode));
			//alert(ThickString);
			var ReturnValue = document.getElementById("Return").value;
			PlanBox.fillStyle="Peru";

			if (ReturnValue =="Full") {   PlanBox.fillRect(0.5,PlanBoxHeight-(17*(PlanBoxWidth/WidthNode)),PlanBoxWidth-1,(17*(PlanBoxWidth/WidthNode))); PlanBox.fillRect(0.5,PlanBoxHeight-PanelThick,PlanBoxWidth-1,(18*(PlanBoxWidth/WidthNode)));  }
			else { PlanBox.fillRect(0.5,PlanBoxHeight-(17*(PlanBoxWidth/WidthNode)),PlanBoxWidth-1,(17*(PlanBoxWidth/WidthNode))); PlanBox.fillRect(0.5,PlanBoxHeight-PanelThick,parseFloat(ReturnValue)*(PlanBoxWidth/WidthNode)-1,(18*(PlanBoxWidth/WidthNode))); } 

			if (ThickString > 36) { 
			PlanBox.fillRect(0.5,PlanBoxHeight-PanelThick+(18*(PlanBoxWidth/WidthNode)),(100*(PlanBoxWidth/WidthNode)),PanelThick-(36*(PlanBoxWidth/WidthNode)));
			if (ReturnValue =="Full") { PlanBox.fillRect(0.5+PlanBoxWidth-(100*(PlanBoxWidth/WidthNode)),PlanBoxHeight-PanelThick+(18*(PlanBoxWidth/WidthNode)),(100*(PlanBoxWidth/WidthNode)),PanelThick-(36*(PlanBoxWidth/WidthNode)));   }
			else {PlanBox.fillRect(0.5+(parseFloat(ReturnValue)*(PlanBoxWidth/WidthNode))-(100*(PlanBoxWidth/WidthNode)),PlanBoxHeight-PanelThick+(18*(PlanBoxWidth/WidthNode)),(100*(PlanBoxWidth/WidthNode)),PanelThick-(36*(PlanBoxWidth/WidthNode)));   }

			PlanBox.strokeStyle="black"; PlanBox.lineWidth=1;
			PlanBox.beginPath();
			PlanBox.moveTo(0.5,PlanBoxHeight-PanelThick+(18*(PlanBoxWidth/WidthNode))-0.5);
			if (ReturnValue == "Full") { PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-PanelThick+(18*(PlanBoxWidth/WidthNode))-0.5); } 
			else { PlanBox.lineTo(parseFloat(ReturnValue)*(PlanBoxWidth/WidthNode),PlanBoxHeight-PanelThick+(18*(PlanBoxWidth/WidthNode))-0.5); }
			PlanBox.stroke();


			}

			PlanBox.strokeStyle="black"; PlanBox.lineWidth=1;
			PlanBox.beginPath();
			PlanBox.moveTo(0.5,PlanBoxHeight-0.5);
			PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-0.5);
			PlanBox.stroke();


			PlanBox.beginPath();
			PlanBox.moveTo(0.5,PlanBoxHeight-PanelThick-0.5);
			if (ReturnValue=="Full") { PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-PanelThick-0.5); } 
			else 
			{ 
			PlanBox.lineTo(parseFloat(ReturnValue)*(PlanBoxWidth/WidthNode),PlanBoxHeight-PanelThick-0.5);
			PlanBox.lineTo(parseFloat(ReturnValue)*(PlanBoxWidth/WidthNode),PlanBoxHeight-(17.5*(PlanBoxWidth/WidthNode))); 
			}
			PlanBox.stroke();
			PlanBox.beginPath();
			PlanBox.moveTo(0.5,PlanBoxHeight-(17.5*(PlanBoxWidth/WidthNode)));
			PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-(17.5*(PlanBoxWidth/WidthNode)));
			PlanBox.stroke();

			if (LeftedgeNode == 'LaserEdge') { PlanBox.strokeStyle=ClashingStoke; PlanBox.lineWidth=4; } else { PlanBox.strokeStyle="black"; PlanBox.lineWidth=1;}
			PlanBox.beginPath();
			PlanBox.moveTo(0.5,PlanBoxHeight-0.5);
			PlanBox.lineTo(0.5,PlanBoxHeight-PanelThick-0.5);
			PlanBox.stroke();

			if (RightedgeNode == 'LaserEdge') { PlanBox.strokeStyle=ClashingStoke; PlanBox.lineWidth=4; } else { PlanBox.strokeStyle="black"; PlanBox.lineWidth=1;}
			PlanBox.beginPath();
			PlanBox.moveTo(PlanBoxWidth,PlanBoxHeight-0.5);
			if (ReturnValue =="Full") {  PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-PanelThick-0.5); } 
			else { PlanBox.lineTo(PlanBoxWidth,PlanBoxHeight-(17.5*(PlanBoxWidth/WidthNode))); }
			PlanBox.stroke(); 
			
			
			Edge.strokeStyle=DefSelRecStroke;
			Edge.lineWidth=1;
			Edge.setLineDash([5, 5]);

		
			if (ThickString > 36)
			{

				if (ReturnValue=="Full"| parseFloat(ReturnValue) > 200) {var FirstBuildUpXPos = RecX+(100*ViewRatio);}
				else {var FirstBuildUpXPos = RecX+parseFloat(ReturnValue)*ViewRatio;}
				
				Edge.beginPath();	
				Edge.moveTo(FirstBuildUpXPos,RecY+RecHeight);
				Edge.lineTo(FirstBuildUpXPos,RecY);
				Edge.stroke();		
				
				if (ReturnValue=="Full" | parseFloat(ReturnValue) > 200) 
				{
					if (ReturnValue=="Full") {var SecBuildUpXPos = RecX+RecWidth-(100*ViewRatio);}
					else {var SecBuildUpXPos = RecX+((parseFloat(ReturnValue)-100)*ViewRatio);}
					
					Edge.beginPath();	
					Edge.moveTo(SecBuildUpXPos,RecY+RecHeight);
					Edge.lineTo(SecBuildUpXPos,RecY);
					Edge.stroke();
				}
			}
			
			if (parseFloat(ReturnValue) > 200 | ThickString == 36 & ReturnValue != "Full") 	
			{
				Edge.beginPath();	
				Edge.moveTo(RecX+parseFloat(ReturnValue)*ViewRatio,RecY+RecHeight);
				Edge.lineTo(RecX+parseFloat(ReturnValue)*ViewRatio,RecY);
				Edge.stroke();			
			}


			
			Edge.setLineDash([]);		
		}


		if (itemMaterial != "" ) 
		{
		if ( Materials[FindItem(itemMaterial,Materials,"Name")].Grained == "True" ) 
		{
		Edge.strokeStyle="Red"; Edge.lineWidth=1;
		Edge.beginPath();
		Edge.moveTo(RecX+(RecWidth/2),RecY+(RecHeight*0.3));
		Edge.lineTo(RecX+(RecWidth/2),RecHeight+RecY-(RecHeight*0.3));
		Edge.moveTo(RecX+(RecWidth/2)-(RecHeight*0.05),RecY+(RecHeight*0.35));
		Edge.lineTo(RecX+(RecWidth/2),RecY+(RecHeight*0.3));
		Edge.moveTo(RecX+(RecWidth/2)+(RecHeight*0.05),RecY+(RecHeight*0.35));
		Edge.lineTo(RecX+(RecWidth/2),RecY+(RecHeight*0.3));
		Edge.stroke();
		Edge.font="15px Arial";
		Edge.fillStyle = 'red';
		Edge.fillText("Grain",RecX+(RecWidth/2)+5,RecY+(RecHeight/2));
		}
		}
		
		/*HDF operations*/
		if (itemMaterial.indexOf(HDFPrefix) > -1) 
		{
		//RecHeight=myRound(LengthNode*ViewRatio);
		//RecWidth=myRound(WidthNode*ViewRatio);	
			
			var ProfileName = GetHDFProfileName(itemMaterial);	
			var HHDItemIndex = FindItem(ProfileName,HDFDoorSpecData,'Profile');
			if (HHDItemIndex > -1)
			{
				var Framed = HDFDoorSpecData[HHDItemIndex].Frame;
				var VGrooves = HDFDoorSpecData[HHDItemIndex].VGrooves;
				
				Edge.strokeStyle=DefOpStroke; Edge.lineWidth=1;

				if (DrawingFace != 'Front')
				{
					if (canvasId == 'PreviewBox') {Edge.setLineDash([3, 1]); } else {Edge.setLineDash([3, 5]); }	
				}

				var FrameMargin = parseFloat(HDFDoorSpecData[HHDItemIndex].ProfileMargin);	
				var TEL = parseFloat(GetExtraParValue("TEL",LineDivID));
				if (isNaN(TEL)) 
				{
					if (HDFDoorSpecData[HHDItemIndex].hasOwnProperty("TEL")) {TEL = HDFDoorSpecData[HHDItemIndex].TEL;}
					else {TEL = 0;}
				}
				var LEL = parseFloat(GetExtraParValue("LEL",LineDivID)); 
				if (isNaN(LEL)) {LEL = 0;}
				var REL = parseFloat(GetExtraParValue("REL",LineDivID));
				if (isNaN(REL)) {REL = 0;}
				var BEL = parseFloat(GetExtraParValue("BEL",LineDivID));
				if (isNaN(BEL)) {BEL = 0;}
				var ProfileQty = 1
				var ProfileQtyValue = GetExtraParValue("ProfileQty",LineDivID);
				var BaseDoorHeight = parseFloat(GetExtraParValue("BDH",LineDivID));
				if (isNaN(BaseDoorHeight)) {BaseDoorHeight = 720;}
				var RailWidth = parseFloat(GetExtraParValue("RailW",LineDivID));
				if (isNaN(RailWidth)) {RailWidth = FrameMargin+2;}
				
				
				var DrwFrontOption = GetExtraParValue("DrwFrontOption",LineDivID);
				
				if (DrwFrontOption != undefined & DrwFrontOption != '') 
				{
					//alert(DrwFrontOption);
					var GroupNumber = GetExtraParValue("GrainMatchGroup",LineDivID);
					var GroupOrder = GetExtraParValue("GrainMatchOrder",LineDivID);
					var TopGroupOrder = FindLastGroupPartOrder(GroupNumber);
					
					if (DrwFrontOption == "ReducedRails") {var AdjForDrwFrontOption = -((FrameMargin/2)-1);}
					if (DrwFrontOption == "DrwPack") {var AdjForDrwFrontOption = -FrameMargin;} 
				
					
					if (GroupOrder == 1) {BEL = AdjForDrwFrontOption;}
					else if (GroupOrder == TopGroupOrder) {TEL = AdjForDrwFrontOption; }
					else {TEL = AdjForDrwFrontOption; BEL = AdjForDrwFrontOption;}
				
					//alert(TopGroupOrder);		
				}
				
				
				
				
				var PocketHeight = 0;
				var CombPocketHeight = LengthNode-(FrameMargin*2)-TEL-BEL;
				var PocketWidth = WidthNode-(FrameMargin*2)-REL-LEL;
				var StartYPos = FrameMargin+BEL;
				if (DrawingFace == 'Front') {var AdjXPos = LEL;} else {var AdjXPos = REL;}
				var PocketXPos = FrameMargin+AdjXPos;
				var PocketYPos = 0;

				var MaxSpacing = 0;
				var MinSpacing = 0;
				var MaxEdge = 0;
				var IsFixedSpacing = 0;
				var VGrooveFixedSideMargin = 0;
				if (VGrooves != undefined) {VGrooveFixedSideMargin = VGrooves.FixedSideMargin;}
				
				var VGrooveSpacing = 0;
				var VGrooveQty = 0;
				var VGrooveSideMargin = 0;
				var VGrooveXPos = 0;
				var VGrooveYPos = 0;
				
				var FlatWidth = 0
				var MaxScallopWidth = 0
				var GrooveWidth = 0
				
				
				//alert(VGrooves);
				
				switch (ProfileQtyValue)
				{
					case 'BaseDoorHeight' : 
								ProfileQty = 2;
								break;
					case '2V' : ProfileQty = 2; break;
					case '3V' : ProfileQty = 3; break;
				}
			
						
				for (var i = 1; i<=ProfileQty; i++) 
				{
					
					if (ProfileQtyValue == 'BaseDoorHeight')
					{
						if (i == 1) 
						{
						PocketHeight = BaseDoorHeight-(FrameMargin*2);
						PocketYPos = StartYPos;					
						} 
						else
						{
						PocketHeight = CombPocketHeight-(BaseDoorHeight-FrameMargin)-(RailWidth-FrameMargin);
						PocketYPos = BEL+BaseDoorHeight+(RailWidth-FrameMargin);					
						}
					}
					else
					{
					PocketHeight = (CombPocketHeight-(RailWidth*(ProfileQty-1)))/ProfileQty;
					PocketYPos = StartYPos+((PocketHeight+RailWidth)*(i-1))				
					}	
					//alert(PocketHeight);
					
					if (VGrooveFixedSideMargin != 0 & VGrooveFixedSideMargin != undefined)
					{
					PocketWidth = WidthNode-(VGrooveFixedSideMargin*2)-(FrameMargin*2)-REL-LEL;
					PocketXPos = FrameMargin+AdjXPos+VGrooveFixedSideMargin;
					}

					if (Framed & PocketHeight > 10 & PocketWidth > 10) 
					{
						if (PanelType == 'Glass Frame' )
						{
						Edge.fillStyle = "#D8D8D8";
						Edge.fillRect(RecX+(PocketXPos*ViewRatio),RecY+RecHeight-((PocketYPos+PocketHeight)*ViewRatio),PocketWidth*ViewRatio,PocketHeight*ViewRatio);
						}	
						
					Edge.beginPath();
					Edge.moveTo(RecX+(PocketXPos*ViewRatio),RecY+RecHeight-(PocketYPos*ViewRatio)); 
					Edge.lineTo(RecX+(PocketXPos*ViewRatio),RecY+RecHeight-((PocketYPos+PocketHeight)*ViewRatio));
					Edge.lineTo(RecX+((PocketXPos+PocketWidth)*ViewRatio),RecY+RecHeight-((PocketYPos+PocketHeight)*ViewRatio));
					Edge.lineTo(RecX+((PocketXPos+PocketWidth)*ViewRatio),RecY+RecHeight-(PocketYPos*ViewRatio));
					Edge.lineTo(RecX+(PocketXPos*ViewRatio),RecY+RecHeight-(PocketYPos*ViewRatio));
					Edge.stroke();
					
						if (ProfileQtyValue == 'BaseDoorHeight' & i == 1)
						{
							//DrawDimension(Edge,'1000',10,40,40,30,30);
							//DrawDimension(Edge,'1000',10,30,110,10,110);	

							DrawDimension(Edge,PocketYPos,10,RecX+RecWidth,RecY+RecHeight,RecX+RecWidth,RecY+RecHeight-(PocketYPos*ViewRatio));	
							DrawDimension(Edge,PocketHeight,10,RecX+RecWidth,RecY+RecHeight-(PocketYPos*ViewRatio),RecX+RecWidth,RecY+RecHeight-((PocketYPos+PocketHeight)*ViewRatio));
							DrawDimension(Edge,RailWidth,10,RecX+RecWidth,RecY+RecHeight-((PocketYPos+PocketHeight)*ViewRatio),RecX+RecWidth,RecY+RecHeight-((PocketYPos+PocketHeight+RailWidth)*ViewRatio));		
						}
						
					}

					if (DrawingFace != 'Front')
					{
						if (canvasId == 'PreviewBox') {Edge.setLineDash([3, 1]); } else {Edge.setLineDash([3, 5]); }	
					}
					
					
					//"VGrooves" : [{"MaxSpacing" : 0 , "MaxEdge" : 0 , "IsFixedSpacing" : false}] },
					if (VGrooves != undefined & PocketHeight > 10 & PocketWidth > 10)
					{
					MaxSpacing = VGrooves.MaxSpacing;
					MinSpacing = VGrooves.MinSpacing;
					MaxEdge = VGrooves.MaxEdge;
					IsFixedSpacing = VGrooves.IsFixedSpacing;
					var ExtendVGrooveThroughFrame = VGrooves.ExtendThroughFrame;
					if (ExtendVGrooveThroughFrame == undefined) {ExtendVGrooveThroughFrame = false;}
					//var UserSpacing = false;
					var DrawWidth = VGrooves.Width;
					if (DrawWidth == undefined) {DrawWidth = 0;}
					

						//if (VGrooves.UserSpacing != undefined) {UserSpacing = VGrooves.UserSpacing;}	
						if (VGrooves.UserSpacing) 
						{
							MaxSpacing = parseFloat(GetExtraParValue("VGSpacing",LineDivID));
							if (isNaN(MaxSpacing)) {MaxSpacing = parseFloat(document.getElementById("VGSpacing").value);}
						}
						if (VGrooves.MaxScallopWidth) 
						{
							MaxScallopWidth = parseFloat(GetExtraParValue("MaxScallopW",LineDivID));
							if (isNaN(MaxScallopWidth)) {MaxScallopWidth = parseFloat(document.getElementById("MaxScallopW").value);}
						}		
						
						if (VGrooves.FlatWidth != undefined)
						{
							FlatWidth = parseFloat(GetExtraParValue("FlatW",LineDivID));
							if (isNaN(FlatWidth)) {FlatWidth = parseFloat(document.getElementById("FlatW").value);}
						}
						if (VGrooves.GrooveWidth != undefined)
						{
							GrooveWidth = parseFloat(GetExtraParValue("GrooveW",LineDivID));
							if (isNaN(GrooveWidth)) {GrooveWidth = parseFloat(document.getElementById("GrooveW").value);}
						}
						
							
						if (MaxScallopWidth > 0 & FlatWidth > 0 | GrooveWidth > 0)
						{
														
							if (MaxScallopWidth > 0) 
							{
								/*
								VGrooveSpacing = (PocketWidth-0.01)/(1+Math.floor((PocketWidth-0.01)/MaxSpacing));
								if (VGrooves.HalfSpacingSideMargin) {VGrooveQty = Math.floor((PocketWidth-0.01)/MaxSpacing)+1;}
								else {VGrooveQty = Math.floor((PocketWidth-0.01)/MaxSpacing);}
								*/

								if (VGrooves.HalfSpacingSideMargin) 
								{
								VGrooveQty = 2+Math.floor((PocketWidth-0.01 - FlatWidth)/(MaxScallopWidth+FlatWidth));
								VGrooveSpacing = (PocketWidth)/VGrooveQty;	
								}
								else 
								{
								VGrooveQty = 1+Math.floor((PocketWidth-0.01 - FlatWidth)/(MaxScallopWidth+FlatWidth));	
								VGrooveSpacing = (PocketWidth-FlatWidth)/VGrooveQty;
								}
								DrawWidth = VGrooveSpacing-FlatWidth;
							}
							else 
							{
								VGrooveQty = Math.floor((PocketWidth+0.01 + GrooveWidth)/MaxSpacing);
								VGrooveSpacing = (PocketWidth+GrooveWidth)/(VGrooveQty+1);
								DrawWidth = GrooveWidth;							
							}


							//if (!isNaN(VGrooveSpacing)) {document.getElementById("VGSpacingCalc").innerHTML = round(VGrooveSpacing, 1);}
						}
						else
						{	
							if (MaxScallopWidth > 0) {DrawWidth = MaxScallopWidth;}

							if (IsFixedSpacing) 
							{	
							VGrooveSpacing = MaxSpacing;	
							VGrooveQty = Math.floor(2+(((PocketWidth-MaxEdge*2)/VGrooveSpacing)));
							//VGrooveSideMargin:= ((PocketWidth - (VGrooveSpcng*(VGrooveQty-1)))/2) + (ProfMargin+LeftExtraLength);
							}
							else
							{
								if (VGrooveFixedSideMargin != 0 & VGrooveFixedSideMargin != undefined)
								{
									if (MinSpacing > 0)
									{
									VGrooveSpacing = PocketWidth/(Math.floor(PocketWidth/MinSpacing));
									VGrooveQty = Math.floor((PocketWidth/MinSpacing)+1);
									}									
									else
									{
									VGrooveSpacing = (PocketWidth-0.01)/(1+Math.floor((PocketWidth-0.01)/MaxSpacing));
									VGrooveQty = Math.floor(((PocketWidth-0.01)/MaxSpacing)+2);
									}
								}
								else
								{
								VGrooveSpacing = (PocketWidth-0.01)/(1+Math.floor((PocketWidth-0.01)/MaxSpacing));
									if (VGrooves.HalfSpacingSideMargin) {VGrooveQty = Math.floor((PocketWidth-0.01)/MaxSpacing)+1;}
									else {VGrooveQty = Math.floor((PocketWidth-0.01)/MaxSpacing);}
								}
								
								
							}
						}
						

						
						if (!isNaN(VGrooveSpacing)) 
						{
						document.getElementById("VGSpacingCalc").innerHTML = round(VGrooveSpacing, 1);
							if (DrawWidth > 0)
							{
							document.getElementById("FlatWidthCalcDiv").style.display = "inherit";
							document.getElementById("FlatWidthCalc").innerHTML = round(VGrooveSpacing-DrawWidth, 1);
							}
						}

						if (MaxScallopWidth > 0)
						{
						var ScallopToolRad = VGrooves.ScallopToolRad;	
						var ScallopDepth = ScallopToolRad-Math.pow((Math.pow(ScallopToolRad,2)-Math.pow(DrawWidth/2,2)),0.5)+0.5; 	
						document.getElementById("ScallopDepthCalcDiv").style.display = "inherit";
						document.getElementById("ScallopDepthCalc").innerHTML = round(ScallopDepth, 1);
						}
						
					

						VGrooveSideMargin = ((PocketWidth - (VGrooveSpacing*(VGrooveQty-1)))/2) + PocketXPos;

						if (VGrooveFixedSideMargin != 0 & VGrooveFixedSideMargin != undefined)  {VGrooveSideMargin = PocketXPos;}				
						
						//alert(VGrooveSpacing + " " + VGrooveQty);
						//alert((VGrooveSpacing*(VGrooveQty-1)));
						
						
						
						if (ExtendVGrooveThroughFrame) 
						{	
						Edge.beginPath();
						Edge.moveTo(RecX+(PocketXPos*ViewRatio),RecY+RecHeight); 
						Edge.lineTo(RecX+(PocketXPos*ViewRatio),RecY);
						Edge.stroke();
						
						Edge.beginPath();
						Edge.lineTo(RecX+((PocketXPos+PocketWidth)*ViewRatio),RecY+RecHeight);
						Edge.lineTo(RecX+((PocketXPos+PocketWidth)*ViewRatio),RecY);
						Edge.stroke();
						}
						
						for (var r = 0; r<VGrooveQty; r++) 
						{
						VGrooveXPos = (r*VGrooveSpacing)+VGrooveSideMargin-(DrawWidth/2);
						VGrooveYPos = PocketYPos;

		
						
						Edge.beginPath();
						Edge.moveTo(RecX+(VGrooveXPos*ViewRatio),RecY+RecHeight-(VGrooveYPos*ViewRatio)); 
						Edge.lineTo(RecX+(VGrooveXPos*ViewRatio),RecY+RecHeight-((VGrooveYPos+PocketHeight)*ViewRatio));
						Edge.stroke();

						Edge.beginPath();
						Edge.moveTo(RecX+((VGrooveXPos+DrawWidth)*ViewRatio),RecY+RecHeight-(VGrooveYPos*ViewRatio)); 
						Edge.lineTo(RecX+((VGrooveXPos+DrawWidth)*ViewRatio),RecY+RecHeight-((VGrooveYPos+PocketHeight)*ViewRatio));
						Edge.stroke();

							if (DrawingFace == 'Front')
							{
							var grd = Edge.createLinearGradient(RecX+(VGrooveXPos*ViewRatio), 0,RecX+((VGrooveXPos+(DrawWidth/2))*ViewRatio), 0);
							grd.addColorStop(0,"#cbad6c");
							grd.addColorStop(1,"#EDCB82");
							Edge.fillStyle = grd;//"#EDCB82";
							Edge.fillRect(RecX+(VGrooveXPos*ViewRatio),RecY+RecHeight-((VGrooveYPos+PocketHeight-3)*ViewRatio),(DrawWidth/2)*ViewRatio,(PocketHeight-6)*ViewRatio);
							
							grd = Edge.createLinearGradient(RecX+((VGrooveXPos+(DrawWidth/2))*ViewRatio), 0,RecX+((VGrooveXPos+DrawWidth)*ViewRatio), 0);
							grd.addColorStop(0,"#EDCB82");
							grd.addColorStop(1,"#cbad6c");
							Edge.fillStyle = grd;//"#EDCB82";
							Edge.fillRect(RecX+((VGrooveXPos+(DrawWidth/2))*ViewRatio),RecY+RecHeight-((VGrooveYPos+PocketHeight-3)*ViewRatio),(DrawWidth/2)*ViewRatio,(PocketHeight-6)*ViewRatio);
							}
						}
					
						
					}
					
				}
			}
		}
		else
		{
			//framewidth=60*ViewRatio;
			
			if (PanelType == 'Glass Frame' )
			{
				var FrameTop = parseFloat(GetExtraParValue("GFMTop",LineDivID))*ViewRatio;
				var FrameLeft = parseFloat(GetExtraParValue("GFMLeft",LineDivID))*ViewRatio; 
				var FrameRight = parseFloat(GetExtraParValue("GFMRight",LineDivID))*ViewRatio;
				var FrameBot = parseFloat(GetExtraParValue("GFMBot",LineDivID))*ViewRatio;
				var FrameWidth = parseFloat(GetExtraParValue("GFRW",LineDivID))*ViewRatio;

				if (DrawingFace == 'Back') /*swap around if looking at the back*/
				{
				FrameLeft = parseFloat(GetExtraParValue("GFMRight",LineDivID))*ViewRatio;
				FrameRight = parseFloat(GetExtraParValue("GFMLeft",LineDivID))*ViewRatio;	
				}

				if (isNaN(FrameTop)) {FrameTop = 60*ViewRatio;}
				if (isNaN(FrameLeft)) {FrameLeft = 60*ViewRatio;}
				if (isNaN(FrameRight)) {FrameRight = 60*ViewRatio;}
				if (isNaN(FrameBot)) {FrameBot = 60*ViewRatio;}
				if (isNaN(FrameWidth)) {FrameWidth = 10*ViewRatio;}

				if (DrawingFace == 'Back')
				{
				Edge.fillStyle = "#c47e17";
				Edge.fillRect(RecX+FrameLeft-FrameWidth,RecY+FrameTop-FrameWidth,RecWidth-FrameLeft-FrameRight+(FrameWidth*2),RecHeight-FrameTop-FrameBot+(FrameWidth*2));
				}
				else {Edge.setLineDash([5, 3]);}
		
				Edge.strokeStyle=DefSelRecStroke;
				Edge.lineWidth=1;	
				Edge.beginPath();
				Edge.rect(RecX+FrameLeft-FrameWidth,RecY+FrameTop-FrameWidth,RecWidth-FrameLeft-FrameRight+(FrameWidth*2),RecHeight-FrameTop-FrameBot+(FrameWidth*2));
				Edge.stroke();
				Edge.setLineDash([]);	
			

				Edge.fillStyle = "#D8D8D8";
				Edge.fillRect(RecX+FrameLeft+1,RecY+FrameTop+1,RecWidth-FrameLeft-FrameRight-2,RecHeight-FrameTop-FrameBot-2);

				Edge.strokeStyle=ClashingStoke;
				Edge.lineWidth=3;

				Edge.beginPath();
				Edge.rect(RecX+FrameLeft,RecY+FrameTop,RecWidth-FrameLeft-FrameRight,RecHeight-FrameTop-FrameBot);
				Edge.stroke();


			}		
		}
		
		}
	}
} //end if DrawerPreview


function Checkdate(InputDate,ShowErrorMsg)
{
var NewD = new Date(InputDate);
var today = new Date();
var ManDate = SetManDate() ;


	if (NewD.getMonth() == 11 && NewD.getDate() > EndOfYearEndDay || NewD.getMonth() == 0 && NewD.getDate() < NewYearStartDay ) //For end of year closedown
	{
		//alert(Date.parse(NewD) + " " +Date.parse(ManDate));
		//var NewYear = new Date().getFullYear() + 1;	
		if (Date.parse(NewD) < Date.parse(ManDate) ) 
		{ 
			if (ShowErrorMsg == true) { popup("You cannot choose a date less than the "+(NewYearStartDay+CurrentOrderLeadTime)+"th or January "+NewYear+"!",150,350,1); } 
			
		}
		else
		{
			if (ShowErrorMsg == true) { popup("Invalid selection! The date choosen is during our end of year shut down period.",150,350,1); } 
		}	
		ExcDate(ManDate); 
	}
	else
	{
		//alert(InputDate);
	/* 	if (window.chrome)
		{
			if (NewD.getDay() == 6 || NewD.getDay() == 0) { popup("You can only select a weekday!",150,350,1);ExcDate(); }
			else 
			{ if (NewD < ManDate) { popup("You cannot choose a date less than "+CurrentOrderLeadTime+" working days from today's date!",150,350,1); ExcDate(); } }
		}
		else
		{ */
			if(InputDate.match(/\d{4}[-]\d{2}[-]\d{2}/))  
			{
				if (NewD.getDay() == 6 || NewD.getDay() == 0) 
				{ 
					if (ShowErrorMsg == true) { popup("You can only select a weekday!",150,350,1); }
					ExcDate(ManDate); 
				}
				else 
				{ 
					if (NewD < ManDate) 
					{ 
						if (ShowErrorMsg == true) { popup("You cannot choose a date less than "+CurrentOrderLeadTime+" working days from today's date!",150,350,1); } 
						ExcDate(ManDate);
					} 
				}	
			}
			else
			{
				if (ShowErrorMsg == true) { popup("This value must be a date in the following format (yyyy-mm-dd).",150,350,1); }
				ExcDate(ManDate); 
			}		
		//}
	}
	//alert(NewD + ' | ' + Setdate());
	
} //end of Checkdate


function SetLeadTime()
{
CurrentOrderLeadTime = StdLeadTime;

	for (var r = 1; r<counter; r++) 
	{

	LineMaterial = document.getElementById("Material"+r).value


		if (document.getElementById("Leftedge"+r).value == '45Profile' || document.getElementById("Rightedge"+r).value == '45Profile'
		|| document.getElementById("Topedge"+r).value == '45Profile' || document.getElementById("Bottomedge"+r).value == '45Profile')
		{CurrentOrderLeadTime = MitreHandlesLeadTime}

		if (document.getElementById("Leftedge"+r).value == 'AngleEdge' || document.getElementById("Rightedge"+r).value == 'AngleEdge'
		|| document.getElementById("Topedge"+r).value == 'AngleEdge' || document.getElementById("Bottomedge"+r).value == 'AngleEdge')
		{CurrentOrderLeadTime = AngleEdgesLeadTime}	
	
		if (document.getElementById("PanelType"+r).value == 'Builtup Panel') {CurrentOrderLeadTime = BuildupPanelLeadTime}  
		if (document.getElementById("PanelType"+r).value == 'Glass Frame' & !IsHDFFramedDoor(LineMaterial)) {CurrentOrderLeadTime = GlassFrameLeadTime}  
		if (LineMaterial.indexOf("NON-STOCK") > -1 ) {CurrentOrderLeadTime = NonStockLeadTime} 


	}
}

function CalcFirstManDate(StartDate,UpperLim,OutputDate,CurrentMonth,CurrentYear)
{
	//console.log("StartDate="+StartDate+" UpperLim="+UpperLim+" CurrentYear="+CurrentYear);
	for (var r = StartDate; r<=UpperLim; r++) 
	{
		OutputDate.setFullYear(CurrentYear,CurrentMonth);
		OutputDate.setDate(r);
		var CurrentDay = OutputDate.getDay();
		//console.log(CurrentDay);
		//console.log(OutputDate);
		if (CurrentDay == 0 | CurrentDay == 6) {UpperLim+=1;}
	}
	return OutputDate 
}

function SetManDate()
{
SetLeadTime();	
var today = new Date();
var FirstManDate = new Date();
var AddDays = 0;
var AddWeekendDays = (Math.floor(CurrentOrderLeadTime/5)*2);
var FirstWeekendDays = today.getDay()+CurrentOrderLeadTime;
var CurrentMonth = today.getMonth();

//console.log("today.getDay() "+today.getDay());
//console.log("AddWeekendDays "+AddWeekendDays);
//console.log("FirstWeekendDays "+FirstWeekendDays);

	FirstManDate.setMonth(CurrentMonth);
	FirstManDate.setHours(0);

	var CurrentDate = today.getDate();

	FirstManDate = CalcFirstManDate(CurrentDate,CurrentDate+CurrentOrderLeadTime,FirstManDate,CurrentMonth,today.getFullYear());

	
	if (today.getMonth() == 11 && FirstManDate.getDate() > EndOfYearEndDay || today.getMonth() == 0 && CurrentDate < NewYearStartDay )
	{
	FirstManDate.setFullYear(today.getFullYear()+1,0);	
	CurrentDate = NewYearStartDay;
	FirstManDate = CalcFirstManDate(CurrentDate,CurrentDate+CurrentOrderLeadTime,FirstManDate,0,today.getFullYear()+1);	
	}

	return FirstManDate


	/*if (today.getDay() == 0 ) {AddDays = 1;}

	if ( FirstWeekendDays > 5) {AddDays = AddDays+2;}

	if (AddWeekendDays < 0 ) {AddWeekendDays = 0;}	
	
	//console.log("FirstWeekendDays="+FirstWeekendDays+" AddDays="+AddDays+" AddWeekendDays="+AddWeekendDays);
		
	FirstManDate.setDate(today.getDate()+CurrentOrderLeadTime+AddDays+AddWeekendDays);

 

	if (FirstManDate.getDay() == 0)
	{
	FirstManDate.setMonth(today.getMonth());
	FirstManDate.setDate(today.getDate()+CurrentOrderLeadTime+AddDays+AddWeekendDays+1);
	}
	if (FirstManDate.getDay() == 6)
	{
	FirstManDate.setMonth(today.getMonth());
	FirstManDate.setDate(today.getDate()+CurrentOrderLeadTime+AddDays+AddWeekendDays+2);
	}
	
	FirstManDate.setHours(0);

		if (today.getMonth() == 11 && today.getDate() > 20 || today.getMonth() == 0 && today.getDate() < 13 )
		{
		FirstManDate.setDate(15+CurrentOrderLeadTime);
		FirstManDate.setMonth(0);		
		}
		
		//alert(FirstManDate);*/
 

/* switch(today.getDay())
{
case 0: FirstManDate.setDate(today.getDate()+5);break;
case 1: FirstManDate.setDate(today.getDate()+4);break;
case 2: FirstManDate.setDate(today.getDate()+6);break;
case 3: FirstManDate.setDate(today.getDate()+6);break;
case 4: FirstManDate.setDate(today.getDate()+6);break;
case 5: FirstManDate.setDate(today.getDate()+6);break;
case 6: FirstManDate.setDate(today.getDate()+6);break;
} */
//var Day = "0"+FirstManDate.getDate();
//var Month = "0"+(FirstManDate.getMonth()+1);
//alert(FirstManDate.getFullYear()+"-"+Month.slice(Month.length-2,Month.length)+"-"+Day.slice(Day.length-2,Day.length));
//return FirstManDate.getFullYear()+"-"+Month.slice(Month.length-2,Month.length)+"-"+Day.slice(Day.length-2,Day.length);
}

function ExcDate(ManDate)
{

var Day = "0"+ManDate.getDate();
var Month = "0"+(ManDate.getMonth()+1);
var Year = ManDate.getFullYear();
//var today = new Date();

	//if (today.getMonth() == 11 && today.getDate() > 20 || today.getMonth() == 0 && today.getDate() < 13 )
	//{ var Year = new Date().getFullYear() + 1; } else { var Year = new Date().getFullYear(); }
		
//alert(SetManDate().getFullYear()+"-"+Month.slice(Month.length-2,Month.length)+"-"+Day.slice(Day.length-2,Day.length));
document.getElementById("Dispdate").value = Year+"-"+Month.slice(Month.length-2,Month.length)+"-"+Day.slice(Day.length-2,Day.length);
}

function ForceOnChangeOnEnter(Element,e)
{

	if (e.type != 'keydown' | e.key == 'Enter')
	{
	Element.onchange();
	}
}

function CheckEnterForParUpdate(Element,e)
{
		/* switch(e.key)
		{
		case 'Enter' :  SelectDropDownItem(SelItem); break; */
		//alert(e.type);
	if (e.type != 'keydown' | e.key == 'Enter')
	{
	var RegExp = /[\xB0mm]/g;	
	Element.value=Element.value.replace(RegExp,'');	
		
		if (Element.id == 'Return' & Element.value == 'Full') {var ResultOfNumCheck = true;}
		else {var ResultOfNumCheck = allnumeric(Element);	}	

		//if (Element.id.indexOf('EdgeAngle') == -1) {allnumeric(Element);}
	CheckExtraPar(Element.id,ResultOfNumCheck);
	}
	

}

function ChangeAngleEdgeValue(SelectElem,e,InputID)
{
	if (SelectElem.selectedIndex > -1)
	{
		var SelectedText = SelectElem.options[SelectElem.selectedIndex].text;
		var RegExp = /[\xB0mm]/g; 
		//alert(SelectedText+' '+SelectElem.selectedIndex);
		var InputElem = document.getElementById(InputID);
		if (SelectedText != 'Other') 
		{
		InputElem.value=SelectedText.replace(RegExp,'');
		//alert(SelectedText.replace(RegExp,''));
		CheckExtraPar(InputID,allnumeric(InputElem));
		}
		else
		{

		InputElem.value = '';
		InputElem.focus();
			
		}
		SelectElem.selectedIndex = -1;
		
	}
}

function ChangeBuiltUpReturnType(SelectElem,e,InputID)
{
	if (SelectElem.selectedIndex > -1)
	{
		var SelectedText = SelectElem.options[SelectElem.selectedIndex].text;
		var RegExp = /mm/g; 
		//alert(SelectedText+' '+SelectElem.selectedIndex);
		var InputElem = document.getElementById(InputID);
		if (SelectedText == 'Full')
		{ InputElem.value=SelectedText;CheckExtraPar(InputID,true); }
		else if (SelectedText != 'Other') 
		{
		InputElem.value=SelectedText.replace(RegExp,'');
		CheckExtraPar(InputID,allnumeric(InputElem));
		}
		else
		{

		InputElem.value = '';
		InputElem.focus();
			
		}
		SelectElem.selectedIndex = -1;
	}
}

function ChangeHDFProfileQty(ProfileQtyValue)
{
var LineDiv = document.getElementById(LastSelectedLineID);	
	
	if (ProfileQtyValue == "1") 
	{
	RemoveExtraPar("ProfileQty",LineDiv.id);	
	RemoveExtraPar("RailW",LineDiv.id);
	RemoveExtraPar("BDH",LineDiv.id);
	DrawPreview('PreviewBox','PreviewBox2',document.getElementById('selectedline').innerHTML);	
	}
	else
	{
	CheckExtraPar("ProfileQty",true);	
	CheckExtraPar("RailW",true);	
		if (ProfileQtyValue == "BaseDoorHeight") {CheckExtraPar("BDH",true);}
		else {RemoveExtraPar("BDH",LineDiv.id);}
	}	
}

function HDFProfileQtyInputsVisibility(ProfileQtyValue)
{	

	if (ProfileQtyValue == "1") 
	{
	document.getElementById("HDFRailWidthDiv").style.display = "none";
	document.getElementById("HDFBaseDoorHeightDiv").style.display = "none";
	}
	else
	{
	document.getElementById("HDFRailWidthDiv").style.display = "inherit";
		if (ProfileQtyValue == "BaseDoorHeight") {document.getElementById("HDFBaseDoorHeightDiv").style.display = "inherit";}
		else {document.getElementById("HDFBaseDoorHeightDiv").style.display = "none";}
	}
	
	
}

function HDFExtraLengthChange(InputBox,e)
{
	if (e.type != 'keydown' | e.key == 'Enter')
	{
	var LineDiv = document.getElementById(LastSelectedLineID);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");
	var itemMaterial = document.getElementById("Material"+LineNumber).value;		
	var ProfileName = GetHDFProfileName(itemMaterial);
	var HHDItemIndex = FindItem(ProfileName,HDFDoorSpecData,'Profile');
		if (HHDItemIndex > -1)
		{
		var FrameMargin = parseFloat(HDFDoorSpecData[HHDItemIndex].ProfileMargin);
		
		document.getElementById(InputBox.id+"Calc").innerHTML = FrameMargin+parseFloat(InputBox.value);
		}
		
		if (parseFloat(InputBox.value) == 0) 
		{
		RemoveExtraPar(InputBox.id,LineDiv.id);
		DrawPreview('PreviewBox','PreviewBox2',document.getElementById('selectedline').innerHTML);	
		}
		else {CheckExtraPar(InputBox.id,true);}
	}
}

function GetObjPropValueByText(obj,proptext) 
{
	var props = proptext.split('.'); // Split the string into an array of property names
	var value = obj; // Start with the object itself

		for (var i = 0; i < props.length; i++) {

			if (value && value.hasOwnProperty(props[i])) {
				value = value[props[i]]; // Access the next nested property
			} else {
				value = undefined; // Property not found
				break;
			}
		}
	return value;
}

function GetLineHDFProfileIndex(LineID)
{
	var LineDiv = document.getElementById(LineID);
	var LineNumber = LineDiv.getAttribute("data-LineNumber");	
	var itemMaterial = document.getElementById("Material"+LineNumber).value;	
	var ProfileName = GetHDFProfileName(itemMaterial);
	return FindItem(ProfileName,HDFDoorSpecData,'Profile');
}

function HDFParamValueOK(LineID,Input,NewValue,PropText,CheckGreatThan,PromptVarName) 
{
	var Result = true;

	var HHDItemIndex = GetLineHDFProfileIndex(LineID);
	if (HHDItemIndex > -1)
	{
		var CheckValue = GetObjPropValueByText(HDFDoorSpecData[HHDItemIndex],PropText);
		Result = HDFCheckSize(CheckValue,CheckValue,NewValue,Input,CheckGreatThan,PromptVarName);
	}

	return Result;	
}

function HDFCheckSize(SizeCheckValue,FailCheckValue,NewValue,Input,CheckGreatThan,PromptVarName)
{
	var Result = true;

	if (SizeCheckValue != undefined)
	{
		if (CheckGreatThan) {
			if (NewValue > SizeCheckValue)
			{
			popup(PromptVarName+" cannot be more than "+SizeCheckValue+"mm!",200,400,1);
			Input.value = FailCheckValue;
			Result = false;
			}
		}
		else {
			if (NewValue < SizeCheckValue)
			{
			popup(PromptVarName+" cannot be less than "+SizeCheckValue+"mm!",200,400,1);
			Input.value = FailCheckValue;
			Result = false;
			}
		}
	}

	return Result;
}

function CheckExtraPar(BoxID,IsValidInput)
{
var LineID = document.getElementById("selectedline").innerHTML;
var BoxElem = document.getElementById(BoxID);
var NewValue = BoxElem.value;
var SizeOk = false;

	switch(BoxID)
	{
	case "TopFacWidth": 
						if ((parseFloat(NewValue) > PartLength-40) || (parseFloat(NewValue) < 40 )) { popup("Top Fascia cannot be greater than "+(PartLength-40).toString()+"mm or less than 40mm!",200,400,1); BoxElem.value = 58;} 
						else if (!IsValidInput | NewValue == '') {BoxElem.value = 58;} else { SizeOk = true; }	
						break;
	case "LeftFacWidth": 
						var RHFacWidth = document.getElementById("RigthFacWidth").value;
						if ((parseFloat(NewValue) > PartWidth-RHFacWidth-300) || (parseFloat(NewValue) < 25 )) { popup("Side Fascia cannot be greater than "+(PartWidth-RHFacWidth-300).toString()+"mm or less than 25mm",200,400,1); BoxElem.value = 46;} 
						else if (!IsValidInput | NewValue == '') {BoxElem.value = 46;} else { SizeOk = true; } 
						break;
	case "RigthFacWidth":
						var LHFacWidth = document.getElementById("LeftFacWidth").value;
						if ((parseFloat(NewValue) > PartWidth-LHFacWidth-300) || (parseFloat(NewValue) < 25 )) { popup("Side Fascia cannot be greater than "+(PartWidth-LHFacWidth-300).toString()+"mm or less than 25mm",200,400,1); BoxElem.value = 46;} 
						else if (!IsValidInput | NewValue == '') {BoxElem.value = 46;} else { SizeOk = true; } 
						break;
	case "Return": 
					if (!isNaN(NewValue) & NewValue != '' | NewValue == 'Full')
					{
						if (NewValue != 'Full')
						{
							if (parseFloat(NewValue) < 50) {popup("Return cannot be less than 50mm!",200,400,1);BoxElem.value = '50mm';}
							else {document.getElementById(BoxID).value = NewValue+'mm';SizeOk = true;}
						}
						else
						{SizeOk = true; }
					}
					else {BoxElem.value = 'Full';}
					break;
	case "VGSpacing":
					SizeOk = true;
					var HHDItemIndex = GetLineHDFProfileIndex(LineID);
					if (HHDItemIndex > -1)
					{
						var UserSpacing = HDFDoorSpecData[HHDItemIndex].VGrooves.UserSpacing;
						//alert(UserSpacing);
						if (UserSpacing != undefined)
						{
							var OpWidth = HDFDoorSpecData[HHDItemIndex].VGrooves.Width;
							if (NewValue < OpWidth)
							{
							var MaxSpacing = HDFDoorSpecData[HHDItemIndex].VGrooves.MaxSpacing;
							popup("Max Spacing cannot be less than "+OpWidth+"mm!",200,400,1);
							document.getElementById(BoxID).value = MaxSpacing;
							SizeOk = false;
							}
						}
					}
					break;
	case "FlatW":
					SizeOk = HDFParamValueOK(LineID,document.getElementById(BoxID),NewValue,'VGrooves.MinFlatWidth',false,'Flat Width');
					break;
	case "MaxScallopW":
					SizeOk = HDFParamValueOK(LineID,document.getElementById(BoxID),NewValue,'VGrooves.MaxMaxScallopWidth',true,'Max Scallop Width'); 
					break;
	case "PKDepth"	:
					SizeOk = HDFParamValueOK(LineID,document.getElementById(BoxID),NewValue,'MaxUserPocketDepth',true,'Pocket Depth'); 
					break;
	case "GrooveW"	:
					SizeOk = HDFParamValueOK(LineID,document.getElementById(BoxID),NewValue,'VGrooves.MinGrooveWidth',false,'Groove Width'); 
					break;					
	case "GrooveD"	:
					SizeOk = HDFParamValueOK(LineID,document.getElementById(BoxID),NewValue,'VGrooves.MaxGrooveDepth',true,'Groove Depth'); 
					break;						

	/* case "ProfileQty": 
		SizeOk = true;
		break;
	case "RailWidth":
		SizeOk = true;
		break;
	case "BaseDoorHeight":
		SizeOk = true;
		break;	 */		
	default : 
	
		if ((BoxID == 'LeftEdgeAngle' | BoxID == 'RightEdgeAngle' | BoxID == 'TopEdgeAngle' | BoxID == 'BotEdgeAngle') & NewValue.indexOf('\xB0') == -1)
		{
			if(!isNaN(NewValue) & NewValue != '')
			{
				if (parseFloat(BoxElem.value) <= 45 & parseFloat(BoxElem.value) >= -45)
				{
				NewValue = NewValue+'\xB0';	
				document.getElementById(BoxID).value = NewValue;
				SizeOk = true;
				}
				else {BoxElem.value = 45+'\xB0';popup("Angle is too large!",200,300,1);}
	
			}
			else {BoxElem.value = 45+'\xB0';}
			
	
		}
		else
		{
			SizeOk = true;
		}
			
		
	}
	
	var NewString = BoxID+"#"+NewValue;

	if ( SizeOk == true ) 
	{	
	//alert(NewString);
	UpdateExtraPar(BoxID,NewString,LineID);
		if (BoxID == "Return") {ChangeBanding(document.getElementById('selectedline').innerHTML);}
								
	Calculations(document.getElementById('selectedline').innerHTML);
	DrawPreview('PreviewBox','PreviewBox2',document.getElementById('selectedline').innerHTML);
	}
	
	if (BoxID == 'LeftEdgeAngle' | BoxID == 'RightEdgeAngle' | BoxID == 'TopEdgeAngle' | BoxID == 'BotEdgeAngle') {DrawAngleEdgePreview(document.getElementById(BoxID));}

} // end of CheckExtraPar


function UpdateExtraPar(BoxID,NewString,LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");	
var ExtraParamNode = document.getElementById("ExtraPar"+LineNumber);
ExtraParamNodeval = ExtraParamNode.value;

	if (NewString != '')
	{
		if (ExtraParamNodeval.indexOf(BoxID) > -1) //Parameter already exists
		{
		var Shortstring = ExtraParamNodeval.slice(ExtraParamNodeval.indexOf(BoxID),ExtraParamNodeval.length);
		var CarPos = Shortstring.indexOf(";");
		//alert(Shortstring);
		ExtraParamNode.value = ExtraParamNodeval.replace(Shortstring.slice(0,CarPos),NewString);
		}
		else
		{
		ExtraParamNode.value = ExtraParamNodeval+NewString+";";
		}
		
		//alert(ExtraParamNode.value);
	}
}

function RemoveExtraPar(BoxID,LineDivID)
{
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");	
var ExtraParamNode = document.getElementById("ExtraPar"+LineNumber);
ExtraParamNodeval = ExtraParamNode.value;

	if (ExtraParamNodeval.indexOf(BoxID) > -1) //Parameter exists
	{
	var StartPos = ExtraParamNodeval.indexOf(BoxID);
	var Shortstring = ExtraParamNodeval.slice(StartPos,ExtraParamNodeval.length);
	var CarPos = Shortstring.indexOf(";");
	ExtraParamNode.value = ExtraParamNodeval.replace(ExtraParamNodeval.slice(StartPos,StartPos+CarPos+1),'');
	}
}

/* function GetExtraParValue(BoxID,NewString,LineDivID)
{
var Shortstring = ExtraParamNode.slice(ExtraParamNode.indexOf("Return"),ExtraParamNode.length);
	//CarPos = Shortstring.indexOf(";")
	//document.getElementById("Return").value = Shortstring.slice(7,CarPos);	
} */

function GetExtraParValue(Parameter,LineDivID)
{
var Result = null;	
var LineDiv = document.getElementById(LineDivID);
var LineNumber = LineDiv.getAttribute("data-LineNumber");	
var ExtraParamNode = document.getElementById("ExtraPar"+LineNumber);
var ParamPos = ExtraParamNode.value.indexOf(Parameter);
var Shortstring = ExtraParamNode.value.slice(ParamPos,ExtraParamNode.value.length);
var CarPos = Shortstring.indexOf(";");
var Result = Shortstring.slice(Parameter.length+1,CarPos);
return Result
}



function CheckBeforeSubmit(Type)
{
var CheckResult = true;
	CheckResult = CheckIlegalChar(document.getElementById("SpecInstruct")); 
	
	/*Check for invalid part dimensions */
	for (var r = 1; r<counter; r++) 
	{
		if (isNaN(parseFloat(document.getElementById("Length"+r).value)) | parseFloat(document.getElementById("Length"+r).value) == 0) 
		{popup("Invalid Length for Line "+r+"!",200,400,1);CheckResult = false;}
		if (isNaN(parseFloat(document.getElementById("Width"+r).value)) | parseFloat(document.getElementById("Width"+r).value) == 0) 
		{popup("Invalid Width for Line "+r+"!",200,400,1);CheckResult = false;}		
	}
	
	if (CheckResult)
	{	
		
	
		if ( Type == 'Quote' )
		{ 
			if (document.getElementById("Suberbinput").value == "" &&  document.getElementById("ClientCollectCheck").checked == false) 
			{ popup("You must have a Suburb so that Freight can be calculated!",200,400,1); document.getElementById("Suberbinput").style.backgroundColor="rgba(255,0,00,1)"; } else { submitForm('Quote'); } 
		}
		if ( Type == 'Order' )
		{
			if (document.getElementById("YourRef").value == "" ) { popup("You must have a referance!",200,400,1); document.getElementById("YourRef").style.backgroundColor="rgba(255,0,00,1)"; }
			else if (document.getElementById("Dispdate").value == "" ) { popup("You must have a Dispatch Date",200,400,1); document.getElementById("Dispdate").style.backgroundColor="rgba(255,0,00,1)"; document.getElementById("YourRef").style.backgroundColor="#FFFFFF"; }
			else if (document.getElementById("Address").value == "" ) { popup("You must have an address line!",200,400,1); document.getElementById("Address").style.backgroundColor="rgba(255,0,00,1)"; document.getElementById("YourRef").style.backgroundColor="#FFFFFF"; }
			else if (document.getElementById("Suberbinput").value == "" & document.getElementById("ClientCollectCheck").checked == false) { popup("You must have a Suburb so that Freight can be calculated!",200,400,1); document.getElementById("Suberbinput").style.backgroundColor="rgba(255,0,00,1)"; document.getElementById("Address").style.backgroundColor="#FFFFFF"; }
			else 
			{ 
			var MatsArr = [];
				for (var r = 1; r<counter; r++) 
				{
					var MatName = document.getElementById("Material"+r).value;
					if (MatsArr.indexOf(MatName) == -1) {MatsArr.push(MatName);}				
				}
					
				if (MatsArr.length > 1) 
				{	
					var MatsListStr = MatsArr[0];
					for (var r = 1; r<MatsArr.length; r++) 
					{
					MatsListStr = MatsListStr + "\n" + MatsArr[r];	
					}
					popup("PLEASE NOTE\n Your order has more than one material/colour:\n Do you want to proceed?\n "+MatsListStr,180+MatsArr.length*25,450,2,"submitForm('Order')");
				}
				else
				{document.getElementById("Suberbinput").style.backgroundColor="#FFFFFF"; popup("Once we have processed your order,  you will not be able to make any changes. Do you still want to proceed?",200,350,2,"submitForm('Order')");}
			} 
		}
	}
}

function submitForm(Type)
{ 

	if (Type != 'PrintCompOrder' & Type != "")
	{
		PromptStayOnPageWithTabClose = false;	
		var MainForm = document.getElementById("Mainform"); 
			var 	Input = document.createElement("input");
			Input.id = "Type";
			Input.type = "hidden";
			Input.name = "SaveType";
			Input.value = Type;
			MainForm.appendChild( Input );
		
		/*Enable Disabled Lines*/
		for (var r = 1; r<counter; r++) 
		{
		document.getElementById("Material"+r).removeAttribute("disabled");
		document.getElementById("Qty"+r).removeAttribute("disabled");
		document.getElementById("Description"+r).removeAttribute("disabled");
		document.getElementById("Length"+r).removeAttribute("disabled");
		document.getElementById("Width"+r).removeAttribute("disabled");
		document.getElementById("UnitRef"+r).removeAttribute("disabled");
		}
			
		popup("Please wait while data is being processed!",160,400,3);
		document.getElementById("LineQty").value = counter-1; document.getElementById("Freightinput").value = document.getElementById("Freight").innerHTML;
		MainForm.submit();
	}
}


function CheckFreight()
{

		if ( document.getElementById("Suberbinput").value != "") 
		{
			if ( FindItem(document.getElementById("Suberbinput").value,Suberbdirectory,"Suberb") > -1 )
			{
			document.getElementById("Cityinput").value = Suberbdirectory[FindItem(document.getElementById("Suberbinput").value,Suberbdirectory,"Suberb")].City;
			} else { popup("This suburb is not valid for freight calculation. Make sure you select a suburb from the dropdown list!",200,400,1); document.getElementById("Suberbinput").value = ""; }

		}
		else 
		{
			if (document.getElementById("ClientCollectCheck").checked) 
			{			
			popup("You must select a suburb before freight can be calculated",200,400,1); 
			}
		}
	
	CalcFreight();
} //End of CheckFreight



function CalcFreight()
{
var longestlength = 0;
var widestwidth = 0;
var jobweight = 0;
/* var PartWeight = 0;
var LargePartWeight = 0;
var PartCubicWeight = 0;
var LargePartCubicWeight = 0;
var PartThick = 0;
var TotalPanelQty = 0; */
var AddCharge = AddFreightCharge;



	for (var x = 1; x<counter; x++)
	{
		if ( document.getElementById("Length"+x).value > 0 && document.getElementById("Width"+x).value > 0 )
		{ 
		var LengthNode = parseFloat(document.getElementById("Length"+x).value);
		var WidthNode = parseFloat(document.getElementById("Width"+x).value);
		var QtyNode = parseFloat(document.getElementById("Qty"+x).value);
		jobweight = jobweight + ((LengthNode*WidthNode*0.0000138)*QtyNode);
		if (LengthNode > WidthNode) { if (LengthNode > longestlength) {longestlength = LengthNode; } } else { if (WidthNode > longestlength) {longestlength = WidthNode; } }
		if (LengthNode < WidthNode) { if (LengthNode > widestwidth) {widestwidth = LengthNode; } } else { if (WidthNode > widestwidth) {widestwidth = WidthNode; } }
		
			/* PartWeight = LengthNode*WidthNode*0.0000138;
			if (PartWeight > LargePartWeight) {LargePartWeight = PartWeight}
	
			PartThick = GetMatThickFromName(document.getElementById("Material"+x).value);
	
			PartCubicWeight = (LengthNode/1000)*(WidthNode/1000)*(PartThick/1000)*200;
			if (PartCubicWeight > LargePartCubicWeight) {LargePartCubicWeight = PartCubicWeight}
			
			TotalPanelQty = TotalPanelQty + QtyNode; */
		}
	}



	if ( document.getElementById("Suberbinput").value != "" && FindItem(document.getElementById("Suberbinput").value,Suberbdirectory,"Suberb") > -1 && longestlength > 0 && widestwidth > 0) 
	{

	var packagingweight = ((longestlength+50)*(widestwidth+250)*0.0000208)+((widestwidth+200)*0.007)+10;
	var totalweight = jobweight+packagingweight*(Math.round(0.5*(((Math.abs(jobweight-24.49999999)+(jobweight-24.49999999))/(2*(jobweight-24.49999999)) )+((Math.abs(longestlength-1950.000001)+(longestlength-1950.000001))/(2*(longestlength-1950.000001)) ))));
	var RowWeight=((25*(parseInt(0.99+totalweight/25)))*((Math.abs(totalweight-10.001)+(totalweight-10.001))/(2*(totalweight-10.001)))+(5*(parseInt(0.99+totalweight/5)))*((Math.abs(10.001-totalweight)+(10.001-totalweight))/(2*(10.001-totalweight))))*((Math.abs(275.001-totalweight)+(275.001-totalweight))/(2*(275.001-totalweight)))+275*((Math.abs(totalweight-275.001)+(totalweight-275.001))/(2*(totalweight-275.001)));
	var ExcessWeight =((25*(parseInt(0.9999+totalweight/25)))-275)*((Math.abs(totalweight-275.001)+(totalweight-275.001))/(2*(totalweight-275.001))); 

	var FreightCode = Suberbdirectory[FindItem(document.getElementById("Suberbinput").value,Suberbdirectory,"Suberb")].Code;

	document.getElementById("TotalWeight").value = totalweight;

	//alert(document.getElementById("TotalWeight").value);
	
	//if (TotalPanelQty < 10 & longestlength <= 2400 & widestwidth <= 2400 & LargePartWeight < 25 & LargePartCubicWeight < 25) {AddCharge = 0;}
	if (RowWeight <= 25) {AddCharge = 0;}

	
		if (document.getElementById("ClientCollectCheck").checked) 
		{
		return document.getElementById("Freight").innerHTML = parseFloat(0);
		}
		else
		{
		var FreightIndex = FindItem(FreightCode,FreightRates,"Code");
			
		var FreightAmount = (AddCharge + (parseFloat(FreightRates[FreightIndex]["excess per kg"])*ExcessWeight)+parseFloat(FreightRates[FreightIndex][RowWeight])).toFixed(2);
			if (!isNaN(FreightAmount))
			{return document.getElementById("Freight").innerHTML = FreightAmount;}
			else {popup("Error! something is wrong with the freight calculation",150,350,1); return parseFloat(10000);}
		}
	}
	else { return parseFloat(0); }
	

	//alert(document.getElementById("Freight").innerHTML);
	//alert("Length-"+longestlength+" WIdth-"+widestwidth);

} //End of CalcFreight

function HideShowAddressInputs()
{
	if (document.getElementById("ClientCollectCheck").checked) 
	{
	document.getElementById("AddressLabel").style.display = "none";
	document.getElementById("SuburbLabel").style.display = "none";
	document.getElementById("CityLabel").style.display = "none";
	document.getElementById("PostCodeLabel").style.display = "none";
	
	document.getElementById("Address").style.display = "none";
	document.getElementById("Suberbinput").style.display = "none";
	document.getElementById("Cityinput").style.display = "none";
	document.getElementById("PostCode").style.display = "none";
	
	document.getElementById("CollectContactLabel").style.display = "inherit";
	document.getElementById("CollectContactNumberLabel").style.display = "inherit";	
	document.getElementById("CollectContact").style.display = "inherit";
	document.getElementById("CollectContactNumber").style.display = "inherit";			
	}
	else
	{
	document.getElementById("AddressLabel").style.display = "inherit";
	document.getElementById("SuburbLabel").style.display = "inherit";
	document.getElementById("CityLabel").style.display = "inherit";
	document.getElementById("PostCodeLabel").style.display = "inherit";
	
	document.getElementById("Address").style.display = "inherit";
	document.getElementById("Suberbinput").style.display = "inherit";
	document.getElementById("Cityinput").style.display = "inherit";
	document.getElementById("PostCode").style.display = "inherit";
	
	
	document.getElementById("CollectContactLabel").style.display = "none";
	document.getElementById("CollectContactNumberLabel").style.display = "none";
	document.getElementById("CollectContact").style.display = "none";
	document.getElementById("CollectContactNumber").style.display = "none";		
	}
	
	if(counter > 1) {Calculations(document.getElementById("LineDiv1").id);}
	
}

function ExecSubMaterial()
{
 if (document.getElementById('SubMatList').value != '' && document.getElementById('NewMatList').value != '')
 {
	var itemMaterial = document.getElementById('NewMatList').value;
	
	if (itemMaterial.indexOf("ACRYGLOSS") > -1 | itemMaterial.indexOf("ACRYMATTE") > -1 | itemMaterial.indexOf("TIMBALOOK") > -1 | itemMaterial.indexOf("SOFT TOUCH") > -1  ) 
	{ var SheetMargin = 12;} else { var SheetMargin = 4.5;}

	if ( Materials[FindItem(itemMaterial,Materials,"Name")].Grained == "True" ) {var IsGrained = true;} else {var IsGrained = false;}

	var SheetLength = Materials[FindItem(itemMaterial,Materials,"Name")].SheetLength;
	var SheetWidth =  Materials[FindItem(itemMaterial,Materials,"Name")].SheetWidth;	
	 
	 
	for (var r = 1; r<counter; r++) 
	{
		if ( document.getElementById("Material"+r).value == document.getElementById('SubMatList').value) //document.getElementById("PNCPartID"+r).value == 0
		{
		document.getElementById("Material"+r).value = document.getElementById('NewMatList').value;	
			
			if (document.getElementById("PanelType"+r).value == 'Profile Handle' & IsGrained) { var ExtraLength = 60;} else {var ExtraLength = 0;}
	
			var MaxSheetLength = SheetLength-ExtraLength-(SheetMargin*2)-1;
			var MaxSheetWidth = SheetWidth-ExtraLength-(SheetMargin*2)-1;	
			
			//alert(PartLength+"-"+MaxSheetLength+"-"+MaxSheetWidth);
			
			PartLength  = parseFloat(document.getElementById("Length"+r).value);
			PartWidth = parseFloat(document.getElementById("Width"+r).value);
			
			if (IsGrained & PartLength > MaxSheetLength | IsGrained == false & (PartLength > MaxSheetLength & PartLength > MaxSheetWidth)) 
			{
				if (PartLength > MaxSheetLength)
				{
				popup("Line "+document.getElementById("LineNo"+r).value+" Panel Length is greater than new substituted sheet Length and will be adjusted!",150,350,1);
				document.getElementById("Length"+r).value = MaxSheetLength;
				}
				else
				{
				popup("Line "+document.getElementById("LineNo"+r).value+" Panel Length is greater than new substituted sheet Width and will be adjusted!",150,350,1);
				document.getElementById("Length"+r).value = MaxSheetWidth;	
				}
			}
			if (IsGrained == false & (PartWidth > MaxSheetLength & PartWidth > MaxSheetWidth) | IsGrained & PartWidth > MaxSheetWidth) 
			{
				if (PartWidth > MaxSheetLength)
				{
				popup("Line "+document.getElementById("LineNo"+r).value+" Panel Width is greater than new substituted sheet Length and will be adjusted!",150,350,1);
				document.getElementById("Width"+r).value = MaxSheetLength;
				}
				else
				{
				popup("Line "+document.getElementById("LineNo"+r).value+" Panel Width is greater than new substituted sheet Width and will be adjusted!",150,350,1);
				document.getElementById("Width"+r).value = MaxSheetWidth;
				}
			}
			 
		 	/*if (IsGrained == true & PartLength > MaxSheetLength | IsGrained == true & PartLength > MaxSheetLength | IsGrained == false & PartLength > MaxSheetWidth )
			{	
			//popup("Panel is too large for sheet! This value must be less than "+parseFloat(MaxSize)+"mm.",150,350,1);
			document.getElementById("Length"+r).value = MaxSheetLength;
			}
			
			if (IsGrained == true & PartWidth > MaxSheetWidth | IsGrained == false & PartLength > MaxSheetWidth)
			{	
			//popup("Panel is too large for sheet! This value must be less than "+parseFloat(MaxSize)+"mm.",150,350,1);
			document.getElementById("Width"+r).value = MaxSheetWidth;
			} */
	
			
			
		
			var LineJSON = document.getElementById("LineJSON"+r).value;
			if (LineJSON != '') 
			{
			PartJSON = JSON.parse(LineJSON);
			RecalcAllPartObj();
			document.getElementById("LineJSON"+r).value = JSON.stringify(PartJSON);
			}
	
			var HDFFramedDoor = IsHDFFramedDoor(document.getElementById("Material"+r).value);

			if ( Materials[FindItem(document.getElementById("Material"+r).value,Materials,"Name")].Grained == "True" ) {var IsGrained = true;} else {var IsGrained = false;}

			if ( !IsGrained & !HDFFramedDoor) 
			{
			RemoveGrainMatchParams("LineDiv"+r)
			RemoveExtraPar("DrwFrontOption","LineDiv"+r);
			}
			
			SwapOutStdEdgeType("LineDiv"+r,r,'ChangeOutHDFEdgesForMat("'+document.getElementById("Material"+r).value+'",'+r+')');

		Calculations(document.getElementById("Material"+r).parentNode.id);			
		}		
	}
	CloseWindow('hiddenDiv2','popUpDiv2','blanket2');
 }
}

function ChangeOutHDFEdgesForMat(TargetMaterial,StartLineNo)
{
var CallFuncWithArg = '';	
	//alert("ChangeOutHDFEdgesForMat("+TargetMaterial+")");
	for (var r = StartLineNo; r<counter; r++) 
	{
	var LineMaterial = document.getElementById("Material"+r).value;	
		if (LineMaterial == TargetMaterial | TargetMaterial == "") 
		{
			if (TargetMaterial == "") {CallFuncWithArg = 'SwapOutStdEdgeType("LineDiv'+r+'",'+r+',ChangeOutHDFEdgesForMat("",'+(r+1)+'));';}	//CloseWindowPopUp("hiddenDiv","DynamicElemsDiv","blanket");
		//alert(r); 	
		SwapOutStdEdgeType("LineDiv"+r,r,CallFuncWithArg);	
		}
	}
}

function FindItemInArray(JSONList,SearchItem)
{
var x = -1;
for (var r = 0; r<JSONList.length; r++) 
{
if (JSONList[r] == SearchItem) { x = r; } 
} 
if (x > -1) { return x; } else { return -1; } 
}

function LineMaterialHavePNCPartID(TargetMaterial)
{
var Result = false;
	for (var r = 1; r<counter; r++) 
	{
		if (TargetMaterial == document.getElementById("Material"+r).value)
		{
			var PNCPartID = document.getElementById("PNCPartID"+r).value;
			if (PNCPartID > 0) {Result = true;break;}
		}
	}

	return Result;
}




function BuildLineMaterialsList()
{
var MatList	= [];	
var OrderMaterials = [];

	for (var r = 1; r<counter; r++) 
	{
		var LineMaterial = document.getElementById("Material"+r).value;
		if ( FindItemInArray(OrderMaterials,LineMaterial) == -1)
		{
			var ItemIndex = FindItem(LineMaterial,Materials,"Name");
			if (ItemIndex > -1)
			{
			MatList.push({ "Name" : ""+Materials[ItemIndex].Name+"" , "colour" : ""+Materials[ItemIndex].colour+"" });
			OrderMaterials.push(LineMaterial);
			}
		}		
	}
	return MatList
}

function SubMaterialsList()
{
var MatList	= [];
var SelMaterial = document.getElementById('SubMatList').value;	
var HasPNCParts = LineMaterialHavePNCPartID(SelMaterial);
var ExistMatThick = GetMatThickFromName(SelMaterial);

	if (SelMaterial != "")
	{
		for (var i=0; i<Materials.length;i++) 
		{
			if (SelMaterial.indexOf("36") == -1 & SelMaterial.indexOf("60") == -1)
			{
				var MatThick = GetMatThickFromName(Materials[i].Name);
				if (MatThick > ExistMatThick-1 & MatThick < ExistMatThick+1 & HasPNCParts | !HasPNCParts)
				{
					if (Materials[i].Name.indexOf("36") == -1 & Materials[i].Name.indexOf("60") == -1)
					{ MatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+"" }); }
				}
			}
			else
			{
				if (Materials[i].Name.indexOf("36") > -1 | Materials[i].Name.indexOf("60") > -1)
				{ MatList.push({ "Name" : ""+Materials[i].Name+"" , "colour" : ""+Materials[i].colour+"" }); }
			}
		}
	}
	return MatList
}

function ClearNewSubMatBox()
{
	document.getElementById('NewMatList').value = "";	
}


function ShowMaterialSubWindow(WinHieght,WinWidth) {
    var HiddenDIv = document.getElementById("hiddenDiv2");
	var frm = document.getElementById('Mainform');
	//var OrderMaterials = [];


	if (HiddenDIv.childNodes.length == 0 ) 
	{



		var Blanket = document.createElement("div");
		Blanket.id = "blanket2";
		HiddenDIv.appendChild( Blanket );
		
		var popUpDiv = document.createElement("div");
		popUpDiv.id = "popUpDiv2";
		//var styleAtt = document.createAttribute("style"); StyleAtt.value="width:"; popUpDiv.setAttributeNode(StyleAtt);
		
		var SubMatButton = document.createElement("input");
		SubMatButton.id = "SubMatButton";
		SubMatButton.type = "button";
		SubMatButton.value = "Substitute";
		SubMatButton.setAttribute("class", "BigButton");
		SubMatButton.setAttribute("onclick", "ExecSubMaterial();");
		SubMatButton.setAttribute("style", "position:absolute;bottom:20px;width:100px;");	
		popUpDiv.appendChild( SubMatButton );
		
		var CancelButton = document.createElement("input");
		CancelButton.id = "CancelButton";
		CancelButton.type = "button";
		CancelButton.value = "Cancel";
		CancelButton.setAttribute("class", "BigButton");
		CancelButton.setAttribute("onclick", "CloseWindow('hiddenDiv2','popUpDiv2','blanket2');");
		CancelButton.setAttribute("style", "position:absolute;bottom:20px;width:100px;");	
		popUpDiv.appendChild( CancelButton );
		
		
		var SubMatLabel = document.createElement("label");
		SubMatLabel.id = "SubMatLabel";
		SubMatLabel.innerHTML = "Material to Substitute";
		SubMatLabel.setAttribute("style", "position:absolute;top:32px;");
		popUpDiv.appendChild( SubMatLabel );
		
		var SelectBox1= document.createElement("input");
		SelectBox1.id = "SubMatList";
		SelectBox1.className = "Inputlines";
		SelectBox1.setAttribute("style","top:30px;width:227px;font-size:0.75em;user-select: none;cursor:context-menu");
		SelectBox1.setAttribute("onmouseup","ShowCustomDropDown(this,BuildLineMaterialsList())");
		SelectBox1.setAttribute("oninput","KeyDownShowCustomDropDown(this,BuildLineMaterialsList())");
		SelectBox1.setAttribute("onchange", "ClearNewSubMatBox();");
		SelectBox1.setAttribute("data-AssocInputID","SubMatList");

		var SelectBox1Button = document.createElement("input");
		SelectBox1Button.id = "SubMatListButton";
		SelectBox1Button.className = "Inputlines RightDropDownButton";
		SelectBox1Button.type = "button";
		SelectBox1Button.setAttribute("style","top:30px;width:23px;");
		SelectBox1Button.setAttribute("onmouseup","ShowCustomDropDown(this,BuildLineMaterialsList())");
		SelectBox1Button.setAttribute("data-AssocInputID","SubMatList");
		
		
		popUpDiv.appendChild( SelectBox1 );
		popUpDiv.appendChild( SelectBox1Button );
		
		var SubMatLabel = document.createElement("label");
		SubMatLabel.id = "NewMatLabel";
		SubMatLabel.innerHTML = "New Material";
		SubMatLabel.setAttribute("style", "position:absolute;top:72px;");
		popUpDiv.appendChild( SubMatLabel );


		var SelectBox2= document.createElement("input");
		SelectBox2.id = "NewMatList";
		SelectBox2.className = "Inputlines";
		SelectBox2.setAttribute("style","top:70px;width:227px;font-size:0.75em;user-select: none;cursor:context-menu");
		SelectBox2.setAttribute("onmouseup","ShowCustomDropDown(this,SubMaterialsList())");
		SelectBox2.setAttribute("oninput","KeyDownShowCustomDropDown(this,SubMaterialsList())");
		SelectBox2.setAttribute("data-AssocInputID","NewMatList");
	
		var SelectBox2Button = document.createElement("input");
		SelectBox2Button.id = "NewMatListButton";
		SelectBox2Button.className = "Inputlines RightDropDownButton";
		SelectBox2Button.type = "button";
		SelectBox2Button.setAttribute("style","top:70px;width:23px;");
		SelectBox2Button.setAttribute("onmouseup","ShowCustomDropDown(this,SubMaterialsList())");
		SelectBox2Button.setAttribute("data-AssocInputID","NewMatList");	

		popUpDiv.appendChild( SelectBox2 );
		popUpDiv.appendChild( SelectBox2Button );	
			
		HiddenDIv.appendChild( popUpDiv );
		
		document.getElementById("SubMatButton").style.left=((WinWidth-200)/2) + "px";
		document.getElementById("CancelButton").style.left=((WinWidth-200)/2+120) + "px";
		//document.getElementById("SubMatList").style.left=((WinWidth-70)/2) + "px";
		SelectBox1.style.left=((WinWidth-70)/2) + "px";
		var LeftPos = parseInt(SelectBox1.style.left);
		var ElemWidth = parseInt(SelectBox1.style.width);
		SelectBox1Button.style.left= (LeftPos + ElemWidth) + "px";
		document.getElementById("SubMatLabel").style.left=((WinWidth-390)/2) + "px";	
		SelectBox2.style.left=((WinWidth-70)/2) + "px";
		var LeftPos = parseInt(SelectBox2.style.left);
		var ElemWidth = parseInt(SelectBox2.style.width);
		SelectBox2Button.style.left= (LeftPos + ElemWidth) + "px";
		document.getElementById("NewMatLabel").style.left=((WinWidth-300)/2) + "px";

		SetpopupWin(popUpDiv,Blanket,WinHieght,WinWidth);

		
	}

} //ShowMaterialSubWindow


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
	var ElemRect = ev.target.getBoundingClientRect();
	var MouseX = ev.clientX;
	var MouseY = ev.clientY;
	var XOffset = ElemRect.left - MouseX;
	var YOffset = ElemRect.top - MouseY;	
	ev.target.setAttribute("XOffset", ""+XOffset+"");
	ev.target.setAttribute("YOffset", ""+YOffset+"");
}

function drop(ev) 
{
ev.preventDefault();

	if (ev.target.id == "GroupBox" || ev.target.id == "PartsListBox")
	{
	var data = ev.dataTransfer.getData("text");
	var DropElem = document.getElementById(data);
	var LineNumber = document.getElementById(DropElem.name).getAttribute("data-LineNumber");	
	var AddPartQty = document.getElementById("Qty"+LineNumber).value;
	var PanelType = document.getElementById("PanelType"+LineNumber).value;
	
	var AddPartMaterial = document.getElementById("Material"+LineNumber).value;
	if (ev.target.children.length > 0) 
	{
	var FirstChildLineNumber = document.getElementById(ev.target.firstElementChild.name).getAttribute("data-LineNumber");	
	var FirstPartMaterial = document.getElementById("Material"+FirstChildLineNumber).value; 
	}
	else {var FirstPartMaterial = "nil"}
	
	if (AddPartMaterial.indexOf(HDFPrefix) > -1 ) {var IsHDFMaterial = true} else {var IsHDFMaterial = false}

	//alert(document.getElementById(document.getElementById(data).name).childNodes.item(15).value);	
		if (AddPartQty == 1)
		{
			if (AddPartMaterial == FirstPartMaterial || FirstPartMaterial == "nil" || ev.target.id == "PartsListBox") 
			{	
			SetHDFDrwFrontOptionsVisibility(AddPartMaterial);

				ev.target.appendChild(DropElem);
				var PartLineDivID = DropElem.name;
				var GroupBoxDiv = document.getElementById('GroupBox');

				if (ev.target.id == "PartsListBox")
				{
				DropElem.style.position = "relative";
				DropElem.style.left = "0px";
				DropElem.style.top = "0px";	
				//UpdateExtraPar("GrainMatchGroup","GrainMatchGroup#0",document.getElementById(DropElem.name).id);
				//UpdateExtraPar("GrainMatchOrder","GrainMatchOrder#0",document.getElementById(DropElem.name).id);
				RemoveGrainMatchParams(PartLineDivID);			
				
					if (GroupBoxDiv.children.length == 0) {document.getElementById("HDFDrwFrontOptions").style.display = "none";} 
					document.getElementById("AddInfo"+LineNumber).removeAttribute("placeholder");
				}
				else
				{
					var CurrentGroupNumber = GetGrainMatchGroupNumber(document.getElementById("GroupSelect").value);
					UpdateExtraPar("GrainMatchGroup","GrainMatchGroup#"+CurrentGroupNumber,PartLineDivID);

					if (IsHDFMaterial | PanelType == 'Profile Handle') 
					{
						UpdateExtraPar("DrwFrontOption","DrwFrontOption#"+document.getElementById("HDFDrwFrontOptions").value,PartLineDivID);
						for (var r = 0; r<GroupBoxDiv.children.length; r++) 
						{
							UpdateExtraPar("GrainMatchOrder","GrainMatchOrder#"+parseFloat(r+1),GroupBoxDiv.children[r].name);		
						}
					}
					else
					{
					var MouseX = ev.clientX;
					var MouseY = ev.clientY;
					var GroupBoxRect = GroupBoxDiv.getBoundingClientRect();
					var XOffset = parseFloat(DropElem.getAttribute("XOffset"));	
					var YOffset = parseFloat(DropElem.getAttribute("YOffset"));
					var AbsLeftPos = parseFloat(MouseX - GroupBoxRect.left + XOffset);
					var AbsTopPos = parseFloat(MouseY - GroupBoxRect.top + YOffset);
					var AbsRightPos = AbsLeftPos + parseFloat(DropElem.style.width);
					var AbsBotPos = AbsTopPos + parseFloat(DropElem.style.height);
					var MinLeft = 0;
					var MinTop = 0;
					var TrueLeftPos = 0;
					var TrueTopPos = 0;
					var MaxTop = 0;	

						if (ev.ctrlKey)
						{
							MinLeft	= AbsLeftPos;	
							MinTop = AbsTopPos;	
						}
						else
						{
							for (var r = 0; r<GroupBoxDiv.children.length; r++) 
							{
								if (GroupBoxDiv.children[r] != DropElem)
								{
								var ChildLeft = GroupBoxDiv.children[r].offsetLeft;
								var ChildTop = GroupBoxDiv.children[r].offsetTop; 
								var ChildRight = GroupBoxDiv.children[r].offsetLeft+GroupBoxDiv.children[r].offsetWidth;
								var ChildBot = GroupBoxDiv.children[r].offsetTop+GroupBoxDiv.children[r].offsetHeight;
								//alert("AbsRightPos="+AbsRightPos*GrainMatchPartSizeRatio+" ChildLeft="+ChildLeft*GrainMatchPartSizeRatio);

								if (AbsTopPos < ChildBot & AbsLeftPos > ChildRight & AbsRightPos > ChildLeft & AbsBotPos > ChildTop & ChildRight > MinLeft) 
								{
									MinLeft = ChildRight;
									//popup('Note: all grain matching is cut on our CNC with a 9mm tool, so side-by-side grain matching will not line up perfectly with vertical parts in the same group. Contact us if this will cause any issues',200,400,1);
								}
								if (AbsLeftPos < ChildRight & AbsBotPos > ChildTop & AbsRightPos > ChildLeft & ChildBot > MinTop) {MinTop = ChildBot;}
								//if (AbsTopPos > ChildBot & AbsLeftPos > ChildRight & AbsRightPos > ChildLeft & ChildBot > MinTop) {MinTop = ChildBot;}
		
								}	
							}
						}

						DropElem.style.position = "absolute";
						DropElem.style.left = MinLeft + "px";
						DropElem.style.top = MinTop + "px";

					

						TrueLeftPos = Math.ceil(MinLeft*GrainMatchPartSizeRatio);
						//TrueTopPos = Math.ceil(MinTop*GrainMatchPartSizeRatio);		

						UpdateExtraPar("GrainMatchXPos","GrainMatchXPos#"+parseFloat(TrueLeftPos),PartLineDivID);
						//UpdateExtraPar("GrainMatchYPos","GrainMatchYPos#"+parseFloat(TrueTopPos),PartLineDivID);
						for (var r = 0; r<GroupBoxDiv.children.length; r++) 
						{
							var ChildBot = GroupBoxDiv.children[r].offsetTop+GroupBoxDiv.children[r].offsetHeight;
							if (ChildBot > MaxTop) {MaxTop = ChildBot;}
						}
						

						for (var r = 0; r<GroupBoxDiv.children.length; r++) 
						{
							var ChildBot = GroupBoxDiv.children[r].offsetTop+GroupBoxDiv.children[r].offsetHeight;
							TrueTopPos = Math.ceil((MaxTop-ChildBot)*GrainMatchPartSizeRatio);
							UpdateExtraPar("GrainMatchYPos","GrainMatchYPos#"+parseFloat(TrueTopPos),GroupBoxDiv.children[r].name);	
						}

						


					
					}
					document.getElementById("AddInfo"+LineNumber).placeholder = "Group " + CurrentGroupNumber;	
				}
				
				
				if (IsHDFMaterial | PanelType == 'Profile Handle') 
				{
				DrawPreview(DropElem.firstChild.id,'PreviewBox2',PartLineDivID);

					for (var r = 0; r<GroupBoxDiv.children.length; r++) 
					{
					DrawPreview(GroupBoxDiv.children[r].firstChild.id,'PreviewBox2',GroupBoxDiv.children[r].name);					
					}	
				}
			}
			else {popup("Cannot grain match different materials!",150,400,1);}
		}
		else {popup("Grain Matched parts cannot have a Qty greater than 1!",150,400,1);}
	
	}
}


function GetGrainMatchGroupNumber(GroupName)
{
	var CurrentGroup = GroupName;
	var CarPos = CurrentGroup.indexOf(" ");
	return CurrentGroup.slice(CarPos+1);		
}

function ChangeHDFDrwFrontOption()
{
	var GroupBox = document.getElementById('GroupBox');
	
	for (var r = 0; r<GroupBox.children.length; r++) 
	{
		UpdateExtraPar("DrwFrontOption","DrwFrontOption#"+document.getElementById("HDFDrwFrontOptions").value,GroupBox.children[r].name);
		DrawPreview(GroupBox.children[r].firstChild.id,'PreviewBox2',GroupBox.children[r].name);		
	}		
}

function PopulateGrainMatchGroupSelect()
{
var GroupsList = [];

	for (var r = 1; r<counter; r++) 
	{
	var ThisGroupNumber = GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+r).id)
		if (ThisGroupNumber	> 1)
		{
			if (FindItemInArray(GroupsList,ThisGroupNumber) == -1 ) 
			{
			GroupsList.push(ThisGroupNumber);		
			}		
		}
				
	}
	GroupsList.sort();
	for (var r = 0; r<GroupsList.length; r++) 
	{	
	AddGrainMatchGroup(true,GroupsList[r]);
	}
}

function GrainMatchGroupSelectChange()
{
	document.getElementById('GroupBox').innerHTML = '';
	PopulateGrainMatchPartLists(GetGrainMatchGroupNumber(document.getElementById('GroupSelect').value),document.getElementById('GroupBox'));
}

function GetGrainMatchPartAfter(ListBox,ThisGroupOrder)
{
var Result = -1;
var LastOrder = 100;
	for (var r = 0; r<ListBox.children.length; r++) 
	{
	var GroupOrder = ListBox.children[r].getAttribute("GroupOrder");	
		if (GroupOrder != ThisGroupOrder)
		{
			//alert(ListBox.childNodes[r].getAttribute("GroupOrder"));
			if (GroupOrder > ThisGroupOrder & GroupOrder < LastOrder) {Result = r; LastOrder = GroupOrder;}
		}
	}
	return Result
}

function FindLastGroupPartOrder(GroupNumber)
{
var LastGroupOrder = 0;	
	for (var r = 1; r<counter; r++) 
	{
	var OtherGroupNumber = GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+r).id);
		if (OtherGroupNumber == GroupNumber)
		{
			var GroupOrder = GetExtraParValue("GrainMatchOrder",document.getElementById("LineDiv"+r).id);
			if (GroupOrder > LastGroupOrder) {LastGroupOrder = GroupOrder;}
		}
	}
	return LastGroupOrder;
}

function FindMaxGroupYPos(GroupNumber)
{
var MaxYPos = 0;
	for (var r = 1; r<counter; r++) 
	{
	var OtherGroupNumber = GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+r).id);
		if (OtherGroupNumber === GroupNumber)
		{
			var Ypos = parseFloat(GetExtraParValue("GrainMatchYPos",document.getElementById("LineDiv"+r).id));
			//alert(Ypos+ " index="+r+" OtherGroup="+OtherGroupNumber+" Group="+GroupNumber);
			var Height = parseFloat(document.getElementById("Length"+r).value);
			if (Ypos+Height > MaxYPos) {MaxYPos = Ypos+Height;}
		}
	}
	return MaxYPos;
}

function FindMinGroupXPos(GroupNumber)
{
var MinXPos = 100000;
	for (var r = 1; r<counter; r++) 
	{
	var OtherGroupNumber = GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+r).id);
		if (OtherGroupNumber === GroupNumber)
		{
			var Xpos = parseFloat(GetExtraParValue("GrainMatchXPos",document.getElementById("LineDiv"+r).id));
			//alert(Ypos+ " index="+r+" OtherGroup="+OtherGroupNumber+" Group="+GroupNumber);
			var Width = parseFloat(document.getElementById("Width"+r).value);
			if (Xpos < MinXPos) {MinXPos = Xpos;}
		}
	}
	return MinXPos;
}

function SetHDFDrwFrontOptionsVisibility(LineMaterial)
{
if (LineMaterial.indexOf(HDFPrefix) > -1 ) {var IsHDFMaterial = true} else {var IsHDFMaterial = false}
	
if (IsHDFMaterial) {document.getElementById("HDFDrwFrontOptions").style.display = "inherit";}
else {document.getElementById("HDFDrwFrontOptions").style.display = "none";}
}

function IsHDFFramedDoor(LineMaterial)
{
	var ProfileName = GetHDFProfileName(LineMaterial);
	var HHDItemIndex = FindItem(ProfileName,HDFDoorSpecData,'Profile');
	
	if (HHDItemIndex > -1) {return HDFDoorSpecData[HHDItemIndex].Frame}
	else {return false}
}

function PopulateGrainMatchPartLists(GroupNumber,PartsListBox)
{

	/*Remove items from the list box first*/
	while (PartsListBox.firstChild) {
		PartsListBox.removeChild(PartsListBox.firstChild);
	  }

	var PartNamePrex = PartsListBox.id;
	var FirstPart = true;
	
		for (var r = 1; r<counter; r++) 
		{
			var CurrentGroupNumber = GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+r).id);
			//alert(GetExtraParValue("GrainMatchGroup",document.getElementById("LineDiv"+r).id));
			var LineMaterial = document.getElementById("Material"+r).value;
			var PanelType = document.getElementById("PanelType"+r).value;
			var IsGrained = (Materials[FindItem(LineMaterial,Materials,"Name")].Grained == "True");

			if (GetMatThickFromName(LineMaterial) < 20) {var ToolWidth = 10;} else {var ToolWidth = 13;}
			
			if (LineMaterial.indexOf(HDFPrefix) > -1 ) {var IsHDFMaterial = true} else {var IsHDFMaterial = false}
	
			var HDFFramedDoor = IsHDFFramedDoor(LineMaterial);

			if ( (IsGrained | HDFFramedDoor) & CurrentGroupNumber == GroupNumber & PanelType != 'Builtup Panel') // & PanelType != 'Profile Handle'
			{
				if (FirstPart) {SetHDFDrwFrontOptionsVisibility(LineMaterial);}

				//var PartDesc = document.getElementById("Description"+r).value;
				var PartLength = document.getElementById("Length"+r).value;
				var PartWidth = document.getElementById("Width"+r).value;
				//var PartUnitRef = document.getElementById("UnitRef"+r).value;
				//var PanelColour = Materials[FindItem(LineMaterial,Materials,"Name")].colour;
				//if (PanelColour == '' ) {PanelColour = "rgb(255,255,255)";} 
				var ThisItemID = document.getElementById("LineDiv"+r).id;
				var GroupOrder = GetExtraParValue("GrainMatchOrder",ThisItemID);
				
				//if (PartUnitRef != '' ) {PartUnitRef = "Unit "+PartUnitRef;}
				
				
				var ListPart = document.createElement("div");
				var PartGap = Math.ceil((ToolWidth/2)/GrainMatchPartSizeRatio);
				//var CSSPos = PartNamePrex == "GroupBox" ? "absolute" : "relative";
				ListPart.id = PartNamePrex+"Part"+r;
				ListPart.name = "LineDiv"+r;
				ListPart.setAttribute("draggable", "true" );
				ListPart.setAttribute("ondragstart", "drag(event)");
				ListPart.setAttribute("GroupOrder", ""+GroupOrder+"");
				ListPart.setAttribute("style", "height:"+PartLength/GrainMatchPartSizeRatio+"px;width:"+PartWidth/GrainMatchPartSizeRatio+"px;margin:"+PartGap+"px;position:relative;"); //border: 1px solid black;background-color:"+PanelColour+"
		
								
				var ListPartCanvas = document.createElement("canvas");
				ListPartCanvas.id = PartNamePrex+"PartCanvas"+r;
				ListPartCanvas.setAttribute("width",PartWidth/GrainMatchPartSizeRatio);
				ListPartCanvas.setAttribute("height",PartLength/GrainMatchPartSizeRatio);
				ListPartCanvas.setAttribute("style","position:absolute;top:0px;left:0px");
				ListPart.appendChild(ListPartCanvas);
				
/* 				var ListPartLabel = document.createElement("label");
				ListPartLabel.id = PartNamePrex+"PartLabel"+r;
				ListPartLabel.innerHTML = "Line "+r+" "+PartDesc+" "+PartLength+"Lx"+PartWidth+"W "+PartUnitRef;
				if (RGBIsDark(PanelColour) == true ) {ListPartLabel.setAttribute("style", "font-size:75%;color:rgb(255,255,255);");} 
				else {ListPartLabel.setAttribute("style", "font-size:75%;");}
				ListPart.appendChild(ListPartLabel); */
		
				var MaxYPos = FindMaxGroupYPos(GroupNumber);
				var MinXPos = FindMinGroupXPos(GroupNumber);
				var XPos = (parseFloat(GetExtraParValue("GrainMatchXPos",ThisItemID))-MinXPos)/GrainMatchPartSizeRatio;
				var YPos = (MaxYPos-PartLength-parseFloat(GetExtraParValue("GrainMatchYPos",ThisItemID)))/GrainMatchPartSizeRatio;

				var BeforeItemNo = GetGrainMatchPartAfter(PartsListBox,GroupOrder);
				if (CurrentGroupNumber > 0 & PartsListBox.children.length > 0 & BeforeItemNo > -1) 
				{
				PartsListBox.insertBefore(ListPart, PartsListBox.children[BeforeItemNo]);
				}
				else
				{
				PartsListBox.appendChild(ListPart);	
				}

				if (PartNamePrex == "GroupBox") 
				{
			
					//alert(MaxYPos);
					if (IsHDFMaterial) /*Only for Optidoor drawer packs*/ 
					{ 
						if (FirstPart) {document.getElementById("HDFDrwFrontOptions").value = GetExtraParValue("DrwFrontOption",ThisItemID);}
					} 
					else
					{
						if (PanelType != 'Profile Handle')
						{
						//alert("GrainMatchYPos="+parseFloat(GetExtraParValue("GrainMatchYPos",ThisItemID))+"YPos="+YPos);
						ListPart.style.position = "absolute";
						ListPart.style.left = XPos+"px";
						ListPart.style.top = YPos+"px";
						}
					}
				}


				

				DrawPreview(PartNamePrex+"PartCanvas"+r,'PreviewBox2',"LineDiv"+r);
				FirstPart = false;	
			}	
		
		}
		
} //end of PoulateGrainMatchGroupBox

function AddGrainMatchGroup(IgnoreEmplybox,OverrideGroupNumber)
{
var GroupSelect = document.getElementById("GroupSelect");
if (OverrideGroupNumber > 0 ) { var NextGroupNumber = OverrideGroupNumber; }
else {var NextGroupNumber = parseFloat(GetGrainMatchGroupNumber(GroupSelect.lastChild.innerHTML))+1;}


	
	if (document.getElementById("GroupBox").childElementCount > 0 || IgnoreEmplybox == true)
	{
		var List = document.createElement("option");
		List.innerHTML = "Group "+NextGroupNumber;
		List.value = "Group "+NextGroupNumber;
		GroupSelect.appendChild(List);
		
		GroupSelect.value = "Group "+NextGroupNumber;
		document.getElementById("GroupBox").innerHTML = '';
	}
	else {popup("Cannot create new group because current group is empty",150,400,1);}
}

function SetGrainMatchPartSizeRatio(WinWidth)
{
var LastPartWidth = 0;

	for (var r = 1; r<counter; r++) 
	{ 
		var LineMaterial = document.getElementById("Material"+r).value;
		var PartWidth = parseFloat(document.getElementById("Width"+r).value);
		var HDFFramedDoor = IsHDFFramedDoor(LineMaterial);
		if ( (Materials[FindItem(LineMaterial,Materials,"Name")].Grained  == "True" | HDFFramedDoor) & document.getElementById("PanelType"+r).value != 'Builtup Panel')
		{ 
			if (PartWidth > LastPartWidth) 
			{
			GrainMatchPartSizeRatio = PartWidth/(((WinWidth-80)/2)-24)*1.5;
			LastPartWidth = PartWidth;				
			}
	
		}		
	}
}

function CloseGrainMatchWindow()
{

	if (counter > 1) {Calculations(document.getElementById("Material1").parentNode.id)};
	CloseWindow('hiddenDiv2','popUpDiv2','blanket2');
}

function GrainMatchWinZoom(Direction)
{
	switch (Direction)
	{
	case 'In' :
		GrainMatchPartSizeRatio = GrainMatchPartSizeRatio*0.8;
		break;
	case 'Out' :
		GrainMatchPartSizeRatio = GrainMatchPartSizeRatio*1.2;	
		break;
	}

	PopulateGrainMatchPartLists(0,document.getElementById("PartsListBox"));
	PopulateGrainMatchPartLists(GetGrainMatchGroupNumber(document.getElementById("GroupSelect").value),document.getElementById("GroupBox"));
}


function GrainMatchWindow(WinHieght,WinWidth) {
    var HiddenDIv = document.getElementById("hiddenDiv2");
	var frm = document.getElementById('Mainform');

	if (WinHieght > window.innerHeight) {WinHieght = window.innerHeight-100;}


	if (HiddenDIv.childNodes.length == 0 && document.getElementById("Orderlines").childNodes.length > 0 ) 
	{
		
		SetGrainMatchPartSizeRatio(WinWidth);	

		var Blanket = document.createElement("div");
		Blanket.id = "blanket2";
		HiddenDIv.appendChild( Blanket );
		
		var popUpDiv = document.createElement("div");
		popUpDiv.id = "popUpDiv2";
		//var styleAtt = document.createAttribute("style"); StyleAtt.value="width:"; popUpDiv.setAttributeNode(StyleAtt);
		
		
		var CloseButton = document.createElement("input");
		CloseButton.id = "CloseButton";
		CloseButton.type = "button";
		CloseButton.value = "Save & Close";
		CloseButton.setAttribute("class", "BigButton");
		CloseButton.setAttribute("onclick", "CloseGrainMatchWindow();");
		CloseButton.setAttribute("style", "position:absolute;bottom:20px;width:120px;");	
		popUpDiv.appendChild( CloseButton );

		var ZoomInButton = document.createElement("button");
		ZoomInButton.id = "GMWinZoomInButton";
		ZoomInButton.setAttribute("class", "Imagebutton");
		ZoomInButton.setAttribute("onclick", "GrainMatchWinZoom('In');"); 
		ZoomInButton.setAttribute("style", "position:absolute;bottom:20px;left:20px;padding:1px;");
		popUpDiv.appendChild( ZoomInButton );
		
		var ZoomOutButton = document.createElement("button");
		ZoomOutButton.id = "GMWinZoomOutButton";
		ZoomOutButton.setAttribute("class", "Imagebutton");
		ZoomOutButton.setAttribute("onclick", "GrainMatchWinZoom('Out');");  
		ZoomOutButton.setAttribute("style", "position:absolute;bottom:20px;left:70px;padding:1px;");
		popUpDiv.appendChild( ZoomOutButton );
		
		var PartsListLabel = document.createElement("label");
		PartsListLabel.id = "PartsListLabel";
		PartsListLabel.innerHTML = "Pending Grain Match parts";
		PartsListLabel.setAttribute("style", "position:absolute;top:7px;left:20px;");
		popUpDiv.appendChild( PartsListLabel);
		
		
		var PartsListBox = document.createElement("div");
		PartsListBox.id = "PartsListBox";
		PartsListBox.setAttribute("ondrop", "drop(event)" );
		PartsListBox.setAttribute("ondragover", "allowDrop(event)");
		PartsListBox.setAttribute("style", "position:absolute;overflow-y:auto;padding-bottom:200px;top:30px;left:20px;border: 1px solid #ddd;");
		PartsListBox.setAttribute("title", "Drag and drop parts into group box to grain match");	
		popUpDiv.appendChild( PartsListBox );

		
		var GroupLabel = document.createElement("label");
		GroupLabel.id = "PartsListLabel";
		GroupLabel.innerHTML = "Grain Match Group";
		GroupLabel.setAttribute("style", "position:absolute;top:7px;left:"+((WinWidth/2)+20)+"px;");
		popUpDiv.appendChild( GroupLabel );
		
		var GroupSelect= document.createElement("select");
		GroupSelect.id = "GroupSelect";
		GroupSelect.setAttribute("style", "position:absolute;left:"+((WinWidth/2)+20)+"px;Top:35px;width:80px;");
		GroupSelect.setAttribute("onchange", "GrainMatchGroupSelectChange();");
		//GroupSelect.setAttribute("onchange", "SubMatDisableMatOpt();");

		
		//for (var r = 1; r<counter; r++) 
		//{
			//if ( FindItemInArray(OrderMaterials,document.getElementById("Material"+r).value) == -1)
			//{
			var List = document.createElement("option");
			List.innerHTML = "Group 1";
			List.value = "Group 1";
			GroupSelect.appendChild(List);
			//}		
		//}

		popUpDiv.appendChild( GroupSelect );
		
		var AddGroupButton = document.createElement("input");
		AddGroupButton.id = "AddGroupButton";
		AddGroupButton.type = "button";
		AddGroupButton.value = "Add Group";
		AddGroupButton.setAttribute("class", "NormalButton");
		AddGroupButton.setAttribute("onclick", "AddGrainMatchGroup(false,0);");
		AddGroupButton.setAttribute("style", "position:absolute;left:"+((WinWidth/2)+115)+"px;top:35px;width:85px;height:24px;");	
		popUpDiv.appendChild( AddGroupButton );
		
		var HDFDrwFrontOptions = document.createElement("select");
		HDFDrwFrontOptions.id = "HDFDrwFrontOptions";
		//HDFDrwFrontOptions.value = "Drawer Pack";
		HDFDrwFrontOptions.setAttribute("onchange", "ChangeHDFDrwFrontOption();");
		HDFDrwFrontOptions.setAttribute("style", "position:absolute;left:"+((WinWidth/2)+210)+"px;Top:35px;width:120px;display:none;");
		popUpDiv.appendChild( HDFDrwFrontOptions );
		
			var List = document.createElement("option");
			List.innerHTML = "Reduced Rails";
			List.value = "ReducedRails";
			HDFDrwFrontOptions.appendChild(List);
			var List = document.createElement("option");
			List.innerHTML = "Drawer Pack";
			List.value = "DrwPack";
			HDFDrwFrontOptions.appendChild(List);	
		
		var GroupBox = document.createElement("div");
		GroupBox.id = "GroupBox";
		GroupBox.innerHTML = "Drop Parts Here!";
		GroupBox.setAttribute("ondrop", "drop(event)" );
		GroupBox.setAttribute("ondragover", "allowDrop(event)");
		GroupBox.setAttribute("style", "position:absolute;overflow-y:auto;padding-bottom:200px;top:70px;border: 1px solid #ddd;");
		GroupBox.setAttribute("title", "Drag and drop parts into pending box to remove from group");	
		popUpDiv.appendChild( GroupBox );
		
			
		HiddenDIv.appendChild( popUpDiv );
		

		PopulateGrainMatchPartLists(0,document.getElementById("PartsListBox"));
		PopulateGrainMatchGroupSelect();
		PopulateGrainMatchPartLists(GetGrainMatchGroupNumber(document.getElementById("GroupSelect").value),document.getElementById("GroupBox"));
		

		document.getElementById("CloseButton").style.left=((WinWidth/2)-50) + "px";
		document.getElementById("PartsListBox").style.width=((WinWidth-80)/2) + "px";
		document.getElementById("PartsListBox").style.height=(WinHieght-300) + "px";
		
		document.getElementById("GroupBox").style.left=((WinWidth/2)+20) + "px";
		document.getElementById("GroupBox").style.width=((WinWidth-80)/2) + "px";
		document.getElementById("GroupBox").style.height=(WinHieght-340) + "px";

		SetpopupWin(popUpDiv,Blanket,WinHieght,WinWidth);


	}
}  //GrainMatchWindow

function UploadJobFileButtonClick()
{
	if (OrderNumber != "") 
	{
	popup("Are you sure you would like to import a file in this order? This will clear any existing data!",150,400,2,"GoToUploadFilePage()");
	}
	else {GoToUploadFilePage();}
}

function GoToUploadFilePage()
{
	PromptStayOnPageWithTabClose = false;
	document.getElementById("UploadFile").name = 'UploadFile';
	document.getElementById("UploadFile").value = OrderNumber;
	document.getElementById("ExistOrderType").name = 'OrderType';
	document.getElementById("ExistOrderType").value = OrderType;	
	popup("Please wait while page is loaded!",160,400,3);
	document.getElementById('Mainform').submit();
}
