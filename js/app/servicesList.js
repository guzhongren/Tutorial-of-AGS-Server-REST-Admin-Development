$(() => {
    $("#servicesList").on("click", () => {
        let token = getToken("token");
        let params = {
            f: "json",
            token: token
        };
        ajaxUtil4Get(configContent.server.service.servicesfoldersList, params, (resp) => {
            let folders = resp.folders;
            let services = resp.services;
            constructFoldersList(folders);
            let p = {
                f: "json",
                token: getToken("token")
            };
            ajaxUtil4Get(configContent.server.service.report, p, (resp) => {
                let reports = resp.reports;
                constructServicesList(reports);
            });

        });
    });

});


/**
 * 构建目录列表
 * 
 * @param {any} folders 
 */
function constructFoldersList(folders) {
    $("#serviceFolders").empty();
    let content = `<div class="list-group">`;
    for (let i = 0; i < folders.length; i++) {
        content += `<button type="button" value="${folders[i]}" class="list-group-item list-group-item-success">${folders[i]}</button>`
    }
    content += `</div>`
    $("#serviceFolders").append(content);
}
/**
 * 构建服务列表
 * 
 * @param {Array<Service>} services 服务数组
 */
function constructServicesList(services) {
    $("#serviceList").empty();

    let serviceContent = ``;
    for (let j = 0; j < services.length; j++) {
        let service = services[j];
        serviceContent += `<div class="panel panel-primary">`;
        // 图片显示需要manager token
        serviceContent += `<div class="panel-heading">${service.serviceName} <span id="${(service.folderName === "/" ? "" : service.folderName) + service.serviceName + "-" + service.type}" style="float: right;" class="serviceStatus glyphicon  ${service.status.realTimeState == "STARTED" ? "glyphicon-pause" : "glyphicon-play"}" aria-hidden="true" title="${service.status.realTimeState == "STARTED" ? "暂停" : "启动"}"></span></div>
                    <div class="panel-body">
                        <img src="${configContent.server.adminRootUrl + "/services/" + service.serviceName + "." + service.type + configContent.server.service.thumbnailUrl + getToken("token")}" />
                    </div>`
        serviceContent += `</div>`;
    }

    $("#serviceList").append(serviceContent);
    $(".serviceStatus").on("click", (evt) => {
        // service 信息构建
        let target = evt.target;
        let folderName = "", serviceName, serviceType, id = target.id;
        if (id.includes("/")) {
            let info = id.split("/");
            folderName = info[0];
            let serviceInfo = info[1].split("-");;
            serviceName = serviceInfo[0];
            serviceType = serviceInfo[1];
        } else {
            folderName = "";
            let serviceInfo = id.split("-");
            serviceName = serviceInfo[0];
            serviceType = serviceInfo[1];
        }
        let params = {
            f: "json",
            token: getToken("token")
        };
        if (target.className.includes("glyphicon-play")) {

            let url = configContent.server.service.start + folderName + (folderName == "" ? serviceName + "." + serviceType : "/" + serviceName + "." + serviceType) + "/start";
            ajaxUtil4Post(url, params, (res) => {
                if (res && res.status == "success") {
                    $("#" + id).removeClass("glyphicon-play").addClass("glyphicon-pause");
                }
            });


        } else {

            let stopUrl = configContent.server.service.start + folderName + (folderName == "" ? serviceName + "." + serviceType : "/" + serviceName + "." + serviceType) + "/stop";
            // let stopUrl = configContent.server.serviceRootUrl + target.id + "/stop";
            ajaxUtil4Post(stopUrl, params, (resp) => {
                if (resp && resp.status == "success") {
                    $("#" + target.id).removeClass("glyphicon-pause").addClass("glyphicon-play");
                }
            });
        }
    });
}

