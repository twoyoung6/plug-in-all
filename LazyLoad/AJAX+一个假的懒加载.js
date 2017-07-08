/*
 * @Author: twoyoung
 * @Date:   2017-07-05
 * 
 */

'use strict';
$(function () {
    var i = 0;
    var data1 = {};
    var resultLength = 0;
    var height;
    // 页面初始化
    $.ajax({
        url: "http://127.0.0.1:3000/api/getinlanddiscount",
        success: function (data) {
            data1 = data;
            var newdata = {
                "result": []
            },
                resultLength = data.result.length;
            // 这里其实一次性把所有的20条数据都请求回来了，后端接口对数据未做分页处理
            // 但是我们只取出前4条数据，存入一个新定义的数组 newdata，作为页面初始化数据
            // 在真正的开发中应该 是在这里和后端约定，一次性只返回4条或者你需要的数据
            for (i = 0; i < 4; i++) {
                newdata.result.push(data.result[i])
            }
            var html = template("discountProductTmp", newdata);
            $('.inland-discount-list').html(html);
        }
    });


    //监听滚动条是否滚动到底部（监听内容是否进入可视区域）？
    // $(window).scrollTop() >= $(document.body).height() - $(window).height()
    // $(document.body).offset().top < $(window).scrollTop() + $(window).height()
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document.body).height() - $(window).height()) {
            if (i <= resultLength) {
                var newdata = {
                    "result": []
                };
                for (var j = i; j < i + 4; j++) {
                    newdata.result.push(data1.result[j])
                }
                var html = template("discountProductTmp", newdata);
                $('.inland-discount-list').append(html);

                // 当加载完了新的数据之后，应该要改变i的值，保证下次加载的是新数据
                i = j;
            }

        }

    })
})
