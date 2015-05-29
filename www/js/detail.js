(function(window, $, undefined){
    var global = {
        host: 'http://106.187.99.225:4000/bugs/'
    };
    //parse url, and get query content with given name.
    function getQueryStringV(vhref, name) {
        if (vhref.indexOf("?") == -1 || vhref.indexOf(name + '=') == -1) {
            return '';
        }
        var queryString = vhref.substring(vhref.indexOf("?") + 1);
        var parameters = queryString.split("&");
        var pos, paraName, paraValue;
        for (var i = 0; i < parameters.length; i++) {
            pos = parameters[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            paraName = parameters[i].substring(0, pos);
            paraValue = parameters[i].substring(pos + 1);

            if (paraName == name) {
                return paraValue;
            }
        }
        return '';
    }
    formatTime: function formatTime(time) {
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        if (time) {
            return new Date(parseInt(time)).Format('yyyy-MM-dd h:m:s');
        } else {
            return "";
        }
    }
	var detailService = {
        attachEvent: function attachEvent() {
            $('.bug-delete').on('click', function() {
                var $deleteModel = $('#deleteModel');
                $deleteModel.modal({
                    backdrop: 'static'
                });
            });

            $('#deleteModel').on('click', '.btn-right', function() {      //delete
                detailService.deleteBug($('.bug-id').val());
            });

            $('.bug-modify').on('click', function() {
                detailService.insertUpdateModal($('.bug-id').val());
            });

            $('#updateModel').on('click', '.btn-right', function() {
                var $updateModel = $(this).parents('#updateModel');
                var name = $updateModel.find('input[name=name]').val();
                var desc = $updateModel.find('textarea[name=desc]').val();
                var code = $updateModel.find('textarea[name=code]').val();
                var type = $updateModel.find('input[name=type]').val();
                var language = $updateModel.find('input[name=language]').val();
                var solve = $updateModel.find('textarea[name=solve]').val();

                if (name === '' || desc === '' || type === '' || language === '' || solve === '') {
                    var $alert = $updateModel.find('.alert-danger');
                    $alert.removeClass('hidden');
                    setTimeout(function() {
                        $alert.addClass('hidden');
                    }, 500);
                } else {
                    detailService.updateBug($('.bug-id').val(), name, desc, code, type, language, solve);
                }
            });
        },
        getSpecificBug: function getSpecificBug(id) {
            $.ajax({
                url: global.host + id,
                type: 'get',
                dataType : "json",
                success: function(bug) {
                    if(bug != null) {
                        $('.bug-id').val(bug._id);
                        $('.bug-title h2').html(bug.name);
                        $('p.bug-content').html(bug.desc);
                        $('span.bug-code').html(bug.code);
                        $('.bug-solution span').html(bug.solve);
                        var $bug_bottom = $('.bug-bottom');
                        $bug_bottom.find('.bug-type span').html(bug.type);
                        $bug_bottom.find('.bug-language span').html(bug.language);
                        $bug_bottom.find('.bug-time span').html(formatTime(bug.modify_at));
                    }
                }
            });
        },
        deleteBug: function deleteBug(id) {
            $.ajax({
                url: global.host + id,
                type: 'delete',
                dataType : "json",
                success: function(bug) {
                    if(bug.message != null) {
                        setTimeout(function() {
                            $('#deleteModel').modal('hide');
                        }, 500);

                        window.location.href = 'main.html';
                    }
                }
            });
        },
        insertUpdateModal: function insertUpdateModal(id) {
            $.ajax({
                url: global.host + id,
                type: 'get',
                dataType : "json",
                success: function(bug) {
                    if(bug != null) {
                        var $updateModel = $('#updateModel');
                        $updateModel.find('input[name=name]').val(bug.name);
                        $updateModel.find('textarea[name=desc]').val(bug.desc);
                        $updateModel.find('textarea[name=code]').val(bug.code);
                        $updateModel.find('textarea[name=solve]').val(bug.solve);
                        $updateModel.find('input[name=type]').val(bug.type);
                        $updateModel.find('input[name=language]').val(bug.language);
                        $updateModel.modal({
                            backdrop: 'static'
                        });
                    }
                }
            });
        },
        updateBug: function updateBug(id, name, desc, code, type, language, solve) {
            $.ajax({
                url: global.host + id,
                type: 'put',
                dataType : "json",
                data: {name: name, desc: desc, code: code, type: type, language: language, solve: solve},
                success: function(bug) {
                    if(bug != null) {
                        setTimeout(function() {
                            $('#updateModel').modal('hide');
                        }, 500);

                        detailService.getSpecificBug(id);
                    }
                }
            });
        },
        init: function init() {
            var id = getQueryStringV(decodeURI(location.href), "id");
            if(id !== '') {
                this.getSpecificBug(id);
            }
            this.attachEvent();
        }
    }

    detailService.init();

}(window || this, jQuery, undefined));