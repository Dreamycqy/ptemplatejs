pTemplate.setBaseFontSize(16);var baseFontSize = window.baseFontSize || pTemplate.getBaseFontSize(),styles = pTemplate.createStyle({alink: {fontWeight:400,fontSize:(30/baseFontSize).toFixed(4)+"rem",color:"rgb(255,255,255)",width:(40/baseFontSize).toFixed(4)+"rem",height:(40/baseFontSize).toFixed(4)+"rem",textAlign:"center",borderRadius:(30/baseFontSize).toFixed(4)+"rem",display:"inline-block",backgroundColor:"rgb(100,149,237)"},alinkbutton:{fontWeight:400,fontSize:(80/baseFontSize).toFixed(4)+"rem"}});pTemplate.router({"/test":{path: "/",params: {a:1}},"/test":{path:"/no type/",params: {b:2}}});pTemplate.createStyle({'.alink':{' fontWeight':'700','fontSize':'20rem '}, });pTemplate.createTemplate('test', {parent: undefined,content: "<h1 p-custom:title=\"('header_title_'+'{{title \| lowercase}}').toUpperCase()\" p-custom:data-custom=\"{{title \| custom : 123}}\">header_{{title | lowercase}}</h1><a p-router:href=\"/test\" target=\"_blank\" p-handle:click=\"handleClickFn\" p-handle:watch=\"handleWatchFn : {{title}}\">{{title | lowercase}}</a><br ></br><input type=\"text\" value=\"{{title \| uppercase}}\" p-handle:change=\"handleChangeFn\"></input><input type=\"button\" value=\"{{ resetButtonText \| uppercase }}\" p-handle:click.prevent=\"handleButtonAlert : hello world!\"></input><span ><b p-express:if=\"'{{title \| lowercase}}' == 'test'\" style=\"{{style \| cssPrefix}}\">1</b><b p-express:if=\"'{{title \| lowercase}}' != 'test'\">2</b></span><p ><span p-express:if=\"test\">test demo1</span><span p-express:if=\"xxx\">test demo2</span></p><a p-router=\"/test\" href=\"#\" p-handle:click=\"handleNoTypeClick\">no type</a><ul ><li p-express:for=\"i in data\" p-express:if=\"index % {{index}}\"><a p-custom:href=\"{{url}}\" target=\"_blank\" p-handle:click=\"handleForClick\">{{newstitle}}</a></li></ul><my-component title=\"{{title}}\"></my-component><div p-html=\"html\"></div>",data: {}}, true);pTemplate.render("test", {title: "test",index:2,style: pTemplate.getStyle(".alink"),buttonText: "alert window",data:[{newstitle: "1 news item title ...",url: "/ccc"},{newstitle: "2 news item title ...",url: "/ccc"},{newstitle: "3 news item title ...",url: "/ccc"},{newstitle: "4 news item title ...",url: "/ccc"},{newstitle: "5 news item title ...",url: "/ccc"}],computed: {resetButtonText:function(){return this.buttonText.split('').reverse().join('');}},handle: {handleNoTypeClick(e, msg){alert(msg)},handleButtonAlert(e, msg){this._set("test", {buttonText: msg});alert(msg)},handleForClick(e){e.preventDefault();console.log("forClick")},handleWatchFn(e, msg){console.log(e.type, msg)},handleClickFn(e) {e.preventDefault();console.log(e.type,1);},handleChangeFn(e){console.log(e.type);this._set("test", {title: this.value})}}}, pTemplate.query("#app"), function(elem) {console.log(elem)});