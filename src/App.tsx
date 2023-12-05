import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import { Provider } from 'react-redux'
import { store } from './components/GPTTasks/todoReducer'
import GroupedCategory from './components/GPTTasks/GroupedCategory'
import Notes from './components/Notes'
import { myRouteDef } from './components/typeRoute'

function App() {
  const routesList: myRouteDef[] = [
    { path: "/uFocus", displayTitle: "Grouped" },
    { path: "notes", displayTitle: "Notes" }
  ]
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/uFocus/' element={<Layout routesList={routesList} />}>
          <Route index element={<GroupedCategory />} />
          <Route path='notes' element={<Notes />} />
        </Route>
      </Routes >
    </Provider>
  )
}

export default App
