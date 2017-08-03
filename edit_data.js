// Name: Desai, Rutvik
// Class Account#: jadrn010
// Project #1

$(document).ready(function() {
    $("#edit_category").prop('disabled', true);
    $("#edit_vendor").prop('disabled', true);
    $("#edit_manufacturer").prop('disabled', true);
    $("#edit_cost").prop('disabled', true);
    $("#edit_description").prop('disabled', true);
    $("#edit_features").prop('disabled', true);
    $("#edit_retail").prop('disabled', true);
    $("#edit_image_upload").prop('disabled', true);
    $("#edit_upload").prop('disabled', true);
    $("#edit_update").prop('disabled', true);

    $("#edit_sku").focus(function() {
        $("#editConf").css("display", "none");
    });


    $("#edit_sku").on('blur', function(e) {
        var sku = $("#edit_sku").val()
        var url = '/perl/jadrn010/dup_check.cgi?sku=';
        url += sku
        if (sku) {
            if (validSKU(sku)) {
                document.getElementById("edit_sku_status").innerHTML = "";
                $.get(url, editHandleData);
            } else {
                document.getElementById("edit_sku_status").innerHTML = "Enter valid SKU, example: AAA-111.";
            }
        }
    });

    $.get("/perl/jadrn010/fetch_category.cgi", editCategory);
    $.get("/perl/jadrn010/fetch_vendor.cgi", editVendor);

    $('#edit_update').bind('click', function() {
        editValidation();
    });

    $("#edit_category").on('blur', function(e) {
        var category = $("#edit_category").val();
        if (category > 0) {
            document.getElementById("edit_validation2").innerHTML = "";
        }
    });
    $("#edit_vendor").on('blur', function(e) {
        var vendor = $("#edit_vendor").val();
        if (vendor > 0) {
            document.getElementById("edit_validation4").innerHTML = "";
        }
    });
    $("#edit_manufacturer").on('blur', function(e) {
        var manufacturer = $("#edit_manufacturer").val();
        if (manufacturer) {
            document.getElementById("edit_validation5").innerHTML = "";
        }
    });
    $("#edit_description").on('blur', function(e) {
        var description = $("#edit_description").val();
        if (description) {
            document.getElementById("edit_validation6").innerHTML = "";
        }
    });
    $("#edit_features").on('blur', function(e) {
        var features = $("#edit_features").val();
        if (features) {
            document.getElementById("edit_validation7").innerHTML = "";
        }
    });

    $("#edit_cost").on('blur', function(e) {
        var cost = $("#edit_cost").val();
        if (cost) {
            if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("edit_cost").value)) {
                document.getElementById("edit_validation8").innerHTML = "";
            } else {
                document.getElementById("edit_validation8").innerHTML = "Enter valid Cost, example: 1234.56.";
            }
        }
    });

    $("#edit_retail").on('blur', function(e) {
        var retail = $("#edit_retail").val();
        if (retail) {
            if (validRetail()) {
                document.getElementById("edit_validation9").innerHTML = "";
            } else {
                document.getElementById("edit_validation9").innerHTML = "Enter valid Retail, example: 1234.56.";
            }
        }
    });
    $("#edit_image_upload").on('blur', function(e) {
        var image = $("#edit_image_upload").val();
        var imagelabel = $("#piclabel").val();
        if (image) {
            var image_name = $("#edit_sku").val();
            var imageexe = image.substr(image.lastIndexOf('.'), image.length);
            var date = new Date();
            var fDate = (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();;
            var fname = image_name + fDate + imageexe;
            fname = fname.toLowerCase();

            document.getElementById("piclabel").innerHTML = "";
            document.getElementById("temp").innerHTML = fname;
            document.getElementById("edit_validation10").innerHTML = "";
            editUploadImage(fname);
        } else {
            editUploadImage(imagelabel);
        }
    });


});

function editHandleData(response) {

    if (response.startsWith("duplicate")) {
        $("#edit_category").prop('disabled', false);
        $("#edit_vendor").prop('disabled', false);
        $("#edit_manufacturer").prop('disabled', false);
        $("#edit_cost").prop('disabled', false);
        $("#edit_description").prop('disabled', false);
        $("#edit_features").prop('disabled', false);
        $("#edit_retail").prop('disabled', false);
        $("#edit_image_upload").prop('disabled', false);
        $("#edit_upload").prop('disabled', false);
        $("#edit_update").prop('disabled', false);
        $("#piclabel").css("display", "block");

        var url = '/perl/jadrn010/fetch_data.cgi?sku=';
        url += $("#edit_sku").val();
        $.get(url, fetchData);
    } else if (response.startsWith("ok")) {
        document.getElementById("edit_sku_status").innerHTML = "No Record found! Please enter correct SKU.";
        document.getElementById("edit_cost").value = "";
        document.getElementById("edit_retail").value = "";
        document.getElementById("edit_category").value = -1;
        document.getElementById("edit_vendor").value = -1;
        document.getElementById("edit_manufacturer").value = "";
        document.getElementById("edit_description").value = "";
        document.getElementById("edit_features").value = "";
        document.getElementById("edit_image_upload").value = "";
        $('#edit_pic').html("");
        $('#piclabel').html("");
        $('#edit_update').prop('disabled', true);
        $("#edit_category").prop('disabled', true);
        $("#edit_vendor").prop('disabled', true);
        $("#edit_manufacturer").prop('disabled', true);
        $("#edit_cost").prop('disabled', true);
        $("#edit_description").prop('disabled', true);
        $("#edit_features").prop('disabled', true);
        $("#edit_retail").prop('disabled', true);
        $("#edit_image_upload").prop('disabled', true);
        $("#edit_upload").prop('disabled', true);
        $("#edit_update").prop('disabled', true);
        $("#edit_sku").prop('disabled', false);
    }
}


function fetchData(response) {
    var rows = response.split("=");

    document.getElementById("edit_vendor").value = rows[2];
    document.getElementById("edit_category").value = rows[1];
    document.getElementById("edit_manufacturer").value = rows[3];
    document.getElementById("edit_description").value = rows[4];
    document.getElementById("edit_features").value = rows[5];
    document.getElementById("edit_cost").value = rows[6];
    document.getElementById("edit_retail").value = rows[7];
    document.getElementById("piclabel").innerHTML = rows[8];
    imageValue = "<img src='/~jadrn010/proj1/_uploadedimages/" + rows[8] + "'width='150px' height='150px' />";
    $("#edit_pic").html(imageValue);
}

function editVendor(response) {
    var select = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        select += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('#edit_vendor').append(select);
}

function editCategory(response) {
    var select = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        select += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('#edit_category').append(select);
}

function editValidation() {
    var sku = document.getElementById("edit_sku").value;
    var category = document.getElementById("edit_category").value;
    var vendor = document.getElementById("edit_vendor").value;
    var manufacturer = document.getElementById("edit_manufacturer").value;
    var description = document.getElementById("edit_description").value;
    var features = document.getElementById("edit_features").value;
    var cost = document.getElementById("edit_cost").value;
    var retail = document.getElementById("edit_retail").value;
    var image = document.getElementById("edit_image_upload").value;

    if (category < 1) {
        document.getElementById("edit_validation2").innerHTML = "Please select Category.";
    } else {
        document.getElementById("edit_validation2").innerHTML = "";
    }
    if (vendor < 1) {
        document.getElementById("edit_validation4").innerHTML = "Please select Vendor.";
    } else {
        document.getElementById("edit_validation4").innerHTML = "";
    }
    if (!description) {
        document.getElementById("edit_validation6").innerHTML = "Please enter Description.";
    } else {
        document.getElementById("edit_validation6").innerHTML = "";
    }
    if (!manufacturer) {
        document.getElementById("edit_validation5").innerHTML = "Please enter Manufacturer Identity.";
    } else {
        document.getElementById("edit_validation5").innerHTML = "";
    }
    if (!features) {
        document.getElementById("edit_validation7").innerHTML = "Please enter Features.";
    } else {
        document.getElementById("edit_validation7").innerHTML = "";
    }
    if (!cost) {
        document.getElementById("edit_validation8").innerHTML = "Please enter Cost.";
    } else if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("edit_cost").value) == false) {
        document.getElementById("edit_validation8").innerHTML = "Enter valid Cost, example: 1234.56.";
    } else {
        document.getElementById("edit_validation8").innerHTML = "";
    }
    if (!retail) {
        document.getElementById("edit_validation9").innerHTML = "Please enter Retail.";
    } else if (!validRetail()) {
        document.getElementById("dit_validation9").innerHTML = "Enter valid Retail, example: 1234.56.";
    } else {
        document.getElementById("edit_validation9").innerHTML = "";
    }
    if (sku && category && vendor && manufacturer && description && features && cost && retail) {
        if (validSKU(sku) && new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("edit_cost").value) == true && new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("edit_retail").value) == true) {
            updateData();
        }
    }
}

function editUploadImage(image) {
    var form_data = new FormData($('[name="editForm"]')[0]);
    form_data.append("image", document.getElementById("edit_image_upload").files[0]);
    form_data.append("image_name", image);
    var display = "<img src=\"/~jadrn010/proj1/_uploadedimages/" + image + "\"'width='150px' height='150px' />";
    $.ajax({
        url: "/perl/jadrn010/editUpload.cgi",
        type: "post",
        data: form_data,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#edit_pic').html(display);
        },
        error: function(response) {
            $('#edit_validation10').text(response);
        }
    });
}


function updateData() {
    var sku = document.getElementById("edit_sku").value;
    var cost = document.getElementById("edit_cost").value;
    var retail = document.getElementById("edit_retail").value;
    var category = document.getElementById("edit_category").value;
    var vendor = document.getElementById("edit_vendor").value;
    var manuID = document.getElementById("edit_manufacturer").value;
    var desc = document.getElementById("edit_description").value;
    var features = document.getElementById("edit_features").value;
    var image = $("#edit_image_upload").val();
    var imagelabel = $("#piclabel").val();
    if (!imagelabel) {
        fname = document.getElementById("temp").innerHTML;
    } else {
        var fname = imagelabel;
    }
    var url = "/perl/jadrn010/update_data.cgi";
    url += "?sku=" + sku + "&category=" + category + "&vendor=" + vendor + "&manuID=" + manuID + "&desc=" + desc + "&features=" + features + "&cost=" + cost + "&retail=" + retail + "&image=" + fname;
    var req = new HttpRequest(url, handleUpdateData);
    req.send();
}

function handleUpdateData(response) {
    if (response.startsWith("Success")) {
        clearForm();
    } else if (response.startsWith("Error")) {
        alert(response);
    }
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

function emptyCheck(string) {
    return (!string || 0 === string.length);
}

function validCost() {
    if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("edit_cost").value)) {
        return true;
    } else {
        return false;
    }
}

function validRetail() {
    if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("edit_retail").value)) {
        return true;
    } else {
        return false;
    }
}

function clearForm() {
    document.getElementById("edit_sku_status").innerHTML = "";
    document.getElementById("edit_sku").value = "";
    document.getElementById("edit_cost").value = "";
    document.getElementById("edit_retail").value = "";
    document.getElementById("edit_category").value = -1;
    document.getElementById("edit_vendor").value = -1;
    document.getElementById("edit_manufacturer").value = "";
    document.getElementById("edit_description").value = "";
    document.getElementById("edit_features").value = "";
    document.getElementById("edit_image_upload").value = "";
    $('#edit_pic').html("");
    $('#piclabel').html("");
    $('#edit_update').prop('disabled', true);
    $("#edit_category").prop('disabled', true);
    $("#edit_vendor").prop('disabled', true);
    $("#edit_manufacturer").prop('disabled', true);
    $("#edit_cost").prop('disabled', true);
    $("#edit_description").prop('disabled', true);
    $("#edit_features").prop('disabled', true);
    $("#edit_retail").prop('disabled', true);
    $("#edit_image_upload").prop('disabled', true);
    $("#edit_upload").prop('disabled', true);
    $("#edit_update").prop('disabled', true);
    $("#edit_sku").prop('disabled', false);
    $('#editConf').css('display', "block");
}