$(document).ready(function () {
    $.material.init();
    $('[data-toggle="tooltip"]').tooltip();
    $("#option1").click(function () {
        $("#option-button").html('It would be nice if');
        $("#text-area").attr("placeholder", "It would be nice if...").val("").focus();
    });
    $("#option2").click(function () {
        $("#option-button").html('It would be horrible if');
        $("#text-area").attr("placeholder", "It would be horrible if...").val("").focus();
    });

    function h(e) {
        $(e).css({'height': 'auto', 'overflow-y': 'hidden'}).height(e.scrollHeight);
    }

    $('textarea').each(function () {
        h(this);
    }).on('input', function () {
        h(this);
    });

    jQuery.fn.extend({
        autoHeight: function () {
            function autoHeight_(element) {
                return jQuery(element)
                    .css({'height': 'auto', 'overflow-y': 'hidden'})
                    .height(element.scrollHeight);
            }

            return this.each(function () {
                autoHeight_(this).on('input', function () {
                    autoHeight_(this);
                });
            });
        }
    });
    
    
    $("#cancel-button").mousedown(function () {
        $("#text-area").val('');
        $("#text-area").autoHeight()
    });

    $("#submit-button").mousedown(function () {
        var input_text = $('#text-area').val();
        var date = new Date(Date.now());
        var result = new Array();
        result[0] = $.datepicker.formatDate('DD M d yy', date);
        result[1] = ' ';
        if (date.getHours() > 12) {
            result[2] = date.getHours() - 12;
        } else if (date.getHours() == 0 ) {
            result[2] = "12";
        } else {
            result[2] = date.getHours();
        }
        result[3] = ":";
        result[4] = (date.getMinutes()<10?'0':'') + date.getMinutes();

        if (date.getHours() > 12) {
            result[5] = " pm";
        } else {
            result[5] = " am";
        }
        var combined_time = "";
        $.each(result,function(key,value){
            //combined_time+=value;
            combined_time += result[key];
        });
        var sd = $("#text-area").attr('placeholder');
        //$('label[for^="'+sd+'"]').fadeIn();


        $("<div class='panel panel-default'> <div class='panel-heading'>" + combined_time + "</div> <div class='panel-body'> " + sd + " " + input_text + "</div> </div>").appendTo("#card-body");
        $("#text-area").val('');
        $("#text-area").autoHeight()
    });

    $("#text-area").on("focus", function (e) {
        $('#submit-button').show();
        $('#cancel-button').show();
        $('#file-upload').prop("disabled", false);
        $('#link-upload').prop("disabled", false);
    });

    $("#text-area").on("blur", function (e) {
        $('#submit-button').hide();
        $('#cancel-button').hide();
        //$('#file-upload').prop("disabled",true);
    });

});