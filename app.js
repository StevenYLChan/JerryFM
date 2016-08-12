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

    $("#text-area").on("focus", function (e) {
        $('#submit-button').show();
        $('#cancel-button').show();
    });

    $("#text-area").on("blur", function (e) {
        $('#submit-button').hide();
        $('#cancel-button').hide();
    });


    $("#submit-button").mousedown(function(){
        $("<div class='panel panel-default'> <div class='panel-heading'>Panel heading</div> <div class='panel-body'> Panel content </div> </div>").appendTo("#card-body");
        $("<div class='panel panel-default'> <div class='panel-heading'>newer</div> <div class='panel-body'> Panel content </div> </div>").appendTo("#card-body");
    })
});