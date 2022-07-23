import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Card } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    // Free api is not allowed for this call
    // const { data, isFetching } = useGetExchangesQuery();
    let data = null
    let isFetching = false
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return <Loader />;
    if (!exchangesList) {
        return (
            <>
                <Row>
                    <Col span={6}>Exchanges</Col>
                    <Col span={6}>24h Trade Volume</Col>
                    <Col span={6}>Markets</Col>
                    <Col span={6}>Change</Col>
                </Row>
                <Card style={{ height: '60rem', margin: '1rem' }}
                >
                    <b style={{ marginLeft: '30%' }}>
                        Currently can't display the data, sorry for the inconvinience caused!
                    </b>
                </Card>
            </>
        )
    }
    if (exchangesList) {
        return (
            <>
                <Row>
                    <Col span={6}>Exchanges</Col>
                    <Col span={6}>24h Trade Volume</Col>
                    <Col span={6}>Markets</Col>
                    <Col span={6}>Change</Col>
                </Row>
                <Row>
                    {exchangesList?.map((exchange) => (
                        <Col span={24}>
                            <Collapse>
                                <Panel
                                    key={exchange.id}
                                    showArrow={false}
                                    header={(
                                        <Row key={exchange.id}>
                                            <Col span={6}>
                                                <Text><strong>{exchange.rank}.</strong></Text>
                                                <Avatar className="exchange-image" src={exchange.iconUrl} />
                                                <Text><strong>{exchange.name}</strong></Text>
                                            </Col>
                                            <Col span={6}>${millify(exchange.volume)}</Col>
                                            <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                            <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                        </Row>
                                    )}
                                >
                                    {HTMLReactParser(exchange.description || 'No records found!')}
                                </Panel>
                            </Collapse>
                        </Col>
                    ))}
                </Row>
            </>
        );
    }
};

export default Exchanges;