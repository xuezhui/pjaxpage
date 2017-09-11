/*!
 * pjaxPage JavaScript Library v1.0
 * http://fastquery.org
 *
 * Author: xixifeng (fastquery@126.com)  
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 *
 * Date: 2017-05-18
 */
var pjaxPage = $.pjaxPage({
	
			// ajax 配置
			ajax : {
				url : "http://xixifeng.com/pjaxpage-data.php",
				dataType : "jsonp",
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

