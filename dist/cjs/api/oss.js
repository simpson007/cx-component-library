"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOssBaseUrl = setOssBaseUrl;
exports.uploadImage = uploadImage;
exports.uploadVideo = uploadVideo;
exports.uploadText = uploadText;
exports.uploadHtml = uploadHtml;
exports.uploadMusic = uploadMusic;
exports.uploadMarkdown = uploadMarkdown;
exports.uploadDoc = uploadDoc;
exports.uploadBase64Image = uploadBase64Image;
exports.uploadKnowledgeFile = uploadKnowledgeFile;
const http_1 = require("./http");
const base64_1 = require("../utils/base64");
const file_1 = require("../utils/file");
let ossBaseUrl = 'https://api.istemedu.com';
function setOssBaseUrl(url) {
    ossBaseUrl = url;
}
async function uploadToOss(file, options) {
    const { folder = 'tmp', kind = 'code', originName = 'file', contentType = '' } = options;
    const urlto = `${ossBaseUrl}/api/tank/cloud_storage/?origin_name=${originName}&kind=${kind}&folder=${folder}`;
    const res = await (0, http_1.get)(urlto);
    if (!res.body?.oss_url) {
        throw new Error('Failed to get OSS upload URL');
    }
    const ossUrl = (0, base64_1.decode)(res.body.oss_url);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', ossUrl);
        if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseURL.split('?')[0]);
            }
            else {
                reject(new Error(`Upload failed: ${xhr.status}`));
            }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(file);
    });
}
async function uploadImage(file) {
    const kind = file.type.split('/')[1] || 'jpeg';
    const buffer = await (0, file_1.readFileAsArrayBuffer)(file);
    return uploadToOss(buffer, {
        originName: file.name,
        kind,
        contentType: `image/${kind}`
    });
}
async function uploadVideo(file, folder = 'tmp') {
    const kind = file.type.split('/')[1] || 'mp4';
    const buffer = await (0, file_1.readFileAsArrayBuffer)(file);
    return uploadToOss(buffer, { originName: file.name, kind, folder });
}
async function uploadText(content) {
    return uploadToOss(content, { originName: 'aaa.txt', kind: 'code', folder: 'tmp' });
}
async function uploadHtml(content) {
    return uploadToOss(content, { originName: 'aaa.html', kind: 'code', folder: 'greetingCard' });
}
async function uploadMusic(file) {
    return uploadToOss(file, { originName: 'aaa.mp3', kind: 'code' });
}
async function uploadMarkdown(content) {
    return uploadToOss(content, { originName: 'aaa.md', kind: 'code', folder: 'tmp' });
}
async function uploadDoc(content) {
    return uploadToOss(content, { originName: 'aaa.docx', kind: 'code', folder: 'tmp' });
}
async function uploadBase64Image(base64) {
    const randomName = (0, base64_1.generateRandomCode)(8) + '.jpeg';
    return uploadToOss(base64, {
        originName: randomName,
        kind: 'jpeg',
        contentType: 'image/jpeg'
    });
}
async function uploadKnowledgeFile(file) {
    const kind = file.type.split('/')[1] || 'bin';
    const buffer = await (0, file_1.readFileAsArrayBuffer)(file);
    return uploadToOss(buffer, {
        originName: file.name,
        kind,
        folder: 'knowledgeBaseFile'
    });
}
//# sourceMappingURL=oss.js.map