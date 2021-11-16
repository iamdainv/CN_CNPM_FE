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
    dataIndex: 'productTypeName',
    scopedSlots: { customRender: 'productTypeName' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    ellipsis: true,
    width: 220
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    scopedSlots: { customRender: 'image' },
    align: 'left',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Giá sản phẩm',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' },
    align: 'right',
    ellipsis: true,
    width: 70
  },
  {
    title: 'Số lượng sản phẩm',
    dataIndex: 'quantity',
    scopedSlots: { customRender: 'quantity' },
    ellipsis: true,
    align: 'right',
    width: 100
  },
  {
    title: 'Đã bán',
    dataIndex: 'selled',
    scopedSlots: { customRender: 'selled' },
    ellipsis: true,
    align: 'right',
    width: 100
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isSell',
    scopedSlots: { customRender: 'isSell' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    scopedSlots: { customRender: 'createdAt' },
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    scopedSlots: { customRender: 'updatedAt' },
    align: 'center',
    ellipsis: true,
    width: 100
  }
  // {
  //   title: 'Mô tả sản phẩm',
  //   dataIndex: 'description',
  //   scopedSlots: { customRender: 'description' },
  //   align: 'left',
  //   ellipsis: true,
  //   width: 300
  // }
]
