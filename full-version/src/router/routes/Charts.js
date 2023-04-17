import HorizontalForm from '../../views/forms/form-layouts/HorizontalForm'
import AddSize from '../../views/forms/form-layouts/AddSize'
import AddCategorie from '../../views/forms/form-layouts/AddCategorie'
import AddVariation from '../../views/forms/form-layouts/AddVariation'

const ChartMapsRoutes = [
  {
    path: '/addProduct',
    element: <HorizontalForm />
  },
  {
    path: '/addVariation',
    element: <AddVariation />
  },
  {
    path: '/addVariationOption',
    element: <AddSize />
  },
  {
    path: '/addCategorie',
    element: <AddCategorie />
  }
]

export default ChartMapsRoutes
