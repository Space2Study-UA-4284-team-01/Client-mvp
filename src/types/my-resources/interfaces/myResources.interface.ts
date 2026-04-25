import { CommonEntityFields, RequestParams } from '~/types'

export interface Categories extends CommonEntityFields {
  name: string
  author: string
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface UpdateResourceCategory {
  name: Categories['name']
  id: Categories['_id']
}

export interface GetResourcesCategoriesParams extends Partial<RequestParams> {
  name?: string
}

export interface Attachment extends CommonEntityFields {
  fileName: string
  size: number
  url: string
}

export interface Lesson extends CommonEntityFields {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: Categories | null
}

export interface LessonData {
  title: string
  description: string
  content: string
  attachments: Attachment[]
  category: string | null
}
