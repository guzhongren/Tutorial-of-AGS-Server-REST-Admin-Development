$(function () {
    $('#login').on('click', function () {
        var logContetn = '';
        logContetn += '<div class="form-group">';
        logContetn += '<label for="userName">用户名</label>';
        logContetn += '<input type="text" name="userName" id="userName" class="form-control" required placeholder="请输入用户名..."></input>';
        logContetn += '</div>';
        logContetn += '<div class="form-group">';
        logContetn += '<label for="password">密码</label>';
        logContetn += '<input type="password" name="password" id="password" class="form-control" required placeholder="请输入密码..."></input>';
        logContetn += '</div>';
        displayModal('用户登录', logContetn, '取消', '确定');
        $('#okText').on('click', function () {
            login();
            $('#myModal').modal('hide');
        });
    });
})

/**
*实现登录操作
*public
*/
function login() {
    var params = {
        username: $('#userName').val().trim() || 'arcgis',
        password: $('#password').val().trim() || '123456Aa?',
        client: "referer",
        referer: window.location.protocol + "//" + window.location.host + "/",  // window.location.origin, ///$(location).attr('href'),
        ip: "",
        expiration: 240,
        f: "pjson"
    };
    var url = configContent.server.security.generateToken
    ajaxUtil4Post(url, params, function (data) {
        // console.log(data);
        if (data.token != '' || data.token != "undefind" || data.token != null) {
            //   $('#login').text('登出');
            //   $('#addUser').css('display', 'block');
            $("#loginLi").css("display", "none");
            $("#personalInfo").css("display", "");
            $("#servicesListLi").css("display", "");
        } else {
            return;
        }
        setToken(2, data);
    });
}
