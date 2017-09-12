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
	
			ajax : {
				url : "http://xixifeng.com/pjaxpage-data.php",
				dataType : "jsonp",
				async : false,
				cache : false,
				error : function() {
				}
			},
			pageModel: {
				name : "numberModel",
				opts : {}
			},
			enabledPjax : true,
			dataCache : true,
			writeListBefore : function() {

			},
			writeListAfter : function() {

			},
			notFoundTip : "<tr><td colspan=\"13\">暂无相关信息</td></tr>",
			getReqParam : function(currentPage) {
				var params = {
					page : currentPage,
					size : this.size
				};

				return $.param(params); // 分页查询参数
			},

			createDataHtml : function(data) { // 在此仅需拼接分页数据 然后return 即可
				var content = data.pageData.content;
				var total = content.length;
				if (total == 0)
					return "";

				var dataHtml = '';
				var sNo = (this.currentPage - 1) * this.size + 1; // 遍历开始序号
				for (var i = 0; i < total; i++, sNo++) {
					
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

