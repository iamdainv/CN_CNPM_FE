const search = {
  searchField: {
    orgUnitType: {
      value: '',
      text: 'Loại đơn vị',
      prop: 'orgUnitType',
      type: 'a-select',
      items: [
        {
          value: '0',
          name: 'Đơn vị hà đông'
        }
      ],
      rules: [
        { required: true, message: 'Loại đơn vị là trường bắt buộc', trigger: 'change' }
      ],
      col: 12,
      lg: 6,
      md: 3,
      xs: 12
    },
    orgUnitName: {
      value: '',
      text: 'Tên đơn vị',
      prop: 'orgUnitName',
      type: 'a-input',
      rules: [
        { required: true, message: 'Từ khóa là trường bắt buộc', trigger: 'change' }
      ],
      col: 12,
      lg: 6,
      md: 3,
      xs: 12
    },
    orgUnitCode: {
      value: '',
      text: 'Mã đơn vị',
      prop: 'orgUnitCode',
      type: 'a-input',
      rules: [
        { required: true, message: 'Từ khóa là trường bắt buộc', trigger: 'change' }
      ],
      col: 12,
      lg: 6,
      md: 3,
      xs: 12
    }
  },
  searchButton: {
    reset: {
      attrs: {
        text: 'Nhập lại',
        type: 'reset'
      },
      on: {
        click (self) {
          if (self.$refs) {
          }
        }
      }
    },
    search: {
      attrs: {
        text: 'Tìm kiếm',
        type: 'primary'
      },
      on: {
        click (self) {
          if (self.getDataUnit()) {
            self.getDataUnit()
          }
        }
      }
    }
  }
}
export default search
