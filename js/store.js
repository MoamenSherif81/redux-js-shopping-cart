const {createStore} = Redux;

export const addProductHandler = (value) => {
  return {
    type: 'ADD_PRODUCT',
    payload: value
  }
}
export const removeProductHandler = (value) => {
  return {
    type: 'REMOVE_PRODUCT',
    payload: value
  }
}
export const updateProductHandler = (value, required) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: value,
    required
  }
}

const rootReducer = (state = (JSON.parse(localStorage.getItem('products')) || []), action) => {
  switch(action.type) {
    case 'ADD_PRODUCT':
      if(state.find(e => e.id === action.payload.id)) {
        return updateProductAmount(action.payload.id, 'inc');
      } else {
        return [...state, action.payload]
      }
    case 'REMOVE_PRODUCT':
      return state.filter(prod => prod.id != action.payload);
    case 'UPDATE_PRODUCT':
      return updateProductAmount(action.payload, action.required);
    default: 
      return state;
  }

  function updateProductAmount(id, required){
    let newState = []
    if(required == 'inc'){
      state.forEach((prod) => {
        if(prod.id == id){
          newState.push({...prod, amount: prod.amount + 1});
        } else {
          newState.push(prod);
        }
      })
    } else {
      state.forEach((prod) => {
        if(prod.id == id){
          let newProductObj = {...prod, amount: prod.amount - 1};
          if(newProductObj.amount > 0){
            newState.push(newProductObj);
          }
        } else {
          newState.push(prod);
        }
      })
    }
    return newState;
  }
}

export const store = createStore(rootReducer);

store.subscribe(() => {
  localStorage.setItem('products', JSON.stringify(store.getState()));
})

