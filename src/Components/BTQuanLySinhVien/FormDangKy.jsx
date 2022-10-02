import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, updateUser, searchUser } from "../../store/actions";

class FormDangKy extends Component {
  stateDefault = {
    maSV: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  };
  state = {
    find: '',
    values: this.stateDefault,
    errors: {},
  };
  handleState = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };
  handleBlur = (event) => {
    const {
      name,
      title,
      validity: { valueMissing, patternMismatch },
    } = event.target;
    let mess = "";
    if (valueMissing) {
      mess = `${title} không được bỏ trống`;
    }
    if (patternMismatch) {
      switch (name) {
        case "fullName":
          mess = `${title} phải là ký tự không có dấu`;
          break;
        case "phoneNumber":
          mess = `${title} phải là định dạng số, bao gồm 10 đến 11 kí tự`;
          break;
        default:
          mess = `${title} không đúng định dạng`;
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    if (this.props.selectedUser) {
      this.props.dispatch(updateUser(this.state.values));
    } else {
      this.props.dispatch(addUser(this.state.values));
    }

    this.setState({
      values: this.stateDefault,
    });
  };

  handleFind = (event) => {
    this.setState({
      find: event.target.value,
    });
  };

  handleSearch = () => {
    this.props.dispatch(searchUser(this.state.find));
  };

  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    const { maSV, fullName, phoneNumber, email } =
      this.state.values;
    return (
      <div>
        <form
          id="form"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <h1 className="p-10 bg-black text-white text-2xl text-left">Thông tin sinh viên</h1>
          <div className="ml-5 mr-5 grid grid-cols-2 gap-5 mt-10 text-left">
            <div>
              <p className="text-[20px]">Mã Sinh Viên</p>
              <input
                type="text"
                required
                title="Mã sinh viên"
                value={maSV}
                name="maSV"
                placeholder="Mã sinh viên"
                className="border-2 border-gray-300 rounded-lg p-3 w-full "
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.maSV}
              </span>
            </div>
            <div>
              <p className="text-[20px]">Họ tên</p>
              <input
                type="text"
                required
                title="Họ tên"
                value={fullName}
                name="fullName"
                pattern="^[A-Za-z]+$"
                placeholder="Họ tên"
                className="border-2 border-gray-300 rounded-lg p-3 w-full"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.fullName}
              </span>
            </div>
            <div>
              <p className="text-[20px]">Số điện thoại</p>
              <input
                type="text"
                required
                value={phoneNumber}
                title="Số điện thoại"
                name="phoneNumber"
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$"
                placeholder="Số điện thoại"
                className="border-2 border-gray-300 rounded-lg p-3 w-full"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.phoneNumber}
              </span>
            </div>
            <div>
              <p className="text-[20px]">Email</p>
              <input
                type="text"
                required
                value={email}
                title="Email"
                name="email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                placeholder="Email"
                className="border-2 border-gray-300 rounded-lg p-3 w-full"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.email}
              </span>
            </div>
          </div>
          <div className="mt-4 ml-5 flex justify-start">
            <button
              type="submit"
              className={`pr-6 pl-6 pt-4 pb-4 bg-green-600 cursor-pointer hover:bg-green-700 rounded-lg text-white text-[15px] ${!this.props.selectedUser ? "" : "hidden"
                }
    `}
            >
              Thêm Sinh Viên
            </button>
            <button
              type="submit"
              className={`pr-6 pl-6 pt-4 pb-4 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-lg text-white text-[15px] ${this.props.selectedUser ?? "hidden"
                }`}
            >
              Cập Nhật
            </button>
            <button
              type="reset"
              className="pr-6 pl-6 pt-4 pb-4 bg-cyan-500 rounded-lg text-white cursor-pointer mx-4 hover:bg-cyan-700"
            >
              Reset
            </button>
          </div>
          <div className=" ml-5 mt-10">
            <p className=" mt-2 text-[20px]">Tìm sinh viên</p>
            <div>
              <input
                type="search"
                name="Search"
                value={this.state.find}
                placeholder="Nhập tên SV"
                className="ml-3 border-gray-300 border-2 rounded-lg p-3  w-[500px]"
                onChange={this.handleFind} />
              <button
                type="button"
                title="search"
                className="pr-6 pl-6 pt-3 pb-3 ml-3 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-lg text-white text-[15px]"
                onClick={this.handleSearch}>
                Tìm
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapQuanLySinhVien,
  };
};

export default connect(mapStateToProps)(FormDangKy);
