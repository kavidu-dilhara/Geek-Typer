/*
*(c) Copyright 2011 Simone Masiero. Some Rights Reserved. 
*This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
*/

$(
	function(){
		$( document ).keyup(
			function ( event ) {
				if(event.keyCode != 8) Typer.addText( event ); 
				else { Typer.removeText(); event.preventDefault(); }
			}
		).mousewheel(function(e) {
			Typer.speed += Math.ceil(Typer.speedStep) * e.deltaY;
			Typer.speed = (Typer.speed < Math.floor(Typer.speedMin)) ? Math.floor(Typer.speedMin) : (Typer.speed > Math.floor(Typer.speedMax)) ? Math.floor(Typer.speedMax) : Typer.speed;
			console.log(Typer.speed);
		});
	}
);

var Typer={
	text: null,
	accessCountimer:null,
	index:0, 
	speedMax:10,
	speedMin:0,
	writeCount:0,
	speedStep:0.5,
	speed:6, 
	file:"", 
	accessCount:0, 
	deniedCount:0, 
	secCount:0, 
		coldCount:0, 
	secCount:0, 
	radarCount:0, 
		windowCount:0, 
			ponyCount:0, 
	tagList:[],
	typeIntervalCounter:0,
	typeInterval:false,
	init: function(){
		accessCountimer=setInterval(function(){Typer.updLstChr();},500); 
		$.get(Typer.file,function(data){
			Typer.text=data;
		});
	},
	
	content:function(){
		return $("#console").html();
	},
	
	write:function(str){
		$("#console").append(str);
		return false;
	},

	
	removeText:function(){
		if(Typer.text){

			Typer.index = (Typer.index > 0) ? Typer.index - Typer.speed * 2 : 0;
			Typer.addText(event);
		}
	},
	
	
	
	
	addTextAuto:function(key){
	
	Typer.writeCount++;
	
	

	
		if(Typer.text){ 
			
			if(Typer.index <= 0) {
				$("#console").html('');
			}
			
			Typer.index = Typer.index % Typer.text.length
			
			var cont=Typer.content(); // get the console content
			if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
				$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text

			var text=Typer.text.substr(Typer.index,Typer.speed)//Typer.index-(Typer.speed));// parse the text for stripping html enities
			var rtn= new RegExp("\n", "g"); // newline regex
			//var rts= new RegExp("\\s", "g"); // whitespace regex
			var rtt= new RegExp("\\t", "g"); // tab regex
			text = text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;");//.replace(rts,"&nbsp;");// replace newline chars with br, tabs with 4 space and blanks with an html blank
			//console.log(text);
			$("#console").append(text);
			
			var usedTags = new RegExp("<img.*?>", "g"),
				systemTags = new RegExp("{(.*?)}", "g");
			var foundTag = usedTags.exec(Typer.text.substring(Typer.index)),
				foundSystemTag = systemTags.exec(Typer.text.substring(Typer.index));
			if(foundTag instanceof Array && foundTag.index <= Typer.speed) {
				Typer.index += foundTag.index + foundTag[0].length;
				$("#console").append(foundTag[0]);
			} else if(foundSystemTag instanceof Array && foundSystemTag.index <= Typer.speed) {
				//Typer.text.replace(/{(.*?)}/,foundSystemTag[1]);
				Typer.index += foundSystemTag.index + foundSystemTag[0].length;
				$("#console").append(foundSystemTag[1]);
			} else Typer.index += Typer.speed;
			$('body').scrollTop($("#console").height()); 
			window.scrollBy(0,50); // scroll to make sure bottom is always visible 
			
		}
		if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
			key.preventDefault()
		};  
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},
	
	updLstChr:function(){ // blinking cursor
		var cont=this.content(); // get console 
		if(cont.substring(cont.length-1,cont.length)=="|") // if last char is the cursor
			$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it
		else
			this.write("|"); // else write it
	


			
	
	
	
	},

	addText:function(key){
	
	

	
	
	Typer.writeCount++;

	
	
	
		if(key.keyCode==109){// key 18 = alt key
			Typer.accessCount++; //increase counter 
			if(Typer.accessCount>=1){// if it's presed 3 times
				Typer.makeAccess(); // make access popup
			}
		}else if(Typer.text){ // otherway if text is loaded
			
			if(Typer.index <= 0) {
				$("#console").html('');
			}
			
			Typer.index = Typer.index % Typer.text.length
			
			var cont=Typer.content(); // get the console content
			if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
				$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text
			/*
			if(key.keyCode!=8){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			}else{
				if(Typer.index>0) // else if index is not less than 0 
					Typer.index-=Typer.speed;//	remove speed for deleting text
			}
			*/
			var text=Typer.text.substr(Typer.index,Typer.speed)//Typer.index-(Typer.speed));// parse the text for stripping html enities
			var rtn= new RegExp("\n", "g"); // newline regex
			//var rts= new RegExp("\\s", "g"); // whitespace regex
			var rtt= new RegExp("\\t", "g"); // tab regex
			text = text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;");//.replace(rts,"&nbsp;");// replace newline chars with br, tabs with 4 space and blanks with an html blank
			//console.log(text);
			$("#console").append(text);
			
			var usedTags = new RegExp("<img.*?>", "g"),
				systemTags = new RegExp("{(.*?)}", "g");
			var foundTag = usedTags.exec(Typer.text.substring(Typer.index)),
				foundSystemTag = systemTags.exec(Typer.text.substring(Typer.index));
			if(foundTag instanceof Array && foundTag.index <= Typer.speed) {
				Typer.index += foundTag.index + foundTag[0].length;
				$("#console").append(foundTag[0]);
			} else if(foundSystemTag instanceof Array && foundSystemTag.index <= Typer.speed) {
				//Typer.text.replace(/{(.*?)}/,foundSystemTag[1]);
				Typer.index += foundSystemTag.index + foundSystemTag[0].length;
				$("#console").append(foundSystemTag[1]);
			} else Typer.index += Typer.speed;
			$('#console').scrollTop($("#console").height()); 
			$('body').scrollTop(); 
			window.scrollBy(0,50); // scroll to make sure bottom is always visible 
			

		}
		if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
			key.preventDefault()
		};  
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},
	
	updLstChr:function(){ // blinking cursor
		var cont=this.content(); // get console 
		if(cont.substring(cont.length-1,cont.length)=="|") // if last char is the cursor
			$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it
		else
			this.write("|"); // else write it
	}
}

function startTime()
{
var today=new Date();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();
// add a zero in front of numbers<10
m=checkTime(m);
s=checkTime(s);
document.getElementById('txt').innerHTML=h+":"+m+":"+s;
t=setTimeout(function(){startTime()},500);
}







function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}