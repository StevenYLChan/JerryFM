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
        $("#comment-text").attr("placeholder", nice_text + "...").val("");
        option = 1;
    });
    $("#option2").click(function () {
        $("#option-button").html('It would be horrible if &nbsp;<span class="caret"></span>');
        $("#text-area").attr("placeholder", horrible_text + "...").val("").focus();
        $("#comment-text").attr("placeholder", horrible_text + "...").val("");
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
        var input_text = $('#text-area').val().replace(/\n/g, '<br />');
        var date = new Date(Date.now());
        var result = new Array();
        result[0] = $.datepicker.formatDate('DD M d yy', date);
        result[1] = ' ';
        if (date.getHours() > 12) {
            result[2] = date.getHours() - 12;
        } else if (date.getHours() == 0) {
            result[2] = "12";
        } else {
            result[2] = date.getHours();
        }
        result[3] = ":";
        result[4] = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        if (date.getHours() > 12) {
            result[5] = " pm";
        } else {
            result[5] = " am";
        }
        var combined_time = "";
        $.each(result, function (key, value) {
            //combined_time+=value;
            combined_time += result[key];
        });
        //var sd = $("#text-area").attr('placeholder');
        //var ds = $("#option-button").html();
        //$('label[for^="'+sd+'"]').fadeIn();
        if (option == 1) {
            chosen = nice_text;
            $("<div class='panel panel-lightblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
        } else if (option == 2) {
            chosen = horrible_text;
            $("<div class='panel panel-darkblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
        }

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
    $(document).on('hide.bs.modal', '#myModal', function () {
        $("#comment-text").val('');
        $("#comment-text").autoHeight();
    });

    $("#submit-image-button").mousedown(function () {
        var input_text = $('#comment-text').val().replace(/\n/g, '<br />');
        var date = new Date(Date.now());
        var result = new Array();
        result[0] = $.datepicker.formatDate('DD M d yy', date);
        result[1] = ' ';
        if (date.getHours() > 12) {
            result[2] = date.getHours() - 12;
        } else if (date.getHours() == 0) {
            result[2] = "12";
        } else {
            result[2] = date.getHours();
        }
        result[3] = ":";
        result[4] = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        if (date.getHours() > 12) {
            result[5] = " pm";
        } else {
            result[5] = " am";
        }
        var combined_time = "";
        $.each(result, function (key, value) {
            combined_time += result[key];
        });
        if (option == 1) {
            chosen = nice_text;
            $("<div class='panel panel-lightblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
        } else if (option == 2) {
            chosen = horrible_text;
            $("<div class='panel panel-darkblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
        }

        $('#myModal').modal('hide');
        $("#text-area").val('');
        $("#text-area").autoHeight()
    });

    $("#attach-link").click(function () {
        $("#myModal-link").modal('show');
    });

    $(document).on('hide.bs.modal', '#myModal-link', function () {
        $("#url-link").val('');
        $("#comment-text-link").val('');
        $("#comment-text").autoHeight();
    });

    $("#submit-button-link").mousedown(function () {
        var input_url = $('#url-link').val();
        var input_text = $('#comment-text-link').val().replace(/\n/g, '<br />');

        var image_extensions = ['gif', 'jpeg', 'jpg', 'png', 'bmp', 'svg', 'webp'];
        var image_extensions_length = image_extensions.length;

        var isImage = false;
        while (image_extensions_length--) {
            if (input_url.indexOf(image_extensions[image_extensions_length]) != -1) {
                console.log(image_extensions[image_extensions_length] + ":true");
                isImage = true;
                break;
            }
        }
        var isVideo = false;
        if (isImage == false) {
            var video_extensions = ['youtube'];
            var video_extensions_length = video_extensions.length;
            while (video_extensions_length--) {
                if (input_url.indexOf(video_extensions[video_extensions_length]) != -1) {
                    console.log("true");
                    isVideo = true;
                    break;
                }
            }
        }

        var date = new Date(Date.now());
        var result = new Array();
        result[0] = $.datepicker.formatDate('DD M d yy', date);
        result[1] = ' ';
        if (date.getHours() > 12) {
            result[2] = date.getHours() - 12;
        } else if (date.getHours() == 0) {
            result[2] = "12";
        } else {
            result[2] = date.getHours();
        }
        result[3] = ":";
        result[4] = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        if (date.getHours() > 12) {
            result[5] = " pm";
        } else {
            result[5] = " am";
        }
        var combined_time = "";
        $.each(result, function (key, value) {
            combined_time += result[key];
        });

        if (isImage == true) {
            if (option == 1) {
                chosen = nice_text;
                $("<div class='panel panel-lightblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'><img src='" +input_url + "' alt='your image' style='height: auto; width: auto; max-width: 400px;max-height: 400px; border:2px solid gainsboro; background-color: white; border-radius: 8px; box-sizing: border-box; display: block; margin: 0 auto' /><br/>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
            } else if (option == 2) {
                chosen = horrible_text;
                $("<div class='panel panel-darkblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
            }
        } else if (isVideo == true) {
            if (option == 1) {
                chosen = nice_text;
                $("<div class='panel panel-lightblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
            } else if (option == 2) {
                chosen = horrible_text;
                $("<div class='panel panel-darkblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
            }
        } else {
            if (option == 1) {
                chosen = nice_text;
                $("<div class='panel panel-lightblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
            } else if (option == 2) {
                chosen = horrible_text;
                $("<div class='panel panel-darkblue'><div class='panel-heading'><div class='panel-title pull-left' style='font-size: 25px'>" + chosen + "</div><div class='panel-title pull-right'><h5><i>" + combined_time + "</i></h5></div><div class='clearfix'></div></div><div class='panel-body'>" + input_text + "</div><div class='panel-footer'>Panel footer</div></div>").appendTo("#card-body");
            }
        }
        $('#myModal-link').modal('hide');
        $("#text-area").val('');
        $("#text-area").autoHeight()
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image-file')
                .attr('src', e.target.result);
            //.width(100)
            //.height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
    //var filename = input.val();
    var filename = $('input[type=file]').val().split('\\').pop();
    $('#image-file-name').text(filename);
    $('#myModal').modal('toggle');
}

