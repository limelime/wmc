/* Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com) http://joaquinnunez.cl/blog/
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-2.0.php)
 * Use only for non-commercial usage.
 * Requires: jQuery 1.2+
 *
 * Version : 0.1.1
 * Changes:
 *	-Remove colon(:). 
 *	-Fix digital clock: pad zero is less than 10.
 * 
 *
 */

(function(jQuery)
{
  jQuery.fn.clock = function(options)
  {
    var defaults = {
      offset: '+0',
      type: 'analog'
    };
    var _this = this;
    var opts = jQuery.extend(defaults, options);

    setInterval( function() {
      var seconds = jQuery.calcTime(opts.offset).getSeconds();
      if(opts.type=='analog')
      {
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";
        jQuery(_this).find(".sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
      }
      else
      {
      	if(seconds<10)
      		seconds="0"+seconds;    	  
        jQuery(_this).find(".sec").html(seconds);
      }
    }, 1000 );

    setInterval( function() {
      var hours = jQuery.calcTime(opts.offset).getHours();
      var mins = jQuery.calcTime(opts.offset).getMinutes();
      if(opts.type=='analog')
      {
        var hdegree = hours * 30 + (mins / 2);
        var hrotate = "rotate(" + hdegree + "deg)";
        jQuery(_this).find(".hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
      }
      else
      {
      	if(hours<10)
    		hours="0"+hours;    	  
        jQuery(_this).find(".hour").html(hours);
      }
      var meridiem = hours<12?'AM':'PM';
      jQuery(_this).find('.meridiem').html(meridiem);
    }, 1000 );

    setInterval( function() {
      var mins = jQuery.calcTime(opts.offset).getMinutes();
      if(opts.type=='analog')
      {
        var mdegree = mins * 6;
        var mrotate = "rotate(" + mdegree + "deg)";        
        jQuery(_this).find(".min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});                
      }
      else
      {
    	if(mins<10)
    		mins="0"+mins;
        jQuery(_this).find(".min").html(mins);
      }
    }, 1000 );
  }
})(jQuery);


jQuery.calcTime = function(offset) {

  // create Date object for current location
  d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  nd = new Date(utc + (3600000*offset));

  // return time as a string
  return nd;
};
