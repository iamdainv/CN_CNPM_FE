const search = {
  searchField: {
    ou: {
      value: '',
      text: 'Đơn vị',
      prop: 'ou',
      type: 'a-select',
      items: [
        {
          value: '0',
          name: 'Đơn vị vietants'
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
    staff: {
      value: '',
      text: 'Nhân viên',
      prop: 'staff',
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
          if (self.$refs) {
          }
        }
      }
    }
  }
}
export default search
