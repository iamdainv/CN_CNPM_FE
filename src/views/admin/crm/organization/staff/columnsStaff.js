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
    title: 'Mã đơn vị',
    dataIndex: 'staffCode',
    scopedSlots: { customRender: 'staffCode' },
    align: 'left',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Loại đơn vị',
    dataIndex: 'staffName',
    scopedSlots: { customRender: 'staffName' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Loại bưu cục',
    dataIndex: 'staffType',
    scopedSlots: { customRender: 'staffType' },
    align: 'left',
    width: 150,
    ellipsis: true
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
