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
    title: 'Mã vai trò',
    dataIndex: 'staffCode',
    scopedSlots: { customRender: 'staffCode' },
    align: 'left',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Tên vai trò',
    dataIndex: 'staffName',
    scopedSlots: { customRender: 'staffName' },
    align: 'left',
    width: 150,
    ellipsis: true
  }
]
