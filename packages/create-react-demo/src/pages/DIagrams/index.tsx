import * as React from 'react'

// import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams'
import { connect } from 'react-redux'
// import svgData from 'svgcomponent/dist/index.ts'

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
// const SvgComponent = props => (
//   <svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
//     <path d={svgData[props.type]} fill="currentColor" fillRule="evenodd" />
//   </svg>
// )
class Home extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props)
    this.state = {
      text: 'Hello React',
      count: 1,
    }
  }


  /** 组件生命周期钩子函数：在组件挂载完成后立即被调用 */
  componentDidMount() {
    console.log('组件挂载完成！')
  }

  render() {
    return (
    <div>{this.state.text}, I am {this.props.author}! 
      <button onClick={() => this.props.addCount(1)}>add 1</button>
      {this.props.state.count}
      {/* <SvgComponent type="zaihui_egg" /> */}
    </div>
    )
  }
}

export default connect((state:any) => ({
  state: state.home,
}),                    {
  addCount,
})(Home)
