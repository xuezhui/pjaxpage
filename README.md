## 1. Quick Start
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

## 2. JS Reference
```html 
<script src="pjaxPage.js"></script>
<script src="pjaxPage.numberModel.js"></script>
```

### 3. JS Setup
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

## 4. Example
[http://xixifeng.com.oschina.io/pjaxpage/example/](http://xixifeng.com.oschina.io/pjaxpage/example/) 




