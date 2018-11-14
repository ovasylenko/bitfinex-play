/* eslint react/no-multi-comp: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

const fileTarget = {
  drop(props, monitor) {
    const { files } = monitor.getItem();
    if (!files.length) {
      return
    }
    const ext = files[0].name.split('.').pop().toLowerCase();
    if (props.allowedExt.indexOf(ext) >= 0) {
      props.onFileDrop(files[0])
    } else {
      props.onError();
    }
  }
};

class FileUpload extends React.Component {
  render() {
    const {
      connectDropTarget, isOver, isError
    } = this.props
    return connectDropTarget(
      <form className={`box has-advanced-upload ${isOver ? 'is-dragover' : ''} ${isError ? 'shaking-animation' : ''}`} method="post" action="" encType="multipart/form-data">
        <div className="box__input">
          <svg className="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
            <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z" />
          </svg>
          <input className="box__file" type="file" name="files[]" id="file" dataMultipleCaption="{count} files selected" multiple />
          <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
          <button className="box__button" type="submit">Upload</button>
        </div>
        <div className="box__uploading">Uploading&hellip;</div>
        <div className="box__success">Done!</div>
        <div className="box__error">Error! <span />.</div>
      </form>
    )
  }
}


FileUpload.propTypes = {
  onFileDrop: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  onError: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
  allowedExt: PropTypes.arrayOf(PropTypes.string) // eslint-disable-line react/no-unused-prop-types
}

FileUpload.defaultProps = {
  allowedExt: ['jpg', 'png', 'gif'],
  isError: false
}

const FileUploadConnected = DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileUpload);


export default class FileUploadWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileUploadError: false
    }
    this.toggleError = this.toggleError.bind(this);
  }

  toggleError() {
    this.setState(state => ({ fileUploadError: !state.fileUploadError }))
    if (this.state.fileUploadError) {
      setTimeout(this.toggleError, 500)
    }
  }

  render() {
    return (
      <FileUploadConnected
        isError={this.state.fileUploadError}
        onError={this.toggleError}
        {...this.props}
      />
    )
  }
}
/* eslint react/no-multi-comp: 1 */
