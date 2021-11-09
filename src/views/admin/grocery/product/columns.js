export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 60,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 60
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'productType',
    scopedSlots: { customRender: 'productType' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'productName',
    scopedSlots: { customRender: 'productName' },
    align: 'left',
    ellipsis: true,
    width: 220
  },
  {
    title: 'Giá sản phẩm',
    dataIndex: 'productPrice',
    scopedSlots: { customRender: 'productName' },
    align: 'left',
    ellipsis: true,
    width: 70
  },
  {
    title: 'Số lượng sản phẩm',
    dataIndex: 'productNumber',
    scopedSlots: { customRender: 'productNumber' },
    align: 'left',
    ellipsis: true,
    width: 70
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Mô tả sản phẩm',
    dataIndex: 'productDescript',
    scopedSlots: { customRender: 'productDescript' },
    align: 'left',
    ellipsis: true,
    width: 300
  }
]
