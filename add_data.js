// Name: Desai, Rutvik
// Class Account#: jadrn010
// Project #1

$(document).ready(function() {
    $.get("/perl/jadrn010/fetch_vendor.cgi", vendor);
    $.get("/perl/jadrn010/fetch_category.cgi", category);

    $body = $("body");

    $(document).on({
        ajaxStart: function() {
            $body.addClass("loading");
        },
        ajaxStop: function() {
            $body.removeClass("loading");
        }
    });

    $("#sku").focus(function() {
        $("#addConf").css("display", "none");
    });

    $('#submit').bind('click', function() {
        validation();
    });

    $('#reset').bind('click', function() {
        document.getElementById("sku_status").innerHTML = "";
        document.getElementById("validation2").innerHTML = "";
        document.getElementById("validation4").innerHTML = "";
        document.getElementById("validation5").innerHTML = "";
        document.getElementById("validation6").innerHTML = "";
        document.getElementById("validation7").innerHTML = "";
        document.getElementById("validation8").innerHTML = "";
        document.getElementById("validation9").innerHTML = "";
        document.getElementById("validation10").innerHTML = "";
        $('#submit').prop('disabled', true);
    });

    $("#sku").on('blur', function(e) {
        var sku = $("#sku").val()
        var url = '/perl/jadrn010/dup_check.cgi?sku=';
        url += sku;
        if (sku) {
            if (validSKU(sku)) {
                document.getElementById("sku_status").innerHTML = "";
                $.get(url, handleData);
            } else {
                document.getElementById("sku_status").innerHTML = "Enter valid SKU, example: AAA-111.";
            }
        }

    });
    $("#category").on('blur', function(e) {
        var category = $("#category").val();
        if (category > 0) {
            document.getElementById("validation2").innerHTML = "";
        }
    });
    $("#vendor").on('blur', function(e) {
        var vendor = $("#vendor").val();
        if (vendor > 0) {
            document.getElementById("validation4").innerHTML = "";
        }
    });
    $("#manufacturer").on('blur', function(e) {
        var manufacturer = $("#manufacturer").val();
        if (manufacturer) {
            document.getElementById("validation5").innerHTML = "";
        }
    });
    $("#description").on('blur', function(e) {
        var description = $("#description").val();
        if (description) {
            document.getElementById("validation6").innerHTML = "";
        }
    });
    $("#features").on('blur', function(e) {
        var features = $("#features").val();
        if (features) {
            document.getElementById("validation7").innerHTML = "";
        }
    });
    $("#image_upload").on('blur', function(e) {
        var image = $("#image_upload").val();
        if (image) {
            document.getElementById("validation10").innerHTML = "";
        }
    });

    $("#cost").on('blur', function(e) {
        var cost = $("#cost").val();
        if (cost) {
            if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("cost").value)) {
                document.getElementById("validation8").innerHTML = "";
            } else {
                document.getElementById("validation8").innerHTML = "Enter valid Cost, example: 1234.56.";
            }
        }
    });

    $("#retail").on('blur', function(e) {
        var retail = $("#retail").val();
        if (retail) {
            if (validRetail()) {
                document.getElementById("validation9").innerHTML = "";
            } else {
                document.getElementById("validation9").innerHTML = "Enter valid Retail, example: 1234.56.";
            }
        }
    });
});

function handleData(response) {

    if (response.startsWith("duplicate")) {
        document.getElementById("sku_status").innerHTML = "Duplicate SKU, please enter a new unique SKU.";
        $('#submit').prop('disabled', true);
    } else if (response.startsWith("ok") && $('#sku').val() != '') {
        document.getElementById("sku_status").innerHTML = "Not a duplicate SKU, good to go.";
        $('#submit').prop('disabled', false);
    }

}

function uploadImage() {
    var form_data = new FormData($('[name="dataForm"]')[0]);
    var image_name = $("#sku").val();
    var imagewexe = document.getElementById("image_upload").value;
    var imageexe = imagewexe.substr(imagewexe.lastIndexOf('.'), imagewexe.length);
    var date = new Date();
    var fDate = (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getFullYear() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();;
    var fname = image_name + fDate + imageexe;
    fname = fname.toLowerCase();
    document.getElementById("addTemp").innerHTML = fname;
    form_data.append("image", document.getElementById("image_upload").files[0]);
    form_data.append("image_name", fname);
    var display = "<img src=\"/~jadrn010/proj1/_uploadedimages/" + fname + "\"'width='150px' height='150px' />";
    $.ajax({
        url: "/perl/jadrn010/upload.cgi",
        type: "post",
        data: form_data,
        processData: false,
        contentType: false,
        success: function(response) {
sendData(fname);
        },
        error: function(response) {
            $('#validation10').text(response);
        }
    });
}

function sendData(name) {
    var sku = document.getElementById("sku").value;
    var cost = document.getElementById("cost").value;
    var retail = document.getElementById("retail").value;
    var category = document.getElementById("category").value;
    var vendor = document.getElementById("vendor").value;
    var manuID = document.getElementById("manufacturer").value;
    var desc = document.getElementById("description").value;
    var features = document.getElementById("features").value;
    //var fname = document.getElementById("addTemp").innerHTML;
    var fname = name;
    var url = "/perl/jadrn010/add_data.cgi";
    url += "?sku=" + sku + "&category=" + category + "&vendor=" + vendor + "&manuID=" + manuID + "&desc=" + desc + "&features=" + features + "&cost=" + cost + "&retail=" + retail + "&image=" + fname;    
    var req = new HttpRequest(url, handleAddData);
    req.send();

}

function handleAddData(response) {
    if (response.startsWith("Success")) {
        addClearForm();
    } else if (response.startsWith("Error")) {
        alert(response);
    }
}

function vendor(response) {
    var select = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        select += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('#vendor').append(select);
}

function category(response) {
    var select = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for (i = 0; i < tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        select += "<option value=" + tmp[0] + ">" + tmp[1] + "</option>\n";
    }
    $('#category').append(select);
}

function validation() {
    var sku = document.getElementById("sku").value;
    var category = document.getElementById("category").value;
    var vendor = document.getElementById("vendor").value;
    var manufacturer = document.getElementById("manufacturer").value;
    var description = document.getElementById("description").value;
    var features = document.getElementById("features").value;
    var cost = document.getElementById("cost").value;
    var retail = document.getElementById("retail").value;
    var image = document.getElementById("image_upload").value;

    if (category < 1) {
        document.getElementById("validation2").innerHTML = "Please select Category.";
    } else {
        document.getElementById("validation2").innerHTML = "";
    }
    if (vendor < 1) {
        document.getElementById("validation4").innerHTML = "Please select Vendor.";
    } else {
        document.getElementById("validation4").innerHTML = "";
    }
    if (!description) {
        document.getElementById("validation6").innerHTML = "Please enter Description.";
    } else {
        document.getElementById("validation6").innerHTML = "";
    }
    if (!manufacturer) {
        document.getElementById("validation5").innerHTML = "Please enter Manufacturer Identity.";
    } else {
        document.getElementById("validation5").innerHTML = "";
    }
    if (!features) {
        document.getElementById("validation7").innerHTML = "Please enter Features.";
    } else {
        document.getElementById("validation7").innerHTML = "";
    }
    if (!cost) {
        document.getElementById("validation8").innerHTML = "Please enter Cost.";
    } else if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("cost").value) == false) {
        document.getElementById("validation8").innerHTML = "Enter valid Cost, example: 1234.56.";
    } else {
        document.getElementById("validation8").innerHTML = "";
    }
    if (!retail) {
        document.getElementById("validation9").innerHTML = "Please enter Retail.";
    } else if (!validRetail()) {
        document.getElementById("validation9").innerHTML = "Enter valid Retail, example: 1234.56.";
    } else {
        document.getElementById("validation9").innerHTML = "";
    }
    if (!image) {
        document.getElementById("validation10").innerHTML = "Please select image to upload.";
    } else {
        document.getElementById("validation10").innerHTML = "";
    }
    if (sku && category && vendor && manufacturer && description && features && cost && retail && image) {
        if (validSKU(sku) && new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("cost").value) == true && new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("retail").value) == true) {
    uploadImage();
        }
    }
}

function validSKU(r) {
    var sku = /^[A-Z]{3}-[0-9]{3}$/;
    if (sku.test(r) == false) {
        return false;
    } else {
        return true;
    }
}

function emptyCheck(string) {
    return (!string || 0 === string.length);
}

function validCost() {
    if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("cost").value)) {
        return true;
    } else {
        return false;
    }
}

function validRetail() {
    if (new RegExp('^[0-9]*(\.[0-9]{2})?$').test(document.getElementById("retail").value)) {
        return true;
    } else {
        return false;
    }
}

function addClearForm() {
    document.getElementById("sku_status").innerHTML = "";
    document.getElementById("sku").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("retail").value = "";
    document.getElementById("category").value = -1;
    document.getElementById("vendor").value = -1;
    document.getElementById("manufacturer").value = "";
    document.getElementById("description").value = "";
    document.getElementById("features").value = "";
    document.getElementById("image_upload").value = "";
    document.getElementById("validation10").innerHTML = "";
    $('#pic').html("");
    $('#submit').prop('disabled', true);
    $('#addConf').css('display', "block");
}