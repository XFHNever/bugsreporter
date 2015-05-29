(function(window, $, undefined){
		var bugService = {
			attachEvents: function attachEvents(){
                $('#add').on("click", function(){
                    var $createModel = $('#createModel');
                    $createModel.modal({
                        backdrop: 'static'
                    });
                });

                $('#search').on("click", function(){
                    bugService.searchBugs($('.search').val());
                });

                $('#createModel')
                    .on('click', '.btn-right', function() {    //create a new resource
                        var $createModel = $(this).parents('#createModel');
                        var name = $createModel.find('input[name=name]').val();
                        var desc = $createModel.find('textarea[name=desc]').val();
                        var code = $createModel.find('textarea[name=code]').val();
                        var type = $createModel.find('input[name=type]').val();
                        var language = $createModel.find('input[name=language]').val();
                        var solve = $createModel.find('textarea[name=solve]').val();

                        if (name === '' || desc === '' || type === '' || language === '' || solve === '') {
                            var $alert = $createModel.find('.alert-danger');
                            $alert.removeClass('hidden');
                            setTimeout(function() {
                                $alert.addClass('hidden');
                            }, 500);
                        } else {
                            bugService.createBug(name, desc, code, type, language, solve);
                        }

                    });
                $('body').on("click", 'a.title', function(){
                    window.location.href = 'detail.html?id=' + $(this).attr("bug_id");
                });

			},

            getBugs: function getBugs() {
                $.ajax({
                    url: 'http://106.187.99.225:4000/bugs',
                    type: 'get',
                    ataType : "json",
                    success: function(bugs) {
                         if(bugs != null) {
                            var length = bugs.length;
                            var innerHtml = '';

                            for(var i=0; i<length; i++) {
                                innerHtml += '<div class="bug"><div class="bug-title"><a class="title" href="javascript:void(0);" bug_id="' + bugs[i]._id + '">' +
                                bugs[i].name + '</a></div><div class="bug-content"><span>' + bugService.interceptStr(bugs[i].desc, 150) + '</span></div>' +
                                '<div class="bug-bottom clearfix"><div class="bug-type pull-left"><span>' + bugs[i].type +
                                '</span></div><div class="bug-time pull-right"><span>' + bugService.formatTime(bugs[i].modify_at) + '</span></div></div></div><hr class="right">';
                            }

                            $('.bugs').html(innerHtml);
                        }
                    }
                });
            },
            searchBugs: function searchBugs(key) {
                $.ajax({
                    url: 'http://106.187.99.225:4000/bugs?key=' + key,
                    type: 'get',
                    dataType : "json",
                    success: function(bugs) {
                        if(bugs != null && bugs.length > 0) {
                            var length = bugs.length;
                            var innerHtml = '';

                            for(var i=0; i<length; i++) {
                                innerHtml += '<div class="bug"><div class="bug-title"><a class="title" href="javascript:void(0);" bug_id="' + bugs[i]._id + '">' +
                                bugs[i].name + '</a></div><div class="bug-content"><span>' + bugService.interceptStr(bugs[i].desc, 150) + '</span></div>' +
                                '<div class="bug-bottom clearfix"><div class="bug-type pull-left"><span>' + bugs[i].type +
                                '</span></div><div class="bug-time pull-right"><span>' + bugService.formatTime(bugs[i].modify_at) + '</span></div></div></div><hr class="right">';
                            }

                            $('.bugs').html(innerHtml);
                        } else {
                            $('.bugs').html('<p>搜索内容不存在!</p>');
                        }
                    }
                });
            },
            createBug: function createBug(name, desc, code, type,language,solve) {
                $.ajax({
                    url: 'http://106.187.99.225:4000/bugs',
                    type: 'post',
                    dataType : "json",
                    data: {name: name, desc: desc, code: code, type: type, language: language, solve: solve},
                    success: function(bug) {
                        if(bug != null) {
                            setTimeout(function() {
                                $('#createModel').modal('hide');
                            }, 500);

                            bugService.getBugs();
                        }
                    }
                });
            },
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
            },
            interceptStr: function interceptStr(str, length) {
                if(str) {
                    var result = str.substr(0, length);
                    if(str.length > length) {
                        result += '.....';
                    }
                    return result;
                } else {
                    return "";
                }
            },

			init: function(){
				this.attachEvents();
                this.getBugs();
			}
		};
		
		bugService.init();

}(window || this, jQuery, undefined));
