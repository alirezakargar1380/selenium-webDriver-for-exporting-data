/* eslint-disable no-unused-expressions */
class FileObject {
  constructor() {
    this.FileType;
    this.Caption;
    this.FileName;
    this.FileSize;
    this.Description;
  }

  getFileObject() {
    return {
      FileType: this.FileType,
      Caption: this.Caption,
      FileName: this.FileName,
      FileSize: this.FileSize,
      Description: this.Description,
    };
  }

  setFileObject(FileType, Caption, FileName, FileSize, Description) {
    this.FileType = FileType;
    this.Caption = Caption;
    this.FileName = FileName;
    this.FileSize = FileSize;
    this.Description = Description;
  }
}

module.exports = new FileObject();
