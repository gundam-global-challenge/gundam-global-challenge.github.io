// UA
var _ua = (function(u){
	return {
		Tablet:u.indexOf("ipad") != -1
		|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
		|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
		|| u.indexOf("kindle") != -1
		|| u.indexOf("silk") != -1
		|| u.indexOf("playbook") != -1,
		Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
		|| u.indexOf("iphone") != -1
		|| u.indexOf("ipod") != -1
		|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
		|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
		|| u.indexOf("blackberry") != -1
	}
})(window.navigator.userAgent.toLowerCase());

/*popup*/
$(function () {
  $('.popupModal').magnificPopup({
		src: $(this).attr('href'),
		type:'inline',
		midClick: true
	});
	$('.mfp-close').on('click', function(){
		$.magnificPopup.close();
	});
});
/*popup end*/

//Date I/F
var DateIF={
	yobi:'“ú ŒŽ ‰Î … –Ø ‹à “y'.split(' '),
	yobiE:'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
	tukiE:'January February March April May June July August September October November December'.split(' '),
	parse:function(str){
		var ret=false;
		if(!str)return false;
		if(str.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/)){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10), parseInt(RegExp.$6,10) );
		}
		else if(str.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/)){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10) );
		}
		else if(str.match(/(\d{4})(\d{2})(\d{2})/)){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10) );
		}
		else if(str.match( /(\d{4})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})/ )){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10), parseInt(RegExp.$6,10) );
		}
		else if(str.match( /(\d{4})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})/ )){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10) );
		}
		else if(str.match( /(\d{4})\D(\d{1,2})\D(\d{1,2})/ )){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10) );
		}
		return ret;
	},
	format:function(fmt, d){
		var t={};
		t.Y = fmt.match(/Y+/);
		if(t.Y)fmt = fmt.replace( /Y+/g, d.getFullYear().toString().slice(4-t.Y[0].length) );
		t.M = fmt.match(/M+/);
		if(t.M)fmt = fmt.replace( /M+/g, this.zeroPad(d.getMonth()+1, t.M[0].length) );
		t.D = fmt.match(/D+/);
		if(t.D)fmt = fmt.replace( /D+/g, this.zeroPad(d.getDate(), t.D[0].length) );
		fmt = fmt.replace( /a+/g, this.yobi[d.getDay()] );
		var hh=d.getHours();
		var hf=((hh-12)>=0)?1:0;
		fmt = fmt.replace( /A+/g, Array('AM','PM')[hf] );
		fmt = fmt.replace( /G+/g, Array('Œß‘O','ŒßŒã')[hf] );
		t.h = fmt.match(/h+/);
		if(t.h)fmt = fmt.replace( /h+/g, this.zeroPad(hh, t.h[0].length) );
		t.n = fmt.match(/n+/);
		if(t.n)fmt = fmt.replace( /n+/g, this.zeroPad( Array(hh,hh-12)[hf], t.n[0].length) );
		t.m = fmt.match(/m+/);
		if(t.m)fmt = fmt.replace( /m+/g, this.zeroPad(d.getMinutes(), t.m[0].length) );
		t.s = fmt.match(/s+/);
		if(t.s)fmt = fmt.replace( /s+/g, this.zeroPad(d.getSeconds(), t.s[0].length) );
		fmt = fmt.replace( /K+/g, this.tukiE[d.getMonth()] );
		fmt = fmt.replace( /k+/g, this.tukiE[d.getMonth()].substring(0,3) );
		fmt = fmt.replace( /X+/g, this.yobiE[d.getDay()] );
		fmt = fmt.replace( /x+/g, this.yobiE[d.getDay()].substring(0,3) );
		return fmt;
	},
	reformat:function(fmt,dstr){
		var dt=this.parse(dstr);
		if(dt){
			return this.format(fmt, dt);
		}
		else return false;
	},
	getFirstDay:function(d){
		return this.parse( this.format('YYYY/MM/01',d) );
	},
	zeroPad:function(s,l){
		s=s.toString();
		while(s.length<l){
			s='0'+s;
		}
		return s;
	},
	addDate:function(d, add){
		var ad={Y:0,M:0,D:0,h:0,m:0,s:0};
		for(var i in add){
			ad[i]=add[i];
		}
		return (new Date(d.getFullYear()+ad.Y, d.getMonth()+ad.M, d.getDate()+ad.D, d.getHours()+ad.h, d.getMinutes()+ad.m, d.getSeconds()+ad.s));
	},
	setDate:function(d, set){
		var se={Y:d.getFullYear(),M:d.getMonth(),D:d.getDate(),h:d.getHours(),m:d.getMinutes(),s:d.getSeconds()};
		for(var i in set){
			if(i=='M'){se[i]=set[i]+1;}
			else se[i]=set[i];
		}
		return new Date(se.Y, se.M, se.D, se.h, se.d, se.s);
	},
	timeDelete:function(d){
		return this.parse(this.format('YYYY/MM/DD',d));
	},
	diffDate:function(d1,d2){
		return (this.timeDelete(d1)-this.timeDelete(d2))/86400000;
	}
};