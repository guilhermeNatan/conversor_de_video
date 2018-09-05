import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Rotulo } from './Rotulo';
import { SimpleReactFileUpload } from './SimpleReactFileUpload';
import {BASE_URL} from "../constants/Constantes";

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
      uploadUrl={`${BASE_URL}/storage/uploadFile`}
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

