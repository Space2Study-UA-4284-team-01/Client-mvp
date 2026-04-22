// @ts-nocheck
import { Fragment } from 'react'

import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'

import Loader from '~/components/loader/Loader'

const defaultFilterOptions = (options, state) => {
  const filterOptions = createFilterOptions()
  return filterOptions(options, state)
}

const defaultListboxProps = {
  style: { maxHeight: 150 }
}

/**
 * @param {{
 *   filterOptions?: any,
 *   ListboxProps?: any,
 *   options?: any[],
 *   hideClearIcon?: boolean,
 *   textFieldProps?: any,
 *   [key: string]: any
 * }} props
 */
const AppAutoComplete = ({
  filterOptions,
  ListboxProps,
  options = [],
  hideClearIcon = false,
  textFieldProps = {},
  ...props
}) => {
  const resolvedFilterOptions = filterOptions ?? defaultFilterOptions
  const resolvedListboxProps = ListboxProps ?? defaultListboxProps

  return (
    <Autocomplete
      ListboxProps={resolvedListboxProps}
      filterOptions={resolvedFilterOptions}
      isOptionEqualToValue={(option, value) => option === value}
      options={options}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            ...(textFieldProps.InputProps || {}),
            endAdornment: (
              <Fragment>
                {props.loading ? (
                  <Loader size={20} sx={{ color: 'primary.600' }} />
                ) : null}
                {!hideClearIcon && params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default AppAutoComplete
