'use strict'

import React, { Component } from 'react'
import axios from 'axios'

class FileUpload extends Component {
  handleSubmit = async (evt) => {
    evt.preventDefault()
    if(!this.uploadInput.files[0]) {
      return console.log('No file uploaded!')
    }
    let fileData = new FormData()
    fileData.append('file', this.uploadInput.files[0])
    fileData.append('filename', this.uploadInput.files[0].name)
    this.uploadInput.value = null
    await axios.post('/upload', fileData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }
    ).catch(err => console.log(err))
  }
  render() {
    return (
      <form
        id='uploadForm'
        onSubmit={this.handleSubmit}
      >
        <input
          type='file'
          ref={ref => { this.uploadInput = ref }}
          accept='.csv'
          name='dataFile'
        />
        <input type='submit' value='Upload!' />
      </form>
    )
  }
}

export default FileUpload
