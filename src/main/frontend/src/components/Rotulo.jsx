import React from 'react';

const style = {
  color: '#757575',
  fontSize: '11pt',
  marginTop: 15,
  marginBottom: 6,
};

export const Rotulo = (props) => {
  const { valor } = props;
  return (
    <label style={style} htmlFor={props.htmlFor}>{valor}</label>
  );
};
