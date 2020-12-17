export const formColumn = (SELF) => {
  let display = SELF.state.form;
  let label = SELF.state.label;
  let isUploadImg = display == 'upload' && SELF.form.uploadType == '图片';

  return [
    {
      label: '上传格式',
      key: 'uploadType',
      type: 'radio-group',
      required: true,
      display: display == 'upload' && SELF.state.requestByImg != undefined,
      options: [
        {
          label: '文档',
          value: '文档'
        },
        {
          label: '图片',
          value: '图片'
        }
      ]
    },
    {
      label: '文件夹名称',
      key: 'folderName',
      type: 'text',
      display: display == 'addFolder',
      rules: {
        required: true,
        message: '文件夹名称不可为空',
        trigger: 'blur'
      }
    },
    {
      label: '文件性质',
      key: 'fileNature',
      type: 'select',
      display: display == 'setFileNature',
      options: SELF.fileNatureOpt,
      rules: {
        required: true,
        message: '文件性质不可为空',
        trigger: 'blur'
      }
    },
    {
      label: '所属人',
      key: 'filebelong',
      type: 'select',
      display: display == 'setFilebelong',
      options: SELF.userOpt,
      rules: {
        required: true,
        message: '所属人不可为空',
        trigger: 'blur'
      }
    },
    {
      label: '文件名称',
      key: 'fileName',
      display: display == 'rename' || isUploadImg,
      type: 'text',
      rules: {
        required: true,
        message: '文件名称不可为空',
        trigger: 'blur'
      }
    },
    {
      label: '文件编号',
      key: 'fileNumber',
      display: display == 'modifyFileNumber' || isUploadImg,
      type: 'text',
      rules: {
        required: true,
        message: '文件编号不可为空',
        trigger: 'blur'
      }
    },
    {
      label,
      key: 'uploaddoc',
      type: 'upload',
      required: true,
      display: display == 'upload' && SELF.form.uploadType == '文档',
      options: {
        action: SELF.state.request,
        accept: '.doc, .docx',
        format: ['doc', 'docx'],
        data: { id: SELF.active.id },
        maxSize: 6144,
        tip: '格式限制：.doc,.docx，大小限制：6M',
        onSuccess: SELF.uploadSuccess
      }
    },
    {
      label,
      key: 'uploadimg',
      type: 'upload',
      display: isUploadImg,
      options: {
        action: SELF.state.request,
        multiple: true,
        accept: '.png, .jpg',
        format: ['png', 'jpg'],
        maxSize: 6144,
        maxNumber: 10,
        tip: '格式限制：.png,.jpg，大小限制：6M，个数限制：10张',
        manualUpload: true
      },
      rules: [
        {
          required: true,
          type: 'array',
          min: 1,
          message: '请至少选择一张图片',
          trigger: 'change'
        }
      ]
    }
  ];
};
