(function(window, $, undefined){
		var bugService = {
			attachEvents: function(){
                $('#add').on("click", function(){
                    var $createModel = $('#createModel');
                    $createModel.modal({
                        backdrop: 'static'
                    });
                })

                $('#createModel')
                    .on('click', '.btn-right', function() {    //create a new resource
                        var $createModel = $(this).parents('#createModel');
                        var name = $createModel.find('input[name=name]').val();
                        var desc = $createModel.find('textarea[name=desc]').val();
                        var code = $createModel.find('textarea[name=code]').val();
                        var type = $createModel.find('input[name=type]').val();
                        var language = $createModel.find('input[name=language]').val();
                        var solve = $createModel.find('textarea[name=solve]').val();

                        bugService.createBug(name, desc, code, type, language, solve);
                    })
			},

            getBugs: function getBugs() {
                $.ajax({
                    url: '/bugs',
                    type: 'get',
                    ataType : "json",
                    success: function(bugs) {
                        alert('tt');
                         if(bugs != null) {
                            var length = bugs.length;
                            var innerHtml = '';

                            for(var i=0; i<length; i++) {
                                innerHtml += '<div class="bug"><div class="bug-title"><a bug_id="' + bugs[i]._id + '>' +
                                bugs.name + '</a></div><div class="bug-content"><span>' + bugs[i].desc + '</span></div>' +
                                '<div class="bug-bottom clearfix"><div class="bug-type pull-left"><span>' + bugs[i].type +
                                '</span></div><div class="bug-time pull-right"><span>' + bugs[i].time + '</span></div></div></div><hr class="right">';
                            }

                            $('.bugs').html(innerHtml);
                        }
                    },
                    error: function() {
                        alert('error');
                    }
                });
            },
            searchBugs: function searchBugs(key) {
                $.ajax({
                    url: 'http://localhost:3000/bugs?key=' + key,
                    type: 'get',
                    dataType : "json",
                    success: function(bugs) {
                        if(bugs != null) {
                            var length = bugs.length;
                            var innerHtml = '';

                            for(var i=0; i<length; i++) {
                                innerHtml += '<div class="bug"><div class="bug-title"><a bug_id="' + bugs[i]._id + '>' +
                                bugs.name + '</a></div><div class="bug-content"><span>' + bugs[i].desc + '</span></div>' +
                                '<div class="bug-bottom clearfix"><div class="bug-type pull-left"><span>' + bugs[i].type +
                                '</span></div><div class="bug-time pull-right"><span>' + bugs[i].time + '</span></div></div></div><hr class="right">';
                            }

                            $('.bugs').html(innerHtml);
                        }
                    }
                });
            },
            createBug: function createBug(name, desc, code, type,language,solve) {
                $.ajax({
                    url: 'http://localhost:3000/bugs',
                    type: 'post',
                    dataType : "json",
                    data: {name: name, desc: desc, code: code, type: type, language: language, solve: solve},
                    success: function(data) {
                        if(data != null) {
                            var page = $('bugs').html;


                        }
                    }
                });
            },

			init: function(){
				this.attachEvents();
                this.getBugs();
			}
		};
		
		bugService.init();

}(window || this, jQuery, undefined));
