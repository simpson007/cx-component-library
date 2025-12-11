"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductList = exports.getOrderId = exports.postOrder = exports.postWeChatPay = exports.getJsapiSign = exports.getComboList = exports.putMessage = exports.postMessage = exports.getMessageId = exports.delSession = exports.putSession = exports.getSessionList = exports.postSession = exports.getMyCustomGPTList = exports.delGptSubscribe = exports.postGptSubscribe = exports.deleteGptProduct = exports.postGptProduct = exports.delCustomGpt = exports.getCustomGpt = exports.getCustomGptList = exports.getGptCategoryList = exports.postCustomGpt = exports.putCustomGpt = exports.postUploadTempDocs = exports.postBaseChat = exports.updateKnowledgeBase = exports.deleteKnowledgeBase = exports.deleteDocs = exports.uploadDocs = exports.getFilesList = exports.postKnowledgeBase = exports.getKnowledgeList = exports.updateMapData = exports.putScriptSolution = exports.putScriptIdeal = exports.putScript = exports.scriptData = exports.scriptLevel = exports.postApplab = exports.putApplab = exports.getApplab = exports.postUserDevice = exports.getUserDevices = exports.postUserApiKey = exports.postUserIdentity = exports.getPhoneCode = exports.bindPhone = exports.getAccounts = exports.getUserInfo = void 0;
exports.postApplabCustom = exports.postTankCloudStorage = exports.getTankCloudStorage = exports.editAnswer = exports.delExamArrival = exports.postExamArrival = exports.getUserLevelList = exports.getExamRatersList = exports.getExamProctorsList = exports.delExamStudent = exports.getExamDetail = exports.getExamList = exports.getExamScriptMine = exports.getExamUserInfo = exports.getExamSn = exports.getExam = exports.getExams = exports.postExamAbnormalLogin = exports.postExamLogin = exports.captcha = exports.getWeather = exports.getStatistic = exports.getPublicityList = exports.getPublicity = exports.getSchoolList = exports.signature = exports.wechatLogin = exports.textTranslation = exports.getGenerativeMusic4 = exports.getGenerativeMusic3 = exports.getGenerativeMusic2 = exports.getGenerativeMusic = exports.postGenerativeMusic4 = exports.postGenerativeMusic3 = exports.postGenerativeMusic2 = exports.postGenerativeMusic = exports.getWankImg = exports.postWankImg = exports.getAliWenX = exports.postAliWenX = exports.imgToImage = exports.txtToImage = exports.getDeviceSensor = exports.getSchedules = exports.cancelReserve = exports.addReserve = exports.getEquipmentList = exports.getAppointmentList = exports.getClassRanking = exports.getRanking = void 0;
exports.getSchoolInfo = exports.getKnowledgeId = exports.postAliyunSpeech = exports.getWeak = exports.postToolVisited = exports.putSectionSign = exports.postSectionSign = exports.getChatTools = void 0;
const http_1 = require("./http");
// 用户相关
const getUserInfo = () => (0, http_1.get)('/api/v1/user/info');
exports.getUserInfo = getUserInfo;
const getAccounts = () => (0, http_1.get)('/api/user/accounts');
exports.getAccounts = getAccounts;
const bindPhone = (data) => (0, http_1.post)('/api/v1/user/phone/bind', data);
exports.bindPhone = bindPhone;
const getPhoneCode = (params) => (0, http_1.get)('/api/v1/user/phone/bind/sms', params);
exports.getPhoneCode = getPhoneCode;
const postUserIdentity = (data) => (0, http_1.post)('/api/v1/user/identity', data);
exports.postUserIdentity = postUserIdentity;
const postUserApiKey = (data) => (0, http_1.post)('/api/v1/user/api_key', data);
exports.postUserApiKey = postUserApiKey;
const getUserDevices = (params) => (0, http_1.get)('/api/v1/user/devices', params);
exports.getUserDevices = getUserDevices;
const postUserDevice = (data) => (0, http_1.post)('/api/v1/user/device', data);
exports.postUserDevice = postUserDevice;
// Applab 相关
const getApplab = (id) => (0, http_1.get)(`/api/v1/tank/applab/${id}`);
exports.getApplab = getApplab;
const putApplab = (data, id) => (0, http_1.put)(`/api/v1/tank/applab/${id}`, data);
exports.putApplab = putApplab;
const postApplab = (data) => (0, http_1.post)('/api/v1/tank/applab/', data);
exports.postApplab = postApplab;
// Script 相关
const scriptLevel = (id) => (0, http_1.get)(`/api/tank/script_level/${id}`);
exports.scriptLevel = scriptLevel;
const scriptData = (id) => (0, http_1.get)(`/api/tank/script/${id}`);
exports.scriptData = scriptData;
const putScript = (scriptId, data) => (0, http_1.put)(`/api/admin/scriptLevel/${scriptId}`, data);
exports.putScript = putScript;
const putScriptIdeal = (scriptId, data) => (0, http_1.put)(`/api/admin/scriptLevel/${scriptId}/ideal`, data);
exports.putScriptIdeal = putScriptIdeal;
const putScriptSolution = (scriptId, data) => (0, http_1.put)(`/api/admin/scriptLevel/${scriptId}/solution`, data);
exports.putScriptSolution = putScriptSolution;
const updateMapData = (data) => (0, http_1.put)(`/api/admin/scriptLevel/${data.scriptid}`, data);
exports.updateMapData = updateMapData;
// 知识库相关
const getKnowledgeList = () => (0, http_1.get)('/api/v1/chatchat/knowledge_base/list_knowledge_bases');
exports.getKnowledgeList = getKnowledgeList;
const postKnowledgeBase = (data) => (0, http_1.post)('/api/v1/chatchat/knowledge_base/create_knowledge_base', data);
exports.postKnowledgeBase = postKnowledgeBase;
const getFilesList = (params) => (0, http_1.get)('/api/v1/chatchat/knowledge_base/list_files', params);
exports.getFilesList = getFilesList;
const uploadDocs = (data) => (0, http_1.post)('/api/v1/chatchat/knowledge_base/upload_docs', data);
exports.uploadDocs = uploadDocs;
const deleteDocs = (data) => (0, http_1.post)('/api/v1/chatchat/knowledge_base/delete_docs', data);
exports.deleteDocs = deleteDocs;
const deleteKnowledgeBase = (data) => (0, http_1.post)('/api/v1/chatchat/knowledge_base/delete_knowledge_base', data);
exports.deleteKnowledgeBase = deleteKnowledgeBase;
const updateKnowledgeBase = (data) => (0, http_1.post)('/api/v1/chatchat/knowledge_base/update_docs', data);
exports.updateKnowledgeBase = updateKnowledgeBase;
const postBaseChat = (data) => (0, http_1.post)('/api/v1/chatchat/chat/knowledge_base_chat', data);
exports.postBaseChat = postBaseChat;
const postUploadTempDocs = (data) => (0, http_1.post)('/api/v1/chatchat/knowledge_base/upload_temp_docs', data);
exports.postUploadTempDocs = postUploadTempDocs;
// GPT 相关
const putCustomGpt = (data, id) => (0, http_1.put)(`/api/v1/tank/custom_gpt/${id}`, data);
exports.putCustomGpt = putCustomGpt;
const postCustomGpt = (data) => (0, http_1.post)('/api/v1/tank/custom_gpt', data);
exports.postCustomGpt = postCustomGpt;
const getGptCategoryList = (params) => (0, http_1.get)('/api/v1/tank/custom_gpt/category/list', params);
exports.getGptCategoryList = getGptCategoryList;
const getCustomGptList = (params) => (0, http_1.get)('/api/v1/tank/custom_gpt/list', params);
exports.getCustomGptList = getCustomGptList;
const getCustomGpt = (id) => (0, http_1.get)(`/api/v1/tank/custom_gpt/${id}`);
exports.getCustomGpt = getCustomGpt;
const delCustomGpt = (id) => (0, http_1.del)(`/api/v1/tank/custom_gpt/${id}`);
exports.delCustomGpt = delCustomGpt;
const postGptProduct = (data) => (0, http_1.post)('/api/v1/tank/custom_gpt/product', data);
exports.postGptProduct = postGptProduct;
const deleteGptProduct = (id) => (0, http_1.del)(`/api/v1/tank/custom_gpt/product/${id}`);
exports.deleteGptProduct = deleteGptProduct;
const postGptSubscribe = (id) => (0, http_1.post)(`/api/v1/tank/custom_gpt/${id}/subscribe`);
exports.postGptSubscribe = postGptSubscribe;
const delGptSubscribe = (id) => (0, http_1.del)(`/api/v1/tank/custom_gpt/${id}/subscribe`);
exports.delGptSubscribe = delGptSubscribe;
const getMyCustomGPTList = (params) => (0, http_1.get)('/api/v1/tank/custom_gpt/my', params);
exports.getMyCustomGPTList = getMyCustomGPTList;
// 会话相关
const postSession = (data) => (0, http_1.post)('/api/v1/tank/session', data);
exports.postSession = postSession;
const getSessionList = (params) => (0, http_1.get)('/api/v1/tank/session/list', params);
exports.getSessionList = getSessionList;
const putSession = (data, id) => (0, http_1.put)(`/api/v1/tank/session/${id}`, data);
exports.putSession = putSession;
const delSession = (id) => (0, http_1.del)(`/api/v1/tank/session/${id}`);
exports.delSession = delSession;
const getMessageId = (id) => (0, http_1.get)(`/api/v1/tank/session/${id}`);
exports.getMessageId = getMessageId;
const postMessage = (data) => (0, http_1.post)('/api/v1/tank/message', data);
exports.postMessage = postMessage;
const putMessage = (data, id) => (0, http_1.put)(`/api/v1/tank/message/${id}`, data);
exports.putMessage = putMessage;
// 支付相关
const getComboList = () => (0, http_1.get)('/api/v1/tank/combo/list');
exports.getComboList = getComboList;
const getJsapiSign = (params) => (0, http_1.get)('/api/tank/wechat/jsapi/sign', params);
exports.getJsapiSign = getJsapiSign;
const postWeChatPay = (data) => (0, http_1.post)('/api/tank/wechat', data);
exports.postWeChatPay = postWeChatPay;
const postOrder = (data) => (0, http_1.post)('/api/tank/order', data);
exports.postOrder = postOrder;
const getOrderId = (id, params) => (0, http_1.get)(`/api/v1/tank/order/${id}`, params);
exports.getOrderId = getOrderId;
const getProductList = (params) => (0, http_1.get)('/api/v1/tank/product/list', params);
exports.getProductList = getProductList;
// 排行相关
const getRanking = (params) => (0, http_1.get)('/api/v1/tank/hct/distribute', params);
exports.getRanking = getRanking;
const getClassRanking = (params) => (0, http_1.get)('/api/v1/tank/hct/distribute/section', params);
exports.getClassRanking = getClassRanking;
// 设备相关
const getAppointmentList = (deviceId) => (0, http_1.get)(`/api/v1/school/device/${deviceId}/reserve`);
exports.getAppointmentList = getAppointmentList;
const getEquipmentList = (params) => (0, http_1.get)('/api/school/device/list', params);
exports.getEquipmentList = getEquipmentList;
const addReserve = (id, data) => (0, http_1.post)(`/api/v1/school/device/${id}/reserve`, data);
exports.addReserve = addReserve;
const cancelReserve = (deviceId, userId, time) => (0, http_1.del)(`/api/v1/school/device/${deviceId}/reserve/${userId}/${time}`);
exports.cancelReserve = cancelReserve;
const getSchedules = (id, params) => (0, http_1.get)(`/api/v1/tank/device/${id}/schedules`, params);
exports.getSchedules = getSchedules;
const getDeviceSensor = (id, params) => (0, http_1.get)(`/api/v1/tank/device/${id}/sensor`, params);
exports.getDeviceSensor = getDeviceSensor;
// AI 图像相关
const txtToImage = (data) => (0, http_1.post)('/api/v1/sdapi/v1/txt2img', data);
exports.txtToImage = txtToImage;
const imgToImage = (data) => (0, http_1.post)('/api/v1/sdapi/v1/img2img', data);
exports.imgToImage = imgToImage;
const postAliWenX = (data, id) => (0, http_1.post)(`/api/v1/wanx/v1?gpt_id=${id}`, data);
exports.postAliWenX = postAliWenX;
const getAliWenX = (params) => (0, http_1.get)('/api/v1/wanx/v1', params);
exports.getAliWenX = getAliWenX;
const postWankImg = (data) => (0, http_1.post)('/api/v1/wanx/v1', data);
exports.postWankImg = postWankImg;
const getWankImg = (params) => (0, http_1.get)('/api/v1/wanx/v1', params);
exports.getWankImg = getWankImg;
// 音乐生成相关
const postGenerativeMusic = (data) => (0, http_1.post)('https://music.istemedu.com/api/v1/gateway/generate/music', data);
exports.postGenerativeMusic = postGenerativeMusic;
const postGenerativeMusic2 = (data) => (0, http_1.post)('/api/v2/suno/audios', data);
exports.postGenerativeMusic2 = postGenerativeMusic2;
const postGenerativeMusic3 = (data) => (0, http_1.post)('/api/v1/udio/generate-proxy', data);
exports.postGenerativeMusic3 = postGenerativeMusic3;
const postGenerativeMusic4 = (data) => (0, http_1.post)('/api/v1/suno/gateway/generate/music', data);
exports.postGenerativeMusic4 = postGenerativeMusic4;
const getGenerativeMusic = (params) => (0, http_1.get)('https://music.istemedu.com/api/v1/gateway/query', params);
exports.getGenerativeMusic = getGenerativeMusic;
const getGenerativeMusic2 = (data) => (0, http_1.post)('/api/v2/suno/tasks', data);
exports.getGenerativeMusic2 = getGenerativeMusic2;
const getGenerativeMusic3 = (params) => (0, http_1.get)('/api/v1/udio/songs', params);
exports.getGenerativeMusic3 = getGenerativeMusic3;
const getGenerativeMusic4 = (params) => (0, http_1.get)('/api/v1/suno/gateway/query', params);
exports.getGenerativeMusic4 = getGenerativeMusic4;
// 翻译
const textTranslation = (params) => (0, http_1.get)('/api/translate', params);
exports.textTranslation = textTranslation;
// 微信相关
const wechatLogin = (params) => (0, http_1.get)('/api/wechat/officialAccount/login', params);
exports.wechatLogin = wechatLogin;
const signature = (data) => (0, http_1.post)('/api/wechat/officialAccount/signature', data);
exports.signature = signature;
// 学校相关
const getSchoolList = (params) => (0, http_1.get)('/api/v1/school/info/list', params);
exports.getSchoolList = getSchoolList;
const getPublicity = (id) => (0, http_1.get)(`/api/v1/tank/publicity/${id}`);
exports.getPublicity = getPublicity;
const getPublicityList = (params) => (0, http_1.get)('/api/v1/tank/publicity/list', params);
exports.getPublicityList = getPublicityList;
// 统计
const getStatistic = (params) => (0, http_1.get)('/api/tank/statistic', params);
exports.getStatistic = getStatistic;
// 天气
const getWeather = (params) => (0, http_1.get)('/api/v1/weather', params);
exports.getWeather = getWeather;
// 考试相关
const captcha = (params) => (0, http_1.get)('/api/v1/tank/captcha', params);
exports.captcha = captcha;
const postExamLogin = (data) => (0, http_1.post)('/api/v1/exam/login', data);
exports.postExamLogin = postExamLogin;
const postExamAbnormalLogin = (data) => (0, http_1.post)('/api/v1/exam/login/valid/code', data);
exports.postExamAbnormalLogin = postExamAbnormalLogin;
const getExams = (params) => (0, http_1.get)('/api/v1/exams', params);
exports.getExams = getExams;
const getExam = (params) => (0, http_1.get)('/api/v1/exam', params);
exports.getExam = getExam;
const getExamSn = (id, params) => (0, http_1.get)(`/api/v1/exam/${id}`, params);
exports.getExamSn = getExamSn;
const getExamUserInfo = (params) => (0, http_1.get)('/api/v1/exam/user/info', params);
exports.getExamUserInfo = getExamUserInfo;
const getExamScriptMine = (params) => (0, http_1.get)('/api/v1/tank/script/mine', params);
exports.getExamScriptMine = getExamScriptMine;
const getExamList = (params) => (0, http_1.get)('/api/v1/school/exam/list', params);
exports.getExamList = getExamList;
const getExamDetail = (sectionId) => (0, http_1.get)(`/api/v1/school/exam/${sectionId}`);
exports.getExamDetail = getExamDetail;
const delExamStudent = (examId, studentId, data) => (0, http_1.del)(`/api/v1/school/exam/${examId}/student/${studentId}`, data);
exports.delExamStudent = delExamStudent;
const getExamProctorsList = (params) => (0, http_1.get)('/api/v1/school/exam/proctors', params);
exports.getExamProctorsList = getExamProctorsList;
const getExamRatersList = (params) => (0, http_1.get)('/api/v1/school/exam/raters', params);
exports.getExamRatersList = getExamRatersList;
const getUserLevelList = (params) => (0, http_1.get)('/api/v1/school/userLevel/list', params);
exports.getUserLevelList = getUserLevelList;
const postExamArrival = (examId, studentId, data) => (0, http_1.post)(`/api/v1/school/exam/${examId}/student/arrival/${studentId}`, data);
exports.postExamArrival = postExamArrival;
const delExamArrival = (examId, studentId, data) => (0, http_1.del)(`/api/v1/school/exam/${examId}/student/arrival/${studentId}`, data);
exports.delExamArrival = delExamArrival;
const editAnswer = (data, id) => (0, http_1.post)(`/api/v1/exam/script_level/${id}/answer`, data);
exports.editAnswer = editAnswer;
// 云存储
const getTankCloudStorage = (params) => (0, http_1.get)('/api/v1/tank/cloud_storage', params);
exports.getTankCloudStorage = getTankCloudStorage;
const postTankCloudStorage = (data) => (0, http_1.post)('/api/v1/tank/cloud_storage', data);
exports.postTankCloudStorage = postTankCloudStorage;
// Applab GPT
const postApplabCustom = (id, data) => (0, http_1.post)(`/api/v1/school/applab/${id}/custom_gpt`, data);
exports.postApplabCustom = postApplabCustom;
// 工具
const getChatTools = (params) => (0, http_1.get)('/api/v1/chatchat/tools', params);
exports.getChatTools = getChatTools;
// 签到
const postSectionSign = (data) => (0, http_1.post)('/api/v1/school/sectionSign', data);
exports.postSectionSign = postSectionSign;
const putSectionSign = (id, data) => (0, http_1.put)(`/api/v1/school/sectionSign/${id}`, data);
exports.putSectionSign = putSectionSign;
const postToolVisited = (data) => (0, http_1.post)('/api/v1/universal/tool/sms/visited', data);
exports.postToolVisited = postToolVisited;
// 薄弱项
const getWeak = (params) => (0, http_1.get)('/api/v1/tank/user_level/weak', params);
exports.getWeak = getWeak;
// 语音合成
const postAliyunSpeech = (data) => (0, http_1.post)('/api/v1/aliyun/text/speech_synthesis', data);
exports.postAliyunSpeech = postAliyunSpeech;
// 知识点
const getKnowledgeId = (params) => (0, http_1.get)('/api/v1/tank/knowledge/list', params);
exports.getKnowledgeId = getKnowledgeId;
// 学校信息（无需 token）
const getSchoolInfo = () => (0, http_1.get)('/api/v1/school/info');
exports.getSchoolInfo = getSchoolInfo;
//# sourceMappingURL=endpoints.js.map