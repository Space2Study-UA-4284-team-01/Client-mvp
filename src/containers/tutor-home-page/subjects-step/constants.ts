import { CategoryNameInterface, SubjectNameInterface } from '~/types'

const makeCategory = (_id: string, name: string): CategoryNameInterface => ({
  _id,
  name
})
const makeSubject = (_id: string, name: string): SubjectNameInterface => ({
  _id,
  name
})

const subjectsByCategory: Record<string, SubjectNameInterface[]> = {
  '1': [
    makeSubject('11', 'Algebra'),
    makeSubject('12', 'Geometry'),
    makeSubject('13', 'Calculus'),
    makeSubject('14', 'Probability Theory'),
    makeSubject('15', 'Linear Algebra')
  ],
  '2': [
    makeSubject('21', 'Mechanics'),
    makeSubject('22', 'Optics'),
    makeSubject('23', 'Thermodynamics'),
    makeSubject('24', 'Electromagnetism'),
    makeSubject('25', 'Quantum Physics')
  ],
  '3': [
    makeSubject('31', 'Algorithms'),
    makeSubject('32', 'Data Structures'),
    makeSubject('33', 'Operating Systems'),
    makeSubject('34', 'Databases'),
    makeSubject('35', 'Computer Networks')
  ],
  '4': [
    makeSubject('41', 'Organic Chemistry'),
    makeSubject('42', 'Inorganic Chemistry'),
    makeSubject('43', 'Physical Chemistry'),
    makeSubject('44', 'Analytical Chemistry')
  ],
  '5': [
    makeSubject('51', 'Cell Biology'),
    makeSubject('52', 'Genetics'),
    makeSubject('53', 'Ecology'),
    makeSubject('54', 'Human Anatomy')
  ]
}

export const mockGetCategories = (): Promise<{
  data: CategoryNameInterface[]
}> =>
  Promise.resolve({
    data: [
      makeCategory('1', 'Mathematics'),
      makeCategory('2', 'Physics'),
      makeCategory('3', 'Computer Science'),
      makeCategory('4', 'Chemistry'),
      makeCategory('5', 'Biology')
    ]
  })

export const mockGetSubjects =
  (categoryId?: string) => (): Promise<{ data: SubjectNameInterface[] }> =>
    Promise.resolve({
      data: categoryId ? subjectsByCategory[categoryId] ?? [] : []
    })
