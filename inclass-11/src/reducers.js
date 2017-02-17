//
// Inclass Redux ToDo Exercise
// ============================
//
// Your task is to implement the reducer below.
//
// Start this exercise by running the dev server:
//    npm run dev
// then navigate to the page and open the devtools console.
// Try adding a new To Do item.  The console shows
// the previous state, the action, and the new state.
// 
// Your task is to implement the reducer to properly
// update the state.
//
// DO NOT USE MUTATION
// there should be NO assignment operators in your solution.
// 
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return {
				nextId: state.nextId + 1,
				todoItems: state.todoItems.concat([
						{id: state.nextId,
						 text: action.text,
						 done: false}
					])
			}
			// IMPLEMENT ME
		case 'REMOVE_TODO':
			return {
				nextId: state.nextId,
				todoItems: state.todoItems.filter((item) => item.id !== action.id)
			}
			// IMPLEMENT ME
		case 'TOGGLE_TODO':
			return {
				nextId: state.nextId,
				todoItems: state.todoItems.map((item) => {
					if (item.id === action.id) {
						return {id: item.id, text: item.text, done: !item.done}
					} else {
						return item
					}
				})
			}
			// IMPLEMENT ME
		default: 
			return state
	}
}

export default Reducer