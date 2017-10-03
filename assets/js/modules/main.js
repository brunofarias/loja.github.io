var main = {
	init: function(){
    this.default();
	},

  default: function() {

    // links externos
    $('a[rel=external]').click( function() {
        window.open(this.href);
        return false;
    });
    
    // svg
    svg4everybody();

    // placeholder no ie
    $('input, textarea').placeholder();

    var maskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    options = {onKeyPress: function(val, e, field, options) {
      field.mask(maskBehavior.apply({}, arguments), options);
      }
    };
      
    $('#telefone').mask(maskBehavior, options);
      
  }
}
main.init();

