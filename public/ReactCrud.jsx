var ProjectAll = React.createClass({   

  getInitialState: function () {  
    return { name: '' ,description: '',skill:'',client:'',category:'',image:'',Buttontxt:'Save', projects: [],categories: []};  
  },  
  handleChange: function(e) {  
    console.log(e.target.name)
    this.setState({[e.target.name]: e.target.value});  
  },  
  
  componentDidMount() {  

    $.ajax({  
      url: "api/getdata",  
      type: "GET",  
      dataType: 'json',  
      ContentType: 'application/json',  
      success: function(data) {           
        console.log(data)
        this.setState({projects: data.projects});

      }.bind(this),  
      error: function(jqXHR) {  
        console.log(jqXHR);  

      }.bind(this)  
    }); 
    $.ajax({  
      url: "api/categories",  
      type: "GET",  
      dataType: 'json',  
      ContentType: 'application/json',  
      success: function(data) {           
        console.log(data)
        this.setState({categories: data.categories});

      }.bind(this),  
      error: function(jqXHR) {  
        console.log(jqXHR);  

      }.bind(this)  
    });  
  },  

  DeleteData(id){  
    var projectDelete = {  
      'id': id  
    };        
    $.ajax({  
      url: "/api/Removedata/",  
      dataType: 'json',  
      type: 'POST',  
      data: projectDelete,  
      success: function(data) {  
        alert(data.data);  
        this.componentDidMount();
        toastr.success("Project detail successfully.");

      }.bind(this),  
      error: function(xhr, status, err) {  
        toastr.success(err);
        alert(err);   


      }.bind(this),  
    });  
  },  

  
  
  EditData(item){    
    console.log("edit form........");
    // $('.category_select').val(item.category)
    this.setState({name: item.name,description:item.description,skill:item.skill,client:item.client,category: item.category,id:item._id,Buttontxt:'Update'});  
  },  
  
  handleClick: function() {  
    console.log('yes coming...........');
    var Url="";  
    if(this.state.Buttontxt=="Save"){  
      console.log('save url...........');
      Url="/api/savedata";  
    }  
    else{  
      Url="/api/Updatedata";  
    }  
    var projectdata = {  
      'name': this.state.name,  
      'description':this.state.description,  
      'skill':this.state.skill,  
      'client':this.state.client,  
      'category':this.state.category,  
      'id':this.state.id,  

    }
    $.ajax({  
      url: Url,  
      dataType: 'json',  
      type: 'POST',  
      data: projectdata,  
      success: function(data) {         
        console.log(data.data);     
        this.setState(this.getInitialState());
        this.componentDidMount();
        var msg = Url == "/api/savedata" ? "save" : "update"
        toastr.success("Project detail "+msg+" successfully..");
        // setTimeout(function() {
        //   location.assign('/');
        // }, 600);
      }.bind(this),  
      error: function(xhr, status, err) {
        toastr.error(err)
        console.log(err);       
      }.bind(this)
    });  
  },  
  
  render: function() {  
    return (   
      <div  className="container"  style={{marginTop:'50px'}}>  
        <p className="text-center" style={{fontSize:'25px'}}><b> IBZ Projects Using React,Nodejs,Express,MongoDB</b></p>  
        <form>  
          <div className="col-sm-12 col-md-12">   
            <table className="table table-bordered form_project">  
              <tbody>  
                <tr>  
                  <td><b>Name</b></td>  
                  <td>  
                  <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } required />  
                  <input type="hidden" value={this.state.id}    name="id"  />  
                  </td>  
                </tr>  
                <tr>  
                  <td><b>Description</b></td>  
                  <td>  
                  <input type="text" className="form-control" value={this.state.description}  name="description" onChange={ this.handleChange } required />  
                  </td>  
                </tr>  
                <tr>  
                  <td><b>Skill</b></td>  
                  <td>  
                  <input type="text"  className="form-control" value={this.state.skill}  name="skill" onChange={ this.handleChange } required />  
                  </td>
                </tr>  
                <tr>  
                  <td><b>Client</b></td>  
                  <td>  
                  <input type="text"  className="form-control" value={this.state.client}  name="client" onChange={ this.handleChange } required />  
                  </td>
                </tr>
                <tr>  
                  <td><b>Category</b></td>  
                  <td>  
                    <select className="form-control category_select" name="category" onChange={ this.handleChange } value={this.state.category} required >
                      <option>Select Option</option>
                      {this.state.categories.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                       ))}
                    </select>
                  </td>
                </tr>  
                <tr>  
                  <td></td>  
                  <td>  
                  <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
                  </td>
                </tr>  
              </tbody>  
            </table>  
          </div>  
        </form>
        <div className="col-sm-12 col-md-12 " >
          <h2 className="text-center">Client Details</h2>
          <table className="table table-bordered">
            <tbody>  
              <tr>
                <th><b>S.No</b></th>
                <th><b>NAME</b></th>
                <th><b>Decription</b></th>
                <th><b>Skill</b></th>
                <th><b>Client</b></th>
                <th><b>category</b></th>
                <th><b>Edit</b></th>
                <th><b>Delete</b></th>
              </tr>  
              {this.state.projects.map((item, index) => (  
                <tr key={index}>  
                  <td>{index+1}</td>   
                  <td>{item.name}</td>                        
                  <td>{item.description}</td>                        
                  <td>{item.skill}</td>  
                  <td>{item.client}</td>  
                  <td>{item.category}</td>  
                  <td>   

                  <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>      
                  </td>   
                  <td>   
                  <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>  
                  </td>   
                </tr>  
                ))}  
            </tbody>  
          </table>
        </div>
      </div>  
      );  
  }  
});  

ReactDOM.render(<ProjectAll  />, document.getElementById('root'))