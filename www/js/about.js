(function(window, $, undefined){
		var aboutService = {
			attachEvents: function attachEvents(){
                $('a.blog').on("click", function(){
                    window.location.href = 'http://xfhnever.com/';
                });

			},
			init: function(){
				this.attachEvents();
			}
		};

        aboutService.init();

}(window || this, jQuery, undefined));
