## 1. Quick Start
### 1.1 HTML Code
Here is the minimal HTML code to get tabs working: 
```html
<table class="table table-bordered table-hover">
	<!-- 表头 -->
	<tr class="bg"> <th>词组</th> <th>拼音</th> <th>多选项</th> <th>正确答案</th> <th>词义</th> </tr>
	<!-- 分页数据 -->
	<tbody id="dataListBox"> </tbody>
</table>

<!-- 分页索引(分页控制区) -->
<div id="pageCodeBox"></div>
```

### 1.2 JS Reference
```html
<!-- 核 -->
<script src="pjaxPage.js"></script>
<!-- 分页模型 -->
<script src="pjaxPage.numberModel.js"></script>
```

###  1.3 JS Setup
```javascript
$.pjaxPage({

	// ajax 配置
	ajax : {
		url : "https://your data interface",
		dataType : "jsonp", // json or jsonp type
	},
	
	// 拼接分页数据,并返回
	createDataHtml : function(data) {
		var content = data.pageData.content;
		var total = content.length;
		if (total == 0)
			return "无数据";

		var dataHtml = '';
		for (var i = 0; i < total; i++) {
			
			var cizu = content[i].cizu.replace(/"/g,"");
			var pinyin = content[i].pinyin;
			var options = content[i].options;
			var ok = content[i].ok.replace(/"/g,"");
			var info = content[i].info.replace(/"/g,"");
			
			dataHtml += '<tr>';
			dataHtml += '	<td>' + cizu + '</td>';
			dataHtml += '	<td>' + pinyin + '</td>';
			dataHtml += '	<td>' + options + '</td>';
			dataHtml += '	<td>' + ok + '</td>';
			dataHtml += '	<td>' + info + '</td>';
			dataHtml += '</tr>';
		}

		return dataHtml;
	}
});
```

## 2. Example
[http://xixifeng.com.oschina.io/pjaxpage/example/](http://xixifeng.com.oschina.io/pjaxpage/example/) 

## 3. 什么是pjaxPage ?
pjax = pushState + ajax, **Page**源自于[FastQuery](https://gitee.com/xixifeng.com/fastquery)项目的`Page`设计.  
`pjaxPage` 它基于**jQuery**,用于实现前端页面翻页,它的优势在于:
- 可以让局部分页请求变成有状态
- 有多种分页模型可供选择
- 模块化设计,开发者可以扩展分页模型 

## 4. 定义
为了方便描述,现在做如下定义(本定义仅仅只针对`pjaxPage`项目):

| 定义名 | 学名 | 解释 |
|:-----:|:-----:|:-----|
|页片|`P.Slice`|待分页的数据可以分成很多**页片**,以便翻页|
|分页概述|`P.Info`|对分页之后的数据进行描述,称之为**分页概述**|
|分页控制区|`P.Ctrl`|用于控制翻页的区域,称之为**分页控制区**|
|分页索引|`P.Index`|对页片进行编号,一般从1开始,这个编号将称之为**分页索引**,分页索引通常可以被单击,用于翻页|
|索引触发状态|`P.Active`|用于明显标记被触发的分页索引的状态,称之为**索引触发状态**|

定义名,如下图所示:  
![定义名](http://xixifeng.com.oschina.io/pjaxpage/example/img/names.png "定义名")  


## 5. pjaxPage配置选项(opts)

| 属性 | 类型 | 默认值 | 描述 |
|:-----|:-----|:-----|:-----|
|ajax|JSON对象|{}|jQuery的ajax的配置(settings),支持jQuery.ajax所有的配置选项.注意:不用设置请求data和success函数.ajax的settings,请参照jQuery官方说明|
|size|正整数|15|用于指定`P.Slice`(页片)显示多少条记录.换言之,指定每页显示多少条记录|
|currentPage|正整数|1|用于指定当前页的`P.Index`(分页索引),例如:把currentPage设置为N,那么就显示第N页|
|dataListBox|jQuery对象|$("#dataListBox")|用于装载`P.Slice`的盒子|
|pageCodeBox|jQuery对象|$("#pageCodeBox")|用于装载`P.Ctrl`的盒子|
|pageModel|JSON对象| {name:"numberModel"}|用于配置分页模型,开发者扩展扩展自己的分页模型.`numberModel`的可选参数,请参阅分页模型章节|
|createDataHtml(data)|回调函数|返回""|共:1个参数. 第1个参数是ajax成功请求所响应的数据.该函数的作用:创建当前`P.Slice`的HTML代码,并返回|
|notFoundTip|字符串|Not Found Data!|翻页时如果没有找到数据,会将此选项设置的值写入到用于装载`P.Slice`的盒子里,支持HTML|
|pageCodeItem|HTML元素|a[tabindex]|`P.Index`的HTML元素选择器|
|eventName|字符串|click|`P.Index`的事件名称.默认`click`,表示单击分页索引就翻页,若设置为`dblclick`,表示双击分页索引,才能翻页.当然,也可以基于jQuery自定义一个事件|
|dataCache|布尔|true|是否采用jQuery的data函数缓存`P.Slice`(页片)数据|
|clear()|回调函数|清除所有页片缓存|清除所有页片缓存|
|writeListBefore()|回调函数|不做什么|数据列表写入倒dom之前,该方法的上下文对象(this)对象是pjaxPage的opts|
|writeListAfter(data)|回调函数|不做什么|数据列表写入倒dom之后,data为服务器响应的数据,该方法的上下文对象(this)为opts|
|getRequestData(currentPage)|回调函数|默认做了什么,请看原码|获取请求参数的方式,注意:它的上下文对象为opts, currentPage表示当前页|
|activeName|字符串|active|`P.Index`被触发后的class样式选择器|
|pjaxId|字符串|xixifeng_pjax|pjax ID 会显示在浏览器地址栏上|
|enabledPjax|布尔|true|是否启用pjax功能|
|pageHrefPre|字符串|window.location.href.replace(window.location.search,"")|`P.Index`链接地址的前缀|
|writeData(data,currentPage)|回调函数|默认做了什么,请看原码|写入数据,data为服务响应的数据,currentPate当前页,注意,此方法的上下文对象为opts|
|initPage(currentPage)|回调函数|默认做了什么,请看原码|从服务器获得数据的方式,然后执行写入数据,上下文对象为opts|
|triggerEvent(ts,evt)|回调函数|默认做了什么,请看原码|触发`P.Index`的事件要做的事情. 注意:该方法的上下文对象是opts,ts:表示事件触发源的对象;evt:表示事件对象|
|pageIndex(numberShowCount,currentPage,totalpage)|回调函数|默认做了什么,请看原码|计算开始页和结束页.参数说明:numberShowCount:(必选项)页面中要显示的页面个数;currentPage:(必选项)当前页;totalpage:(必选项)总页面数 返回格式: {"startpage" : startpage,"endpage":endpage}|
|queryParam(href,name)|回调函数|默认做了什么,请看原码|从一个参数地址中查询出一个参数的值.举例: 从a=1&b=2&c=3查出c的值. 写法:queryParam("a=1&b=2&c=3","c") 得出3.参数说明:href:(必选项)url地址;name:(必选项)参数的名称.返回: 参数值,如果没有找到返回""|


文档待续...  ...





  













