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
    width: 150,
    ellipsis: true
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'staffName',
    scopedSlots: { customRender: 'staffName' },
    align: 'left',
    ellipsis: true,
    width: 250

  },
  {
    title: 'Loại nhân viên',
    dataIndex: 'orgUnitType',
    scopedSlots: { customRender: 'orgUnitName' },
    align: 'left',
    width: 120,
    ellipsis: true
  },
  {
    title: 'Mã nhân viên bưu tá',
    dataIndex: 'poLevel',
    scopedSlots: { customRender: 'poLevel' },
    align: 'left',
    width: 200,
    ellipsis: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'representative',
    scopedSlots: { customRender: 'representative' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Email',
    dataIndex: 'provinceName',
    scopedSlots: { customRender: 'provinceName' },
    align: 'left',
    ellipsis: true,
    width: 150
  }
]
