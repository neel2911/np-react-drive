import React, { Component } from 'react';
import { connect } from 'react-redux';

import HttpAction from '../../redux/actions/HttpAction';

import Modal from '../../components/Modal/Modal';
import './LeftPanel.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import Button from '../../components/Button/Button';

class LeftPanel extends Component {
    httpService = null;
    authService = null;

    constructor(props) {
        super(props);
        this.httpService = props.httpService;
        this.authService = props.authService;
    }

    state = {
        folderName: 'New Folder',
        isModalOpen: false
    }

    onFileUploadClick = (e) => {
        const file = e.target.files[0];

        const boundary = 'reactdrive';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        let reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
            const contentType = file.type || 'application/octet-stream';
            const metadata = {
                name: file.name,
                mimeType: contentType,
                parents: [this.props.httpReducer.breadBrumbs[this.props.httpReducer.breadBrumbs.length - 1].id]
            };
            const base64Data = btoa(reader.result.toString());
            const multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;

            this.httpService.upload(boundary, multipartRequestBody).execute((result) => {
                this.props.dispatch(HttpAction.upload());
                this.props.dispatch(HttpAction.get(this.httpService.get(this.props.httpReducer.breadBrumbs[this.props.httpReducer.breadBrumbs.length - 1].id)));
            });
        }
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    }

    onCreateNewFolderClick = () => {
        this.httpService.create(this.state.folderName, this.props.httpReducer.breadBrumbs[this.props.httpReducer.breadBrumbs.length - 1].id).execute((result) => {
            this.props.dispatch(HttpAction.create());
            this.props.dispatch(HttpAction.get(this.httpService.get(this.props.httpReducer.breadBrumbs[this.props.httpReducer.breadBrumbs.length - 1].id)));

            this.setState({ folderName: 'New Folder', isModalOpen: false });
        });
    }

    onInputChange = (e) => {
        this.setState({ folderName: e.target.value });
    }

    onCancelClick = () => {
        this.setState({ isModalOpen: false });
    }
    render() {
        return (
            <div className="left-panel-container" >
                <FileUpload onFileUploadClick={(e) => this.onFileUploadClick(e)} />
                <Button onButtonClick={this.openModal} buttonText={'New Folder'} />
                {this.state.isModalOpen ? <Modal onInputChange={(e) => this.onInputChange(e)} textValue={this.state.folderName} onCreateNewFolderClick={this.onCreateNewFolderClick} onCancelClick={this.onCancelClick} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        httpReducer: state.httpReducer,
        authReducer: state.authReducer
    }
}

export default connect(mapStateToProps)(LeftPanel);