import { CategoryNameInterface, SubjectNameInterface } from '~/types'

const subjectsByCategory: Record<string, SubjectNameInterface[]> = {
  '1': [
    { _id: '11', name: 'Algebra' },
    { _id: '12', name: 'Geometry' },
    { _id: '13', name: 'Calculus' },
    { _id: '14', name: 'Probability Theory' },
    { _id: '15', name: 'Linear Algebra' }
  ],
  '2': [
    { _id: '21', name: 'Mechanics' },
    { _id: '22', name: 'Optics' },
    { _id: '23', name: 'Thermodynamics' },
    { _id: '24', name: 'Electromagnetism' },
    { _id: '25', name: 'Quantum Physics' }
  ],
  '3': [
    { _id: '31', name: 'Algorithms' },
    { _id: '32', name: 'Data Structures' },
    { _id: '33', name: 'Operating Systems' },
    { _id: '34', name: 'Databases' },
    { _id: '35', name: 'Computer Networks' }
  ],
  '4': [
    { _id: '41', name: 'Organic Chemistry' },
    { _id: '42', name: 'Inorganic Chemistry' },
    { _id: '43', name: 'Physical Chemistry' },
    { _id: '44', name: 'Analytical Chemistry' }
  ],
  '5': [
    { _id: '51', name: 'Cell Biology' },
    { _id: '52', name: 'Genetics' },
    { _id: '53', name: 'Ecology' },
    { _id: '54', name: 'Human Anatomy' }
  ]
}

export const mockGetCategories = (): Promise<{
  data: CategoryNameInterface[]
}> =>
  Promise.resolve({
    data: [
      { _id: '1', name: 'Mathematics' },
      { _id: '2', name: 'Physics' },
      { _id: '3', name: 'Computer Science' },
      { _id: '4', name: 'Chemistry' },
      { _id: '5', name: 'Biology' }
    ]
  })

export const mockGetSubjects =
  (categoryId?: string) => (): Promise<{ data: SubjectNameInterface[] }> =>
    Promise.resolve({
      data: categoryId ? subjectsByCategory[categoryId] ?? [] : []
    })
