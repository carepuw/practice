import React from 'react'
import TextField from '@material-ui/core/TextField';

export const fText = (
  dataProps: any,
  value: string | null,
  label?: string | null,
  onChange?: (e: any) => void,
) => (
  <TextField
    id="standard-basic"
    onChange={(e) => onChange && onChange(e.target.value)}
    value={value}
    label={label || undefined}
    style={{ margin: '5px 0', ...dataProps.style }}
    multiline={dataProps.multiline || false}
    rows={dataProps.rows || 3}
    variant={dataProps.variant}
  />
)
