
var http = 'http://';
var https = 'https://';
var hostName = "localhost";//'192.168.33.44:6080';//部署到自己机器上的时候换成自己的电脑的hostname
var adminRootUrl = http + hostName + '/arcgis/admin';
var restRootUrl = http + hostName + "/arcgis/rest";
let serviceRootUrl = adminRootUrl + "/services/";
var proxyUrl = './proxy/proxy.ashx?';

var configContent = {
  proxyUrl: proxyUrl,
  server: {
    restRootUrl: restRootUrl,
    adminRootUrl: adminRootUrl,
    serviceRootUrl: serviceRootUrl,
    security: {
      generateToken: adminRootUrl + '/generateToken'
    },
    info: restRootUrl + "/inof",
    service: {
      servicesfoldersList: restRootUrl,
      thumbnailUrl: "/iteminfo/thumbnail/thumbnail.png?token=",
      report: serviceRootUrl + "report", // http://localhost/arcgis/admin/services/report
      start: serviceRootUrl
    }
  }
}
