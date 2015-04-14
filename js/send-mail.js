
$(function() {
	
	var contactForm = $( '#contact-form' );
	var loader = contactForm.find('.ajax-loader');
	
	contactForm.submit(function()
	{
		if (contactForm.valid())
		{
			// loader.css('display', 'block');
            $('.alert.success').remove();
            $('.alert.error').remove();
			var formValues = $(this).serialize();
			
			$.post($(this).attr('action'), formValues, function(data)
			{
				if ( data == 'success' )
				{
					contactForm.clearForm();
					contactForm.prepend('<div class="alert success"><strong>¡BIEN!</strong> Tu mensaje ha sido enviado.</div>');
				}
				else
				{
					contactForm.prepend('<div class="alert error"><strong>¡UPS!</strong> Ha habido un error. Por favor envía un mail manualmente a <A HREF="mailto:mrivero@miguelrivero.net">mrivero@miguelrivero.net</A></div>');
				}
				loader.hide();
				contactForm.find('.alert').slideDown();
			});
		}
		
		return false
	});

});


$.fn.clearForm = function() {
  return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};