$(document).ready(function () {
    var nice_text = "It would be nice if";
    var horrible_text = "It would be horrible if";
    var option = 1;
    var chosen = "";
    $.material.init();
    $('[data-toggle="tooltip"]').tooltip();
    $("#option1").click(function () {
        $("#option-button").html('It would be nice if &nbsp;<span class="caret"></span>');
        $("#text-area").attr("placeholder", nice_text + "...").val("").focus();
        option = 1;
    });
    $("#option2").click(function () {
        $("#option-button").html('It would be horrible if &nbsp;<span class="caret"></span>');
        $("#text-area").attr("placeholder", horrible_text + "...").val("").focus();
        option = 2;
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
        //var sd = $("#text-area").attr('placeholder');
        //var ds = $("#option-button").html();
        //$('label[for^="'+sd+'"]').fadeIn();
        if(option==1){
            chosen = nice_text;
            $("<div class='panel panel-lightblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
        }else if (option==2){
            chosen = horrible_text;
            $("<div class='panel panel-darkblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
        }



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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}