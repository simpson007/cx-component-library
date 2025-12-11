import { get, post, put, del } from './http'

// 用户相关
export const getUserInfo = () => get('/api/v1/user/info')
export const getAccounts = () => get('/api/user/accounts')
export const bindPhone = (data: unknown) => post('/api/v1/user/phone/bind', data)
export const getPhoneCode = (params: unknown) => get('/api/v1/user/phone/bind/sms', params as Record<string, unknown>)
export const postUserIdentity = (data: unknown) => post('/api/v1/user/identity', data)
export const postUserApiKey = (data: unknown) => post('/api/v1/user/api_key', data)
export const getUserDevices = (params?: unknown) => get('/api/v1/user/devices', params as Record<string, unknown>)
export const postUserDevice = (data: unknown) => post('/api/v1/user/device', data)

// Applab 相关
export const getApplab = (id: string | number) => get(`/api/v1/tank/applab/${id}`)
export const putApplab = (data: unknown, id: string | number) => put(`/api/v1/tank/applab/${id}`, data)
export const postApplab = (data: unknown) => post('/api/v1/tank/applab/', data)

// Script 相关
export const scriptLevel = (id: string | number) => get(`/api/tank/script_level/${id}`)
export const scriptData = (id: string | number) => get(`/api/tank/script/${id}`)
export const putScript = (scriptId: string | number, data: unknown) => put(`/api/admin/scriptLevel/${scriptId}`, data)
export const putScriptIdeal = (scriptId: string | number, data: unknown) => put(`/api/admin/scriptLevel/${scriptId}/ideal`, data)
export const putScriptSolution = (scriptId: string | number, data: unknown) => put(`/api/admin/scriptLevel/${scriptId}/solution`, data)
export const updateMapData = (data: { scriptid: string | number }) => put(`/api/admin/scriptLevel/${data.scriptid}`, data)

// 知识库相关
export const getKnowledgeList = () => get('/api/v1/chatchat/knowledge_base/list_knowledge_bases')
export const postKnowledgeBase = (data: unknown) => post('/api/v1/chatchat/knowledge_base/create_knowledge_base', data)
export const getFilesList = (params: unknown) => get('/api/v1/chatchat/knowledge_base/list_files', params as Record<string, unknown>)
export const uploadDocs = (data: unknown) => post('/api/v1/chatchat/knowledge_base/upload_docs', data)
export const deleteDocs = (data: unknown) => post('/api/v1/chatchat/knowledge_base/delete_docs', data)
export const deleteKnowledgeBase = (data: unknown) => post('/api/v1/chatchat/knowledge_base/delete_knowledge_base', data)
export const updateKnowledgeBase = (data: unknown) => post('/api/v1/chatchat/knowledge_base/update_docs', data)
export const postBaseChat = (data: unknown) => post('/api/v1/chatchat/chat/knowledge_base_chat', data)
export const postUploadTempDocs = (data: unknown) => post('/api/v1/chatchat/knowledge_base/upload_temp_docs', data)

// GPT 相关
export const putCustomGpt = (data: unknown, id: string | number) => put(`/api/v1/tank/custom_gpt/${id}`, data)
export const postCustomGpt = (data: unknown) => post('/api/v1/tank/custom_gpt', data)
export const getGptCategoryList = (params?: unknown) => get('/api/v1/tank/custom_gpt/category/list', params as Record<string, unknown>)
export const getCustomGptList = (params?: unknown) => get('/api/v1/tank/custom_gpt/list', params as Record<string, unknown>)
export const getCustomGpt = (id: string | number) => get(`/api/v1/tank/custom_gpt/${id}`)
export const delCustomGpt = (id: string | number) => del(`/api/v1/tank/custom_gpt/${id}`)
export const postGptProduct = (data: unknown) => post('/api/v1/tank/custom_gpt/product', data)
export const deleteGptProduct = (id: string | number) => del(`/api/v1/tank/custom_gpt/product/${id}`)
export const postGptSubscribe = (id: string | number) => post(`/api/v1/tank/custom_gpt/${id}/subscribe`)
export const delGptSubscribe = (id: string | number) => del(`/api/v1/tank/custom_gpt/${id}/subscribe`)
export const getMyCustomGPTList = (params?: unknown) => get('/api/v1/tank/custom_gpt/my', params as Record<string, unknown>)

// 会话相关
export const postSession = (data: unknown) => post('/api/v1/tank/session', data)
export const getSessionList = (params?: unknown) => get('/api/v1/tank/session/list', params as Record<string, unknown>)
export const putSession = (data: unknown, id: string | number) => put(`/api/v1/tank/session/${id}`, data)
export const delSession = (id: string | number) => del(`/api/v1/tank/session/${id}`)
export const getMessageId = (id: string | number) => get(`/api/v1/tank/session/${id}`)
export const postMessage = (data: unknown) => post('/api/v1/tank/message', data)
export const putMessage = (data: unknown, id: string | number) => put(`/api/v1/tank/message/${id}`, data)

// 支付相关
export const getComboList = () => get('/api/v1/tank/combo/list')
export const getJsapiSign = (params: unknown) => get('/api/tank/wechat/jsapi/sign', params as Record<string, unknown>)
export const postWeChatPay = (data: unknown) => post('/api/tank/wechat', data)
export const postOrder = (data: unknown) => post('/api/tank/order', data)
export const getOrderId = (id: string | number, params?: unknown) => get(`/api/v1/tank/order/${id}`, params as Record<string, unknown>)
export const getProductList = (params?: unknown) => get('/api/v1/tank/product/list', params as Record<string, unknown>)

// 排行相关
export const getRanking = (params: unknown) => get('/api/v1/tank/hct/distribute', params as Record<string, unknown>)
export const getClassRanking = (params: unknown) => get('/api/v1/tank/hct/distribute/section', params as Record<string, unknown>)

// 设备相关
export const getAppointmentList = (deviceId: string | number) => get(`/api/v1/school/device/${deviceId}/reserve`)
export const getEquipmentList = (params?: unknown) => get('/api/school/device/list', params as Record<string, unknown>)
export const addReserve = (id: string | number, data: unknown) => post(`/api/v1/school/device/${id}/reserve`, data)
export const cancelReserve = (deviceId: string | number, userId: string | number, time: string) => 
  del(`/api/v1/school/device/${deviceId}/reserve/${userId}/${time}`)
export const getSchedules = (id: string | number, params?: unknown) => get(`/api/v1/tank/device/${id}/schedules`, params as Record<string, unknown>)
export const getDeviceSensor = (id: string | number, params?: unknown) => get(`/api/v1/tank/device/${id}/sensor`, params as Record<string, unknown>)

// AI 图像相关
export const txtToImage = (data: unknown) => post('/api/v1/sdapi/v1/txt2img', data)
export const imgToImage = (data: unknown) => post('/api/v1/sdapi/v1/img2img', data)
export const postAliWenX = (data: unknown, id: string | number) => post(`/api/v1/wanx/v1?gpt_id=${id}`, data)
export const getAliWenX = (params: unknown) => get('/api/v1/wanx/v1', params as Record<string, unknown>)
export const postWankImg = (data: unknown) => post('/api/v1/wanx/v1', data)
export const getWankImg = (params: unknown) => get('/api/v1/wanx/v1', params as Record<string, unknown>)

// 音乐生成相关
export const postGenerativeMusic = (data: unknown) => post('https://music.istemedu.com/api/v1/gateway/generate/music', data)
export const postGenerativeMusic2 = (data: unknown) => post('/api/v2/suno/audios', data)
export const postGenerativeMusic3 = (data: unknown) => post('/api/v1/udio/generate-proxy', data)
export const postGenerativeMusic4 = (data: unknown) => post('/api/v1/suno/gateway/generate/music', data)
export const getGenerativeMusic = (params: unknown) => get('https://music.istemedu.com/api/v1/gateway/query', params as Record<string, unknown>)
export const getGenerativeMusic2 = (data: unknown) => post('/api/v2/suno/tasks', data)
export const getGenerativeMusic3 = (params: unknown) => get('/api/v1/udio/songs', params as Record<string, unknown>)
export const getGenerativeMusic4 = (params: unknown) => get('/api/v1/suno/gateway/query', params as Record<string, unknown>)

// 翻译
export const textTranslation = (params: unknown) => get('/api/translate', params as Record<string, unknown>)

// 微信相关
export const wechatLogin = (params: unknown) => get('/api/wechat/officialAccount/login', params as Record<string, unknown>)
export const signature = (data: unknown) => post('/api/wechat/officialAccount/signature', data)

// 学校相关
export const getSchoolList = (params?: unknown) => get('/api/v1/school/info/list', params as Record<string, unknown>)
export const getPublicity = (id: string | number) => get(`/api/v1/tank/publicity/${id}`)
export const getPublicityList = (params?: unknown) => get('/api/v1/tank/publicity/list', params as Record<string, unknown>)

// 统计
export const getStatistic = (params?: unknown) => get('/api/tank/statistic', params as Record<string, unknown>)

// 天气
export const getWeather = (params: unknown) => get('/api/v1/weather', params as Record<string, unknown>)

// 考试相关
export const captcha = (params: unknown) => get('/api/v1/tank/captcha', params as Record<string, unknown>)
export const postExamLogin = (data: unknown) => post('/api/v1/exam/login', data)
export const postExamAbnormalLogin = (data: unknown) => post('/api/v1/exam/login/valid/code', data)
export const getExams = (params?: unknown) => get('/api/v1/exams', params as Record<string, unknown>)
export const getExam = (params?: unknown) => get('/api/v1/exam', params as Record<string, unknown>)
export const getExamSn = (id: string | number, params?: unknown) => get(`/api/v1/exam/${id}`, params as Record<string, unknown>)
export const getExamUserInfo = (params?: unknown) => get('/api/v1/exam/user/info', params as Record<string, unknown>)
export const getExamScriptMine = (params?: unknown) => get('/api/v1/tank/script/mine', params as Record<string, unknown>)
export const getExamList = (params?: unknown) => get('/api/v1/school/exam/list', params as Record<string, unknown>)
export const getExamDetail = (sectionId: string | number) => get(`/api/v1/school/exam/${sectionId}`)
export const delExamStudent = (examId: string | number, studentId: string | number, data?: unknown) => 
  del(`/api/v1/school/exam/${examId}/student/${studentId}`, data)
export const getExamProctorsList = (params?: unknown) => get('/api/v1/school/exam/proctors', params as Record<string, unknown>)
export const getExamRatersList = (params?: unknown) => get('/api/v1/school/exam/raters', params as Record<string, unknown>)
export const getUserLevelList = (params?: unknown) => get('/api/v1/school/userLevel/list', params as Record<string, unknown>)
export const postExamArrival = (examId: string | number, studentId: string | number, data?: unknown) => 
  post(`/api/v1/school/exam/${examId}/student/arrival/${studentId}`, data)
export const delExamArrival = (examId: string | number, studentId: string | number, data?: unknown) => 
  del(`/api/v1/school/exam/${examId}/student/arrival/${studentId}`, data)
export const editAnswer = (data: unknown, id: string | number) => post(`/api/v1/exam/script_level/${id}/answer`, data)

// 云存储
export const getTankCloudStorage = (params?: unknown) => get('/api/v1/tank/cloud_storage', params as Record<string, unknown>)
export const postTankCloudStorage = (data: unknown) => post('/api/v1/tank/cloud_storage', data)

// Applab GPT
export const postApplabCustom = (id: string | number, data: unknown) => post(`/api/v1/school/applab/${id}/custom_gpt`, data)

// 工具
export const getChatTools = (params?: unknown) => get('/api/v1/chatchat/tools', params as Record<string, unknown>)

// 签到
export const postSectionSign = (data: unknown) => post('/api/v1/school/sectionSign', data)
export const putSectionSign = (id: string | number, data: unknown) => put(`/api/v1/school/sectionSign/${id}`, data)
export const postToolVisited = (data: unknown) => post('/api/v1/universal/tool/sms/visited', data)

// 薄弱项
export const getWeak = (params?: unknown) => get('/api/v1/tank/user_level/weak', params as Record<string, unknown>)

// 语音合成
export const postAliyunSpeech = (data: unknown) => post('/api/v1/aliyun/text/speech_synthesis', data)

// 知识点
export const getKnowledgeId = (params?: unknown) => get('/api/v1/tank/knowledge/list', params as Record<string, unknown>)

// 学校信息（无需 token）
export const getSchoolInfo = () => get('/api/v1/school/info')
