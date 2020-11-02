Page({
  data:{
    input:'',
    itemLeft:2,
    toggleAll:false,
    todos:[
      // {
      //   content:'learning english',
      //   completed:true
      // },
      // {
      //   content:'learning chinease',
      //   completed:false
      // },
      // {
      //   content:'learning html',
      //   completed:false
      // }
    ],
  },
  //获取输入框值
  handleInput(e){
    const {value} = e.detail;
    this.setData({
      input:value
    })
  },
  //点击添加数据
  handleAdd(){
    const {input} = this.data;
    const todos = wx.getStorageSync('todos') || [];
    if(!input){
      wx.showModal({
        cancelColor: 'cancelColor',
        showCancel:false,
        title:'不能为空'
      })
      return;
    }
    todos.push({
      content:this.data.input,
      completed:false
    })
    this.setData({
      todos,
      input:''
    })
    wx.setStorageSync('todos',todos);
    this.getUncompleted(todos);
  },
  //点击切换完成状态
  toggleItem(e){
    const {index} = e.currentTarget.dataset;
    const todos = wx.getStorageSync('todos') || [];
    console.log(todos)
    todos[index].completed = !todos[index].completed
    this.setData({
      todos
    })
    wx.setStorageSync('todos', todos)
    this.getUncompleted(todos);
  },
  //计算未完成数
  getUncompleted(todos){
    const {itemLeft} = this.data;
    const list = todos.filter(v=>v.completed !== true);
    this.setData({
      itemLeft:list.length
    })
  },
  //切换全部
  toggleAll(){
    const todos = wx.getStorageSync('todos')
    let {toggleAll} = this.data;
    toggleAll = !toggleAll;
    todos.forEach(item=>{
      item.completed = toggleAll;
    })
    this.setData({
      todos,
      toggleAll
    })
    wx.setStorageSync('todos', todos)
    this.getUncompleted(todos)
  },
  //清除已完成
  clearCompleted(){
    let todos = wx.getStorageSync('todos');
    todos = todos.filter(item=>item.completed === false);
    this.setData({
      todos
    })
    wx.setStorageSync('todos', todos)
  },
  //删除单个
  deleteItem(e){
    const {index} = e.currentTarget.dataset;
    const todos = wx.getStorageSync('todos')
    todos.splice(index,1);
    this.setData({
      todos
    })
    wx.setStorageSync('todos', todos)
    this.getUncompleted(todos)
  },
  onShow(){
    const todos = wx.getStorageSync('todos');
    this.setData({
      todos
    })
    this.getUncompleted(todos);
  }
})