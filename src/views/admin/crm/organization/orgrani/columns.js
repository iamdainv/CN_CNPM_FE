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
    dataIndex: 'orgUnitCode',
    scopedSlots: { customRender: 'orgUnitCode' },
    align: 'left',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Tên đơn vị',
    dataIndex: 'orgUnitName',
    scopedSlots: { customRender: 'orgUnitName' },
    align: 'left',
    width: 250,
    ellipsis: true
  },
  {
    title: 'Loại đơn vị',
    dataIndex: 'orgUnitType',
    scopedSlots: { customRender: 'orgUnitName' },
    align: 'left',
    width: 120,
    ellipsis: true
  },
  {
    title: 'Loại bưu cục',
    dataIndex: 'poLevel',
    scopedSlots: { customRender: 'poLevel' },
    align: 'left',
    width: 250,
    ellipsis: true
  },
  {
    title: 'Người đại diện',
    dataIndex: 'representative',
    scopedSlots: { customRender: 'representative' },
    align: 'left',
    width: 250,
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
    title: 'Tỉnh thành',
    dataIndex: 'provinceName',
    scopedSlots: { customRender: 'provinceName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Quận huyện',
    dataIndex: 'districtName',
    scopedSlots: { customRender: 'districtName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Xã phường',
    dataIndex: 'communeName',
    scopedSlots: { customRender: 'communeName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address' },
    align: 'left',
    ellipsis: 150,
    width: 300
  }
]
