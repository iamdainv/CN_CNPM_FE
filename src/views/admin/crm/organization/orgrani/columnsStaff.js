export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 120,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'left',
    ellipsis: true,
    width: 60

  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'staffCode',
    scopedSlots: { customRender: 'staffCode' },
    align: 'left',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'staffName',
    scopedSlots: { customRender: 'staffName' },
    align: 'left',
    width: 250,
    ellipsis: true
  },
  {
    title: 'Loại nhân viên',
    dataIndex: 'staffType',
    scopedSlots: { customRender: 'staffType' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Mã nhân viên bưu tá',
    dataIndex: 'postId',
    scopedSlots: { customRender: 'postId' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    scopedSlots: { customRender: 'phoneNumber' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Email',
    dataIndex: 'email',
    scopedSlots: { customRender: 'email' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'left',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Ngày vào',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'provinceName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày ra',
    dataIndex: 'updateTime',
    scopedSlots: { customRender: 'updateTime' },
    align: 'left',
    ellipsis: true,
    width: 150
  }
]
