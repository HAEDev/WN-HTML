
$(window).load(function(){ getCommands(); })

var wearMLElements = [];

//CONST
var text_field = "--text_field";
var overlay_show_number = "--overlay_show_number";
var overlay_show_text = "--overlay_show_text";
var overlay_persists = "--overlay_persists";
var overlay_orientation = "--overlay_orientation";
var overlay_background_color = "--overlay_background_color";
var overlay_text_color = "--overlay_text_color";
var overlay_border_color = "--overlay_border_color";
var overlay_anchor_hv = "--overlay_anchor";
var overlay_show_dot = "--overlay_show_dot";
var overlay_show_icon = "--overlay_show_icon";
var overlay_offset = "--overlay_offset";
var hf_scroll = "--hf_scroll";
var barcode = "--hf_barcode";
var global = "--global_commands";
var broadcast_results = "--broadcast_results";

function getCommands() {
   var elements = getAllElementsWithAttribute('*');
   createOverrideDom();
}

/**
*  Get all elements based on attribute passed
**/
function getAllElementsWithAttribute(attribute)
{
  var allElements = document.body.getElementsByTagName(attribute);
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    //Check element to see if it has atleast one of our tags
    if (allElements[i].getAttribute('data-wml-style') !== null || allElements[i].getAttribute('data-wml-speech')  !== null  )
    {
        var styleId = allElements[i].getAttribute('data-wml-style');
        var command = allElements[i].text;

        var speech_command = allElements[i].getAttribute('data-wml-speech-command');

        if(speech_command !== null){
            command = speech_command;
        }

        if(allElements[i].id === ""){
            allElements[i].id = guid();
        }

        var position = getPosition(allElements[i]);
        var element = {tag: command, id: allElements[i].id,x: position.x, y: position.y, styleId: styleId };
      // Element exists with attribute. Add to array.
        wearMLElements.push(element);
    }
  }
  return wearMLElements;
}

/**
*   Creates a DOM element to contain all the custom xml
**/
function createOverrideDom(){

    var btn = document.getElementById("wearHF_root_button")

    if(btn != undefined)
        document.body.removeChild(btn);
    // Lets make sure its not already made
    var btn = document.createElement("BUTTON");        // Create a <button> element
    btn.id = "wearHF_root_button";

    var t = document.createTextNode("wearhf_override:" + generateXML());       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    btn.style.top = 0;
    btn.style.left = 0;
    btn.style.position = "absolute";
    btn.style.opacity  = "0.0";
    // Get a reference to the first child
    var theFirstChild = document.body.firstChild;
   // document.body.appendChild(btn);
   document.body.insertBefore(btn, theFirstChild);
}


/**
*  Create xml for web page.
**/
function generateXML(){
  var xml = "<WearML><Package>com.android.webview</Package><Language>en_UK</Language><UniqueIdentifier id=\"web_app\"/> ";

  for (var i = 0, n = wearMLElements.length; i < n; i++)
  {
      var command = wearMLElements[i].tag;
      var styleId = wearMLElements[i].styleId
      xml += "<View ";
      xml += "id=\"" + wearMLElements[i].id + "\" ";

      var style = getStyle(styleId)

      if(style != null)
          xml += wearMLParser(style, wearMLElements[i]);

      if(command != undefined){
       xml += "speech_command=\""+ command + "\" ";
      }

      xml += "xy=\"" + wearMLElements[i].x + "," + wearMLElements[i].y + "\"";

      xml += "/> ";
  }

   xml += "</WearML>";
   return window.btoa(xml);
}

/**
*   Finding style based on class name and returns style
**/
function getStyle(className) {
    var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules
    for(var x=0;x<classes.length;x++) {
        if(classes[x].selectorText==className) {
            return classes[x].style;
        }
    }
}

/**
*   Create Random GUID
**/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getPosition(e) {
    var isNotFirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') == -1);
    var x = 0, y = 0;
    while (e) {
        x += e.offsetLeft - e.scrollLeft + (isNotFirefox ? e.clientLeft : 0);
        y += e.offsetTop - e.scrollTop + (isNotFirefox ? e.clientTop : 0);
        e = e.offsetParent;
    }
    return { x: x + window.scrollX, y: y + window.scrollY };
}


/**
*    Convert String to xml attribute
**/
function wearMLParser(e, element) {

   var attributes = "";

   var get_text_field = e.getPropertyValue(text_field).trim();
   var get_overlay_show_number = e.getPropertyValue(overlay_show_number).trim();
   var get_overlay_show_text = e.getPropertyValue(overlay_show_text).trim();
   var get_overlay_persists = e.getPropertyValue(overlay_persists).trim();
   var get_overlay_orientation = e.getPropertyValue(overlay_orientation).trim();
   var get_overlay_background_color = e.getPropertyValue(overlay_background_color).trim();
   var get_overlay_text_color = e.getPropertyValue(overlay_text_color).trim();
   var get_overlay_border_color = e.getPropertyValue(overlay_border_color).trim();
   var get_overlay_anchor_hv = e.getPropertyValue(overlay_anchor_hv).trim();
   var get_overlay_show_dot = e.getPropertyValue(overlay_show_dot).trim();
   var get_overlay_show_icon = e.getPropertyValue(overlay_show_icon).trim();
   var get_overlay_offset = e.getPropertyValue(overlay_offset).trim();
   var get_hf_scroll = e.getPropertyValue(hf_scroll).trim();
   var get_barcode = e.getPropertyValue(barcode).trim();
   var get_global = e.getPropertyValue(global).trim();
   var get_broadcast_results = e.getPropertyValue(broadcast_results).trim();

   /**
       Input type
   ***/
   if(get_text_field != ""){
       attributes += "text_field="+ get_text_field + " ";
    }

    /**
        Show Number
    ***/
    if(get_overlay_show_number != ""){
        if(get_overlay_show_number)
            attributes += "overlay_show_number=\"yes\" ";
        else{
            attributes += "overlay_show_number=\"no\" ";
        }
    }

    /**
        Show Text
    **/
    if(get_overlay_show_text != ""){
        if(get_overlay_show_text)
            attributes += "overlay_show_text=\"yes\" ";
        else{
            attributes += "overlay_show_text=\"no\" ";
        }
    }


    /**
        Show Overlay
    **/
    if(get_overlay_persists != ""){
        if(get_overlay_persists)
            attributes += "overlay_persists=\"yes\" ";
        else{
            attributes += "overlay_persists=\"no\" ";
        }
    }

    /**
        Overlay Orientation
    **/
   if(get_overlay_orientation != ""){
       attributes += "overlay_orientation="+ get_overlay_orientation + " ";
    }

    /**
        Overlay background color
    **/
   if(get_overlay_background_color != ""){
       attributes += "overlay_background_color="+ get_overlay_background_color + " ";
    }


    /**
        Overlay text color
    */
   if(get_overlay_text_color != ""){
       attributes += "overlay_text_color="+ get_overlay_text_color + " ";
    }


    /**
        Overlay border color
    */
   if(get_overlay_border_color != ""){
       attributes += "overlay_border_color="+ get_overlay_border_color + " ";
    }

    /**
        Overlay anchor percent
    */
   if(get_overlay_anchor_hv != ""){
       attributes += "overlay_anchor="+ get_overlay_anchor_hv + " ";
    }

    /**
        Overlay show dot
    **/
   if(get_overlay_show_dot != ""){
       if(get_overlay_show_dot)
              attributes += "overlay_show_dot=\"yes\" ";
          else{
              attributes += "overlay_show_dot=\"no\" ";
       }
    }


    /**
        Overlay show icon
    **/
   if(get_overlay_show_icon != ""){
       if(get_overlay_show_icon)
              attributes += "overlay_show_icon=\"yes\" ";
          else{
              attributes += "overlay_show_icon=\"no\" ";
       }
    }

    /**
        Overlay offset
    **/
   if(get_overlay_offset != ""){
        attributes += "overlay_offset="+ get_overlay_offset + " ";
    }

    /**
        HF Scroll
    **/
   if(get_hf_scroll != ""){
       attributes += "hf_scroll="+ get_hf_scroll + " ";
    }

    /**
       Barcode Reader
    **/
   if(get_barcode != ""){
      attributes += "barcode="+ get_barcode + " ";

    }

    /**
        Global Commands
    **/
   if(get_global != ""){
          if(get_global)
               attributes += "global_commands=\"yes\" ";
             else{
                 attributes += "global_commands=\"no\" ";
          }
    }

    /**
        BroadCast Commands
    **/
   if(get_broadcast_results != ""){
          if(get_broadcast_results)
               attributes += "broadcast_results=\"yes\" ";
             else{
                 attributes += "broadcast_results=\"no\" ";
          }
    }
    return attributes;
}

