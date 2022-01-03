import React, { useCallback, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Input, List, Button, Spin } from 'antd';
import Summary from '../components/summary/summary';

import { formatTimeStamp, formatNum, getValue } from '../utils/format';
// import resData from './data.json';

const { log } = console;

const Home = () => {
  const [hash, setHash] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [summary, setSummary] = useState([]);
  useEffect(() => {
    if (hash) {
      setLoading(true);
      axios
        .get(`https://blockchain.info/rawblock/${hash}`)
        .then((response) => {
          // handle success

          const { time, height, n_tx: nTx, mrkl_root: marklRoot, ver, bits, weight, size, nonce, fee } = response.data;
          const summaryArr = [
            { label: 'Hash', value: hash, tip: 'Unique identifier used to identify a particular block' },
            { label: 'Timestamp', value: time, fun: formatTimeStamp },
            { label: 'Height', value: height, tip: 'Who confirmed the transactions in the block', fun: formatNum },
            { label: 'Number of Transactions', value: nTx, tip: 'Number of transactions included in this block' },
            {
              label: 'Merkle root',
              value: marklRoot,
              tip: 'The root node of a merkle tree, a descendant of all the hashed pairs in the tree',
            },
            { label: 'Version', value: ver, tip: 'Block version related to protocol proposals underway' },
            { label: 'Bits', value: bits, tip: 'A sub-unit of BTC, equal to 0.000001 BTC', fun: formatNum },
            {
              label: 'Weight',
              value: weight,
              tip: 'A measurement to compare the size of different transactions to each other in proportion to the block size limit',
              fun: formatNum,
            },
            { label: 'Size', value: size, tip: 'Total size of the block', fun: formatNum },
            {
              label: 'Nonce',
              value: nonce,
              tip: 'Random value that can be adjusted to satisfy the proof of work',
              fun: formatNum,
            },
            {
              label: 'Fee Reward',
              tip: 'Amount of transaction fees rewarded to the miner for calculating the hash for this block',
              value: fee,
            },
          ];

          setSummary(summaryArr);
          setData(response.data);
          setValue('');
        })
        .catch((error) => {
          // handle error
          log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [hash]);

  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      setHash(value);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = useCallback(() => {
    setHash(value);
  }, [value]);

  const styleObj = { marginLeft: 0, marginRight: 0, marginBottom: '20px' };

  return (
    <div className="container">
      <Row gutter={24} style={styleObj}>
        <Col xs={16} sm={16} md={24}>
          <Input value={value} onChange={handleChange} size="large" placeholder="Search block" />
        </Col>
        <Col xs={8} sm={8} md={0}>
          <Button onClick={handleSubmit}> Search </Button>
        </Col>
      </Row>

      {loading && (
        <div className="loading-wrap">
          <Spin tip="Loading..." />
        </div>
      )}

      {!!summary.length &&
        summary.map((item) => (
          <Summary
            key={item.label}
            label={item.label}
            value={item.value}
            tip={item.tip}
            fun={item.fun ? item.fun : undefined}
          />
        ))}

      {data && <Row className="title">Block Transactions</Row>}

      {data?.tx.length && (
        <List
          itemLayout="vertical"
          pagination={{
            responsive: true,
            onChange: (page) => {
              log(page);
            },
            pageSize: 5,
          }}
          dataSource={data?.tx}
          renderItem={(item) => (
            <List.Item key={item.hash}>
              <Row>
                <Col span={4}>Fee</Col>
                <Col span={16}>
                  <div>{item.fee}</div>
                  <div>(0.000 sat/B - 0.000)</div>
                </Col>
                <Col span={4} className="text-right">
                  {getValue(item.out)}
                </Col>
              </Row>
              <Row>
                <Col span={4}>Hash</Col>
                <Col span={8}>
                  <div className="single-line">{item.hash}</div>
                </Col>
                <Col span={4} offset={8} className="text-right">
                  {formatTimeStamp(item.time)}
                </Col>
              </Row>
              <Row>
                <Col span={8} offset={4}>
                  {item?.inputs?.map((inputItem) => (
                    <div className="flex-wrap" key={inputItem?.prev_out?.addr}>
                      <div className="flex-1 font-blue single-line">{inputItem?.prev_out?.addr}</div>
                      <div>{inputItem?.prev_out?.value}</div>
                    </div>
                  ))}
                </Col>
                <Col span={12}>
                  {item?.out?.map((outItem) => (
                    <div className="flex-wrap" key={outItem?.addr}>
                      <div className="font-blue flex-1 single-line">{outItem?.addr}</div>
                      <div>{outItem?.value}</div>
                    </div>
                  ))}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Home;
