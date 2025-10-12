
// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
    highlight: code => Prism.highlight(code, Prism.languages.javascript, 'javascript')});
  
  // INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a>`;
  
  class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        input: ''
      }
      
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
      return this.setState({
        input: e.target.value
      });
    }
    
    render(){
      return (
        <div>
          <h1>Markdown Previewer</h1>
          <Editor handleChange={this.handleChange}/>
          <Previewer preview={this.state.input}/>
        </div>
      );
    }
  }
  
  //Editor
  const Editor = (props) => {
    return (
      <textarea id="editor" onChange={props.handleChange} type="text"/>
    );
  }
  
  //Previewer
  const Previewer = (props) => {
    return (
      <div dangerouslySetInnerHTML={{
          __html: marked(props.preview, { renderer: renderer })
        }} id="previewer">
        
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))