import * as React from 'react'
import { connect } from 'react-redux'
import { addCount } from '@/store/action/home'
interface Prop {
  state: any,
  author: String,
  addCount: Function,
  history: any,
}
interface State {
  count: Number,
  text: String
}


class Home extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      text: "Hello React",
      count: 1,
    };
  }


  /** 组件生命周期钩子函数：在组件挂载完成后立即被调用 */
  componentDidMount() {
    console.log("组件挂载完成！");
  }

  render() {
    return (
    <div>{this.state.text}, I am {this.props.author}! 
    <button onClick={() => this.props.addCount(1)}>add 1</button>
    {this.props.state.count}</div>
    )
  }
}

export default connect((state:any) => ({
    state: state.home,
}), {
    addCount,
})(Home)