const initialState = {}

export default (state = initialState, {type}) => {
  switch (type) {
	case "FETCH_JOBS":
      const newValues = 'meow'
      return 'woof'
    default:
      return state
  }
}