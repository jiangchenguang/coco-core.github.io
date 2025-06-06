import {route, page, reactive} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/view-component')
@page()
class LearnViewComponentPage {
  code = `
@view()  
class Button () {
  render() {
    return <button>点赞</button>
  }
}
  `;

  code1 = `
@view()
class Button () {

  @bind()
  clickLike() {
    console.log('点击按钮')
  } 
  
  render() {
    return <button onClick={this.clickLike}>点赞</button>
  }
}
`

  code2 = `
@view()
class Button () {
  
  @reactive()
  liked: boolean  = false;

  @bind()
  clickLike() {
    this.liked = !this.liked;
  } 
  
  render() {
    return <button onClick={this.clickLike}>{this.liked ? "已赞" : "点赞"}</button>
  }
}
`
  code3 = `
@view()  
class Button () {

  @ref()
  ref: { current: HtmlElement }

  render() {
    return <button ref={this.ref}>点赞</button>
  }
}
  `;

  code4 = `
@view()
class Button () {
  
  @reactive()
  liked: boolean  = false;

  @bind()
  clickLike() {
    this.liked = !this.liked;
  } 
  
  @memoized()
  label() {
    return this.liked ? "已赞" : "点赞";
  }
  
  render() {
    return <button onClick={this.clickLike}>{this.label()}</button>
  }
}
`

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>视图组件</Header1>
      <div>视图组件就是描述页面的组件，小到一个字一个div，大到一个表单一个页面都是视图组件。</div>
      <Header2>@view</Header2>
      <div>下面给出了一个简单的点赞按钮组件：</div>
      <Code code={this.code} />
      使用@view()标记一个类是视图组件；视图组件必须有一个名为render渲染方法。
      <Card>
        熟悉React的开发者会发现：这是类组件吧？确实如此，差别在于React通过继承React.Component类声明组件，coco-mvc通过装饰器声明组件。
        因为装饰器是基于类的，尽量和React的类组件保持一致可以减少学习成本。
      </Card>
      <Header2>@bind</Header2>
      下面的例子中，我们补充了一个事件处理函数，但是运行事件处理函数时，this通常指向undefined
      想要this指向当前组件实例，可以添加@bind()装饰器。（把方法申明成属性也可以绑定this，这是React里面常见的做法。）
      <Code code={this.code1} />
      <Card>
        render函数默认绑定当前实例，不需要添加@bind()
      </Card>
      <Header2>@reactive</Header2>
      下面我们让点赞按钮支持点击后的状态切换。
      <Code code={this.code2} />
      修改this.liked本身不会让组件重新渲染，但是添加@reactive()使得liked属性变成响应式，所有被@reactive()装饰的属性被修改都会触发组件的重新渲染。
      <Header2>@ref</Header2>
      某些时候需要引用dom元素或者子组件
      <Code code={this.code3} />
      通过@ref()装饰器会自动为field初始化带有current属性的对象，当页面挂载后，就可以通过ref访问button元素。
      <Card>
        <ul>
          <li>通过@ref()装饰器获取单个自定义组件也是可以。方法是完全一致的。</li>
          <li>如果需要获取map中的组件，那么请使用@refs()装饰器。</li>
        </ul>
      </Card>
      <Header2>@memoized</Header2>
      当有一些复杂计算的渲染结果时，可以使用@memoized()装饰方法，这样只有方法使用到响应式属性修改时，方法才会重新执行。
      <Code code={this.code4} />
      <Card>
        @memoized()装饰的方法也会自动绑定this到当前实例，不需要添加@bind()
      </Card>
      <Header1>生命周期函数</Header1>
      <ul>
        <li><span className={'text-blue-600'}>viewDidMount</span>组件首次挂载成功后触发。</li>
        <li><span className={'text-blue-600'}>viewDidUpdate</span>组件的props发生变化时触发。</li>
        <li><span className={'text-blue-600'}>viewWillUnmount</span>组件即将销毁前触发。</li>
      </ul>
      <Header1>其他装饰器</Header1>
      <div>除了view装饰器用于声明通用的视图组件，coco-mvc还提供了具有特定业务含义的视图装饰器：</div>
      <ul>
        <li><span className={'text-blue-600'}>@page()</span>用于声明一个页面。</li>
        <li><span className={'text-blue-600'}>@layout()</span>用于声明一个布局。</li>
      </ul>
    </ContentLayout>
  }
}

export default LearnViewComponentPage;