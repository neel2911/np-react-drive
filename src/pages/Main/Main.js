import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as _const from '../../utilities/shared/ConstType';
import HttpAction from '../../redux/actions/HttpAction';

import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Card from '../../components/Card/Card';
import Folder from '../../components/Folder/Folder';
import File from '../../components/File/File';
import Button from '../../components/Button/Button';

import './Main.scss';
class Main extends Component {
    httpService = null;
    authService = null;
    state = {
        selectedItem: {
            isSelected: false,
            file: null
        }
    };

    constructor(props) {
        super(props);
        this.httpService = props.httpService;
        this.authService = props.authService;
    }

    onItemDblClick = (file) => {
        if (file.mimeType === _const.FOLDER_MIME_TYPE) {
            this.props.dispatch(HttpAction.breadCrumbAdd(file));
            this.props.dispatch(HttpAction.get(this.httpService.get(file.id)));
        } else {
            this.httpService.view(file.webViewLink);
        }
    }

    onOtherClick = () => {
        this.setState({
            selectedItem: {
                isSelected: false,
                file: null
            }
        });
    }

    onItemClick = (e, file) => {
        e.stopPropagation();
        this.setState({
            selectedItem: {
                isSelected: true,
                file: file
            }
        });
    }

    onDeleteClick = () => {
        this.httpService.delete(this.state.selectedItem.file.id).execute((result) => {
            this.props.dispatch(HttpAction.delete());
            this.props.dispatch(HttpAction.get(this.httpService.get(this.props.httpReducer.breadBrumbs[this.props.httpReducer.breadBrumbs.length - 1].id)));
        });
    }

    onDownloadClick = () => {
        if (this.state.selectedItem.isSelected) {
            this.httpService.download(this.state.selectedItem.file.webContentLink);
        }
    }

    onBreadCrumbClick = (breadBrumb) => {
        const newBreadBrumbs = [...this.props.httpReducer.breadBrumbs];
        const selectedBreadBrumb = this.props.httpReducer.breadBrumbs.findIndex((breadBrumbData) => breadBrumbData.id === breadBrumb.id);
        if (this.props.httpReducer.breadBrumbs.length - 1 > selectedBreadBrumb) {
            this.props.dispatch(HttpAction.get(this.httpService.get(this.props.httpReducer.breadBrumbs[selectedBreadBrumb].id)));
            newBreadBrumbs.length = selectedBreadBrumb + 1;
            this.props.dispatch(HttpAction.breadCrumbRemove(newBreadBrumbs));
        }
    }
    render() {
        const breadCrumbs = this.props.httpReducer.breadBrumbs.map((breadBrumb) => {
            return <BreadCrumb key={breadBrumb.id} name={breadBrumb.name} onBreadCrumbClick={() => this.onBreadCrumbClick(breadBrumb)} />
        });
        const folders = this.props.files.filter((file) => {
            return file.mimeType === _const.FOLDER_MIME_TYPE && file;
        }).map((file) => {
            return <Folder key={file.id} name={file.name} onFolderClick={(e) => { this.onItemClick(e, file) }} />
        })
        const files = this.props.files.filter((file) => {
            return file.mimeType !== _const.FOLDER_MIME_TYPE && file;
        }).map((file) => {
            return <File key={file.id} name={file.name} thumbnailLink={file.thumbnailLink} iconLink={file.iconLink} onFileClick={(e) => { this.onItemClick(e, file) }} />
        })
        return (
            <div className="main-container" onClick={this.onOtherClick}>
                <div className="main-header-container">
                    <div className="breadcrumb-section">
                        <ul className="breadcrumb">
                            {breadCrumbs}
                        </ul>
                    </div>
                    <div className="tool-section">
                        {this.state.selectedItem.isSelected ? (
                            <React.Fragment>
                                <div className="selected-file-section">
                                    {this.state.selectedItem.file.name}
                                </div>
                                <div className="toolbar">
                                    <Button onButtonClick={this.onDeleteClick} buttonText={'Delete'} />
                                    {this.state.selectedItem.file.mimeType !== _const.FOLDER_MIME_TYPE ?
                                        <React.Fragment>
                                            <Button onButtonClick={this.onDownloadClick} buttonText={'Download'} />
                                            <Button onButtonClick={() => this.onItemDblClick(this.state.selectedItem.file)} buttonText={'View'} />
                                        </React.Fragment>
                                        : <Button onButtonClick={() => this.onItemDblClick(this.state.selectedItem.file)} buttonText={'Open'} />
                                    }
                                </div>
                            </React.Fragment>
                        ) : null}
                    </div>
                </div>
                <div className="main-body-section">
                    {folders.length > 0 ? (
                        <Card className={'folder-section'} sectionName={'Folders'} items={folders} />
                    ) : null}
                    {files.length > 0 ? (
                        <Card className={'item-section'} sectionName={'Files'} items={files} />
                    ) : null}
                </div>

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

export default connect(mapStateToProps)(Main);