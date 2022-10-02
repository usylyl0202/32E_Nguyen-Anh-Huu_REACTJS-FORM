import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../store/actions";

class DanhSachSinhVien extends Component {
  state = {
    mangSinhVien: [],
  };
  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (nextProps.svSearch.length !== 0) {
      return (currentState.mangSinhVien = nextProps.svSearch);
    }
    return (currentState.mangSinhVien = nextProps.mangSinhVien);
  };
  render() {
    const { mangSinhVien } = this.state;
    const { flag } = this.props;
    return (
      <div className="mt-[30px]">
        <div>
          <table className="w-full p-6 text-xs text-left whitespace-nowrap mt-10">
            <thead className="bg-black p-5 text-white text-lg">
              <tr >
                <th className="p-3"></th>
                <th className='p-3'>Mã SV</th>
                <th className='p-3'>Họ tên</th>
                <th className='p-3'>Số điện thoại</th>
                <th className='p-3'>Email</th>
                <th className='p-3'></th>
                <th className='p-3'></th>
              </tr>
            </thead>
            <tbody className="border-b text-lg">
              {!flag ? (
                <tr className="border-2">
                  <td className="text-center text-3xl" colSpan={5}>
                    Không tìm thấy sinh viên này
                  </td>
                </tr>
              ) : (mangSinhVien.map((item, index) => (
                <tr key={item.id}>
                  <td></td>
                  <td>{item.maSV}</td>
                  <td>{item.fullName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td></td>
                  <td>
                    <button
                      className="pr-6 pl-6 pt-3 pb-3 bg-red-500 cursor-pointer hover:bg-red-700 rounded-lg text-white"
                      onClick={() => {
                        this.props.dispatch(deleteUser(item.id));
                      }}
                    >
                      Xoá
                    </button>
                    <button
                      className="pr-6 pl-6 pt-3 pb-3 bg-green-500 cursor-pointer hover:bg-green-700 rounded-lg ml-2 text-white"
                      onClick={() => {
                        this.props.dispatch(editUser(item.id));
                      }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapQuanLySinhVien,
  };
};

export default connect(mapStateToProps)(DanhSachSinhVien);
