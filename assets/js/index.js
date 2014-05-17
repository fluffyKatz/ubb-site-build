// Main Function

(function ($){
	"use strict";

	var themeApp = {

		vernal_featured:function() {
			$(".post").each(function() {
    			$(this).find('.feature-media').appendTo($(this).find('.append-feature-media'));
   			});
		},
		vernal_Fitvids:function() {
			$(".post").fitVids();
		},
		vernal_sidebar:function() {
			if(sidebar_left == true) {
				$('.main-article').css("float", "right");
				$('.sidebar').css("float", "left");
			}
		},
		vernal_navbar:function() {
			if(navbar_fixed_top == true) {
				$('.navbar').addClass('navbar-fixed-top');
				$('.header').addClass('top-margin');
			}
		},
		vernal_mailchimp:function() {
			$('#mc-embedded-subscribe-form').attr("action", mailchimp_form_url);
			$("#mc-embedded-subscribe-form input").not("[type=submit]").jqBootstrapValidation({
	            submitSuccess: function ($form, event) {
					event.preventDefault();
	                var url=$form.attr('action');
	                if(url=='' || url=='YOUR_MAILCHIMP_WEB_FORM_URL_HERE')
	                {
	                    alert('Please config your mailchimp form url for this widget');
	                    return false;
	                }
	                else{
	                    url=url.replace('/post?', '/post-json?').concat('&c=?');
	                    var data = {};
	                    var dataArray = $form.serializeArray();
	                    $.each(dataArray, function (index, item) {
	                        data[item.name] = item.value;
	                    });
	                    $.ajax({
	                        url: url,
	                        data: data,
	                        success: function(response){
	                            if (response.result === 'success') {
	                                alert("Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email just sent you.");
	                            }
	                            else{
	                                alert(response.result);
	                            }
	                        },
	                        dataType: 'jsonp',
	                        error: function (response, text) {
	                            console.log('mailchimp ajax submit error: ' + text);
	                        }
	                    });
	                    return false;
	                }
	            }
	        });
		},
		vernal_facebook:function() {
	        var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href='+facebook_page_url+'&amp;width=262&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=false&amp;height=300" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:300px;" allowTransparency="true"></iframe>';
	        $('.fb').append(fb_page);
	        $(".fb").fitVids();
    	},
    	vernal_twitter:function(){
    		var twitter_block = '<a class="twitter-timeline" href="'+twitter_url+'" data-widget-id="'+twitter_widget_id+'" data-link-color="#0062CC" data-chrome="nofooter noscrollbar" data-tweet-limit="3">Tweets</a>';
	        twitter_block += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
	        
	        $('.twitter').append(twitter_block);
    	},
    	vernal_google_plus:function() {
    		var google_plus_code = '<div class="g-page" data-href="'+google_plus_url+'" data-rel="publisher"></div><script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>';
    		$('.gogle-plus-badge').append(google_plus_code);
    	},
    	vernal_flickr:function() {
			$('.flickr-stream-container').jflickrfeed({
				limit: 16,
				qstrings: {
					id: flickr_id
				},
				itemTemplate: 
				'<li>' +
					'<a href="{{image_b}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
				'</li>'
			}, function(data) {
				$('.flickr-stream-container').magnificPopup({
				  delegate: 'a', // child items selector, by clicking on it popup will open
				  type: 'image',
				  gallery:{enabled:true}
				  // other options
				});
			});
    	},
    	vernal_recent_post:function() {
    		var numpost = $('.single-post-preview').length;
	        var numpost2;
	        if(numpost==0) {
	        	numpost = 0;
	        	numpost2 = recent_post_count;
	        }
	        else {
	        	numpost2 = numpost + recent_post_count;
	        }
    		$parseRSS({
			    count: numpost2,
			    url: base_url+'/rss/',
			    callback: function(posts) {
			        var code = String('');
			        for(var i = numpost; i < posts.length; i++) {
			            var full = posts[i].content;
			            var src	= $(full).find('img:first-of-type').attr('src');
		            	if (src === undefined) {
		            		src = base_url+'/assets/images/default-thumbnail.jpg';
		            	}
			            var content = posts[i].contentSnippet;
			            var link = posts[i].link;
			            var title = posts[i].title;
			            var date = posts[i].publishedDate;
			            code += '<div class="recent-single-post">';
			            code += '<div class="post-image"><a href="'+src+'" title="'+title+'"><img src="' + src +'"></a></div>';
			            code += '<a href="' + link + '"><h4 class="post-title">' + title + '</h4></a><span class="date"><i class="fa fa-clock"></i>' + Date.create(date).relative() + '</span>';
			            code += '</div>';			
			        }
			        $(".recent-post-container").html(code);
			        $('.post-image a').magnificPopup({type:'image'});	
			    }
			});
		},
		vernal_image_hover_gen:function(src, alt, link){
			var htmlCode = String('');
			htmlCode += '<div class=\"img-hover\"><a class=\"image-zoom\" href=\"'+src+'\" alt=\"'+alt+'\"><i class=\"fa fa-search-plus\"></i></a>';
			htmlCode += '<a href=\"'+link+'\"><i class=\"fa fa-link\"></i></a></div>';
			return htmlCode;
		},
		vernal_image_hover:function() {
			$('.single-post-preview').each(function(){
				var img = $(this, $('.feature-media')).find('img');
				var imgSrc = $(this, $('.feature-media')).find('img').attr('src');
				var imgTitle = $(this, $('.feature-media')).find('img').attr('alt');
				var anchor = $(this, $('.post-header .post-title')).find('a');
				var postLink = anchor.attr('href');
				if (typeof imgSrc !== 'undefined'){
					$(this).find('.feature-media').append(themeApp.vernal_image_hover_gen(imgSrc,imgTitle,postLink));
				}
				$('.image-zoom').magnificPopup({type:'image'});	
			});
		},
		vernal_comment_count:function(){
			/* * * DON'T EDIT BELOW THIS LINE * * */
			(function() {
			    var s = document.createElement('script'); s.async = true;
			    s.type = 'text/javascript';
			    s.src = '//' + disqus_shortname + '.disqus.com/count.js';
			    (document.getElementsByTagName('BODY')[0]).appendChild(s);
			}());
			$('head').find('script').each(function(){
				$(this).appendTo('body');
			});
    	},

		vernal_initializ:function(){
			themeApp.vernal_featured();
			themeApp.vernal_Fitvids();
		    themeApp.vernal_sidebar();
		    themeApp.vernal_navbar();
		    themeApp.vernal_mailchimp();
		    themeApp.vernal_facebook();
		    themeApp.vernal_twitter();
		    themeApp.vernal_google_plus();
		    themeApp.vernal_flickr();
		    themeApp.vernal_recent_post();
		    themeApp.vernal_image_hover();
		    themeApp.vernal_comment_count();
		}

	}

	/* === INITIALING === */
	$(document).ready(function(){
		themeApp.vernal_initializ();
	});

}(jQuery));