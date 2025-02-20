import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {DatePicker} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core';
import {useForm} from './useForm';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root.Mui-focused, & .MuiInputBase-root:hover:not(.Mui-disabled)': {
      '& .MuiIconButton-root': {
        color: 'var(--color-teal)'
      }
    }
  }
}));

function SQFormDatePicker({
  name,
  label,
  size = 'auto',
  isDisabled = false,
  isRequired = false,
  placeholder = '',
  onBlur,
  onChange,
  muiFieldProps = {}
}) {
  const {
    formikField: {field, helpers},
    fieldState: {isFieldError, errorMessage},
    fieldHelpers: {handleBlur, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onBlur,
    onChange
  });

  const handleChange = date => {
    helpers.setValue(date);
    onChange && onChange(date);
  };

  const classes = useStyles();

  // An empty string will not reset the DatePicker so we have to pass null
  const value = field.value || null;

  return (
    <Grid item sm={size}>
      <DatePicker
        label={label}
        disabled={isDisabled}
        value={value}
        onChange={handleChange}
        renderInput={inputProps => {
          return (
            <TextField
              {...inputProps}
              name={name}
              color="primary"
              disabled={isDisabled}
              error={isFieldError}
              fullWidth={true}
              InputLabelProps={{shrink: true}}
              FormHelperTextProps={{error: isFieldError}}
              helperText={isFieldError ? errorMessage : HelperTextComponent}
              placeholder={placeholder}
              onBlur={handleBlur}
              required={isRequired}
              classes={classes}
            />
          );
        }}
        {...muiFieldProps}
      />
    </Grid>
  );
}

SQFormDatePicker.propTypes = {
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Descriptive label of the input */
  label: PropTypes.string.isRequired,
  /** Name of the field will be the Object key of the key/value pair form payload */
  name: PropTypes.string.isRequired,
  /** Placeholder text used inside the input field to provide hints to the user */
  placeholder: PropTypes.string,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Any valid prop for material ui datepicker child component - https://material-ui.com/components/pickers/  */
  muiFieldProps: PropTypes.object
};

export default SQFormDatePicker;
