import gapi from 'gapi-client';
import axios from 'axios';

import * as _const from '../../utilities/shared/ConstType';

class HttpService {
    configData = null;
    init(successCB) {
        axios.get('../../config.json').then(response => {
            this.configData = response.data;
        }).then(() => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    'apiKey': this.configData.API_KEY,
                    'discoveryDocs': [this.configData.DISCOVERY_DOCS],
                    'client_id': this.configData.CLIENT_ID,
                    'scope': this.configData.SCOPE
                }).then(successCB)
            });
        })

    }


    create = (folderName, parentId) => {
        const folder = {
            name: folderName,
            mimeType: _const.FOLDER_MIME_TYPE,
            parents: [parentId]
        };

        return gapi.client.drive.files.create({
            resource: folder,
            fields: "*"
        });
    }

    get = (fileId) => {
        return gapi.client.drive.files.list({
            fields: "nextPageToken, files(*)",
            q: `'${fileId}' in parents and trashed = false`
        });
    }

    view = (link) => {
        window.open(link, '_blank');
    }

    download = (link) => {
        window.location = link;
    }

    delete = (fileId) => {
        return gapi.client.drive.files.delete({
            fileId: fileId
        });
    }

    upload = (boundary, requestBody) => {
        return gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': { 'uploadType': 'multipart' },
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },

            'body': requestBody
        });
    }
}

export default HttpService;

