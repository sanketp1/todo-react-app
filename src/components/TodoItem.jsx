function TodoItem() {
  return (
    <div className="row" id="item">
      <div className="col">
      <label class="form-label">Goto to college</label>
      </div>
      <div className="col">
      <label class="form-label">10/02/2023</label>
      </div>
    <div className="col">
        
    <button type="button" class="btn btn-danger">Delete</button>

    </div>
    </div>
  );
}


export default TodoItem;