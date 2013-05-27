
$(document).ready(function(){
    String.prototype.random = function(length) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var randomstring = ''
        for (var i=0; i<length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }
    function getParameters() {
        var parameters = {};
        window.location.search.substr(1).split('&').forEach(function(pair) {
            if (pair === '') return;
            var parts = pair.split('=');
            if (parts[1] == 'true') parameters[parts[0]] = true;
            else if (parts[1] == 'false') parameters[parts[0]] = false;
            else parameters[parts[0]] = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, ' '));
        });
        return {
            get: function(name, defaultValue) {
                if (parameters.hasOwnProperty(name)) return parameters[name];
                return defaultValue;
            }
        };
    }
	var parameters = getParameters();
	$('#compare').mergely({
		ignorews: parameters.get('ws', false),
		lcs: parameters.get('lcs', true),
		sidebar: parameters.get('sb', true),
		loaded: function() {
			$('.toolbar').fadeIn('fast');
			$('button').css({'visibility':'visible'});
		},
		resized: function() {
			var lhsx = $('.mergely-margin:first-child').width();
			var rhsx = lhsx + $('#compare-editor-rhs .CodeMirror').width() + 25 - $('#lhs-toolbar').width();
			$('#lhs-toolbar, #title-lhs').css({'position':'relative', 'left':lhsx});
			$('#rhs-toolbar, #title-rhs').css({'position':'relative', 'left':rhsx});
			$('#title-rhs').css({'left':rhsx});
		},
		height: 'auto',
		width: 'auto',
		cmsettings: {
			mode: 'text/plain',
			lineWrapping: parameters.get('wrap') || false,
			readOnly: (key == '4qsmsDyb') || parameters.get('ro')
		}
	});
    $("#compare").mergely("lhs","Hello world");
    $("#compare").mergely("rhs","Hello world\nGo");
});
