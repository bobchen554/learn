import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCount } from '@/store/action/home'

class Home extends Component {
  state = {
    text: "Hello React"
  };

  /** 组件生命周期钩子函数：在组件挂载完成后立即被调用 */
  componentDidMount() {
    console.log("组件挂载完成！");
  }

  render() {
    console.log(this.props.state.count)
    return (
    <div>{this.state.text}, I am {this.props.author}! 
    <button onClick={() => this.props.addCount(1)}>add 1</button>
    {this.props.state.count}</div>
    )
  }
}

export default connect(state => ({
    state: state.home,
}), {
    addCount,
})(Home)