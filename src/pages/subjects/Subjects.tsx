import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore from '~/hooks/use-load-more'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'

import {
  CategoryNameInterface,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/subjects/Subjects.styles'

const demoSubjects = [
  { _id: 'demo-1', name: 'English', totalOffers: 234 },
  { _id: 'demo-2', name: 'German', totalOffers: 234 },
  { _id: 'demo-3', name: 'Ukrainian', totalOffers: 234 },
  { _id: 'demo-4', name: 'Japanese', totalOffers: 234 },
  { _id: 'demo-5', name: 'Polish', totalOffers: 234 },
  { _id: 'demo-6', name: 'Spanish', totalOffers: 234 },
  { _id: 'demo-7', name: 'French', totalOffers: 234 },
  { _id: 'demo-8', name: 'Italian', totalOffers: 234 },
  { _id: 'demo-9', name: 'Korean', totalOffers: 234 },
  { _id: 'demo-10', name: 'Arabic', totalOffers: 234 },
  { _id: 'demo-11', name: 'Chinese', totalOffers: 234 },
  { _id: 'demo-12', name: 'Turkish', totalOffers: 234 },
  { _id: 'demo-13', name: 'Dutch', totalOffers: 234 },
  { _id: 'demo-14', name: 'Hungarian', totalOffers: 234 },
  { _id: 'demo-15', name: 'Finnish', totalOffers: 234 },
  { _id: 'demo-16', name: 'Portuguese', totalOffers: 234 },
  { _id: 'demo-17', name: 'Greek', totalOffers: 234 },
  { _id: 'demo-18', name: 'Swedish', totalOffers: 234 }
]

const demoInitialCount = 15
const demoStep = 3

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [demoVisibleCount, setDemoVisibleCount] =
    useState<number>(demoInitialCount)

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId') ?? ''
  const params = useMemo(() => ({ name: match }), [match])
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const transform = useCallback(
    (data: SubjectNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getSubjectNames = () => {
    if (!isFetched) {
      void fetchData()
      setIsFetched(true)
    }
  }

  const getSubjects = useCallback(
    (data?: Pick<SubjectInterface, 'name'>) =>
      subjectService.getSubjects(data, categoryId),
    [categoryId]
  )

  const {
    data: subjects,
    loading: subjectsLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<SubjectInterface, Pick<SubjectInterface, 'name'>>({
    service: getSubjects,
    limit: cardsLimit,
    params
  })

  const oppositeRole = getOpositeRole(userRole)

  const shouldUseDemoCards =
    !categoryId && !subjectsLoading && !subjects.length && !match.trim()

  const demoCards = useMemo(() => {
    return demoSubjects.slice(0, demoVisibleCount).map((item) => (
      <CardWithLink
        description={`${item.totalOffers} ${t('categoriesPage.offers', {
          defaultValue: 'Offers'
        })}`}
        img={serviceIcon}
        key={item._id}
        link={authRoutes.findOffers.path}
        title={item.name}
      />
    ))
  }, [demoVisibleCount, t])

  const realCards = useMemo(() => {
    return subjects.map((item: SubjectInterface) => (
      <CardWithLink
        description={`${item.totalOffers[oppositeRole]} ${t(
          'categoriesPage.offers'
        )}`}
        img={serviceIcon}
        key={item._id}
        link={`${authRoutes.findOffers.path}?categoryId=${categoryId}&subjectId=${item._id}`}
        title={item.name}
      />
    ))
  }, [subjects, oppositeRole, t, categoryId])

  const cards = shouldUseDemoCards ? demoCards : realCards

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    const newCategoryId = value?._id ?? ''

    setIsFetched(false)
    setMatch('')
    setCategoryName(value?.name ?? '')
    setDemoVisibleCount(demoInitialCount)

    if (newCategoryId) {
      searchParams.set('categoryId', newCategoryId)
    } else {
      searchParams.delete('categoryId')
    }

    setSearchParams(searchParams)
    resetData()
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
    if (!categoryId) {
      setCategoryName('')
      return
    }

    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.name ?? '')
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory }}
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories', {
          defaultValue: 'Category'
        })
      }}
      value={categoryId}
      valueField='_id'
    />
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  const title = categoryName
    ? t('subjectsPage.subjects.title', { category: categoryName })
    : t('subjectsPage.subjects.titleWithoutCategory', {
        defaultValue: 'Language Subjects'
      })

  const showAllOffersLink = categoryId
    ? `${authRoutes.findOffers.path}?categoryId=${categoryId}`
    : authRoutes.findOffers.path

  const shouldShowEmptyState =
    !shouldUseDemoCards && !subjects.length && !subjectsLoading

  const shouldShowViewMore = shouldUseDemoCards
    ? demoVisibleCount < demoSubjects.length
    : isExpandable

  const handleViewMore = () => {
    if (shouldUseDemoCards) {
      setDemoVisibleCount((prev) =>
        Math.min(prev + demoStep, demoSubjects.length)
      )
      return
    }

    loadMore()
  }

  return (
    <PageWrapper>
      <Box sx={styles.page}>
        <OfferRequestBlock />

        <Box sx={styles.contentWrapper}>
          <TitleWithDescription
            description={t('subjectsPage.subjects.description', {
              defaultValue: "Explore subjects you're passionate about."
            })}
            style={styles.titleWithDescription}
            title={title}
          />

          <Box sx={styles.navigation}>
            <DirectionLink
              before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
              linkTo={authRoutes.categories.path}
              title={t('subjectsPage.subjects.backToAllCategories', {
                defaultValue: 'Back to all categories'
              })}
            />
            <DirectionLink
              after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
              linkTo={showAllOffersLink}
              title={t('subjectsPage.subjects.showAllOffers', {
                defaultValue: 'Show all offers'
              })}
            />
          </Box>

          <AppToolbar sx={styles.searchToolbar}>
            {!breakpoints.isMobile && autoCompleteCategories}
            <SearchAutocomplete
              loading={subjectNamesLoading}
              onFocus={getSubjectNames}
              onSearchChange={resetData}
              options={subjectsNamesItems}
              search={match}
              setSearch={setMatch}
              textFieldProps={{
                label: t('subjectsPage.subjects.searchLabel', {
                  defaultValue: 'What would you like to learn?'
                })
              }}
            />
          </AppToolbar>

          {breakpoints.isMobile && autoCompleteCategories}

          <Box sx={styles.requestTextWrapper}>
            <Box component='span' sx={styles.requestText}>
              {"Can't find what you're looking for?"}{' '}
            </Box>

            <Box
              component='button'
              onClick={handleOpenModal}
              sx={styles.requestButton}
              type='button'
            >
              Request a new{' '}
              <Box component='span' sx={styles.boldText}>
                category
              </Box>{' '}
              or{' '}
              <Box component='span' sx={styles.boldText}>
                subject
              </Box>
              !
            </Box>
          </Box>

          {shouldShowEmptyState ? (
            <NotFoundResults
              buttonText={t('errorMessages.buttonRequest', {
                name: 'subjects'
              })}
              description={t('errorMessages.tryAgainText', {
                name: 'subjects'
              })}
              onClick={handleOpenModal}
            />
          ) : (
            <>
              <Box sx={styles.cardsGrid}>{cards}</Box>

              {shouldShowViewMore ? (
                <Box sx={styles.viewMoreWrapper}>
                  <Button
                    onClick={handleViewMore}
                    sx={styles.viewMoreButton}
                    variant='contained'
                  >
                    {t('categoriesPage.viewMore', {
                      defaultValue: 'View more'
                    })}
                  </Button>
                </Box>
              ) : null}
            </>
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Subjects
