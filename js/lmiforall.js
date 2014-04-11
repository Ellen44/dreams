function getSOCsForJobTitle() {
var searchtitle = $("#jobtitle").val();
var apiurl =  " http://api.lmiforall.org.uk/api/v1/soc/search?q="
var apicall = apiurl + searchtitle;

$.get(apicall, function (data) {
$("#message").html("<h5>Click description for more information</h5>");
$("#socstable tbody").html("<td align='center' style='background-color:#35b8b8'><font color='white'>Title</font></td><td align='center' style='background-color:#35b8b8'><font color='white'>Description</font></td>");

$.each(data, function(i, e) {

(function (soc){

var tablerow = $ ("<tr></tr>")
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'><b>" + e.title + "</b></td>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'>" + e.description + "</td>");

tablerow.click(function() {

$("#socstable tbody").html("");
getUnemployment(soc);	
getMoreInfo(soc);
getMoreInfo2(soc);
getEstimatedPay(soc);
getEstimatedHours(soc);

});

$("#socstable tbody").append (tablerow)
})(e.soc);
});
});

}

function getMoreInfo (socCode){
var apiurl = "http://api.lmiforall.org.uk/api/v1/soc/code/";
var apicall = apiurl + socCode;
$.get(apicall, function(data) {
$("#Qualifications tbody").html("<td valign='top' align='center' width='auto' height='auto' style='background-color:darkblue; padding:5px 5px 5px 5px;'><font color='white'>Qualifications required</font></td>");
$.get(data.years, function (i, e) {
var tablerow = $ ("<h3>Qualifications Required</h3><br>");
var tablerow = $ ("<tr></tr>");	
tablerow.append ("<td>" + data.qualifications + "</td>");
$("#Qualifications tbody").append(tablerow);	
$("#Qualifications tbody").append("<br><br>");	


});
});

}

function getMoreInfo2 (socCode){
var apiurl = "http://api.lmiforall.org.uk/api/v1/soc/code/";
var apicall = apiurl + socCode;
$.get(apicall, function(data) {
$("#Task tbody").html("<td valign='top' align='center' width='auto' height='auto' style='background-color:darkblue; padding:5px 5px 5px 5px;'><font color='white'>Task</font></td>");
$.get(data.years, function (i, e) {
var tablerow = $ ("<h3>Task Involved</h3><br>");
var tablerow = $ ("<tr></tr>");	
tablerow.append ("<td>" + data.tasks + "</td>");
$("#Task tbody").append(tablerow);
$("#Task tbody").append("<br><br>");


});
});

}


function getUnemployment (socCode){
var apiurl = "http://api.lmiforall.org.uk/api/v1/lfs/unemployment?soc=";
var apicall = apiurl + socCode;
$.get(apicall, function(data) {
$("#unemployment tbody").html("<td align='center' style='background-color:darkblue'><font color='white'>Unemployment Rate</font></td><td align='center' style='background-color:darkblue'><font color='white'>Year</font></td>");
$.each(data.years, function (i, e) {
var tablerow = $ ("<h3>Task Involved</h3><br>");
var tablerow = $ ("<tr></tr>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'>" + e.unemprate + "%</td>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'>" + e.year + "</td>");
$("#unemployment tbody").append(tablerow);
$("#unemployment tbody").append("<br><br>");


});
});

}

function getEstimatedPay (socCode){
var apiurl = "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=";
var apiurl2 = "&coarse=true";
var apicall = apiurl + socCode + apiurl2;
$.get(apicall, function(data) {
$("#estimatedpay tbody").html("<td align='center' style='background-color:darkblue'><font color='white'>Estimated pay per week</font></td><td align='center' style='background-color:darkblue'><font color='white'>Year</font></td>");
$.each(data.series, function (i, e) {
var tablerow = $ ("<h3>Estimated Pay</h3><br>");
var tablerow = $ ("<tr></tr>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'> ��" + e.estpay + "</td>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'>" + e.year + "</td>");
$("#estimatedpay tbody").append(tablerow);
$("#estimatedpay tbody").append("<br><br>");

});
});

}

function getEstimatedHours (socCode){
var apiurl = "http://api.lmiforall.org.uk/api/v1/ashe/estimateHours?soc=";
var apiurl2 = "&coarse=true";
var apicall = apiurl + socCode + apiurl2;
$.get(apicall, function(data) {
$("#estimatedhours tbody").html("<td align='center' style='background-color:darkblue'><font color='white'>Hours per week</font></td><td align='center' style='background-color:darkblue'><font color='white'>Year</font></td>");
$.each(data.series, function (i, e) {
var tablerow = $ ("<h3>Estimated Hours</h3><br>");
var tablerow = $ ("<tr></tr>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'>" + e.hours + "</td>");
tablerow.append ("<td valign='top' width='auto' height='auto' style='background-color:#f4ffff; padding:5px 5px 5px 5px;'>" + e.year + "</td>");
$("#estimatedhours tbody").append(tablerow);
$("#estimatedhours tbody").append("<br><br>");

});
});

}




$(function() {

$("#jobtitle-button").click (getSOCsForJobTitle);

});