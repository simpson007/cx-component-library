import { get, post, put, del } from './http';
// 用户相关
export const getUserInfo = () => get('/api/v1/user/info');
export const getAccounts = () => get('/api/user/accounts');
export const bindPhone = (data) => post('/api/v1/user/phone/bind', data);
export const getPhoneCode = (params) => get('/api/v1/user/phone/bind/sms', params);
export const postUserIdentity = (data) => post('/api/v1/user/identity', data);
export const postUserApiKey = (data) => post('/api/v1/user/api_key', data);
export const getUserDevices = (params) => get('/api/v1/user/devices', params);
export const postUserDevice = (data) => post('/api/v1/user/device', data);
// Applab 相关
export const getApplab = (id) => get(`/api/v1/tank/applab/${id}`);
export const putApplab = (data, id) => put(`/api/v1/tank/applab/${id}`, data);
export const postApplab = (data) => post('/api/v1/tank/applab/', data);
// Script 相关
export const scriptLevel = (id) => get(`/api/tank/script_level/${id}`);
export const scriptData = (id) => get(`/api/tank/script/${id}`);
export const putScript = (scriptId, data) => put(`/api/admin/scriptLevel/${scriptId}`, data);
export const putScriptIdeal = (scriptId, data) => put(`/api/admin/scriptLevel/${scriptId}/ideal`, data);
export const putScriptSolution = (scriptId, data) => put(`/api/admin/scriptLevel/${scriptId}/solution`, data);
export const updateMapData = (data) => put(`/api/admin/scriptLevel/${data.scriptid}`, data);
// 知识库相关
export const getKnowledgeList = () => get('/api/v1/chatchat/knowledge_base/list_knowledge_bases');
export const postKnowledgeBase = (data) => post('/api/v1/chatchat/knowledge_base/create_knowledge_base', data);
export const getFilesList = (params) => get('/api/v1/chatchat/knowledge_base/list_files', params);
export const uploadDocs = (data) => post('/api/v1/chatchat/knowledge_base/upload_docs', data);
export const deleteDocs = (data) => post('/api/v1/chatchat/knowledge_base/delete_docs', data);
export const deleteKnowledgeBase = (data) => post('/api/v1/chatchat/knowledge_base/delete_knowledge_base', data);
export const updateKnowledgeBase = (data) => post('/api/v1/chatchat/knowledge_base/update_docs', data);
export const postBaseChat = (data) => post('/api/v1/chatchat/chat/knowledge_base_chat', data);
export const postUploadTempDocs = (data) => post('/api/v1/chatchat/knowledge_base/upload_temp_docs', data);
// GPT 相关
export const putCustomGpt = (data, id) => put(`/api/v1/tank/custom_gpt/${id}`, data);
export const postCustomGpt = (data) => post('/api/v1/tank/custom_gpt', data);
export const getGptCategoryList = (params) => get('/api/v1/tank/custom_gpt/category/list', params);
export const getCustomGptList = (params) => get('/api/v1/tank/custom_gpt/list', params);
export const getCustomGpt = (id) => get(`/api/v1/tank/custom_gpt/${id}`);
export const delCustomGpt = (id) => del(`/api/v1/tank/custom_gpt/${id}`);
export const postGptProduct = (data) => post('/api/v1/tank/custom_gpt/product', data);
export const deleteGptProduct = (id) => del(`/api/v1/tank/custom_gpt/product/${id}`);
export const postGptSubscribe = (id) => post(`/api/v1/tank/custom_gpt/${id}/subscribe`);
export const delGptSubscribe = (id) => del(`/api/v1/tank/custom_gpt/${id}/subscribe`);
export const getMyCustomGPTList = (params) => get('/api/v1/tank/custom_gpt/my', params);
// 会话相关
export const postSession = (data) => post('/api/v1/tank/session', data);
export const getSessionList = (params) => get('/api/v1/tank/session/list', params);
export const putSession = (data, id) => put(`/api/v1/tank/session/${id}`, data);
export const delSession = (id) => del(`/api/v1/tank/session/${id}`);
export const getMessageId = (id) => get(`/api/v1/tank/session/${id}`);
export const postMessage = (data) => post('/api/v1/tank/message', data);
export const putMessage = (data, id) => put(`/api/v1/tank/message/${id}`, data);
// 支付相关
export const getComboList = () => get('/api/v1/tank/combo/list');
export const getJsapiSign = (params) => get('/api/tank/wechat/jsapi/sign', params);
export const postWeChatPay = (data) => post('/api/tank/wechat', data);
export const postOrder = (data) => post('/api/tank/order', data);
export const getOrderId = (id, params) => get(`/api/v1/tank/order/${id}`, params);
export const getProductList = (params) => get('/api/v1/tank/product/list', params);
// 排行相关
export const getRanking = (params) => get('/api/v1/tank/hct/distribute', params);
export const getClassRanking = (params) => get('/api/v1/tank/hct/distribute/section', params);
// 设备相关
export const getAppointmentList = (deviceId) => get(`/api/v1/school/device/${deviceId}/reserve`);
export const getEquipmentList = (params) => get('/api/school/device/list', params);
export const addReserve = (id, data) => post(`/api/v1/school/device/${id}/reserve`, data);
export const cancelReserve = (deviceId, userId, time) => del(`/api/v1/school/device/${deviceId}/reserve/${userId}/${time}`);
export const getSchedules = (id, params) => get(`/api/v1/tank/device/${id}/schedules`, params);
export const getDeviceSensor = (id, params) => get(`/api/v1/tank/device/${id}/sensor`, params);
// AI 图像相关
export const txtToImage = (data) => post('/api/v1/sdapi/v1/txt2img', data);
export const imgToImage = (data) => post('/api/v1/sdapi/v1/img2img', data);
export const postAliWenX = (data, id) => post(`/api/v1/wanx/v1?gpt_id=${id}`, data);
export const getAliWenX = (params) => get('/api/v1/wanx/v1', params);
export const postWankImg = (data) => post('/api/v1/wanx/v1', data);
export const getWankImg = (params) => get('/api/v1/wanx/v1', params);
// 音乐生成相关
export const postGenerativeMusic = (data) => post('https://music.istemedu.com/api/v1/gateway/generate/music', data);
export const postGenerativeMusic2 = (data) => post('/api/v2/suno/audios', data);
export const postGenerativeMusic3 = (data) => post('/api/v1/udio/generate-proxy', data);
export const postGenerativeMusic4 = (data) => post('/api/v1/suno/gateway/generate/music', data);
export const getGenerativeMusic = (params) => get('https://music.istemedu.com/api/v1/gateway/query', params);
export const getGenerativeMusic2 = (data) => post('/api/v2/suno/tasks', data);
export const getGenerativeMusic3 = (params) => get('/api/v1/udio/songs', params);
export const getGenerativeMusic4 = (params) => get('/api/v1/suno/gateway/query', params);
// 翻译
export const textTranslation = (params) => get('/api/translate', params);
// 微信相关
export const wechatLogin = (params) => get('/api/wechat/officialAccount/login', params);
export const signature = (data) => post('/api/wechat/officialAccount/signature', data);
// 学校相关
export const getSchoolList = (params) => get('/api/v1/school/info/list', params);
export const getPublicity = (id) => get(`/api/v1/tank/publicity/${id}`);
export const getPublicityList = (params) => get('/api/v1/tank/publicity/list', params);
// 统计
export const getStatistic = (params) => get('/api/tank/statistic', params);
// 天气
export const getWeather = (params) => get('/api/v1/weather', params);
// 考试相关
export const captcha = (params) => get('/api/v1/tank/captcha', params);
export const postExamLogin = (data) => post('/api/v1/exam/login', data);
export const postExamAbnormalLogin = (data) => post('/api/v1/exam/login/valid/code', data);
export const getExams = (params) => get('/api/v1/exams', params);
export const getExam = (params) => get('/api/v1/exam', params);
export const getExamSn = (id, params) => get(`/api/v1/exam/${id}`, params);
export const getExamUserInfo = (params) => get('/api/v1/exam/user/info', params);
export const getExamScriptMine = (params) => get('/api/v1/tank/script/mine', params);
export const getExamList = (params) => get('/api/v1/school/exam/list', params);
export const getExamDetail = (sectionId) => get(`/api/v1/school/exam/${sectionId}`);
export const delExamStudent = (examId, studentId, data) => del(`/api/v1/school/exam/${examId}/student/${studentId}`, data);
export const getExamProctorsList = (params) => get('/api/v1/school/exam/proctors', params);
export const getExamRatersList = (params) => get('/api/v1/school/exam/raters', params);
export const getUserLevelList = (params) => get('/api/v1/school/userLevel/list', params);
export const postExamArrival = (examId, studentId, data) => post(`/api/v1/school/exam/${examId}/student/arrival/${studentId}`, data);
export const delExamArrival = (examId, studentId, data) => del(`/api/v1/school/exam/${examId}/student/arrival/${studentId}`, data);
export const editAnswer = (data, id) => post(`/api/v1/exam/script_level/${id}/answer`, data);
// 云存储
export const getTankCloudStorage = (params) => get('/api/v1/tank/cloud_storage', params);
export const postTankCloudStorage = (data) => post('/api/v1/tank/cloud_storage', data);
// Applab GPT
export const postApplabCustom = (id, data) => post(`/api/v1/school/applab/${id}/custom_gpt`, data);
// 工具
export const getChatTools = (params) => get('/api/v1/chatchat/tools', params);
// 签到
export const postSectionSign = (data) => post('/api/v1/school/sectionSign', data);
export const putSectionSign = (id, data) => put(`/api/v1/school/sectionSign/${id}`, data);
export const postToolVisited = (data) => post('/api/v1/universal/tool/sms/visited', data);
// 薄弱项
export const getWeak = (params) => get('/api/v1/tank/user_level/weak', params);
// 语音合成
export const postAliyunSpeech = (data) => post('/api/v1/aliyun/text/speech_synthesis', data);
// 知识点
export const getKnowledgeId = (params) => get('/api/v1/tank/knowledge/list', params);
// 学校信息（无需 token）
export const getSchoolInfo = () => get('/api/v1/school/info');
//# sourceMappingURL=endpoints.js.map