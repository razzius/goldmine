$(document).ready(function() {

	$(".tab").click(function () {
		var id = '#' + this.id + 'content';

		$('#tab1content').css('display', 'none');
		$('#tab2content').css('display', 'none');
		$('#tab3content').css('display', 'none');
		$('#tab4content').css('display', 'none');

		$(id).css('display', 'block');

	//	$('#'+id + 'content').css("display","block");

	});

	$(".box").click(function () {
		$(".box").toggle();
	});




});
