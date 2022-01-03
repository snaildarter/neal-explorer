import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tooltip } from 'antd';

const styleObj = { marginLeft: 0, marginRight: 0 };

const Summary = ({ label, value, tip, fun }) => {
  return (
    <Row className="summary-item" style={styleObj} key={label}>
      {tip ? (
        <Tooltip title={tip}>
          <Col span={8}>{label}</Col>
        </Tooltip>
      ) : (
        <Col span={8}>{label}</Col>
      )}
      <Col span={16}>{fun ? fun(value) : value}</Col>
    </Row>
  );
};

Summary.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  tip: PropTypes.string,
  fun: PropTypes.func,
};

Summary.defaultProps = {
  tip: undefined,
  fun: undefined,
};

export default Summary;
