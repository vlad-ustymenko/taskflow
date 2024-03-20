import Main from './pages/Main/Main'
import { Route, Routes, Navigate } from 'react-router-dom'
import Drawer from './components/Drawer/Drawer'
import MenuButton from './components/MenuButton/MenuButton'
import TaskModal from './components/TaskModal/TaskModal'
import NotFound from './pages/NotFound/NotFound'
import CategoriesModal from './components/CategoriesModal/CategoriesModal'
import { useSelector } from 'react-redux'
import { selectCategoriesList } from './redux/slices/categoriesSlice'
import './App.scss'
import DeleteCategoryModal from './components/DeleteCategoryModal/DeleteCategoryModal'

const App = () => {
  const categoryList = useSelector(selectCategoriesList)

  return (
    <>
      <MenuButton />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/today" />} />
          <Route path="*" element={<NotFound />} />
          <Route path="upcoming" element={<Main category="Upcoming" />} />
          <Route path="today" element={<Main category="Today" />} />
          <Route path="overdue" element={<Main category="Overdeu" />} />
          {categoryList.map((category) => (
            <Route
              key={category.title}
              path={category.title.toLowerCase()}
              element={<Main category={category.title} />}
            />
          ))}
        </Routes>
      </div>
      <Drawer />
      <TaskModal />
      <CategoriesModal />
      <DeleteCategoryModal />
    </>
  )
}
export default App
