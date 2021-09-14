import React from "react";
import * as API from "./API/public";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      keys: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'],
      limit: 10,
      biggerThan: 0
    }
  }

  renderData() {
    API.get_order_codes(0, this.state.limit)
        .then((res) => {
          this.setState({
            data: res.data.data
          })
        })
  }

  componentDidMount() {
    this.renderData()
  }

  number_generator()
  {
    toast("جنریتور در حال ساختن اعداد است، لطفا تا پایان کار صبر کنید",{
      type: "info",
      theme: "dark"
    })
    let values = {}
    console.log(typeof this.state[this.state.keys[0]])
    for (let i = 0; i < this.state.keys.length; i++) {
      if (typeof this.state[this.state.keys[i]] !== "undefined")
      {
        values[this.state.keys[i]] = this.state[this.state.keys[i]].split(',')
      }
    }
    console.log(values)
    API.generator(values)
        .catch(() => {
          toast("لطفا تمام فیلد هارا پر کنید",{
            type: "warning",
            theme: "dark"
          })
        })
  }

  runRobot() {
    API.robot(this.state.biggerThan)
        .then(() => {
          toast("ربات در حال اجرا است",{
            type: "info",
            theme: "dark"
          })
        })
  }

  async delete_all() {
    API.delete_all_records().then(() => {
      toast("تمام دیتابیس حذف شد",{
        type: "info",
        theme: "dark"
      })
    })
  }

  async create_file() {
    API.create_file().then(() => {
      toast("فایل با موفقیت ساخته شد",{
        type: "info",
        theme: "dark"
      })
    })
  }

  render() {
    const {data} = this.state
    return (
        <div className="w-75 mx-auto text-center font-thin">
          <ToastContainer
              position="bottom-center"
          />
          <h1 className="mb-0 py-5">CODES</h1>
          <div className="row pb-5">
            {this.state.keys.map((key, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="text-left w-100">
                    {key}:
                  </div>
                  <input
                      className="w-100"
                      onChange={(e) => {
                        this.setState({
                          [key]: e.target.value
                        })
                      }}
                  />
                </div>
            ))}
            <div className="col-md-4 mb-3">
            </div>
            <div className="col-md-4 mb-3 d-flex">
              <div className="text-left">
                start generator:
              </div>
              <button
                  className="ml-4 border-0 py-1 px-3"
                  onClick={() => {
                    this.number_generator()
                  }}
              >RUN</button>
            </div>
            <div className="col-md-4 mb-3 d-flex">
              <div className="text-left">
                DELETE ALL DB:
              </div>
              <button
                  className="ml-4 border-0 py-1 px-3 cursor del-btn"
                  onClick={() => {
                    this.delete_all()
                  }}
              >DELETE</button>
            </div>
            <div className="col-md-4 mb-3 d-flex">
              <div className="text-left">
                CREATE FILE:
              </div>
              <button
                  className="ml-4 border-0 py-1 px-3 cursor"
                  onClick={() => {
                    this.create_file()
                  }}
              >CREATE FILE</button>
            </div>
          </div>
          <div className="w-50 mr-auto text-left pb-3">
            from id: <input type="text" onChange={(e) => {
              this.setState({
                biggerThan: e.target.value
              })
          }}/>
            <button className="ml-4 border-0 py-1 px-3" onClick={() => {this.runRobot()}}>RUN</button>
          </div>
          <table className="text-center w-100 mb-5">
            <thead>
            <tr>
              <th className="px-5 py-3">id</th>
              <th className="px-5 py-3">order_code</th>
              <th className="px-5 py-3">CHECKED STATUS</th>
              <th className="px-5 py-3">EXTEND CODE</th>
            </tr>
            </thead>
            <tbody>
            {data.map((result) => {
              if (result.extend === null) {
                return (
                    <tr key={result.id} className="list-row">
                      <td className="py-3">{result.id}</td>
                      <td className="py-3">{result.order_code}</td>
                      <td className="py-3">{result.checked_status}</td>
                      <td className="py-3">null</td>
                    </tr>
                )
              }
              return (
                  <tr key={result.id} className="list-row">
                    <td className="py-3">{result.id}</td>
                    <td className="py-3">{result.order_code}</td>
                    <td className="py-3">{result.checked_status}</td>
                    <td className="py-3">{result.extend}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
          <div className="pb-5 cursor"
               onClick={() => {
                 this.setState({
                   limit: this.state.limit + 10
                 })
                 this.renderData()
               }}
          >load more...</div>
        </div>
    )
  }
}