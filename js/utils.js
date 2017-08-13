/**
 * 存储token
 * @param expires :过期时间  按天计算
 */
function setToken(expires, data) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expires);
    document.cookie = "token=" + escape(data.token) + ";expires=" + exdate.toGMTString();
}
/**
*获取token
*@public
*@param cookiesName {string} 默认 token
*@return {token}  Object
*/
function getToken(cookiesName) {
    var cookies = document.cookie;
    // for (var i = 0; i < cookies.length; i++) {
        var nameToken = cookies.split(';')[0];
        var name = nameToken.split('=')[0];
        if (name == cookiesName) {
            return nameToken.split('=')[1];
        }
        nameToken = null;
        name = null;
    // }
    cookies = null;
}
/**
*处理ajax POST请求
*@ public
*@url : string 要处理的请求,
*@param：object 处理请求所用的参数,
*@callback: function 请求完成或者失败后的处理函数
*/
function ajaxUtil4Post(url, param, callback) {
    $.ajax({
        type: 'POST',
        url: url,//configContent.proxyUrl + 
        data: param,
        cache: true,
        async: true,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        timeout: 10000,
        success: function (data, status, xhr) {
            if (data.error_code) {
                if (data.error_code.indexOf('401') >= 0)
                    return;
            }
            if (callback) callback(data);
        },
        error: function (xhr, error, exception) {
            if (callback) callback(null);
        }
    });
}

function ajaxUtil4Get(url, query, callback) {
    var _self = this;
    try {
        $.ajax({
            url: url, //configContent.proxyUrl + 
            data: query,
            dataType: "json",
            timeout: 30000,
            success: function (data, status, xhr) {
                if (data.error_code) {
                    if (data.error_code.indexOf('401') >= 0)
                        return; // gotologin
                }
                if (callback) callback(data);
            },
            error: function (xhr, error, exception) {
                if (callback) callback(null);
            }
        });
    } catch (e) { //Here should be delaying with error
        if (callback) callback(null);
    }
}

/**
*构造弹出框
*public
*@title: string 弹出框的标题
*@content string HTML内容，用于填充弹出框的显示内容
*@cancleText: string 弹出框的取消按钮的显示内容
*@okText: string 弹出框的确定按钮的显示内容
*/
function displayModal(title, content, cancleText, okText) {
    if ($('#myModal').length > 0) {
        $('#myModal').remove();
        displayModal(title, content, cancleText, okText);
    } else {
        var modalHTML = '';
        modalHTML += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        modalHTML += '<div class="modal-dialog">';
        modalHTML += '<div class="modal-content">';
        modalHTML += '<div class="modal-header">';
        modalHTML += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        modalHTML += '<h4 class="modal-title" id="myModalLabel">' + title + '</h4>';
        modalHTML += '</div>';
        modalHTML += '<div class="modal-body">';
        modalHTML += content;
        modalHTML += '</div>';
        modalHTML += '<div class="modal-footer"><button type="button" id="cancleText" class="btn btn-default"data-dismiss="modal">' + cancleText + '</button><button type="submit" id="okText" class="btn btn-primary">' + okText + '</button></div>'
        modalHTML += '</div>';
        modalHTML += '</div>';
        modalHTML += '</div>';
        $('body').append(modalHTML);
        $('#myModal').modal('show');
    }
    $('#okText').unbind();
}