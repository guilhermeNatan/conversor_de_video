import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { urlBase } from '../constants/Constantes';
import { Rotulo } from './Rotulo';
import { SimpleReactFileUpload } from './SimpleReactFileUpload';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

const FileUpload = props => (
  <div>
    <Rotulo valor={props.label} />
    <SimpleReactFileUpload
      name="files"
      label={props.label}
      maxFilesize={1024}
      disableAddActions={props.readOnly}
      hideDeleteActions={props.readOnly}
      uploadUrl="http://localhost:9441/storage/uploadFile"
      maxFiles={props.maxFiles}
      existingFiles={props.existingFiles}
      required={props.required}
      {...props}
      onChange={(object) => {
            props.onChange({
              target: {
                value: object.newState,
            },
          });
          }}
    />
  </div>
);

export default withStyles(styles)(FileUpload);

