export default ({dispatch}:{dispatch: any}) => ({next}:{next: any}) => ({action}:{action: any}) => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action);
  }

  const {url, onSuccess} = action.meta;

  fetch(url)
  .then((response) => response.json())
  .then(json => onSuccess(json))
  .then(json => {
    let newAction = Object.assign({}, action, {payload: json})
    delete newAction.meta;
    dispatch(newAction);
  })
}