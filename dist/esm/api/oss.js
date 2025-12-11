import { get } from './http';
import { decode, generateRandomCode } from '../utils/base64';
import { readFileAsArrayBuffer } from '../utils/file';
let ossBaseUrl = 'https://api.istemedu.com';
export function setOssBaseUrl(url) {
    ossBaseUrl = url;
}
async function uploadToOss(file, options) {
    const { folder = 'tmp', kind = 'code', originName = 'file', contentType = '' } = options;
    const urlto = `${ossBaseUrl}/api/tank/cloud_storage/?origin_name=${originName}&kind=${kind}&folder=${folder}`;
    const res = await get(urlto);
    if (!res.body?.oss_url) {
        throw new Error('Failed to get OSS upload URL');
    }
    const ossUrl = decode(res.body.oss_url);
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
export async function uploadImage(file) {
    const kind = file.type.split('/')[1] || 'jpeg';
    const buffer = await readFileAsArrayBuffer(file);
    return uploadToOss(buffer, {
        originName: file.name,
        kind,
        contentType: `image/${kind}`
    });
}
export async function uploadVideo(file, folder = 'tmp') {
    const kind = file.type.split('/')[1] || 'mp4';
    const buffer = await readFileAsArrayBuffer(file);
    return uploadToOss(buffer, { originName: file.name, kind, folder });
}
export async function uploadText(content) {
    return uploadToOss(content, { originName: 'aaa.txt', kind: 'code', folder: 'tmp' });
}
export async function uploadHtml(content) {
    return uploadToOss(content, { originName: 'aaa.html', kind: 'code', folder: 'greetingCard' });
}
export async function uploadMusic(file) {
    return uploadToOss(file, { originName: 'aaa.mp3', kind: 'code' });
}
export async function uploadMarkdown(content) {
    return uploadToOss(content, { originName: 'aaa.md', kind: 'code', folder: 'tmp' });
}
export async function uploadDoc(content) {
    return uploadToOss(content, { originName: 'aaa.docx', kind: 'code', folder: 'tmp' });
}
export async function uploadBase64Image(base64) {
    const randomName = generateRandomCode(8) + '.jpeg';
    return uploadToOss(base64, {
        originName: randomName,
        kind: 'jpeg',
        contentType: 'image/jpeg'
    });
}
export async function uploadKnowledgeFile(file) {
    const kind = file.type.split('/')[1] || 'bin';
    const buffer = await readFileAsArrayBuffer(file);
    return uploadToOss(buffer, {
        originName: file.name,
        kind,
        folder: 'knowledgeBaseFile'
    });
}
//# sourceMappingURL=oss.js.map