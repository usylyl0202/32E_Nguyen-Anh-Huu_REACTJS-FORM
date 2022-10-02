import React, { Component } from 'react'
import DanhSachSinhVien from './DanhSachForm'
import FormDangKy from './FormDangKy'

export default class BTForm extends Component {
  render() {
    return (
      <div>
        <FormDangKy />
        <DanhSachSinhVien />
      </div>
    )
  }
}
