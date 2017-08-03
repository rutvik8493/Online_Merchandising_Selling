// Name: Desai, Rutvik
// Class Account#: jadrn010
// Project #1

$(document).ready(function() {

    $("#del_sku").focus(function() {
        $("#delConf").css("display", "none");
    });

    $("#del_sku").on('blur', function(e) {
        var sku = $("#del_sku").val()
        var url = '/perl/jadrn010/dup_check.cgi?sku=';
        url += sku;
        if (sku) {
            if (validSKU(sku)) {
                document.getElementById("del_sku_status").innerHTML = "";
                $.get(url, delHandleData);
            } else {
                document.getElementById("del_sku_status").innerHTML = "Enter Valid SKU, example: AAA-111.";
            }
        }
    });

    $.get("/perl/jadrn010/fetch_category.cgi", delCategory);
    $.get("/perl/jadrn010/fetch_vendor.cgi", delVendor);

    $('#delete').bind('click', function() {
        deleteData();
    });

});


function delHandleData(response) {

    if (response.startsWith("duplicate")) {

        $("#table_data").css('display', "block");
        $("#delete").prop('disabled', false);


        var url = '/perl/jadrn010/fetch_data.cgi?sku=';
        url += $("#del_sku").val();
        $.get(url, delFetchData);
    } else if (response.startsWith("ok")) {
        document.getElementById("del_sku_status").innerHTML = "No Record found! Please enter correct SKU.";
        $("#table_data").css('display', "none");
        $("#delete").prop('disabled', true);
    }
}

function delFetchData(response) {

    var rows = response.split("=");

    document.getElementById("del_vendor").value = rows[2];
    document.getElementById("del_category").value = rows[1];
    document.getElementById("del_manufacturer").value = rows[3];
    document.getElementById("del_description").value = rows[4];
    document.getElementById("del_features").value = rows[5];
    document.getElementById("del_cost").value = rows[6];
    document.getElementById("del_retail").value = rows[7];
    document.getElementById("del_piclabel").innerHTML = rows[8];
    imageValue = "<img src='/~jadrn010/proj1/_uploadedimages/" + rows[8] + "'width='150px' height='150px' />";
    $("#del_pic").html(imageValue);
}

function deleteData() {
    var sku = document.getElementById("del_sku").value;
    var image = (document.getElementById("del_piclabel").innerHTML).toLowerCase();
    var url = "/perl/jadrn010/delete_data.cgi";
    url += "?sku=" + sku + "&image=" + image;
    var req = new HttpRequest(url, handleDelData);
    req.send();

}

function handleDelData(response) {
    if (response.startsWith("Success")) {
        $("#table_data").css('display', "none");
        $("#delete").prop('disabled', true);
        document.getElementById("del_sku").value = "";
        $('#delConf').css('display', "block");
    } else if (response.startsWith("Error")) {
        alert((response).text);
    }
}


function delVendor(response) {
    var select = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        select += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('#del_vendor').append(select);
}

function delCategory(response) {
    var select = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        select += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('#del_category').append(select);
}

function validSKU(r) {
    var sku = /^[A-Z]{3}-[0-9]{3}$/;
    if (sku.test(r) == false) {
        result = false;
        return result;
    } else {
        result = true;
        return result;
    }
}