//关键词sug
$(function() {
	$('#search-text').on('click', function(event) {
		$('#search-text').trigger('keyup');
		event.stopPropagation();
	});
	$('#search-text').keyup(function(event) {
		if (event.keyCode == 13) {
			alert('adsd');
		}
	});
	$('#search-text').keyup(function() {
		var keywords = $(this).val();
		if (keywords == '') {
			// $('#word').hide();
			var cookieVal = localStorage.getItem('cvals');
			if (!cookieVal) {
				$('#word').hide();
				return;
			}
			const s = JSON.parse(cookieVal);
			$('#word').empty().show();
			$.each(s, function() {
				$('#word').append('<li>' + this + '</li>');
			});
			return;
		}
		$.ajax({
			url: 'https://suggestion.baidu.com/su?wd=' + keywords,
			dataType: 'jsonp',
			jsonp: 'cb', //回调函数的参数名(键值)key
			// jsonpCallback: 'fun', //回调函数名(值) value
			beforeSend: function() {
				// $('#word').append('<li>正在加载。。。</li>');
			},
			success: function(data) {
				$('#word').empty().show();
				if (data.s == '') {
					//$('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
					$('#word').empty();
					$('#word').hide();
				}
				$.each(data.s, function() {
					$('#word').append('<li>' + this + '</li>');
				});
			},
			error: function() {
				$('#word').empty().show();
				//$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
				$('#word').hide();
			}
		});
	});
	//点击搜索数据复制给搜索框
	$(document).on('click', '#word li', function() {
		var word = $(this).text();
		var cookieVal = localStorage.getItem('cvals');
		if (!cookieVal) {
			cookieVal = '[]';
		}
		cookieVal = JSON.parse(cookieVal);
		cookieVal.unshift(word);
		if (cookieVal.length > 5) {
			cookieVal.pop();
		}
		localStorage.setItem('cvals', JSON.stringify(cookieVal));
		$('#search-text').val(word);
		$('#word').empty();
		$('#word').hide();
		//$("form").submit();
		$('.submit').trigger('click'); //触发搜索事件
	});
	$(document).on('click', '.container,.banner-video,nav', function() {
		$('#word').empty();
		$('#word').hide();
	});
});
