function AddTodo() {
  return (
    <div className="row">
      <div className="col 4">
        <input type="text" className="form-control" placeholder="Enter TODO" />
      </div>

      <div className="col 4">
        <input type="date" className="form-control" name="Date" id="date" />
      </div>

      <div className="col" >

        <button type="button" className="btn btn-success">Add</button>
      </div>
    </div>
  );
}

export default AddTodo;
